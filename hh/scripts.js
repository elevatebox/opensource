function login() {
    const role = document.getElementById('role').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (role && username && password) {
        // Here, you would typically send this data to your backend for verification
        console.log(`Logging in as ${role} with username ${username}`);

        // Redirect to role-specific dashboard (this part would change based on the role)
        if (role === 'admin') {
            window.location.href = 'admin_dashboard.html';
        } else if (role === 'co-admin') {
            window.location.href = 'coadmin_dashboard.html';
        } else if (role === 'student') {
            window.location.href = 'student_dashboard.html';
        }
    } else {
        alert("Please fill in all fields!");
    }
}
