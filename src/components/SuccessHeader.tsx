'use client'
import React, { useEffect } from 'react'
import Stripe from 'stripe'
import { useShoppingCart } from 'use-shopping-cart'
import { createProductPatchConfig, formatCartItemsToProductPatch } from '@/helpers/fctns'
import { ProductPatch } from '@/helpers/types/fetypes'
import { CheckCheck } from 'lucide-react'
import axios, { AxiosError, AxiosResponse } from 'axios'


type SuccessHeaderProps = {
	customerDetails: Stripe.Checkout.Session.CustomerDetails,
	paymentId: number
}

const SuccessHeader = ({ customerDetails, paymentId }: SuccessHeaderProps) => {
	const { clearCart, cartDetails } = useShoppingCart()


	//patch request here to PATCH: /product with array of ProductPatch: name: string, id: number, color: string, size: string
	useEffect(() => {
		if (cartDetails) {
			const productsToPatch: ProductPatch[] = formatCartItemsToProductPatch(cartDetails)
			console.log(productsToPatch)
			// const res = updateProductSizes(productsToPatch)
			// if (res) {
			// clearCart()
			// }
		}
	}, [cartDetails])

	const updateProductSizes = async (products: ProductPatch[]) => {
		const productPatchConfig = createProductPatchConfig('patch', 'product', products)
		const patchResult = await axios(productPatchConfig)
			.then((response: AxiosResponse) => {
				return response.status === 200
			})
			.catch((err: AxiosError) => {
				console.error(err)
				return false
			})
		return patchResult
	}

	return (
		<div className=''>
			<div className='flex flex-row mt-6 items-center justify-center gap-x-2'>
				<CheckCheck className='ml-8 h-10 w-10 text-green-600' />
				<h1 className='mr-8 text-3xl font-bold tracking-tight text-green-600 sm:text-5xl'>
					Order #{paymentId} Successful!
				</h1>
			</div>
			<h3 className='flex flex-row justify-center mt-8 text-2xl leading-7'>
				Thank you for shopping with ATKicks, <span className="font-extrabold">&nbsp;{customerDetails.name}.</span>
			</h3>
			<p className='flex flex-row justify-center mt-6'>
				Check your purchase email,
				<span className='mx-1 font-extrabold text-indigo-500'>{customerDetails.email}</span>for your invoice.
			</p>
		</div>
	)
}


export { SuccessHeader }