'use client'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Brands, Models, ProductObj } from '@/helpers/types/fetypes'
import { DropDown } from '../DropDown'
import { Product } from '../Product'
import { ProductFilter } from '../ProductFilter'
import { compareBySortOption, retrieveOriginalResults, retrieveSubOptions } from '@/helpers/fctns'

type BrandProps = {
	brandDtl: Brands[],
	brandsParam: string[]
}

const BrandServer = ({ brandDtl, brandsParam }: BrandProps) => {
	const [filteredResults, setFilteredResults] = useState(retrieveOriginalResults(brandDtl) as ProductObj[])
	const [modelResults, setModelResults] = useState(retrieveSubOptions(brandDtl, 'models') as Models[])
	const [editionResults, setEditionResults] = useState(retrieveSubOptions(brandDtl, 'editions') as ProductObj[])


	// const [modelResults, setModelResults] = useState(() => {
	// 	const modelsFiltered: Models[] = []
	// 	for (let i = 0; i < brandDtl.length; i++) {
	// 		for (let j = 0; j < brandDtl[i].allModels.length; j++) {
	// 			modelsFiltered.push( { ...brandDtl[i].allModels[j], active: true })
	// 		}
	// 	}
	// 	return modelsFiltered
	// })

	const [sortBy, setSortBy] = useState('Newest')

	const originalProducts = retrieveOriginalResults(brandDtl)

	useEffect(() => {
		const sortedList: ProductObj[] = [...filteredResults]
		sortedList.sort(compareBySortOption(sortBy))
		setFilteredResults(sortedList)
	}, [sortBy])

	useEffect(() => {
		const oldResults: ProductObj[] = [...originalProducts]
		const currentActiveModels: string[] = modelResults.filter((indModel: Models) => indModel.active).map((activeModel: Models) => activeModel.name)

		const currentActiveEditions: string[] = editionResults.filter((indEdition: ProductObj) => indEdition.active).map((activeEdition: ProductObj) => activeEdition.name)


		// console.log(currentActiveModels)
		const activeResults: ProductObj[] = oldResults.filter((indProduct: ProductObj) => currentActiveModels.includes(indProduct.modelName))
		activeResults.sort(compareBySortOption(sortBy))
		setFilteredResults(activeResults)
	}, [modelResults])

	useEffect(() => {
		const oldResults: ProductObj[] = [...originalProducts]
		const currentActiveEditions: string[] = editionResults.filter((indEdition: ProductObj) => indEdition.active).map((activeEdition: ProductObj) => activeEdition.name)
		const currentActiveModels: string[] = modelResults.filter((indModel: Models) => indModel.active).map((activeModel: Models) => activeModel.name)
		console.log(currentActiveEditions)
		const activeResults: ProductObj[] = oldResults.filter((indProduct: ProductObj) => currentActiveEditions.includes(indProduct.name) && currentActiveModels.includes(indProduct.modelName))
		activeResults.sort(compareBySortOption(sortBy))
		setFilteredResults(activeResults)
	}, [editionResults])


	// console.log(originalProducts)
	// console.log(filteredResults)
	// console.log(editionResults)
	// console.log(brandDtl.map((indBrand: Brands) => indBrand.allModels.map((indModel: Models) => indModel.allProducts)))
	// console.log(filteredResults)
	// console.log(modelResults)

	const onSortChange = (e: SyntheticEvent<Element, Event>, value: string | null): void => {
		e.preventDefault()
		setSortBy(value!)
	}

	const handleModelClick = (value: string | null): void => {
		const oldModelResults: Models[] = [...modelResults]
		const oldEditionResults: ProductObj[] = [...editionResults]

		const toUpdateMod = oldModelResults.findIndex((indModel: Models) => indModel.name === value)
		oldModelResults[toUpdateMod].active = !oldModelResults[toUpdateMod].active

		const editionsMatch = oldEditionResults.filter((indEdition: ProductObj) => indEdition.modelName === value)
		for (let i = 0; i < oldEditionResults.length; i++) {
			if (editionsMatch.includes(oldEditionResults[i])) {
				oldEditionResults[i] = {
					...oldEditionResults[i],
					active: oldModelResults[toUpdateMod].active
				}
			}
		}

		if (oldModelResults.filter((indModel: Models) => indModel.active).length === 0) {
			setModelResults(oldModelResults.map((indModel: Models) => (
				{
					...indModel,
					active: true
				}
			)))
			setEditionResults(retrieveSubOptions(brandDtl, 'editions') as ProductObj[])
		}
		else {
			setModelResults(oldModelResults)
			setEditionResults(oldEditionResults)
		}
	}

	const handleEditionClick = (value: string | null): void => {
		const oldEditionResults: ProductObj[] = [...editionResults]
		const toUpdateMod = oldEditionResults.findIndex((indEdition: ProductObj) => indEdition.name === value)

		const oldModelResults: Models[] = [...modelResults]
		const modelsMatch = oldModelResults.findIndex((indModel: Models) => indModel.name === oldEditionResults[toUpdateMod].modelName)

		oldEditionResults[toUpdateMod].active = !oldEditionResults[toUpdateMod].active
		if (oldEditionResults.filter((indEdition: ProductObj) => indEdition.active).length === 0) {
			setModelResults(oldModelResults.map((indModel: Models) => (
				{
					...indModel,
					active: true
				}
			)))
			setEditionResults(oldEditionResults.map((indEdition: ProductObj) => (
				{
					...indEdition,
					active: true
				}
			)))
		}
		else {
			if (oldEditionResults[toUpdateMod].active && !oldModelResults[modelsMatch].active) { //edition is active, model is inactive
				oldModelResults[modelsMatch].active = true
				setModelResults(oldModelResults)
			}
			else if (oldModelResults[modelsMatch].active && oldEditionResults.filter((indEdition: ProductObj) => indEdition.active && indEdition.modelName === oldModelResults[modelsMatch].name).length === 0) { //model is active,
				console.log('model is active')
				console.log(oldEditionResults.filter((indEdition: ProductObj) => indEdition.active && indEdition.name === value))
				oldModelResults[modelsMatch].active = false
				setModelResults(oldModelResults)
			}
			setEditionResults(oldEditionResults)
		}
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
			<div className='flex items-center justify-between border-b border-gray-200 pb-4 pt-24 dark:border-gray-800'>
				<h1 className='text-xl font-bold tracking-tight sm:text-2xl'>
					{filteredResults.length} results
				</h1>
				<DropDown sortBy={sortBy} onSortChange={onSortChange}/>
			</div>
			<section className='pb=24 pt-6' aria-labelledby='products-heading'>
				<div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
					<ProductFilter brandReq={brandDtl} brandSelect={brandsParam} modelsAvailable={modelResults} handleModelClick={handleModelClick} editionsAvailable={editionResults} handleEditionClick={handleEditionClick}/>
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