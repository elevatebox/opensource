document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const role = document.getElementById("role").value;
    if (role === "admin") {
        window.location.href = "admin.html"; // Redirect to admin dashboard
    } else if (role === "coadmin") {
        window.location.href = "coadmin.html"; // Redirect to co-admin dashboard
    } else {
        window.location.href = "student.html"; // Redirect to student dashboard
    }
});
