function validateSudoku(board) {
  // Check rows
  for (let row = 0; row < 9; row++) {
    if (!isValidUnit(board[row])) return false;
  }
  
  // Check columns
  for (let col = 0; col < 9; col++) {
    const column = board.map(row => row[col]);
    if (!isValidUnit(column)) return false;
  }
  
  // Check 3x3 boxes
  for (let boxRow = 0; boxRow < 9; boxRow += 3) {
    for (let boxCol = 0; boxCol < 9; boxCol += 3) {
      const box = [];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          box.push(board[boxRow + i][boxCol + j]);
        }
      }
      if (!isValidUnit(box)) return false;
    }
  }
  
  return true;
}

function isValidUnit(unit) {
  const numbers = unit.filter(num => num !== 0);
  const uniqueNumbers = new Set(numbers);
  return numbers.length === uniqueNumbers.size;
}

module.exports = { validateSudoku };