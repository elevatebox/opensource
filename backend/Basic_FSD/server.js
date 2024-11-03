const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const getTasks = () => JSON.parse(fs.readFileSync('database.json', 'utf-8'));

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(getTasks());
});

// Add a new task
app.post('/tasks', (req, res) => {
  const tasks = getTasks();
  const newTask = { id: Date.now(), text: req.body.text };
  tasks.push(newTask);
  fs.writeFileSync('database.json', JSON.stringify(tasks));
  res.json(newTask);
});

// Update a task
app.put('/tasks/:id', (req, res) => {
  const tasks = getTasks();
  const updatedTasks = tasks.map(task =>
    task.id === parseInt(req.params.id) ? { ...task, text: req.body.text } : task
  );
  fs.writeFileSync('database.json', JSON.stringify(updatedTasks));
  res.json({ message: 'Task updated' });
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const tasks = getTasks().filter(task => task.id !== parseInt(req.params.id));
  fs.writeFileSync('database.json', JSON.stringify(tasks));
  res.json({ message: 'Task deleted' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
