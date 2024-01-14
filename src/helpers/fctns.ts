import { FullBrandConfig, FullProductConfig } from './types/fetypes'

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
		url: `http://localhost:3002/api/shoes/${endpoint}`,
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			product: productSpec(productReq)
		}
	}
}

const createDeprecatedBrandDtlConfig = (method: string, endpoint: string, brandReq: string | string[]): FullBrandConfig => {
	const brandSpec = (brandReq: string | string[]) => {
		if (typeof brandReq !== 'string') {
			return brandReq.join('')
		}
		return brandReq
	}
	return {
		method: method,
		url: `http://localhost:3002/api/shoes/${endpoint}`,
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			brand: brandSpec(brandReq)
		}
	}
}

const createBrandDtlConfig = (method: string, endpoint: string, brandReq: string[] | undefined): FullBrandConfig => {
	return brandReq ? {
		method: method,
		url: `http://localhost:3002/api/shoes/${endpoint}`,
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			brand: brandReq
		}
	} : {
		method: method,
		url: `http://localhost:3002/api/shoes/${endpoint}`,
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			brand: ['all']
		}
	}

}

const formatPageQuery = (inputQuery: string | string []) => {
	if (typeof inputQuery !== 'string') {
		inputQuery = inputQuery.join('')
	}
	inputQuery = inputQuery.replaceAll('%20', ' ')
	return inputQuery
}

export { formatDate, createProductDtlConfig, createBrandDtlConfig, createDeprecatedBrandDtlConfig, formatPageQuery }