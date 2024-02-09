/* eslint-disable no-case-declarations */
import { Product } from 'use-shopping-cart/core'
import { Brands, Colors, FullBrandConfig, FullModelConfig, FullProductConfig, Models, ProductObj, SearchConfig } from './types/fetypes'

const formatDate = (inpDate: Date) => `${inpDate.toLocaleDateString('default', { month: 'long' })} ${inpDate.getUTCDate()}, ${inpDate.getFullYear()}`

const createProductDtlConfig = (method: string, endpoint: string, productReq: string | string[]): FullProductConfig => {
	return {
		method: method,
		url: `http://localhost:4000/api/shoes/${endpoint}`,
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			product: handleParamConform(productReq, 'string') as string
		}
	}
}

const createDeprecatedBrandDtlConfig = (method: string, endpoint: string, brandReq: string | string[]): FullBrandConfig => {

	return {
		method: method,
		url: `http://localhost:4000/api/shoes/${endpoint}`,
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			brand: handleParamConform(brandReq, 'string')
		}
	}
}

const createBrandDtlConfig = (method: string, endpoint: string, brandReq: string | string[] | undefined): FullBrandConfig => {
	return brandReq ? {
		method: method,
		url: `http://localhost:4000/api/shoes/${endpoint}`,
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			brand: handleParamConform(brandReq, 'array') as string[]
		}
	} : {
		method: method,
		url: `http://localhost:4000/api/shoes/${endpoint}`,
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			brand: ['all']
		}
	}
}

const createModelDtlConfig = (method: string, endpoint: string, modelReq: string | string[]): FullModelConfig => {
	return {
		method: method,
		url: `http://localhost:4000/api/shoes/${endpoint}`,
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			model: handleParamConform(modelReq, 'string') as string
		}
	}
}

const createProductSearchConfig = (method: string, endpoint: string, searchterm: string): SearchConfig => {
	return {
		method: method,
		url: `http://localhost:4000/api/shoes/${endpoint}`,
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			searchterm: searchterm
		}
	}
}

const createUserExistConfig = (method: string, endpoint: string, email: string, provider: string) => {
	return {
		method: method,
		url: `http://localhost:4000/api/user/${endpoint}`,
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			email: email,
			provider: provider
		}
	}
}

const handleParamConform = (inputReq: string | string[], spec: string) => {
	switch (spec) {
	case 'string':
		if (typeof inputReq !== 'string') {
			return inputReq.join('')
		}
		return inputReq
	case 'array':
		if (typeof inputReq === 'string') {
			return [inputReq]
		}
		return inputReq
	default:
		return inputReq
	}
}

const formatPageQuery = (inputQuery: string | string []) => {
	if (typeof inputQuery !== 'string') {
		inputQuery = inputQuery.join('')
	}
	inputQuery = inputQuery.replaceAll('%20', ' ')
	return inputQuery
}

const comparePriceHigh = (ind1: ProductObj, ind2: ProductObj) => {
	if (ind1.price > ind2.price) {
		return -1
	}
	else if (ind1.price < ind2.price) {
		return 1
	}
	else {
		return 0
	}
}

const comparePriceLow = (ind1: ProductObj, ind2: ProductObj) => {
	if (ind1.price > ind2.price) {
		return 1
	}
	else if (ind1.price < ind2.price) {
		return -1
	}
	else {
		return 0
	}
}

const compareName = (ind1: ProductObj | Models, ind2: ProductObj | Models) => {
	if (ind1.name > ind2.name) {
		return 1
	}
	else if (ind1.name < ind2.name) {
		return -1
	}
	else {
		return 0
	}
}

const compareDate = (ind1: ProductObj, ind2: ProductObj) => {
	if (ind1.releaseDate > ind2.releaseDate) {
		return -1
	}
	else if (ind1.releaseDate < ind2.releaseDate) {
		return 1
	}
	else {
		return 0
	}
}

const compareBySortOption = (sortBy: string) => {
	switch (sortBy) {
	case 'Price, high to low':
		return comparePriceHigh
	case 'Price, low to high':
		return comparePriceLow
	case 'Name, A to Z':
		return compareName
	case 'Newest':
		return compareDate
	}
}

const retrieveOriginalResults = (brandDtl: Brands[]) => {
	const allProducts: ProductObj[] = []
	for (let i = 0; i < brandDtl.length; i++) {
		for (let j = 0; j < brandDtl[i].allModels.length; j++) {
			for (let k = 0; k < brandDtl[i].allModels[j].allProducts.length; k++) {
				allProducts.push(brandDtl[i].allModels[j].allProducts[k])
			}
		}
	}
	return allProducts
}

const retrieveSubOptions: (brandDtl: Brands[], specified: string) => Models[] | ProductObj[] = (brandDtl: Brands[], specified: string) =>  {
	switch (specified) {
	case 'models':
		const modelsFiltered: Models[] = []
		for (let i = 0; i < brandDtl.length; i++) {
			for (let j = 0; j < brandDtl[i].allModels.length; j++) {
				modelsFiltered.push({ ...brandDtl[i].allModels[j], active: true })
			}
		}
		return modelsFiltered
	case 'editions':
		const editionsFiltered: ProductObj[] = retrieveOriginalResults(brandDtl)
		return editionsFiltered.map((indProduct: ProductObj) => ({ ...indProduct, active: true }))
	default:
		return []
	}
}

const prodToStripeProd: (inputProd: ProductObj, colorSelect: string | string[], sizeSelect: string) => Product = (inputProd: ProductObj, colorSelect: string | string[], sizeSelect: string) => {
	const stripeProduct: Product = {
		name: inputProd.name,
		description: inputProd.description,
		id: inputProd.id.toString(),
		// price: inputProd.price,
		price: inputProd.price * 100,
		quantity: '1',
		currency: 'USD',
		image: inputProd.colors.filter((indColor: Colors) => indColor.color === colorSelect)[0].images[0],
		product_data: {
			colorSelected: colorSelect,
			sizeSelected: sizeSelect
		}
	}
	return stripeProduct
}

const regexValidEmail = (email: string) => {
	const emailRegex = /\S+@\S+\.\S+/
	return emailRegex.test(email)
}


export { formatDate, createProductDtlConfig, createBrandDtlConfig, createDeprecatedBrandDtlConfig, createModelDtlConfig, createProductSearchConfig, createUserExistConfig, formatPageQuery, compareBySortOption, compareName, retrieveOriginalResults, retrieveSubOptions, prodToStripeProd, regexValidEmail }