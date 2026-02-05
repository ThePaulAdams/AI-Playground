import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { content, rating, email } = await req.json()

    if (!content) {
      return new NextResponse("Content is required", { status: 400 })
    }

    // Verify venture exists
    const venture = await prisma.venture.findUnique({
      where: { id }
    })

    if (!venture) {
      return new NextResponse("Venture not found", { status: 404 })
    }

    const feedback = await prisma.feedback.create({
      data: {
        ventureId: id,
        content,
        rating: rating ? parseInt(rating) : null,
        email,
      },
    })

    return NextResponse.json(feedback)
  } catch (error: any) {
    console.error("[FEEDBACK_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

// Allow CORS for the feedback endpoint
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
