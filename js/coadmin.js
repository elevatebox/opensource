document.addEventListener('DOMContentLoaded', () => {
    fetch('../data/users.json')
      .then(response => response.json())
      .then(data => {
        const coadminBranch = data.current_coadmin.branch;
        document.getElementById('assignedBranch').innerText = coadminBranch;
  
        populateStudentManagement(data.students);
        populateRequestManagement(data.requests);
      })
      .catch(err => console.log(err));
  
    function populateStudentManagement(students) {
      const studentTable = document.getElementById('studentTable');
      students.forEach(student => {
        if (student.branch === coadminBranch) {
          const row = `<tr>
            <td>${student.username}</td>
            <td>
              <button class="btn btn-warning">Edit</button>
              <button class="btn btn-danger">Delete</button>
            </td>
          </tr>`;
          studentTable.innerHTML += row;
        }
      });
    }
  
    function populateRequestManagement(requests) {
      const requestTable = document.getElementById('requestTable');
      requests.forEach(request => {
        if (request.branch === coadminBranch) {
          const row = `<tr>
            <td>${request.student}</td>
            <td>${request.subject}</td>
            <td>${request.status}</td>
            <td>
              <button class="btn btn-success">Approve</button>
              <button class="btn btn-danger">Reject</button>
            </td>
          </tr>`;
          requestTable.innerHTML += row;
        }
      });
    }
  });
  