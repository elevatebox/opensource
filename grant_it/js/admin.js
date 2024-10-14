// admin.js

// Check if user is Admin
const role = sessionStorage.getItem('role');
if (role !== 'admin') {
    window.location.href = '../html/index.html';
}

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', () => {
    sessionStorage.clear();
    window.location.href = '../html/index.html';
});

// Fetch and display Co-admins
function loadCoadmins() {
    fetch('../data/coadmins.json')
        .then(response => response.json())
        .then(coadmins => {
            const coadminTable = document.getElementById('coadminTable').getElementsByTagName('tbody')[0];
            coadminTable.innerHTML = '';
            coadmins.forEach(coadmin => {
                const row = coadminTable.insertRow();
                row.insertCell(0).innerText = coadmin.id;
                row.insertCell(1).innerText = coadmin.username;
                row.insertCell(2).innerText = coadmin.name;
                row.insertCell(3).innerText = coadmin.branch;
                row.insertCell(4).innerHTML = `
                    <button class="btn btn-sm btn-warning me-2 editCoadmin" data-id="${coadmin.id}">Edit</button>
                    <button class="btn btn-sm btn-danger deleteCoadmin" data-id="${coadmin.id}">Delete</button>
                `;
            });
        })
        .catch(err => console.error('Error loading coadmins:', err));
}

// Fetch and display Students
function loadStudents() {
    fetch('../data/students.json')
        .then(response => response.json())
        .then(students => {
            const studentTable = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
            studentTable.innerHTML = '';
            students.forEach(student => {
                const row = studentTable.insertRow();
                row.insertCell(0).innerText = student.id;
                row.insertCell(1).innerText = student.username;
                row.insertCell(2).innerText = student.name;
                row.insertCell(3).innerText = student.branch;
                row.insertCell(4).innerHTML = `
                    <button class="btn btn-sm btn-warning me-2 editStudent" data-id="${student.id}">Edit</button>
                    <button class="btn btn-sm btn-danger deleteStudent" data-id="${student.id}">Delete</button>
                `;
            });
        })
        .catch(err => console.error('Error loading students:', err));
}

// Add Co-admin
document.getElementById('addCoadminForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('coadminUsername').value.trim();
    const password = document.getElementById('coadminPassword').value.trim();
    const name = document.getElementById('coadminName').value.trim();
    const branch = document.getElementById('coadminBranch').value.trim();

    // Fetch existing coadmins
    fetch('../data/coadmins.json')
        .then(response => response.json())
        .then(coadmins => {
            const newId = coadmins.length > 0 ? coadmins[coadmins.length - 1].id + 1 : 1;
            const newCoadmin = { id: newId, username, password, name, branch };
            coadmins.push(newCoadmin);

            // Update JSON file (Note: This requires backend support. Here, we simulate success.)
            alert('Co-admin added successfully.');
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('addCoadminModal'));
            modal.hide();
            // Reload coadmins
            loadCoadmins();
        })
        .catch(err => console.error('Error adding coadmin:', err));
});

// Add Student
document.getElementById('addStudentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('studentUsername').value.trim();
    const password = document.getElementById('studentPassword').value.trim();
    const name = document.getElementById('studentName').value.trim();
    const branch = document.getElementById('studentBranch').value.trim();

    // Fetch existing students
    fetch('../data/students.json')
        .then(response => response.json())
        .then(students => {
            const newId = students.length > 0 ? students[students.length - 1].id + 1 : 1;
            const newStudent = { id: newId, username, password, name, branch };
            students.push(newStudent);

            // Update JSON file (Note: This requires backend support. Here, we simulate success.)
            alert('Student added successfully.');
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('addStudentModal'));
            modal.hide();
            // Reload students
            loadStudents();
        })
        .catch(err => console.error('Error adding student:', err));
});

// Edit and Delete functionality placeholders
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('deleteCoadmin')) {
        const id = e.target.getAttribute('data-id');
        // Implement delete functionality
        if (confirm('Are you sure you want to delete this Co-admin?')) {
            alert(`Co-admin with ID ${id} deleted.`);
            loadCoadmins();
        }
    }

    if (e.target.classList.contains('deleteStudent')) {
        const id = e.target.getAttribute('data-id');
        // Implement delete functionality
        if (confirm('Are you sure you want to delete this Student?')) {
            alert(`Student with ID ${id} deleted.`);
            loadStudents();
        }
    }
});

// Initial Load
loadCoadmins();
loadStudents();
