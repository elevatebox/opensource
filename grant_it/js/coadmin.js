// coadmin.js

// Check if user is Co-admin
const role = sessionStorage.getItem('role');
const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
if (role !== 'coadmin' || !currentUser) {
    window.location.href = '../html/index.html';
}

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', () => {
    sessionStorage.clear();
    window.location.href = '../html/index.html';
});

// Display assigned branch
document.getElementById('branchInfo').querySelector('span').innerText = currentUser.branch;

// Fetch and display Students under this Co-admin's branch
function loadStudents() {
    fetch('../data/students.json')
        .then(response => response.json())
        .then(students => {
            const filteredStudents = students.filter(student => student.branch === currentUser.branch);
            const studentTable = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
            studentTable.innerHTML = '';
            filteredStudents.forEach(student => {
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

// Fetch and display Requests
function loadRequests() {
    fetch('../data/requests.json')
        .then(response => response.json())
        .then(requests => {
            // Assuming each request has a branch attribute to filter
            const filteredRequests = requests.filter(request => request.branch === currentUser.branch);
            const requestTable = document.getElementById('requestTable').getElementsByTagName('tbody')[0];
            requestTable.innerHTML = '';
            filteredRequests.forEach(request => {
                const row = requestTable.insertRow();
                row.insertCell(0).innerText = request.id;
                row.insertCell(1).innerText = request.studentName;
                row.insertCell(2).innerText = request.subject;
                row.insertCell(3).innerText = request.details;
                row.insertCell(4).innerText = request.status;
                row.insertCell(5).innerHTML = `
                    <button class="btn btn-sm btn-success approveRequest" data-id="${request.id}">Approve</button>
                    <button class="btn btn-sm btn-danger rejectRequest" data-id="${request.id}">Reject</button>
                `;
            });
        })
        .catch(err => console.error('Error loading requests:', err));
}

// Add Student
document.getElementById('addStudentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('studentUsername').value.trim();
    const password = document.getElementById('studentPassword').value.trim();
    const name = document.getElementById('studentName').value.trim();
    const branch = document.getElementById('studentBranch').value.trim();

    if (branch !== currentUser.branch) {
        alert('You can only add students to your assigned branch.');
        return;
    }

    // Fetch existing students
    fetch('../data/students.json')
        .then(response => response.json())
        .then(students => {
            const newId = students.length > 0 ? students[students.length - 1].id + 1 : 1;
            const newStudent = { id: newId, username, password, name, branch };
            students.push(newStudent);

            // Update JSON file (Requires backend)
            alert('Student added successfully.');
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('addStudentModal'));
            modal.hide();
            // Reload students
            loadStudents();
        })
        .catch(err => console.error('Error adding student:', err));
});

// Handle Approve/Reject Requests
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('approveRequest')) {
        const id = e.target.getAttribute('data-id');
        // Implement approve functionality
        alert(`Request ${id} approved.`);
        // Reload requests
        loadRequests();
    }

    if (e.target.classList.contains('rejectRequest')) {
        const id = e.target.getAttribute('data-id');
        // Implement reject functionality
        alert(`Request ${id} rejected.`);
        // Reload requests
        loadRequests();
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
loadStudents();
loadRequests();
