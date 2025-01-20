const express = require('express');     // Express.js framework for creating web server
const mongoose = require('mongoose');    // MongoDB object modeling tool
const cors = require('cors');           // Enable Cross-Origin Resource Sharing
const axios = require('axios');         // HTTP client for making API requests
const NodeCache = require('node-cache'); // For caching weather data

// Initialize express application
const app = express();

// Initialize cache with 10 minute TTL (Time To Live)
const cache = new NodeCache({ stdTTL: 600 });

app.use(express.json());    // Parse incoming JSON requests
app.use(cors());           // Enable CORS for all routes

//replace with your actual database URL
const MONGODB_URI = 'mongodb://localhost:27017/weatherApp';

// OpenWeatherMap API configuration replaces with your API key
const WEATHER_API_KEY = 'your_openweathermap_api_key';
const WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

//for storing user's favorite locations
const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

//for storing historical weather data
const weatherHistorySchema = new mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    temperature: Number,
    humidity: Number,
    windSpeed: Number,
    description: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Create models from schemas
const Location = mongoose.model('Location', locationSchema);
const WeatherHistory = mongoose.model('WeatherHistory', weatherHistorySchema);

// Helper function to fetch weather data from OpenWeatherMap API
async function fetchWeatherData(lat, lon) {
    try {
        const response = await axios.get(`${WEATHER_API_BASE_URL}/weather`, {
            params: {
                lat: lat,
                lon: lon,
                appid: WEATHER_API_KEY,
                units: 'metric' // Use metric units (Celsius)
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch weather data');
    }
}

// WEATHER ROUTES

// GET current weather by coordinates
app.get('/api/weather', async (req, res) => {
    try {
        const { lat, lon } = req.query;
        if (!lat || !lon) {
            return res.status(400).json({ message: 'Latitude and longitude are required' });
        }

        // Check cache first
        const cacheKey = `weather_${lat}_${lon}`;
        const cachedData = cache.get(cacheKey);
        
        if (cachedData) {
            return res.json(cachedData);
        }

        // Fetch fresh weather data
        const weatherData = await fetchWeatherData(lat, lon);
        
        // Format the response
        const formattedData = {
            location: weatherData.name,
            temperature: weatherData.main.temp,
            humidity: weatherData.main.humidity,
            windSpeed: weatherData.wind.speed,
            description: weatherData.weather[0].description,
            icon: weatherData.weather[0].icon
        };

        // Store in cache
        cache.set(cacheKey, formattedData);
        
        // Save to history
        await new WeatherHistory({
            location: weatherData.name,
            ...formattedData
        }).save();

        res.json(formattedData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET 5-day forecast
app.get('/api/weather/forecast', async (req, res) => {
    try {
        const { lat, lon } = req.query;
        if (!lat || !lon) {
            return res.status(400).json({ message: 'Latitude and longitude are required' });
        }

        // Check cache
        const cacheKey = `forecast_${lat}_${lon}`;
        const cachedData = cache.get(cacheKey);
        
        if (cachedData) {
            return res.json(cachedData);
        }

        // Fetch forecast data
        const response = await axios.get(`${WEATHER_API_BASE_URL}/forecast`, {
            params: {
                lat: lat,
                lon: lon,
                appid: WEATHER_API_KEY,
                units: 'metric'
            }
        });

        // Format the forecast data
        const forecast = response.data.list.map(item => ({
            datetime: item.dt_txt,
            temperature: item.main.temp,
            humidity: item.main.humidity,
            windSpeed: item.wind.speed,
            description: item.weather[0].description,
            icon: item.weather[0].icon
        }));

        // Store in cache
        cache.set(cacheKey, forecast);

        res.json(forecast);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// LOCATION ROUTES

// GET saved locations
app.get('/api/locations', async (req, res) => {
    try {
        const locations = await Location.find().sort({ createdAt: -1 });
        res.json(locations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST new location
app.post('/api/locations', async (req, res) => {
    try {
        const { name, latitude, longitude } = req.body;
        
        // Verify location exists by fetching its weather
        await fetchWeatherData(latitude, longitude);
        
        const location = new Location({
            name,
            latitude,
            longitude
        });
        
        const savedLocation = await location.save();
        res.status(201).json(savedLocation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE location
app.delete('/api/locations/:id', async (req, res) => {
    try {
        const deletedLocation = await Location.findByIdAndDelete(req.params.id);
        if (!deletedLocation) {
            return res.status(404).json({ message: 'Location not found' });
        }
        res.json({ message: 'Location deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET weather history for a location
app.get('/api/weather/history/:location', async (req, res) => {
    try {
        const history = await WeatherHistory.find({
            location: req.params.location
        })
        .sort({ timestamp: -1 })
        .limit(10);  // Get last 10 records
        
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});