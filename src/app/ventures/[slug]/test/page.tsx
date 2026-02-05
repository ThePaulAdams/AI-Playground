import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { FeedbackWidget } from '@/components/shared/FeedbackWidget'
import Link from 'next/link'

export default async function VentureTestPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const venture = await prisma.venture.findUnique({
    where: { slug }
  })

  if (!venture) return notFound()

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold uppercase tracking-widest text-blue-500">Live Widget Test</h1>
          <p className="text-sm opacity-50 font-mono italic">Testing for: {venture.name}</p>
        </div>

        <FeedbackWidget ventureId={venture.id} />

        <div className="text-center">
          <Link href={`/ventures/${slug}`} className="text-[10px] uppercase font-black opacity-30 hover:opacity-100 transition-opacity">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
