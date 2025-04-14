import { generateSudoku } from './sudoku.js';
import { initializeBoard } from './board.js';
import { initializeNumberPad } from './numberpad.js';
import { initializeTimer } from './timer.js';
import { initializeControls } from './controls.js';
import { GameState } from './gameState.js';

// Initialize game state
const gameState = new GameState();

// Initialize game components
initializeBoard(gameState);
initializeNumberPad(gameState);
initializeTimer(gameState);
initializeControls(gameState);

// Start new game
gameState.startNewGame();