// Import required packages
const express = require('express');  // Express.js is a framework for creating web server
const mongoose = require('mongoose'); // MongoDB is a object modeling tool
const cors = require('cors');        // Middleware is ued to enable Cross-Origin Resource Sharing

const app = express();// used to Initialize express app


app.use(express.json());    // Parses incoming JSON requests
app.use(cors());           // Enables CORS (Cross-Origin Resource Sharing) for all routes

const MONGODB_URI = 'mongodb://localhost:27017/movieApp';// it is a MongoDB connection string, it replaces with your actual database URL


mongoose.connect(MONGODB_URI)// used to Connect to MongoDB
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));


const movieSchema = new mongoose.Schema({// structure of our movie documents
    title: {
        type: String,
        required: true      // Making title a required field
    },
    director: {
        type: String,
        required: true
    },
    releaseYear: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,            // Minimum rating value
        max: 10,           // Maximum rating value
        default: 0         // Default rating if none provided
    }
});

const Movie = mongoose.model('Movie', movieSchema);// Create Movie model from schema

// CRUD (Create, Read, Update, and Delete.) Routes

app.get('/api/movies', async (req, res) => {// GET all movies

    try {
        
        const movies = await Movie.find();// Fetch all movies from database
        res.json(movies);   // Send movies as JSON response
    } catch (error) {// If error occurs, send 500 status code and error message
        
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/movies/:id', async (req, res) => {// GET single movie by ID
    try {
        const movie = await Movie.findById(req.params.id); // Find movie by ID from URL parameter

        if (!movie) {
            
            return res.status(404).json({ message: 'Movie not found' });// If movie not found, send 404 status
        }
        res.json(movie);    // Send found movie as response
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.post('/api/movies', async (req, res) => {// POST new movie
    try {

        const newMovie = new Movie({ // Create new movie instance with requesting the body data of movie

            title: req.body.title,
            director: req.body.director,
            releaseYear: req.body.releaseYear,
            genre: req.body.genre,
            rating: req.body.rating
        });
        
     
        const savedMovie = await newMovie.save();   // Save movie to database
        
        res.status(201).json(savedMovie);   // Save movie to database
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.put('/api/movies/:id', async (req, res) => {// PUT update movie

    try {
      
        const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }  // Find movie by ID and update with new data
                           // { new: true } returns updated document instead of original
        );
        
        if (!updatedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json(updatedMovie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


app.delete('/api/movies/:id', async (req, res) => {// DELETE movie
    try {
       
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id); // Find movie by ID and delete it
        
        if (!deletedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);// Start server on port 3000 and listens to the port or server
});