import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { DeleteVentureButton } from '@/components/shared/DeleteVentureButton'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { EditableHeader } from '@/components/shared/EditableHeader'
import { IntegrationSnippet } from '@/components/shared/Integrations'
import { ExternalLink, Terminal, BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'

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

  const averageRating = venture.feedbacks.length > 0 
    ? (venture.feedbacks.reduce((acc, f) => acc + (f.rating || 0), 0) / venture.feedbacks.length).toFixed(1)
    : "N/A"

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] max-w-7xl mx-auto">
      <header className="mb-12">
        <Link href="/ventures" className="text-[10px] font-black uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity flex items-center gap-2">
          <span>←</span> Venture Hub
        </Link>
        <div className="flex justify-between items-end mt-6 border-b border-white/5 pb-8">
          <div className="flex-1 mr-8">
            <div className="flex items-center gap-3 mb-2">
              <StatusBadge ventureId={venture.id} currentStatus={venture.status} />
            </div>
            <EditableHeader ventureId={venture.id} initialName={venture.name} initialDescription={venture.description} />
          </div>
          <div className="text-right space-y-4">
            <div>
              <span className="block text-[10px] font-black uppercase opacity-20 mb-1 tracking-[0.2em]">Venture Identity</span>
              <code className="bg-white/5 px-3 py-1.5 rounded-lg text-[10px] font-mono border border-white/5">{venture.id}</code>
            </div>
            <DeleteVentureButton ventureId={venture.id} />
          </div>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-black uppercase tracking-[0.3em] opacity-30">Feedback Stream</h2>
              <div className="text-[10px] font-bold opacity-20">{venture.feedbacks.length} Total Signals</div>
            </div>
            
            {venture.feedbacks.length === 0 ? (
              <div className="p-20 border border-dashed border-white/5 rounded-3xl text-center opacity-20">
                <div className="text-4xl mb-4 text-white/50">📡</div>
                <div className="text-xs font-black uppercase tracking-widest">Awaiting first signal</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {venture.feedbacks.map((item) => (
                  <div key={item.id} className="p-8 bg-white/[0.03] rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <span key={s} className={cn("text-xs", (item.rating || 0) >= s ? "text-blue-500" : "opacity-10")}>✦</span>
                          ))}
                        </div>
                        {item.email && <span className="text-[10px] font-mono opacity-30 group-hover:opacity-100 transition-opacity">{item.email}</span>}
                      </div>
                      <span className="text-[10px] opacity-20 uppercase font-mono tracking-tighter">
                        {item.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed opacity-80">{item.content}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <div className="space-y-12">
          <section className="bg-blue-600/10 rounded-3xl border border-blue-500/20 p-8">
            <div className="flex items-center gap-2 mb-6">
              <Terminal size={16} className="text-blue-400" />
              <h3 className="text-xs font-black uppercase tracking-widest text-blue-400">Implementation</h3>
            </div>
            <p className="text-xs opacity-60 mb-6 leading-relaxed">Embed this capability into any external application using the standardized FeedbackLoop API.</p>
            
            <IntegrationSnippet id={venture.id} />

            <Link 
              href={`/ventures/${slug}/test`}
              className="mt-8 flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl transition-all active:scale-95 text-[10px] uppercase tracking-widest shadow-xl shadow-blue-500/20"
            >
              Test Live Widget <ExternalLink size={12} />
            </Link>
          </section>
          
          <section className="bg-white/[0.02] rounded-3xl border border-white/5 p-8 flex flex-col justify-center items-center text-center">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4">
              <BarChart3 size={20} className="text-blue-500" />
            </div>
            <h3 className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-50">Average Rating</h3>
            <div className="text-3xl font-black uppercase tracking-tighter mb-1">{averageRating}</div>
            <p className="text-[10px] italic opacity-30">from {venture.feedbacks.length} signals</p>
          </section>
        </div>
      </main>
    </div>
  )
}
