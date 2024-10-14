// Load request history from JSON files
fetch("../data/requests.json")
    .then(response => response.json())
    .then(data => {
        // Render Request history section
        const historyDiv = document.getElementById("requestHistory");
        data.forEach(request => {
            historyDiv.innerHTML += `
                <div class="border p-3 mb-2">
                    <h5>${request.subject}</h5>
                    <p>Status: <strong>${request.status}</strong></p>
                </div>`;
        });
    });

document.getElementById("permissionForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const subject = this.elements[0].value;
    const details = this.elements[1].value;

    // Logic to send permission request (dummy for now)
    alert("Request sent successfully!");

    // Reset the form
    this.reset();
});
