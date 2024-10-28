const express = require('express');
const app = express();
const port = 3000;

// Define the API endpoint
app.get('/lohith', (req, res) => {
    res.send('<strong>HELLO WORLD</strong>');
});

// Serve a simple HTML frontend
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Hello World API</title>
        </head>
        <body>
            <h1>Welcome to the Hello World API</h1>
            <button id="fetchButton">Fetch Message</button>
            <div id="message"></div>
            <script>
                document.getElementById('fetchButton').addEventListener('click', () => {
                    fetch('/lohith')
                        .then(response => response.text())
                        .then(data => {
                            document.getElementById('message').innerHTML = data;
                        });
                });
            </script>
        </body>
        </html>
    `);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
