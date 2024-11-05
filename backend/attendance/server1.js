const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Simulated Users for login
const users = {
  admin: 'admin123',
};

// In-memory data storage for attendance
let attendanceData = {};

// Function to get all Mondays starting from a specific month of a given year
const getMondays = (year, month) => {
  const mondays = [];
  let date = new Date(year, month - 1, 1); // Start from the 1st of the specified month (October)

  // Get the day of the week for the 1st of the month
  const firstDayOfMonth = date.getDay(); // Get the day of the week (0 is Sunday, 1 is Monday, ..., 6 is Saturday)

  // If it's not Monday, adjust the date to the first Monday of the month
  let daysToAdd = firstDayOfMonth === 0 ? 1 : (1 - firstDayOfMonth + 7) % 7;
  date.setDate(date.getDate() + daysToAdd); // Adjust the date to the first Monday

  // Collect all Mondays from October onwards, only for the year 2024
  while (date.getFullYear() === year) {
    mondays.push(new Date(date)); // Add the Monday to the list
    date.setDate(date.getDate() + 7); // Move to the next Monday
  }

  return mondays;
};

// Get all Mondays starting from October 2024
const mondaysFromOctober2024 = getMondays(2024, 10); // 10 is October (months are 0-indexed)

// Dummy student data
const students = [
  { rollNo: 1, name: 'John Doe' },
  { rollNo: 2, name: 'Jane Smith' },
  { rollNo: 3, name: 'David Johnson' },
];

// Authentication Middleware
const authenticate = (req, res, next) => {
  const { username, password } = req.body;
  if (users[username] === password) {
    return next();
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
};

// 1. Login API
app.post('/api/login', authenticate, (req, res) => {
  res.json({ message: 'Login successful' });
});

// 2. Attendance Data API (GET)
app.get('/api/attendance', (req, res) => {
  res.json({ students, attendanceData });
});

// 3. Attendance Data API (POST)
app.post('/api/attendance', (req, res) => {
  const { date, attendance } = req.body;
  if (!attendanceData[date]) attendanceData[date] = {};

  // Prevent modification once attendance is recorded
  for (const rollNo in attendance) {
    if (attendanceData[date][rollNo]) {
      return res.status(400).json({ message: 'Attendance already recorded for this date' });
    }
    attendanceData[date][rollNo] = attendance[rollNo];
  }

  res.json({ message: 'Attendance recorded successfully' });
});

// 4. Download Attendance Data
app.get('/api/download', (req, res) => {
  const jsonData = JSON.stringify(attendanceData, null, 2);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', 'attachment; filename="attendance.json"');
  res.send(jsonData);
});

// 5. Calendar API (Mondays)
app.get('/api/calendar', (req, res) => {
  res.json({ mondays: mondaysFromOctober2024 });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
