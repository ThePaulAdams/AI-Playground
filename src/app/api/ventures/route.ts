import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

export async function POST(req: Request) {
  const { userId } = await auth()
  
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const { name, description, slug, websiteUrl } = await req.json()

    if (!name || !slug) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    // Check if slug is already taken
    const existing = await prisma.venture.findUnique({
      where: { slug }
    })

    if (existing) {
      return new NextResponse("Slug already taken", { status: 400 })
    }

    const venture = await prisma.venture.create({
      data: {
        name,
        description,
        slug,
        userId,
        websiteUrl,
      },
    })

    return NextResponse.json(venture)
  } catch (error: any) {
    console.error("[VENTURES_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function GET() {
  const { userId } = await auth()

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const ventures = await prisma.venture.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(ventures)
  } catch (error: any) {
    console.error("[VENTURES_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
