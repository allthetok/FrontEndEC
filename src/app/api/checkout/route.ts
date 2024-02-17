import { NextResponse } from 'next/server'
import { stripe } from '../../../../lib/stripe'
import { formatLineItems } from '@/helpers/fctns'

export async function POST(request: Request) {
	const stripeCartBody = await request.json()
	const lineItems = formatLineItems(stripeCartBody.cartItems)
	// console.log(lineItems[0].price_data)
	const origin = request.headers.get('origin')
	const session = await stripe.checkout.sessions.create({
		submit_type: 'pay',
		mode: 'payment',
		payment_method_types: ['card'],
		line_items: lineItems,
		shipping_address_collection: {
			allowed_countries: ['US', 'CA']
		},
		shipping_options: [
			{
				shipping_rate: 'shr_1OkFq8Axh7i3puODwPB0zLsi'
			}
		],
		customer_email: stripeCartBody.email,
		billing_address_collection: 'auto',
		// success_url: `${origin}/cart`,
		success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${origin}/cart`,
	})
	return NextResponse.json(session)
}