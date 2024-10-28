document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const role = document.getElementById('role').value;
    if (role === 'admin') {
        window.location.href = 'admin.html';
    } else if (role === 'coadmin') {
        window.location.href = 'coadmin.html';
    } else if (role === 'student') {
        window.location.href = 'student.html';
    }
});

function openTab(tabName) {
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = 'none';
    }
    document.getElementById(tabName).style.display = 'block';
}

function submitRequest() {
    const details = document.getElementById('studentRequest').value;
    const studentIndex = k;
    
    if (details) {
        requests.push({ studentIndex, details, status: 'Pending' });
        localStorage.setItem('requests', JSON.stringify(requests));
        document.getElementById('studentRequest').value = '';
        renderRequestList();
        renderRequestHistory();
    } else {
        alert('Please enter request details.');
    }
}
function submitRequest() {
    // Logic for submitting the request
    const notification = document.getElementById('notification');
    notification.innerText = "Request sent successfully";
    notification.style.display = "block"; // Show the notification

    setTimeout(() => {
        notification.style.display = "none"; // Hide after 2 seconds
    }, 2000);
}
function updateStudent() {
    // Logic for updating student details
    const notification = document.getElementById('notification');
    notification.innerText = "Student details updated successfully";
    notification.style.display = "block"; // Show the notification

    setTimeout(() => {
        notification.style.display = "none"; // Hide after 2 seconds
    }, 2000);
}

function submitRequest() {
    const subjectLine = document.getElementById('subjectLine').value;
    const requestDetails = document.getElementById('studentRequest').value;

    // Find the student based on the username
    const username = document.getElementById('studentUsername').value; // Assuming username is used to identify students
    const student = students.find(s => s.username === username);

    if (student) {
        // Save the request
        student.requests.push({ subjectLine, details: requestDetails });
        
        // Notify co-admin
        notifyCoAdmin({ username: student.username, subjectLine, requestDetails });

        const notification = document.getElementById('notification');
        notification.innerText = "Request sent successfully!";
        notification.style.display = "block";
        setTimeout(() => {
            notification.style.display = "none";
        }, 2000);
    }
}