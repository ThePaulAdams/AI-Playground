import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function VentureDashboardPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { userId } = await auth()
  const { slug } = await params

  if (!userId) {
    return (
      <div className="p-8 text-center">
        <p>Please sign in to view this venture.</p>
        <Link href="/ventures" className="text-blue-500 underline">Back to Ventures</Link>
      </div>
    )
  }

  const venture = await prisma.venture.findUnique({
    where: { 
      slug,
      userId // Ensure security: user can only see their own venture
    },
    include: {
      feedbacks: {
        orderBy: { createdAt: 'desc' }
      }
    }
  })

  if (!venture) {
    return notFound()
  }

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="mb-12">
        <Link href="/ventures" className="text-sm opacity-50 hover:opacity-100 transition-opacity flex items-center gap-2">
          <span>←</span> Back to Hub
        </Link>
        <div className="flex justify-between items-end mt-4">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter">{venture.name}</h1>
            <p className="mt-2 text-xl opacity-80">{venture.description}</p>
          </div>
          <div className="flex gap-2">
            <span className="text-xs font-bold px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/20 uppercase tracking-widest">
              {venture.status}
            </span>
          </div>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold mb-4 uppercase tracking-tight">Recent Feedback</h2>
          <div className="space-y-4">
            {venture.feedbacks.length === 0 ? (
              <div className="p-12 border border-dashed border-white/10 rounded-xl text-center opacity-40">
                No feedback received yet.
              </div>
            ) : (
              venture.feedbacks.map((f) => (
                <div key={f.id} className="p-6 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex gap-2">
                      {f.rating && (
                        <span className="bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded text-[10px] font-bold">
                          ★ {f.rating}
                        </span>
                      )}
                      <span className="text-[10px] opacity-40 font-mono">
                        {new Date(f.createdAt).toLocaleString()}
                      </span>
                    </div>
                    {f.email && <span className="text-[10px] opacity-40 italic">{f.email}</span>}
                  </div>
                  <p className="text-sm leading-relaxed opacity-90">{f.content}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-4 uppercase tracking-tight">Integration</h2>
            <div className="p-6 bg-white/5 rounded-xl border border-white/10 space-y-4">
              <p className="text-xs opacity-60">Copy your Venture ID for use in the feedback widget:</p>
              <code className="block p-3 bg-black/40 rounded border border-white/10 text-xs font-mono break-all text-blue-400">
                {venture.id}
              </code>
              <button 
                className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-2 rounded-lg transition-colors text-xs uppercase"
                onClick={() => {
                  // In a real app we'd use navigator.clipboard
                }}
              >
                Copy ID
              </button>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 uppercase tracking-tight">Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <span className="block text-[10px] opacity-40 uppercase font-bold">Total</span>
                <span className="text-2xl font-black">{venture.feedbacks.length}</span>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <span className="block text-[10px] opacity-40 uppercase font-bold">Avg Rating</span>
                <span className="text-2xl font-black">
                  {venture.feedbacks.length > 0 
                    ? (venture.feedbacks.reduce((acc, curr) => acc + (curr.rating || 0), 0) / venture.feedbacks.length).toFixed(1)
                    : '-'}
                </span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
