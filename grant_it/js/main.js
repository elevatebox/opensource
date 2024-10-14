// main.js

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const role = document.getElementById('role').value;
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Fetch user data from JSON files
    fetch(`../data/${role}s.json`)
        .then(response => response.json())
        .then(data => {
            const user = data.find(user => user.username === username && user.password === password);
            if (user) {
                // Store user info in localStorage/sessionStorage
                sessionStorage.setItem('currentUser', JSON.stringify(user));
                sessionStorage.setItem('role', role);

                // Redirect based on role
                if (role === 'admin') {
                    window.location.href = '../html/admin.html';
                } else if (role === 'coadmin') {
                    window.location.href = '../html/coadmin.html';
                } else if (role === 'student') {
                    window.location.href = '../html/student.html';
                }
            } else {
                alert('Invalid credentials. Please try again.');
            }
        })
        .catch(err => console.error('Error fetching user data:', err));
});
