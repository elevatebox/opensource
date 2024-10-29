const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// CSV writer setup
const studentCsvWriter = createCsvWriter({
  path: 'vnr_students.csv',
  header: [
    {id: 'name', title: 'Name'},
    {id: 'rollNumber', title: 'Roll Number'},
    {id: 'section', title: 'Section'},
    {id: 'branch', title: 'Branch'},
    {id: 'email', title: 'Email'}
  ],
  append: true
});

const todoCsvWriter = createCsvWriter({
  path: 'todo_tasks.csv',
  header: [
    {id: 'taskName', title: 'Task Name'},
    {id: 'deadline', title: 'Deadline'},
    {id: 'priority', title: 'Priority'}
  ],
  append: true
});

// 1. VNR About page endpoint
app.get('/vnr_about', (req, res) => {
  res.send('<h1>About VNR VJIET</h1><p>Welcome to VNR VJIET, a premier engineering college...</p>');
});

// 2. POST endpoint to add a student
app.post('/vnr_students', (req, res) => {
  const { name, rollNumber, section, branch, email } = req.body;

  if (!/^.+@vnrvjiet\.in$/.test(email)) {
    return res.status(400).send('Invalid email address');
  }

  const studentData = [{ name, rollNumber, section, branch, email }];
  studentCsvWriter.writeRecords(studentData)
    .then(() => res.status(201).send('Student data saved successfully'))
    .catch(error => res.status(500).send('Error saving student data'));
});

// 3. Create a todo task
app.post('/todo_create', (req, res) => {
  const { taskName, deadline, priority } = req.body;

  const todoData = [{ taskName, deadline, priority }];
  todoCsvWriter.writeRecords(todoData)
    .then(() => res.status(201).send('Todo task created successfully'))
    .catch(error => res.status(500).send('Error creating todo task'));
});

// 4. Update a todo task
app.put('/todo_update', (req, res) => {
  const { taskName, newTaskName, newDeadline, newPriority } = req.body;

  const tasks = [];
  fs.createReadStream('todo_tasks.csv')
    .pipe(csv())
    .on('data', (row) => {
      if (row.taskName === taskName) {
        tasks.push({
          taskName: newTaskName || row.taskName,
          deadline: newDeadline || row.deadline,
          priority: newPriority || row.priority
        });
      } else {
        tasks.push(row);
      }
    })
    .on('end', () => {
      const writer = createCsvWriter({
        path: 'todo_tasks.csv',
        header: [
          {id: 'taskName', title: 'Task Name'},
          {id: 'deadline', title: 'Deadline'},
          {id: 'priority', title: 'Priority'}
        ]
      });

      writer.writeRecords(tasks)
        .then(() => res.send('Todo task updated successfully'))
        .catch(error => res.status(500).send('Error updating todo task'));
    });
});

// 5. Delete a todo task
app.delete('/todo_delete', (req, res) => {
  const { taskName } = req.body;

  const tasks = [];
  fs.createReadStream('todo_tasks.csv')
    .pipe(csv())
    .on('data', (row) => {
      if (row.taskName !== taskName) {
        tasks.push(row);
      }
    })
    .on('end', () => {
      const writer = createCsvWriter({
        path: 'todo_tasks.csv',
        header: [
          {id: 'taskName', title: 'Task Name'},
          {id: 'deadline', title: 'Deadline'},
          {id: 'priority', title: 'Priority'}
        ]
      });

      writer.writeRecords(tasks)
        .then(() => res.send('Todo task deleted successfully'))
        .catch(error => res.status(500).send('Error deleting todo task'));
    });
});

// 6. Delete all todo tasks
app.delete('/todo_deleteall', (req, res) => {
  fs.unlink('todo_tasks.csv', (err) => {
    if (err) {
      return res.status(500).send('Error deleting all todo tasks');
    }
    res.send('All todo tasks deleted successfully');
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
