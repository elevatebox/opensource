const express = require('express');
const fs = require('fs');
const path = require('path');
const csvWriter = require('csv-writer').createObjectCsvWriter;

const app = express();
const PORT = 3000;

const studentsFilePath = path.join(__dirname, 'data/vnr_students.csv');
const todoFilePath = path.join(__dirname, 'data/todo_list.csv');

const studentWriter = csvWriter({
  path: studentsFilePath,
  header: [{ id: 'name', title: 'Name' }, { id: 'email', title: 'Email' }],
  append: true,
});

const todoWriter = csvWriter({
  path: todoFilePath,
  header: [{ id: 'id', title: 'ID' }, { id: 'task', title: 'Task' }],
  append: true,
});

app.use(express.json());
app.use(express.static(__dirname)); // Serve HTML file and frontend scripts

// Endpoint to get app information
app.get('/about_vnr', (req, res) => {
  res.json({ appName: 'VNR Application', description: 'App for VNR tasks', version: '1.0.0' });
});

// Endpoint to register a student
app.post('/vnr_student', (req, res) => {
  const { name, email } = req.body;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@vnrvjiet\.in$/;

  if (!emailPattern.test(email)) {
    return res.status(400).json({ error: 'Invalid email format. Use xxxxx@vnrvjiet.in' });
  }

  studentWriter.writeRecords([{ name, email }])
    .then(() => res.status(201).json({ message: 'Student registered successfully' }))
    .catch(() => res.status(500).json({ error: 'Failed to save student data' }));
});

// To-Do list endpoints
app.post('/todo/create', (req, res) => {
  const { id, task } = req.body;
  todoWriter.writeRecords([{ id, task }])
    .then(() => res.status(201).json({ message: 'To-do created successfully' }))
    .catch(() => res.status(500).json({ error: 'Failed to save to-do item' }));
});

app.get('/todo/list', (req, res) => {
  fs.readFile(todoFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to retrieve to-do list' });
    res.send(data);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
