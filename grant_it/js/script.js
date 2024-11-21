// Arrays to hold the current co-admins and students
let coadmins = [];
let students = [];

// Function to open the appropriate tab
function openTab(evt, tabName) {
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none"; // Hide all tab contents
    }
    const tablinks = document.getElementsByClassName("tablink");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block"; // Show the current tab
    evt.currentTarget.className += " active"; // Add "active" class to the button that opened the tab
}

// Handle Co-admin addition
document.getElementById('coadmin-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('coadmin-username').value;
    const password = document.getElementById('coadmin-password').value;
    
    coadmins.push({ username, password });
    document.getElementById('coadmin-form').reset();
    displayCoadmins();
});

// Handle Student addition
document.getElementById('student-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('student-username').value;
    const password = document.getElementById('student-password').value;

    students.push({ username, password });
    document.getElementById('student-form').reset();
    displayStudents();
});

// Display Co-admins
function displayCoadmins() {
    const coadminList = document.getElementById('coadmin-list');
    coadminList.innerHTML = '';
    coadmins.forEach((coadmin, index) => {
        const li = document.createElement('li');
        li.textContent = coadmin.username + " ";
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Remove';
        deleteButton.onclick = () => removeCoadmin(index);
        li.appendChild(deleteButton);
        coadminList.appendChild(li);
    });
}

// Display Students
function displayStudents() {
    const studentList = document.getElementById('student-list');
    studentList.innerHTML = '';
    students.forEach((student, index) => {
        const li = document.createElement('li');
        li.textContent = student.username + " ";
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Remove';
        deleteButton.onclick = () => removeStudent(index);
        li.appendChild(deleteButton);
        studentList.appendChild(li);
    });
}

// Remove Co-admin
function removeCoadmin(index) {
    coadmins.splice(index, 1);
    displayCoadmins();
}

// Remove Student
function removeStudent(index) {
    students.splice(index, 1);
    displayStudents();
}

// Initialize the first tab as open
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('.tablink').click(); // Simulate click on the first tab
});
