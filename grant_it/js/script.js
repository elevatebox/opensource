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

function sendRequest() {
    alert("Request sent successfully");
}

function cancelRequest() {
    alert("Cancelled");
}