import { NextResponse } from 'next/server'
import { validateCartItems } from 'use-shopping-cart/utilities'
import stripe from 'stripe'


export async function POST(request: Request) {
	const cartDetails = await request.json()
	await stripe.Checkout.SessionsResource.create({
		
	})
}