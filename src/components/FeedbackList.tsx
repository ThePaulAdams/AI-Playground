'use client'

import { useState } from 'react'
import { Filter, Trash2, Search, Calendar, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Feedback {
  id: string
  content: string
  rating: number | null
  createdAt: string
  email?: string | null
}

export function FeedbackList({ initialFeedback, ventureId }: { initialFeedback: Feedback[], ventureId: string }) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(initialFeedback)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [ratingFilter, setRatingFilter] = useState<number | null>(null)

  const refreshFeedback = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/feedback?ventureId=${ventureId}`)
      if (res.ok) {
        const data = await res.json()
        setFeedbacks(data)
      }
    } catch (err) {
      console.error('Failed to fetch feedback:', err)
    } finally {
      setLoading(false)
    }
  }

  const deleteFeedback = async (id: string) => {
    if (!confirm('Are you sure you want to delete this signal?')) return
    
    try {
      const res = await fetch(`/api/feedback/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setFeedbacks(feedbacks.filter(f => f.id !== id))
      }
    } catch (err) {
      console.error('Failed to delete feedback:', err)
    }
  }

  const filteredFeedbacks = feedbacks.filter(f => {
    const matchesSearch = f.content.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (f.email?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
    const matchesRating = ratingFilter === null || f.rating === ratingFilter
    return matchesSearch && matchesRating
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl font-bold uppercase tracking-tight">Recent Signals</h2>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-20" size={14} />
            <input 
              type="text" 
              placeholder="Search signals..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-blue-500/50 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={refreshFeedback}
            disabled={loading}
            className="text-[10px] font-black uppercase px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all active:scale-95 shadow-lg shadow-blue-500/10"
          >
            {loading ? 'Polling...' : 'Refresh'}
          </button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button 
          onClick={() => setRatingFilter(null)}
          className={cn(
            "px-3 py-1.5 rounded-full text-[10px] font-black uppercase transition-all whitespace-nowrap border",
            ratingFilter === null ? "bg-white text-black border-white" : "bg-white/5 border-white/5 opacity-50 hover:opacity-100"
          )}
        >
          All Signals
        </button>
        {[5, 4, 3, 2, 1].map(r => (
          <button 
            key={r}
            onClick={() => setRatingFilter(r)}
            className={cn(
              "px-3 py-1.5 rounded-full text-[10px] font-black uppercase transition-all whitespace-nowrap border flex items-center gap-1.5",
              ratingFilter === r ? "bg-blue-600 text-white border-blue-600" : "bg-white/5 border-white/5 opacity-50 hover:opacity-100"
            )}
          >
            {r} <Star size={10} fill={ratingFilter === r ? "currentColor" : "none"} />
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filteredFeedbacks.length === 0 ? (
          <div className="p-20 border border-dashed border-white/5 rounded-3xl text-center">
            <Filter className="mx-auto mb-4 opacity-10" size={32} />
            <p className="text-[10px] font-black uppercase tracking-widest opacity-30">
              {searchTerm || ratingFilter ? 'No signals match your filters.' : 'No signals received yet.'}
            </p>
          </div>
        ) : (
          filteredFeedbacks.map((item) => (
            <div key={item.id} className="group relative p-6 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.04] transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star 
                        key={s} 
                        size={12} 
                        className={cn(
                          (item.rating || 0) >= s ? "text-blue-500 fill-blue-500" : "text-white/10"
                        )}
                      />
                    ))}
                  </div>
                  {item.email && (
                    <span className="text-[10px] font-black uppercase opacity-30 bg-white/5 px-2 py-0.5 rounded-md">
                      {item.email}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-medium opacity-20 flex items-center gap-1.5">
                    <Calendar size={10} />
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                  <button 
                    onClick={() => deleteFeedback(item.id)}
                    className="opacity-0 group-hover:opacity-100 text-red-500/50 hover:text-red-500 transition-all p-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <p className="text-sm opacity-80 leading-relaxed font-medium">
                "{item.content}"
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
