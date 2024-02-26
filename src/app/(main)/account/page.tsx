/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { Suspense } from 'react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import axios, { AxiosResponse } from 'axios'
import { IndOrder, ProductObj, UserOrdersConfig } from '@/helpers/types/fetypes'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { createUserOrdersConfig, formatDate } from '@/helpers/fctns'
import { AccountHeader } from '@/components/Server/AccountHeader'
import { Product } from '@/components/Product'
import LoginIcon from '@mui/icons-material/Login'
import { Font25Sx } from '@/sx/styling'



const AccountPage = async () => {
	const userDetails = await getServerSession(options)
	const { ordersObj } = await getData(userDetails!.user.id)

	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24 gap-10'>
			<Suspense fallback={<div>Loading Content...</div>}>
				<AccountHeader userDetails={userDetails!} />
				<div>
					<h2 className='flex justify-center text-black font-extrabold text-4xl order-dec'>
						{ordersObj.length === 0 ? `You've made no Orders to Date` : `Your Orders to Date:`}
					</h2>
					{ordersObj.length === 0 ? (
						<div className='flex justify-center'>
							<Link className='inline-flex mt-8 border-2 border-slate-900 bg-white rounded-xl text-black font-bold text-xl uppercase tracking-wide py-5 px-8 items-center shadow-lg hover:bg-black hover:text-white' href='/products'>
								Shop Shoes
								<LoginIcon sx={Font25Sx} />
							</Link>
						</div>)
						: <></>}
					<div className='flex flex-col'>
						{ordersObj.map((order: IndOrder) => (
							<div className='flex flex-row' key={order.order.paymentid}>
								<div className='pb-24 pt-6 bg-gray-100 border-2 rounded-lg border-black mt-5' aria-labelledby='products-heading'>
									<h2 className='flex ml-20 text-3xl text-gray-700'>Items ordered:</h2>
									<div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:col-span-3 lg:gap-x-8'>
										{order.productsOrder.map((product: ProductObj, index: number) => (
											<div className='flex flex-col p-10 justify-center' key={index}>
												<Product product={product} key={index} />
											</div>
										))}
									</div>
								</div>
								<section className='mt-5 rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-6 shadow-md sm:p-6 lg:col-span-5 lg:p-8 ml-20 h-[350px] w-[470px]'>
									<h2 className='text-lg font-medium flex flex-row justify-center border-b-2 border-black'>
										Order #{order.order.paymentid} placed on {formatDate(new Date(order.order.datecreated))}
									</h2>
									<dl className='mt-6 space-y-4'>
										<div className='flex items-center justify-between'>
											<dt className='text-sm'>
												Subtotal
											</dt>
											<dd className='text-sm font-medium'>
												${order.productsOrder.map((indProduct: ProductObj) => indProduct.price).reduce((a, b) => a + b).toFixed(2)} USD
											</dd>
										</div>
										<div className='flex items-center justify-between border-t border-gray-200 pt-4'>
											<dt className='flex items-center text-sm'>
												<span>Shipping estimate</span>
											</dt>
											<dd className='text-sm font-medium'>
												$5.00 USD
											</dd>
										</div>
										<div className='flex items-center justify-between border-t border-gray-200 pt-4'>
											<dt className='text-base font-medium'>
												Order Total
											</dt>
											<dd className='text-base font-medium'>
												${(order.productsOrder.map((indProduct: ProductObj) => indProduct.price).reduce((a, b) => a + b) + 5).toFixed(2)} USD
											</dd>
										</div>
									</dl>
								</section>
							</div>
						))}
					</div>
				</div>
			</Suspense>
		</main>
	)
}

const getData = async (userid: string) => {
	const userOrdersConfig = createUserOrdersConfig('post', 'userOrders', userid)
	return {
		ordersObj: await getOrdersDtl(userOrdersConfig)
	}
}

const getOrdersDtl = async (userOrdersConfig: UserOrdersConfig) => {
	const resultOrdersObj: IndOrder[] = await axios(userOrdersConfig)
		.then((response: AxiosResponse) => {
			return response.data.allOrders
		})
	return resultOrdersObj
}

export default AccountPage