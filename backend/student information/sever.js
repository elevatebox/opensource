const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const csvWriter = require('csv-writer').createObjectCsvWriter;
const validator = require('validator');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// CSV writer setup
const csvFilePath = './student_data.csv';
const writer = csvWriter({
    path: csvFilePath,
    header: [
        { id: 'name', title: 'Name' },
        { id: 'rollNumber', title: 'Roll Number' },
        { id: 'section', title: 'Section' },
        { id: 'branch', title: 'Branch' },
        { id: 'email', title: 'Email' }
    ],
    append: true,
});

// Sample database file with JSON
const studentsDb = './students.json';

// POST endpoint for /vnr_students
app.post('/vnr_students', async (req, res) => {
    const { name, rollNumber, section, branch, email } = req.body;

    // Email validation
    const emailDomain = 'vnrvjiet.in';
    if (!validator.isEmail(email) || !email.endsWith(`@${emailDomain}`)) {
        return res.status(400).json({ error: 'Invalid email format. Must end with @vnrvjiet.in' });
    }

    // Store data in CSV
    try {
        await writer.writeRecords([{ name, rollNumber, section, branch, email }]);
        res.status(200).json({ message: 'Student data added successfully', data: { name, rollNumber, section, branch, email } });
    } catch (error) {
        res.status(500).json({ error: 'Failed to store student data' });
    }

    // Add data to JSON file
    let students = [];
    if (fs.existsSync(studentsDb)) {
        const data = fs.readFileSync(studentsDb, 'utf8');
        students = JSON.parse(data);
    }
    students.push({ name, rollNumber, section, branch, email });
    fs.writeFileSync(studentsDb, JSON.stringify(students, null, 2));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
