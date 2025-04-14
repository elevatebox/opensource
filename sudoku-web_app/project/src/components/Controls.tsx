import React from 'react';
import { RefreshCw } from 'lucide-react';

interface ControlsProps {
  onNewGame: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ onNewGame }) => {
  return (
    <div className="flex gap-4">
      <button
        onClick={onNewGame}
        className="
          flex items-center gap-2 px-6 py-3
          bg-gradient-to-r from-purple-500 to-purple-600
          text-white rounded-lg font-semibold
          hover:from-purple-600 hover:to-purple-700
          active:scale-95 transition-all
          shadow-md
        "
      >
        <RefreshCw size={20} />
        New Game
      </button>
    </div>
  );
};