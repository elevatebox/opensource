// // Install necessary dependencies: express, body-parser, cors, fs
// // Run `npm install express body-parser cors` to install the packages

// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const fs = require("fs");
// const path = require("path");

// const app = express();
// const PORT = 3000;

// // Path to the data file
// const dataFilePath = path.join(__dirname, "data.json");

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Utility function to read data from the JSON file
// const readData = () => {
//   try {
//     const data = fs.readFileSync(dataFilePath, "utf-8");
//     return JSON.parse(data);
//   } catch (err) {
//     console.error("Error reading data file:", err);
//     return [];
//   }
// };

// // Utility function to write data to the JSON file
// const writeData = (data) => {
//   try {
//     fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
//   } catch (err) {
//     console.error("Error writing to data file:", err);
//   }
// };

// // Route for login
// app.post("/login", (req, res) => {
//   const { username, password, email_or_phone } = req.body;

//   const users = readData();

//   // Validate user credentials
//   const user = users.find(
//     (u) =>
//       u.username === username &&
//       u.password === password &&
//       (u.email === email_or_phone || u.phone === email_or_phone)
//   );

//   if (user) {
//     res.status(200).json({
//       message: "Login successful!",
//       redirectTo: "home.html",
//     });
//   } else {
//     res.status(401).json({
//       message: "Invalid username, password, or Gmail/Phone number.",
//     });
//   }
// });

// // Route for signup
// app.post("/signup", (req, res) => {
//   const { username, password, email, phone } = req.body;

//   const users = readData();

//   // Check if user already exists
//   const userExists = users.some(
//     (u) => u.username === username || u.email === email || u.phone === phone
//   );

//   if (userExists) {
//     res.status(409).json({ message: "User already exists." });
//   } else {
//     // Add new user to the database
//     users.push({ username, password, email, phone });
//     writeData(users);

//     res.status(201).json({
//       message: "Signup successful! Please log in.",
//       redirectTo: "login.html",
//     });
//   }
// });

// // Route for handling forgot password
// app.post("/forgot-password", (req, res) => {
//   const { email_or_phone } = req.body;

//   const users = readData();

//   const user = users.find(
//     (u) => u.email === email_or_phone || u.phone === email_or_phone
//   );

//   if (user) {
//     res.status(200).json({
//       message: "Password reset instructions sent to your email/phone.",
//     });
//   } else {
//     res.status(404).json({ message: "User not found." });
//   }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
