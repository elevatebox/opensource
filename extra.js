document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const role = document.getElementById('role').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Dummy authentication (Replace with actual logic)
    if (username && password) {
        // Redirect based on role
        switch(role) {
            case 'admin':
                window.location.href = 'admin.html';
                showMessage("Login successful as Admin!");
                break;
            case 'co-admin':
                window.location.href = 'co-admin.html';
                showMessage("Login successful as Co-admin!");
                break;
            case 'student':
                window.location.href = 'student.html';
                showMessage("Login successful as Student!");
                break;
            default:
                showMessage("Please select a valid role.");
        }
    } else {
        showMessage("Please enter both username and password.");
    }
});

function showMessage(message) {
    const popup = document.getElementById('popupMessage');
    popup.innerText = message;
    popup.classList.add('show'); // Show the popup

    // Remove the message after 3 seconds
    setTimeout(() => {
        popup.classList.remove('show');
    }, 3000); // Show for 3 seconds
}
