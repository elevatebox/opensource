function login() {
    const role = document.getElementById('role-dropdown').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulating a login process
    fetch(`../data/${role}.json`)
        .then(response => response.json())
        .then(data => {
            const user = data.find(user => user.username === username && user.password === password);
            if (user) {
                alert(`${role.charAt(0).toUpperCase() + role.slice(1)} logged in successfully!`);
                // Redirect to respective dashboards (to be implemented)
            } else {
                alert('Invalid username or password.');
            }
        })
        .catch(error => console.error('Error fetching user data:', error));
}
