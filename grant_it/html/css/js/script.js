document.getElementById('loginBtn').addEventListener('click', function() {
    const role = document.getElementById('role').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('data/users.json')
        .then(response => response.json())
        .then(data => {
            const user = data[role].find(user => user.username === username && user.password === password);
            if (user) {
                alert(`Welcome, ${user.name}!`);
                window.location.href = `${role}-dashboard.html`; // Redirect to respective dashboard
            } else {
                alert('Invalid username or password');
            }
        });
});
