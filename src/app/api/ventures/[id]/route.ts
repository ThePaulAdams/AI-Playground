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
    const { name, description, status, websiteUrl } = await req.json()

    // Ensure the venture belongs to the user
    const existingVenture = await prisma.venture.findFirst({
      where: {
        id,
        userId
      }
    })

    if (!existingVenture) {
      return new NextResponse("Not Found", { status: 404 })
    }

    const venture = await prisma.venture.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        status,
        websiteUrl,
      },
    })

    return NextResponse.json(venture)
  } catch (error: any) {
    console.error("[VENTURE_PATCH]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

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
    // Ensure the venture belongs to the user
    const existingVenture = await prisma.venture.findFirst({
      where: {
        id,
        userId
      }
    })

    if (!existingVenture) {
      return new NextResponse("Not Found", { status: 404 })
    }

    // Delete associated feedback first (or let Prisma handle if cascade is set, but explicit is safer here if not defined)
    await prisma.feedback.deleteMany({
      where: { ventureId: id }
    })

    await prisma.venture.delete({
      where: {
        id,
      },
    })

    return new NextResponse("Deleted", { status: 200 })
  } catch (error: any) {
    console.error("[VENTURE_DELETE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
