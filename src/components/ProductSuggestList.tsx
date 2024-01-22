import React, { useState, useEffect } from 'react'
import { ProductObj } from '@/helpers/types/fetypes'
import { ProductSuggest } from './ProductSuggest'
import { searchResults } from '@/helpers/mockdata'

type ProductSuggestListProps = {
	onClick: (e: React.MouseEvent<HTMLElement>) => void,
	searchTerm: string
}

const ProductSuggestList = ({ onClick, searchTerm }: ProductSuggestListProps) => {
	// const [productSearchData, setProductSearchData] = useState<ProductObj[]>([])
	const [productSearchData, setProductSearchData] = useState<ProductObj[]>(searchResults)
	// const [productSearchData, setProductSearchData] = useState<ProductObj[]>([])

	return (
		<div className='mt-[-1rem] z-10 fixed ml-[37.5%] mr-[70%]'>
			{productSearchData.length !== 0 ?
				<div className='search-suggest'>
					{productSearchData.map((product: ProductObj, index: number) => (
						<ProductSuggest key={index} onClick={onClick} productDtl={product}/>
					))}
				</div>
				: <></>
			}
		</div>
	)
}

export { ProductSuggestList }