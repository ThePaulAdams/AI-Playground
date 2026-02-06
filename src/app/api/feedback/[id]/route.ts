import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    if (!id) {
      return new NextResponse("Feedback ID required", { status: 400 })
    }

    const feedback = await prisma.feedback.delete({
      where: {
        id,
      },
    })

    return NextResponse.json(feedback)
  } catch (error: any) {
    console.error("[FEEDBACK_DELETE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
