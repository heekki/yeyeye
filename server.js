const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'food_db',
    port: 3306,
    connectionLimit: 10,
});

app.post('/api/register', (req, res) => {
    const { username, firstname, lastname, email, mobilenumber, password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            res.status(500).send('Error hashing password');
        } else {
            const sql = 'INSERT INTO USERS (username, firstname, lastname, email, mobilenumber, password) VALUES (?, ?, ?, ?, ?, ?)';
            db.query(sql, [username, firstname, lastname, email, mobilenumber, hash], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Error registering new user');
                } else {
                    res.status(200).send('User registered successfully');
                }
            });
        }
    });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM USERS WHERE username = ?';
    db.query(sql, [username], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error fetching user');
        } else if (result.length === 0) {
            res.status(401).send('Username or password is incorrect');
        } else {
            const user = result[0];
            bcrypt.compare(password, user.password, (err, match) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Error comparing passwords');
                } else if (!match) {
                    res.status(401).send('Username or password is incorrect');
                } else {
                    const token = jwt.sign({ id: user.id }, 'secret');
                    res.status(200).json({ token });
                }
            });
        }
    });
});

PORT=4000
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
