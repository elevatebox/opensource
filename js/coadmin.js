// co-admin.js

// Fetch existing data from local storage or initialize empty arrays
let students = JSON.parse(localStorage.getItem('students')) || [];
let requests = JSON.parse(localStorage.getItem('requests')) || [];

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

// Function to handle adding a student
document.getElementById('addStudentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('studentName').value;
    const branch = document.getElementById('studentBranch').value;
    const subject = document.getElementById('studentSubject').value;

    if (name && branch && subject) {
        students.push({ name, branch, subject });
        localStorage.setItem('students', JSON.stringify(students)); // Save to local storage
        renderStudents();
        $('#addStudentModal').modal('hide');
        document.getElementById('addStudentForm').reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Function to delete a student
function deleteStudent(index) {
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students)); // Update local storage
    renderStudents();
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
            <td>${request.subject}</td>
            <td>${request.details}</td>
            <td>${request.status || 'Pending'}</td>
            <td>
                <button class="btn btn-success btn-sm" onclick="approveRequest(${index})">Approve</button>
                <button class="btn btn-danger btn-sm" onclick="rejectRequest(${index})">Reject</button>
            </td>
        `;
        requestTableBody.appendChild(row);
    });
}

// Function to approve a request
function approveRequest(index) {
    requests[index].status = 'Approved';
    localStorage.setItem('requests', JSON.stringify(requests)); // Update local storage
    renderRequests();
}

// Function to reject a request
function rejectRequest(index) {
    requests[index].status = 'Rejected';
    localStorage.setItem('requests', JSON.stringify(requests)); // Update local storage
    renderRequests();
}

// Initial render
renderStudents();
renderRequests();
