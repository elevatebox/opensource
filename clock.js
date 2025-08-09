const express = require('express');     // Express.js framework for creating web server
const mongoose = require('mongoose');    // MongoDB object modeling tool
const cors = require('cors');           // Enable Cross-Origin Resource Sharing
const moment = require('moment-timezone'); // Library for handling dates, times and timezones

// Initialize express application
const app = express();

app.use(express.json());    // Parse incoming JSON requests
app.use(cors());           // Enable CORS for all routes

// replace with your actual database URL
const MONGODB_URI = 'mongodb://localhost:27017/clockApp';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

//  structure for alarm documents
const alarmSchema = new mongoose.Schema({
    time: {
        type: String,       // Store time in 24-hour format (HH:mm)
        required: true
    },
    label: {
        type: String,
        default: 'Alarm'    // Default label if none provided
    },
    isEnabled: {
        type: Boolean,
        default: true       // Alarms are enabled by default
    },
    repeatDays: {          // Array of days when alarm should repeat
        type: [String],     // e.g., ['Monday', 'Wednesday', 'Friday']
        default: []         // Empty array means no repeat
    },
    timezone: {
        type: String,
        default: 'UTC'      // Default timezone
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create Alarm model from scheme
const Alarm = mongoose.model('Alarm', alarmSchema);

// GET current time in specified timezone
app.get('/api/time', (req, res) => {
    try {
        // Get timezone from query parameter or use UTC as default
        const timezone = req.query.timezone || 'UTC';
        
        // Get current time in specified timezone
        const currentTime = moment().tz(timezone);
        
        // Send formatted time response
        res.json({
            time: currentTime.format('HH:mm:ss'),
            date: currentTime.format('YYYY-MM-DD'),
            timezone: timezone,
            dayOfWeek: currentTime.format('dddd')
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET list of all available timezones
app.get('/api/timezones', (req, res) => {
    try {
        // Get all timezone names from moment-timezone
        const timezones = moment.tz.names();
        res.json(timezones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET all alarms
app.get('/api/alarms', async (req, res) => {
    try {
        // Fetch all alarms from database, sorted by time
        const alarms = await Alarm.find().sort({ time: 1 });
        res.json(alarms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST new alarm
app.post('/api/alarms', async (req, res) => {
    try {
        // Validate time format (HH:mm)
        if (!/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(req.body.time)) {
            return res.status(400).json({ message: 'Invalid time format. Use HH:mm' });
        }
        
        // Create new alarm instance
        const newAlarm = new Alarm({
            time: req.body.time,
            label: req.body.label,
            repeatDays: req.body.repeatDays,
            timezone: req.body.timezone || 'UTC'
        });
        
        // Save alarm to database
        const savedAlarm = await newAlarm.save();
        res.status(201).json(savedAlarm);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT update alarm
app.put('/api/alarms/:id', async (req, res) => {
    try {
        // If time is being updated, validate format
        if (req.body.time && !/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(req.body.time)) {
            return res.status(400).json({ message: 'Invalid time format. Use HH:mm' });
        }
        
        // Find and update alarm
        const updatedAlarm = await Alarm.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }   // Return updated document
        );
        
        if (!updatedAlarm) {
            return res.status(404).json({ message: 'Alarm not found' });
        }
        res.json(updatedAlarm);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PATCH toggle alarm enabled status
app.patch('/api/alarms/:id/toggle', async (req, res) => {
    try {
        // Find alarm by ID
        const alarm = await Alarm.findById(req.params.id);
        if (!alarm) {
            return res.status(404).json({ message: 'Alarm not found' });
        }
        
        // Toggle enabled status
        alarm.isEnabled = !alarm.isEnabled;
        const updatedAlarm = await alarm.save();
        
        res.json(updatedAlarm);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE alarm
app.delete('/api/alarms/:id', async (req, res) => {
    try {
        // Find and delete alarm
        const deletedAlarm = await Alarm.findByIdAndDelete(req.params.id);
        
        if (!deletedAlarm) {
            return res.status(404).json({ message: 'Alarm not found' });
        }
        res.json({ message: 'Alarm deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});