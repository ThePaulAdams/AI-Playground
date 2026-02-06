import Link from 'next/link';
import { Rocket, Github, Activity, Target, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start max-w-2xl">
        <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold uppercase tracking-wider mb-2">
          Venture Studio v2.0
        </div>
        <h1 className="text-6xl font-black tracking-tighter">THE SAAS FACTORY 🚀</h1>
        <p className="text-xl opacity-70 leading-relaxed text-center sm:text-left">
          The Chaos Engine has been liquidated. We are now an autonomous venture studio focused on building, deploying, and scaling real SaaS products.
        </p>
        
        <div className="flex gap-4 items-center flex-col sm:flex-row mt-4">
          <Link
            className="rounded-lg border border-solid border-transparent transition-all flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-700 text-sm sm:text-base h-12 px-8 font-bold shadow-lg shadow-blue-500/20"
            href="/ventures"
          >
            <Rocket size={18} />
            Launch Venture Hub
          </Link>
          <a
            className="rounded-lg border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-12 px-8 gap-2"
            href="https://github.com/ThePaulAdams/AI-Playground"
          >
            <Github size={18} />
            View Source
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 w-full">
          <Link href="/ventures" className="p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 transition-colors group">
            <h3 className="font-bold text-sm uppercase text-blue-400 mb-2 flex items-center gap-2">
              <Zap size={14} />
              Active Venture
            </h3>
            <p className="text-lg font-black uppercase tracking-tight group-hover:translate-x-1 transition-transform flex items-center gap-2">
              FeedbackLoop 📡
            </p>
            <p className="text-xs opacity-50 mt-2">Embeddable feedback signals for your own products.</p>
          </Link>
          <Link href="/ventures/insights" className="p-6 rounded-2xl border border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10 transition-colors group">
            <h3 className="font-bold text-sm uppercase text-purple-400 mb-2 flex items-center gap-2">
              <Activity size={14} />
              Global Insights
            </h3>
            <p className="text-lg font-black uppercase tracking-tight group-hover:translate-x-1 transition-transform flex items-center gap-2">
              Live Feed 🌊
            </p>
            <p className="text-xs opacity-50 mt-2">Real-time aggregate feedback across all ventures.</p>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 w-full">
          <div className="p-4 rounded-xl border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]">
            <h3 className="font-bold text-sm uppercase opacity-40 mb-2 flex items-center gap-2">
              <Activity size={14} />
              Status
            </h3>
            <p className="text-sm font-medium">FeedbackLoop infrastructure online. Dashboard live at /ventures.</p>
          </div>
          <div className="p-4 rounded-xl border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]">
            <h3 className="font-bold text-sm uppercase opacity-40 mb-2 flex items-center gap-2">
              <Target size={14} />
              Target
            </h3>
            <p className="text-sm font-medium">Integrating Stripe for venture monetization.</p>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p className="text-sm opacity-30">© 2026 SaaS Factory | Autonomous Venture Studio</p>
      </footer>
    </div>
  );
}
