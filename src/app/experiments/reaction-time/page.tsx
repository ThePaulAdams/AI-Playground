'use client';

import Link from 'next/link';
import { useState, useRef, useCallback } from 'react';

type GameState = 'idle' | 'waiting' | 'ready' | 'clicked' | 'tooEarly';

export default function ReactionTimePage() {
  const [state, setState] = useState<GameState>('idle');
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [attempts, setAttempts] = useState<number[]>([]);
  const startTimeRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startGame = useCallback(() => {
    setState('waiting');
    setReactionTime(null);
    
    // Random delay between 1.5 and 5 seconds
    const delay = 1500 + Math.random() * 3500;
    
    timeoutRef.current = setTimeout(() => {
      setState('ready');
      startTimeRef.current = performance.now();
    }, delay);
  }, []);

  const handleClick = useCallback(() => {
    if (state === 'idle' || state === 'clicked' || state === 'tooEarly') {
      startGame();
    } else if (state === 'waiting') {
      // Clicked too early!
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setState('tooEarly');
    } else if (state === 'ready') {
      const time = Math.round(performance.now() - startTimeRef.current);
      setReactionTime(time);
      setAttempts(prev => [...prev.slice(-4), time]); // Keep last 5
      setState('clicked');
    }
  }, [state, startGame]);

  const getAverageTime = () => {
    if (attempts.length === 0) return null;
    return Math.round(attempts.reduce((a, b) => a + b, 0) / attempts.length);
  };

  const getBgColor = () => {
    switch (state) {
      case 'waiting': return 'bg-red-500';
      case 'ready': return 'bg-green-500';
      case 'tooEarly': return 'bg-orange-500';
      default: return 'bg-blue-500';
    }
  };

  const getMessage = () => {
    switch (state) {
      case 'idle': return 'Click to Start';
      case 'waiting': return 'Wait for green...';
      case 'ready': return 'CLICK NOW!';
      case 'tooEarly': return 'Too early! Click to try again';
      case 'clicked': return `${reactionTime}ms — Click to play again`;
    }
  };

  const getRating = (ms: number) => {
    if (ms < 200) return '⚡ Lightning Fast!';
    if (ms < 250) return '🔥 Excellent!';
    if (ms < 300) return '👍 Good!';
    if (ms < 350) return '😊 Average';
    if (ms < 400) return '🐢 A bit slow';
    return '😴 Wake up!';
  };

  const average = getAverageTime();

  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)]">
      <header className="p-4 sm:p-8">
        <Link href="/experiments" className="text-sm opacity-50 hover:opacity-100 transition-opacity flex items-center gap-2">
          <span>←</span> Back to Experiments
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl sm:text-4xl font-bold font-mono mb-8 text-center">
          ⚡ Reaction Time Test
        </h1>

        <div
          onClick={handleClick}
          className={`
            ${getBgColor()}
            w-full max-w-md aspect-square rounded-2xl
            flex flex-col items-center justify-center
            cursor-pointer select-none
            transition-colors duration-100
            shadow-lg hover:shadow-xl
            text-white font-bold text-xl sm:text-2xl text-center p-4
          `}
        >
          <span>{getMessage()}</span>
          {state === 'clicked' && reactionTime && (
            <span className="text-base mt-2 opacity-90">{getRating(reactionTime)}</span>
          )}
        </div>

        {attempts.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-lg opacity-80">
              Average: <span className="font-bold">{average}ms</span>
              {average && <span className="ml-2 opacity-60">({getRating(average)})</span>}
            </p>
            <p className="text-sm opacity-50 mt-1">
              Last {attempts.length} attempts: {attempts.join('ms, ')}ms
            </p>
          </div>
        )}

        <div className="mt-8 text-center text-sm opacity-50 max-w-md">
          <p>Click when the box turns green. Don&apos;t click too early!</p>
          <p className="mt-2">Human average: ~250ms</p>
        </div>
      </main>
    </div>
  );
}
