'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, AlertTriangle } from 'lucide-react'

export function DeleteVentureButton({ ventureId }: { ventureId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [confirming, setConfirming] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/ventures/${ventureId}`, {
        method: 'DELETE'
      })
      if (!res.ok) throw new Error()
      router.push('/ventures')
      router.refresh()
    } catch {
      alert('Failed to delete venture.')
      setConfirming(false)
    } finally {
      setLoading(false)
    }
  }

  if (confirming) {
    return (
      <div className="flex flex-col gap-2 items-end">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
          <AlertTriangle size={10} />
          Irreversible Action
        </div>
        <div className="flex gap-2">
           <button
            onClick={() => setConfirming(false)}
            disabled={loading}
            className="text-[10px] font-black uppercase text-white/40 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="text-[10px] font-black uppercase text-red-500 hover:scale-105 transition-all flex items-center gap-1"
          >
            {loading ? 'Deleting...' : 'Confirm Liquidation'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="text-[10px] font-black uppercase text-white/20 hover:text-red-500 transition-all flex items-center gap-1.5 group"
    >
      <Trash2 size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
      Liquidate Venture
    </button>
  )
}
