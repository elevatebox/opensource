// Function to handle login and role redirection
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const role = document.getElementById("role").value;

    if (username && role) {
        localStorage.setItem("username", username);
        localStorage.setItem("role", role);
        window.location.href = `${role}.html`;
    }
}

// Function to display user details
function displayUser() {
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    const userInfo = document.getElementById("user-info");
    
    if (username && role) {
        userInfo.textContent = `${role} - ${username}`;
    }
}

// Function to load user data
async function loadUserData() {
    const response = await fetch('data/users.json');
    const data = await response.json();
    return data;
}

// Function to render co-admins and students
async function renderUsers() {
    const data = await loadUserData();
    const role = localStorage.getItem("role");

    if (role === "admin") {
        const coAdminList = document.getElementById("co-admin-list");
        const studentList = document.getElementById("student-list");
        data.coAdmins.forEach(coAdmin => {
            const li = document.createElement("li");
            li.textContent = coAdmin.name;
            coAdminList.appendChild(li);
        });
        data.students.forEach(student => {
            const li = document.createElement("li");
            li.textContent = student.name;
            studentList.appendChild(li);
        });
    }
}

// Function to approve or deny requests
function handleRequest(action) {
    alert(`Request ${action} successfully`);
}

// Call functions
document.getElementById("login-form").addEventListener("submit", handleLogin);
document.addEventListener("DOMContentLoaded", () => {
    displayUser();
    renderUsers();
});
