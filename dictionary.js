const express = require('express');     // Express.js framework for creating web server
const mongoose = require('mongoose');    // MongoDB object modeling tool
const cors = require('cors');           // Enable Cross-Origin Resource Sharing
const axios = require('axios');         // HTTP client for making API requests

// Initialize express application
const app = express();

app.use(express.json());    // Parse incoming JSON requests
app.use(cors());           // Enable CORS for all routes

// replace with your actual database URL
const MONGODB_URI = 'mongodb://localhost:27017/dictionaryApp';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// structure for dictionary entries
const wordSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true,
        unique: true       // Ensure no duplicate words
    },
    definition: {
        type: String,
        required: true
    },
    partOfSpeech: {
        type: String,
        enum: ['noun', 'verb', 'adjective', 'adverb', 'pronoun', 'preposition', 'conjunction', 'interjection'],
        required: true
    },
    examples: [{
        type: String
    }],
    synonyms: [{
        type: String
    }],
    antonyms: [{
        type: String
    }],
    pronunciation: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Add text index for search functionality
wordSchema.index({ word: 'text', definition: 'text' });

// Create Word model from schema
const Word = mongoose.model('Word', wordSchema);

// GET word by exact match
app.get('/api/words/:word', async (req, res) => {
    try {
        // Find word case-insensitive
        const word = await Word.findOne({
            word: new RegExp(`^${req.params.word}$`, 'i')
        });
        
        if (!word) {
            // If word not in local database, try fetching from external API
            try {
                const response = await axios.get(
                    `https://api.dictionaryapi.dev/api/v2/entries/en/${req.params.word}`
                );
                
                // Format external API response
                const externalWord = {
                    word: response.data[0].word,
                    definition: response.data[0].meanings[0].definitions[0].definition,
                    partOfSpeech: response.data[0].meanings[0].partOfSpeech,
                    examples: response.data[0].meanings[0].definitions[0].example ? 
                             [response.data[0].meanings[0].definitions[0].example] : [],
                    synonyms: response.data[0].meanings[0].synonyms || [],
                    antonyms: response.data[0].meanings[0].antonyms || []
                };
                
                // Save to local database for future use
                const newWord = new Word(externalWord);
                await newWord.save();
                
                return res.json(externalWord);
            } catch {
                return res.status(404).json({ message: 'Word not found' });
            }
        }
        res.json(word);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET search words (partial match)
app.get('/api/search', async (req, res) => {
    try {
        const searchTerm = req.query.q;
        if (!searchTerm) {
            return res.status(400).json({ message: 'Search term is required' });
        }
        
        // Search words using text index
        const words = await Word.find(
            { $text: { $search: searchTerm } },
            { score: { $meta: "textScore" } }   // Add text match score
        )
        .sort({ score: { $meta: "textScore" } }) // Sort by relevance
        .limit(10);  // Limit results
        
        res.json(words);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET random word
app.get('/api/random', async (req, res) => {
    try {
        // Get random word from database
        const count = await Word.countDocuments();
        const random = Math.floor(Math.random() * count);
        const word = await Word.findOne().skip(random);
        
        if (!word) {
            return res.status(404).json({ message: 'No words in dictionary' });
        }
        res.json(word);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST new word
app.post('/api/words', async (req, res) => {
    try {
        // Check if word already exists
        const existingWord = await Word.findOne({
            word: new RegExp(`^${req.body.word}$`, 'i')
        });
        
        if (existingWord) {
            return res.status(400).json({ message: 'Word already exists' });
        }
        
        // Create new word entry
        const newWord = new Word({
            word: req.body.word,
            definition: req.body.definition,
            partOfSpeech: req.body.partOfSpeech,
            examples: req.body.examples || [],
            synonyms: req.body.synonyms || [],
            antonyms: req.body.antonyms || [],
            pronunciation: req.body.pronunciation
        });
        
        // Save word to database
        const savedWord = await newWord.save();
        res.status(201).json(savedWord);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT update word
app.put('/api/words/:word', async (req, res) => {
    try {
        // Find and update word
        const updatedWord = await Word.findOneAndUpdate(
            { word: new RegExp(`^${req.params.word}$`, 'i') },
            req.body,
            { new: true }
        );
        
        if (!updatedWord) {
            return res.status(404).json({ message: 'Word not found' });
        }
        res.json(updatedWord);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE word
app.delete('/api/words/:word', async (req, res) => {
    try {
        // Find and delete word
        const deletedWord = await Word.findOneAndDelete({
            word: new RegExp(`^${req.params.word}$`, 'i')
        });
        
        if (!deletedWord) {
            return res.status(404).json({ message: 'Word not found' });
        }
        res.json({ message: 'Word deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});