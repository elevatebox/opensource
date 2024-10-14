// admin.js

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

// Function to handle adding a co-admin
document.getElementById('addCoAdminForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('coAdminName').value;
    const branch = document.getElementById('branch').value;

    if (name && branch) {
        coAdmins.push({ name, branch });
        renderCoAdmins();
        $('#addCoAdminModal').modal('hide');
        document.getElementById('addCoAdminForm').reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Function to delete a co-admin
function deleteCoAdmin(index) {
    coAdmins.splice(index, 1);
    renderCoAdmins();
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
    const branch = document.getElementById('studentBranch').value; // Assuming students have a branch input
    const subject = document.getElementById('studentSubject').value;

    if (name && branch && subject) {
        students.push({ name, branch, subject });
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
    renderStudents();
}

// Initial render
renderCoAdmins();
renderStudents();
