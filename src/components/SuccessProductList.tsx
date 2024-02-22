/* eslint-disable @typescript-eslint/no-non-null-assertion */
// 'use client'
import React from 'react'
import { ProductObj } from '@/helpers/types/fetypes'
import { Product } from './Product'
import './ProductList.css'

type SuccessProductListProps = {
	products: ProductObj[],
	paymentId: number
}

const SuccessProductList = ({ products, paymentId }: SuccessProductListProps) => {
	// const { clearCart } = useShoppingCart()
	// const [productList, setProductList] = useState<ProductObj[]>([])

	// const getData = async (products: string[]) => {
	// 	const resProducts: ProductObj[] = []
	// 	for (const product of products) {
	// 		const productSearchConfig = createProductDtlConfig('post', 'product', product)
	// 		resProducts.push(await getProductDtl(productSearchConfig))
	// 	}
	// 	return resProducts
	// }

	// const getProductDtl = async (productConfig: FullProductConfig) => {
	// 	const resultProductObj = await axios(productConfig)
	// 		.then((response: AxiosResponse) => {
	// 			return response.data.productReq as ProductObj
	// 		})
	// 	return resultProductObj
	// }

	// useEffect(() => {
	// 	const getAllCartItems = async () => {
	// 		const resProductList: ProductObj[] = await getData(cartNames)
	// 		setProductList(resProductList)
	// 	}
	// 	getAllCartItems()
	// }, [cartNames])

	return (
		<div className='flex flex-row'>
			{products.length !== 0 ?
				(<section className='pb-24 pt-6 bg-gray-100 border-2 rounded-lg border-black mt-5' aria-labelledby='products-heading'>
					<div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:col-span-3 lg:gap-x-8'>
						{products.map((product: ProductObj, index: number) => (
							<div className='flex flex-col p-10 justify-center' key={index}>
								<Product product={product} key={index} />
							</div>
						))}
					</div>
				</section>) : <></>}
			<section className='mt-5 rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-6 shadow-md sm:p-6 lg:col-span-5 lg:p-8 ml-20 h-[350px] w-[470px]'>
				<h2 className='text-lg font-medium flex flex-row justify-center border-b-2 border-black'>
					Payment Details for Order: #{paymentId}
				</h2>
				<dl className='mt-6 space-y-4'>
					<div className='flex items-center justify-between'>
						<dt className='text-sm'>
							Subtotal
						</dt>
						<dd className='text-sm font-medium'>
							${products.map((indProduct: ProductObj) => indProduct.price).reduce((a, b) => a + b).toFixed(2)} USD
						</dd>
					</div>
					<div className='flex items-center justify-between border-t border-gray-200 pt-4'>
						<dt className='flex items-center text-sm'>
							<span>Shipping estimate</span>
						</dt>
						<dd className='text-sm font-medium'>
							$5.00 USD
						</dd>
					</div>
					<div className='flex items-center justify-between border-t border-gray-200 pt-4'>
						<dt className='text-base font-medium'>
							Order Total
						</dt>
						<dd className='text-base font-medium'>
							${(products.map((indProduct: ProductObj) => indProduct.price).reduce((a, b) => a + b) + 5).toFixed(2)} USD
						</dd>
					</div>
				</dl>
			</section>
		</div>
	)
}

export { SuccessProductList }