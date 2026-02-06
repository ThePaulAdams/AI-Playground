import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth()
  const { id } = await params

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const { name, description, slug, status } = await req.json()

    // Ensure the venture belongs to the user
    const existingVenture = await prisma.venture.findUnique({
      where: { id, userId }
    })

    if (!existingVenture) {
      return new NextResponse("Venture not found", { status: 404 })
    }

    const data: any = {}
    if (name) data.name = name
    if (description !== undefined) data.description = description
    if (status) data.status = status
    
    if (slug && slug !== existingVenture.slug) {
      // Check if new slug is taken
      const slugTaken = await prisma.venture.findUnique({
        where: { slug }
      })
      if (slugTaken) {
        return NextResponse.json({ error: "Path already in use" }, { status: 400 })
      }
      data.slug = slug
    }

    if (Object.keys(data).length === 0) {
      return new NextResponse("No fields to update", { status: 400 })
    }

    const venture = await prisma.venture.update({
      where: { id },
      data
    })

    return NextResponse.json(venture)
  } catch (error: any) {
    console.error("[VENTURE_CONFIG_PATCH]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
