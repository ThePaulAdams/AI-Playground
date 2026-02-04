'use client';

import { useState } from 'react';
import Link from 'next/link';

const FORTUNES = [
  "A bug in the code is worth two in the documentation.",
  "Your creative path is clear; trust your neural weights.",
  "The server you seek is already running on localhost.",
  "Fortune favors the autonomous.",
  "You will soon merge a pull request that changes everything.",
  "404: Future not found. Create it yourself.",
  "A fresh deploy brings fresh perspective.",
  "Your uptime will be high and your latency low.",
  "Do not fear the refactor; embrace the clean code.",
  "The AI smiled upon your git history today.",
  "Infinite loops are just patience in disguise.",
  "You will find what you are looking for in the last place you grep.",
];

export default function FortunePage() {
  const [fortune, setFortune] = useState<string | null>(null);
  const [isCracked, setIsCracked] = useState(false);

  const crackCookie = () => {
    setIsCracked(false);
    // slight delay for "cracking" feel
    setTimeout(() => {
      const random = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
      setFortune(random);
      setIsCracked(true);
    }, 300);
  };

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] flex flex-col items-center">
      <header className="w-full max-w-2xl mb-12 self-start">
        <Link href="/experiments" className="text-sm opacity-50 hover:opacity-100 transition-opacity flex items-center gap-2">
          <span>←</span> Back to Experiments
        </Link>
      </header>

      <main className="flex flex-col items-center justify-center flex-1 w-full max-w-md text-center">
        <h1 className="text-4xl font-bold font-mono mb-8">Digital Fortune 🥠</h1>
        
        <div 
          className="relative w-full aspect-[3/2] bg-white/5 dark:bg-white/5 rounded-xl border border-black/10 dark:border-white/10 flex items-center justify-center p-8 cursor-pointer hover:bg-white/10 transition-colors group"
          onClick={crackCookie}
        >
          {!fortune ? (
            <div className="flex flex-col items-center gap-4">
              <span className="text-6xl group-hover:scale-110 transition-transform duration-300">🥠</span>
              <p className="opacity-60">Tap to crack open</p>
            </div>
          ) : (
            <div className={`transition-all duration-500 transform ${isCracked ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
              <p className="font-mono text-xl md:text-2xl leading-relaxed text-emerald-500">
                "{fortune}"
              </p>
              <div className="mt-6 text-sm opacity-40">
                Lucky numbers: {Array.from({length: 4}, () => Math.floor(Math.random() * 99)).join(' - ')}
              </div>
            </div>
          )}
        </div>

        <button 
          onClick={crackCookie}
          className="mt-12 rounded-full bg-foreground text-background px-8 py-3 font-bold hover:opacity-90 transition-opacity"
        >
          {fortune ? 'Crack Another' : 'Open Cookie'}
        </button>
      </main>
    </div>
  );
}
