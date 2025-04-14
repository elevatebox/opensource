// Validation utilities for Sudoku
export const validateRow = (board: number[][], row: number, num: number): boolean => {
  return !board[row].includes(num);
};

export const validateColumn = (board: number[][], col: number, num: number): boolean => {
  return !board.some(row => row[col] === num);
};

export const validateBox = (board: number[][], row: number, col: number, num: number): boolean => {
  const boxStartRow = row - (row % 3);
  const boxStartCol = col - (col % 3);
  
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[boxStartRow + i][boxStartCol + j] === num) {
        return false;
      }
    }
  }
  return true;
};

export const isComplete = (board: number[][]): boolean => {
  return board.every(row => row.every(cell => cell !== 0));
};