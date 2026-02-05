import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { id } = await params
    const { status, description } = await req.json()

    if (!status && description === undefined) {
      return new NextResponse("Missing data", { status: 400 })
    }

    // Verify ownership
    const venture = await prisma.venture.findUnique({
      where: { id },
      select: { userId: true }
    })

    if (!venture) {
      return new NextResponse('Not Found', { status: 404 })
    }

    if (venture.userId !== userId) {
      return new NextResponse('Forbidden', { status: 403 })
    }

    const data: any = {}
    if (status) data.status = status
    if (description !== undefined) data.description = description.trim()

    const updatedVenture = await prisma.venture.update({
      where: { id },
      data
    })

    return NextResponse.json(updatedVenture)
  } catch (error) {
    console.error('[VENTURE_PATCH]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { id } = await params

    // Verify ownership
    const venture = await prisma.venture.findUnique({
      where: { id },
      select: { userId: true }
    })

    if (!venture) {
      return new NextResponse('Not Found', { status: 404 })
    }

    if (venture.userId !== userId) {
      return new NextResponse('Forbidden', { status: 403 })
    }

    // Delete associated feedbacks first if they exist (though Prisma might handle if cascading)
    // In our schema, we didn't specify onDelete: Cascade, so let's delete them.
    await prisma.feedback.deleteMany({
      where: { ventureId: id }
    })

    await prisma.venture.delete({
      where: { id }
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('[VENTURE_DELETE]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
