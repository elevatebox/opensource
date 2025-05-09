const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let students = [];
let attendanceRecords = [];

// Load initial data from a JSON file if exists
if (fs.existsSync('students.json')) {
    students = JSON.parse(fs.readFileSync('students.json'));
}

// Save students to a JSON file
const saveStudents = () => {
    fs.writeFileSync('students.json', JSON.stringify(students));
};

// Endpoint to get students
app.get('/students', (req, res) => {
    res.json(students);
});

// Endpoint to add a student
app.post('/students', (req, res) => {
    const student = req.body;
    students.push(student);
    saveStudents();
    res.status(201).json({ message: 'Student added successfully' });
});

// Endpoint to submit attendance
app.post('/attendance', (req, res) => {
    const { date, attendance } = req.body;
    attendanceRecords.push({ date, attendance });
    res.status(200).json({ message: 'Attendance submitted successfully' });
});

// Endpoint to download attendance records as CSV
app.get('/attendance/download', (req, res) => {
    let csvContent = 'Date,Roll Number,Name,Present\n';
    attendanceRecords.forEach(record => {
        record.attendance.forEach(item => {
            csvContent += `${record.date},${item.rollNumber},${item.name},${item.isPresent}\n`;
        });
    });

    res.header('Content-Type', 'text/csv');
    res.attachment('attendance.csv');
    res.send(csvContent);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
