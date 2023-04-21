const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to allow cross-origin requests
app.use(cors());

// Create connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306, // xampp mysql
  user: 'root',
  password: '',
  database: 'food_db'
});

// Connect to the database
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to database:', error);
  } else {
    console.log('Connected to database');
  }
});

// Define a route that returns data from the database
app.post('/api/users', (req, res) => {
  const { username, firstName, lastName, email, mobilenumber, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  connection.query(
    'INSERT INTO users (username, firstname, lastname, email, mobilenumber, password) VALUES (?, ?, ?, ?, ?, ?)',
    [username, firstName, lastName, email, mobilenumber, hashedPassword],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error inserting user into database');
      } else {
        res.send(`User ${username} registered successfully!`);
      }
    }
  );
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  connection.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    } else if (results.length === 0) {
      res.status(401).json({ message: 'Invalid username or password' });
    } else {
      const user = results[0];
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: 'Server error' });
        } else if (result) {
          res.status(200).json({ message: 'Login successful', user: { id: user.id, username: user.username, email: user.email, firstname: user.firstname, lastname: user.lastname, mobilenumber: user.mobilenumber }  });
        } else {
          res.status(401).json({ message: 'Invalid username or password' });
        }
      });
    }
  });
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
