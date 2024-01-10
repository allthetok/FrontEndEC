'use client'
import React, { useState } from 'react'
import { Button } from '@mui/material'
import { SizeButton } from './SizeButton'
import { AddToCartSx } from '@/sx/styling'
import { ColorSizes, ProductSizes } from '@/helpers/types/fetypes'
import { useRouter } from 'next/navigation'

type OptionsProps = {
	sizes: ColorSizes[],
	modelName: string,
	colorQuery: string | string[]
}

const Options = ({ sizes, modelName, colorQuery }: OptionsProps) => {
	const [sizeOption ,setSizeOption] = useState('')

	const router = useRouter()
	const sizesFiltered: ColorSizes[] = sizes.filter((indSize: ColorSizes) => indSize.color === colorQuery)

	const handleOptionChange = (e: any) => {
		e.preventDefault()
		router.push(`/product/${modelName}?color=${e.target.value}`)
	}

	const handleAdd = (e: any) => {
		e.preventDefault()
		console.log('added to cart')
	}

	return (
		<>
			<div className='flex flex-col gap-6 mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5'>
				<select className='form-select' value={colorQuery} onChange={handleOptionChange}>
					{sizes.map((indSize: ColorSizes) => indSize.color).map((size: string, index: number) => (
						<option value={size} key={index}>
							{size}
						</option>
					))}
				</select>
				<span className='leading-10 title-font text-2xl text-gray-900'>
					Size:&nbsp;{sizeOption}
				</span>
			</div>
			<div className='flex flex-col gap-6 items-center'>
				<div className='flex'>
					<SizeButton sizeOption={sizeOption} setSizeOption={setSizeOption}/>
				</div>
				<div className='mx-auto flex flex-col items-center'>
					<Button className='font-bold flex text-white bg-indigo-500 border-0 py-3 px-10 text-lg focus:outline-none hover:bg-indigo-600 rounded-full' disabled={sizeOption === ''} sx={AddToCartSx} onClick={handleAdd}>
					Add to Cart
					</Button>
					<p className='text-gray-600 text-center pt-2 text-xs'>
						{sizeOption !== '' ? `${sizesFiltered[0].sizes.filter((shoeSize: ProductSizes) => shoeSize.size === sizeOption)[0].amount}` : ''} In stock
					</p>
				</div>
			</div>
		</>
	)
}

export { Options }