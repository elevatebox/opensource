document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const role = document.getElementById('role').value;
    
    switch(role) {
        case 'admin':
            window.location.href = './admin_dashboard.html';
            break;
        case 'co-admin':
            window.location.href = './coadmin_dashboard.html';
            break;
        case 'student':
            window.location.href = './student_dashboard.html';
            break;
        default:
            alert('Invalid Role');
    }
});
