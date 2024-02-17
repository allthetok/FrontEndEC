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

	const { paymentObj } = await getData(userDetails!.user.id, resultCheckoutItems, sessionId)

	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24 gap-10'>
			<h2 className='header-cart-count text-4xl font-bold'>Order ${sessionId} successful </h2>
			<div className='flex flex-row'>
				<SuccessProductList products={paymentObj.productsOrder} />
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


// const ProductPage = async ({ params, searchParams }: { params: { product: string | string[] }, searchParams: { color: string | string[] | undefined } }) => {
// 	const { productObj } = await getData(params.product)
// 	const color = searchParams.color !== undefined ? searchParams.color : productObj.productReq.colors[0].color
// 	return (
// 		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
// 			<FullProductServer productDtl={productObj.productReq} colorQuery={color} similarProducts={productObj.similarProducts}/>
// 		</main>
// 	)
// }




export default SuccessPage