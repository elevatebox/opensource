const express = require('express');     // Express.js framework for creating web server
const mongoose = require('mongoose');    // MongoDB object modeling tool
const cors = require('cors');           // Enable Cross-Origin Resource Sharing

// Initialize express application
const app = express();

app.use(express.json());    // Parse incoming JSON requests
app.use(cors());           // Enable CORS for all routes

// replace with your actual database URL
const MONGODB_URI = 'mongodb://localhost:27017/todoApp';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define Todo Schema - structure of our todo documents
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true      // Make title a required field
    },
    description: {
        type: String,
        default: ''         // Empty string if no description provided
    },
    completed: {
        type: Boolean,
        default: false      // Tasks are incomplete by default
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],  // Only allow these priority values
        default: 'medium'                 // Default priority
    },
    dueDate: {
        type: Date,
        default: null       // No due date by default
    },
    createdAt: {
        type: Date,
        default: Date.now   // Automatically set creation date
    }
});

// Create Todo model from schema
const Todo = mongoose.model('Todo', todoSchema);

// CRUD Routes

// GET all todos
app.get('/api/todos', async (req, res) => {
    try {
        // Get query parameters for filtering
        const { completed, priority } = req.query;
        
        // Build filter object based on query parameters
        const filter = {};
        if (completed !== undefined) {
            filter.completed = completed === 'true';
        }
        if (priority) {
            filter.priority = priority;
        }

        // Fetch todos from database with filters
        const todos = await Todo.find(filter).sort({ createdAt: -1 });
        res.json(todos);   // Send todos as JSON response
    } catch (error) {
        // If error occurs, send 500 status code and error message
        res.status(500).json({ message: error.message });
    }
});

// GET single todo by ID
app.get('/api/todos/:id', async (req, res) => {
    try {
        // Find todo by ID from URL parameter
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            // If todo not found, send 404 status
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(todo);    // Send found todo as response
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST new todo
app.post('/api/todos', async (req, res) => {
    try {
        // Create new todo instance with request body data
        const newTodo = new Todo({
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            dueDate: req.body.dueDate
        });
        
        // Save todo to database
        const savedTodo = await newTodo.save();
        // Send saved todo with 201 (Created) status
        res.status(201).json(savedTodo);
    } catch (error) {
        // If validation error occurs, send 400 status
        res.status(400).json({ message: error.message });
    }
});

// PUT update todo
app.put('/api/todos/:id', async (req, res) => {
    try {
        // Find todo by ID and update with new data
        // { new: true } returns updated document instead of original
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        
        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(updatedTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PATCH toggle todo completion status
app.patch('/api/todos/:id/toggle', async (req, res) => {
    try {
        // Find todo by ID
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        
        // Toggle completed status
        todo.completed = !todo.completed;
        // Save updated todo
        const updatedTodo = await todo.save();
        
        res.json(updatedTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE todo
app.delete('/api/todos/:id', async (req, res) => {
    try {
        // Find todo by ID and delete it
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        
        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE all completed todos
app.delete('/api/todos/completed', async (req, res) => {
    try {
        // Delete all todos where completed is true
        const result = await Todo.deleteMany({ completed: true });
        res.json({ 
            message: 'Completed todos deleted successfully',
            count: result.deletedCount 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});