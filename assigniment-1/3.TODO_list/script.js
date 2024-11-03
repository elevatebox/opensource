const todoListElement = document.getElementById('todo-list');
const taskInput = document.getElementById('task-input');
const createBtn = document.getElementById('create-btn');
const deleteBtn = document.getElementById('delete-btn');
const updateBtn = document.getElementById('update-btn');

let currentTodoId = null;

// Fetch all todos from the server
const fetchTodos = async () => {
    const response = await fetch('http://localhost:5000/todo_lists');
    const todos = await response.json();
    renderTodos(todos);
};

// Render todos on the UI
const renderTodos = (todos) => {
    todoListElement.innerHTML = '';
    todos.forEach(todo => {
        const todoElement = document.createElement('div');
        todoElement.textContent = todo.task;
        if (todo.completed) {
            todoElement.classList.add('completed');
        }
        todoElement.onclick = () => toggleComplete(todo);
        todoElement.dataset.id = todo.id;
        todoListElement.appendChild(todoElement);
    });
};

// Toggle task completion
const toggleComplete = async (todo) => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    await fetch('http://localhost:5000/todo_update', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo),
    });
    fetchTodos();
};
// Create a new todo
createBtn.onclick = async () => {
    const task = taskInput.value.trim();
    if (!task) return;

    await fetch('http://localhost:5000/todo_create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task }),
    });
    taskInput.value = '';
    fetchTodos();
};

// Delete a todo
deleteBtn.onclick = async () => {
    if (currentTodoId) {
        await fetch('http://localhost:5000/todo_delete', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: currentTodoId }),
        });
        currentTodoId = null;
        fetchTodos();
    }
};

// Update a todo
updateBtn.onclick = async () => {
    const task = taskInput.value.trim();
    if (!task || !currentTodoId) return;

    await fetch('http://localhost:5000/todo_update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: currentTodoId, task, completed: false }),
    });
    currentTodoId = null;
    taskInput.value = '';
    fetchTodos();
};

// Fetch todos on load
async function fetchTodos() {
    const response = await fetch('http://localhost:5000/todo_lists');
    const todos = await response.json();
    displayTodos(todos);
}
