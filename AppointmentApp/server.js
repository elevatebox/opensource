const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/appointments", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Models
const Appointment = mongoose.model("Appointment", {
  name: String,
  reason: String,
  time: String,
  date: String,
  status: { type: String, default: "upcoming" },
});

const Availability = mongoose.model("Availability", {
  date: String,
  slots: [String],
});

// Routes
// 1. Get all appointments
app.get("/appointments", async (req, res) => {
  const appointments = await Appointment.find();
  res.json(appointments);
});

// 2. Get appointments for a particular day
app.get("/appointments/day/:date", async (req, res) => {
  const { date } = req.params;
  const appointments = await Appointment.find({ date });
  res.json(appointments);
});

// 3. Add available time slots
app.post("/availability", async (req, res) => {
  const { date, slots } = req.body;
  const availability = new Availability({ date, slots });
  await availability.save();
  res.json({ message: "Availability added!" });
});

// 4. Book an appointment
app.post("/book", async (req, res) => {
  const { name, reason, time, date } = req.body;
  const appointment = new Appointment({ name, reason, time, date });
  await appointment.save();
  res.json({ message: "Appointment booked!" });
});

// 5. Get available slots for a date
app.get("/availability/:date", async (req, res) => {
  const { date } = req.params;
  const availability = await Availability.findOne({ date });
  res.json(availability || { slots: [] });
});

// 6. Cancel an appointment
app.delete("/appointments/:id", async (req, res) => {
  const { id } = req.params;
  await Appointment.findByIdAndDelete(id);
  res.json({ message: "Appointment canceled!" });
});

// 7. Reschedule an appointment
app.put("/appointments/:id", async (req, res) => {
  const { id } = req.params;
  const { time, date } = req.body;
  await Appointment.findByIdAndUpdate(id, { time, date });
  res.json({ message: "Appointment rescheduled!" });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
