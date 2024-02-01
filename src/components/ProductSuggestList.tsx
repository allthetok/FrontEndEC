import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ProductObj } from '@/helpers/types/fetypes'
import { ProductSuggest } from './ProductSuggest'
import './ProductSuggestList.css'

type ProductSuggestListProps = {
	searchTerm: string,
	handleClear: (e: React.MouseEvent<HTMLElement>) => void
}

const ProductSuggestList = ({ searchTerm, handleClear }: ProductSuggestListProps) => {
	const [productSearchData, setProductSearchData] = useState<ProductObj[]>([])

	const getSearchResults = async (searchterm: string) => {
		let resProduct: ProductObj[] = []
		if (searchterm === '') {
			return resProduct
		}
		else {
			const searchConfig = {
				method: 'post',
				url: 'http://localhost:4000/api/shoes/productSearch',
				headers: {
					'Content-Type': 'application/json'
				},
				data: {
					searchterm: searchterm as string
				}
			}
			resProduct = await axios(searchConfig).then((response: any) => {
				return response.data.products
			})
				.catch((err: any) => {
					console.error(err)
					return []
				})
		}
		return resProduct
	}

	useEffect(() => {
		const fetchData = async () => {
			const resultProducts = await getSearchResults(searchTerm)
			setProductSearchData(resultProducts)
		}
		fetchData()
	}, [searchTerm])

	return (
		<div className='mt-[-1.275rem] z-10 fixed search-x-y-align'>
			{productSearchData.length !== 0 ?
				<div className='search-suggest'>
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