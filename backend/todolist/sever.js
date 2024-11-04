const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const dataFilePath = './data.json';

// Load tasks from data.json
const loadTasks = () => {
    if (fs.existsSync(dataFilePath)) {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(data);
    }
    return [];
};

// Save tasks to data.json
const saveTasks = (tasks) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(tasks, null, 2));
};

// Endpoints
app.get('/todo_lists', (req, res) => {
    const tasks = loadTasks();
    res.json(tasks);
});

app.post('/todo_create', (req, res) => {
    const tasks = loadTasks();
    const { task } = req.body;
    const newTask = { id: Date.now(), task, completed: false };
    tasks.push(newTask);
    saveTasks(tasks);
    res.status(201).json(newTask);
});

app.put('/todo_update/:id', (req, res) => {
    const tasks = loadTasks();
    const taskId = parseInt(req.params.id);
    const { task, completed } = req.body;

    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return res.status(404).json({ error: 'Task not found' });

    tasks[taskIndex] = { ...tasks[taskIndex], task, completed };
    saveTasks(tasks);
    res.json(tasks[taskIndex]);
});

app.delete('/todo_delete/:id', (req, res) => {
    const tasks = loadTasks();
    const taskId = parseInt(req.params.id);

    const updatedTasks = tasks.filter(t => t.id !== taskId);
    saveTasks(updatedTasks);
    res.status(204).send();
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
