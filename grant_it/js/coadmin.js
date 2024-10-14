document.addEventListener('DOMContentLoaded', function () {
    // Mock data to simulate pre-existing co-admins and students
    const coadmins = [
        { name: 'John Doe', branch: 'CS' },
        { name: 'Jane Smith', branch: 'IT' }
    ];

    const students = [
        { name: 'Alex Brown', branch: 'ECE' },
        { name: 'Emily Davis', branch: 'ME' }
    ];

    // Function to populate the Co-admin table
    function populateCoadminTable() {
        const coadminTableBody = document.getElementById('coadminTable').getElementsByTagName('tbody')[0];
        coadminTableBody.innerHTML = ''; // Clear existing rows

        coadmins.forEach((coadmin, index) => {
            const row = coadminTableBody.insertRow();
            row.innerHTML = `
                <td>${coadmin.name}</td>
                <td>${coadmin.branch}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editCoadmin(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteCoadmin(${index})">Delete</button>
                </td>
            `;
        });
    }

    // Function to populate the Student table
    function populateStudentTable() {
        const studentTableBody = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
        studentTableBody.innerHTML = ''; // Clear existing rows

        students.forEach((student, index) => {
            const row = studentTableBody.insertRow();
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.branch}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editStudent(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;
        });
    }

    // Function to add a new co-admin
    document.getElementById('addCoadminForm').addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent form submission
        const username = document.getElementById('coadminUsername').value;
        const password = document.getElementById('coadminPassword').value;
        const name = document.getElementById('coadminName').value;
        const branch = document.getElementById('coadminBranch').value;

        // Add the new co-admin to the array
        coadmins.push({ name, branch });

        // Reset the form and close the modal
        this.reset();
        const modal = new bootstrap.Modal(document.getElementById('addCoadminModal'));
        modal.hide();

        // Update the table
        populateCoadminTable();
    });

    // Function to add a new student
    document.getElementById('addStudentForm').addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent form submission
        const rollNumber = document.getElementById('studentUsername').value;
        const password = document.getElementById('studentPassword').value;
        const name = document.getElementById('studentName').value;
        const branch = document.getElementById('studentBranch').value;

        // Add the new student to the array
        students.push({ name, branch });

        // Reset the form and close the modal
        this.reset();
        const modal = new bootstrap.Modal(document.getElementById('addStudentModal'));
        modal.hide();

        // Update the table
        populateStudentTable();
    });

    // Function to edit a co-admin (mock functionality)
    window.editCoadmin = function (index) {
        const coadmin = coadmins[index];
        // Implement edit functionality here
        alert('Edit Co-admin: ' + coadmin.name);
    };

    // Function to delete a co-admin
    window.deleteCoadmin = function (index) {
        const confirmation = confirm('Are you sure you want to delete this co-admin?');
        if (confirmation) {
            coadmins.splice(index, 1); // Remove the co-admin from the array
            populateCoadminTable(); // Refresh the table
        }
    };

    // Function to edit a student (mock functionality)
    window.editStudent = function (index) {
        const student = students[index];
        // Implement edit functionality here
        alert('Edit Student: ' + student.name);
    };

    // Function to delete a student
    window.deleteStudent = function (index) {
        const confirmation = confirm('Are you sure you want to delete this student?');
        if (confirmation) {
            students.splice(index, 1); // Remove the student from the array
            populateStudentTable(); // Refresh the table
        }
    };

    // Function to logout
    window.logout = function () {
        // Redirect to the login page
        window.location.href = "../html/index.html";
    };

    // Initial population of the tables
    populateCoadminTable();
    populateStudentTable();
});
