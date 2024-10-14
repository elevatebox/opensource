// Handle form submission
document.getElementById("login-form").addEventListener("submit", handleLogin);

// Function to handle login
function handleLogin(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get values from the form
    const role = document.getElementById("role").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Log the role, username, and password (for debugging)
    console.log(`Role: ${role}, Username: ${username}, Password: ${password}`);

    // Simulating role-based access control logic
    if (isValidUser(username, password)) {
        alert(`Logged in as ${role}`);
        // Redirect to the appropriate dashboard based on role
        window.location.href = `/${role}-dashboard.html`;
    } else {
        alert("Invalid username or password");
    }
}

// Mock function to validate user credentials (replace with real validation)
function isValidUser(username, password) {
    // This is a placeholder. You would typically check against stored user data.
    return username && password; // Just checks if both fields are filled
}
