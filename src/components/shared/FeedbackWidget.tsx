'use client'

import { useState } from 'react'

export function FeedbackWidget({ ventureId }: { ventureId: string }) {
  const [content, setContent] = useState('')
  const [rating, setRating] = useState(5)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center">
        <p className="text-emerald-400 font-bold">Feedback Sent! 🚀</p>
        <button onClick={() => setStatus('idle')} className="text-xs uppercase font-bold mt-2 opacity-50 hover:opacity-100">Send More</button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white/5 border border-white/10 rounded-xl">
      <div className="flex justify-between items-center">
        <label className="text-xs font-bold uppercase opacity-50">Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-xl transition-transform active:scale-90 ${rating >= star ? 'grayscale-0' : 'grayscale opacity-30'}`}
            >
              ⭐
            </button>
          ))}
        </div>
      </div>
      
      <textarea
        required
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 min-h-[100px]"
        placeholder="What can we improve?"
      />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
        placeholder="Email (optional)"
      />

      <button
        disabled={status === 'loading'}
        className="w-full bg-white text-black font-bold py-2 rounded-lg hover:bg-opacity-90 transition-colors text-sm uppercase tracking-tight"
      >
        {status === 'loading' ? 'Sending...' : 'Submit Feedback'}
      </button>
      {status === 'error' && <p className="text-red-500 text-xs text-center">Failed to send. Try again.</p>}
    </form>
  )
}
