/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { createProductDtlConfig, formatPageQuery } from '@/helpers/fctns'
import { FullProductConfig, ProductObj, ProductResponseObj } from '@/helpers/types/fetypes'
import { FullProductServer } from '@/components/Server/FullProductServer'

const ModelPage = async ({ params }: { params: { product: string | string[] } }) => {
	const { productObj } = await getData(params.product)
	const color = searchParams.color !== undefined ? searchParams.color : productObj.productReq.colors[0].color
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<FullProductServer productDtl={productObj.productReq} colorQuery={color} similarProducts={productObj.similarProducts}/>
		</main>
	)
}

const getData = async (product: string | string[]) => {
	const productSearchConfig = createProductDtlConfig('post', 'product', formatPageQuery(product))
	return {
		productObj: await getProductDtl(productSearchConfig)
	}
}

const getProductDtl = async (productConfig: FullProductConfig) => {
	const resultProductObj = await axios(productConfig)
		.then((response: AxiosResponse) => {
			const productObj: ProductResponseObj = {
				productReq: response.data.productReq,
				similarProducts: response.data.similarProducts
			}
			return productObj
		})
		// .catch((err: AxiosError) => {
		// 	console.error(err)
		// })
	return resultProductObj
}

export default ModelPage