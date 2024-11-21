const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files (HTML, CSS, JS)

// Path to the JSON file where attendance data is stored
const attendanceFilePath = './attendance.json';

// Helper function to read attendance data from the JSON file
function readAttendanceData() {
  const data = fs.readFileSync(attendanceFilePath, 'utf8');
  return JSON.parse(data);
}

// Helper function to write attendance data back to the JSON file
function writeAttendanceData(data) {
  fs.writeFileSync(attendanceFilePath, JSON.stringify(data, null, 2));
}

// Endpoint to get all attendance data
app.get('/api/attendance', (req, res) => {
  const data = readAttendanceData();
  res.json(data);
});

// Endpoint to update attendance for a student
app.post('/api/attendance', (req, res) => {
  const { rollNo, date, status } = req.body;
  let data = readAttendanceData();

  let student = data.students.find(student => student.rollNo === rollNo);
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  // Check if the attendance for this date is already marked
  let attendance = student.attendance.find(att => att.date === date);
  if (attendance && attendance.status !== "absent") {
    return res.status(400).json({ message: 'Attendance already marked for this date' });
  }

  // Update attendance status
  if (!attendance) {
    student.attendance.push({ date, status });
  } else {
    attendance.status = status;
  }

  writeAttendanceData(data);
  res.json({ message: 'Attendance updated successfully' });
});

// Endpoint to add a new student
app.post('/api/student', (req, res) => {
  const { rollNo, studentName } = req.body;
  let data = readAttendanceData();

  const studentExists = data.students.find(entry => entry.rollNo === rollNo);
  if (studentExists) {
    return res.status(400).json({ message: 'Student with this roll number already exists.' });
  }

  data.students.push({
    rollNo,
    studentName,
    attendance: [
      { "date": "2024-10-07", "status": "absent" },
      { "date": "2024-10-14", "status": "absent" },
      { "date": "2024-10-21", "status": "absent" },
      { "date": "2024-10-28", "status": "absent" }
    ]
  });

  writeAttendanceData(data);
  res.json({ message: 'Student added successfully' });
});

// Serve the HTML file with frontend code
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

