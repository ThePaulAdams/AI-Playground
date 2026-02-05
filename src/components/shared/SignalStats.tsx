'use client'

import { Star, MessageSquare, TrendingUp, BarChart3 } from 'lucide-react'

interface Signal {
  rating: number | null
  createdAt: Date | string
}

export function SignalStats({ signals }: { signals: Signal[] }) {
  if (signals.length === 0) return (
    <div className="p-12 border border-dashed border-white/5 rounded-3xl text-center mb-8">
      <div className="inline-flex p-3 bg-white/5 rounded-2xl mb-4">
        <BarChart3 size={24} className="opacity-20" />
      </div>
      <p className="text-[10px] font-black uppercase tracking-widest opacity-30">No signals collected yet.</p>
    </div>
  )

  const ratings = signals.map(s => s.rating).filter((r): r is number => r !== null)
  
  const averageRating = ratings.length > 0
    ? (ratings.reduce((acc, r) => acc + r, 0) / ratings.length).toFixed(1)
    : "0.0"

  const satisfactionPercent = Math.round((Number(averageRating) / 5) * 100)

  // Recent Trend (last 24h vs previous)
  const now = new Date()
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  const fortyEightHoursAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000)
  
  const recentSignals = signals.filter(s => new Date(s.createdAt) > twentyFourHoursAgo).length
  const previousSignals = signals.filter(s => {
    const d = new Date(s.createdAt)
    return d <= twentyFourHoursAgo && d > fortyEightHoursAgo
  }).length

  const signalGrowth = previousSignals === 0 
    ? (recentSignals > 0 ? 100 : 0)
    : Math.round(((recentSignals - previousSignals) / previousSignals) * 100)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl flex flex-col justify-center items-center text-center group hover:bg-white/[0.04] transition-colors relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/20 group-hover:bg-blue-500 transition-colors" />
        <div className="w-10 h-10 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
          <Star size={18} className="text-blue-500" />
        </div>
        <h3 className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-50">Avg Rating</h3>
        <div className="text-2xl font-black uppercase tracking-tighter text-blue-400">{averageRating}</div>
      </div>

      <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl flex flex-col justify-center items-center text-center group hover:bg-white/[0.04] transition-colors relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-purple-500/20 group-hover:bg-purple-500 transition-colors" />
        <div className="w-10 h-10 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
          <MessageSquare size={18} className="text-purple-500" />
        </div>
        <h3 className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-50">Total Signals</h3>
        <div className="text-2xl font-black uppercase tracking-tighter text-purple-400">{signals.length}</div>
        <div className="mt-1 flex items-center gap-1.5">
          {recentSignals > 0 && (
            <div className="text-[8px] font-black text-purple-500/60 uppercase">+{recentSignals} in 24h</div>
          )}
          {signalGrowth !== 0 && (
            <div className={cn(
              "text-[8px] font-black uppercase px-1.5 py-0.5 rounded-md",
              signalGrowth > 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
            )}>
              {signalGrowth > 0 ? '↑' : '↓'} {Math.abs(signalGrowth)}%
            </div>
          )}
        </div>
      </div>

      <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl flex flex-col justify-center items-center text-center group hover:bg-white/[0.04] transition-colors relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/20 group-hover:bg-emerald-500 transition-colors" />
        <div className="w-10 h-10 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
          <TrendingUp size={18} className="text-emerald-500" />
        </div>
        <h3 className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-50">Satisfaction</h3>
        <div className="text-2xl font-black uppercase tracking-tighter text-emerald-400">{satisfactionPercent}%</div>
      </div>
    </div>
  )
}
