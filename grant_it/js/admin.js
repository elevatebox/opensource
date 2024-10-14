// Dummy Data to Simulate a Database
let coAdmins = [];
let students = [];

// Select the tables
const coadminTable = document.getElementById("coadminTable").getElementsByTagName("tbody")[0];
const studentTable = document.getElementById("studentTable").getElementsByTagName("tbody")[0];

// Function to render Co-admins in the table
function renderCoadmins() {
    coadminTable.innerHTML = ''; // Clear the table before re-rendering
    coAdmins.forEach((coadmin, index) => {
        const row = coadminTable.insertRow();
        row.insertCell(0).textContent = coadmin.name;
        row.insertCell(1).textContent = coadmin.branch;
        row.insertCell(2).innerHTML = `
            <button class="btn btn-warning btn-sm" onclick="editCoadmin(${index})">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deleteCoadmin(${index})">Delete</button>
        `;
    });
}

// Function to render Students in the table
function renderStudents() {
    studentTable.innerHTML = ''; // Clear the table before re-rendering
    students.forEach((student, index) => {
        const row = studentTable.insertRow();
        row.insertCell(0).textContent = student.name;
        row.insertCell(1).textContent = student.branch;
        row.insertCell(2).innerHTML = `
            <button class="btn btn-warning btn-sm" onclick="editStudent(${index})">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deleteStudent(${index})">Delete</button>
        `;
    });
}

// Function to add a new Co-admin
document.getElementById("addCoadminForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission
    const name = document.getElementById("coadminName").value;
    const branch = document.getElementById("coadminBranch").value;

    if (name && branch) {
        coAdmins.push({ name, branch });
        renderCoadmins();
        document.getElementById("addCoadminModal").querySelector(".btn-close").click(); // Close the modal
        this.reset(); // Reset the form
    }
});

// Function to add a new Student
document.getElementById("addStudentForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission
    const name = document.getElementById("studentName").value;
    const branch = document.getElementById("studentBranch").value;

    if (name && branch) {
        students.push({ name, branch });
        renderStudents();
        document.getElementById("addStudentModal").querySelector(".btn-close").click(); // Close the modal
        this.reset(); // Reset the form
    }
});

// Function to edit a Co-admin (in case you want to implement this)
function editCoadmin(index) {
    const coadmin = coAdmins[index];
    document.getElementById("coadminName").value = coadmin.name;
    document.getElementById("coadminBranch").value = coadmin.branch;
    document.getElementById("addCoadminModal").querySelector(".btn-primary").textContent = "Update Co-admin";

    // Set up a handler to update the co-admin
    document.getElementById("addCoadminForm").addEventListener("submit", function (e) {
        e.preventDefault();
        coadmin.name = document.getElementById("coadminName").value;
        coadmin.branch = document.getElementById("coadminBranch").value;
        renderCoadmins();
        document.getElementById("addCoadminModal").querySelector(".btn-close").click();
        this.reset();
    }, { once: true });
}

// Function to edit a Student (in case you want to implement this)
function editStudent(index) {
    const student = students[index];
    document.getElementById("studentName").value = student.name;
    document.getElementById("studentBranch").value = student.branch;
    document.getElementById("addStudentModal").querySelector(".btn-primary").textContent = "Update Student";

    // Set up a handler to update the student
    document.getElementById("addStudentForm").addEventListener("submit", function (e) {
        e.preventDefault();
        student.name = document.getElementById("studentName").value;
        student.branch = document.getElementById("studentBranch").value;
        renderStudents();
        document.getElementById("addStudentModal").querySelector(".btn-close").click();
        this.reset();
    }, { once: true });
}

// Function to delete a Co-admin
function deleteCoadmin(index) {
    if (confirm("Are you sure you want to delete this co-admin?")) {
        coAdmins.splice(index, 1);
        renderCoadmins();
    }
}

// Function to delete a Student
function deleteStudent(index) {
    if (confirm("Are you sure you want to delete this student?")) {
        students.splice(index, 1);
        renderStudents();
    }
}

// Initial render
renderCoadmins();
renderStudents();
