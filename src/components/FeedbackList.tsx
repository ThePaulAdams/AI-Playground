'use client'

import { useState } from 'react'

interface Feedback {
  id: string
  content: string
  sentiment: string | null
  createdAt: string
}

export function FeedbackList({ initialFeedback, ventureId }: { initialFeedback: Feedback[], ventureId: string }) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(initialFeedback)
  const [loading, setLoading] = useState(false)

  const refreshFeedback = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/ventures/${ventureId}/feedback`)
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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold uppercase tracking-tight">Recent Signals</h2>
        <button 
          onClick={refreshFeedback}
          disabled={loading}
          className="text-[10px] font-black uppercase px-3 py-1 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 disabled:opacity-50"
        >
          {loading ? 'Polling...' : 'Refresh'}
        </button>
      </div>

      <div className="grid gap-3">
        {feedbacks.length === 0 ? (
          <div className="p-8 border border-dashed border-white/5 rounded-xl text-center opacity-30 text-sm">
            No signals received yet.
          </div>
        ) : (
          feedbacks.map((item) => (
            <div key={item.id} className="p-4 bg-white/[0.03] border border-white/5 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                  item.sentiment === 'positive' ? 'bg-green-500/10 text-green-400' :
                  item.sentiment === 'negative' ? 'bg-red-500/10 text-red-400' :
                  'bg-white/5 opacity-50'
                }`}>
                  {item.sentiment || 'Neutral'}
                </span>
                <span className="text-[10px] opacity-30">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm opacity-80 leading-relaxed italic">
                "{item.content}"
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
