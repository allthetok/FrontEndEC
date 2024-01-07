/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { GetServerSideProps, GetServerSidePropsContext  } from 'next'
import { createProductDtlConfig, formatPageQuery } from '@/helpers/fctns'
import { FullProductConfig, ProductObj } from '@/helpers/types/fetypes'
import { FullProductServer } from '@/components/Server/FullProductServer'


// export default function Home() {
// 	return (
// 		<main className="flex min-h-screen flex-col items-center justify-between p-24">
// 			<FullProduct />
// 		</main>
// 	)
// }

// const ProductPage = (props: { productDtl: ProductObj }, { params: any }) => {
// 	return (
// 		<main className="flex min-h-screen flex-col items-center justify-between p-24">
// 			<FullProductServer productDtl={props.productDtl} productSearch={params.product} />
// 		</main>
// 	)
// }

// const getProductDtl = async (productConfig: FullProductConfig) => {
// 	const resultProductObj: ProductObj = await axios(productConfig)
// 		.then((response: AxiosResponse) => {
// 			console.log(response.data.productReq)
// 			return response.data
// 		})
// 		.catch((err: AxiosError) => {
// 			console.error(err)
// 		})
// 	return resultProductObj
// }

// export const getServerSideProps = async (context: GetServerSidePropsContext) => {
// 	// const productSearchConfig = createProductDtlConfig('post', 'product', context.params!.product!)
// 	const { productSearch: any } = context.params
// 	console.log
// 	console.log(context.params!.product!)
// 	console.log(productSearchConfig)
// 	return {
// 		props: {
// 			productDtl: await getProductDtl(productSearchConfig),
// 			productSearch: context.params!.product
// 		}
// 	}
// }

// export const getServerSideProps = ({ params }) => {
// 	const product = params!
// 	console.log(product)
// 	return {
// 		props: {
// 			product
// 		}
// 	}
// }

// const ProductPage = ({ product }: any) => {
// 	console.log(product)
// 	return (
// 		<main className="flex min-h-screen flex-col items-center justify-between p-24">
// 			<div>
// 				My Route: {product}
// 			</div>
// 		</main>
// 	)
// }

// export default ProductPage

export const getServerSideProps = ({ params }: { params: { productReq: string | string[] }}) => {
	return {
		props: {
			productReq: params.productReq
		}
	}
}

export default function ProductPage(props: any) {
	const data = { props }
	console.log(props)
	console.log(props.params)
	console.log(props.params.productReq)
	console.log(formatPageQuery(props.params.productReq))
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div>
				My Route: {props.params.productReq}
			</div>
		</main>
	)
}

// export default function ProductPage({ params }: { params: { productReq: string | string[] }}) {
// 	return (
// 		<main className="flex min-h-screen flex-col items-center justify-between p-24">
// 			<div>
// 				My Route: {params.productReq}
// 			</div>
// 		</main>
// 	)
// }