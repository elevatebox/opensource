// Sample data for co-admins and students (for demonstration purposes)
let coAdmins = [
  { id: 1, username: 'coadmin1', branch: 'Computer Science' },
  { id: 2, username: 'coadmin2', branch: 'Mechanical Engineering' }
];

let students = [
  { id: 1, username: 'student1', branch: 'Computer Science', requestStatus: 'Pending' },
  { id: 2, username: 'student2', branch: 'Mechanical Engineering', requestStatus: 'Approved' }
];

// Check if user is logged in
if (!localStorage.getItem('loggedInUser')) {
  alert('You are not logged in! Redirecting to login page.');
  window.location.href = "login.html";
}

// Logout functionality
const logoutButton = document.createElement('button');
logoutButton.innerText = "Logout";
logoutButton.className = "action-button";
logoutButton.onclick = function() {
  localStorage.removeItem('loggedInUser'); // Clear login info
  alert('You have logged out.');
  window.location.href = "login.html"; // Redirect to login page
};

// Append the logout button to the dashboard
document.querySelector('.dashboard-box').appendChild(logoutButton);

// Function to render Co-admins
function renderCoAdmins() {
  const coAdminContainer = document.createElement('div');
  coAdminContainer.innerHTML = "<h3>Co-admins List</h3>";
  coAdmins.forEach(coAdmin => {
      const coAdminDiv = document.createElement('div');
      coAdminDiv.innerText = `${coAdmin.username} - ${coAdmin.branch}`;
      coAdminContainer.appendChild(coAdminDiv);
  });
  document.querySelector('.dashboard-box').appendChild(coAdminContainer);
}

// Function to render Students
function renderStudents() {
  const studentContainer = document.createElement('div');
  studentContainer.innerHTML = "<h3>Students List</h3>";
  students.forEach(student => {
      const studentDiv = document.createElement('div');
      studentDiv.innerText = `${student.username} - ${student.branch} (${student.requestStatus})`;
      studentContainer.appendChild(studentDiv);
  });
  document.querySelector('.dashboard-box').appendChild(studentContainer);
}

// Add Co-admin functionality
document.getElementById("addCoAdmin").onclick = function() {
  const newCoAdmin = prompt("Enter Co-admin username:");
  const newBranch = prompt("Enter Co-admin branch:");
  if (newCoAdmin && newBranch) {
      coAdmins.push({ id: coAdmins.length + 1, username: newCoAdmin, branch: newBranch });
      alert("Co-admin added successfully!");
      renderCoAdmins(); // Refresh the list
  } else {
      alert("Both fields are required!");
  }
};

// Edit Co-admin functionality
document.getElementById("editCoAdmin").onclick = function() {
  const username = prompt("Enter the username of the Co-admin to edit:");
  const coAdmin = coAdmins.find(c => c.username === username);
  if (coAdmin) {
      const newBranch = prompt("Enter new branch:", coAdmin.branch);
      if (newBranch) {
          coAdmin.branch = newBranch;
          alert("Co-admin updated successfully!");
          renderCoAdmins(); // Refresh the list
      } else {
          alert("Branch field is required!");
      }
  } else {
      alert("Co-admin not found!");
  }
};

// Delete Co-admin functionality
document.getElementById("deleteCoAdmin").onclick = function() {
  const username = prompt("Enter the username of the Co-admin to delete:");
  const index = coAdmins.findIndex(c => c.username === username);
  if (index !== -1) {
      coAdmins.splice(index, 1);
      alert("Co-admin deleted successfully!");
      renderCoAdmins(); // Refresh the list
  } else {
      alert("Co-admin not found!");
  }
};

// Add Student functionality
document.getElementById("addStudent").onclick = function() {
  const newStudent = prompt("Enter Student username:");
  const newBranch = prompt("Enter Student branch:");
  if (newStudent && newBranch) {
      students.push({ id: students.length + 1, username: newStudent, branch: newBranch, requestStatus: 'Pending' });
      alert("Student added successfully!");
      renderStudents(); // Refresh the list
  } else {
      alert("Both fields are required!");
  }
};

// Edit Student functionality
document.getElementById("editStudent").onclick = function() {
  const username = prompt("Enter the username of the Student to edit:");
  const student = students.find(s => s.username === username);
  if (student) {
      const newBranch = prompt("Enter new branch:", student.branch);
      if (newBranch) {
          student.branch = newBranch;
          alert("Student updated successfully!");
          renderStudents(); // Refresh the list
      } else {
          alert("Branch field is required!");
      }
  } else {
      alert("Student not found!");
  }
};

// Delete Student functionality
document.getElementById("deleteStudent").onclick = function() {
  const username = prompt("Enter the username of the Student to delete:");
  const index = students.findIndex(s => s.username === username);
  if (index !== -1) {
      students.splice(index, 1);
      alert("Student deleted successfully!");
      renderStudents(); // Refresh the list
  } else {
      alert("Student not found!");
  }
};

// Initial render
renderCoAdmins();
renderStudents();
