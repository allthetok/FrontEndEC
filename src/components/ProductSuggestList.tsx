import { ProductObj } from '@/helpers/types/fetypes'
import React, { useState } from 'react'
import { Suggestion } from './ProductSuggest'

const ProductSuggestList = () => {
	const [productSearchData, setProductSearchData] = useState<ProductObj[]>([])
	return (
		<div>
			<>
			{productSearchData.length !== 0 ?
				<div className='search-suggest'>
					{productSearchData.map((item: ProductObj) => (
						<Suggestion onClick={onClick} key={item.id} id={item.id} cover={item.cover!} platforms={item.platforms} rating={item.rating} releaseDate={item.releaseDate} title={item.title} category={item.category} companies={item.involved_companies} />
					))}
				</div>
				: <></>
			}
		</>
		</div>
	)
}