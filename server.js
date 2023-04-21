const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const secretKey = 'mysecretkey';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'food_db',
    port: '3306'
});

connection.connect((err) => {
    if (err) {
        console.log('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database!');
    }
});

// Register endpoint
app.post('/api/register', (req, res) => {
    const { username, firstname, lastname, email, mobilenumber, password } = req.body;

    const hash = bcrypt.hashSync(password, 10);

    const sql = `INSERT INTO users (username, firstname, lastname, email, mobilenumber, password)
                             VALUES ('${username}', '${firstname}', '${lastname}', '${email}', '${mobilenumber}', '${hash}')`;

    connection.query(sql, (err, result) => {
        if (err) {
            console.log('Error inserting new user:', err);
            res.status(500).send('Error inserting new user');
        } else {
            console.log('New user registered!');
            res.sendStatus(200);
        }
    });
});

// Login endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const sql = `SELECT * FROM users WHERE username = '${username}'`;

    connection.query(sql, (err, result) => {
        if (err) {
            console.log('Error fetching user:', err);
            res.status(500).send('Error fetching user');
        } else if (result.length === 0) {
            console.log('User not found!');
            res.status(401).send('User not found');
        } else {
            const user = result[0];

            if (bcrypt.compareSync(password, user.password)) {
                console.log('User authenticated!');

                const token = jwt.sign({ username: user.username }, secretKey);

                res.json({ token });
            } else {
                console.log('Incorrect password!');
                res.status(401).send('Incorrect password');
            }
        }
    });
});

// User info endpoint
app.get('/api/user', authenticateToken, (req, res) => {
    const sql = `SELECT id, username, firstname, lastname, email, mobilenumber FROM users WHERE username = '${req.user.username}'`;

    connection.query(sql, (err, result) => {
        if (err) {
            console.log('Error fetching user info:', err);
            res.status(500).send('Error fetching user info');
        } else {
            const user = result[0];

            res.json(user);
        }
    });
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);

        req.user = user;
        next();
    });
}

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
