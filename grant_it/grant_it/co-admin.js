// Load students and requests data from JSON files
fetch("../data/students.json")
    .then(response => response.json())
    .then(data => {
        // Render Student management section
        const studentDiv = document.getElementById("studentManagement");
        studentDiv.innerHTML = '<button class="btn btn-primary mb-2" onclick="addStudent()">Add Student</button>';
        data.forEach(student => {
            studentDiv.innerHTML += `
                <div class="border p-3 mb-2">
                    <h5>${student.name}</h5>
                    <p>Branch: ${student.branch}</p>
                    <button class="btn btn-danger" onclick="removeStudent('${student.id}')">Remove</button>
                </div>`;
        });
    });

fetch("../data/requests.json")
    .then(response => response.json())
    .then(data => {
        // Render Requests management section
        const requestDiv = document.getElementById("requestManagement");
        data.forEach(request => {
            requestDiv.innerHTML += `
                <div class="border p-3 mb-2">
                    <h5>${request.studentName}</h5>
                    <p>Subject: ${request.subject}</p>
                    <p>Status: <strong>${request.status}</strong></p>
                    <button class="btn btn-success" onclick="approveRequest('${request.id}')">Approve</button>
                    <button class="btn btn-danger" onclick="rejectRequest('${request.id}')">Reject</button>
                </div>`;
        });
    });

function addStudent() {
    // Logic to add a new student
    alert('Add Student functionality to be implemented!');
}

function removeStudent(id) {
    // Logic to remove a student
    alert(`Removing Student with ID: ${id}`);
}

function approveRequest(id) {
    // Logic to approve a request
    alert(`Approved request with ID: ${id}`);
}

function rejectRequest(id) {
    // Logic to reject a request
    alert(`Rejected request with ID: ${id}`);
}
