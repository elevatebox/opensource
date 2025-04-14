// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');
// const bcrypt = require('bcrypt'); // For hashing passwords
// const session = require('express-session');

// const app = express();
// const PORT = 3000;

// // Middleware
// app.use(bodyParser.urlencoded({ extended: true })); // To parse form data
// app.use(express.static(path.join(__dirname, 'public'))); // Serve static files (e.g., styles.css, client-side scripts)

// // Session configuration
// app.use(session({
//   secret: 'smartgrocery_secret_key', // Replace with a strong secret key
//   resave: false,
//   saveUninitialized: true,
// }));

// // In-memory user database (replace with a real database in production)
// const users = [
//   {
//     username: 'testuser',
//     passwordHash: bcrypt.hashSync('password123', 10), // Hashed password
//     email: 'testuser@example.com',
//     phone: '1234567890',
//   },
// ];

// // Routes

// // Home Page
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// // Login Route
// app.post('/login', async (req, res) => {
//   const { username, password, email_or_phone } = req.body;

//   // Find user by username or email/phone
//   const user = users.find(
//     (u) => u.username === username || u.email === email_or_phone || u.phone === email_or_phone
//   );

//   if (!user) {
//     return res.status(400).send('Invalid username or email/phone number.');
//   }

//   // Check password
//   const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
//   if (!isPasswordValid) {
//     return res.status(400).send('Invalid password.');
//   }

//   // Set session and redirect to home page
//   req.session.user = user;
//   res.redirect('/home');
// });

// // Home Page after Login
// app.get('/home', (req, res) => {
//   if (!req.session.user) {
//     return res.redirect('/');
//   }
//   res.send(`<h1>Welcome to Smart Grocery, ${req.session.user.username}!</h1><a href="/logout">Logout</a>`);
// });

// // Signup Route (Optional)
// app.get('/signup', (req, res) => {
//   res.sendFile(path.join(__dirname, 'signup.html'));
// });

// // Logout Route
// app.get('/logout', (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       return res.status(500).send('Failed to log out.');
//     }
//     res.redirect('/');
//   });
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
