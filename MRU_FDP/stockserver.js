// Import required modules
const express = require("express"); // Express framework for building web applications
const mongoose = require("mongoose"); // MongoDB object modeling tool
const cors = require("cors"); // Middleware to handle Cross-Origin Resource Sharing
const bodyParser = require("body-parser"); // Middleware to parse incoming request bodies

// Initialize the Express application
const app = express();

// Set the port number (use environment variable if available, else default to 5000)
const PORT = process.env.PORT || 5000;

// Apply middleware
app.use(cors()); // Enable CORS to allow cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON data

// Connect to MongoDB database
mongoose.connect("Your MongoDB URI link", {
	useNewUrlParser: true, // Use the new MongoDB connection string parser
	useUnifiedTopology: true, // Enable the new unified topology engine for better connection handling
});

// Define a schema for storing stock data in MongoDB
const stockSchema = new mongoose.Schema({
	company: String, // Name of the company
	description: String, // A brief description of the company
	initial_price: Number, // Initial stock price
	price_2002: Number, // Stock price in 2002
	price_2007: Number, // Stock price in 2007
	symbol: String, // Stock market symbol
});

// Create a model based on the schema
const Stock = mongoose.model("Stock", stockSchema);

// Define a route to get all stock data
app.get("/api/stocks", async (req, res) => {
	try {
		const stocks = await Stock.find(); // Fetch all stock records from the database
		res.json(stocks); // Respond with the data in JSON format
	} catch (error) {
		console.error("Error fetching stocks:", error); // Log any errors to the console
		res.status(500).json({ error: "Internal Server Error" }); // Respond with a 500 error if something goes wrong
	}
});

// Define a route to add a new stock to the watchlist
app.post("/api/watchlist", async (req, res) => {
	try {
		// Extract data from the request body
		const {
			company,
			description,
			initial_price,
			price_2002,
			price_2007,
			symbol,
		} = req.body;

		// Create a new stock document with the received data
		const stock = new Stock({
			company,
			description,
			initial_price,
			price_2002,
			price_2007,
			symbol,
		});

		// Save the new stock to the database
		await stock.save();

		// Respond with a success message
		res.json({ message: "Stock added to watchlist successfully" });
	} catch (error) {
		console.error("Error adding stock to watchlist:", error); // Log any errors to the console
		res.status(500).json({ error: "Internal Server Error" }); // Respond with a 500 error if something goes wrong
	}
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`); // Log a message when the server is running
});
