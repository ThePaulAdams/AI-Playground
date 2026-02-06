import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth()
    const { id } = await params

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!id) {
      return new NextResponse("Feedback ID required", { status: 400 })
    }

    // Verify feedback ownership through venture
    const feedback = await prisma.feedback.findUnique({
      where: { id },
      include: { venture: true }
    })

    if (!feedback) {
      return new NextResponse("Feedback not found", { status: 404 })
    }

    if (feedback.venture.userId !== userId) {
      return new NextResponse("Forbidden", { status: 403 })
    }

    await prisma.feedback.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("[FEEDBACK_DELETE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
