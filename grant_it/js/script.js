// Function to handle login and redirect to appropriate dashboard
function login() {
    const role = document.getElementById('role').value;

    if (role === 'admin') {
        window.location.href = 'admin_dashboard.html';
    } else if (role === 'coadmin') {
        window.location.href = 'coadmin_dashboard.html';
    } else if (role === 'student') {
        window.location.href = 'student_dashboard.html';
    }
}
