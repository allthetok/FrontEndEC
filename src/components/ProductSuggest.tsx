/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import { Colors, ProductObj } from '@/helpers/types/fetypes'
import { formatDate } from '@/helpers/fctns'
import './ProductSuggest.css'

type ProductSuggestProps = {
	onClick: (e: React.MouseEvent<HTMLElement>) => void,
	productDtl: ProductObj
}

const Suggestion = ({ onClick, productDtl }: ProductSuggestProps ) => {
	return (
		<Link href={`/product/${productDtl.name}`} className='no-text-dec' onClick={onClick}>
			<div className='ind-suggest'>
				<div className='cover-wrap'>
					<img className='cover-logo' alt={`${productDtl.name} image`} src={productDtl.colors[0].images[0]}/>
					<p className='title-text'>{productDtl.name}</p>
				</div>
				{/* {companies.length !== 0 ? companies.map((val: Companies) => (
					<p key={val.name} className='tag-link-dev'> {val.name} </p>

				)) */}
				{/* : <p key={'None'} className='tag-link-dev'></p>} */}
				<p className='tag-link-category'>{productDtl.brand}</p>
				<div className='suggest-platforms'>
					{productDtl.colors.map((val: Colors, index: number) => (
						<p key={index} className='suggest-platform'>{val.color}</p>
					))}
				</div>
				<div className='suggest-formatted'>
					{/* <span className='suggest-rating'>
						{rating > 0 ? Math.round(rating) : 'N'}
					</span> */}
					<span className='suggest-release'>
						{formatDate(new Date(productDtl.releaseDate))}
					</span>
				</div>
			</div>
		</Link>

	)
}
// <img key={val.id} className='suggest-platform' alt={`${val.name} Logo`} src={val.url !== '' ? val.url : placeholderImages.NoLogo} />

export { Suggestion }