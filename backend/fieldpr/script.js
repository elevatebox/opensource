// Wait until the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-link'); // Get all the tab links
    const tabSections = document.querySelectorAll('.tab-section'); // Get all the tab sections

    // Function to activate the correct tab and display the corresponding section
    function showTabContent(tabId) {
        // Hide all sections
        tabSections.forEach(section => {
            section.classList.remove('active');
        });

        // Show the selected section
        const activeTab = document.querySelector(`#${tabId}`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
    }

    // Add click event listeners to each tab
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab'); // Get the ID of the tab
            showTabContent(tabId); // Show the corresponding section
        });
    });

    // Optionally, you can set the default tab to show on page load
    showTabContent('sign-in'); // Default to showing the Sign In tab
});
