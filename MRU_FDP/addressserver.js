// Import required modules
const express = require('express'); // Express framework for building web applications
const mongoose = require('mongoose'); // MongoDB object modeling tool
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const cors = require('cors'); // Middleware to handle Cross-Origin Resource Sharing

// Initialize the Express application
const app = express();

// Use bodyParser to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded data
app.use(bodyParser.json()); // Parse JSON data
app.use(cors()); // Enable CORS to allow cross-origin requests

// Connect to MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/addressbook'); // Specify the database URL

// Import the Address model
const Address = require('./models/address');

// GET route to fetch all addresses from the database
app.get('/api/addresses', async (req, res) => {
    try {
        const addresses = await Address.find(); // Retrieve all addresses
        res.json(addresses); // Send the addresses as JSON
    } catch (err) {
        res.status(500).json({ error: err.message }); // Handle errors and respond with 500 status
    }
});

// POST route to add a new address to the database
app.post('/api/addresses', async (req, res) => {
    try {
        const newAddress = new Address(req.body); // Create a new Address document with request data
        const savedAddress = await newAddress.save(); // Save the new address to the database
        res.status(201).json(savedAddress); // Respond with the saved address and a 201 status
    } catch (err) {
        res.status(400).json({ error: err.message }); // Handle errors and respond with 400 status
    }
});

// PUT route to update an existing address
app.put('/api/addresses/:id', async (req, res) => {
    try {
        const updatedAddress = await Address.findByIdAndUpdate(
            req.params.id, // Find the address by its ID
            req.body, // Update with the new data from the request
            { new: true } // Return the updated document
        );
        res.json(updatedAddress); // Respond with the updated address
    } catch (err) {
        res.status(400).json({ error: err.message }); // Handle errors and respond with 400 status
    }
});

// DELETE route to delete an address by its ID
app.delete('/api/addresses/:id', async (req, res) => {
    try {
        await Address.findByIdAndRemove(req.params.id); // Remove the address with the specified ID
        res.json({ message: 'Address deleted' }); // Respond with a success message
    } catch (err) {
        res.status(500).json({ error: err.message }); // Handle errors and respond with 500 status
    }
});

// Start the server and listen on the specified port
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}`); // Log a message when the server starts
});
