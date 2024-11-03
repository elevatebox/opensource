// server.js

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

// /vnr_about endpoint
app.get('/vnr_about', (req, res) => {
    res.json({
        title: "Welcome to VNRVJIET",
        description: `
            The Philosophy of Vignana Jyothi unravels education as a process of "Presencing" that provides, both individually and collectively, to one's deepest capacity to sense and experience the knowledge and activities to shape the future. Based on a synthesis of direct experience, leading edge thinking and ancient wisdom, it taps into 'deeper levels of LEARNING for discovering new possibilities'.

            Today, with this philosophy, Vignana Jyothi has created an edifice that is strong in its foundations, which can only rise higher and higher. Quality and integrity is the essence for achieving excellence at Vignana Jyothi Institutions. This and quest for excellence reflects in the vision and mission. Their passion reflects in the enterprise of education.
        `,
        vision: "To be a World Class University providing value-based education, conducting interdisciplinary research in cutting edge technologies leading to sustainable socio-economic development of the nation.",
        mission: [
            "To produce technically competent and socially responsible engineers, managers, and entrepreneurs, who will be future ready.",
            "To involve students and faculty in innovative research projects linked with industry, academic and research institutions in India and abroad.",
            "To use modern pedagogy for improving the teaching-learning process."
        ]
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
