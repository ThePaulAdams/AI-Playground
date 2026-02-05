'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function DeleteVentureButton({ ventureId }: { ventureId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Are you sure? This will delete all feedback logs for this venture.')) return
    
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
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-[10px] font-black uppercase text-red-500/40 hover:text-red-500 transition-colors"
    >
      {loading ? 'Deleting...' : 'Liquidate Venture'}
    </button>
  )
}
