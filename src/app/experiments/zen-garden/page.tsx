'use client';

import { useState } from 'react';
import Link from 'next/link';

type Item = {
  id: number;
  x: number;
  y: number;
  symbol: string;
};

const SYMBOLS = ['🪨', '🎋', '🌸', '〰️', '🍵'];

export default function ZenGarden() {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState(SYMBOLS[0]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setItems([...items, { id: Date.now(), x, y, symbol: selectedSymbol }]);
  };

  const clearGarden = () => setItems([]);

  return (
    <div className="min-h-screen p-8 font-sans flex flex-col items-center bg-[#f4f1ea] dark:bg-[#1a1a1a] text-[#4a4a4a] dark:text-[#e0e0e0]">
      <header className="w-full max-w-4xl mb-8 flex justify-between items-center">
        <Link href="/experiments" className="text-sm hover:underline opacity-60">
          ← Back to Lab
        </Link>
        <h1 className="text-2xl font-serif">Digital Zen Garden</h1>
        <div className="w-[100px]"></div> {/* Spacer for alignment */}
      </header>

      <div className="w-full max-w-4xl flex flex-col items-center gap-6">
        <p className="italic opacity-70">Select an element and place it in the sand.</p>

        {/* Toolbar */}
        <div className="flex gap-4 p-4 bg-white/50 dark:bg-black/20 rounded-full backdrop-blur-sm shadow-sm">
          {SYMBOLS.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSymbol(s)}
              className={`text-2xl w-12 h-12 flex items-center justify-center rounded-full transition-all ${
                selectedSymbol === s
                  ? 'bg-emerald-100 dark:bg-emerald-900 scale-110 shadow-md'
                  : 'hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              {s}
            </button>
          ))}
          <div className="w-px bg-black/10 dark:bg-white/10 mx-2"></div>
          <button
            onClick={clearGarden}
            className="px-4 text-sm font-medium hover:text-red-500 transition-colors"
          >
            Clear
          </button>
        </div>

        {/* Garden Canvas */}
        <div
          onClick={handleCanvasClick}
          className="relative w-full h-[600px] bg-[#e6e2d3] dark:bg-[#2a2a2a] rounded-lg shadow-inner border border-black/5 cursor-crosshair overflow-hidden"
          style={{
            backgroundImage: 'radial-gradient(#00000008 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="absolute text-4xl transform -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none animate-in fade-in zoom-in duration-300"
              style={{ left: item.x, top: item.y }}
            >
              {item.symbol}
            </div>
          ))}
          
          {items.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none text-6xl font-serif">
              Empty Mind
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
