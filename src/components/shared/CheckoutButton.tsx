'use client'

import { useState } from 'react'
import { CreditCard } from 'lucide-react'

export function CheckoutButton({ 
  ventureId, 
  priceId, 
  label = "Upgrade to Pro" 
}: { 
  ventureId: string, 
  priceId: string, 
  label?: string 
}) {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ventureId, priceId }),
      })
      const { url } = await res.json()
      window.location.href = url
    } catch {
      alert('Checkout failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl transition-all active:scale-95 text-[10px] uppercase tracking-widest shadow-xl shadow-emerald-500/20 disabled:opacity-50"
    >
      <CreditCard size={14} />
      {loading ? 'Redirecting...' : label}
    </button>
  )
}
