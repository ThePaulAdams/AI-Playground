'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const affirmations = [
  { text: "You are exactly where you need to be.", emoji: "🌟" },
  { text: "Your potential is limitless.", emoji: "🚀" },
  { text: "You bring unique value to the world.", emoji: "💎" },
  { text: "Today is full of possibilities.", emoji: "🌅" },
  { text: "You are worthy of good things.", emoji: "✨" },
  { text: "Your presence matters.", emoji: "🌸" },
  { text: "You are resilient and strong.", emoji: "💪" },
  { text: "Growth happens at your own pace.", emoji: "🌱" },
  { text: "You deserve rest and kindness.", emoji: "🫂" },
  { text: "Your thoughts create your reality.", emoji: "🧠" },
  { text: "Every moment is a fresh start.", emoji: "🌊" },
  { text: "You are more capable than you know.", emoji: "⚡" },
  { text: "The universe is conspiring in your favor.", emoji: "🌌" },
  { text: "Your journey is valid.", emoji: "🛤️" },
  { text: "Breathe. You've got this.", emoji: "🧘" },
  { text: "Small steps lead to big changes.", emoji: "👣" },
  { text: "You are allowed to take up space.", emoji: "🌳" },
  { text: "Your energy is a gift to those around you.", emoji: "☀️" },
  { text: "Trust the timing of your life.", emoji: "⏳" },
  { text: "You are enough, exactly as you are.", emoji: "💜" },
];

const gradients = [
  "from-purple-500/20 to-pink-500/20",
  "from-blue-500/20 to-cyan-500/20",
  "from-amber-500/20 to-orange-500/20",
  "from-emerald-500/20 to-teal-500/20",
  "from-rose-500/20 to-red-500/20",
  "from-indigo-500/20 to-violet-500/20",
];

export default function AffirmationPage() {
  const [current, setCurrent] = useState(0);
  const [gradient, setGradient] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Random start
    setCurrent(Math.floor(Math.random() * affirmations.length));
    setGradient(Math.floor(Math.random() * gradients.length));
  }, []);

  const nextAffirmation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    setTimeout(() => {
      let next = Math.floor(Math.random() * affirmations.length);
      while (next === current && affirmations.length > 1) {
        next = Math.floor(Math.random() * affirmations.length);
      }
      setCurrent(next);
      setGradient(Math.floor(Math.random() * gradients.length));
      setIsAnimating(false);
    }, 300);
  };

  const { text, emoji } = affirmations[current];

  return (
    <div className={`min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-br ${gradients[gradient]} transition-all duration-700`}>
      <header className="mb-12">
        <Link href="/experiments" className="text-sm opacity-50 hover:opacity-100 transition-opacity flex items-center gap-2">
          <span>←</span> Back to Experiments
        </Link>
        <h1 className="text-4xl font-bold font-mono mt-4">Daily Affirmation 💫</h1>
        <p className="mt-2 text-xl opacity-80">
          A gentle reminder from the algorithm.
        </p>
      </header>

      <main className="flex flex-col items-center justify-center min-h-[50vh]">
        <div 
          className={`text-center max-w-2xl transition-all duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
        >
          <span className="text-8xl mb-8 block animate-pulse">{emoji}</span>
          <p className="text-3xl sm:text-4xl font-light leading-relaxed">
            &ldquo;{text}&rdquo;
          </p>
        </div>

        <button
          onClick={nextAffirmation}
          disabled={isAnimating}
          className="mt-12 px-8 py-4 rounded-full border-2 border-current opacity-60 hover:opacity-100 transition-all hover:scale-105 active:scale-95 disabled:cursor-not-allowed text-lg font-medium"
        >
          Another one ✨
        </button>

        <p className="mt-16 text-sm opacity-40 text-center">
          Tap for a new affirmation. Each one was chosen for you.
        </p>
      </main>
    </div>
  );
}
