interface ProductPreview {
	images: string | string[],
	name: string,
	brand: string,
	price: number
}

interface ProductObj {
	id: number,
	brand: string,
	brandId: number,
	modelId: number,
	modelName: string,
	name: string,
	releaseDate: Date | string,
	colors: Colors[],
	price: number,
	description: string,
	sizes: ColorSizes[],
	active?: boolean
}

interface FullProductConfig {
	method: string,
	url: string,
	headers: object,
	data: {
		product: string
	}
}

interface FullBrandConfig {
	method: string,
	url: string,
	headers: object,
	data: {
		brand: string | string[]
	}
}

interface FullModelConfig {
	method: string,
	url: string,
	headers: object,
	data: {
		model: string
	}
}

interface Colors {
	color: string,
	images: string[]
}

interface ProductSizes {
	size: string,
	amount: number
}

interface ColorSizes {
	color: string,
	sizes: ProductSizes[]
}

interface ProductResponseObj {
	productReq: ProductObj,
	similarProducts: ProductObj[]
}

interface Brands {
	id: number,
	name: string,
	allModels: Models[]
}

interface Models {
	id: number,
	name: string,
	brandId: number,
	brand: string,
	allProducts: ProductObj[],
	active?: boolean
}


export { type ProductPreview, type ProductObj, type FullProductConfig, type Colors, type ColorSizes, type ProductSizes, type ProductResponseObj, type FullBrandConfig, type FullModelConfig, type Brands, type Models }