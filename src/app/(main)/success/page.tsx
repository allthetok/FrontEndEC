/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import Link from 'next/link'
import { stripe } from '../../../../lib/stripe'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { createProductDtlConfig, createUserPaymentConfig, formatLineItemsToName, formatPageQuery } from '@/helpers/fctns'
import { FullPaymentConfig, FullProductConfig, PaymentResponseObj, ProductObj, ProductResponseObj } from '@/helpers/types/fetypes'
import { FullProductServer } from '@/components/Server/FullProductServer'
import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { SuccessProductList } from '@/components/SuccessProductList'
import { SuccessHeader } from '@/components/SuccessHeader'

interface Props {
	searchParams: {
		session_id?: string
	}
}

const SuccessPage = async ({ searchParams }: Props) => {
	const sessionId = searchParams?.session_id ?? ''
	const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId)
	const lineItems = await stripe.checkout.sessions.listLineItems(sessionId)
	const resultCheckoutItems = formatLineItemsToName(lineItems)
	const userDetails = await getServerSession(options)
	const stripeCustDetails = checkoutSession!.customer_details

	const { paymentObj } = await getData(userDetails!.user.id, resultCheckoutItems, sessionId)

	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24 gap-10'>
			<h2 className='header-cart-count text-4xl font-bold'>Order ${sessionId} successful </h2>
			<div className='flex flex-row'>
				<SuccessHeader customerDetails={stripeCustDetails!} paymentId={paymentObj.paymentDetails.paymentid} />
				<SuccessProductList products={paymentObj.productsOrder} />
				<div className='mt-10 flex items-center justify-center gap-x-6'>
					<Link href='/account' className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
						Go to your Account & Orders
					</Link>
				</div>
			</div>
		</main>
	)
}

const getData = async (userid: string, products: string[], sessionId: string) => {
	const paymentConfig = createUserPaymentConfig('post', 'userOrder', userid, products, sessionId)
	return {
		paymentObj: await getPaymentDtl(paymentConfig)
	}
}

const getPaymentDtl = async (paymentConfig: FullPaymentConfig) => {
	const resultPaymentObj = await axios(paymentConfig)
		.then((response: AxiosResponse) => {
			const paymentObj: PaymentResponseObj = {
				paymentDetails: response.data.paymentDetails,
				productsOrder: response.data.productsOrder
			}
			return paymentObj
		})
	return resultPaymentObj
}





export default SuccessPage