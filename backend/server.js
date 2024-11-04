const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// 1) About VNRVJIET College
app.get('/vnr_about', (req, res) => {
    const aboutInfo = {
        name: "VNR VJIET",
        location: "Nambur, Andhra Pradesh, India",
        established: 1997,
        details: "VNR VJIET is a premier engineering college known for its academic excellence and holistic development."
    };
    res.json(aboutInfo);
});

// 2) Student Registration
app.post('/vnr_students', (req, res) => {
    const { name, roll_no, section, branch, email } = req.body;

    // Validate email
    const emailPattern =/^[a-zA-Z0-9._%+-]+@vnrvjitac\.com$/
;
    if (!emailPattern.test(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }

    // Correct syntax for studentData string interpolation
    const studentData = `${name},${roll_no},${section},${branch},${email}\n`;

    // Append data to CSV file
    fs.appendFile('vnr_students_info.csv', studentData, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error saving data.' });
        }
        res.status(200).json({ message: 'Student information saved successfully.' });
    });
});

// 3) Retrieve Student Data
app.get('/todo_list', (req, res) => {
    fs.readFile('vnr_students_info.csv', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading data.' });
        }
        const students = data.trim().split('\n').map(line => {
            const [name, roll_no, section, branch, email] = line.split(',');
            return { name, roll_no, section, branch, email };
        });
        res.json(students);
    });
});

// 4) Update Student Data
app.put('/todo_update', (req, res) => {
    const { roll_no, updatedData } = req.body;
    
    fs.readFile('vnr_students_info.csv', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading data.' });
        }

        const students = data.trim().split('\n');
        const updatedStudents = students.map(line => {
            const [name, r_no, section, branch, email] = line.split(',');
            if (r_no === roll_no) {
                // Correct syntax for updatedData interpolation
                return `${updatedData.name || name},${roll_no},${updatedData.section || section},${updatedData.branch || branch},${updatedData.email || email}`;
            }
            return line;
        });

        fs.writeFile('vnr_students_info.csv', updatedStudents.join('\n'), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error updating data.' });
            }
            res.json({ message: 'Student information updated successfully.' });
        });
    });
});

// 5) Delete Student Data
app.delete('/todo_delete', (req, res) => {
    const { roll_no } = req.body;

    fs.readFile('vnr_students_info.csv', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading data.' });
        }

        const students = data.trim().split('\n').filter(line => {
            const [_, r_no] = line.split(',');
            return r_no !== roll_no;
        });

        fs.writeFile('vnr_students_info.csv', students.join('\n'), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error deleting data.' });
            }
            res.json({ message: 'Student information deleted successfully.' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});