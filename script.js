document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const category = document.getElementById('category').value;
    
    if (category === 'student') {
        window.location.href = 'student_dashboard.html'; // Redirect to student dashboard
    } else {
        alert('Login for Admin/Co-Admin is not implemented yet.');
    }
});


