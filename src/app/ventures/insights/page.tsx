import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { formatRelativeTime } from '@/lib/utils'

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

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] max-w-7xl mx-auto">
      <header className="mb-12">
        <Link href="/ventures" className="text-[10px] font-black uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity flex items-center gap-2">
          <span>←</span> Back to Hub
        </Link>
        <h1 className="text-4xl font-black mt-4 uppercase tracking-tighter">Global Insights</h1>
        <p className="mt-2 text-xl opacity-80">
          Real-time aggregate feedback across all ventures.
        </p>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xs font-black uppercase tracking-widest opacity-30 mb-4">Rating Distribution</h2>
          {[5, 4, 3, 2, 1].map(rating => {
            const count = stats.find(s => s.rating === rating)?._count || 0
            const total = stats.reduce((acc, s) => acc + s._count, 0)
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
          <h2 className="text-xs font-black uppercase tracking-widest opacity-30 mb-6">Latest Signals</h2>
          <div className="space-y-4">
            {feedbacks.length === 0 ? (
              <div className="p-12 border border-dashed border-white/10 rounded-xl text-center opacity-40">
                No signals captured across any ventures yet.
              </div>
            ) : (
              feedbacks.map((f) => (
                <div key={f.id} className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col md:flex-row justify-between gap-4">
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
