'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, X, Pencil } from 'lucide-react'

interface EditableDescriptionProps {
  ventureId: string
  initialDescription: string
}

export function EditableDescription({ ventureId, initialDescription }: EditableDescriptionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [description, setDescription] = useState(initialDescription)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  const handleSave = async () => {
    if (description === initialDescription) {
      setIsEditing(false)
      return
    }

    setIsSaving(true)
    try {
      const response = await fetch(`/api/ventures/${ventureId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      })

      if (response.ok) {
        setIsEditing(false)
        router.refresh()
      }
    } catch (error) {
      console.error('Failed to update description:', error)
    } finally {
      setIsSaving(false)
    }
  }

  if (isEditing) {
    return (
      <div className="flex flex-col gap-2 max-w-xl">
        <textarea
          autoFocus
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm font-medium italic focus:outline-none focus:border-blue-500/50 resize-none min-h-[100px]"
          placeholder="Enter venture description..."
        />
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => {
              setDescription(initialDescription)
              setIsEditing(false)
            }}
            disabled={isSaving}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/40 hover:text-white"
          >
            <X size={16} />
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="p-2 hover:bg-blue-500/10 rounded-lg transition-colors text-blue-500"
          >
            <Check size={16} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="group flex items-start gap-4 cursor-pointer"
      onClick={() => setIsEditing(true)}
    >
      <p className="text-xl opacity-40 max-w-xl font-medium italic group-hover:opacity-60 transition-opacity">
        "{initialDescription}"
      </p>
      <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-white/5 rounded-lg transition-all text-white/20">
        <Pencil size={14} />
      </button>
    </div>
  )
}
