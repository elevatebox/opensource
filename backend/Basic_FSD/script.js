const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const tasks = await res.json();
    renderTasks(tasks);
};

const renderTasks = (tasks) => {
    taskList.innerHTML = "";
    tasks.forEach(task => {
        const taskItem = document.createElement("div");
        taskItem.className = "task-item";
        taskItem.innerHTML = `
            <span>${task.text}</span>
            <button class="update" onclick="updateTask(${task.id})">Edit</button>
            <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
};

const addTask = async () => {
    if (!taskInput.value) return;

    await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: taskInput.value }),
    });

    taskInput.value = "";
    fetchTasks();
};

const updateTask = async (id) => {
    const newTaskText = prompt("Edit your task:");
    if (!newTaskText) return;

    await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newTaskText }),
    });

    fetchTasks();
};

const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' });
    fetchTasks();
};

addButton.addEventListener("click", addTask);
fetchTasks();
