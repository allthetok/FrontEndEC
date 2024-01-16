/* eslint-disable no-case-declarations */
import { Brands, FullBrandConfig, FullProductConfig, Models, ProductObj } from './types/fetypes'

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

const createBrandDtlConfig = (method: string, endpoint: string, brandReq: string | string[] | undefined): FullBrandConfig => {
	const brandSpec = (brandReq: string | string[]) => {
		if (typeof brandReq === 'string') {
			return [brandReq]
		}
		return brandReq
	}
	return brandReq ? {
		method: method,
		url: `http://localhost:3002/api/shoes/${endpoint}`,
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			brand: brandSpec(brandReq)
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


export { formatDate, createProductDtlConfig, createBrandDtlConfig, createDeprecatedBrandDtlConfig, formatPageQuery, compareBySortOption, compareName, retrieveOriginalResults, retrieveSubOptions }