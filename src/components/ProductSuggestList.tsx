import { ProductObj } from '@/helpers/types/fetypes'
import React, { useState, useEffect } from 'react'
import { ProductSuggest } from './ProductSuggest'

type ProductSuggestListProps = {
	onClick: (e: React.MouseEvent<HTMLElement>) => void,
	searchterm: string
}

const ProductSuggestList = ({ onClick, searchterm }: ProductSuggestListProps) => {
	const [productSearchData, setProductSearchData] = useState<ProductObj[]>([])
	return (
		<div>
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
		</div>
	)
}