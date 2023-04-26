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
    console.log('User registration');
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
                    console.log('User registration success');
                    res.status(200).send('User registered successfully');
                }
            });
        }
    });
});

// User login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    console.log('User login');
    const sql = 'SELECT * FROM USERS WHERE username = ?';
    db.query(sql, [username], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error fetching user');
        } else if (result.length === 0) {
            console.log('User login incorrect');
            res.status(401).send('Username or password is incorrect');
        } else {
            const user = result[0];
            bcrypt.compare(password, user.password, (err, match) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Error comparing passwords');
                } else if (!match) {
                    console.log('User login incorrect');
                    res.status(401).send('Username or password is incorrect');
                } else {
                    const token = jwt.sign({ id: user.id }, 'secret');
                    const id = user.id;
                    console.log('User login success');
                    res.status(200).json({ token, id });
                }
            });
        }
    });
});

// Get user info
app.get('/api/users/:id', (req, res) => {
    const { id } = req.params;

    console.log('Get user info');
    db.query('SELECT username, firstname, lastname, email, mobilenumber FROM USERS WHERE id = ?', [id], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send(`Error retrieving user ${id}`);
        } else if (result.length === 0) {
            console.log(`User ${id} not found`);
            return res.status(404).send(`User ${id} not found`);
        } else {
            console.error('Get user info success');
            res.json(result[0]);
        }
    });
});

// Update user info
app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, email, mobilenumber } = req.body;

    console.log('Update user info');
    db.query(
        'UPDATE USERS SET firstname = ?, lastname = ?, email = ?, mobilenumber = ? WHERE id = ?',
        [firstname, lastname, email, mobilenumber, id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(`Error retrieving user ${id}`);
            } else {
                res.status(200).send(`User ${id} updated successfully`);
            }
        }
    );
});

// Get all recipes
app.get('/api/recipes', (req, res) => {
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
app.get('/api/recipes/:id', (req, res) => {
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
});

// Update an existing recipe
app.put('/api/recipes/:id', (req, res) => {
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
                console.log(`Recipe ${id} updated`);
                res.status(200).send(`Recipe ${id} updated successfully`);
            }
        }
    );
});

// Delete a recipe
app.delete('/api/recipes/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM RECIPES WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(`Error deleting recipe ${id}`);
        } else if (result.affectedRows === 0) {
            res.status(404).send(`Recipe ${id} not found`);
        } else {
            console.log(`Recipe ${id} deleted`);
            res.status(200).send(`Recipe ${id} deleted successfully`);
        }
    });
});

// Save a new recipe
app.post('/api/recipes', (req, res) => {
    const {
        name,
        ingredients,
        instruction,
        type,
        typeId
    } = req.body;
    db.query(
    'INSERT IGNORE INTO RECIPES (name, ingredients, instruction, type, type_id) VALUES (?, ?, ?, ?, ?)',
    [name, ingredients, instruction, type, typeId],
    (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error saving new recipe');
        } else {
            console.log(`Recipe ${result.insertId} saved`);
            res.status(201).send(`Recipe ${result.insertId} saved successfully`);
        }
    });
});

// Get all favorite recipes of a user
app.get('/api/users/:userId/favorites', (req, res) => {
    const { userId } = req.params;
    db.query('SELECT * FROM USER_RECIPE_FAV WHERE user_id = ?', [userId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error retrieving recipe favorites');
        } else {
            res.status(200).json(result);
        }
    });
});

// Get a specific recipe by type and type ID
app.get('/api/recipes/:type/:typeId', (req, res) => {
    const { type, typeId } = req.params;
    console.log('Get a specific recipe by type and type ID');
    db.query('SELECT * FROM RECIPES WHERE type = ? AND type_id = ?', [type, typeId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(`Error retrieving recipe ${typeId} with type ${type}`);
        } else if (result.length === 0) {
            res.status(404).send(`Recipe ${typeId} with type ${type} not found`);
        } else {
            res.status(200).json(result[0]);
        }
    });
});

// Add a new favorite recipe
app.post('/api/users/:userId/favorites', (req, res) => {
    const { userId } = req.params;
    const { recipeId } = req.body;
    console.log('Add a new favorite recipe');
    db.query('INSERT IGNORE INTO USER_RECIPE_FAV (user_id, recipe_id) VALUES (?, ?)', [userId, recipeId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error saving new recipe favorite');
        } else {
            console.log(`Recipe ${result.insertId} saved`);
            res.status(201).send(`Recipe ${result.insertId} saved successfully`);
        }
    });
});

// Get a specific favorite recipe of user
app.get('/api/users/:userId/favorites/:recipeId', (req, res) => {
    const { userId, recipeId } = req.params;
    console.log('Get a specific favorite recipe of user');
    db.query('SELECT * FROM USER_RECIPE_FAV WHERE user_id = ? AND recipe_id = ?', [userId, recipeId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error retrieving recipe favorites');
        } else {
            res.status(200).json(result[0]);
        }
    });
});

// Delete a favorite recipe
app.delete('/api/users/:userId/favorites/:recipeId', (req, res) => {
    const { userId, recipeId } = req.params;
    console.log('Delete a favorite recipe');
    console.log(`${userId} ${recipeId}`);
    db.query('DELETE FROM USER_RECIPE_FAV WHERE user_id = ? AND recipe_id = ?', [userId, recipeId]);
    res.status(200).send(`Recipe ${recipeId} deleted successfully`);
});

PORT=4000
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
