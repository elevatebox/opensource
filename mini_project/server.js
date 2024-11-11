const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// In-memory "database" for user credentials (not persistent)
const users = {
    admin: {
        username: 'admin',
        password: '$2a$10$VN6yNGPqgIYfgRP3gXQ72u6z8lD9NlP5UE9Xn0m7Zjpmtjb2Gd7Ku', // hashed 'password'
    },
};

// Register endpoint (for creating a user)
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // In-memory user storage (just for demonstration)
    users[username] = {
        username,
        password: hashedPassword,
    };

    res.status(201).send('User created');
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Check if the user exists in memory
    const user = users[username];
    if (!user) {
        return res.status(401).send('Invalid credentials');
    }

    // Compare the entered password with the stored (hashed) password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).send('Invalid credentials');
    }

    // Generate a JWT token
    const token = jwt.sign({ username: user.username }, 'yourSecretKey', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
