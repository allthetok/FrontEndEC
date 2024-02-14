/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useShoppingCart } from 'use-shopping-cart'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { createProductDtlConfig, formatPageQuery } from '@/helpers/fctns'
import { FullProductConfig, MetaProductData, ProductObj } from '@/helpers/types/fetypes'
import { CartProductList } from '@/components/CartProductList'
import { CartSummary } from '@/components/CartSummary'

const CartPage = () => {
	const { cartDetails, clearCart, cartCount } = useShoppingCart()
	const router = useRouter()
	const { data: session } = useSession({
		required: true,
		onUnauthenticated() {
			router.push('/signin')
		}
	})

	const cartProducts: {name: string, id: string, productData: MetaProductData}[] = Object.entries(cartDetails!).map(([_, product]) => ( { name: product.name, id: product.id, productData: product.product_data! as MetaProductData } ))
	return (
		// <main className='flex min-h-screen flex-col items-center justify-between p-24'>
		// 	<p>{cartCount}</p>
		// </main>
		// <main className='mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8'>
		// 	<h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>
		// 		Shopping Cart
		// 	</h1>
		// 	<form className='mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16'>
		// 		<section aria-labelledby='cart-heading' className='lg:col-span-7'>
		// 			<h2 id='cart-heading' className='sr-only'>
		// 				Items in your shopping cart
		// 			</h2>
		// 			{/* Cart Items */}
		// 		</section>
		// 		{/* Cart Summary */}
		// 	</form>
		// </main>
		<main className='flex min-h-screen flex-col items-center justify-between p-24 gap-10'>
			{cartCount! > 0 ?
				<h2 className='header-cart-count text-4xl font-bold'>You have {cartCount} items in your cart:</h2>
				: <></>
			}
			<div className='flex flex-row'>
				<CartProductList cartAttributes={cartProducts} />
				<CartSummary />
			</div>
		</main>
	)
}

export default CartPage