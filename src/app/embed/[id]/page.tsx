import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { FeedbackWidget } from '@/components/shared/FeedbackWidget'

export default async function EmbedPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const venture = await prisma.venture.findUnique({
    where: { id }
  })

  if (!venture) return notFound()

  return (
    <div className="bg-transparent min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <FeedbackWidget ventureId={venture.id} />
      </div>
    </div>
  )
}
