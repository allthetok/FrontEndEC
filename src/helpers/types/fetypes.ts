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
	sizes: ColorSizes[]
}

interface FullProductConfig {
	method: string,
	url: string,
	headers: object,
	data: {
		product: string
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

export { type ProductPreview, type ProductObj, type FullProductConfig, type Colors }