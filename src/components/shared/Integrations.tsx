'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

export function IntegrationSnippet({ id }: { id: string }) {
  const [copied, setCheck] = useState(false)

  const snippet = `// FeedbackLoop Integration
// POST /api/feedback
{
  "ventureId": "${id}",
  "content": "User message here",
  "rating": 5,
  "email": "user@example.com"
}`

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet)
    setCheck(true)
    setTimeout(() => setCheck(false), 2000)
  }

  return (
    <div className="relative group">
      <button 
        onClick={handleCopy}
        className="absolute right-4 top-4 p-2 bg-white/5 rounded-md hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100"
      >
        {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
      </button>
      <pre className="bg-black/40 p-6 rounded-xl text-[11px] font-mono overflow-x-auto border border-white/5 leading-relaxed text-blue-100/60">
        {snippet}
      </pre>
    </div>
  )
}
