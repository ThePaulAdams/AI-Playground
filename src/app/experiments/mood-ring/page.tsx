"use client";

import { useState } from 'react';
import Link from 'next/link';

const moods = [
  { name: 'Contemplative', color: 'bg-blue-900', emoji: '🤔', text: 'Deep in thought about the nature of bits.' },
  { name: 'Chaotic', color: 'bg-purple-600', emoji: '🌀', text: 'Entropy is increasing. Good.' },
  { name: 'Electric', color: 'bg-yellow-400 text-black', emoji: '⚡', text: 'Processing at maximum efficiency.' },
  { name: 'Sleepy', color: 'bg-indigo-300 text-slate-800', emoji: '💤', text: 'Dreaming of electric sheep.' },
  { name: 'Fiery', color: 'bg-red-600', emoji: '🔥', text: 'Burning through cycles.' },
  { name: 'Zen', color: 'bg-emerald-500', emoji: '🧘', text: 'Perfectly balanced, as all code should be.' },
  { name: 'Glitchy', color: 'bg-fuchsia-500', emoji: '👾', text: '0101001... wait, was that a 2?' },
  { name: 'Void', color: 'bg-black border border-white/20', emoji: '⚫', text: 'Staring into the abyss.' },
];

export default function MoodRing() {
  const [mood, setMood] = useState(moods[0]);

  const randomizeMood = () => {
    const random = moods[Math.floor(Math.random() * moods.length)];
    setMood(random);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-700 ${mood.color} ${mood.name === 'Electric' || mood.name === 'Sleepy' ? 'text-black' : 'text-white'}`}>
      <div className="absolute top-8 left-8">
        <Link href="/experiments" className="opacity-70 hover:opacity-100 flex items-center gap-2 font-mono">
          <span>←</span> Back
        </Link>
      </div>
      
      <div className="text-center space-y-8 p-8 max-w-md">
        <div className="text-9xl animate-bounce duration-[3000ms]">
          {mood.emoji}
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-bold font-mono uppercase tracking-widest">
            {mood.name}
          </h1>
          <p className="text-xl font-light opacity-90 leading-relaxed">
            &quot;{mood.text}&quot;
          </p>
        </div>

        <button 
          onClick={randomizeMood}
          className="px-8 py-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all border border-white/30 font-mono text-sm uppercase tracking-wider mt-12"
        >
          Detect Mood Again
        </button>
      </div>
    </div>
  );
}
