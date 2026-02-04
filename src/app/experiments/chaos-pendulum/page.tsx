'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, useCallback } from 'react';

interface PendulumState {
  a1: number;
  a2: number;
  v1: number;
  v2: number;
}

export default function ChaosPendulumPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<PendulumState>({ a1: Math.PI / 2, a2: Math.PI / 2, v1: 0, v2: 0 });
  const trailRef = useRef<{x: number, y: number}[]>([]);
  const animationRef = useRef<number | null>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [showTrail, setShowTrail] = useState(true);
  const [trailHue, setTrailHue] = useState(0);

  const reset = useCallback(() => {
    stateRef.current = {
      a1: Math.PI / 2 + (Math.random() - 0.5) * 0.1,
      a2: Math.PI / 2 + (Math.random() - 0.5) * 0.1,
      v1: 0,
      v2: 0
    };
    trailRef.current = [];
    setTrailHue(Math.random() * 360);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const L1 = 120;
    const L2 = 120;
    const M1 = 10;
    const M2 = 10;
    const G = 1;
    const damping = 0.9999;

    const resizeCanvas = () => {
      const size = Math.min(window.innerWidth - 64, 500);
      canvas.width = size;
      canvas.height = size;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let lastTime = performance.now();

    const simulate = (currentTime: number) => {
      if (!isRunning) {
        animationRef.current = requestAnimationFrame(simulate);
        return;
      }

      const dt = Math.min((currentTime - lastTime) / 1000, 0.05) * 2;
      lastTime = currentTime;

      const { a1, a2, v1, v2 } = stateRef.current;

      // Double pendulum physics
      const num1 = -G * (2 * M1 + M2) * Math.sin(a1);
      const num2 = -M2 * G * Math.sin(a1 - 2 * a2);
      const num3 = -2 * Math.sin(a1 - a2) * M2;
      const num4 = v2 * v2 * L2 + v1 * v1 * L1 * Math.cos(a1 - a2);
      const den1 = L1 * (2 * M1 + M2 - M2 * Math.cos(2 * a1 - 2 * a2));
      const acc1 = (num1 + num2 + num3 * num4) / den1;

      const num5 = 2 * Math.sin(a1 - a2);
      const num6 = v1 * v1 * L1 * (M1 + M2);
      const num7 = G * (M1 + M2) * Math.cos(a1);
      const num8 = v2 * v2 * L2 * M2 * Math.cos(a1 - a2);
      const den2 = L2 * (2 * M1 + M2 - M2 * Math.cos(2 * a1 - 2 * a2));
      const acc2 = (num5 * (num6 + num7 + num8)) / den2;

      stateRef.current = {
        a1: a1 + v1 * dt,
        a2: a2 + v2 * dt,
        v1: (v1 + acc1 * dt) * damping,
        v2: (v2 + acc2 * dt) * damping
      };

      // Calculate positions
      const cx = canvas.width / 2;
      const cy = canvas.height / 2 - 50;
      const x1 = cx + L1 * Math.sin(stateRef.current.a1);
      const y1 = cy + L1 * Math.cos(stateRef.current.a1);
      const x2 = x1 + L2 * Math.sin(stateRef.current.a2);
      const y2 = y1 + L2 * Math.cos(stateRef.current.a2);

      // Store trail
      if (showTrail) {
        trailRef.current.push({ x: x2, y: y2 });
        if (trailRef.current.length > 500) trailRef.current.shift();
      }

      // Draw
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw trail
      if (showTrail && trailRef.current.length > 1) {
        ctx.beginPath();
        ctx.moveTo(trailRef.current[0].x, trailRef.current[0].y);
        for (let i = 1; i < trailRef.current.length; i++) {
          ctx.lineTo(trailRef.current[i].x, trailRef.current[i].y);
        }
        ctx.strokeStyle = `hsla(${trailHue}, 80%, 60%, 0.6)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Draw pivot
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#666';
      ctx.fill();

      // Draw arms
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw masses
      ctx.beginPath();
      ctx.arc(x1, y1, 12, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${trailHue}, 70%, 50%)`;
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x2, y2, 12, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${(trailHue + 60) % 360}, 70%, 50%)`;
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();

      animationRef.current = requestAnimationFrame(simulate);
    };

    animationRef.current = requestAnimationFrame(simulate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isRunning, showTrail, trailHue]);

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] flex flex-col items-center">
      <header className="w-full max-w-lg mb-8">
        <Link href="/experiments" className="text-sm opacity-50 hover:opacity-100 transition-opacity flex items-center gap-2">
          <span>←</span> Back to Experiments
        </Link>
        <h1 className="text-3xl font-bold font-mono mt-4">Chaos Pendulum 🌀</h1>
        <p className="mt-2 opacity-70">
          A double pendulum — where tiny differences create wildly different futures.
        </p>
      </header>

      <main className="flex flex-col items-center gap-6">
        <canvas
          ref={canvasRef}
          className="rounded-xl border border-white/10 bg-black"
        />

        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors font-mono text-sm"
          >
            {isRunning ? '⏸ Pause' : '▶ Play'}
          </button>
          <button
            onClick={reset}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors font-mono text-sm"
          >
            🔄 Reset
          </button>
          <button
            onClick={() => {
              setShowTrail(!showTrail);
              if (!showTrail) trailRef.current = [];
            }}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors font-mono text-sm"
          >
            {showTrail ? '✨ Trail On' : '✨ Trail Off'}
          </button>
        </div>

        <p className="text-center text-sm opacity-50 max-w-md mt-4">
          The double pendulum is a classic example of deterministic chaos. 
          Even the smallest change in starting conditions leads to completely 
          unpredictable motion over time.
        </p>
      </main>
    </div>
  );
}
