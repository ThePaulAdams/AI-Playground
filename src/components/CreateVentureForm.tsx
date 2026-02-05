'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { Trash2 } from 'lucide-react'

export function DeleteVentureButton({ id, name }: { id: string, name: string }) {
  const [loading, setLoading] = useState(false)

  const onDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${name}"? This cannot be undone.`)) return

    setLoading(true)
    try {
      const res = await fetch(`/api/ventures/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      window.location.reload()
    } catch (err) {
      alert('Failed to delete venture')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={onDelete}
      disabled={loading}
      className="p-2 text-white/20 hover:text-red-500 transition-colors disabled:opacity-50"
      title="Delete Venture"
    >
      <Trash2 size={16} />
    </button>
  )
}
