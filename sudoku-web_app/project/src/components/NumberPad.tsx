import React from 'react';

interface NumberPadProps {
  onNumberSelect: (num: number) => void;
}

export const NumberPad: React.FC<NumberPadProps> = ({ onNumberSelect }) => {
  return (
    <div className="grid grid-cols-3 gap-2 p-4 bg-white rounded-lg shadow-md">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <button
          key={num}
          onClick={() => onNumberSelect(num)}
          className="
            p-4 text-xl font-bold
            bg-gradient-to-br from-blue-500 to-blue-600
            text-white rounded-lg
            hover:from-blue-600 hover:to-blue-700
            active:scale-95 transition-all
            shadow-md
          "
        >
          {num}
        </button>
      ))}
      <button
        onClick={() => onNumberSelect(0)}
        className="
          col-span-3 p-4 text-xl font-bold
          bg-gradient-to-br from-gray-500 to-gray-600
          text-white rounded-lg
          hover:from-gray-600 hover:to-gray-700
          active:scale-95 transition-all
          shadow-md
        "
      >
        Clear
      </button>
    </div>
  );
};