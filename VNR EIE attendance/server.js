const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample data for students
let students = [];

// POST endpoint to create a new student
app.post('/api/create-student', (req, res) => {
    const { rollNumber, firstName, lastName } = req.body;

    // Format the name to have the first letter capitalized
    const formattedName = `${firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()} ${lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase()}`;

    // Check if the student already exists
    const existingStudent = students.find(s => s.rollNumber === rollNumber.toUpperCase());
    if (existingStudent) {
        return res.status(400).json({ message: 'Student already exists' });
    }

    // Create new student object
    const newStudent = {
        rollNumber: rollNumber.toUpperCase(),
        name: formattedName,
        present: false
    };

    // Add the new student to the array
    students.push(newStudent);
    res.status(201).json({ message: 'Student created', student: newStudent });
});

// GET endpoint to fetch all students
app.get('/api/students', (req, res) => {
    res.status(200).json(students);
});

// POST endpoint to mark attendance
app.post('/api/mark-attendance', (req, res) => {
    const { rollNumber } = req.body;

    const student = students.find(s => s.rollNumber === rollNumber.toUpperCase());
    if (student) {
        student.present = !student.present; // Toggle attendance status
        return res.status(200).json({ message: 'Attendance marked', student });
    } else {
        return res.status(404).json({ message: 'Student not found' });
    }
});

// GET endpoint to generate attendance report
app.get('/api/report', (req, res) => {
    const report = {
        totalStudents: students.length,
        presentCount: students.filter(s => s.present).length,
        absentCount: students.filter(s => !s.present).length,
        students: students.map(s => ({
            rollNumber: s.rollNumber,
            name: s.name,
            present: s.present
        }))
    };

    res.status(200).json(report);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
