import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { FullProductConfig, ProductObj } from '@/helpers/types/fetypes'
import './ProductList.css'
import { createProductDtlConfig, formatPageQuery } from '@/helpers/fctns'
import { Product } from './Product'

type CartProductProps = {
	names: string[],
	ids: string[]
}

const CartProductList = ({ names, ids }: CartProductProps) => {
	const [productCartList, setProductCartList] = useState<ProductObj[]>([])

	const getData = async (products: string[]) => {
		console.log(products)
		const resProducts: ProductObj[] = []
		for (const product of products) {
			console.log(product)
			const productSearchConfig = createProductDtlConfig('post', 'product', product)
			console.log(productSearchConfig)
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
		<section className='pb-24 pt-6' aria-labelledby='products-heading'>
			{productCartList.length === 0 ?
				(<div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-3 lg:gap-x-8'>
					{productCartList.map((product: ProductObj, index: number) => (
						<Product product={product} key={index} />
					))}
				</div>)
				: <h2 className='text-3xl leading-10 font-extrabold uppercase'>
					Shop <Link className='none'>
						</Link> Products to Checkout
				</h2>}
		</section>
	)
}

export { CartProductList }