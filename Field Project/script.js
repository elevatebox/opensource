let chart;

// Initialize date picker
flatpickr("#datePicker", {
    onChange: updateDashboard,
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d"
});

function openDatePicker() {
    document.getElementById("datePicker").focus();
}

// Simulate data update for demonstration
async function updateDashboard() {
    const yearlyProfit = 75000;
    const monthlyProfit = 6200;
    const todaysProfit = 500;

    document.getElementById('yearlyProfit').textContent = `Yearly Profit: $${yearlyProfit}`;
    document.getElementById('monthlyProfit').textContent = `Monthly Profit: $${monthlyProfit}`;
    document.getElementById('todaysProfit').textContent = `Today's Profit: $${todaysProfit}`;

    // Update chart
    const ctx = document.getElementById('profitChart').getContext('2d');
    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Morning', 'Afternoon', 'Evening', 'Night'],
            datasets: [{
                label: 'Sales',
                data: [120, 200, 150, 300],
                borderColor: '#4caf50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                fill: true
            }, {
                label: 'Expenditure',
                data: [80, 150, 100, 250],
                borderColor: '#f44336',
                backgroundColor: 'rgba(244, 67, 54, 0.1)',
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });
}

updateDashboard();
