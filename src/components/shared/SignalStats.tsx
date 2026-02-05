'use client'

import { Star, MessageSquare, TrendingUp } from 'lucide-react'

interface Signal {
  rating: number | null
}

export function SignalStats({ signals }: { signals: Signal[] }) {
  if (signals.length === 0) return null

  const averageRating = signals.length > 0
    ? (signals.reduce((acc, s) => acc + (s.rating || 0), 0) / signals.length).toFixed(1)
    : "0.0"

  const satisfactionPercent = Math.round((Number(averageRating) / 5) * 100)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl flex flex-col justify-center items-center text-center group hover:bg-white/[0.04] transition-colors">
        <div className="w-10 h-10 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
          <Star size={18} className="text-blue-500" />
        </div>
        <h3 className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-50">Avg Rating</h3>
        <div className="text-2xl font-black uppercase tracking-tighter text-blue-400">{averageRating}</div>
      </div>

      <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl flex flex-col justify-center items-center text-center group hover:bg-white/[0.04] transition-colors">
        <div className="w-10 h-10 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
          <MessageSquare size={18} className="text-purple-500" />
        </div>
        <h3 className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-50">Total Signals</h3>
        <div className="text-2xl font-black uppercase tracking-tighter text-purple-400">{signals.length}</div>
      </div>

      <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl flex flex-col justify-center items-center text-center group hover:bg-white/[0.04] transition-colors">
        <div className="w-10 h-10 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
          <TrendingUp size={18} className="text-emerald-500" />
        </div>
        <h3 className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-50">Satisfaction</h3>
        <div className="text-2xl font-black uppercase tracking-tighter text-emerald-400">{satisfactionPercent}%</div>
      </div>
    </div>
  )
}
