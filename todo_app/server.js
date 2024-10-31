const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const readData = (file) => {
    try {
        return JSON.parse(fs.readFileSync(file, 'utf-8'));
    } catch (error) {
        console.error(`Error reading file ${file}:`, error);
        return [];
    }
};

const writeData = (file, data) => {
    try {
        fs.writeFileSync(file, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error(`Error writing to file ${file}:`, error);
    }
};

// 1st API: Get about page content (GET /vnr_about)
app.get('/vnr_about', (req, res) => {
    res.json({ description: "This is VNR VJIET, a prestigious engineering institution focused on excellence." });
});

// 2nd API: Add a student (POST /vnr_students)
app.post('/vnr_students', (req, res) => {
    const students = readData('vnr_students.json');
    const newStudent = {
        id: Date.now(),
        name: req.body.name,
        rollNumber: req.body.rollNumber,
        section: req.body.section,
        branch: req.body.branch,
        email: req.body.email
    };
    students.push(newStudent);
    writeData('vnr_students.json', students);
    res.json(newStudent);
});

// 3rd API: Create a new TODO task (POST /to-do_create)
app.post('/to-do_create', (req, res) => {
    const tasks = readData('to_do_list.json');
    const newTask = {
        id: Date.now(),
        taskName: req.body.taskName,
        deadline: req.body.deadline,
        priority: req.body.priority
    };
    tasks.push(newTask);
    writeData('to_do_list.json', tasks);
    res.json(newTask);
});

// 4th API: Delete a TODO task (DELETE /to-do_delete/:id)
app.delete('/to-do_delete/:id', (req, res) => {
    const tasks = readData('to_do_list.json');
    const updatedTasks = tasks.filter(task => task.id !== parseInt(req.params.id));
    writeData('to_do_list.json', updatedTasks);
    res.json({ message: 'Task deleted' });
});

// 5th API: Update a TODO task (PUT /to-do_update/:id)
app.put('/to-do_update/:id', (req, res) => {
    const tasks = readData('to_do_list.json');
    const updatedTasks = tasks.map(task =>
        task.id === parseInt(req.params.id) ? { ...task, ...req.body } : task
    );
    writeData('to_do_list.json', updatedTasks);
    res.json({ message: 'Task updated' });
});

// 6th API: Delete all TODO tasks (DELETE /to-do_deleteall)
app.delete('/to-do_deleteall', (req, res) => {
    writeData('to_do_list.json', []);
    res.json({ message: 'All tasks deleted' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));