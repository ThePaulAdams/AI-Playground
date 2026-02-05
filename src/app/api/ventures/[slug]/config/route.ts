import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { userId } = await auth()
  const { slug } = await params

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const { name, description, status } = await req.json()

    const venture = await prisma.venture.update({
      where: {
        slug,
        userId
      },
      data: {
        name,
        description,
        status
      },
    })

    return NextResponse.json(venture)
  } catch (error: any) {
    console.error("[VENTURE_PATCH]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
