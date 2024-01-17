'use client'
import React, { useState, useEffect, SyntheticEvent } from 'react'
import { compareBySortOption } from '@/helpers/fctns'
import { ProductObj } from '@/helpers/types/fetypes'
import { Product } from '../Product'
import { DropDown } from '../DropDown'
import Link from 'next/link'

type ModelServerProps = {
	brandName: string,
	modelName: string,
	modelProducts: ProductObj[]
}

const ModelServer = ({ brandName, modelName, modelProducts }: ModelServerProps) => {
	const [fullProducts, setFullProducts] = useState(modelProducts)
	const [sortBy, setSortBy] = useState('Newest')

	useEffect(() => {
		const sortedList: ProductObj[] = [...fullProducts]
		sortedList.sort(compareBySortOption(sortBy))
		setFullProducts(sortedList)
	}, [sortBy])

	const onSortChange = (e: SyntheticEvent<Element, Event>, value: string | null): void => {
		e.preventDefault()
		setSortBy(value!)
	}
	return (
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
			<div className='flex flex-row items-center justify-between border-b border-gray-200 pb-4 pt-24 dark:border-gray-800'>
				<h1 className='text-xl font-bold tracking-tight sm:text-2xl'>
					{modelProducts.length} results
				</h1>
				<h1 className='text-2xl title-font uppercase text-gray-500 tracking-widest pl-20 flex flex-row justify-start'>
					<Link href={`/products/?brand=${brandName}`}>
						{brandName}
					</Link>
					&nbsp;-&nbsp;
					<p>{modelName}</p>
				</h1>
				<DropDown sortBy={sortBy} onSortChange={onSortChange}/>
			</div>
			<section className='pb-24 pt-6' aria-labelledby='products-heading'>
				{/* <h1 className='flex flex-row justify-center text-3xl font-bold tracking-normal pb-6'> */}
				{/* <h1 className='text-2xl title-font uppercase text-gray-500 tracking-widest mb-2'>
					{brandName} - {modelName}
				</h1> */}
				{/* <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'> */}
				<div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-1'>
					{modelProducts.length === 4 ?
						<div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-4 lg:gap-x-8'>
							{fullProducts.map((product: ProductObj, index: number) => (
								<Product product={product} key={index} />
							))}
						</div>
						:
						<div className='flex flex-row gap-x-6 gap-y-10 justify-center self-center content-center min-w-[1532px]'>
							{fullProducts.map((product: ProductObj, index: number) => (
								<Product product={product} key={index} />
							))}
						</div>
					}
				</div>
			</section>
		</main>
	)
}

export { ModelServer }