'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

const STATUSES = ['DRAFT', 'LIVE', 'MAINTENANCE', 'LIQUIDATED']

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

  return (
    <div className="flex gap-2">
      {STATUSES.map((s) => (
        <button
          key={s}
          onClick={() => updateStatus(s)}
          disabled={loading || currentStatus === s}
          className={cn(
            "text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-widest transition-all",
            currentStatus === s 
              ? "bg-blue-500/20 text-blue-400 border-blue-500/20" 
              : "bg-white/5 text-white/20 border-transparent hover:border-white/10 hover:text-white/40"
          )}
        >
          {s}
        </button>
      ))}
    </div>
  )
}
