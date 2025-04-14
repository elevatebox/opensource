const fetchAbout = async () => {
    const res = await fetch('http://localhost:5000/vnr_about');
    const data = await res.json();
    document.getElementById("aboutContent").innerText = data.description;
};

const addStudent = async () => {
    const student = {
        name: document.getElementById("studentName").value,
        rollNumber: document.getElementById("rollNumber").value,
        section: document.getElementById("section").value,
        branch: document.getElementById("branch").value,
        email: document.getElementById("email").value,
    };
    await fetch('http://localhost:5000/vnr_students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student),
    });
};

const createTask = async () => {
    const task = {
        taskName: document.getElementById("taskName").value,
        deadline: document.getElementById("deadline").value,
        priority: document.getElementById("priority").value,
    };
    await fetch('http://localhost:5000/to-do_create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });
    fetchTasks();
};

const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/to-do_list');
    const tasks = await res.json();
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const taskItem = document.createElement("div");
        taskItem.className = "task-item";
        taskItem.innerHTML = `
            <span>${task.taskName} - ${task.deadline} - ${task.priority}</span>
            <button class="update" onclick="updateTask(${task.id})">Edit</button>
            <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
};

const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/to-do_delete/${id}`, { method: 'DELETE' });
    fetchTasks();
};

const updateTask = async (id) => {
    const newTaskName = prompt("Enter new task name:");
    const newDeadline = prompt("Enter new deadline:");
    const newPriority = prompt("Enter new priority (High/Medium/Low):");
    await fetch(`http://localhost:5000/to-do_update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskName: newTaskName, deadline: newDeadline, priority: newPriority }),
    });
    fetchTasks();
};
