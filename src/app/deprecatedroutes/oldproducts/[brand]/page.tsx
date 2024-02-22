/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { createBrandDtlConfig, createProductDtlConfig, formatPageQuery } from '@/helpers/fctns'
import { FullBrandConfig, ProductObj, ProductResponseObj } from '@/helpers/types/fetypes'
import { BrandServer } from '@/components/Server/BrandServer'

const ProductsPage = async ({ params, searchParams }: { params: { brand: string | string[] }, searchParams: { brandReq: string | string[] | undefined } }) => {
	const { brandObj } = await getData(params.brand)
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			{/* <BrandServer brandDtl={brandObj.brandReq} /> */}
		</main>
	)
}

const getData = async (brand: string | string[]) => {
	const brandSearchConfig = createDeprecatedBrandDtlConfig('post', 'brand', formatPageQuery(brand))
	return {
		brandObj: await getBrandDtl(brandSearchConfig)
	}
}

const getBrandDtl = async (brandConfig: FullBrandConfig) => {
	const resultBrandObj = await axios(brandConfig)
		.then((response: AxiosResponse) => {
			const brandObj = {
				brandReq: response.data.brandReq
			}
			return brandObj
		})
		// .catch((err: AxiosError) => {
		// 	console.error(err)
		// })
	return resultBrandObj
}

export default ProductsPage