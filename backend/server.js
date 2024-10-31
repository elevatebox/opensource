const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample data about VNR VJIET
const vnrInfo = {
    "VNR VJIET",
    "Nagarjuna Sagar Road, Namburu, Andhra Pradesh",
     1997,
    courses: [
        "B.Tech",
        "M.Tech",
        "MBA",
        "PhD"
    ],
    description: "VNR VJIET is a premier engineering college offering a range of undergraduate and postgraduate programs."
};

// API Endpoint
app.get('/vnr_about', (req, res) => {
    res.json(vnrInfo);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

