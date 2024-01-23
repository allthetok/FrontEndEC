/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import { Colors, ProductObj } from '@/helpers/types/fetypes'
import './ProductSuggest.css'

type ProductSuggestProps = {
	onClick: (e: React.MouseEvent<HTMLElement>) => void,
	productDtl: ProductObj
}

const ProductSuggest = ({ onClick, productDtl }: ProductSuggestProps ) => {
	return (
		<Link href={`/product/${productDtl.name}`} className='no-text-dec' onClick={onClick}>
			<div className='group flex flex-row items-center justify-between gap-[0.5rem] w-[634px] bg-[#d1d5db] rounded-[60px] py-0 px-[0.5rem] mb-0 h-[75px] border-black border-[1px] hover:bg-[#daddeb] hover:border-gray-700 hover:cursor-pointer'>
				<div className='pl-[5px] text-md text-gray-700 font-bold max-w-[150px] group-hover:opacity-75'>
					<h3 className='overflow-hidden whitespace-nowrap overflow-ellipsis'>
						{productDtl.name}
					</h3>
				</div>
				<img className='w-[4.5rem] h-[4.5rem] border-black border-[1px] image-border' alt={`${productDtl.name} image`} src={productDtl.colors[0].images[0]}/>
				<div className='flex flex-col'>
					<p className='inline-block text-[#ddd] bg-[#383838] py-0 px-[5px] text-[0.625rem] leading-[30px] rounded-[6px] overflow-hidden whitespace-nowrap text-ellipsis mt-0 mb-[0.125rem] no-underline justify-center max-w-[60px] text-center'>
						{productDtl.brand}
					</p>
					<p className='inline-block text-[#ddd] bg-[#383838] py-0 px-[5px] text-[0.625rem] leading-[30px] rounded-[6px] overflow-hidden whitespace-nowrap text-ellipsis mt-0 mb-[0.125rem] no-underline justify-center max-w-[60px] text-center'>
						{productDtl.modelName}
					</p>
				</div>
				{productDtl.colors.length <= 2 ?
					<div className='grid grid-cols-[repeat(2,75px)] gap-[0.125rem] my-1'>
						{productDtl.colors.map((val: Colors, index: number) => (
							<p key={index} className='inline-block leading-[30px] text-[0.625rem] text-gray-700 bg-[#c4c6d3] font-bold px-[10px] py-0 rounded-[6px] overflow-hidden whitespace-nowrap overflow-ellipsis mt-0 mb-[0.125rem] text-center'>
								{val.color.substring(0, val.color.indexOf('/'))}
							</p>
						))}
					</div>
					:
					// <div className='colors-container'>
					<div className='my-[10px] mx-auto w-[150px] h-[70px] grid grid-cols-[(75px,75px)] row-start-auto row-end-auto gap-x-[5px] gap-y-[5px]'>
						{productDtl.colors.map((val: Colors, index: number) => (
							<p key={index} className='inline-block leading-[30px] text-[0.625rem] text-gray-700 bg-[#c4c6d3] font-bold px-[10px] py-0 rounded-[6px] overflow-hidden whitespace-nowrap overflow-ellipsis mt-0 mb-[0.125rem] text-center'>
								{val.color.substring(0, val.color.indexOf('/'))}
							</p>
						))}
					</div>
				}
				<div className='flex flex-col items-center gap-1'>
					<span className='text-sm font-bold'>
						${productDtl.price}
					</span>
					<span className='inline-block whitespace-nowrap align-middle ps-2 pe-2 uppercase font-bold text-gray-700 bg-[#daddeb] shadow-md text-[0.625rem] rounded-[4px]'>
						{productDtl.releaseDate.toLocaleString()}
					</span>
				</div>
			</div>
		</Link>

	)
}

export { ProductSuggest }