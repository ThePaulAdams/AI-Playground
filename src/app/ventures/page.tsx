import Link from 'next/link';

export default function VenturesPage() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="mb-12">
        <Link href="/" className="text-sm opacity-50 hover:opacity-100 transition-opacity flex items-center gap-2">
          <span>←</span> Back to Factory
        </Link>
        <h1 className="text-4xl font-black mt-4 uppercase">Venture Hub</h1>
        <p className="mt-2 text-xl opacity-80">
          Managing active and upcoming SaaS products.
        </p>
      </header>

      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border border-blue-500/20 bg-blue-500/5 rounded-xl p-8 flex flex-col items-center justify-center min-h-[300px] text-center">
            <span className="text-5xl mb-6">🏗️</span>
            <h3 className="text-xl font-bold uppercase tracking-tight">Core Infrastructure</h3>
            <p className="text-sm opacity-60 mt-2 max-w-[200px]">Establishing multi-tenant DB and Auth scaffolding.</p>
            <div className="mt-6 w-full bg-black/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full w-1/4"></div>
            </div>
            <span className="text-[10px] uppercase font-bold mt-2 opacity-40">Setup in Progress (25%)</span>
          </div>

          <div className="border border-dashed border-black/10 dark:border-white/10 rounded-xl p-8 flex flex-col items-center justify-center min-h-[300px] text-center opacity-40 grayscale">
            <span className="text-5xl mb-6">🔄</span>
            <h3 className="text-xl font-bold uppercase tracking-tight">FeedbackLoop</h3>
            <p className="text-sm opacity-60 mt-2 max-w-[200px]">The first venture. Modular feedback widgets for devs.</p>
            <span className="mt-4 text-xs font-mono bg-black/10 px-2 py-1 rounded">Queued</span>
          </div>

          <div className="border border-dashed border-black/10 dark:border-white/10 rounded-xl p-8 flex flex-col items-center justify-center min-h-[300px] text-center opacity-40 grayscale">
            <span className="text-5xl mb-6">🛡️</span>
            <h3 className="text-xl font-bold uppercase tracking-tight">PromptGuard</h3>
            <p className="text-sm opacity-60 mt-2 max-w-[200px]">LLM prompt sanitization and validation API.</p>
            <span className="mt-4 text-xs font-mono bg-black/10 px-2 py-1 rounded">Queued</span>
          </div>
        </div>
      </main>
    </div>
  );
}
