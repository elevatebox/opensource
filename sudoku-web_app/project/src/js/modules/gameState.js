import { generateSudoku } from '../utils/generator.js';
import { validateSolution } from '../utils/validator.js';
import { EventEmitter } from '../utils/eventEmitter.js';

export class GameState extends EventEmitter {
    constructor() {
        super();
        this.board = [];
        this.solution = [];
        this.initialBoard = [];
        this.selectedCell = null;
        this.difficulty = 'easy';
        this.isComplete = false;
    }

    startNewGame() {
        const puzzle = generateSudoku(this.difficulty);
        this.board = puzzle.board;
        this.solution = puzzle.solution;
        this.initialBoard = this.board.map(row => [...row]);
        this.selectedCell = null;
        this.isComplete = false;
        
        this.emit('gameStart');
        this.emit('boardUpdate');
    }

    setNumber(number) {
        if (!this.selectedCell || this.isComplete) return;
        
        const { row, col } = this.selectedCell;
        if (this.initialBoard[row][col] !== 0) return;

        this.board[row][col] = number;
        this.emit('boardUpdate');

        if (validateSolution(this.board, this.solution)) {
            this.isComplete = true;
            this.emit('gameComplete');
        }
    }

    selectCell(row, col) {
        if (this.initialBoard[row][col] === 0) {
            this.selectedCell = { row, col };
            this.emit('cellSelect');
        }
    }

    setDifficulty(difficulty) {
        this.difficulty = difficulty;
        this.startNewGame();
    }
}