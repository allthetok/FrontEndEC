import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useShoppingCart } from 'use-shopping-cart'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { FullProductConfig, ProductObj } from '@/helpers/types/fetypes'
import { createProductDtlConfig, formatPageQuery } from '@/helpers/fctns'
import { ToastProvider, Root as ToastRoot, Title, Description, Viewport } from '@radix-ui/react-toast'
import { Product } from './Product'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { Font35Sx } from '@/sx/styling'
import './ProductList.css'


type CartProductProps = {
	cartAttributes: {name: string, id: string}[]
}

const CartProductList = ({ cartAttributes }: CartProductProps) => {
	const [productCartList, setProductCartList] = useState<ProductObj[]>([])
	const [open, setOpen] = useState(false)
	const [recentRemove, setRecentRemove] = useState<ProductObj>()
	const timerRef = useRef(0)


	const { removeItem } = useShoppingCart()

	const getData = async (products: string[]) => {
		const resProducts: ProductObj[] = []
		for (const product of products) {
			const productSearchConfig = createProductDtlConfig('post', 'product', product)
			resProducts.push(await getProductDtl(productSearchConfig))
		}
		return resProducts
	}

	const getProductDtl = async (productConfig: FullProductConfig) => {
		const resultProductObj = await axios(productConfig)
			.then((response: AxiosResponse) => {
				return response.data.productReq as ProductObj
			})
		return resultProductObj
	}

	const getRemovedData = async (product: string) => {
		const productSearchConfig = createProductDtlConfig('post', 'product', product)
		return {
			productObj: await getProductDtl(productSearchConfig)
		}
	}

	const handleRemove = async (productId: string, productName: string) => {
		removeItem(productId)
		const removedItem = await getRemovedData(productName)
		setRecentRemove(removedItem.productObj)
		setOpen(false)
		window.clearTimeout(timerRef.current)
		timerRef.current = window.setTimeout(() => {
			setOpen(true)
		}, 100)
	}

	useEffect(() => {
		const getAllCartItems = async () => {
			const cartNames = cartAttributes.map((cartAttribute: { name: string, id: string }) => cartAttribute.name)
			const resProductList: ProductObj[] = await getData(cartNames)
			setProductCartList(resProductList)
		}
		getAllCartItems()
	}, [cartAttributes])

	useEffect(() => {
		return () => clearTimeout(timerRef.current)
	}, [])

	return (
		<>
			{productCartList.length !== 0 ?
				( <section className='pb-24 pt-6 bg-gray-100 border-2 rounded-lg border-black mt-5' aria-labelledby='products-heading'>
					<div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:col-span-3 lg:gap-x-8'>
						{productCartList.map((product: ProductObj, index: number) => (
							<div className='flex flex-col p-10 justify-center' key={index}>
								<Product product={product} key={index} />
								{/* <button className='group flex flex-row justify-center items-center mt-5 bg-gray-300 pb-2 mx-auto px-2 max-w-[120px] rounded-xl border border-black hover:bg-gray-700 hover:text-white' onClick={() => removeItem(product.id.toString())}>
								<HighlightOffIcon sx={Font35Sx} className='group-hover:text-white'/>
								<p className='text-lg font-bold pt-[0.375rem] text-black uppercase group-hover:text-white'>Remove</p>
							</button> */}
								<ToastProvider swipeDirection='right'>
									<button className='group flex flex-row justify-center items-center mt-5 bg-gray-300 pb-2 mx-auto px-2 max-w-[120px] rounded-xl border border-black hover:bg-gray-700 hover:text-white' onClick={() => handleRemove(product.id.toString(), product.name)}>
										<HighlightOffIcon sx={Font35Sx} className='group-hover:text-white'/>
										<p className='text-lg font-bold pt-[0.375rem] text-black uppercase group-hover:text-white'>Remove</p>
									</button>
									<ToastRoot className={'bg-white rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_\'title_action\'_\'description_action\'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut'}
										open={open} onOpenChange={setOpen}>
										<Title className={'[grid-area:_title] mb-[30px] font-bold text-slate12 text-lg'}>
											<div className='leading-8 ml-[30px]'>
												Removed from Cart:
											</div>
										</Title>
										<Description asChild>
											<div className='[grid-area:_description] flex flex-row gap-2'>
												<img className='h-[80px] w-[80px] ml-[-60px]' src={recentRemove?.colors[0].images[0]} alt='Image of product'/>
												<p className={'text-slate11 text-md leading-[1.3] overflow-hidden whitespace-nowrap text-ellipsis max-w-[260px] pt-10'}>
													{recentRemove?.name}
												</p>
											</div>
										</Description>
									</ToastRoot>
									<Viewport className={'[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none'} />
								</ToastProvider>
							</div>
						))}
					</div>
				</section> )
				: (
					<section className='pb-24 pt-6 bg-gray-100 rounded-lg mt-5' aria-labelledby='products-heading'>
						<Link className='fixed ml-[-250px] text-3xl leading-10 font-extrabold uppercase text-gray-500 hover:text-gray-700 flex flex-row' href='/products'>
							<p>Shop Products to Checkout</p>
							<ArrowCircleRightIcon sx={Font35Sx} />
						</Link>
						<ToastProvider swipeDirection='right'>
							<ToastRoot className={'bg-white rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_\'title_action\'_\'description_action\'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut'}
								open={open} onOpenChange={setOpen}>
								<Title className={'[grid-area:_title] mb-[30px] font-bold text-slate12 text-lg'}>
									<div className='leading-8 ml-[30px]'>
										Removed from Cart:
									</div>
								</Title>
								<Description asChild>
									<div className='[grid-area:_description] flex flex-row gap-2'>
										<img className='h-[80px] w-[80px] ml-[-60px]' src={recentRemove?.colors[0].images[0]} alt='Image of product'/>
										<p className={'text-slate11 text-md leading-[1.3] overflow-hidden whitespace-nowrap text-ellipsis max-w-[260px] pt-10'}>
											{recentRemove?.name}
										</p>
									</div>
								</Description>
							</ToastRoot>
							<Viewport className={'[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none'} />
						</ToastProvider>
					</section>
				)}
		</>
	)
}

export { CartProductList }