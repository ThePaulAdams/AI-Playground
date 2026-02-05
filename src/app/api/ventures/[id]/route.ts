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
    const { status, name, description, slug } = await req.json()

    const data: any = {}
    if (status) data.status = status
    if (name) data.name = name
    if (description !== undefined) data.description = description
    if (slug) data.slug = slug

    if (Object.keys(data).length === 0) {
      return new NextResponse("No fields to update", { status: 400 })
    }

    const venture = await prisma.venture.update({
      where: {
        id,
        userId
      },
      data
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
    // Delete feedbacks first (cascade)
    await prisma.feedback.deleteMany({
      where: { ventureId: id }
    })

    const venture = await prisma.venture.delete({
      where: {
        id,
        userId // Security check
      },
    })

    return NextResponse.json(venture)
  } catch (error: any) {
    console.error("[VENTURE_DELETE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
