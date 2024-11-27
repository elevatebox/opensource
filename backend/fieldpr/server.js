const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Initialize Express app
const app = express();
const port = 3000;

// Enable CORS to allow the frontend to make requests to this server
app.use(cors());

// Middleware to parse JSON request body
app.use(express.json());

// File path to store the data
const dataFilePath = path.join(__dirname, 'data.json');

// API Endpoint to save form data
app.post('/api/save-form', (req, res) => {
    const { name, state, phone, email } = req.body;

    // Validate the incoming data
    if (!name || !state || !phone || !email) {
        return res.status(400).json({ message: "All fields are required." });
    }

    // Create a new entry
    const newEntry = {
        name,
        state,
        phone,
        email,
        dateSubmitted: new Date().toISOString()
    };

    // Read the existing data from the JSON file
    fs.readFile(dataFilePath, 'utf-8', (err, data) => {
        let jsonData = [];

        // If the file exists and has content, parse it into a JavaScript object
        if (!err && data) {
            jsonData = JSON.parse(data);
        }

        // Add the new entry to the data array
        jsonData.push(newEntry);

        // Write the updated data back to the JSON file
        fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: "Error saving data." });
            }
            res.status(200).json({ message: "Data saved successfully." });
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
