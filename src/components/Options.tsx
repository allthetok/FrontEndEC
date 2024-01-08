import React, { useState } from 'react'
import { Button } from '@mui/material'
import { SizeButton } from './SizeButton'
import { AddToCartSx } from '@/sx/styling'
import { ColorSizes } from '@/helpers/types/fetypes'

type OptionsProps = {
	sizes: ColorSizes[]
}

const Options = ({ sizes }: OptionsProps) => {
	const [selectedOption, setSelectedOption] = useState(sizes[0].color)
	const [sizeOption ,setSizeOption] = useState('')


	const handleOptionChange = (e: any) => {
		e.preventDefault()
		setSelectedOption(e.target.value)
	}

	const handleAdd = (e: any) => {
		e.preventDefault()
		console.log('added to cart')
	}

	return (
		<>
			<div className='flex flex-col gap-6 mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5'>
				<select className='form-select' value={selectedOption} onChange={handleOptionChange}>
					{sizes.map((size: ColorSizes, index: number) => (
						<option value={size.color} key={index}>
							{size.color}
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
					12 In stock
					</p>
				</div>
			</div>
		</>
	)
}

export { Options }