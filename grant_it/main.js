document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();  // Prevent the form from submitting in the default way.

    // Get values from the form
    const userType = document.getElementById('userType').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Basic validation for role selection
    if (!userType) {
        alert('Please select a user type.');
        return;
    }

    // For now, bypass username/password validation and redirect based on role
    if (userType === 'admin') {
        window.location.href = 'admin.html';
    } else if (userType === 'coadmin') {
        window.location.href = 'coadmin.html';
    } else if (userType === 'student') {
        window.location.href = 'student.html';
    }
});
