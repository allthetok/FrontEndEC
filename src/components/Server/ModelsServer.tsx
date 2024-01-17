import { ProductObj } from '@/helpers/types/fetypes'
import React from 'react'
import { Product } from '../Product'

type ModelServerProps = {
	brandName: string,
	modelName: string,
	modelProducts: ProductObj[]
}

const ModelServer = ({ brandName, modelName, modelProducts }: ModelServerProps) => {
	console.log(modelProducts)
	console.log(brandName, modelName)
	return (
		<>
			<h2>
				{brandName} - {modelName}
			</h2>
			<div>
				{modelProducts.map((indProduct: ProductObj, index: number) => (
					<Product key={index} product={indProduct} />
				))}
			</div>
		</>
	)
}

export { ModelServer }