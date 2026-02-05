import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import Stripe from 'stripe'

const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2026-01-28.clover' as any,
    })
  : null;

export async function POST(req: Request) {
  if (!stripe) {
    return new NextResponse("Stripe secret key not configured", { status: 500 })
  }
  const { userId } = await auth()
  const { priceId, ventureId } = await req.json()

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/ventures/${ventureId}?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/ventures/${ventureId}?canceled=true`,
      metadata: {
        userId,
        ventureId,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error("[STRIPE_CHECKOUT]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
