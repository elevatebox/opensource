// Difficulty level configurations
export type Difficulty = 'easy' | 'medium' | 'hard';

export const difficultyConfig = {
  easy: { cellsToRemove: 30 },
  medium: { cellsToRemove: 40 },
  hard: { cellsToRemove: 50 }
};