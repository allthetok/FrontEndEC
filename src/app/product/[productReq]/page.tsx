/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { createProductDtlConfig, formatPageQuery } from '@/helpers/fctns'
import { FullProductConfig, ProductObj } from '@/helpers/types/fetypes'
import { FullProductServer } from '@/components/Server/FullProductServer'

export default async function ProductPage({ params }: { params: { productReq: string | string[] }}) {
	const { productObj } = await getData(params.productReq)
	console.log(productObj)
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div>
				Hello from ${productObj.brand}
			</div>
		</main>
	)
}

const getProductDtl = async (productConfig: FullProductConfig) => {
	const resultProductObj: ProductObj = await axios(productConfig)
		.then((response: AxiosResponse) => {
			return response.data.productReq
		})
		.catch((err: AxiosError) => {
			console.error(err)
		})
	return resultProductObj
}

const getData = async (productReq: string | string[]) => {
	const productSearchConfig = createProductDtlConfig('post', 'product', formatPageQuery(productReq))
	return {
		productObj: await getProductDtl(productSearchConfig)
	}
}

