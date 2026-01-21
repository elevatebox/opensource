const express = require("express"); // Import the Express framework
const fs = require("fs"); // Import the Node.js file system module(for writing and reading the files)
const path = require("path"); // Import the Node.js path module for handling file paths
const cors = require("cors"); // Import the CORS middleware to enable cross-origin requests

const app = express(); // Create an instance of the Express application
const PORT = 3000; // Define the port number for the server to listen on
const dataFile = path.join(__dirname, "students.json"); // Define the path to the JSON file storing student data

app.use(express.json()); // Middleware to parse incoming JSON requests
app.use(cors()); // Enable CORS for all routes

// Function to read student data from the JSON file
function readData() {
  if (!fs.existsSync(dataFile)) return []; // Check if the file exists; if not, return an empty array
  return JSON.parse(fs.readFileSync(dataFile)); // Read and parse the JSON file, then return the data
}

// Function to write student data to the JSON file
function writeData(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2)); // Convert data to JSON format and write to the file
}

// Route to get all students
app.get("/students", (req, res) => {
  res.json(readData()); // Respond with the student data in JSON format
});

// Route to add a new student
app.post("/students", (req, res) => {
  const students = readData(); // Read existing student data
  const newStudent = { id: Date.now(), ...req.body }; // Create a new student object with a unique ID and request body data
  students.push(newStudent); // Add the new student to the array
  writeData(students); // Save the updated student data to the file
  res.status(201).json(newStudent); // Respond with the newly created student and a 201 status code
});

// Route to update an existing student by ID
app.put("/students/:id", (req, res) => {
  const students = readData(); // Read existing student data
  const index = students.findIndex(s => s.id == req.params.id); // Find the index of the student with the given ID
  if (index === -1) return res.status(404).send("Student not found"); // If student not found, return a 404 error

  students[index] = { ...students[index], ...req.body }; // Update the student data with the request body
  writeData(students); // Save the updated student data to the file
  res.json(students[index]); // Respond with the updated student data
});

// Route to delete a student by ID
app.delete("/students/:id", (req, res) => {
  const students = readData(); // Read existing student data
  const updatedStudents = students.filter(s => s.id != req.params.id); // Filter out the student with the given ID
  writeData(updatedStudents); // Save the updated student data to the file
  res.status(204).send(); // Respond with a 204 status code (no content)
});

// Route to download student attendance data as a CSV file
app.get("/download", (req, res) => {
  const students = readData(); // Read existing student data
  const csvData = "Roll Number,Name,Attendance\n" + students.map(s => `${s.rollNumber},${s.name},${s.attendance}`).join("\n"); // Convert student data to CSV format

  const filePath = path.join(__dirname, `attendance_${Date.now()}.csv`); // Define the path for the temporary CSV file
  fs.writeFileSync(filePath, csvData); // Write the CSV data to the file
  res.download(filePath, err => { // Send the file as a download to the client
    if (err) console.error(err); // Log any errors that occur during the download
    fs.unlinkSync(filePath); // Delete the file after sending it
  });
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`); // Log a message when the server starts
});