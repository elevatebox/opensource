// Sample request history data
const requestHistory = [
    { subject: "Leave for Family Function", details: "I need to attend a family function on 20th Oct.", status: "approved" },
    { subject: "Sick Leave", details: "I am not feeling well and need a leave for today.", status: "pending" },
    { subject: "Project Submission Delay", details: "Requesting extension for project submission due to illness.", status: "approved" },
    { subject: "Extra-curricular Activity", details: "Requesting permission for attending a workshop on 22nd Oct.", status: "pending" }
];

// Function to display request history
function displayRequestHistory() {
    const requestHistoryList = document.getElementById('requestHistoryList');
    requestHistoryList.innerHTML = ''; // Clear the list first

    requestHistory.forEach(request => {
        const li = document.createElement('li');
        li.className = `list-group-item ${request.status}`; // Set class based on status
        li.textContent = `${request.subject}: ${request.details}`;

        requestHistoryList.appendChild(li);
    });
}

// Event listener for form submission
document.getElementById('requestForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const subject = document.getElementById('subject').value;
    const details = document.getElementById('details').value;

    // Add the new request to the history (default status as pending)
    requestHistory.push({ subject: subject, details: details, status: "pending" });
    
    // Display updated request history
    displayRequestHistory();

    // Reset form fields
    this.reset();
});

// Display the initial request history on page load
window.onload = displayRequestHistory;
