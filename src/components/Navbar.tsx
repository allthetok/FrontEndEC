'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { IconButton } from '@mui/material'
import { Search } from './Search'
import { Font50Sx } from '@/sx/styling'
import { ProductSuggestList } from './ProductSuggestList'


const Navbar = () => {
	const [searchProduct, setSearchProduct] = useState('')
	const router = useRouter()

	const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement>) => {
		e.preventDefault()
		router.push(`/product/${searchProduct}`)
		setSearchProduct('')
	}

	const handleClear = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault()
		setSearchProduct('')
	}

	const handleChange= (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchProduct(e.target.value)
	}
	return (
		<>
			<header className='h-32'>
				<div className='text-gray-700 bg-white w-full shadow fixed'>
					<div className='flex flex-wrap justify-between px-8 h-auto flex-col md:flex-row items-center'>
						<Link className='flex items-center mb-4 md:mb-0' href='/'>
							<Image src='/AT Kicks-logos_transparent.png' alt='AT Kicks Logo' width={150} height={150} className='scale-150'/>
						</Link>
						<div className='flex flex-row gap-16'>
							<Search searchProduct={searchProduct} handleSubmit={handleSubmit} handleClear={handleClear} handleChange={handleChange} />
							<h1 className='font-bold text-6xl'>
								AT KICKS
							</h1>
						</div>
						<IconButton onClick={() => console.log('clicked cart')}>
							<ShoppingCartIcon sx={Font50Sx} htmlColor='black'/>
						</IconButton>
					</div>
				</div>
			</header>
			<ProductSuggestList searchTerm={searchProduct} />
		</>
	)
}

{/* <Search />
	<h1 className='font-bold text-6xl ml-[-1000px]'>
		AT KICKS
	</h1>
*/}

export { Navbar }