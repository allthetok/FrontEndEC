import React, { useState, useEffect } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { ProductObj, SearchConfig } from '@/helpers/types/fetypes'
import { createProductSearchConfig } from '@/helpers/fctns'
import { ProductSuggest } from './ProductSuggest'
import './ProductSuggestList.css'

type ProductSuggestListProps = {
	searchTerm: string,
	handleClear: (e: React.MouseEvent<HTMLElement>) => void
}

const ProductSuggestList = ({ searchTerm, handleClear }: ProductSuggestListProps) => {
	const [productSearchData, setProductSearchData] = useState<ProductObj[]>([])

	const fetchSearchResults = async (searchterm: string) => {
		const searchConfig: SearchConfig = createProductSearchConfig('post', 'productSearch', searchterm)
		await axios(searchConfig)
			.then((response: AxiosResponse) => {
				setProductSearchData(response.data.products as ProductObj[])
			})
			.catch((err: AxiosError) => {
				console.error(err)
				setProductSearchData([])
			})
	}

	useEffect(() => {
		searchTerm !== '' ? fetchSearchResults(searchTerm) : setProductSearchData([])
	}, [searchTerm])

	// useEffect(() => { searchTerm !== '' ? fetchSearchResults(searchTerm) : setProductSearchData([]) }, [searchTerm])


	return (
		// <div className='mt-[-1.275rem] z-10 fixed search-x-y-align'>
		<div className='mt-[-1.275rem] z-10 absolute search-x-y-align'>
			{productSearchData.length !== 0 ?
				<div>
					{productSearchData.map((product: ProductObj, index: number) => (
						<ProductSuggest key={index} productDtl={product} handleClear={handleClear}/>
					))}
				</div>
				: <></>
			}
		</div>
	)
}

export { ProductSuggestList }