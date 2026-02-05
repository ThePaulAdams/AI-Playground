'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

export function CreateVentureForm() {
  const { user } = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const websiteUrl = formData.get('websiteUrl') as string
    let slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    
    // If name is too short or all special chars, slug might be empty
    if (!slug) {
      slug = `venture-${Math.floor(Math.random() * 10000)}`
    }

    try {
      const res = await fetch('/api/ventures', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, slug, websiteUrl }),
      })

      if (!res.ok) {
        const text = await res.text()
        // If slug already taken, try appending a random number
        if (text === "Slug already taken") {
          const newSlug = `${slug}-${Math.floor(Math.random() * 1000)}`
          const retryRes = await fetch('/api/ventures', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, description, slug: newSlug, websiteUrl }),
          })
          if (!retryRes.ok) {
            const retryText = await retryRes.text()
            throw new Error(retryText || 'Failed to create venture after retry')
          }
        } else {
          throw new Error(text || 'Failed to create venture')
        }
      }

      router.refresh()
      e.currentTarget.reset()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white/5 rounded-xl border border-white/10">
      <div>
        <label className="block text-xs font-bold uppercase opacity-50 mb-1">Venture Name</label>
        <input 
          name="name" 
          required 
          className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 text-white"
          placeholder="e.g. My SaaS Product"
        />
      </div>
      <div>
        <label className="block text-xs font-bold uppercase opacity-50 mb-1">Description</label>
        <textarea 
          name="description" 
          required 
          className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 min-h-[100px] text-white"
          placeholder="What does this solve?"
        />
      </div>
      <div>
        <label className="block text-xs font-bold uppercase opacity-50 mb-1">Website URL (Optional)</label>
        <input 
          name="websiteUrl" 
          type="url"
          className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 text-white"
          placeholder="https://example.com"
        />
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
      <button 
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-2 rounded-lg transition-colors text-sm uppercase tracking-widest"
      >
        {loading ? 'Launching...' : 'Create Venture'}
      </button>
    </form>
  )
}
