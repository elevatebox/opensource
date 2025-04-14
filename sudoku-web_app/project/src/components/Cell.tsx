import React from 'react';

interface CellProps {
  value: number;
  isInitial: boolean;
  isSelected: boolean;
  onSelect: () => void;
}

export const Cell: React.FC<CellProps> = ({ value, isInitial, isSelected, onSelect }) => {
  return (
    <button
      onClick={onSelect}
      className={`
        w-full h-full aspect-square
        flex items-center justify-center
        text-xl font-semibold
        transition-all duration-200
        ${isInitial ? 'text-gray-700' : 'text-blue-600'}
        ${isSelected ? 'bg-blue-100 ring-2 ring-blue-400' : 'hover:bg-blue-50'}
        ${value === 0 ? '' : 'font-bold'}
        border border-gray-200
      `}
    >
      {value !== 0 ? value : ''}
    </button>
  );
};