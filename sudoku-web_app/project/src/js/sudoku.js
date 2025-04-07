const DIFFICULTIES = {
    easy: { cellsToRemove: 30 },
    medium: { cellsToRemove: 40 },
    hard: { cellsToRemove: 50 }
};

export function generateSudoku(difficulty = 'medium') {
    const solution = createSolution();
    const puzzle = removeCells(solution, DIFFICULTIES[difficulty].cellsToRemove);
    return { board: puzzle, solution };
}

function createSolution() {
    const grid = Array(9).fill().map(() => Array(9).fill(0));
    fillGrid(grid);
    return grid;
}

function fillGrid(grid) {
    const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    return fillGridRecursive(grid, 0, 0, numbers);
}

function fillGridRecursive(grid, row, col, numbers) {
    if (col === 9) {
        row++;
        col = 0;
    }
    if (row === 9) return true;

    if (grid[row][col] !== 0) {
        return fillGridRecursive(grid, row, col + 1, numbers);
    }

    for (const num of numbers) {
        if (isValid(grid, row, col, num)) {
            grid[row][col] = num;
            if (fillGridRecursive(grid, row, col + 1, [...numbers])) {
                return true;
            }
            grid[row][col] = 0;
        }
    }
    return false;
}

function isValid(grid, row, col, num) {
    // Check row
    for (let x = 0; x < 9; x++) {
        if (grid[row][x] === num) return false;
    }

    // Check column
    for (let x = 0; x < 9; x++) {
        if (grid[x][col] === num) return false;
    }

    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[boxRow + i][boxCol + j] === num) return false;
        }
    }

    return true;
}

function removeCells(grid, count) {
    const puzzle = grid.map(row => [...row]);
    const positions = shuffleArray(
        Array(81).fill().map((_, i) => ({
            row: Math.floor(i / 9),
            col: i % 9
        }))
    );

    for (let i = 0; i < count && i < positions.length; i++) {
        const { row, col } = positions[i];
        puzzle[row][col] = 0;
    }

    return puzzle;
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}