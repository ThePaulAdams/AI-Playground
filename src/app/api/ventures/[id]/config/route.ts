import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth()
  const { id } = await params

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const { name, description, status, slug } = await req.json()

    // If slug is provided, check for uniqueness
    if (slug) {
      const existing = await prisma.venture.findFirst({
        where: {
          slug,
          NOT: { id }
        }
      })
      if (existing) {
        return NextResponse.json({ error: "Slug already in use" }, { status: 400 })
      }
    }

    const venture = await prisma.venture.update({
      where: {
        id,
        userId
      },
      data: {
        name,
        description,
        status,
        slug
      },
    })

    return NextResponse.json(venture)
  } catch (error: any) {
    console.error("[VENTURE_PATCH]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
