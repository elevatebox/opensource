const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database file path
const DB_PATH = path.join(__dirname, 'db.json');

// Initialize database if it doesn't exist
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify({ entries: [], reminders: [] }));
}

// Helper function to read database
const readDB = () => {
  const data = fs.readFileSync(DB_PATH, 'utf8');
  return JSON.parse(data);
};

// Helper function to write to database
const writeDB = (data) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

// Convert to IST (Indian Standard Time)
const getISTDate = () => {
  const date = new Date();
  // IST is UTC+5:30
  const istTime = new Date(date.getTime() + (5.5 * 60 * 60 * 1000));
  return istTime.toISOString().split('T')[0]; // Return YYYY-MM-DD format
};

// Get all entries
app.get('/api/entries', (req, res) => {
  const db = readDB();
  res.json(db.entries);
});

// Get entry by date
app.get('/api/entries/:date', (req, res) => {
  const { date } = req.params;
  const db = readDB();
  const entry = db.entries.find(e => e.date === date);
  
  if (entry) {
    res.json(entry);
  } else {
    res.status(404).json({ message: 'No entry found for this date' });
  }
});

// Create or update an entry
app.post('/api/entries', (req, res) => {
  const { content } = req.body;
  const date = getISTDate();
  const db = readDB();
  
  // Check if entry for today exists
  const existingEntryIndex = db.entries.findIndex(e => e.date === date);
  
  if (existingEntryIndex !== -1) {
    // Update existing entry
    db.entries[existingEntryIndex].content = content;
    db.entries[existingEntryIndex].updatedAt = new Date().toISOString();
  } else {
    // Create new entry
    db.entries.push({
      id: Date.now().toString(),
      date,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
  
  writeDB(db);
  res.status(201).json({ message: 'Entry saved successfully' });
});

// Update an entry
app.put('/api/entries/:date', (req, res) => {
  const { date } = req.params;
  const { content } = req.body;
  const today = getISTDate();
  
  // Only allow updating today's entry
  if (date !== today) {
    return res.status(403).json({ message: 'You can only update today\'s entry' });
  }
  
  const db = readDB();
  const entryIndex = db.entries.findIndex(e => e.date === date);
  
  if (entryIndex === -1) {
    return res.status(404).json({ message: 'No entry found for today' });
  }
  
  db.entries[entryIndex].content = content;
  db.entries[entryIndex].updatedAt = new Date().toISOString();
  
  writeDB(db);
  res.json({ message: 'Entry updated successfully' });
});

// Delete an entry
app.delete('/api/entries/:date', (req, res) => {
  const { date } = req.params;
  const db = readDB();
  const entryIndex = db.entries.findIndex(e => e.date === date);
  
  if (entryIndex === -1) {
    return res.status(404).json({ message: 'Entry not found' });
  }
  
  db.entries.splice(entryIndex, 1);
  writeDB(db);
  res.json({ message: 'Entry deleted successfully' });
});

// Get all reminders
app.get('/api/reminders', (req, res) => {
  const db = readDB();
  res.json(db.reminders);
});

// Create a reminder
app.post('/api/reminders', (req, res) => {
  const { date, title } = req.body;
  
  if (!date || !title) {
    return res.status(400).json({ message: 'Date and title are required' });
  }
  
  const today = getISTDate();
  
  // Only allow setting reminders for future dates
  if (date <= today) {
    return res.status(400).json({ message: 'Reminders can only be set for future dates' });
  }
  
  const db = readDB();
  
  db.reminders.push({
    id: Date.now().toString(),
    date,
    title,
    createdAt: new Date().toISOString()
  });
  
  writeDB(db);
  res.status(201).json({ message: 'Reminder set successfully' });
});

// Delete a reminder
app.delete('/api/reminders/:id', (req, res) => {
  const { id } = req.params;
  const db = readDB();
  const reminderIndex = db.reminders.findIndex(r => r.id === id);
  
  if (reminderIndex === -1) {
    return res.status(404).json({ message: 'Reminder not found' });
  }
  
  db.reminders.splice(reminderIndex, 1);
  writeDB(db);
  res.json({ message: 'Reminder deleted successfully' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
