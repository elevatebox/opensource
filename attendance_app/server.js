const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;
const dataFile = path.join(__dirname, "students.json");

app.use(express.json());
app.use(cors());

function readData() {
  if (!fs.existsSync(dataFile)) return [];
  return JSON.parse(fs.readFileSync(dataFile));
}

function writeData(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

app.get("/students", (req, res) => {
  res.json(readData());
});

// app.post("/students", (req, res) => {
//   const students = readData();
//   const newStudent = { id: Date.now(), ...req.body };
//   students.push(newStudent);
//   writeData(students);
//   res.status(201).json(newStudent);
// });

//Update the POST /students route to always include the attendance field with a default value of 1 (Present).
app.post("/students", (req, res) => {
  const students = readData();
  const newStudent = { id: Date.now(), ...req.body, attendance: req.body.attendance ?? 1 };
  students.push(newStudent);
  writeData(students);
  res.status(201).json(newStudent);
});


app.put("/students/:id", (req, res) => {
  const students = readData();
  const index = students.findIndex(s => s.id == req.params.id);
  if (index === -1) return res.status(404).send("Student not found");

  students[index] = { ...students[index], ...req.body };
  writeData(students);
  res.json(students[index]);
});

app.delete("/students/:id", (req, res) => {
  const students = readData();
  const updatedStudents = students.filter(s => s.id != req.params.id);
  writeData(updatedStudents);
  res.status(204).send();
});


app.get("/download", (req, res) => {
  const students = readData();
  const csvData = "Roll Number,Name,Attendance\n" + students.map(s => `${s.rollNumber},${s.name},${s.attendance}`).join("\n");
  const filePath = path.join(__dirname, `attendance_${Date.now()}.csv`);

  fs.writeFileSync(filePath, csvData);

  try {
    res.download(filePath, err => {
      if (err) console.error(err);
    });
  } finally {
    setTimeout(() => {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath); // Cleanup
    }, 5000); // Delay deletion for safety
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
