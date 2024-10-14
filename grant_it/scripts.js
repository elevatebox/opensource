document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const role = document.getElementById('role').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Temporary login logic (Dummy JSON-based verification)
    fetch('../data/users.json')
        .then(response => response.json())
        .then(data => {
            const user = data[role].find(u => u.username === username && u.password === password);
            if (user) {
                switch (role) {
                    case 'admin':
                        window.location.href = './admin.html';
                        break;
                    case 'coadmin':
                        window.location.href = './coadmin.html';
                        break;
                    case 'student':
                        window.location.href = './student.html';
                        break;
                }
            } else {
                alert('Invalid login credentials!');
            }
        });
});
