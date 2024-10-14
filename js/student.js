// student.js

let requests = JSON.parse(localStorage.getItem('requests')) || [];

// Function to render request history in the table
function renderRequestHistory() {
    const requestHistoryBody = document.getElementById('request-history-body');
    requestHistoryBody.innerHTML = ''; // Clear existing rows
    requests.forEach((request, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${request.subject}</td>
            <td>${request.details}</td>
            <td>${request.status || 'Pending'}</td>
        `;
        requestHistoryBody.appendChild(row);
    });
}

// Function to handle request submission
document.getElementById('requestForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const subject = document.getElementById('subject').value;
    const details = document.getElementById('details').value;

    if (subject && details) {
        requests.push({ subject, details, status: 'Pending' });
        localStorage.setItem('requests', JSON.stringify(requests)); // Save to local storage
        alert('Request sent successfully!');
        document.getElementById('requestForm').reset();
        renderRequestHistory(); // Refresh request history
    } else {
        alert('Please fill in all fields.');
    }
});

// Function to cancel a request (reset form)
function cancelRequest() {
    document.getElementById('requestForm').reset();
}

// Initial render of request history
renderRequestHistory();
