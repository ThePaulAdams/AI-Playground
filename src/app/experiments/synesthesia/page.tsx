"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';

// Convert a character to a hue (0-360) based on its code
const charToHue = (char: string): number => {
  const code = char.toLowerCase().charCodeAt(0);
  // Map a-z to spread across the spectrum, others get hash-based color
  if (code >= 97 && code <= 122) {
    return ((code - 97) / 26) * 360;
  }
  // Numbers and special chars get their own hues
  return (code * 137.5) % 360;
};

// Generate saturation based on whether it's uppercase
const charToSaturation = (char: string): number => {
  if (char === char.toUpperCase() && char !== char.toLowerCase()) {
    return 90; // Uppercase = more saturated
  }
  return 70;
};

// Lightness varies slightly based on position in alphabet
const charToLightness = (char: string): number => {
  const code = char.toLowerCase().charCodeAt(0);
  if (code >= 97 && code <= 122) {
    return 45 + ((code - 97) % 3) * 5;
  }
  return 50;
};

interface ColorBlock {
  char: string;
  hue: number;
  saturation: number;
  lightness: number;
}

export default function Synesthesia() {
  const [text, setText] = useState('Hello World');

  const colorBlocks: ColorBlock[] = useMemo(() => {
    return text.split('').map(char => ({
      char,
      hue: charToHue(char),
      saturation: char === ' ' ? 0 : charToSaturation(char),
      lightness: char === ' ' ? 95 : charToLightness(char),
    }));
  }, [text]);

  // Generate a gradient from all the colors
  const gradientColors = colorBlocks
    .filter(b => b.char !== ' ')
    .map(b => `hsl(${b.hue}, ${b.saturation}%, ${b.lightness}%)`)
    .join(', ');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white p-8">
      <div className="absolute top-8 left-8">
        <Link href="/experiments" className="opacity-70 hover:opacity-100 flex items-center gap-2 font-mono text-sm">
          <span>←</span> Back
        </Link>
      </div>

      <div className="text-center space-y-8 max-w-2xl w-full">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold font-mono">🌈 Color Synesthesia</h1>
          <p className="text-sm opacity-60">
            Type anything. See its chromatic signature.
          </p>
        </div>

        {/* Color visualization */}
        <div className="flex flex-wrap justify-center gap-1 min-h-[120px] items-center p-4 rounded-xl bg-black/30 border border-white/10">
          {colorBlocks.map((block, i) => (
            <div
              key={i}
              className="relative group"
            >
              <div
                className={`w-10 h-14 sm:w-12 sm:h-16 rounded-lg flex items-center justify-center font-mono text-lg sm:text-xl font-bold transition-all duration-300 hover:scale-110 hover:z-10 ${block.char === ' ' ? 'bg-white/5' : ''}`}
                style={{
                  backgroundColor: block.char === ' ' ? undefined : `hsl(${block.hue}, ${block.saturation}%, ${block.lightness}%)`,
                  color: block.lightness > 50 ? '#1e293b' : '#f8fafc',
                  boxShadow: block.char !== ' ' ? `0 4px 20px hsl(${block.hue}, ${block.saturation}%, ${block.lightness}%, 0.4)` : undefined,
                }}
              >
                {block.char === ' ' ? '·' : block.char}
              </div>
              {/* Tooltip with HSL values */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono whitespace-nowrap bg-black/80 px-2 py-1 rounded">
                {block.char === ' ' ? 'space' : `H:${Math.round(block.hue)}°`}
              </div>
            </div>
          ))}
        </div>

        {/* Gradient bar showing the overall "vibe" */}
        {colorBlocks.filter(b => b.char !== ' ').length > 1 && (
          <div
            className="h-3 rounded-full w-full"
            style={{
              background: `linear-gradient(to right, ${gradientColors})`,
            }}
          />
        )}

        {/* Input */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something..."
          className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 outline-none text-center text-xl font-mono placeholder:opacity-30 transition-colors"
          maxLength={30}
        />

        {/* Fun facts */}
        <div className="text-xs opacity-40 space-y-1">
          <p>Each letter maps to a unique hue. A is red, M is cyan, Z loops back.</p>
          <p>UPPERCASE letters are more saturated.</p>
        </div>
      </div>
    </div>
  );
}
