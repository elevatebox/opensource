// coadmin.js

// Sample data for students and requests
let students = [];
let requests = [];

// Function to render students in the table
function renderStudents() {
    const studentTableBody = document.getElementById('student-table-body');
    studentTableBody.innerHTML = ''; // Clear existing rows
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.branch}</td>
            <td>${student.subject}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        studentTableBody.appendChild(row);
    });
}

// Function to render requests in the table
function renderRequests() {
    const requestTableBody = document.getElementById('request-table-body');
    requestTableBody.innerHTML = ''; // Clear existing rows
    requests.forEach((request, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${request.studentName}</td>
            <td>${request.details}</td>
            <td>${request.status}</td>
            <td>
                <button class="btn btn-success btn-sm" onclick="approveRequest(${index})">Approve</button>
                <button class="btn btn-danger btn-sm" onclick="rejectRequest(${index})">Reject</button>
            </td>
        `;
        requestTableBody.appendChild(row);
    });
}

// Function to handle adding a student
document.getElementById('addStudentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('studentName').value;
    const branch = document.getElementById('studentBranch').value;
    const subject = document.getElementById('studentSubject').value; // Get selected subject
    students.push({ name, branch, subject }); // Add subject to student object
    renderStudents(); // Refresh the student table
    $('#addStudentModal').modal('hide'); // Hide the modal
    document.getElementById('addStudentForm').reset(); // Reset the form
});

// Function to delete a student
function deleteStudent(index) {
    students.splice(index, 1); // Remove the student
    renderStudents(); // Refresh the student table
}

// Function to approve a request
function approveRequest(index) {
    requests[index].status = 'Approved';
    renderRequests(); // Refresh the requests table
}

// Function to reject a request
function rejectRequest(index) {
    requests[index].status = 'Rejected';
    renderRequests(); // Refresh the requests table
}

// Initial render (empty)
renderStudents();
renderRequests();
