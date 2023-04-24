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

// User registration
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

// User login
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

// Get user info
app.get('/api/users/:id', (req, res) => {
    const { id } = req.params;

    db.query('SELECT firstname, lastname, username, email, mobilenumber FROM USERS WHERE id = ?', [id], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Internal server error');
        }

        if (results.length === 0) {
            return res.status(404).send('User not found');
        }

        // send the user data as JSON
        res.json(results[0]);
    });
});

// Update user info
app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { username, firstname, lastname, email, mobilenumber } = req.body;

    db.query(
        'UPDATE USERS SET username = ?, firstname = ?, lastname = ?, email = ?, mobilenumber = ? WHERE id = ?',
        [username, firstname, lastname, email, mobilenumber, id],
        (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({ message: 'Server error' });
            } else {
                res.status(200).json({ message: 'User updated successfully' });
            }
        }
    );
});

// Get all recipes
app.get('/api/recipes/user', (req, res) => {
	db.query('SELECT * FROM RECIPES', (err, result) => {
		if (err) {
			console.log(err);
			res.status(500).send('Error retrieving recipes');
		} else {
			res.status(200).json(result);
		}
	});
});

// Get a specific recipe by ID
app.get('/api/recipes/user/:id', (req, res) => {
    const { id } = req.params;
	db.query('SELECT * FROM RECIPES WHERE id = ?', [id], (err, result) => {
		if (err) {
			console.log(err);
			res.status(500).send(`Error retrieving recipe ${id}`);
		} else if (result.length === 0) {
			res.status(404).send(`Recipe ${id} not found`);
		} else {
			res.status(200).json(result[0]);
		}
    });
};

// Save a new recipe
app.post('/api/recipes/user', (req, res) => {
    const {
        name,
        ingredients,
        instruction
    } = req.body;
    db.query(
        'INSERT INTO RECIPES (name, ingredients, instruction) VALUES (?, ?, ?)',
        [name, ingredients, instruction],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error saving new recipe');
            } else {
                console.log(`Recipe ${result.insertId} saved`);
                res.status(201).send(`Recipe ${result.insertId} saved successfully`);
            }
        }
);
});

// Update an existing recipe
app.put('/api/recipes/user/:id', (req, res) => {
    const { id } = req.params;
    const {
        name,
        ingredients,
        instruction
    } = req.body;
    db.query(
        'UPDATE RECIPES SET name = ?, ingredients = ?, instruction = ? WHERE id = ?',
        [name, ingredients, instruction, id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(`Error updating recipe ${id}`);
            } else if (result.affectedRows === 0) {
                res.status(404).send(`Recipe ${id} not found`);
            } else {
                console.log(Recipe $ {id} updated);
                res.status(200).send(`Recipe ${id} updated successfully`);
            }
        }
    );
});

// Delete a recipe
app.delete('/api/recipes/user/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM RECIPES WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(`Error deleting recipe ${id}`);
        } else if (result.affectedRows === 0) {
            res.status(404).send`(Recipe ${id} not found`);
        } else {
            console.log(Recipe $ {id} deleted);
            res.status(200).send(`Recipe ${id} deleted successfully`);
        }
    });
});

// Add a new favorite recipe
app.post('/api/users/:user_id/favorites', (req, res) => {
    const {
        name,
        ingredients,
        instruction
    } = req.body;
    db.query(
        'INSERT INTO RECIPES (name, ingredients, instruction) VALUES (?, ?, ?)',
        [name, ingredients, instruction],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error saving new recipe');
            } else {
                console.log(`Recipe ${result.insertId} saved`);
                res.status(201).send(`Recipe ${result.insertId} saved successfully`);
            }
        }
);
});

// Delete a favorite recipe
app.delete('/api/users/:userId/favorites/:recipeId', (req, res) => {
    const { recipeId } = req.params;
    db.query('DELETE FROM RECIPES WHERE id = ?', [recipeId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(`Error deleting recipe ${recipeId}`);
        } else if (result.affectedRows === 0) {
            res.status(404).send(`Recipe ${recipeId} not found`);
        } else {
            console.log(`Recipe ${recipe_id} deleted`);
            res.status(200).send(`Recipe ${recipeId} deleted successfully`);
        }
    });
});

PORT=4000
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
