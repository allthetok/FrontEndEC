/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import Link from 'next/link'
import { stripe } from '../../../../lib/stripe'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { createUserPaymentConfig, formatLineItemsToName } from '@/helpers/fctns'
import { FullPaymentConfig, PaymentResponseObj } from '@/helpers/types/fetypes'
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
			<div className='flex flex-col'>
				<div className='flex flex-col justify-center items-center mt-10'>
					<Link href='/account' className='flex flex-row justify-center rounded-md account-link bg-black text-white text-2xl font-bold'>
						Go to Account
					</Link>
				</div>
				<SuccessHeader customerDetails={stripeCustDetails!} paymentId={paymentObj.paymentDetails.paymentid} />
				{/* <div className='flex flex-col justify-center items-center mt-4'>
					<Link href='/account' className='flex flex-row justify-center rounded-md account-link bg-black text-white text-2xl font-bold'>
						Go to Account
					</Link>
				</div> */}
				<h2 className='flex flex-row justify-center mt-5 text-3xl font-bold'>Here are your order details:</h2>
				<SuccessProductList products={paymentObj.productsOrder} paymentId={paymentObj.paymentDetails.paymentid} />
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