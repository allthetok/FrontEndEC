import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useShoppingCart } from 'use-shopping-cart'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { FullProductConfig, ProductObj } from '@/helpers/types/fetypes'
import { createProductDtlConfig } from '@/helpers/fctns'
import { Product } from './Product'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { AdditionalCartSx, Font35Sx, RemoveCartSx } from '@/sx/styling'
import './ProductList.css'


type CartProductProps = {
	names: string[],
	ids: string[]
}

const CartProductList = ({ names, ids }: CartProductProps) => {
	const [productCartList, setProductCartList] = useState<ProductObj[]>([])

	const { removeItem, cartDetails, clearCart, cartCount } = useShoppingCart()


	const getData = async (products: string[]) => {
		const resProducts: ProductObj[] = []
		for (const product of products) {
			const productSearchConfig = createProductDtlConfig('post', 'product', product)
			resProducts.push(await getProductDtl(productSearchConfig))
		}
		return resProducts
	}

	const getProductDtl = async (productConfig: FullProductConfig) => {
		const resultProductObj = await axios(productConfig)
			.then((response: AxiosResponse) => {
				return response.data.productReq as ProductObj
			})
		return resultProductObj
	}

	useEffect(() => {
		const getAllCartItems = async () => {
			const resProductList: ProductObj[] = await getData(names)
			setProductCartList(resProductList)
		}

		getAllCartItems()
	}, [names])

	return (
		<section className='pb-24 pt-6 bg-gray-100' aria-labelledby='products-heading'>
			{productCartList.length !== 0 ?
				( <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:col-span-3 lg:gap-x-8 border-2 rounded-lg border-black'>
					{productCartList.map((product: ProductObj, index: number) => (
						<div className='flex flex-col p-10 justify-center' key={index}>
							<Product product={product} key={index} />
							<button className='group flex flex-row justify-center items-center bg-gray-300 pb-2 mx-auto px-2 max-w-[120px] rounded-xl border border-black hover:bg-gray-700 hover:border-white hover:text-white' onClick={() => removeItem(product.id.toString())}>
								<HighlightOffIcon sx={Font35Sx} className='group-hover:text-white'/>
								<p className='text-lg font-bold pt-[0.375rem] text-black uppercase group-hover:text-white'>Remove</p>
							</button>
						</div>
					))}
				</div>)
				: <Link className='fixed ml-[-250px] text-3xl leading-10 font-extrabold uppercase text-gray-500 hover:text-gray-700 flex flex-row' href='/products'>
					<p>Shop Products to Checkout</p>
					<ArrowCircleRightIcon sx={Font35Sx} />
				</Link>}
		</section>
	)
}

export { CartProductList }