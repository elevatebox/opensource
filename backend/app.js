const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Students submission endpoint
app.post('/vnr_students', (req, res) => {
    const { rollNo, name, branch, email } = req.body;

    // Validate email format
    if (!email.endsWith('@vnr.ac.in')) {
        return res.status(400).send('🚫 Invalid email: must end with @vnr.ac.in');
    }

    // Append data to CSV file
    const data = `${rollNo},${name},${branch},${email}\n`;
    fs.appendFile(path.join(__dirname, 'students.csv'), data, (err) => {
        if (err) {
            return res.status(500).send('❌ Failed to save data.');
        }
        res.send('✅ Data saved successfully!');
    });
});

// Serve HTML form
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>VNR Students Form</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-image: url('https://upload.wikimedia.org/wikipedia/commons/4/43/Harvard_Yard_03.jpg'); /* Harvard background */
                    background-size: cover;
                    background-repeat: no-repeat;
                    color: #333;
                    margin: 0;
                    padding: 20px;
                }
                h1 {
                    color: #4CAF50;
                    text-align: center;
                }
                form {
                    background: rgba(255, 255, 255, 0.8);
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
                    max-width: 500px;
                    margin: auto;
                }
                label {
                    margin-top: 10px;
                    display: block;
                }
                input[type="text"], input[type="email"], select {
                    width: 100%;
                    padding: 10px;
                    margin-top: 5px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }
                .branch-checkbox {
                    display: inline-block;
                    margin-right: 10px;
                }
                #submitBtn {
                    background-color: #4CAF50;
                    color: white;
                    padding: 10px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-top: 10px;
                    width: 100%;
                }
                #submitBtn:hover {
                    background-color: #45a049;
                }
                .animation {
                    display: none;
                    margin-top: 10px;
                    color: green;
                }
                .error {
                    color: red;
                }
            </style>
        </head>
        <body>
            <h1>🌟 Student Registration</h1>
            <form id="studentForm">
                <label for="rollNo">Roll No:</label>
                <input type="text" id="rollNo" name="rollNo" required>

                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>

                <label>Branch:</label>
                <div>
                    <div class="branch-checkbox">
                        <input type="checkbox" id="CSE" name="branch" value="CSE">
                        <label for="CSE">CSE</label>
                    </div>
                    <div class="branch-checkbox">
                        <input type="checkbox" id="EIE" name="branch" value="EIE">
                        <label for="EIE">EIE</label>
                    </div>
                    <div class="branch-checkbox">
                        <input type="checkbox" id="ME" name="branch" value="ME">
                        <label for="ME">ME</label>
                    </div>
                </div>

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>

                <button type="submit" id="submitBtn">Submit 📩</button>
            </form>
            <div id="successMessage" class="animation">✅ Submitted successfully!</div>
            <div id="errorMessage" class="error"></div>
            <script>
                document.getElementById('studentForm').onsubmit = function(event) {
                    event.preventDefault();
                    const formData = new FormData(this);
                    const data = Object.fromEntries(formData.entries());
                    data.branch = [...document.querySelectorAll('input[name="branch"]:checked')].map(el => el.value).join(', ');

                    fetch('/vnr_students', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                    })
                    .then(response => {
                        if (!response.ok) {
                            return response.text().then(text => {
                                document.getElementById('errorMessage').innerText = text;
                                document.getElementById('successMessage').style.display = 'none';
                            });
                        }
                        return response.text();
                    })
                    .then(text => {
                        document.getElementById('successMessage').innerText = text;
                        document.getElementById('successMessage').style.display = 'block';
                        document.getElementById('errorMessage').innerText = '';
                        this.reset();
                    })
                    .catch(err => console.error(err));
                };
            </script>
        </body>
        </html>
    `);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
