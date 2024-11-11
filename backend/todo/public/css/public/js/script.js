let editIndex = null; // Variable to store the index of the task being edited

document.getElementById('taskForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const taskName = document.getElementById('taskName').value;
    const deadline = document.getElementById('deadline').value;
    const priority = document.getElementById('priority').value;

    if (editIndex !== null) {
        // Update existing task
        const updatedTask = { taskName, deadline, priority };
        fetch('/tasks/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ index: editIndex, updatedTask })
        })
        .then(response => response.json())
        .then(tasks => {
            renderTasks(tasks);
            showNotification('Task updated successfully!');
            resetForm();
        });
    } else {
        // Create new task
        fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ taskName, deadline, priority })
        })
        .then(response => response.json())
        .then(tasks => {
            renderTasks(tasks);
            showNotification('Task created successfully!');
            resetForm();
        });
    }
});

function resetForm() {
    document.getElementById('taskForm').reset(); // Reset the form fields
    editIndex = null; // Reset the edit index
}

function renderTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear existing tasks

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${task.taskName} - ${task.deadline} - ${task.priority}
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

function deleteTask(index) {
    fetch('/tasks/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ index })
    })
    .then(response => response.json())
    .then(tasks => renderTasks(tasks));
}

function editTask(index) {
    fetch('/tasks')
        .then(response => response.json())
        .then(tasks => {
            const task = tasks[index];
            document.getElementById('taskName').value = task.taskName;
            document.getElementById('deadline').value = task.deadline;
            document.getElementById('priority').value = task.priority;
            editIndex = index; // Set the index of the task being edited
        });
}

document.getElementById('clearAll').addEventListener('click', function() {
    fetch('/tasks/clear', {
        method: 'POST'
    })
    .then(response => response.json())
    .then(() => {
        document.getElementById('taskList').innerHTML = '';
        showNotification('All tasks cleared!');
    });
});

// Function to show notifications
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.innerText = message;
    notification.style.display = 'block';

    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}
