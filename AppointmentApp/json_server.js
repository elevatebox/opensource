const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// File paths for JSON databases
const appointmentsFilePath = path.join(__dirname, "appointments.json");
const availabilityFilePath = path.join(__dirname, "availability.json");

// Helper function to read JSON files
const readJsonFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    return []; // Return an empty array if file doesn't exist
  }
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

// Helper function to write JSON files
const writeJsonFile = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Routes

// 1. Get all appointments
app.get("/appointments", (req, res) => {
  const appointments = readJsonFile(appointmentsFilePath);
  res.json(appointments);
});

// 2. Get appointments for a particular day
app.get("/appointments/day/:date", (req, res) => {
  const { date } = req.params;
  const appointments = readJsonFile(appointmentsFilePath);
  const filteredAppointments = appointments.filter(
    (appointment) => appointment.date === date
  );
  res.json(filteredAppointments);
});

// 3. Add available time slots
app.post("/availability", (req, res) => {
  const { date, slots } = req.body;
  const availability = readJsonFile(availabilityFilePath);

  // Update availability if it already exists for the date
  const existingAvailability = availability.find((a) => a.date === date);
  if (existingAvailability) {
    existingAvailability.slots = slots;
  } else {
    availability.push({ date, slots });
  }

  writeJsonFile(availabilityFilePath, availability);
  res.json({ message: "Availability added!" });
});

// 4. Book an appointment
app.post("/book", (req, res) => {
  const { name, reason, time, date } = req.body;
  const appointments = readJsonFile(appointmentsFilePath);

  appointments.push({ id: Date.now(), name, reason, time, date, status: "upcoming" });
  writeJsonFile(appointmentsFilePath, appointments);
  res.json({ message: "Appointment booked!" });
});

// 5. Get available slots for a date
app.get("/availability/:date", (req, res) => {
  const { date } = req.params;
  const availability = readJsonFile(availabilityFilePath);
  const availableSlots = availability.find((a) => a.date === date);
  res.json(availableSlots || { slots: [] });
});

// 6. Cancel an appointment
app.delete("/appointments/:id", (req, res) => {
  const { id } = req.params;
  let appointments = readJsonFile(appointmentsFilePath);
  appointments = appointments.filter((appointment) => appointment.id !== parseInt(id));

  writeJsonFile(appointmentsFilePath, appointments);
  res.json({ message: "Appointment canceled!" });
});

// 7. Reschedule an appointment
app.put("/appointments/:id", (req, res) => {
  const { id } = req.params;
  const { time, date } = req.body;
  const appointments = readJsonFile(appointmentsFilePath);

  const appointment = appointments.find((appointment) => appointment.id === parseInt(id));
  if (appointment) {
    appointment.time = time;
    appointment.date = date;
    writeJsonFile(appointmentsFilePath, appointments);
    res.json({ message: "Appointment rescheduled!" });
  } else {
    res.status(404).json({ message: "Appointment not found!" });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  // Ensure the JSON files exist
  if (!fs.existsSync(appointmentsFilePath)) writeJsonFile(appointmentsFilePath, []);
  if (!fs.existsSync(availabilityFilePath)) writeJsonFile(availabilityFilePath, []);
  console.log(`Server running on port ${PORT}`);
});
