document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;

        // Sample credentials for validation
        const validCredentials = {
            admin: { username: "admin", password: "admin123" },
            coadmin: { username: "coadmin", password: "coadmin123" },
            student: { username: "student", password: "student123" }
        };

        // Log the credentials for debugging
        console.log(`Username: ${username}, Password: ${password}, Role: ${role}`);

        if (validCredentials[role] && 
            validCredentials[role].username === username && 
            validCredentials[role].password === password) {
            // Proceed to the Co-admin dashboard
            window.location.href = "coadmin-dashboard.html"; // Redirect to Co-admin dashboard
        } else {
            alert("Invalid credentials. Please try again.");
        }
    });

    // Handle tab switching
    const studentsTab = document.getElementById('studentsTab');
    const requestsTab = document.getElementById('requestsTab');
    const studentsContent = document.getElementById('studentsContent');
    const requestsContent = document.getElementById('requestsContent');

    studentsTab.addEventListener('click', function () {
        studentsTab.classList.add('active');
        requestsTab.classList.remove('active');
        studentsContent.classList.add('show');
        requestsContent.classList.remove('show');
    });

    requestsTab.addEventListener('click', function () {
        requestsTab.classList.add('active');
        studentsTab.classList.remove('active');
        requestsContent.classList.add('show');
        studentsContent.classList.remove('show');
    });
});
