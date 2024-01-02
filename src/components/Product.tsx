/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import { ProductPreview } from '@/helpers/types/fetypes'
import './ProductList.css'


type ProductProps = {
	product: ProductPreview
}

const Product = ({ product }: ProductProps) => {
	return (
		<Link className='group text-sm' href='' key={product.index}>
			<div className='w-full overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-100 group-hover:opacity-75'>
				{/* <Image className='h-full w-full object-cover object-center' src={ultraBoost[1].images[0]} alt={`${item.name}`} loading='lazy' width={255} height={280}/> */}
				<img className='h-full w-full object-cover object-center product-image' src={product.image} alt={`${product.name}`}/>
			</div>
			<h3 className='mt-4 font-medium flex flex-1 items-center justify-between'>
				<div className='hover:underline'>{product.name}</div>
				<span className='pt-1 text-xs text-gray-500 uppercase'>{product.brand}</span>
			</h3>
			<p className='mt-2 font-medium text-sm'>
				${Number(product.price).toFixed(2)}
			</p>
		</Link>
	)
}

export { Product }