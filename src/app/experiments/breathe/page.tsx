'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function BreathePage() {
  const [phase, setPhase] = useState('Inhale');
  
  useEffect(() => {
    const cycle = () => {
      setPhase('Inhale');
      setTimeout(() => setPhase('Hold'), 4000);
      setTimeout(() => setPhase('Exhale'), 8000);
      setTimeout(() => setPhase('Hold'), 12000);
    };

    cycle();
    const interval = setInterval(cycle, 16000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] flex flex-col">
      <header className="mb-8 z-10 relative">
        <Link href="/experiments" className="text-sm opacity-50 hover:opacity-100 transition-opacity flex items-center gap-2 mb-4">
          <span>←</span> Back to Lab
        </Link>
        <h1 className="text-4xl font-bold font-mono">Box Breathing 🧘</h1>
        <p className="mt-2 opacity-60">4s Inhale · 4s Hold · 4s Exhale · 4s Hold</p>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center relative">
        {/* Animated Circle */}
        <div className="relative flex items-center justify-center">
            {/* Outer ring for reference */}
            <div className="absolute w-64 h-64 rounded-full border-2 border-dashed border-white/10" />
            
            {/* Moving circle */}
            <div 
                className="w-32 h-32 bg-emerald-500/30 rounded-full blur-xl animate-breathe"
                style={{
                    animation: 'breathe 16s infinite ease-in-out'
                }}
            />
            <div 
                className="absolute w-32 h-32 bg-emerald-400/50 rounded-full mix-blend-screen"
                style={{
                    animation: 'breathe 16s infinite ease-in-out'
                }}
            />
            
            {/* Text center */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold tracking-widest uppercase transition-all duration-500">
                    {phase}
                </span>
            </div>
        </div>

        <style jsx>{`
          @keyframes breathe {
            0% { transform: scale(1); }      /* Start Inhale */
            25% { transform: scale(2.5); }   /* End Inhale / Start Hold */
            50% { transform: scale(2.5); }   /* End Hold / Start Exhale */
            75% { transform: scale(1); }     /* End Exhale / Start Hold */
            100% { transform: scale(1); }    /* End Hold / Loop */
          }
        `}</style>
      </main>
    </div>
  );
}
