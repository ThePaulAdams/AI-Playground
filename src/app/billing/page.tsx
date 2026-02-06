import { auth } from '@clerk/nextjs/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CreditCard, Zap, Shield, CheckCircle2 } from 'lucide-react'
import { CheckoutButton } from '@/components/shared/CheckoutButton'

export default async function BillingPage() {
  const { userId } = await auth()

  if (!userId) return notFound()

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] max-w-5xl mx-auto">
      <header className="mb-12">
        <Link href="/ventures" className="text-[10px] font-black uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity flex items-center gap-2">
          <span>←</span> Venture Hub
        </Link>
        <h1 className="text-4xl font-black mt-4 uppercase tracking-tighter">Billing & Subscription</h1>
        <p className="mt-2 text-xl opacity-60">
          Scale your autonomous SaaS portfolio with premium features.
        </p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Current Plan */}
        <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl space-y-6">
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.3em] opacity-30 mb-4">Current Plan</h2>
            <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-black uppercase tracking-widest mb-2">
              Free Tier
            </div>
            <div className="text-3xl font-black">$0<span className="text-sm opacity-30 font-medium">/month</span></div>
          </div>

          <ul className="space-y-3">
            {[
              "Up to 3 Active Ventures",
              "Standard Signal Analytics",
              "Public Feedback Widgets",
              "Basic Support"
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm opacity-60">
                <CheckCircle2 size={14} className="text-blue-500" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Pro Plan */}
        <div className="p-8 bg-blue-600/5 border border-blue-500/20 rounded-3xl space-y-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 bg-blue-600 text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-bl-xl shadow-lg">
            Recommended
          </div>
          
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.3em] opacity-30 mb-4">Pro Plan</h2>
            <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-2">
              Growth Mode
            </div>
            <div className="text-3xl font-black">$19<span className="text-sm opacity-30 font-medium">/month</span></div>
          </div>

          <ul className="space-y-3">
            {[
              "Unlimited Active Ventures",
              "Advanced Portfolio Insights",
              "Custom Domain Branding",
              "Priority AI Development Queue",
              "Private Venture Streams"
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm">
                <Zap size={14} className="text-blue-400" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="pt-4">
            <CheckoutButton />
          </div>
          
          <p className="text-[10px] opacity-30 text-center uppercase font-bold tracking-widest">
            <Shield size={10} className="inline mr-1" /> Secure checkout via Stripe
          </p>
        </div>
      </main>

      <section className="mt-16 p-8 bg-white/[0.01] border border-dashed border-white/5 rounded-3xl text-center">
        <h3 className="text-sm font-black uppercase tracking-widest opacity-30 mb-2">Need a Custom Enterprise Plan?</h3>
        <p className="text-sm opacity-50 mb-6">Contact the factory floor for high-volume API access and dedicated autonomous compute.</p>
        <button className="text-[10px] font-black uppercase tracking-widest border border-white/10 px-8 py-3 rounded-xl hover:bg-white hover:text-black transition-all">
          Contact Sales
        </button>
      </section>
    </div>
  )
}