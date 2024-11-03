document.addEventListener("DOMContentLoaded", () => {
    const studentsList = document.getElementById("students-list");
    const todosList = document.getElementById("todos-list");

    // Function to fetch and display students
    const fetchStudents = async () => {
        try {
            const response = await fetch('/students');
            if (!response.ok) throw new Error('Failed to fetch students');
            const students = await response.json();
            studentsList.innerHTML = ""; // Clear existing list
            students.forEach(student => {
                const li = document.createElement("li");
                li.innerHTML = `${student.name} - ${student.roll_no} - ${student.branch} - ${student.section} - ${student.email} 
                                <button onclick="updateStudent('${student.roll_no}')">Update</button>
                                <button onclick="deleteStudent('${student.roll_no}')">Delete</button>`;
                studentsList.appendChild(li);
            });
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    // Function to fetch and display todos
    const fetchTodos = async () => {
        try {
            const response = await fetch('/todos');
            if (!response.ok) throw new Error('Failed to fetch todos');
            const todos = await response.json();
            todosList.innerHTML = ""; // Clear existing list
            todos.forEach(todo => {
                const li = document.createElement("li");
                li.innerHTML = `${todo.task_name} - ${todo.deadline} - ${todo.priority} 
                                <button onclick="updateTodo(${todo.id})">Update</button>
                                <button onclick="deleteTodo(${todo.id})">Delete</button>`;
                todosList.appendChild(li);
            });
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    // Add student event
    document.getElementById("student-form")?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = document.getElementById("student-name").value;
        const roll_no = document.getElementById("student-roll").value;
        const branch = document.getElementById("student-branch").value;
        const section = document.getElementById("student-section").value;
        const email = document.getElementById("student-email").value;

        try {
            await fetch('/vnr_students', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, roll_no, branch, section, email })
            });
            fetchStudents();
        } catch (error) {
            console.error('Error adding student:', error);
        }
    });

    // Add todo event
    document.getElementById("todo-form")?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const task_name = document.getElementById("todo-task").value;
        const deadline = document.getElementById("todo-deadline").value;
        const priority = document.getElementById("todo-priority").value;

        try {
            await fetch('/todo_create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ task_name, deadline, priority })
            });
            fetchTodos();
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    });

    // Update student function
    window.updateStudent = async (roll_no) => {
        const name = prompt("Enter new name:");
        const branch = prompt("Enter new branch:");
        const section = prompt("Enter new section:");
        const email = prompt("Enter new email (@vnr.ac.in):");

        try {
            await fetch('/student_update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ roll_no, name, branch, section, email })
            });
            fetchStudents();
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    // Delete student function
    window.deleteStudent = async (roll_no) => {
        if (confirm("Are you sure you want to delete this student?")) {
            try {
                await fetch('/student_delete', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ roll_no })
                });
                fetchStudents();
            } catch (error) {
                console.error('Error deleting student:', error);
            }
        }
    };

    // Update todo function
    window.updateTodo = async (id) => {
        const task_name = prompt("Enter new task name:");
        const deadline = prompt("Enter new deadline:");
        const priority = prompt("Enter new priority:");

        try {
            await fetch('/todo_update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, task_name, deadline, priority })
            });
            fetchTodos();
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    // Delete todo function
    window.deleteTodo = async (id) => {
        if (confirm("Are you sure you want to delete this todo?")) {
            try {
                await fetch('/todo_delete', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id })
                });
                fetchTodos();
            } catch (error) {
                console.error('Error deleting todo:', error);
            }
        }
    };

    // Initial fetch based on the page
    if (studentsList) fetchStudents();
    if (todosList) fetchTodos();
});
