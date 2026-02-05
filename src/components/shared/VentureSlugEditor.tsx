'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Copy, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export function VentureSlugEditor({ 
  ventureId, 
  initialSlug 
}: { 
  ventureId: string, 
  initialSlug: string 
}) {
  const router = useRouter()
  const [slug, setSlug] = useState(initialSlug)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleUpdate = async () => {
    if (slug === initialSlug) {
      setIsEditing(false)
      return
    }

    if (!slug || slug.length < 3) {
      setError("Slug must be at least 3 characters")
      return
    }

    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/ventures/${ventureId}/config`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      })
      
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to update slug')
      }

      const data = await res.json()
      setIsEditing(false)
      router.push(`/ventures/${data.slug}`)
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(slug)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-2">
      <span className="block text-[10px] font-black uppercase opacity-20 tracking-[0.2em]">Venture Path</span>
      <div className="flex items-center gap-2 group">
        {isEditing ? (
          <div className="flex items-center gap-2 w-full">
            <div className="relative flex-1 max-w-[200px]">
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                disabled={loading}
                className="w-full bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-xs font-mono outline-none focus:border-blue-500/50"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleUpdate()
                  if (e.key === 'Escape') {
                    setSlug(initialSlug)
                    setIsEditing(false)
                  }
                }}
              />
              {error && (
                <div className="absolute top-full left-0 mt-1 flex items-center gap-1 text-[10px] text-red-500 font-bold whitespace-nowrap">
                  <AlertCircle size={10} /> {error}
                </div>
              )}
            </div>
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="p-1.5 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <Check size={14} />
            </button>
            <button
              onClick={() => {
                setSlug(initialSlug)
                setIsEditing(false)
              }}
              className="text-[10px] uppercase font-black opacity-40 hover:opacity-100 px-2"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <code 
              className="bg-white/5 px-3 py-1.5 rounded-lg text-[10px] font-mono border border-white/5 cursor-pointer hover:border-white/20 transition-colors"
              onClick={() => setIsEditing(true)}
            >
              /{slug}
            </code>
            <button 
              onClick={copyToClipboard}
              className="p-1.5 opacity-0 group-hover:opacity-40 hover:opacity-100 transition-all"
            >
              {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="text-[8px] uppercase font-black opacity-0 group-hover:opacity-20 hover:opacity-100 tracking-tighter ml-1"
            >
              Edit Path
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
