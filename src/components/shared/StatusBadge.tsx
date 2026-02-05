'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface StatusBadgeProps {
  ventureId: string
  currentStatus: string
}

const STATUSES = ['DRAFT', 'ACTIVE', 'PAUSED', 'ARCHIVED']

export function StatusBadge({ ventureId, currentStatus }: StatusBadgeProps) {
  const [status, setStatus] = useState(currentStatus)
  const [isUpdating, setIsUpdating] = useState(false)
  const router = useRouter()

  const toggleStatus = async () => {
    const currentIndex = STATUSES.indexOf(status)
    const nextIndex = (currentIndex + 1) % STATUSES.length
    const nextStatus = STATUSES[nextIndex]

    setIsUpdating(true)
    try {
      const response = await fetch(`/api/ventures/${ventureId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: nextStatus }),
      })

      if (response.ok) {
        setStatus(nextStatus)
        router.refresh()
      }
    } catch (error) {
      console.error('Failed to update status:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <button
      onClick={toggleStatus}
      disabled={isUpdating}
      className={`text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-widest transition-all active:scale-95 ${
        status === 'ACTIVE'
          ? 'bg-green-500/10 text-green-400 border-green-500/20'
          : status === 'PAUSED'
          ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
          : status === 'ARCHIVED'
          ? 'bg-red-500/10 text-red-400 border-red-500/20'
          : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      } ${isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:brightness-125'}`}
    >
      {isUpdating ? '...' : status}
    </button>
  )
}
