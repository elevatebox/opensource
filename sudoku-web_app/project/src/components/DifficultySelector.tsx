import React from 'react';
import { type Difficulty } from '../utils/difficulty';

interface DifficultySelectorProps {
  currentDifficulty: Difficulty;
  onSelect: (difficulty: Difficulty) => void;
}

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  currentDifficulty,
  onSelect,
}) => {
  const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

  return (
    <div className="flex gap-2">
      {difficulties.map((difficulty) => (
        <button
          key={difficulty}
          onClick={() => onSelect(difficulty)}
          className={`
            px-4 py-2 rounded-lg font-semibold
            transition-all duration-200
            ${
              currentDifficulty === difficulty
                ? 'bg-purple-600 text-white'
                : 'bg-white text-purple-600 hover:bg-purple-50'
            }
          `}
        >
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </button>
      ))}
    </div>
  );
};