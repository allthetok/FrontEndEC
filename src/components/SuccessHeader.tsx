'use client'
import React, { useEffect } from 'react'
import { useShoppingCart } from 'use-shopping-cart'
import Stripe from 'stripe'
import { CheckCheck } from 'lucide-react'

type SuccessHeaderProps = {
	customerDetails: Stripe.Checkout.Session.CustomerDetails,
	paymentId: number
}

const SuccessHeader = ({ customerDetails, paymentId }: SuccessHeaderProps) => {
	const { clearCart } = useShoppingCart()

	// useEffect(() => {
	// 	if (customerDetails) {
	// 		clearCart()
	// 	}
	// }, [customerDetails])

	return (
		<>
			<CheckCheck className='mx-auto h-10 w-10 text-purple-500' />
			<h1 className='mt-4 text-3xl font-bold tracking-tight text-purple-500 sm:text-5xl'>
				Order #${paymentId} Successful!
			</h1>
			<h3 className="mt-8 text-2xl leading-7">
				Thank you, <span className="font-extrabold">{customerDetails.name}</span>!
			</h3>
			<p className="mt-8">
				Check your purchase email {' '}
				<span className="mx-1 font-extrabold text-indigo-500">${customerDetails.email}</span> for your invoice.
			</p>
		</>
	)
}


export { SuccessHeader }