// student.js

// Sample data for request history (replace this with your actual data source)
const requestHistoryData = JSON.parse(localStorage.getItem("studentRequests")) || [];

// Function to display request history
function displayRequestHistory() {
    const historyContainer = document.getElementById("requestHistory");
    historyContainer.innerHTML = ""; // Clear previous data

    if (requestHistoryData.length === 0) {
        historyContainer.innerHTML = "<p>No requests found.</p>";
        return;
    }

    requestHistoryData.forEach((request, index) => {
        const requestDiv = document.createElement("div");
        requestDiv.classList.add("request-item", "mb-3", "border", "p-2", "rounded");
        requestDiv.innerHTML = `
            <p><strong>Request ID:</strong> ${index + 1} | <strong>Subject:</strong> ${request.subject} | <strong>Status:</strong> ${request.status}</p>
            <p><strong>Details:</strong> ${request.details}</p>
        `;
        historyContainer.appendChild(requestDiv);
    });
}

// Function to handle request submission
document.getElementById("requestForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const subject = document.getElementById("subject").value;
    const details = document.getElementById("details").value;

    // Add the new request to the history
    const newRequest = {
        subject: subject,
        details: details,
        status: "Pending" // Default status for new requests
    };
    
    // Push the new request into the array and update local storage
    requestHistoryData.push(newRequest);
    localStorage.setItem("studentRequests", JSON.stringify(requestHistoryData)); // Update local storage

    // Clear the form
    this.reset();

    // Display updated request history
    displayRequestHistory();
});

// Call the function to populate the request history on page load
displayRequestHistory();
