// Example Student Data
let studentsData = [
    {
        "username": "johnDoe",
        "branch": "Computer Science",
        "requests": [
            { "subject": "Gatepass Request", "description": "Need to attend a seminar outside", "status": "Approved" },
            { "subject": "Outpass Request", "description": "Family emergency", "status": "Pending" }
        ]
    }
];

// On page load
window.onload = function() {
    const studentDetails = document.getElementById("studentDetails");
    const requestHistory = document.getElementById("requestHistory");

    // For demonstration, hardcode the logged-in student to johnDoe
    const loggedInStudent = studentsData[0]; // Change this to fetch dynamically later

    // Display student details
    studentDetails.innerHTML = `
        <h5>Welcome, ${loggedInStudent.username}!</h5>
        <p>Branch: ${loggedInStudent.branch}</p>
    `;

    // Display request history
    function loadRequestHistory() {
        requestHistory.innerHTML = ''; // Clear previous history

        if (loggedInStudent.requests.length > 0) {
            loggedInStudent.requests.forEach((request) => {
                const progressBarClass = request.status === 'Approved' ? 'bg-success' : request.status === 'Pending' ? 'bg-warning' : 'bg-danger';
                const progressBarWidth = request.status === 'Approved' ? '100%' : '50%';

                requestHistory.innerHTML += `
                    <div class="card mt-2">
                        <div class="card-body">
                            <h5 class="card-title">${request.subject}</h5>
                            <p class="card-text">${request.description}</p>
                            <div class="progress">
                                <div class="progress-bar ${progressBarClass}" role="progressbar" style="width: ${progressBarWidth};">
                                    ${request.status}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
        } else {
            requestHistory.innerHTML = '<p>No previous requests found.</p>';
        }
    }

    loadRequestHistory(); // Load request history on page load

    // Handle new request submission
    const requestForm = document.getElementById('requestForm');
    requestForm.onsubmit = function(event) {
        event.preventDefault();

        const subject = document.getElementById('subject').value;
        const description = document.getElementById('description').value;

        if (subject === '' || description === '') {
            alert("Please fill out both subject and description.");
            return;
        }

        // Create new request
        const newRequest = {
            subject: subject,
            description: description,
            status: 'Pending'
        };

        // Add the new request to the student's request array
        loggedInStudent.requests.push(newRequest);

        // Success message
        alert("Request submitted successfully!");

        // Clear form
        requestForm.reset();

        // Reload the request history with the new entry
        loadRequestHistory();
    };

    // Handle cancel button
    const cancelRequest = document.getElementById('cancelRequest');
    cancelRequest.onclick = function() {
        requestForm.reset();
        alert('Request cancelled.');
    };
};
