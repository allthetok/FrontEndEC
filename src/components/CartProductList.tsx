import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { FullProductConfig, ProductObj } from '@/helpers/types/fetypes'
import { createProductDtlConfig } from '@/helpers/fctns'
import { Product } from './Product'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import { Font35Sx } from '@/sx/styling'
import './ProductList.css'


type CartProductProps = {
	names: string[],
	ids: string[]
}

const CartProductList = ({ names, ids }: CartProductProps) => {
	const [productCartList, setProductCartList] = useState<ProductObj[]>([])

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
		<section className='pb-24 pt-6' aria-labelledby='products-heading'>
			{productCartList.length !== 0 ?
				( <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-3 lg:gap-x-8'>
					{productCartList.map((product: ProductObj, index: number) => (
						<div className='flex flex-col' key={index}>
							<Product product={product} key={index} />
							<button className=''>Exit</button>
						</div>
					))}
				</div>)
				: <Link className='mt-[50px] fixed ml-[-150px] text-3xl leading-10 font-extrabold uppercase text-gray-500 hover:text-gray-700 flex flex-row' href='/products'>
					<ArrowCircleRightIcon sx={Font35Sx} />
					<p>Shop Products to Checkout</p>
				</Link>}
		</section>
	)
}

export { CartProductList }