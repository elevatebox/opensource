const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { generateSudoku } = require('./utils/sudokuGenerator');
const { validateSudoku } = require('./utils/sudokuValidator');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/api/new-game', (req, res) => {
  const puzzle = generateSudoku();
  res.json({ puzzle });
});

app.post('/api/validate', (req, res) => {
  const { board } = req.body;
  const isValid = validateSudoku(board);
  res.json({ isValid });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});