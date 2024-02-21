/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import { getServerSession } from 'next-auth'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { IndOrder, ProductObj, UserOrdersConfig } from '@/helpers/types/fetypes'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { createUserOrdersConfig } from '@/helpers/fctns'
import { AccountHeader } from '@/components/Server/AccountHeader'
import { Product } from '@/components/Product'



const AccountPage = async () => {
	const userDetails = await getServerSession(options)
	const { ordersObj } = await getData(userDetails!.user.id)
	console.log(userDetails)
	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24 gap-10'>
			<AccountHeader userDetails={userDetails!} />
			<div className='flex flex-row'>
				{ordersObj.map((order: IndOrder) => (
					<div key={order.order.paymentid} className='pb-24 pt-6 bg-gray-100 border-2 rounded-lg border-black mt-5' aria-labelledby='products-heading'>
						<div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:col-span-3 lg:gap-x-8'>
							{order.productsOrder.map((product: ProductObj, index: number) => (
								<div className='flex flex-col p-10 justify-center' key={index}>
									<Product product={product} key={index} />
								</div>
							))}
						</div>
					</div>
				))}
			</div>
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