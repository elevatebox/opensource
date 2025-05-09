require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

// Define user schema and model
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});
const User = mongoose.model('User', userSchema);

// Routes
app.get('/', (req, res) => res.sendFile(__dirname + '/views/login.html'));
app.get('/home', (req, res) => res.sendFile(__dirname + '/views/home.html'));
app.get('/verticalFarming', (req, res) => res.sendFile(__dirname + '/views/verticalFarming.html'));

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        res.redirect('/home');
    } else {
        res.send('Invalid username or password');
    }
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
