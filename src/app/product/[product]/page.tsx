/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { createProductDtlConfig, formatPageQuery } from '@/helpers/fctns'
import { FullProductConfig, ProductObj } from '@/helpers/types/fetypes'
import { FullProductServer } from '@/components/Server/FullProductServer'

const ProductPage = async ({ params, searchParams }: { params: { product: string | string[] }, searchParams: { searchParams: { color: string | string[] | undefined }} }) => {
	const { productObj } = await getData(params.product)
	console.log(productObj)
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<FullProductServer productDtl={productObj} colorQuery={searchParams.color} />
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
	const resultProductObj: ProductObj = await axios(productConfig)
		.then((response: AxiosResponse) => {
			return response.data.productReq
		})
		.catch((err: AxiosError) => {
			console.error(err)
		})
	return resultProductObj
}

export default ProductPage