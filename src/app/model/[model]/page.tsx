/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { createProductDtlConfig, formatPageQuery } from '@/helpers/fctns'
import { FullProductConfig, ProductObj, ProductResponseObj } from '@/helpers/types/fetypes'
import { ModelServer } from '@/components/Server/ModelsServer'

const ModelPage = async ({ params }: { params: { model: string | string[] } }) => {
	const { modelObj } = await getData(params.model)
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<ModelServer modelProducts={modelObj.allProducts} />
		</main>
	)
}

const getData = async (model: string | string[]) => {
	const productSearchConfig = createProductDtlConfig('post', 'model', formatPageQuery(model))
	return {
		modelObj: await getModelDtl(productSearchConfig)
	}
}

const getModelDtl = async (productConfig: FullProductConfig) => {
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