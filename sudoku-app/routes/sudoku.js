const express = require('express');
const router = express.Router();
const sudoku = require('sudoku');

router.post('/solve', (req, res) => {
  const { sudoku: puzzle } = req.body;
  const solution = solveSudoku(puzzle);
  res.json({ solution });
});

router.get('/generate', (req, res) => {
  const { difficulty } = req.query;
  const board = generateSudoku(difficulty);
  res.json({ board });
});

router.post('/hint', (req, res) => {
  const { sudoku: puzzle } = req.body;
  const hint = getHint(puzzle);
  res.json({ hint });
});

router.post('/check', (req, res) => {
  const { sudoku: puzzle } = req.body;
  const valid = checkSudoku(puzzle);
  res.json({ valid });
});

function solveSudoku(puzzle) {
  const solution = sudoku.solvepuzzle(puzzle.map(value => (value === '0' ? null : parseInt(value))));
  return solution ? solution.map(value => (value === null ? '0' : (value + 1).toString())) : [];
}

function generateSudoku(difficulty) {
  const levels = {
    easy: sudoku.makepuzzle(),
    medium: sudoku.makepuzzle(),
    hard: sudoku.makepuzzle(),
  };
  const puzzle = levels[difficulty] || levels.easy;
  return puzzle.map(value => (value === null ? '' : (value + 1).toString()));
}

function getHint(puzzle) {
  const solution = solveSudoku(puzzle);
  for (let i = 0; i < puzzle.length; i++) {
    if (puzzle[i] === '0') {
      return { index: i, value: solution[i] };
    }
  }
}

function checkSudoku(puzzle) {
  const solution = solveSudoku(puzzle);
  return puzzle.every((value, index) => value === '0' || value === solution[index]);
}

module.exports = router;
