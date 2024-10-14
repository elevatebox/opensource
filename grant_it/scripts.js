document.getElementById('loginBtn').addEventListener('click', function() {
    const role = document.getElementById('role').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulated login check with JSON data
    fetch('data/users.json')
        .then(response => response.json())
        .then(data => {
            const user = data[role].find(user => user.username === username && user.password === password);
            if (user) {
                // Navigate to the respective dashboard based on role
                alert(`Welcome, ${user.name}!`);
                // Redirect to the appropriate dashboard
                // window.location.href = `${role}-dashboard.html`; // Uncomment when dashboards are ready
            } else {
                alert('Invalid username or password');
            }
        });
});
