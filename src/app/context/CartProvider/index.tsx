/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client'
import React from 'react'
import { CartProvider as StripeCartProvider } from 'use-shopping-cart'

type CartProviderProps = {
	children: React.ReactNode
}

export default function CartProvider({ children }: CartProviderProps) {
	return (
		<StripeCartProvider cartMode='checkout-session' currency='USD' shouldPersist={true} stripe={process.env.STRIPE_API_PUBLISHABLE_KEY!}>
			{children}
		</StripeCartProvider>
	)
}