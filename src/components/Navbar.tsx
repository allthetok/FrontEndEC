'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { useShoppingCart } from 'use-shopping-cart'
import Image from 'next/image'
import Link from 'next/link'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import LoginIcon from '@mui/icons-material/Login'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { IconButton } from '@mui/material'
import { Search } from './Search'
import { ProductSuggestList } from './ProductSuggestList'
import { Font50Sx } from '@/sx/styling'


const Navbar = () => {
	const [searchProduct, setSearchProduct] = useState('')
	const { cartCount } = useShoppingCart()
	const router = useRouter()
	const authData = useSession()

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
				<div className='text-gray-700 bg-white w-full shadow absolute'>
					<div className='flex flex-wrap justify-between px-8 h-auto flex-col md:flex-row items-center'>
						<Link className='flex items-center mb-4 md:mb-0' href='/'>
							<Image src='/AT Kicks-logos_transparent.png' alt='AT Kicks Logo' width={150} height={150} className='scale-150' priority/>
						</Link>
						<div className='flex flex-row gap-16'>
							<Search searchProduct={searchProduct} handleSubmit={handleSubmit} handleClear={handleClear} handleChange={handleChange} />
							<h1 className='font-bold text-6xl'>
								AT KICKS
							</h1>
						</div>
						<div className='flex flex-row'>
							<Link className='no-underline flex flex-row' href='/cart'>
								<h3 className='inline-block align-baseline font-black text-4xl pt-3 text-black'>
									{cartCount ? cartCount : 0}
								</h3>
								<IconButton>
									<ShoppingCartIcon sx={Font50Sx} htmlColor='black'/>
								</IconButton>
							</Link>
							{authData.status === 'authenticated' ?
								<div className='flex flex-row'>
									<Link className='no-underline flex flex-row pt-2 cursor-pointer' href='/account'>
										<AccountBoxIcon sx={Font50Sx} htmlColor='black' />
										<h3 className='inline-block align-baseline font-black text-3xl pt-[0.375rem] text-black'>Account</h3>
									</Link>
								</div>
								:
								<div className='no-underline flex flex-row pt-2 cursor-pointer' onClick={() => signIn()}>
									<LoginIcon sx={Font50Sx} htmlColor='black' />
									<h3 className='inline-block align-baseline font-black text-3xl pt-[0.375rem] text-black'>Login</h3>
								</div>
							}
						</div>
					</div>
				</div>
			</header>
			<ProductSuggestList searchTerm={searchProduct} handleClear={handleClear} />
		</>
	)
}

export { Navbar }