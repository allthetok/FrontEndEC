/* eslint-disable @next/next/no-img-element */
import React, { Dispatch } from 'react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import { ToastProvider, Root as ToastRoot, Title, Description, Viewport } from '@radix-ui/react-toast'

type ToastAddProps = {
	open: boolean,
	setOpen: Dispatch<React.SetStateAction<boolean>>,
	router: AppRouterInstance,
	name: string,
	colorSelected: string,
	sizeOption: string,
	colorImage: string
}

const ToastAdd = ({ open, setOpen, router, name, colorSelected, sizeOption, colorImage }: ToastAddProps) => {
	return (
		<ToastProvider swipeDirection='right'>
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
						<img className='max-h-[32px] max-w-[32px] ml-[-50px]' src={colorImage} alt='Image of product'/>
						<p className={'text-slate11 text-[11px] pt-2 leading-[1.3] overflow-hidden whitespace-nowrap text-ellipsis max-w-[260px]'}>
							{name} - {colorSelected} - {sizeOption}
						</p>
					</div>
				</Description>
			</ToastRoot>
			<Viewport className={'[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none'} />
		</ToastProvider>
	)
}

export { ToastAdd }