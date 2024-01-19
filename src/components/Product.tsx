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
		<div className='group text-sm'>
			<div className='w-full overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-100 group-hover:opacity-75'>
				<Link href={`/product/${product.name}`}>
					<img className='h-full w-full object-cover object-center product-image' src={product.colors[0].images[0]} alt={`${product.name}`}/>
				</Link>
			</div>
			<h3 className='mt-4 font-medium flex flex-1 items-center justify-between'>
				<Link href={`/product/${product.name}`}>
					<div className='hover:underline'>{product.name}</div>
				</Link>
				<Link href={`/products/?brand=${product.brand}`}>
					<span className='pt-1 text-xs text-gray-500 uppercase hover:underline'>{product.brand}</span>
				</Link>
			</h3>
			<div className='mt-2 font-medium flex flex-1 items-center justify-between text-sm'>
				<p>
					${product.price.toFixed(2)}
				</p>
				<Link href={`/model/${product.modelName}`}>
					<span className='pt-1 text-xs text-gray-500 uppercase hover:underline'>{product.modelName}</span>
				</Link>
			</div>
		</div>
	)
}

// 		<Link className='group text-sm' href={`/product/${product.name}`}>
// 			<div className='w-full overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-100 group-hover:opacity-75'>
// 				<img className='h-full w-full object-cover object-center product-image' src={product.colors[0].images[0]} alt={`${product.name}`}/>
// 				{/* <img className='h-full w-full object-fill object-center product-image' src={product.colors[0].images[0]} alt={`${product.name}`}/> */}

// 			</div>
// 			<h3 className='mt-4 font-medium flex flex-1 items-center justify-between'>
// 				<div className='hover:underline'>{product.name}</div>
// 				<Link href={`/products/?brand=${product.brand}`}>
// 					<span className='pt-1 text-xs text-gray-500 uppercase'>{product.brand}</span>
// 				</Link>
// 			</h3>
// 			<div className='mt-4 font-medium flex flex-1 items-center justify-between'>
// 				<div className='hover:underline'>{product.name}</div>
// 			</div>
// 			<p className='mt-2 font-medium text-sm'>
// 				${product.price.toFixed(2)}
// 			</p>
// 		</Link>

export { Product }