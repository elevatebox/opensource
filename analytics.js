const express = require('express');     // Express.js framework for creating web server
const mongoose = require('mongoose');    // MongoDB object modeling tool
const cors = require('cors');           // Enable Cross-Origin Resource Sharing
const moment = require('moment');       // Library for handling dates and times

// Initialize express application
const app = express();

app.use(express.json());    // Parse incoming JSON requests
app.use(cors());           // Enable CORS for all routes

// replace with your actual database URL
const MONGODB_URI = 'mongodb://localhost:27017/analyticsApp';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

//
// for tracking page views
const pageViewSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true      // URL path that was viewed
    },
    timestamp: {
        type: Date,
        default: Date.now   // When the page was viewed
    },
    userAgent: String,      // Browser/device information
    ipAddress: String,      // Visitor's IP address
    referrer: String,       // Where the visitor came from
    sessionId: String       // To group views from same session
});

// for tracking user events/actions
const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true      // Name of the event (e.g., 'button_click')
    },
    category: {
        type: String,
        required: true      // Category of event (e.g., 'user_interaction')
    },
    properties: {
        type: Map,
        of: String         // Additional event properties
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    sessionId: String
});

// Create models from schemas
const PageView = mongoose.model('PageView', pageViewSchema);
const Event = mongoose.model('Event', eventSchema);


// POST track page view
app.post('/api/track/pageview', async (req, res) => {
    try {
        // Create new page view record
        const pageView = new PageView({
            path: req.body.path,
            userAgent: req.body.userAgent,
            ipAddress: req.ip,
            referrer: req.body.referrer,
            sessionId: req.body.sessionId
        });
        
        // Save page view to database
        await pageView.save();
        res.status(201).json({ message: 'Page view tracked' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// POST track event
app.post('/api/track/event', async (req, res) => {
    try {
        // Create new event record
        const event = new Event({
            name: req.body.name,
            category: req.body.category,
            properties: req.body.properties,
            sessionId: req.body.sessionId
        });
        
        // Save event to database
        await event.save();
        res.status(201).json({ message: 'Event tracked' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// GET page view statistics
app.get('/api/analytics/pageviews', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        
        // Build date filter
        const dateFilter = {};
        if (startDate) {
            dateFilter.timestamp = { $gte: new Date(startDate) };
        }
        if (endDate) {
            dateFilter.timestamp = { ...dateFilter.timestamp, $lte: new Date(endDate) };
        }
        
        // Aggregate page view data
        const pageViews = await PageView.aggregate([
            { $match: dateFilter },
            { $group: {
                _id: '$path',
                count: { $sum: 1 },
                uniqueSessions: { $addToSet: '$sessionId' }
            }},
            { $project: {
                path: '$_id',
                views: '$count',
                uniqueVisitors: { $size: '$uniqueSessions' },
                _id: 0
            }},
            { $sort: { views: -1 }}
        ]);
        
        res.json(pageViews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET event statistics
app.get('/api/analytics/events', async (req, res) => {
    try {
        const { startDate, endDate, category } = req.query;
        
        // Build filter
        const filter = {};
        if (startDate || endDate) {
            filter.timestamp = {};
            if (startDate) filter.timestamp.$gte = new Date(startDate);
            if (endDate) filter.timestamp.$lte = new Date(endDate);
        }
        if (category) filter.category = category;
        
        // Aggregate event data
        const events = await Event.aggregate([
            { $match: filter },
            { $group: {
                _id: '$name',
                count: { $sum: 1 },
                uniqueSessions: { $addToSet: '$sessionId' }
            }},
            { $project: {
                eventName: '$_id',
                occurrences: '$count',
                uniqueUsers: { $size: '$uniqueSessions' },
                _id: 0
            }},
            { $sort: { occurrences: -1 }}
        ]);
        
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET daily trends
app.get('/api/analytics/trends', async (req, res) => {
    try {
        const days = parseInt(req.query.days) || 7;
        const startDate = moment().subtract(days, 'days').startOf('day').toDate();
        
        // Aggregate daily stats
        const dailyStats = await PageView.aggregate([
            { $match: { timestamp: { $gte: startDate } } },
            { $group: {
                _id: { 
                    $dateToString: { format: "%Y-%m-%d", date: "$timestamp" }
                },
                pageViews: { $sum: 1 },
                uniqueVisitors: { $addToSet: '$sessionId' }
            }},
            { $project: {
                date: '$_id',
                pageViews: 1,
                uniqueVisitors: { $size: '$uniqueVisitors' },
                _id: 0
            }},
            { $sort: { date: 1 }}
        ]);
        
        res.json(dailyStats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET real-time stats (last 5 minutes)
app.get('/api/analytics/realtime', async (req, res) => {
    try {
        const fiveMinutesAgo = moment().subtract(5, 'minutes').toDate();
        
        // Get recent activity
        const [pageViews, activeUsers, topPages] = await Promise.all([
            // Count recent page views
            PageView.countDocuments({ timestamp: { $gte: fiveMinutesAgo } }),
            
            // Count unique users
            PageView.distinct('sessionId', { timestamp: { $gte: fiveMinutesAgo } }),
            
            // Get top pages in last 5 minutes
            PageView.aggregate([
                { $match: { timestamp: { $gte: fiveMinutesAgo } } },
                { $group: { _id: '$path', count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: 5 }
            ])
        ]);
        
        res.json({
            pageViews,
            activeUsers: activeUsers.length,
            topPages
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