// server.js

// Importing required modules
const express = require('express'); // Framework for building web applications
const mongoose = require('mongoose'); // Library for MongoDB interaction
const cors = require('cors'); // Middleware to enable Cross-Origin Resource Sharing
const bodyParser = require('body-parser'); // Middleware to parse incoming JSON requests

// Importing route modules
const patientsRouter = require('./routes/patients'); // Routes for handling patient-related API calls
const doctorsRouter = require('./routes/doctors'); // Routes for handling doctor-related API calls
const appointmentsRouter = require('./routes/appointments'); // Routes for handling appointment-related API calls

// Initialize the Express application
const app = express();

// Set the port to listen on, using the environment variable PORT or defaulting to 5000
const PORT = process.env.PORT || 5000;

// Use middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Use middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Connect to the MongoDB database
mongoose.connect(
    'mongodb://localhost:27017/hospital', // MongoDB connection string
    {
        useNewUrlParser: true, // Use the new URL parser
        useUnifiedTopology: true // Use the new server discovery and monitoring engine
    }
);

// Get the MongoDB connection instance
const connection = mongoose.connection;

// Listen for a successful connection to MongoDB
connection.once('open', () => {
    console.log('MongoDB database connection established successfully'); // Log success message
});

// Use the patients router for routes starting with '/patients'
app.use('/patients', patientsRouter);

// Use the doctors router for routes starting with '/doctors'
app.use('/doctors', doctorsRouter);

// Use the appointments router for routes starting with '/appointments'
app.use('/appointments', appointmentsRouter);

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Log the port number the server is running on
});
