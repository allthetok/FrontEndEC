/* eslint-disable @next/next/no-img-element */
import React, { Dispatch } from 'react'
import { ProductObj } from '@/helpers/types/fetypes'
import { ToastProvider, Root as ToastRoot, Title, Description, Viewport } from '@radix-ui/react-toast'

type ToastRemoveProps = {
	open: boolean,
	setOpen: Dispatch<React.SetStateAction<boolean>>,
	recentRemove: ProductObj | undefined
}
const ToastRemove = ({ open, setOpen, recentRemove }: ToastRemoveProps) => {
	return (
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
	)
}

export { ToastRemove }