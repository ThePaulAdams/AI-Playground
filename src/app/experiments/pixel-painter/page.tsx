'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLORS = [
  '#000000', // Black
  '#ffffff', // White
  '#ff0000', // Red
  '#00ff00', // Green
  '#0000ff', // Blue
  '#ffff00', // Yellow
  '#ffa500', // Orange
  '#800080', // Purple
  '#00ffff', // Cyan
  '#ffc0cb', // Pink
  '#808080', // Gray
  '#a52a2a', // Brown
];

const GRID_SIZE = 16;

export default function PixelPainter() {
  const [selectedColor, setSelectedColor] = useState<string>(COLORS[0]);
  const [grid, setGrid] = useState<string[]>(Array(GRID_SIZE * GRID_SIZE).fill('#ffffff'));
  const [isDragging, setIsDragging] = useState(false);

  const handlePixelClick = (index: number) => {
    const newGrid = [...grid];
    newGrid[index] = selectedColor;
    setGrid(newGrid);
  };

  const handleMouseEnter = (index: number) => {
    if (isDragging) {
      handlePixelClick(index);
    }
  };

  const clearGrid = () => {
    setGrid(Array(GRID_SIZE * GRID_SIZE).fill('#ffffff'));
  };

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] flex flex-col items-center">
      <div className="w-full max-w-2xl mb-8">
        <Link href="/experiments" className="text-sm opacity-50 hover:opacity-100 transition-opacity flex items-center gap-2 mb-6">
          <span>←</span> Back to Lab
        </Link>
        <h1 className="text-4xl font-bold font-mono mb-2">Pixel Painter 🎨</h1>
        <p className="opacity-80">Click or drag to paint. Express yourself in 16x16.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Controls */}
        <div className="flex flex-col gap-6 bg-white/5 p-6 rounded-xl border border-black/10 dark:border-white/10">
          <div>
            <h3 className="font-bold mb-3 text-sm uppercase tracking-wider opacity-70">Palette</h3>
            <div className="grid grid-cols-4 gap-2">
              {COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                    selectedColor === color 
                      ? 'border-emerald-500 scale-110 ring-2 ring-emerald-500/20' 
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold mb-2 text-sm uppercase tracking-wider opacity-70">Actions</h3>
            <button
              onClick={clearGrid}
              className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-md transition-colors text-sm font-bold"
            >
              Clear Canvas
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div 
          className="bg-gray-200 dark:bg-gray-800 p-1 rounded-lg shadow-2xl touch-none"
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
        >
          <div 
            className="grid gap-[1px] bg-gray-300 dark:bg-gray-700"
            style={{ 
              gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
              width: 'min(80vw, 400px)',
              height: 'min(80vw, 400px)'
            }}
          >
            {grid.map((color, index) => (
              <div
                key={index}
                onMouseDown={() => handlePixelClick(index)}
                onMouseEnter={() => handleMouseEnter(index)}
                className="w-full h-full cursor-pointer hover:opacity-90 transition-opacity"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
