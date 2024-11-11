// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)
app.use(bodyParser.json()); // Parse incoming JSON requests

const usersFilePath = path.join(__dirname, 'users.json');

// Function to read the users file
const readUsersFromFile = () => {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading users file:", error);
    return [];
  }
};

// Function to write to the users file
const writeUsersToFile = (users) => {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error("Error writing to users file:", error);
  }
};

// Endpoint for user sign-in (basic authentication)
app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  // Read users from the JSON file
  const users = readUsersFromFile();

  // Find the user with the matching email and password
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.status(200).json({ message: 'Sign-in successful', user: user });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

// Endpoint to serve tab content
const content = {
  events: "These are the upcoming events related to waste management and recycling.",
  community: "Community engagement activities include clean-ups, workshops, and more!",
  impact: "We have made significant achievements in recycling efforts and waste reduction.",
};

app.get('/content/:tab', (req, res) => {
  const tab = req.params.tab;
  if (content[tab]) {
    res.json({ content: content[tab] });
  } else {
    res.status(404).json({ message: 'Content not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
