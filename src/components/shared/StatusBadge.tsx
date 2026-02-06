'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

const STATUSES = [
  { id: 'DRAFT', color: 'blue' },
  { id: 'LIVE', color: 'green' },
  { id: 'MAINTENANCE', color: 'yellow' },
  { id: 'LIQUIDATED', color: 'red' }
]

export function StatusBadge({ 
  ventureId, 
  currentStatus 
}: { 
  ventureId: string, 
  currentStatus: string 
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const updateStatus = async (status: string) => {
    setLoading(true)
    try {
      await fetch(`/api/ventures/${ventureId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  const getActiveStyles = (color: string) => {
    switch (color) {
      case 'green': return "bg-green-500/20 text-green-400 border-green-500/20"
      case 'yellow': return "bg-yellow-500/20 text-yellow-400 border-yellow-500/20"
      case 'red': return "bg-red-500/20 text-red-400 border-red-500/20"
      default: return "bg-blue-500/20 text-blue-400 border-blue-500/20"
    }
  }

  return (
    <div className="flex gap-2">
      {STATUSES.map((s) => (
        <button
          key={s.id}
          onClick={() => updateStatus(s.id)}
          disabled={loading || currentStatus === s.id}
          className={cn(
            "text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-widest transition-all",
            currentStatus === s.id 
              ? getActiveStyles(s.color)
              : "bg-white/5 text-white/20 border-transparent hover:border-white/10 hover:text-white/40"
          )}
        >
          {s.id}
        </button>
      ))}
    </div>
  )
}
