import React from 'react';
import { Cell } from './Cell';

interface BoardProps {
  board: number[][];
  initialBoard: number[][];
  selectedCell: { row: number; col: number } | null;
  onCellSelect: (row: number, col: number) => void;
}

export const Board: React.FC<BoardProps> = ({
  board,
  initialBoard,
  selectedCell,
  onCellSelect,
}) => {
  return (
    <div className="grid grid-cols-9 gap-0 bg-white rounded-lg shadow-xl p-2">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`
              ${colIndex % 3 === 2 && colIndex !== 8 ? 'border-r-2 border-r-gray-400' : ''}
              ${rowIndex % 3 === 2 && rowIndex !== 8 ? 'border-b-2 border-b-gray-400' : ''}
            `}
          >
            <Cell
              value={cell}
              isInitial={initialBoard[rowIndex][colIndex] !== 0}
              isSelected={selectedCell?.row === rowIndex && selectedCell?.col === colIndex}
              onSelect={() => onCellSelect(rowIndex, colIndex)}
            />
          </div>
        ))
      )}
    </div>
  );
};