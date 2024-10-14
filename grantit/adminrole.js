const coAdminRequests = [
    { username: "coadmin1", request: "Need access to student data", status: "Pending" },
    { username: "coadmin2", request: "Request for extra permissions", status: "Pending" }
];

const studentRequests = [
    { username: "student1", request: "Request for leave", status: "Pending" },
    { username: "student2", request: "Need to discuss project issue", status: "Pending" }
];

// Function to render Co-admin requests
function renderCoAdminRequests() {
    const coAdminRequestsList = document.getElementById('co-admin-requests-list');
    coAdminRequestsList.innerHTML = ''; // Clear existing entries
    coAdminRequests.forEach((request, index) => {
        coAdminRequestsList.innerHTML += `
            <tr>
                <td>${request.username}</td>
                <td>${request.request}</td>
                <td>${request.status}</td>
                <td>
                    <button class="btn btn-success" onclick="approveCoAdminRequest(${index})">Approve</button>
                    <button class="btn btn-danger" onclick="rejectCoAdminRequest(${index})">Reject</button>
                </td>
            </tr>
        `;
    });
}

// Function to render Student requests
function renderStudentRequests() {
    const studentRequestsList = document.getElementById('student-requests-list');
    studentRequestsList.innerHTML = ''; // Clear existing entries
    studentRequests.forEach((request, index) => {
        studentRequestsList.innerHTML += `
            <tr>
                <td>${request.username}</td>
                <td>${request.request}</td>
                <td>${request.status}</td>
                <td>
                    <button class="btn btn-success" onclick="approveStudentRequest(${index})">Approve</button>
                    <button class="btn btn-danger" onclick="rejectStudentRequest(${index})">Reject</button>
                </td>
            </tr>
        `;
    });
}

// Approve Co-admin Request
function approveCoAdminRequest(index) {
    coAdminRequests[index].status = "Approved";
    renderCoAdminRequests();
}

// Reject Co-admin Request
function rejectCoAdminRequest(index) {
    coAdminRequests[index].status = "Rejected";
    renderCoAdminRequests();
}

// Approve Student Request
function approveStudentRequest(index) {
    studentRequests[index].status = "Approved";
    renderStudentRequests();
}

// Reject Student Request
function rejectStudentRequest(index) {
    studentRequests[index].status = "Rejected";
    renderStudentRequests();
}

// Initial render of the requests when the page loads
renderCoAdminRequests();
renderStudentRequests();
