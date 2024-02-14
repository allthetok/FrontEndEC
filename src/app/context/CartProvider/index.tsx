'use client'
import React from 'react'
import { CartProvider as StripeCartProvider } from 'use-shopping-cart'

type CartProviderProps = {
	children: React.ReactNode
}

export default function CartProvider({ children }: CartProviderProps) {
	return (
		<StripeCartProvider cartMode='checkout-session' stripe={process.env.STRIPE_API_PUBLISHABLE_KEY as string} currency='USD' shouldPersist={true}>
			{children}
		</StripeCartProvider>
	)
}