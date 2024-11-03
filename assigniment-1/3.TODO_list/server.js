const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const todosFilePath = path.join(__dirname, 'todos.json');

app.use(cors());
app.use(bodyParser.json());

// Load existing todos from JSON file
const loadTodos = () => {
    if (fs.existsSync(todosFilePath)) {
        const data = fs.readFileSync(todosFilePath);
        return JSON.parse(data);
    }
    return [];
};

// Save todos to JSON file
const saveTodos = (todos) => {
    fs.writeFileSync(todosFilePath, JSON.stringify(todos, null, 2));
};

// Get all todos
app.get('/todo_lists', (req, res) => {
    const todos = loadTodos();
    res.json(todos);
});
// Create a new todo
app.post('/todo_create', (req, res) => {
    const todos = loadTodos();
    const newTodo = {
        id: Date.now(),
        task: req.body.task,
        completed: false
    };
    todos.push(newTodo);
    saveTodos(todos);
    res.json(newTodo);
});

// Update an existing todo
app.put('/todo_update', (req, res) => {
    const todos = loadTodos();
    const { id, task, completed } = req.body;
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
        todos[todoIndex] = { id, task, completed };
        saveTodos(todos);
        res.json(todos[todoIndex]);
    } else {
        res.status(404).send('Todo not found');
    }
});
// Delete a todo
app.delete('/todo_delete', (req, res) => {
    const todos = loadTodos();
    const { id } = req.body;
    const updatedTodos = todos.filter(todo => todo.id !== id);
    saveTodos(updatedTodos);
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
