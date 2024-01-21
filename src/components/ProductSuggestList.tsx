import React, { useState, useEffect } from 'react'
import { ProductObj } from '@/helpers/types/fetypes'
import { ProductSuggest } from './ProductSuggest'
import { searchResults } from '@/helpers/mockdata'

type ProductSuggestListProps = {
	onClick: (e: React.MouseEvent<HTMLElement>) => void,
	searchterm: string
}

const ProductSuggestList = ({ onClick, searchterm }: ProductSuggestListProps) => {
	// const [productSearchData, setProductSearchData] = useState<ProductObj[]>([])
	const [productSearchData, setProductSearchData] = useState<ProductObj[]>(searchResults)
	return (
		<>
			{productSearchData.length !== 0 ?
				<div className='search-suggest'>
					{productSearchData.map((product: ProductObj, index: number) => (
						<ProductSuggest key={index} onClick={onClick} productDtl={product}/>
					))}
				</div>
				: <></>
			}
		</>
	)
}

export { ProductSuggestList }