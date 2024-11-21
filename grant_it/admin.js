document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logoutBtn');
    const addCoAdminBtn = document.getElementById('addCoAdminBtn');
    const addStudentBtn = document.getElementById('addStudentBtn');
    const coAdminTable = document.getElementById('coAdminTable').getElementsByTagName('tbody')[0];
    const studentTable = document.getElementById('studentTable').getElementsByTagName('tbody')[0];

    // Dummy data (replace with actual data fetching)
    const coAdmins = [
        { id: 1, name: 'Jane Smith', username: 'jsmith', branch: 'Computer Science' },
        { id: 2, name: 'Mike Johnson', username: 'mjohnson', branch: 'Electrical Engineering' }
    ];

    const students = [
        { id: 1, name: 'Alice Brown', username: 'abrown', branch: 'Computer Science' },
        { id: 2, name: 'Bob Wilson', username: 'bwilson', branch: 'Electrical Engineering' }
    ];

    function populateTable(table, data) {
        table.innerHTML = '';
        data.forEach(item => {
            const row = table.insertRow();
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.username}</td>
                <td>${item.branch}</td>
                <td>
                    <button class="btn btn-sm btn-warning edit-btn">Edit</button>
                    <button class="btn btn-sm btn-danger delete-btn">Delete</button>
                </td>
            `;
        });
    }

    populateTable(coAdminTable, coAdmins);
    populateTable(studentTable, students);

    logoutBtn.addEventListener('click', function() {
        // Implement logout functionality
        alert('Logout clicked');
    });

    addCoAdminBtn.addEventListener('click', function() {
        // Implement add co-admin functionality
        alert('Add Co-admin clicked');
    });

    addStudentBtn.addEventListener('click', function() {
        // Implement add student functionality
        alert('Add Student clicked');
    });

    // Event delegation for edit and delete buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('edit-btn')) {
            // Implement edit functionality
            alert('Edit clicked');
        } else if (e.target.classList.contains('delete-btn')) {
            // Implement delete functionality
            alert('Delete clicked');
        }
    });
});