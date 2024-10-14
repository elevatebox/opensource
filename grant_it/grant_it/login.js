document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    
    const role = document.getElementById("role").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Simple authentication logic
    if (username && password) {
        if (role === "Admin") {
            window.location.href = "../html/admin-dashboard.html";
        } else if (role === "Co-admin") {
            window.location.href = "../html/coadmin-dashboard.html";
        } else if (role === "Student") {
            window.location.href = "../html/student-dashboard.html";
        }
    } else {
        alert("Please enter both username and password!");
    }
});
