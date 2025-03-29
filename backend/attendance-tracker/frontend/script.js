document.addEventListener("DOMContentLoaded", () => {
    displayCurrentDate();
    loadStudents();
    initializeDatePicker();
    document.getElementById("themeToggle").addEventListener("click", toggleTheme);
});

function displayCurrentDate() {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    document.getElementById("dateDayDisplay").innerText = formattedDate;
}

function loadStudents() {
    showLoadingIndicator(true);
    fetch('http://localhost:3000/students')
        .then(response => response.json())
        .then(students => {
            renderStudentTable(students);
            showLoadingIndicator(false);
        })
        .catch(error => {
            console.error('Error loading students:', error);
            showLoadingIndicator(false);
        });
}

function renderStudentTable(students) {
    const tableBody = document.getElementById("studentTableBody");
    tableBody.innerHTML = "";

    students.forEach(student => {
        const row = document.createElement("tr");

        const rollCell = document.createElement("td");
        rollCell.textContent = student.rollNumber.toUpperCase();
        row.appendChild(rollCell);

        const nameCell = document.createElement("td");
        nameCell.textContent = `${capitalize(student.firstName)} ${capitalize(student.lastName)}`;
        row.appendChild(nameCell);

        const checkCell = document.createElement("td");
        checkCell.classList.add("text-center");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("present-checkbox");
        checkbox.checked = student.isPresent || false;
        checkCell.appendChild(checkbox);
        row.appendChild(checkCell);

        tableBody.appendChild(row);
    });
}

function initializeDatePicker() {
    flatpickr("#datePicker", {
        enable: [
            {
                from: "2023-10-02",
                to: new Date().toISOString().split('T')[0],
            }
        ],
        dateFormat: "Y-m-d",
        onChange: function(selectedDates) {
            console.log("Selected date:", selectedDates[0]);
        }
    });
}

function addStudent() {
    const rollNumber = document.getElementById("rollNumber").value.toUpperCase();
    const firstName = capitalize(document.getElementById("firstName").value);
    const lastName = capitalize(document.getElementById("lastName").value);

    const newStudent = { rollNumber, firstName, lastName };

    fetch('http://localhost:3000/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent)
    })
    .then(response => {
        if (response.ok) {
            $('#createStudentModal').modal('hide');
            loadStudents();
        } else {
            console.error('Error adding student');
        }
    })
    .catch(error => {
        console.error('Error adding student:', error);
    });
}

function submitAttendance() {
    const selectedDate = document.getElementById("datePicker").value;
    const attendanceData = [];

    const rows = document.querySelectorAll("#studentTableBody tr");
    rows.forEach(row => {
        const rollNumber = row.cells[0].textContent;
        const name = row.cells[1].textContent;
        const isPresent = row.cells[2].querySelector('input[type="checkbox"]').checked;

        attendanceData.push({
            rollNumber,
            name,
            isPresent: isPresent ? 1 : 0
        });
    });

    const attendancePayload = {
        date: selectedDate,
        attendance: attendanceData
    };

    showLoadingIndicator(true);
    fetch('http://localhost:3000/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attendancePayload)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        showLoadingIndicator(false);
    })
    .catch(error => {
        console.error('Error submitting attendance:', error);
        alert('Error submitting attendance. Please try again.');
        showLoadingIndicator(false);
    });
}

function downloadCSV() {
    window.location.href = 'http://localhost:3000/attendance/download';
}

function showLoadingIndicator(show) {
    const loadingIndicator = document.getElementById("loadingIndicator");
    loadingIndicator.style.display = show ? "block" : "none";
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
