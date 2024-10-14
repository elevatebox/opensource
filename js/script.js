// script.js

// Sample data for co-admins and students
let coAdmins = [];
let students = [];

// Function to render co-admins in the table
function renderCoAdmins() {
    const coAdminTableBody = document.getElementById('co-admin-table-body');
    coAdminTableBody.innerHTML = ''; // Clear existing rows
    coAdmins.forEach((coAdmin, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${coAdmin.name}</td>
            <td>${coAdmin.branch}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteCoAdmin(${index})">Delete</button>
            </td>
        `;
        coAdminTableBody.appendChild(row);
    });
}

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
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        studentTableBody.appendChild(row);
    });
}

// Function to handle adding a co-admin
document.getElementById('addCoAdminForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('coAdminName').value;
    const branch = document.getElementById('coAdminBranch').value;
    coAdmins.push({ name, branch });
    renderCoAdmins(); // Refresh the table
    $('#addCoAdminModal').modal('hide'); // Hide the modal
    document.getElementById('addCoAdminForm').reset(); // Reset the form
});

// Function to handle adding a student
document.getElementById('addStudentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('studentName').value;
    const branch = document.getElementById('studentBranch').value;
    students.push({ name, branch });
    renderStudents(); // Refresh the table
    $('#addStudentModal').modal('hide'); // Hide the modal
    document.getElementById('addStudentForm').reset(); // Reset the form
});

// Function to delete a co-admin
function deleteCoAdmin(index) {
    coAdmins.splice(index, 1); // Remove the co-admin
    renderCoAdmins(); // Refresh the table
}

// Function to delete a student
function deleteStudent(index) {
    students.splice(index, 1); // Remove the student
    renderStudents(); // Refresh the table
}

// Initial render (empty)
renderCoAdmins();
renderStudents();
