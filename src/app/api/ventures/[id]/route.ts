import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth()
  const { id } = await params

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    // Delete feedbacks first (cascading if not configured in DB)
    await prisma.feedback.deleteMany({
      where: { ventureId: id }
    })

    const venture = await prisma.venture.delete({
      where: {
        id,
        userId // Ensure user owns it
      },
    })

    return NextResponse.json(venture)
  } catch (error: any) {
    console.error("[VENTURE_DELETE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
