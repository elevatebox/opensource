const baseUrl = "http://localhost:5000";

// Fetch all appointments
async function fetchAppointments() {
  const res = await fetch(`${baseUrl}/appointments`);
  const appointments = await res.json();
  const view = document.getElementById("appointments-view");
  view.innerHTML = appointments
    .map((appt) => `
      <div class="${appt.status}">
        <p>${appt.name} - ${appt.reason}</p>
        <p>${appt.time} on ${appt.date}</p>
      </div>`)
    .join("");
}

// Fetch available slots for a date
async function fetchSlots() {
  const date = document.getElementById("date-picker").value;
  const res = await fetch(`${baseUrl}/availability/${date}`);
  const { slots } = await res.json();
  const view = document.getElementById("slots-view");
  view.innerHTML = slots
    .map((slot) => `<p>${slot}</p>`)
    .join("");
}

// Book an appointment
async function bookAppointment(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const reason = document.getElementById("reason").value;
  const time = document.getElementById("time").value;
  const date = document.getElementById("date-picker").value;
  
  const res = await fetch(`${baseUrl}/book`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, reason, time, date }),
  });
  const result = await res.json();
  alert(result.message);
  fetchAppointments();
}

document.addEventListener("DOMContentLoaded", fetchAppointments);
