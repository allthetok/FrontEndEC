/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { createModelDtlConfig, formatPageQuery } from '@/helpers/fctns'
import { FullModelConfig, Models } from '@/helpers/types/fetypes'
import { ModelServer } from '@/components/Server/ModelsServer'

const ModelPage = async ({ params }: { params: { model: string | string[] } }) => {
	const { modelObj } = await getData(params.model)
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<ModelServer brandName={modelObj.brand} modelName={modelObj.name} modelProducts={modelObj.allProducts} />
		</main>
	)
}

const getData = async (model: string | string[]) => {
	const modelSearchConfig = createModelDtlConfig('post', 'model', formatPageQuery(model))
	return {
		modelObj: await getModelDtl(modelSearchConfig)
	}
}

const getModelDtl = async (modelConfig: FullModelConfig) => {
	const resultModelObj = await axios(modelConfig)
		.then((response: AxiosResponse) => {
			const modelObj: Models = response.data.modelReq
			return modelObj
		})
		// .catch((err: AxiosError) => {
		// 	console.error(err)
		// })
	return resultModelObj
}

export default ModelPage