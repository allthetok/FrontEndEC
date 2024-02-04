'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useShoppingCart } from 'use-shopping-cart'
import { ColorSizes, ProductObj, ProductSizes } from '@/helpers/types/fetypes'
import { prodToStripeProd } from '@/helpers/fctns'
import { Button } from '@mui/material'
import * as Toast from '@radix-ui/react-toast'
import { SizeButton } from './SizeButton'
import { ActiveSizeButtonSx, AddToCartSx, AdditionalCartSx, SizeButtonSx } from '@/sx/styling'

import './FullProduct.css'


type OptionsProps = {
	colorQuery: string | string[],
	productDtl: ProductObj
}

const Options = ({ colorQuery, productDtl }: OptionsProps) => {
	const [sizeOption ,setSizeOption] = useState('')

	const router = useRouter()
	const { addItem, removeItem, cartDetails, clearCart } = useShoppingCart()

	const sizesFiltered: ColorSizes[] = productDtl.sizes.filter((indSize: ColorSizes) => indSize.color === colorQuery)

	const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		e.preventDefault()
		router.push(`/product/${productDtl.name}?color=${e.target.value}`)
	}

	const handleAdd = (e: any) => {
		e.preventDefault()
		const isInCart = !!cartDetails?.[productDtl.id.toString()]
		if (isInCart) {
			removeItem(productDtl.id.toString())
		}
		addItem(prodToStripeProd(productDtl, colorQuery, sizeOption))
		// clearCart()
	}

	const [open, setOpen] = useState(false)
	const timerRef = useRef(0)

	useEffect(() => {
		return () => clearTimeout(timerRef.current)
	}, [])

	return (
		<>
			<div className='flex flex-col gap-6 mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5'>
				<select className='form-select' value={colorQuery} onChange={handleOptionChange}>
					{productDtl.sizes.map((indSize: ColorSizes) => indSize.color).map((size: string, index: number) => (
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
				{/* <div className='mx-auto flex flex-col items-center'>
					<Button  disabled={sizeOption === '' || (sizeOption !== '' ? sizesFiltered[0].sizes.filter((shoeSize: ProductSizes) => shoeSize.size === sizeOption)[0].amount === 0 : true)} sx={AdditionalCartSx} onClick={handleAdd}>
						Add to Cart
					</Button>
					<p className='text-gray-600 text-center pt-2 text-xs'>
						{sizeOption !== '' ? `${sizesFiltered[0].sizes.filter((shoeSize: ProductSizes) => shoeSize.size === sizeOption)[0].amount}` : ''} In stock
					</p>
				</div> */}

				<Toast.Provider swipeDirection='right'>

					<div className='mx-auto flex flex-col items-center'>
						<Button  disabled={sizeOption === '' || (sizeOption !== '' ? sizesFiltered[0].sizes.filter((shoeSize: ProductSizes) => shoeSize.size === sizeOption)[0].amount === 0 : true)} sx={AdditionalCartSx} onClick={handleAdd}>
							Add to Cart
						</Button>
						<p className='text-gray-600 text-center pt-2 text-xs'>
							{sizeOption !== '' ? `${sizesFiltered[0].sizes.filter((shoeSize: ProductSizes) => shoeSize.size === sizeOption)[0].amount}` : ''} In stock
						</p>
					</div>
				</Toast.Provider>

			</div>
		</>
	)
}

export { Options }