import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { DeleteVentureButton } from '@/components/shared/DeleteVentureButton'

export default async function VentureDetailsPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { userId } = await auth()
  const { slug } = await params

  if (!userId) return notFound()

  const venture = await prisma.venture.findFirst({
    where: {
      slug,
      userId
    },
    include: {
      feedbacks: {
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  })

  if (!venture) return notFound()

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="mb-12">
        <Link href="/ventures" className="text-sm opacity-50 hover:opacity-100 transition-opacity flex items-center gap-2">
          <span>←</span> Back to Venture Hub
        </Link>
        <div className="flex justify-between items-end mt-4">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter">{venture.name}</h1>
            <p className="mt-2 text-xl opacity-60 max-w-xl">{venture.description}</p>
          </div>
          <div className="text-right">
            <span className="block text-[10px] font-bold uppercase opacity-40 mb-1">Venture ID</span>
            <code className="bg-white/5 px-2 py-1 rounded text-xs font-mono">{venture.id}</code>
            <div className="mt-4">
              <DeleteVentureButton ventureId={venture.id} />
            </div>
          </div>
        </div>
      </header>

      <main className="space-y-8">
        <section className="bg-white/5 rounded-2xl border border-white/10 p-8">
          <h2 className="text-xl font-black uppercase tracking-tight mb-6">Feedback Feed</h2>
          
          {venture.feedbacks.length === 0 ? (
            <div className="p-12 border border-dashed border-white/10 rounded-xl text-center opacity-40">
              No feedback collected yet for this venture.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {venture.feedbacks.map((item) => (
                <div key={item.id} className="p-6 bg-black/20 rounded-xl border border-white/5">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-blue-400">
                        {item.rating ? '⭐'.repeat(item.rating) : 'No Rating'}
                      </span>
                      {item.email && <span className="text-xs opacity-40">— {item.email}</span>}
                    </div>
                    <span className="text-[10px] opacity-30 uppercase font-mono">
                      {item.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">{item.content}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-600/10 rounded-2xl border border-blue-500/20 p-8">
            <h3 className="text-lg font-black uppercase tracking-tight mb-2">Live Testing</h3>
            <p className="text-sm opacity-70 mb-4">View the public feedback widget for this venture.</p>
            <Link 
              href={`/ventures/${slug}/test`}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors text-xs uppercase"
            >
              Launch Test Page
            </Link>
          </div>

          <div className="bg-white/5 rounded-2xl border border-white/10 p-8">
            <h3 className="text-lg font-black uppercase tracking-tight mb-2">Integration Snippet</h3>
            <p className="text-sm opacity-70 mb-4">Use this ID to submit feedback via the API:</p>
            <pre className="bg-black/40 p-4 rounded-lg text-xs font-mono overflow-x-auto border border-white/10">
{`// POST /api/feedback
{
  "ventureId": "${venture.id}",
  "content": "User message here",
  "rating": 5,
  "email": "user@example.com"
}`}
            </pre>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 rounded-2xl border border-white/10 p-8 flex flex-col justify-center items-center text-center opacity-50 grayscale cursor-not-allowed">
            <span className="text-3xl mb-2">📈</span>
            <h3 className="text-lg font-black uppercase tracking-tight">Analytics</h3>
            <p className="text-xs">Coming soon in Phase 3</p>
          </div>
        </section>
      </main>
    </div>
  )
}
