const apiUrl = 'http://localhost:3000/api/students'; // Adjust your API URL if necessary

// Function to fetch students and display them in the table
function fetchStudents() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(students => {
            const studentTableBody = document.getElementById('student-table-body');
            studentTableBody.innerHTML = ''; // Clear previous entries

            students.forEach(student => {
                const formattedName = formatName(student.name);
                const row = `
                    <tr>
                        <td>${student.rollNumber.toUpperCase()}</td>
                        <td>${formattedName}</td>
                        <td>
                            <input type="checkbox" class="checkbox" ${student.present ? 'checked' : ''} onchange="updateAttendance('${student.rollNumber}', this)">
                        </td>
                    </tr>
                `;
                studentTableBody.innerHTML += row;
            });
        })
        .catch(error => console.error('Error fetching students:', error));
}

// Function to format names to have first letter uppercase
function formatName(name) {
    return name.split(' ').map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()).join(' ');
}

// Function to handle student creation
document.getElementById('create-student-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const rollNumber = document.getElementById('roll-number').value;
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;

    const newStudent = {
        rollNumber: rollNumber,
        name: `${firstName} ${lastName}`,
        present: false // Default present status
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newStudent)
    })
    .then(response => response.json())
    .then(data => {
        $('#createStudentModal').modal('hide'); // Close modal
        fetchStudents(); // Refresh student list
    })
    .catch(error => console.error('Error adding student:', error));
});

// Function to update attendance
function updateAttendance(rollNumber, checkbox) {
    const updatedStatus = { present: checkbox.checked };

    fetch(`${apiUrl}/${rollNumber}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedStatus)
    })
    .then(response => response.json())
    .then(data => {
        fetchStudents(); // Refresh student list
    })
    .catch(error => console.error('Error updating attendance:', error));
}

// Initial fetch of students on page load
document.addEventListener('DOMContentLoaded', fetchStudents);
