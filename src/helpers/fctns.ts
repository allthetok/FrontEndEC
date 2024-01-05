import { FullProductConfig } from './types/fetypes'

const formatDate = (inpDate: Date) => `${inpDate.toLocaleDateString('default', { month: 'long' })} ${inpDate.getUTCDate()}, ${inpDate.getFullYear()}`

const createProductDtlConfig = (method: string, endpoint: string, productReq: string | string[]): FullProductConfig => {
	const productSpec = (productReq: string | string[]) => {
		if (typeof productReq !== 'string') {
			return productReq.join('')
		}
		return productReq
	}
	return {
		method: method,
		url: `https://localhost:3002/api/shoes/${endpoint}`,
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			productReq: productSpec(productReq)
		}
	}
}

export { formatDate, createProductDtlConfig }