
import React from 'react';
import { Shape } from '../types';
import { RectangleIcon, SquareIcon, CircleIcon, TriangleIcon } from './icons/ShapeIcons';

interface ShapeSelectorProps {
  selectedShape: Shape;
  onShapeChange: (shape: Shape) => void;
}

const shapeOptions = [
  { shape: Shape.Rectangle, label: '직사각형', icon: <RectangleIcon /> },
  { shape: Shape.Square, label: '정사각형', icon: <SquareIcon /> },
  { shape: Shape.Circle, label: '원', icon: <CircleIcon /> },
  { shape: Shape.Triangle, label: '삼각형', icon: <TriangleIcon /> },
];

const ShapeSelector: React.FC<ShapeSelectorProps> = ({ selectedShape, onShapeChange }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {shapeOptions.map(({ shape, label, icon }) => (
        <button
          key={shape}
          onClick={() => onShapeChange(shape)}
          className={`p-3 rounded-lg flex flex-col items-center justify-center space-y-2 transition-all duration-200 ease-in-out border-2 
            ${selectedShape === shape 
              ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' 
              : 'bg-slate-700/50 border-slate-700 text-slate-400 hover:bg-slate-700 hover:border-slate-600'
            }`}
        >
          <div className="w-8 h-8">{icon}</div>
          <span className="font-semibold text-sm">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default ShapeSelector;
