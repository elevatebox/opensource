// student.js

// Check if user is Student
const role = sessionStorage.getItem('role');
const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
if (role !== 'student' || !currentUser) {
    window.location.href = '../html/index.html';
}

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', () => {
    sessionStorage.clear();
    window.location.href = '../html/index.html';
});

// Handle Permission Form Submission
document.getElementById('permissionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const subject = document.getElementById('subject').value.trim();
    const details = document.getElementById('details').value.trim();

    // Fetch existing requests
    fetch('../data/requests.json')
        .then(response => response.json())
        .then(requests => {
            const newId = requests.length > 0 ? requests[requests.length - 1].id + 1 : 1;
            const newRequest = {
                id: newId,
                studentId: currentUser.id,
                studentName: currentUser.name,
                branch: currentUser.branch,
                subject,
                details,
                status: 'Pending'
            };
            requests.push(newRequest);

            // Update JSON file (Requires backend)
            alert('Request sent successfully.');
            // Reset form
            document.getElementById('permissionForm').reset();
            // Reload history
            loadHistory();
        })
        .catch(err => console.error('Error submitting request:', err));
});

// Handle Cancel Button
document.getElementById('cancelBtn').addEventListener('click', function() {
    if (confirm('Are you sure you want to cancel?')) {
        alert('Cancelled');
        document.getElementById('permissionForm').reset();
    }
});

// Load Request History
function loadHistory() {
    fetch('../data/requests.json')
        .then(response => response.json())
        .then(requests => {
            const userRequests = requests.filter(request => request.studentId === currentUser.id);
            const historyTable = document.getElementById('historyTable').getElementsByTagName('tbody')[0];
            historyTable.innerHTML = '';
            userRequests.forEach(request => {
                const row = historyTable.insertRow();
                row.insertCell(0).innerText = request.id;
                row.insertCell(1).innerText = request.subject;
                row.insertCell(2).innerText = request.details;
                row.insertCell(3).innerHTML = `
                    <div class="progress">
                        <div class="progress-bar ${request.status === 'Approved' ? 'bg-success' : request.status === 'Rejected' ? 'bg-danger' : 'bg-warning'}" role="progressbar" style="width: ${request.status === 'Pending' ? '50%' : '100%'};" aria-valuenow="${request.status === 'Pending' ? 50 : 100}" aria-valuemin="0" aria-valuemax="100">
                            ${request.status}
                        </div>
                    </div>
                `;
            });
        })
        .catch(err => console.error('Error loading request history:', err));
}

// Initial Load
loadHistory();
