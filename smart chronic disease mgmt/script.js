// Function to show the specific page based on navigation
function showPage(pageId) {
    // Hide all sections
    let sections = document.querySelectorAll('.page-content');
    sections.forEach(function(section) {
        section.classList.remove('active');
    });

    // Show the selected section
    document.getElementById(pageId).classList.add('active');
}

// Update the Care Plan with the entered health goal
function updateCarePlan() {
    const healthGoal = document.getElementById('health-goal').value;
    if (healthGoal) {
        alert('Care Plan Updated with Goal: ' + healthGoal);
    } else {
        alert('Please enter a health goal!');
    }
}

// Start a virtual telehealth consultation (placeholder)
function startConsultation() {
    alert('Starting telehealth consultation...');
}

// Default page to show the dashboard
window.onload = function() {
    showPage('dashboard');
};
