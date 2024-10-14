document.getElementById('loginBtn').addEventListener('click', function () {
    const role = document.getElementById('loginAs').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Simulate login based on role and redirect to respective pages
    if (role === 'admin') {
      window.location.href = './admin_dashboard.html';
    } else if (role === 'co-admin') {
      window.location.href = './coadmin_dashboard.html';
    } else if (role === 'student') {
      window.location.href = './student_dashboard.html';
    }
  });
  