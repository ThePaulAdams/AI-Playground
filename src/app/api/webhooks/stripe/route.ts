import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  return new NextResponse("Webhook endpoint initialized (Phase 3)", { status: 200 })
}
