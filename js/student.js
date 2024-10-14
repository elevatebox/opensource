// student.js

// Sample request history data
let requestHistory = [];

// Function to render request history
function renderRequestHistory() {
    const requestHistoryBody = document.getElementById('request-history-body');
    requestHistoryBody.innerHTML = ''; // Clear existing rows
    requestHistory.forEach((request, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${request.subject}</td>
            <td>${request.details}</td>
            <td>${request.status}</td>
        `;
        requestHistoryBody.appendChild(row);
    });
}

// Handle form submission for requesting permission
document.getElementById('requestForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const subject = document.getElementById('subject').value;
    const details = document.getElementById('permissionDetails').value;

    // Add the request to the history
    requestHistory.push({ subject, details, status: 'Pending' });

    // Show success message
    alert('Request sent successfully');
    
    // Reset the form
    document.getElementById('requestForm').reset();
    renderRequestHistory(); // Refresh the request history
});

// Handle cancel button functionality
document.getElementById('cancelRequest').addEventListener('click', function() {
    document.getElementById('requestForm').reset();
    alert('Cancelled');
});

// Initial render (empty)
renderRequestHistory();
