// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Sample data structure to store students and attendance records
let students = [];
let attendanceRecords = {};

// Utility function to capitalize names
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

// Endpoint to add a new student
app.post('/students', (req, res) => {
  const { rollNumber, firstName, lastName } = req.body;
  const name = `${capitalize(firstName)} ${capitalize(lastName)}`;
  students.push({ rollNumber: rollNumber.toUpperCase(), name });
  res.json({ message: 'Student added successfully!' });
});

// Endpoint to get all students
app.get('/students', (req, res) => {
  res.json(students);
});

// Endpoint to mark attendance
app.post('/attendance/:date', (req, res) => {
  const { date } = req.params;
  const { attendance } = req.body;
  attendanceRecords[date] = attendance;
  res.json({ message: 'Attendance marked successfully!' });
});

// Endpoint to get attendance for a specific date
app.get('/attendance/:date', (req, res) => {
  const { date } = req.params;
  res.json(attendanceRecords[date] || []);
});

// Endpoint to download attendance as CSV
app.get('/download/:date', (req, res) => {
  const { date } = req.params;
  const attendance = attendanceRecords[date] || [];
  let csv = "Roll Number,Name,Status\n";
  attendance.forEach(({ rollNumber, name, present }) => {
    csv += `${rollNumber},${name},${present ? 1 : 0}\n`;
  });
  res.header('Content-Type', 'text/csv');
  res.attachment(`attendance-${date}.csv`);
  res.send(csv);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
