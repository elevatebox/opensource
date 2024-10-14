document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const role = document.getElementById('role').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Basic login check (will be replaced with backend verification)
    if (username && password) {
        if (role === 'admin') {
            window.location.href = 'admin_dashboard.html';
        } else if (role === 'co-admin') {
            window.location.href = 'coadmin_dashboard.html';
        } else if (role === 'student') {
            window.location.href = 'student_dashboard.html';
        }
    } else {
        alert('Please fill in all fields');
    }
});
