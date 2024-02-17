/* eslint-disable @typescript-eslint/no-non-null-assertion */
// 'use client'
import React, { useEffect, useRef, useState } from 'react'
import Stripe from 'stripe'
import Link from 'next/link'
import { useShoppingCart } from 'use-shopping-cart'
import axios, { AxiosResponse } from 'axios'
import { FullProductConfig, MetaProductData, ProductObj } from '@/helpers/types/fetypes'
import { createProductDtlConfig } from '@/helpers/fctns'
import { Product } from './Product'
import { ToastRemove } from './ToastRemove'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { Font30Sx, Font35Sx } from '@/sx/styling'
import './ProductList.css'

type SuccessProductListProps = {
	products: ProductObj[]
}

const SuccessProductList = ({ products }: SuccessProductListProps) => {
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
		<>
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
		</>
	)
}

export { SuccessProductList }