// Import required modules
import express from 'express'; // Express framework for building web applications
import morgan from 'morgan'; // HTTP request logger middleware
import cors from 'cors'; // Middleware to enable Cross-Origin Resource Sharing
import { config } from 'dotenv'; // For loading environment variables from a .env file
import router from './router/route.js'; // Custom router for API endpoints
import connect from './database/conn.js'; // Function to establish a database connection

// Load environment variables
config(); // Reads variables from a .env file and adds them to `process.env`

// Initialize the Express application
const app = express();

// Middleware for logging HTTP requests in a concise format
app.use(morgan('tiny'));

// Middleware to enable CORS for all incoming requests
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Define the port for the server, using an environment variable if available
const port = process.env.PORT || 8080;

// Define a base route for API endpoints
app.use('/api', router);

// Define a default route for the root path
app.get('/', (req, res) => {
    try {
        res.json("Get Request"); // Respond with a simple JSON message
    } catch (error) {
        res.json(error); // Send an error response if an exception occurs
    }
});

// Connect to the database and start the server
connect()
    .then(() => {
        // Start the server if the database connection is successful
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`); // Log the server URL
        });
    })
    .catch(error => {
        // Log an error message if the database connection fails
        console.log("Invalid Database Connection", error);
    });
