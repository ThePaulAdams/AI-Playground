'use client'

import { useState } from 'react'
import { Star, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function FeedbackWidget({ ventureId }: { ventureId: string }) {
  const [content, setContent] = useState('')
  const [rating, setRating] = useState(5)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [hoveredRating, setHoveredRating] = useState<number | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return
    setStatus('loading')

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ventureId, content, rating, email }),
      })

      if (!res.ok) throw new Error()
      setStatus('success')
      setContent('')
      setEmail('')
      setRating(5)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="p-8 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center animate-in fade-in zoom-in duration-300">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="text-emerald-500 w-12 h-12" />
        </div>
        <p className="text-emerald-400 font-black uppercase tracking-tight text-lg">Feedback Received!</p>
        <p className="text-emerald-500/60 text-xs mt-1 mb-6">Your signal has been added to the stream.</p>
        <button 
          onClick={() => setStatus('idle')} 
          className="text-[10px] uppercase font-black bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 px-6 py-2 rounded-full transition-all"
        >
          Send Another
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-5 p-8 bg-white/[0.03] border border-white/10 rounded-3xl shadow-2xl backdrop-blur-sm">
        <div className="flex flex-col gap-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30">Satisfaction Level</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(null)}
                onClick={() => setRating(star)}
                className="relative group outline-none"
              >
                <Star
                  size={24}
                  className={cn(
                    "transition-all duration-200",
                    (hoveredRating !== null ? hoveredRating >= star : rating >= star)
                      ? "fill-blue-500 text-blue-500 scale-110 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                      : "text-white/10"
                  )}
                />
              </button>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30">Your Message</label>
          <textarea
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 min-h-[120px] transition-all placeholder:text-white/10"
            placeholder="Describe your experience or suggest a feature..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30">Email Address (Optional)</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all placeholder:text-white/10"
            placeholder="howard@starkindustries.com"
          />
        </div>

        <button
          disabled={status === 'loading'}
          className={cn(
            "w-full font-black py-4 rounded-2xl transition-all active:scale-[0.98] text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-2",
            status === 'loading' 
              ? "bg-white/10 text-white/40 cursor-not-allowed" 
              : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20"
          )}
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              Processing...
            </>
          ) : (
            <>
              <Send size={14} />
              Dispatch Feedback
            </>
          )}
        </button>
        
        {status === 'error' && (
          <div className="flex items-center justify-center gap-2 text-red-500 text-[10px] font-black uppercase tracking-widest animate-pulse">
            <AlertCircle size={14} />
            Transmission Failed
          </div>
        )}
      </form>
      
      <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
        <h4 className="text-[9px] font-black uppercase opacity-20 mb-3 tracking-[0.2em]">Universal Integration Snip</h4>
        <div className="relative group">
          <pre className="text-[10px] font-mono bg-black/60 p-4 rounded-xl border border-white/5 overflow-x-auto text-blue-400/80 leading-relaxed">
{`<iframe 
  src="https://factory.paul.dev/embed/${ventureId}" 
  width="100%" 
  height="450" 
  frameborder="0"
></iframe>`}
          </pre>
        </div>
      </div>
    </div>
  )
}
