// Load co-admins and students data from JSON files
fetch("../data/coadmins.json")
    .then(response => response.json())
    .then(data => {
        // Render Co-admin management section
        const coadminDiv = document.getElementById("coadminManagement");
        coadminDiv.innerHTML = '<button class="btn btn-primary mb-2" onclick="addCoAdmin()">Add Co-admin</button>';
        data.forEach(coadmin => {
            coadminDiv.innerHTML += `
                <div class="border p-3 mb-2">
                    <h5>${coadmin.name}</h5>
                    <p>Branch: ${coadmin.branch}</p>
                    <button class="btn btn-danger" onclick="removeCoAdmin('${coadmin.id}')">Remove</button>
                </div>`;
        });
    });

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

function addCoAdmin() {
    // Logic to add a new co-admin
    alert('Add Co-admin functionality to be implemented!');
}

function removeCoAdmin(id) {
    // Logic to remove a co-admin
    alert(`Removing Co-admin with ID: ${id}`);
}

function addStudent() {
    // Logic to add a new student
    alert('Add Student functionality to be implemented!');
}

function removeStudent(id) {
    // Logic to remove a student
    alert(`Removing Student with ID: ${id}`);
}
