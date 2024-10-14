// Sample HOD data
let hods = [];

// Function to display HODs
function displayHODs() {
    const hodList = document.getElementById('hodList');
    hodList.innerHTML = ''; // Clear the list first

    hods.forEach((hod, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.textContent = `${hod.name} (${hod.branch})`;
        
        // Create Delete button
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteHOD(index);

        // Create Edit button
        const editButton = document.createElement('button');
        editButton.className = 'btn btn-info btn-sm ml-2';
        editButton.textContent = 'Edit';
        editButton.onclick = () => editHOD(hod, index);

        li.appendChild(deleteButton);
        li.appendChild(editButton);
        hodList.appendChild(li);
    });

    // Update the total HOD count
    document.getElementById('totalHODs').textContent = hods.length;
}

// Function to delete an HOD
function deleteHOD(index) {
    hods.splice(index, 1); // Remove HOD from the array
    displayHODs(); // Refresh the display
}

// Function to edit an HOD
function editHOD(hod, index) {
    alert(`Editing ${hod.name} from ${hod.branch}`);
}

// Event listener for the show HODs button
document.getElementById('showHODsButton').addEventListener('click', function() {
    const coadminBox = document.getElementById('coadminBox');
    coadminBox.style.display = 'block'; // Show the box
    displayHODs(); // Display the HODs
});

// Event listener for adding a new Co-admin
document.getElementById('addCoAdminForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('coAdminName').value;
    const branch = document.getElementById('branchSelect').value;

    if (name && branch) {
        hods.push({ name: name, branch: branch }); // Add new HOD to the array
        displayHODs(); // Refresh the display
        $('#addCoAdminModal').modal('hide'); // Hide the modal
        document.getElementById('addCoAdminForm').reset(); // Reset form
    }
});
