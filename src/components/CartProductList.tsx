import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { FullProductConfig, ProductObj } from '@/helpers/types/fetypes'
import { createProductDtlConfig } from '@/helpers/fctns'
import { Product } from './Product'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { AdditionalCartSx, Font35Sx, RemoveCartSx } from '@/sx/styling'
import './ProductList.css'
import { Button } from '@mui/material'


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
		<section className='pb-24 pt-6 bg-gray-100' aria-labelledby='products-heading'>
			{productCartList.length !== 0 ?
				( <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:col-span-3 lg:gap-x-8 border-2 rounded-lg border-black'>
					{productCartList.map((product: ProductObj, index: number) => (
						<div className='flex flex-col p-10' key={index}>
							<Product product={product} key={index} />
							<button className='flex flex-row justify-center items-center bg-[#a9a9a9] py-[0.5rem] px-[2rem] max-w-[120px] '>
								<HighlightOffIcon sx={Font35Sx} />
								<p className='text-lg font-bold pt-[0.375rem] text-white uppercase'>Remove</p>
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