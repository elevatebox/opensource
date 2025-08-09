const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());
app.use(cors());

// Email validation function
const isValidEmail = (email) => {
    const emailRegex = /^[\w-.]+@vnr\.ac\.in$/; // Only allow emails ending with @vnr.ac.in
    return emailRegex.test(email);
};

// File paths for storing data
const studentFilePath = path.join(__dirname, 'students.json');
const todoFilePath = path.join(__dirname, 'todos.json');

// GET route for VNR about
app.get('/vnr_about', (req, res) => {
    const aboutText = `
        The Philosophy of Vignana Jyothi unravels education as a process of "Presencing" that provides, both individually and collectively, to one's deepest capacity to sense and experience the knowledge and activities to shape the future. Based on a synthesis of direct experience, leading-edge thinking, and ancient wisdom, it taps into 'deeper levels of LEARNING for discovering new possibilities'.

        Today, with this philosophy, Vignana Jyothi has created an edifice that is strong in its foundations, which can only rise higher and higher. Quality and integrity are the essence of achieving excellence at Vignana Jyothi Institutions. This quest for excellence reflects in the vision and mission. Their passion reflects in the enterprise of education.

        Vision: To be a World Class University providing value-based education, conducting interdisciplinary research in cutting-edge technologies leading to sustainable socio-economic development of the nation.
    `;
    res.send(`<pre>${aboutText}</pre>`);
});

// POST route for VNR students
app.post('/vnr_students', (req, res) => {
    const { name, roll_no, branch, section, email } = req.body;

    // Validate email format
    if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    const newStudent = { id: Date.now(), name, roll_number: roll_no, branch, section, email };

    // Create a new student
    fs.readFile(studentFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading students file' });
        }

        let students;
        try {
            students = JSON.parse(data || '[]');
        } catch {
            students = [];
        }

        students.push(newStudent);
        fs.writeFile(studentFilePath, JSON.stringify(students, null, 2), (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ error: 'Error saving student' });
            }
            res.status(200).json({ message: 'Student added successfully' });
        });
    });
});

// GET route to retrieve all students
app.get('/students', (req, res) => {
    fs.readFile(studentFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading students file' });
        }

        let students;
        try {
            students = JSON.parse(data || '[]');
        } catch {
            students = [];
        }

        res.status(200).json(students);
    });
});

// PUT route to update a student by ID
app.put('/student_update/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { name, roll_number, branch, section, email } = req.body;

    fs.readFile(studentFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading students file' });
        }

        let students;
        try {
            students = JSON.parse(data || '[]');
        } catch {
            return res.status(500).json({ error: 'Error parsing students' });
        }

        const studentIndex = students.findIndex(student => student.id === id);
        if (studentIndex === -1) {
            return res.status(404).json({ error: 'Student not found' });
        }

        students[studentIndex] = { ...students[studentIndex], name, roll_number, branch, section, email };
        fs.writeFile(studentFilePath, JSON.stringify(students, null, 2), (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ error: 'Error saving student' });
            }
            res.status(200).json({ message: 'Student updated successfully' });
        });
    });
});

// DELETE route to delete a student by ID
app.delete('/student_delete/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    fs.readFile(studentFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading students file' });
        }

        let students;
        try {
            students = JSON.parse(data || '[]');
        } catch {
            return res.status(500).json({ error: 'Error parsing students' });
        }

        const updatedStudents = students.filter(student => student.id !== id);
        
        if (updatedStudents.length === students.length) {
            return res.status(404).json({ error: 'Student not found' });
        }

        fs.writeFile(studentFilePath, JSON.stringify(updatedStudents, null, 2), (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ error: 'Error saving students' });
            }
            res.status(200).json({ message: 'Student deleted successfully' });
        });
    });
});

// DELETE route to delete all students
app.delete('/student_delete_all', (req, res) => {
    fs.writeFile(studentFilePath, JSON.stringify([], null, 2), (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error deleting students' });
        }
        res.status(200).json({ message: 'All students deleted successfully' });
    });
});

// POST route to create a todo item
app.post('/todo_create', (req, res) => {
    const { task_name, deadline, priority } = req.body;
    const newTodo = { id: Date.now(), task_name, deadline, priority };

    fs.readFile(todoFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading todos file' });
        }

        let todos;
        try {
            todos = JSON.parse(data || '[]');
        } catch {
            todos = [];
        }

        todos.push(newTodo);
        fs.writeFile(todoFilePath, JSON.stringify(todos, null, 2), (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ error: 'Error saving todo' });
            }
            res.status(200).json({ message: 'Todo added successfully' });
        });
    });
});

// GET route to retrieve all todos
app.get('/todos', (req, res) => {
    fs.readFile(todoFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading todos file' });
        }

        let todos;
        try {
            todos = JSON.parse(data || '[]');
        } catch {
            todos = [];
        }

        res.status(200).json(todos);
    });
});

// PUT route to update a todo item by ID
app.put('/todo_update/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { task_name, deadline, priority } = req.body;

    fs.readFile(todoFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading todos file' });
        }

        let todos;
        try {
            todos = JSON.parse(data || '[]');
        } catch {
            return res.status(500).json({ error: 'Error parsing todos' });
        }

        const todoIndex = todos.findIndex(todo => todo.id === id);
        if (todoIndex === -1) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        todos[todoIndex] = { ...todos[todoIndex], task_name, deadline, priority };
        fs.writeFile(todoFilePath, JSON.stringify(todos, null, 2), (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ error: 'Error saving todo' });
            }
            res.status(200).json({ message: 'Todo updated successfully' });
        });
    });
});

// DELETE route to delete a todo item by ID
app.delete('/todo_delete/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    fs.readFile(todoFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading todos file' });
        }

        let todos;
        try {
            todos = JSON.parse(data || '[]');
        } catch {
            return res.status(500).json({ error: 'Error parsing todos' });
        }

        const updatedTodos = todos.filter(todo => todo.id !== id);

        if (updatedTodos.length === todos.length) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        fs.writeFile(todoFilePath, JSON.stringify(updatedTodos, null, 2), (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ error: 'Error saving todos' });
            }
            res.status(200).json({ message: 'Todo deleted successfully' });
        });
    });
});

// DELETE route to delete all todo items
app.delete('/todo_delete_all', (req, res) => {
    fs.writeFile(todoFilePath, JSON.stringify([], null, 2), (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error deleting todos' });
        }
        res.status(200).json({ message: 'All todos deleted successfully' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
