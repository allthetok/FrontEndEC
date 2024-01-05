/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { GetServerSidePropsContext  } from 'next'
import { createProductDtlConfig } from '@/helpers/fctns'
import { FullProductConfig, ProductObj } from '@/helpers/types/fetypes'
import { FullProductServer } from '@/components/Server/FullProductServer'


// export default function Home() {
// 	return (
// 		<main className="flex min-h-screen flex-col items-center justify-between p-24">
// 			<FullProduct />
// 		</main>
// 	)
// }

const ProductPage = (props: { productDtl: ProductObj }) => {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<FullProductServer productDtl={props.productDtl} />
		</main>
	)
}

const getProductDtl = async (productConfig: FullProductConfig) => {
	const resultProductObj: ProductObj = await axios(productConfig)
		.then((response: AxiosResponse) => {
			return response.data
		})
		.catch((err: AxiosError) => {
			console.error(err)
		})
	return resultProductObj
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
	const productSearchConfig = createProductDtlConfig('post', 'product', context.params!.product!)
	console.log(context.params!.product!)
	return {
		props: {
			productDtl: await getProductDtl(productSearchConfig)
		}
	}
}

export default ProductPage