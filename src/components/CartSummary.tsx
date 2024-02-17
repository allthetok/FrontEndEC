import React from 'react'
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart'
import { Button } from '@mui/material'
import { CheckOutSx } from '@/sx/styling'


const CartSummary = () => {
	const { formattedTotalPrice, totalPrice, cartDetails, cartCount, redirectToCheckout } = useShoppingCart()
	const shippingAmount = cartCount! > 0 ? 500 : 0
	const totalAmount = totalPrice! + shippingAmount

	const onCheckout = async () => {
		const response = await fetch('/api/checkout', {
			method: 'POST',
			body: JSON.stringify(cartDetails)
		})
		const stripeData = await response.json()
		const result = await redirectToCheckout(stripeData.id as string)
		if (result?.error) {
			console.error(result)
		}
	}
	return (
		<section className='mt-5 rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-6 shadow-md sm:p-6 lg:col-span-5 lg:p-8 ml-20 h-[350px] w-[470px]'>
			<h2 className='text-lg font-medium flex flex-row justify-center border-b-2 border-black'>
				Order Summary
			</h2>
			<dl className='mt-6 space-y-4'>
				<div className='flex items-center justify-between'>
					<dt className='text-sm'>
						Subtotal
					</dt>
					<dd className='text-sm font-medium'>
						{formattedTotalPrice}
					</dd>
				</div>
				<div className='flex items-center justify-between border-t border-gray-200 pt-4'>
					<dt className='flex items-center text-sm'>
						<span>Shipping estimate</span>
					</dt>
					<dd className='text-sm font-medium'>
						{formatCurrencyString({ value: shippingAmount, currency: 'USD' })}
					</dd>
				</div>
				<div className='flex items-center justify-between border-t border-gray-200 pt-4'>
					<dt className='text-base font-medium'>
						Order Total
					</dt>
					<dd className='text-base font-medium'>
						{formatCurrencyString({ value: totalAmount, currency: 'USD' })}
					</dd>
				</div>
			</dl>
			<div className='mt-6'>
				{/* <Button onClick={() => console.log('checkout')} className='inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-[rgb(15,23,42)] text-white hover:bg-[rgb(15,23,42)]/90 h-10 py-2 px-4 w-full hover:font-bold'> */}
				<Button onClick={onCheckout} sx={CheckOutSx} disabled={cartCount! === 0}>
					{cartCount! === 0 ? 'Fill Cart' : 'Checkout'}
				</Button>
			</div>
		</section>
	)
}

export { CartSummary }