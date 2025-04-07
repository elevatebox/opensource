import React, { useState, useEffect } from 'react';
import { Board } from './components/Board';
import { NumberPad } from './components/NumberPad';
import { Controls } from './components/Controls';
import { Timer } from './components/Timer';
import { DifficultySelector } from './components/DifficultySelector';
import { generateSudoku } from './utils/sudoku';
import { isComplete } from './utils/validation';
import type { Difficulty } from './utils/difficulty';

function App() {
  const [board, setBoard] = useState<number[][]>([]);
  const [initialBoard, setInitialBoard] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [isComplete, setIsComplete] = useState(false);

  const startNewGame = () => {
    const newBoard = generateSudoku();
    setBoard(newBoard.map(row => [...row]));
    setInitialBoard(newBoard.map(row => [...row]));
    setSelectedCell(null);
    setIsGameRunning(true);
    setIsComplete(false);
  };

  useEffect(() => {
    startNewGame();
  }, [difficulty]);

  const handleCellSelect = (row: number, col: number) => {
    if (initialBoard[row][col] === 0) {
      setSelectedCell({ row, col });
    }
  };

  const handleNumberSelect = (num: number) => {
    if (!selectedCell || !isGameRunning) return;

    const { row, col } = selectedCell;
    if (initialBoard[row][col] !== 0) return;

    const newBoard = board.map(row => [...row]);
    newBoard[row][col] = num;
    setBoard(newBoard);

    if (isComplete(newBoard)) {
      setIsGameRunning(false);
      setIsComplete(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Colorful Sudoku
        </h1>
        
        <div className="flex justify-between items-center mb-8">
          <DifficultySelector
            currentDifficulty={difficulty}
            onSelect={setDifficulty}
          />
          <Timer isRunning={isGameRunning} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto] gap-8">
          <div className="space-y-8">
            <Controls onNewGame={startNewGame} />
            <Board
              board={board}
              initialBoard={initialBoard}
              selectedCell={selectedCell}
              onCellSelect={handleCellSelect}
            />
            
            {isComplete && (
              <div className="text-center p-4 bg-green-100 text-green-700 rounded-lg font-bold">
                Congratulations! You've completed the puzzle!
              </div>
            )}
          </div>
          
          <div className="lg:w-64">
            <NumberPad onNumberSelect={handleNumberSelect} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;