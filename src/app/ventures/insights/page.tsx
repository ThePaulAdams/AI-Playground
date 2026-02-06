import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { formatRelativeTime, calculateNPS, calculateSentiment } from '@/lib/utils'
import { BarChart3, MessageSquare, Star, TrendingUp, Heart, Smile, Meh, Frown } from 'lucide-react'

export default async function InsightsPage() {
  const { userId } = await auth()

  if (!userId) return notFound()

  const feedbacks = await prisma.feedback.findMany({
    where: {
      venture: {
        userId
      }
    },
    include: {
      venture: true
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 50
  })

  const stats = await prisma.feedback.groupBy({
    by: ['rating'],
    where: {
      venture: {
        userId
      }
    },
    _count: true
  })

  const totalFeedbacks = feedbacks.length
  const nps = calculateNPS(feedbacks.map(f => f.rating || 0).filter(r => r > 0))
  const averageRating = totalFeedbacks > 0 
    ? (stats.reduce((acc, s) => acc + (s.rating || 0) * s._count, 0) / totalFeedbacks).toFixed(1)
    : '0.0'

  const ventureCount = await prisma.venture.count({
    where: { userId }
  })

  const sentiment = calculateSentiment(feedbacks)

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] max-w-7xl mx-auto">
      <header className="mb-12">
        <Link href="/ventures" className="text-[10px] font-black uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity flex items-center gap-2">
          <span>←</span> Back to Hub
        </Link>
        <h1 className="text-4xl font-black mt-4 uppercase tracking-tighter flex items-center gap-3">
          <BarChart3 className="text-blue-500" size={32} />
          Global Insights
        </h1>
        <p className="mt-2 text-xl opacity-80">
          Real-time aggregate feedback across all ventures.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
          <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <MessageSquare className="text-blue-500" size={20} />
              </div>
              <span className="text-xs font-black uppercase tracking-widest opacity-40">Total Signals</span>
            </div>
            <div className="text-4xl font-black">{totalFeedbacks}</div>
          </div>

          <div className="p-6 bg-yellow-500/5 border border-yellow-500/10 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <Star className="text-yellow-500" size={20} />
              </div>
              <span className="text-xs font-black uppercase tracking-widest opacity-40">Average Rating</span>
            </div>
            <div className="text-4xl font-black">{averageRating}★</div>
          </div>

          <div className="p-6 bg-green-500/5 border border-green-500/10 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Heart className="text-green-500" size={20} />
              </div>
              <span className="text-xs font-black uppercase tracking-widest opacity-40">NPS Score</span>
            </div>
            <div className="text-4xl font-black">{nps}</div>
          </div>

          <div className="p-6 bg-purple-500/5 border border-purple-500/10 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <TrendingUp className="text-purple-500" size={20} />
              </div>
              <span className="text-xs font-black uppercase tracking-widest opacity-40">Venture Mix</span>
            </div>
            <div className="text-4xl font-black">{ventureCount}</div>
          </div>
        </div>

        {/* Global Sentiment Summary */}
        <div className="mt-6 p-1 bg-white/[0.02] border border-white/5 rounded-3xl flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-6 px-8 py-4 border-r border-white/5">
            <div className="flex items-center gap-2">
              <Smile className="text-green-500" size={20} />
              <span className="text-lg font-black">{sentiment.positive}%</span>
              <span className="text-[10px] font-black uppercase opacity-20 tracking-widest">Positive</span>
            </div>
            <div className="flex items-center gap-2">
              <Meh className="text-yellow-500" size={20} />
              <span className="text-lg font-black">{sentiment.neutral}%</span>
              <span className="text-[10px] font-black uppercase opacity-20 tracking-widest">Neutral</span>
            </div>
            <div className="flex items-center gap-2">
              <Frown className="text-red-500" size={20} />
              <span className="text-lg font-black">{sentiment.negative}%</span>
              <span className="text-[10px] font-black uppercase opacity-20 tracking-widest">Negative</span>
            </div>
          </div>
          <div className="flex-1 w-full h-2 md:h-12 flex rounded-2xl overflow-hidden bg-white/5">
            <div className="h-full bg-green-500/40 transition-all border-r border-white/10" style={{ width: `${sentiment.positive}%` }} />
            <div className="h-full bg-yellow-500/40 transition-all border-r border-white/10" style={{ width: `${sentiment.neutral}%` }} />
            <div className="h-full bg-red-500/40 transition-all" style={{ width: `${sentiment.negative}%` }} />
          </div>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xs font-black uppercase tracking-widest opacity-30 mb-6 flex items-center gap-2">
            <Star size={14} />
            Rating Distribution
          </h2>
          {[5, 4, 3, 2, 1].map(rating => {
            const count = stats.find(s => s.rating === rating)?._count || 0
            const total = totalFeedbacks
            const percentage = total > 0 ? (count / total) * 100 : 0
            
            return (
              <div key={rating} className="flex items-center gap-4">
                <span className="text-[10px] font-black w-4">{rating}★</span>
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all" 
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-[10px] font-black opacity-30 w-8 text-right">{count}</span>
              </div>
            )
          })}
        </div>

        <div className="lg:col-span-3">
          <h2 className="text-xs font-black uppercase tracking-widest opacity-30 mb-6 flex items-center gap-2">
            <MessageSquare size={14} />
            Latest Signals
          </h2>
          <div className="space-y-4">
            {feedbacks.length === 0 ? (
              <div className="p-12 border border-dashed border-white/10 rounded-xl text-center opacity-40">
                No signals captured across any ventures yet.
              </div>
            ) : (
              feedbacks.map((f) => (
                <div key={f.id} className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col md:flex-row justify-between gap-4 group hover:bg-white/[0.04] transition-all">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded">
                        {f.venture.name}
                      </span>
                      <span className="text-[10px] font-black opacity-20 uppercase tracking-widest">
                        {formatRelativeTime(f.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm opacity-80 leading-relaxed italic">"{f.content}"</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {f.rating && (
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`w-1.5 h-1.5 rounded-full ${i < f.rating! ? 'bg-blue-500' : 'bg-white/10'}`} 
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

