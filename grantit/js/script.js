document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const role = document.getElementById("role").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Dummy authentication logic, replace with real data in the future
    // Add simple validation
    if (username === "" || password === "") {
        alert("Please fill in all fields."); // Alert for empty fields
        return; // Exit the function if fields are empty
    }

    // Simulate a successful login with a timeout (you can replace this with real authentication later)
    setTimeout(() => {
        if (role === "admin") {
            alert("Login successful! Redirecting to Admin Dashboard...");
            window.location.href = "admin-dashboard.html";
        } else if (role === "co-admin") {
            alert("Login successful! Redirecting to Co-admin Dashboard...");
            window.location.href = "co-admin-dashboard.html";
        } else {
            alert("Login successful! Redirecting to Student Dashboard...");
            window.location.href = "student-dashboard.html";
        }
    }, 1000); // Simulated delay for demonstration
});
