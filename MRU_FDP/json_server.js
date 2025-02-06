const express = require("express"); // Import Express framework
const bodyParser = require("body-parser"); // Middleware for parsing JSON request bodies
const cors = require("cors"); // Middleware to handle Cross-Origin Resource Sharing
const fs = require("fs"); // File system module for reading/writing files
const path = require("path"); // Module to work with file paths

const app = express(); // Initialize Express app
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(cors()); // Enable CORS for cross-origin requests

// File paths for JSON databases
const appointmentsFilePath = path.join(__dirname, "appointments.json");
const availabilityFilePath = path.join(__dirname, "availability.json");

// Helper function to read JSON files
const readJsonFile = (filePath) => {
  // Check if the file exists; return an empty array if not
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const data = fs.readFileSync(filePath); // Read file synchronously
  return JSON.parse(data); // Parse JSON content and return it
};

// Helper function to write data to JSON files
const writeJsonFile = (filePath, data) => {
  // Write data to file, formatted with 2 spaces for readability
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Routes

// 1. Fetch all appointments
app.get("/appointments", (req, res) => {
  const appointments = readJsonFile(appointmentsFilePath); // Read appointments from file
  res.json(appointments); // Send the appointments as JSON response
});

// 2. Fetch appointments for a specific day
app.get("/appointments/day/:date", (req, res) => {
  const { date } = req.params; // Extract date from URL parameters
  const appointments = readJsonFile(appointmentsFilePath);
  // Filter appointments by the specified date
  const filteredAppointments = appointments.filter(
    (appointment) => appointment.date === date
  );
  res.json(filteredAppointments); // Send filtered appointments
});

// 3. Add or update available time slots for a specific date
app.post("/availability", (req, res) => {
  const { date, slots } = req.body; // Extract date and slots from request body
  const availability = readJsonFile(availabilityFilePath);

  // Check if availability for the date already exists and update it
  const existingAvailability = availability.find((a) => a.date === date);
  if (existingAvailability) {
    existingAvailability.slots = slots; // Update slots for the date
  } else {
    availability.push({ date, slots }); // Add new availability
  }

  writeJsonFile(availabilityFilePath, availability); // Save changes to file
  res.json({ message: "Availability added!" }); // Send success message
});

// 4. Book a new appointment
app.post("/book", (req, res) => {
  const { name, reason, time, date } = req.body; // Extract appointment details from request body
  const appointments = readJsonFile(appointmentsFilePath);

  // Create a new appointment and add it to the list
  appointments.push({
    id: Date.now(), // Unique ID for the appointment
    name,
    reason,
    time,
    date,
    status: "upcoming", // Default status
  });
  writeJsonFile(appointmentsFilePath, appointments); // Save changes to file
  res.json({ message: "Appointment booked!" }); // Send success message
});

// 5. Get available slots for a specific date
app.get("/availability/:date", (req, res) => {
  const { date } = req.params; // Extract date from URL parameters
  const availability = readJsonFile(availabilityFilePath);
  // Find available slots for the date
  const availableSlots = availability.find((a) => a.date === date);
  res.json(availableSlots || { slots: [] }); // Send available slots or an empty array
});

// 6. Cancel an appointment
app.delete("/appointments/:id", (req, res) => {
  const { id } = req.params; // Extract appointment ID from URL parameters
  let appointments = readJsonFile(appointmentsFilePath);
  // Remove the appointment with the specified ID
  appointments = appointments.filter((appointment) => appointment.id !== parseInt(id));
  writeJsonFile(appointmentsFilePath, appointments); // Save changes to file
  res.json({ message: "Appointment canceled!" }); // Send success message
});

// 7. Reschedule an existing appointment
app.put("/appointments/:id", (req, res) => {
  const { id } = req.params; // Extract appointment ID from URL parameters
  const { time, date } = req.body; // Extract new time and date from request body
  const appointments = readJsonFile(appointmentsFilePath);

  // Find the appointment and update its details
  const appointment = appointments.find((appointment) => appointment.id === parseInt(id));
  if (appointment) {
    appointment.time = time;
    appointment.date = date;
    writeJsonFile(appointmentsFilePath, appointments); // Save changes to file
    res.json({ message: "Appointment rescheduled!" }); // Send success message
  } else {
    res.status(404).json({ message: "Appointment not found!" }); // Send error if not found
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  // Ensure the JSON files exist, creating empty ones if necessary
  if (!fs.existsSync(appointmentsFilePath)) writeJsonFile(appointmentsFilePath, []);
  if (!fs.existsSync(availabilityFilePath)) writeJsonFile(availabilityFilePath, []);
  console.log(`Server running on port ${PORT}`); // Log server start message
});
