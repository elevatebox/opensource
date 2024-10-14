// Sample user data (You can replace this with actual data later)
const users = {
    admin: { username: 'admin', password: 'admin123' },
    coAdmin: { username: 'coadmin', password: 'coadmin123' },
    student: { username: 'student', password: 'student123' },
  };
  
  document.getElementById("loginForm").onsubmit = function(event) {
    event.preventDefault(); // Prevent form submission
  
    const role = document.getElementById("role").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const messageDiv = document.getElementById("message");
  
    // Check if the user exists based on the selected role
    if (users[role] && users[role].username === username && users[role].password === password) {
      messageDiv.innerText = "Login successful!";
      messageDiv.style.color = "green";
      // Redirect to the appropriate dashboard
      setTimeout(() => {
        if (role === "admin") {
          window.location.href = "admin.html";
        } else if (role === "co-admin") {
          window.location.href = "coadmin.html"; // Create this page similarly
        } else if (role === "student") {
          window.location.href = "student.html"; // Create this page similarly
        }
      }, 1000);
    } else {
      messageDiv.innerText = "Invalid credentials. Please try again.";
    }
  };
  