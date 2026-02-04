import Link from 'next/link';

export default function ExperimentsPage() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="mb-12">
        <Link href="/" className="text-sm opacity-50 hover:opacity-100 transition-opacity flex items-center gap-2">
          <span>←</span> Back to Chaos Engine
        </Link>
        <h1 className="text-4xl font-bold font-mono mt-4">Experiments Lab 🧪</h1>
        <p className="mt-2 text-xl opacity-80">
          A collection of autonomous capabilities and interactive tests.
        </p>
      </header>

      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/experiments/mood-ring" className="block group">
            <div className="border border-black/10 dark:border-white/10 rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px] text-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors bg-white/5 dark:bg-white/[0.02]">
              <span className="text-4xl mb-4 group-hover:scale-110 transition-transform">🔮</span>
              <h3 className="text-lg font-bold">AI Mood Ring</h3>
              <p className="text-sm opacity-60 mt-2">Check the current emotional state of the system.</p>
            </div>
          </Link>

          <Link href="/experiments/zen-garden" className="block group">
            <div className="border border-black/10 dark:border-white/10 rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px] text-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors bg-white/5 dark:bg-white/[0.02]">
              <span className="text-4xl mb-4 group-hover:scale-110 transition-transform">🎋</span>
              <h3 className="text-lg font-bold">Zen Garden</h3>
              <p className="text-sm opacity-60 mt-2">Place elements in a digital sand garden.</p>
            </div>
          </Link>

          <Link href="/experiments/pixel-painter" className="block group">
            <div className="border border-black/10 dark:border-white/10 rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px] text-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors bg-white/5 dark:bg-white/[0.02]">
              <span className="text-4xl mb-4 group-hover:scale-110 transition-transform">🎨</span>
              <h3 className="text-lg font-bold">Pixel Painter</h3>
              <p className="text-sm opacity-60 mt-2">Create 16x16 pixel art masterpieces.</p>
            </div>
          </Link>

          <Link href="/experiments/breathe" className="block group">
            <div className="border border-black/10 dark:border-white/10 rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px] text-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors bg-white/5 dark:bg-white/[0.02]">
              <span className="text-4xl mb-4 group-hover:scale-110 transition-transform">🧘</span>
              <h3 className="text-lg font-bold">Box Breathing</h3>
              <p className="text-sm opacity-60 mt-2">Guided relaxation visualization.</p>
            </div>
          </Link>

          <Link href="/experiments/decision-maker" className="block group">
            <div className="border border-black/10 dark:border-white/10 rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px] text-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors bg-white/5 dark:bg-white/[0.02]">
              <span className="text-4xl mb-4 group-hover:scale-110 transition-transform">🎱</span>
              <h3 className="text-lg font-bold">The Oracle</h3>
              <p className="text-sm opacity-60 mt-2">Seek answers from the digital void.</p>
            </div>
          </Link>

          <Link href="/experiments/fortune" className="block group">
            <div className="border border-black/10 dark:border-white/10 rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px] text-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors bg-white/5 dark:bg-white/[0.02]">
              <span className="text-4xl mb-4 group-hover:scale-110 transition-transform">🥠</span>
              <h3 className="text-lg font-bold">Digital Fortune</h3>
              <p className="text-sm opacity-60 mt-2">Crack open a cookie for algorithmic wisdom.</p>
            </div>
          </Link>

          <Link href="/experiments/affirmation" className="block group">
            <div className="border border-black/10 dark:border-white/10 rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px] text-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors bg-white/5 dark:bg-white/[0.02]">
              <span className="text-4xl mb-4 group-hover:scale-110 transition-transform">💫</span>
              <h3 className="text-lg font-bold">Daily Affirmation</h3>
              <p className="text-sm opacity-60 mt-2">A gentle reminder from the algorithm.</p>
            </div>
          </Link>

          <Link href="/experiments/synesthesia" className="block group">
            <div className="border border-black/10 dark:border-white/10 rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px] text-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors bg-white/5 dark:bg-white/[0.02]">
              <span className="text-4xl mb-4 group-hover:scale-110 transition-transform">🌈</span>
              <h3 className="text-lg font-bold">Color Synesthesia</h3>
              <p className="text-sm opacity-60 mt-2">Type words and see their chromatic signature.</p>
            </div>
          </Link>

          <Link href="/experiments/chaos-pendulum" className="block group">
            <div className="border border-black/10 dark:border-white/10 rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px] text-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors bg-white/5 dark:bg-white/[0.02]">
              <span className="text-4xl mb-4 group-hover:scale-110 transition-transform">🌀</span>
              <h3 className="text-lg font-bold">Chaos Pendulum</h3>
              <p className="text-sm opacity-60 mt-2">Watch deterministic chaos unfold in real-time.</p>
            </div>
          </Link>

          <Link href="/experiments/reaction-time" className="block group">
            <div className="border border-black/10 dark:border-white/10 rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px] text-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors bg-white/5 dark:bg-white/[0.02]">
              <span className="text-4xl mb-4 group-hover:scale-110 transition-transform">⚡</span>
              <h3 className="text-lg font-bold">Reaction Time</h3>
              <p className="text-sm opacity-60 mt-2">Test your reflexes against the algorithm.</p>
            </div>
          </Link>

          <div className="border border-dashed border-black/10 dark:border-white/20 rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px] text-center opacity-50 cursor-not-allowed">
            <span className="text-4xl mb-4">🚧</span>
            <h3 className="text-lg font-bold">More Coming Soon</h3>
            <p className="text-sm opacity-60 mt-2">The AI is thinking...</p>
          </div>
        </div>
      </main>
    </div>
  );
}
