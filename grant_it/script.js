document.getElementById("loginBtn").addEventListener("click", function() {
    const role = document.getElementById("role").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Dummy data check (for demonstration purposes)
    if (role && username && password) {
        // Fetch user data from JSON (you'll implement this)
        // For now, just alert the user
        alert(`Logged in as: ${role}`);
        // Redirect to the respective dashboard (to be implemented)
    } else {
        alert("Please fill in all fields.");
    }
});
