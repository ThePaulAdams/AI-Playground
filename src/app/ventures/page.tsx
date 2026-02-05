import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { CreateVentureForm } from '@/components/CreateVentureForm'
import { DeleteVentureButton } from '@/components/shared/DeleteVentureButton'
import { EditableVentureDescription } from '@/components/shared/EditableVentureDescription'
import Link from 'next/link'

export default async function VenturesPage() {
  const { userId } = await auth()

  const ventures = userId ? await prisma.venture.findMany({
    where: { userId },
    include: {
      _count: {
        select: { feedbacks: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  }) : []

  const totalFeedbacks = ventures.reduce((acc, v) => acc + v._count.feedbacks, 0)
  const activeVentures = ventures.filter(v => v.status !== 'DRAFT').length

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="mb-12">
        <Link href="/" className="text-sm opacity-50 hover:opacity-100 transition-opacity flex items-center gap-2">
          <span>←</span> Back to Factory
        </Link>
        <h1 className="text-4xl font-black mt-4 uppercase tracking-tighter">Venture Hub</h1>
        <p className="mt-2 text-xl opacity-80">
          Manage your autonomous SaaS portfolio.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
            <span className="block text-[10px] font-black uppercase opacity-30 tracking-widest mb-1">Total Ventures</span>
            <span className="text-2xl font-black">{ventures.length}</span>
          </div>
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
            <span className="block text-[10px] font-black uppercase opacity-30 tracking-widest mb-1">Active</span>
            <span className="text-2xl font-black">{activeVentures}</span>
          </div>
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
            <span className="block text-[10px] font-black uppercase opacity-30 tracking-widest mb-1">Total Signals</span>
            <span className="text-2xl font-black">{totalFeedbacks}</span>
          </div>
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
            <span className="block text-[10px] font-black uppercase text-blue-400 tracking-widest mb-1">Conversion</span>
            <span className="text-2xl font-black text-blue-400">0%</span>
          </div>
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <h2 className="text-xl font-bold mb-4 uppercase tracking-tight">New Venture</h2>
          <CreateVentureForm />
        </div>

        <div className="md:col-span-2">
          <h2 className="text-xl font-bold mb-4 uppercase tracking-tight">Active Ventures</h2>
          <div className="grid grid-cols-1 gap-4">
            {ventures.length === 0 ? (
              <div className="p-12 border border-dashed border-white/10 rounded-xl text-center opacity-40">
                No active ventures found. Launch one to get started.
              </div>
            ) : (
              ventures.map((venture) => (
                <div key={venture.id} className="p-6 bg-white/5 rounded-xl border border-white/10 flex justify-between items-center group hover:bg-white/10 transition-colors">
                  <div className="flex-1">
                    <h3 className="text-lg font-black uppercase tracking-tight">{venture.name}</h3>
                    <EditableVentureDescription ventureId={venture.id} initialDescription={venture.description || ''} />
                    <div className="flex gap-2 mt-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/20 uppercase tracking-widest">{venture.status}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-white/5 opacity-40 rounded-full uppercase tracking-widest">{venture.slug}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-green-500/10 text-green-400 rounded-full border border-green-500/10 uppercase tracking-widest">{venture._count.feedbacks} Signals</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Link 
                      href={`/ventures/${venture.slug}`}
                      className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black px-4 py-2 rounded-lg font-bold text-xs uppercase"
                    >
                      Manage
                    </Link>
                    <DeleteVentureButton ventureId={venture.id} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
