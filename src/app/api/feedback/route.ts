import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { ventureId, content, rating, email } = await req.json()

    if (!ventureId || !content) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    // Verify venture exists
    const venture = await prisma.venture.findUnique({
      where: { id: ventureId }
    })

    if (!venture) {
      return new NextResponse("Venture not found", { status: 404 })
    }

    const feedback = await prisma.feedback.create({
      data: {
        ventureId,
        content,
        rating: rating ? parseInt(rating.toString()) : undefined,
        email,
      },
    })

    return NextResponse.json(feedback)
  } catch (error: any) {
    console.error("[FEEDBACK_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

// Global feedback getter (can be scoped to user if needed)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const ventureId = searchParams.get('ventureId')

  if (!ventureId) {
    return new NextResponse("Venture ID required", { status: 400 })
  }

  try {
    const feedbacks = await prisma.feedback.findMany({
      where: {
        ventureId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(feedbacks)
  } catch (error: any) {
    console.error("[FEEDBACK_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
