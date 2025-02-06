// Importing required modules
import express, { json } from 'express'; // Express framework for building web applications; `json` middleware is for parsing JSON
import cors from 'cors'; // Middleware to enable Cross-Origin Resource Sharing
import { connect } from 'mongoose'; // MongoDB library for interacting with the database
import eventRoute from './routes/eventRoute.js'; // Importing custom event route module

// Initialize the Express application
const app = express();

// Set the port for the server
const port = 4000;

// Middleware to enable CORS for all incoming requests
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(json());

// Connect to MongoDB
connect('mongodb://localhost/mydatabase', {
    useNewUrlParser: true, // Use the new MongoDB URL parser
    useUnifiedTopology: true, // Use the new server discovery and monitoring engine
})
    .then(() => console.log('Connected to MongoDB')) // Log a success message when connected
    .catch((error) => // Handle and log any connection errors
        console.error('Failed to connect to MongoDB', error)
    );

// Define your routes here
// Mount the event routes under the '/events' endpoint
app.use('/events', eventRoute);

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`); // Log a message indicating the server has started
});
