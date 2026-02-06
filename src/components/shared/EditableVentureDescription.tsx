'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Edit2, X } from 'lucide-react'

export function EditableVentureDescription({ 
  ventureId, 
  initialDescription 
}: { 
  ventureId: string, 
  initialDescription: string 
}) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [description, setDescription] = useState(initialDescription)
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/ventures/${ventureId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      })
      if (!res.ok) throw new Error()
      setIsEditing(false)
      router.refresh()
    } catch {
      alert('Failed to update description.')
    } finally {
      setLoading(false)
    }
  }

  if (isEditing) {
    return (
      <div className="flex flex-col gap-2 mt-2 w-full max-w-lg">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
          className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500/50 min-h-[80px]"
          placeholder="Enter venture description..."
        />
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => {
              setIsEditing(false)
              setDescription(initialDescription)
            }}
            disabled={loading}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/40 hover:text-white"
          >
            <X size={16} />
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all"
          >
            {loading ? 'Saving...' : (
              <>
                <Check size={14} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div 
      onClick={() => setIsEditing(true)}
      className="group relative cursor-pointer"
    >
      <p className="text-sm opacity-60 line-clamp-2 pr-8">
        {description || "No description set."}
      </p>
      <Edit2 
        size={14} 
        className="absolute right-0 top-0 opacity-0 group-hover:opacity-40 transition-opacity" 
      />
    </div>
  )
}
