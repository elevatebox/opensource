export class GameState {
    constructor() {
        this.board = [];
        this.initialBoard = [];
        this.selectedCell = null;
        this.isGameRunning = false;
        this.difficulty = 'medium';
        this.isComplete = false;
    }

    startNewGame() {
        const { board, solution } = generateSudoku(this.difficulty);
        this.board = board.map(row => [...row]);
        this.initialBoard = board.map(row => [...row]);
        this.solution = solution;
        this.selectedCell = null;
        this.isGameRunning = true;
        this.isComplete = false;
        
        this.notifyListeners('boardUpdate');
        this.notifyListeners('gameStart');
    }

    // Event listener management
    listeners = {
        boardUpdate: [],
        cellSelect: [],
        gameStart: [],
        gameComplete: []
    };

    addEventListener(event, callback) {
        if (this.listeners[event]) {
            this.listeners[event].push(callback);
        }
    }

    notifyListeners(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(callback => callback(data));
        }
    }

    // Game actions
    selectCell(row, col) {
        if (this.initialBoard[row][col] === 0) {
            this.selectedCell = { row, col };
            this.notifyListeners('cellSelect', { row, col });
        }
    }

    setNumber(number) {
        if (!this.selectedCell || !this.isGameRunning) return;

        const { row, col } = this.selectedCell;
        if (this.initialBoard[row][col] !== 0) return;

        this.board[row][col] = number;
        this.notifyListeners('boardUpdate');

        if (this.checkComplete()) {
            this.isGameRunning = false;
            this.isComplete = true;
            this.notifyListeners('gameComplete');
        }
    }

    checkComplete() {
        return this.board.every((row, i) =>
            row.every((cell, j) => cell === this.solution[i][j])
        );
    }
}