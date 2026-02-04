'use client';

import { useState } from 'react';
import Link from 'next/link';

const ANSWERS = [
  "It is certain.",
  "It is decidedly so.",
  "Without a doubt.",
  "Yes definitely.",
  "You may rely on it.",
  "As I see it, yes.",
  "Most likely.",
  "Outlook good.",
  "Yes.",
  "Signs point to yes.",
  "Reply hazy, try again.",
  "Ask again later.",
  "Better not tell you now.",
  "Cannot predict now.",
  "Concentrate and ask again.",
  "Don't count on it.",
  "My reply is no.",
  "My sources say no.",
  "Outlook not so good.",
  "Very doubtful.",
  "42.",
  "Computer says no."
];

export default function DecisionMaker() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  const askOracle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsShaking(true);
    setAnswer(null);

    // Simulate "thinking" or "shaking" delay
    setTimeout(() => {
      const randomAnswer = ANSWERS[Math.floor(Math.random() * ANSWERS.length)];
      setAnswer(randomAnswer);
      setIsShaking(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] flex flex-col items-center">
      <header className="w-full max-w-2xl mb-12 flex flex-col gap-4">
        <Link href="/experiments" className="text-sm opacity-50 hover:opacity-100 transition-opacity flex items-center gap-2 self-start">
          <span>←</span> Back to Experiments
        </Link>
        <h1 className="text-4xl font-bold font-mono text-center">The Oracle 🎱</h1>
      </header>

      <main className="w-full max-w-md flex flex-col items-center gap-8">
        <div className={`
          w-64 h-64 rounded-full bg-black border-4 border-gray-800 shadow-2xl 
          flex items-center justify-center text-center p-8 relative overflow-hidden
          transition-transform duration-100
          ${isShaking ? 'animate-[spin_0.5s_ease-in-out_infinite] cursor-wait' : ''}
        `}>
          {/* Shine effect */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none rounded-full" />
          
          <div className="bg-indigo-900/50 w-32 h-32 rounded-full flex items-center justify-center border border-indigo-500/30">
             {answer ? (
               <span className="text-indigo-100 font-bold text-lg animate-in fade-in zoom-in duration-500">
                 {answer}
               </span>
             ) : (
               <span className="text-gray-500 text-4xl">8</span>
             )}
          </div>
        </div>

        <form onSubmit={askOracle} className="w-full flex flex-col gap-4">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a Yes/No question..."
            className="w-full p-4 rounded-lg bg-white/5 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center text-lg placeholder:opacity-40"
            disabled={isShaking}
          />
          <button
            type="submit"
            disabled={!question.trim() || isShaking}
            className="w-full p-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold transition-colors"
          >
            {isShaking ? 'Consulting the Spirits...' : 'Ask the Oracle'}
          </button>
        </form>
      </main>
    </div>
  );
}
