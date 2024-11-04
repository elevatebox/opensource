const todoList = document.getElementById('todoList');
const createBtn = document.getElementById('createBtn');
const updateBtn = document.getElementById('updateBtn');
const deleteBtn = document.getElementById('deleteBtn');
let currentTaskId = null;

const fetchTasks = async () => {
    const response = await fetch('http://localhost:3000/todo_lists');
    const tasks = await response.json();
    renderTasks(tasks);
};

const renderTasks = (tasks) => {
    todoList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.task;
        li.classList.add('task');
        if (task.completed) {
            li.innerHTML += ' <span class="completed">&#10003;</span>';
        }
        li.onclick = () => selectTask(task.id, task.task);
        todoList.appendChild(li);
    });
};

const selectTask = (id, task) => {
    currentTaskId = id;
    updateBtn.textContent = `Update: ${task}`;
};

createBtn.onclick = async () => {
    const task = prompt("Enter a new task:");
    if (task) {
        await fetch('http://localhost:3000/todo_create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task })
        });
        fetchTasks();
    }
};

updateBtn.onclick = async () => {
    if (currentTaskId) {
        const task = prompt("Edit your task:");
        if (task) {
            await fetch(`http://localhost:3000/todo_update/${currentTaskId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ task })
            });
            currentTaskId = null;
            fetchTasks();
        }
    } else {
        alert("Select a task to update.");
    }
};

deleteBtn.onclick = async () => {
    if (currentTaskId) {
        await fetch(`http://localhost:3000/todo_delete/${currentTaskId}`, { method: 'DELETE' });
        currentTaskId = null;
        fetchTasks();
    } else {
        alert("Select a task to delete.");
    }
};

fetchTasks();
