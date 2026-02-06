import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { EditableHeader } from '@/components/shared/EditableHeader'
import { IntegrationSnippet } from '@/components/shared/Integrations'
import { FeedbackList } from '@/components/FeedbackList'
import { SignalStats } from '@/components/shared/SignalStats'
import { ExternalLink, Terminal, BarChart3, TrendingUp } from 'lucide-react'
import { formatRelativeTime, formatCompactNumber, calculateNPS } from '@/lib/utils'

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
  
  const ratings = venture.feedbacks.map(f => f.rating).filter((r): r is number => r !== null)
  const nps = calculateNPS(ratings)

  const recentFeedback = venture.feedbacks.slice(0, 5)

  const serializableFeedbacks = venture.feedbacks.map(f => ({
    ...f,
    createdAt: f.createdAt.toISOString()
  }))

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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
              <span className="block text-[10px] font-black uppercase opacity-30 tracking-widest mb-1">Signals</span>
              <span className="text-2xl font-black">{formatCompactNumber(venture.feedbacks.length)}</span>
            </div>
            <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
              <span className="block text-[10px] font-black uppercase opacity-30 tracking-widest mb-1">Avg Rating</span>
              <span className="text-2xl font-black">{averageRating}</span>
            </div>
            <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
              <span className="block text-[10px] font-black uppercase opacity-30 tracking-widest mb-1">Net Promoter (NPS)</span>
              <span className="text-2xl font-black text-orange-400">{nps}</span>
            </div>
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <span className="block text-[10px] font-black uppercase text-blue-400 tracking-widest mb-1">Conversion</span>
              <span className="text-2xl font-black text-blue-400">0%</span>
            </div>
          </div>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <SignalStats signals={venture.feedbacks} />
            <FeedbackList initialFeedback={serializableFeedbacks} ventureId={venture.id} />
          </section>
        </div>

        <div className="space-y-12">
          <section className="bg-emerald-600/10 rounded-3xl border border-emerald-500/20 p-8">
            <div className="flex items-center gap-2 mb-6 text-emerald-400">
              <BarChart3 size={16} />
              <h3 className="text-xs font-black uppercase tracking-widest">Monetization</h3>
            </div>
            <p className="text-xs opacity-60 mb-6 leading-relaxed">Upgrade to FeedbackLoop Pro to unlock custom styling, unlimited signals, and export capabilities.</p>
            
            <Link 
              href="#"
              className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl transition-all active:scale-95 text-[10px] uppercase tracking-widest shadow-xl shadow-emerald-500/20"
            >
              Coming Soon
            </Link>
          </section>

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
          
          {recentFeedback.length > 0 && (
            <section className="bg-white/[0.02] rounded-3xl border border-white/5 p-8">
              <h3 className="text-[10px] font-black uppercase tracking-widest mb-6 opacity-30">Recent Activity</h3>
              <div className="space-y-4">
                {recentFeedback.map((f) => (
                  <div key={f.id} className="text-[10px] border-l-2 border-blue-500/20 pl-3 py-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold opacity-50 uppercase tracking-tighter">{f.email || 'Anonymous'}</span>
                      <span className="opacity-20">{formatRelativeTime(f.createdAt)}</span>
                    </div>
                    <p className="line-clamp-2 opacity-70">{f.content}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  )
}
