'use client'
import React, { SyntheticEvent, useState } from 'react'
import { Brands, ProductObj } from '@/helpers/types/fetypes'
import { DropDown } from '../DropDown'
import { Product } from '../Product'
import { ProductFilter } from '../ProductFilter'

type BrandProps = {
	brandDtl: Brands[]
}

const BrandServer = ({ brandDtl }: BrandProps) => {
	const [filteredResults, setFilteredResults] = useState(() => {
		const productsFiltered: ProductObj[] = []
		for (let i = 0; i < brandDtl.length; i++) {
			for (let j = 0; j < brandDtl[i].allModels.length; j++) {
				for (let k = 0; k < brandDtl[i].allModels[j].allProducts.length; k++) {
					productsFiltered.push(brandDtl[i].allModels[j].allProducts[k])
				}
			}
		}
		return productsFiltered
	})

	const [sortBy, setSortBy] = useState('Newest')

	const onSortChange = (e: SyntheticEvent<Element, Event>, value: string | null): void => {
		e.preventDefault()
		setSortBy(value!)
	}
	// console.log(filteredResults)
	console.log(brandDtl.map((indBrand: Brands) => indBrand.name))
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
			<div className='flex items-center justify-between border-b border-gray-200 pb-4 pt-24 dark:border-gray-800'>
				<h1 className='text-xl font-bold tracking-tight sm:text-2xl'>
					{filteredResults.length} results
				</h1>
				<DropDown sortBy={sortBy} onSortChange={onSortChange} />
			</div>
			<section className='pb=24 pt-6' aria-labelledby='products-heading'>
				<div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
					<ProductFilter brandSelect={brandDtl.map((indBrand: Brands) => indBrand.name)} />
					<div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-3 lg:gap-x-8'>
						{filteredResults.map((product: ProductObj, index: number) => (
							<Product product={product} key={index} />
						))}
					</div>
				</div>
			</section>
		</main>
	)
}

export { BrandServer }