document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');
  
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const role = document.getElementById('role').value;
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      // Fetch users from JSON file (mocked as an async function here)
      fetch('../data/users.json')
        .then(response => response.json())
        .then(data => {
          const user = data[role].find(u => u.username === username && u.password === password);
          if (user) {
            // Redirect based on role
            if (role === 'admin') {
              window.location.href = 'admin.html';
            } else if (role === 'coadmin') {
              window.location.href = 'coadmin.html';
            } else if (role === 'student') {
              window.location.href = 'student.html';
            }
          } else {
            alert('Invalid credentials!');
          }
        })
        .catch(err => console.log(err));
    });
  });
  