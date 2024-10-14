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
