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

interface SearchConfig {
	method: string,
	url: string,
	headers: object,
	data: {
		searchterm: string
	}
}

interface UserExistConfig {
	method: string,
	url: string,
	headers: object,
	data: {
		email: string,
		provider: string
	}
}

interface OAuthConfig {
	method: string,
	url: string,
	headers: object,
	data: {
		email: string,
		emailVerified: boolean | null | undefined,
		externalId: string,
		provider: string
	}
}

interface LoginConfig {
	method: string,
	url: string,
	headers: object,
	data: {
		email: string,
		password: string,
		provider: string
	}
}

interface FullPaymentConfig {
	method: string,
	url: string,
	headers: object,
	data: {
		userid: number,
		products: string[],
		sessionId: string
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

interface ModelPageConfig {
	link: string,
	name: string,
	prodCount: number
}

interface HomePageConfig {
	name: string,
	src: string
}

interface MetaProductData {
	colorSelected: string,
	sizeSelected: string
}

interface PaymentResponseObj {
	paymentDetails: {
		paymentid: number,
		userid: number,
		stripeid: string,
		productList: string[]
	},
	productsOrder: ProductObj[]
}



export { type ProductPreview, type ProductObj, type FullProductConfig, type Colors, type ColorSizes, type ProductSizes, type ProductResponseObj, type FullBrandConfig, type FullModelConfig, type OAuthConfig, type LoginConfig, type FullPaymentConfig, type Brands, type Models, type ModelPageConfig, type HomePageConfig, type SearchConfig, type MetaProductData, type UserExistConfig, type PaymentResponseObj }