interface ProductPreview {
	images: string | string[],
	name: string,
	brand: string,
	price: number
}

interface FullProduct {
	id: number,
	brand: string,
	modelName: string,
	name: string,
	releaseDate: string,
	colors: string[],
	images: string[],
	price: number,
	description: string
}

export { type ProductPreview, type FullProduct  }