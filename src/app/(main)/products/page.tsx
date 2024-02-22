/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import axios, { AxiosResponse } from 'axios'
import { createBrandDtlConfig } from '@/helpers/fctns'
import { Brands, FullBrandConfig } from '@/helpers/types/fetypes'
import { BrandServer } from '@/components/Server/BrandServer'

const ProductsPage = async ({ params, searchParams }: { params: { brand: string[] | undefined }, searchParams: { brand: string[] | undefined } }) => {
	const { brandObj } = await getData(searchParams.brand)
	const brandsParam = brandObj.brandReq.map((indBrand: Brands) => indBrand.name)

	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<Suspense fallback={<div>Loading Content...</div>}>
			<BrandServer brandDtl={brandObj.brandReq} brandsParam={brandsParam} />
		</main>
	)
}

const getData = async (brand: string | string[] | undefined) => {
	const brandSearchConfig = createBrandDtlConfig('post', 'brand', brand)
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