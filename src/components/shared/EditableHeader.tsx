'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Edit2, X } from 'lucide-react'

export function EditableHeader({ 
  ventureId, 
  initialName, 
  initialDescription 
}: { 
  ventureId: string, 
  initialName: string, 
  initialDescription: string 
}) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(initialName)
  const [description, setDescription] = useState(initialDescription)
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/ventures/${ventureId}/config`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      })
      if (!res.ok) throw new Error()
      setIsEditing(false)
      router.refresh()
    } catch {
      alert('Failed to update')
    } finally {
      setLoading(false)
    }
  }

  if (isEditing) {
    return (
      <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
        <input 
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-5xl font-black uppercase tracking-tighter bg-white/5 border border-blue-500/50 rounded-lg px-2 w-full outline-none"
        />
        <textarea 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="text-xl opacity-60 w-full bg-white/5 border border-blue-500/50 rounded-lg px-2 outline-none italic"
        />
        <div className="flex gap-2">
          <button 
            onClick={handleSave} 
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-lg text-xs font-bold uppercase"
          >
            <Check size={14} /> {loading ? 'Saving...' : 'Save Changes'}
          </button>
          <button 
            onClick={() => setIsEditing(false)}
            className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg text-xs font-bold uppercase"
          >
            <X size={14} /> Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="group relative">
      <h1 className="text-5xl font-black uppercase tracking-tighter">{name}</h1>
      <p className="mt-2 text-xl opacity-40 max-w-xl font-medium italic">"{description}"</p>
      <button 
        onClick={() => setIsEditing(true)}
        className="absolute -right-8 top-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500"
      >
        <Edit2 size={18} />
      </button>
    </div>
  )
}
