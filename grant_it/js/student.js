document.addEventListener('DOMContentLoaded', () => {
    const requestForm = document.querySelector('form');
  
    requestForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const subject = document.getElementById('subject').value;
      const details = document.getElementById('details').value;
  
      // Mock request submission (using localStorage or dummy backend)
      alert('Request sent successfully!');
  
      // Clear the form
      requestForm.reset();
    });
  
    // Populate request history
    fetch('../data/requests.json')
      .then(response => response.json())
      .then(data => {
        populateRequestHistory(data);
      })
      .catch(err => console.log(err));
  
    function populateRequestHistory(requests) {
      const historyTable = document.getElementById('historyTable');
      requests.forEach(request => {
        const row = `<tr>
          <td>${request.subject}</td>
          <td>${request.status}</td>
        </tr>`;
        historyTable.innerHTML += row;
      });
    }
  });
  