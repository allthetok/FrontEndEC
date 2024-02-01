import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ProductObj } from '@/helpers/types/fetypes'
import { ProductSuggest } from './ProductSuggest'
import './ProductSuggestList.css'

type ProductSuggestListProps = {
	searchTerm: string
}

const ProductSuggestList = ({ searchTerm }: ProductSuggestListProps) => {
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
		console.log(searchterm)
		console.log(resProduct)
		console.log(typeof resProduct[0].releaseDate)
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
		// <div className='mt-[-1.275rem] z-10 fixed ml-[37.5%] mr-[70%]'>
		<div className='mt-[-1.275rem] z-10 fixed search-x-y-align'>
			{productSearchData.length !== 0 ?
				<div className='search-suggest'>
					{productSearchData.map((product: ProductObj, index: number) => (
						<ProductSuggest key={index} productDtl={product}/>
					))}
				</div>
				: <></>
			}
		</div>
	)
}

export { ProductSuggestList }