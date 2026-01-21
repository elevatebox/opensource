const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose")

const app = express();
const PORT = 3000;
// const dataFile = path.join(__dirname, "students.json");

mongoose.connect("mongodb://localhost:27017/attendance", { useNewUrlParser: true, useUnifiedTopology: true})
console.log("Connected to MongoDB");
app.use(express.json());
app.use(cors());

function readData() {
//   if (!fs.existsSync(dataFile)) return [];
//   return JSON.parse(fs.readFileSync(dataFile));
    // mongodb read
    return mongoose.connection.collection("students").find({}).toArray([]);
}

function writeData(data) {
//   fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
    // mongodb write
    mongoose.connection.collection("students").insertMany(data);

}

app.get("/students", (req, res) => {
  res.json(readData());
});

app.post("/students", async (req, res) => {
  const newStudent = { id: Date.now(), ...req.body };

  delete newStudent._id;

  await mongoose.connection.collection("students").insertOne(newStudent); // ✅ Avoids duplicate key error

  res.status(201).json(newStudent);
  
});

app.put("/students/:id", async(req, res) => {
  const studentId = req.params.id;
  const updatedStudent = { ...req.body };
  mongoose.connection.collection("students").findOneAndUpdate( 

    { _id: new ObjectId(studentId) }, // Find by MongoDB _id
    { $set: updatedStudent }, // Update only the fields provided
    { returnDocument: "after" } // Return updated document

  );
  res.json(updatedStudent);

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
  res.download(filePath, err => {
    if (err) console.error(err);
    fs.unlinkSync(filePath); // Delete the file after sending
    //mongo delete
    mongoose.connection.collection("students").deleteMany({});
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
