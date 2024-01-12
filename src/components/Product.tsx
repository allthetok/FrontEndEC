/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import { ProductObj, ProductPreview } from '@/helpers/types/fetypes'
import './ProductList.css'


type ProductProps = {
	product: ProductObj
}

const Product = ({ product }: ProductProps) => {
	return (
		// <Link className='group text-sm' href={from === 'product' ? `/product/${product.name}` : `product/${product.name}`}>
		<Link className='group text-sm' href={`/product/${product.name}`}>
			<div className='w-full overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-100 group-hover:opacity-75'>
				<img className='h-full w-full object-cover object-center product-image' src={product.colors[0].images[0]} alt={`${product.name}`}/>
				{/* <img className='h-full w-full object-fill object-center product-image' src={product.colors[0].images[0]} alt={`${product.name}`}/> */}

			</div>
			<h3 className='mt-4 font-medium flex flex-1 items-center justify-between'>
				<div className='hover:underline'>{product.name}</div>
				<span className='pt-1 text-xs text-gray-500 uppercase'>{product.brand}</span>
			</h3>
			<p className='mt-2 font-medium text-sm'>
				${product.price.toFixed(2)}
			</p>
		</Link>
	)
}

export { Product }