/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useShoppingCart } from 'use-shopping-cart'
import { ColorSizes, Colors, ProductObj, ProductSizes } from '@/helpers/types/fetypes'
import { prodToStripeProd } from '@/helpers/fctns'
import { Button } from '@mui/material'
import { ToastProvider, Root as ToastRoot, Title, Description, Viewport } from '@radix-ui/react-toast'
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

	// const handleAdd = (e: any) => {
	// 	e.preventDefault()
	// 	const isInCart = !!cartDetails?.[productDtl.id.toString()]
	// 	if (isInCart) {
	// 		removeItem(productDtl.id.toString())
	// 	}
	// 	addItem(prodToStripeProd(productDtl, colorQuery, sizeOption))
	// 	// clearCart()
	// }

	const [open, setOpen] = useState(false)
	const timerRef = useRef(0)

	const handleAdd = (e: any) => {
		e.preventDefault()
		const isInCart = !!cartDetails?.[productDtl.id.toString()]
		if (isInCart) {
			removeItem(productDtl.id.toString())
		}
		addItem(prodToStripeProd(productDtl, colorQuery, sizeOption))
		setOpen(false)
		window.clearTimeout(timerRef.current)
		timerRef.current = window.setTimeout(() => {
			setOpen(true)
		}, 100)
	}

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

				<ToastProvider swipeDirection='right'>
					<div className='mx-auto flex flex-col items-center'>
						<Button disabled={sizeOption === '' || (sizeOption !== '' ? sizesFiltered[0].sizes.filter((shoeSize: ProductSizes) => shoeSize.size === sizeOption)[0].amount === 0 : true)} sx={AdditionalCartSx} onClick={handleAdd}>
							Add to Cart
						</Button>
						<p className='text-gray-600 text-center pt-2 text-xs'>
							{sizeOption !== '' ? `${sizesFiltered[0].sizes.filter((shoeSize: ProductSizes) => shoeSize.size === sizeOption)[0].amount}` : ''} In stock
						</p>
					</div>
					<ToastRoot className={'bg-white rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_\'title_action\'_\'description_action\'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut'}
						open={open} onOpenChange={setOpen}>
						<Title className={'[grid-area:_title] mb-[30px] font-medium text-slate12 text-[15px]'}>
							<div className='flex flex-row justify-between leading-8 max-w-[260px]'>
								<p className='ml-[-8px]'>Added to Cart:</p>
								<div className='cursor-pointer border-solid border-2 border-black rounded max-h-8 px-2 bg-indigo-500 text-white hover:bg-[#4f46e5]' onClick={() => router.push('/cart')}>To Cart</div>
							</div>
						</Title>
						<Description asChild>
							<div className='[grid-area:_description] mt-6 flex flex-row gap-2'>
								<img className='max-h-[32px] max-w-[32px] ml-[-50px]' src={productDtl.colors.filter((indColor: Colors) => indColor.color === colorQuery)[0].images[0]} alt='Image of product'/>
								<p className={'text-slate11 text-[11px] pt-2 leading-[1.3] overflow-hidden whitespace-nowrap text-ellipsis max-w-[260px]'}>
									{productDtl.name} - {colorQuery as string} - {sizeOption}
								</p>
							</div>
						</Description>
					</ToastRoot>
					<Viewport className={'[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none'} />
				</ToastProvider>

			</div>
		</>
	)
}

export { Options }