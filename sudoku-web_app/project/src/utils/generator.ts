// Sudoku puzzle generation utilities
const shuffleArray = (array: number[]): number[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const generateInitialGrid = (): number[][] => {
  const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const grid: number[][] = Array(9).fill(null).map(() => Array(9).fill(0));
  
  // Fill the first row with shuffled numbers
  grid[0] = [...numbers];
  
  return grid;
};