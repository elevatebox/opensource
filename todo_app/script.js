const fetchAbout = async () => {
    try {
        const res = await fetch('http://localhost:5000/vnr_about');
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        document.getElementById("aboutContent").innerText = data.description;
    } catch (error) {
        console.error('Error fetching about:', error);
    }
};

const addStudent = async () => {
    const student = {
        name: document.getElementById("studentName").value,
        rollNumber: document.getElementById("rollNumber").value,
        section: document.getElementById("section").value,
        branch: document.getElementById("branch").value,
        email: document.getElementById("email").value,
    };
    try {
        await fetch('http://localhost:5000/vnr_students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(student),
        });
    } catch (error) {
        console.error('Error adding student:', error);
    }
};

const createTask = async () => {
    const task = {
        taskName: document.getElementById("taskName").value,
        deadline: document.getElementById("deadline").value,
        priority: document.getElementById("priority").value,
    };
    try {
        await fetch('http://localhost:5000/to-do_create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task),
        });
        fetchTasks();
    } catch (error) {
        console.error('Error creating task:', error);
    }
};

const fetchTasks = async () => {
    try {
        const res = await fetch('http://localhost:5000/to-do_list');
        if (!res.ok) throw new Error('Network response was not ok');
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
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
};

const deleteTask = async (id) => {
    try {
        await fetch(`http://localhost:5000/to-do_delete/${id}`, { method: 'DELETE' });
        fetchTasks();
    } catch (error) {
        console.error('Error deleting task:', error);
    }
};

const updateTask = async (id) => {
    const newTaskName = prompt("Enter new task name:");
    const newDeadline = prompt("Enter new deadline:");
    const newPriority = prompt("Enter new priority (High/Medium/Low):");
    try {
        await fetch(`http://localhost:5000/to-do_update/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ taskName: newTaskName, deadline: newDeadline, priority: newPriority }),
        });
        fetchTasks();
    } catch (error) {
        console.error('Error updating task:', error);
    }
};