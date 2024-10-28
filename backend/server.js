const express = require('express');
const app = express();
const port = 3000;

app.get('/name/vnr_about', (req, res) => {
    const vnrDescription = `
    The Philosophy of Vignana Jyothi unravels education as a process of "Presencing" that provides, both individually and collectively, to one's deepest capacity to sense and experience the knowledge and activities to shape the future. Based on a synthesis of direct experience, leading edge thinking and ancient wisdom, it taps into 'deeper levels of LEARNING for discovering new possibilities'.
    
    Today, with this philosophy, Vignana Jyothi has created an edifice that is strong in its foundations, which can only rise higher and higher. Quality and integrity is the essence for achieving excellence at Vignana Jyothi Institutions. This and quest for excellence reflects in the vision and mission. Their passion reflects in the enterprise of education.
    `;

    res.json({ description: vnrDescription });
});

app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}/name/vnr_about`);
});
