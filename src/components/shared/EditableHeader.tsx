'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, X, Pencil } from 'lucide-react'

interface EditableHeaderProps {
  ventureId: string
  initialName: string
  initialDescription: string
}

export function EditableHeader({ ventureId, initialName, initialDescription }: EditableHeaderProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(initialName)
  const [description, setDescription] = useState(initialDescription)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  const handleSave = async () => {
    if (name === initialName && description === initialDescription) {
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
        body: JSON.stringify({ name, description }),
      })

      if (response.ok) {
        setIsEditing(false)
        router.refresh()
      }
    } catch (error) {
      console.error('Failed to update venture:', error)
    } finally {
      setIsSaving(false)
    }
  }

  if (isEditing) {
    return (
      <div className="flex flex-col gap-4 w-full max-w-2xl">
        <input
          autoFocus
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-transparent text-5xl font-black uppercase tracking-tighter border-b border-white/20 focus:border-blue-500 focus:outline-none w-full pb-2"
          placeholder="Venture Name"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm font-medium italic focus:outline-none focus:border-blue-500/50 resize-none min-h-[100px]"
          placeholder="Enter venture description..."
        />
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => {
              setName(initialName)
              setDescription(initialDescription)
              setIsEditing(false)
            }}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 rounded-lg transition-colors text-white/40 hover:text-white text-xs font-black uppercase tracking-widest"
          >
            <X size={14} /> Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 hover:bg-blue-500/10 rounded-lg transition-colors text-blue-500 text-xs font-black uppercase tracking-widest"
          >
            <Check size={14} /> {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="group cursor-pointer space-y-2"
      onClick={() => setIsEditing(true)}
    >
      <div className="flex items-center gap-3">
        <h1 className="text-5xl font-black uppercase tracking-tighter group-hover:text-blue-500 transition-colors">
          {initialName}
        </h1>
        <div className="opacity-0 group-hover:opacity-100 p-2 hover:bg-white/5 rounded-lg transition-all text-white/20">
          <Pencil size={14} />
        </div>
      </div>
      <p className="text-xl opacity-40 max-w-xl font-medium italic group-hover:opacity-60 transition-opacity">
        "{initialDescription}"
      </p>
    </div>
  )
}
