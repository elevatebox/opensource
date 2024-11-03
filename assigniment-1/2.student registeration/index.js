const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { check } = require('express-validator');
const { validationResult } = require('express-validator');
const validator = require('validator');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// JSON Database
const JSON_FILE = './data.json';
const CSV_FILE = './students.csv';

// CSV Writer
const csvWriter = createCsvWriter({
    path: CSV_FILE,
    header: [
        { id: 'name', title: 'Name' },
        { id: 'rollNumber', title: 'Roll Number' },
        { id: 'section', title: 'Section' },
        { id: 'branch', title: 'Branch' },
        { id: 'email', title: 'Email' }
    ],
    append: true
});

// Load or initialize JSON file
let jsonData = [];
try {
    jsonData = jsonfile.readFileSync(JSON_FILE);
} catch (error) {
    jsonfile.writeFileSync(JSON_FILE, jsonData);
}

// POST /vnr_students endpoint
app.post('/vnr_students', [
    check('email').custom(email => {
        if (!validator.isEmail(email) || !email.endsWith('@vnrvjiet.in')) {
            throw new Error('Invalid email format. It should be in the form of xxxxx@vnrvjiet.in');
        }
        return true;
    })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, rollNumber, section, branch, email } = req.body;
    const newStudent = { name, rollNumber, section, branch, email };

    // Add to JSON data
    jsonData.push(newStudent);
    jsonfile.writeFileSync(JSON_FILE, jsonData, { spaces: 2 });

    // Add to CSV file
    csvWriter.writeRecords([newStudent]).then(() => {
        console.log('Data written to CSV file successfully');
    }).catch(err => console.error(err));

    res.json({ message: 'Student data added successfully', data: newStudent });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
