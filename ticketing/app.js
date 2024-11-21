document.addEventListener('DOMContentLoaded', function () {
    // Event handler for the ticket registration form submission
    const ticketForm = document.getElementById('ticket-form');
    ticketForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const eventId = document.getElementById('event').value;
        const attendeeName = document.getElementById('attendee-name').value;
        const ticketQuantity = document.getElementById('ticket-quantity').value;

        // Confirm ticket registration (In a real scenario, you would send this data to a backend)
        alert(`Ticket registered successfully for ${attendeeName}. Quantity: ${ticketQuantity}`);
        
        // Update venue details dynamically
        updateVenueDetails(eventId);
    });

    // Fetch events and dynamically populate them on the page
    const events = [
        {
            id: 1,
            name: "Tech Conference 2024",
            date: "June 20, 2024",
            location: "Convention Center, Downtown City",
            capacity: "500 People",
            availableSeats: "450",
        },
        {
            id: 2,
            name: "Music Festival 2024",
            date: "July 10, 2024",
            location: "City Park",
            capacity: "2000 People",
            availableSeats: "1800",
        },
        {
            id: 3,
            name: "Art Expo 2024",
            date: "August 15, 2024",
            location: "Art Gallery",
            capacity: "1000 People",
            availableSeats: "900",
        },
    ];

    // Dynamically populate event cards
    const eventsContainer = document.getElementById('events');
    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.classList.add('event-card');
        eventCard.innerHTML = `
            <h3>${event.name}</h3>
            <p>Date: ${event.date}</p>
            <p>Location: ${event.location}</p>
            <p>Capacity: ${event.capacity}</p>
            <button onclick="selectEvent(${event.id})" class="btn-secondary">Select</button>
        `;
        eventsContainer.appendChild(eventCard);
    });

    // Update venue details dynamically when event is selected
    function selectEvent(eventId) {
        updateVenueDetails(eventId);
    }

    function updateVenueDetails(eventId) {
        const event = events.find(e => e.id === eventId);
        if (event) {
            document.getElementById('venue-name').textContent = `Venue Name: ${event.location.split(",")[0]}`;
            document.getElementById('venue-location').textContent = `Location: ${event.location}`;
            document.getElementById('venue-capacity').textContent = `Capacity: ${event.capacity}`;
        }
    }
});
