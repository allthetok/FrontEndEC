/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'
import { ultraBoost } from '@/helpers/mockdata'
import React, { SyntheticEvent, useState } from 'react'
import { ProductObj } from '@/helpers/types/fetypes'
import { DropDown } from './DropDown'
import { ProductFilter } from './ProductFilter'
import { Product } from './Product'
import './ProductList.css'

const ProductList = () => {
	const [sortBy, setSortBy] = useState('Newest')

	const onSortChange = (e: SyntheticEvent<Element, Event>, value: string | null): void => {
		e.preventDefault()
		setSortBy(value!)
	}
	return (
		// <main className='p-8 bg-gray-100 flex-1'>
		<main className='p-8 bg-gray-100 flex-1'>
			<div>
				<div className='px-4 pt-20 text-center'>
					<h1 className='text-4xl font-extrabold tracking-normal'>
						AT Kicks
					</h1>
					<p className='mx-auto mt-4 max-w-3xl text-xl whitespace-nowrap'>
						Walk into the next new style. Sport, Home, Travel. AT Kicks is a step above the rest.
					</p>
				</div>
			</div>
			<div className='flex items-center justify-between border-b border-gray-200 pb-4 pt-24 dark:border-gray-800'>
				<h1 className='text-xl font-bold tracking-tight sm:text-2xl'>
					{ultraBoost.length} results
				</h1>
				<DropDown sortBy={sortBy} onSortChange={onSortChange} />
			</div>
			<section className='pb=24 pt-6' aria-labelledby='products-heading'>
				<div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
					<ProductFilter />
					<div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-3 lg:gap-x-8'>
						{ultraBoost.map((product: ProductObj, index: number) => (
							<Product product={product} key={index}/>
						))}
					</div>
				</div>
			</section>
		</main>
	)
}




{/* <section className='text-gray-700 body-font overflow-hidden'>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
					{ultraBoost.map((item: any, index: number) => (
						<Link href='' key={index}>
							<div className='bg-white h-full rounded-lg overflow-hidden'>
								<div className='flex flex-col p-8'>
									<div className='block relative h-48 rounded overflow-hidden'>
										<img className='object-contain object-center w-full h-full block' src={ultraBoost[1].images[0]}/>
									</div>
									<div className='pt-8 flex justify-between'>
										<div className='flex-1 mr-3'>
											<h2 className='text-gray-900 title-font text-sm font-bold capitalize'>{item.name}</h2>
											<span className='pt-1 text-xs text-gray-500'>{item.brand}</span>
										</div>
										<p className='font-bold text-xl text-indigo-500'>
											$&nbsp;{item.price}
										</p>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			</section> */}

{/* <Link className='group text-sm' href='' key={index}>
							<div className='w-full overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-100 group-hover:opacity-75'>
								<img className='h-full w-full object-cover object-center product-image' src={ultraBoost[1].images[0]} alt={`${item.name}`}/>
							</div>
							<h3 className='mt-4 font-medium flex flex-1 items-center justify-between'>
								<div className='hover:underline'>{item.name}</div>
								<span className='pt-1 text-xs text-gray-500 uppercase'>{item.brand}</span>
							</h3>
							<p className='mt-2 font-medium text-sm'>
								${Number(item.price).toFixed(2)}
							</p>
						</Link> */}

export { ProductList }