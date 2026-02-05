import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Activity, Star, Users, MessageSquare } from 'lucide-react'

export default async function InsightsPage() {
  const { userId } = await auth()

  if (!userId) return notFound()

  const ventures = await prisma.venture.findMany({
    where: { userId },
    include: {
      feedbacks: {
        orderBy: { createdAt: 'desc' }
      }
    }
  })

  // Calculate Aggregates
  const totalFeedbacks = ventures.reduce((acc, v) => acc + v.feedbacks.length, 0)
  
  const allRatings = ventures.flatMap(v => v.feedbacks.map(f => f.rating).filter(r => r !== null)) as number[]
  const globalAverage = allRatings.length > 0 
    ? (allRatings.reduce((acc, r) => acc + r, 0) / allRatings.length).toFixed(1)
    : "0.0"

  const latestFeedbacks = ventures
    .flatMap(v => v.feedbacks.map(f => ({ ...f, ventureName: v.name })))
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 10)

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] max-w-7xl mx-auto">
      <header className="mb-12">
        <Link href="/ventures" className="text-[10px] font-black uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity flex items-center gap-2">
          <span>←</span> Venture Hub
        </Link>
        <h1 className="text-4xl font-black mt-4 uppercase tracking-tighter">Factory Insights</h1>
        <p className="mt-2 text-xl opacity-60">
          Global performance across your entire SaaS portfolio.
        </p>
      </header>

      <main className="space-y-12">
        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
            <div className="flex items-center gap-2 mb-2 opacity-30">
              <Activity size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">Active Ventures</span>
            </div>
            <div className="text-3xl font-black">{ventures.length}</div>
          </div>
          <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
            <div className="flex items-center gap-2 mb-2 opacity-30">
              <MessageSquare size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">Total Signals</span>
            </div>
            <div className="text-3xl font-black">{totalFeedbacks}</div>
          </div>
          <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
            <div className="flex items-center gap-2 mb-2 opacity-30">
              <Star size={14} className="text-blue-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">Global Rating</span>
            </div>
            <div className="text-3xl font-black text-blue-500">{globalAverage}</div>
          </div>
          <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
            <div className="flex items-center gap-2 mb-2 opacity-30">
              <Users size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">Reach</span>
            </div>
            <div className="text-3xl font-black">--</div>
          </div>
        </section>

        {/* Global Stream */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] opacity-30">Global Signal Stream</h2>
            <div className="space-y-4">
              {latestFeedbacks.length === 0 ? (
                <div className="p-20 border border-dashed border-white/5 rounded-3xl text-center opacity-20 text-xs font-black uppercase tracking-widest">
                  No signals detected in the factory
                </div>
              ) : (
                latestFeedbacks.map((item) => (
                  <div key={item.id} className="p-6 bg-white/[0.03] rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all group">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black uppercase bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20">
                          {item.ventureName}
                        </span>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <span key={s} className={`text-[8px] ${(item.rating || 0) >= s ? "text-blue-500" : "opacity-10"}`}>✦</span>
                          ))}
                        </div>
                      </div>
                      <span className="text-[10px] opacity-20 font-mono">
                        {item.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm opacity-70 leading-relaxed">{item.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] opacity-30">Venture Leaderboard</h2>
            <div className="space-y-2">
              {ventures.sort((a, b) => b.feedbacks.length - a.feedbacks.length).map((v) => (
                <div key={v.id} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                  <div className="flex flex-col">
                    <span className="text-xs font-black uppercase tracking-tight">{v.name}</span>
                    <span className="text-[9px] opacity-30 uppercase tracking-widest">{v.status}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-black">{v.feedbacks.length}</div>
                    <div className="text-[8px] opacity-30 uppercase">signals</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
