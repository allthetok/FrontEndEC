import Image from 'next/image'
import Link from 'next/link'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import React from 'react'
import { IconButton } from '@mui/material'
import { Font50Sx } from '@/sx/styling'

const Navbar = () => {
	return (
		<header className='h-32'>
			<div className='text-gray-700 bg-white z-10 w-full shadow fixed'>
				<div className='flex flex-wrap justify-between px-8 h-auto flex-col md:flex-row items-center'>
					<Link href='flex items-center mb-4 md:mb-0'>
						<Image src='/AT Kicks-logos_transparent.png' alt='AT Kicks Logo' width={150} height={150} className='scale-150'/>
					</Link>
					<h1 className='font-bold text-6xl'>
						AT KICKS
					</h1>
					<IconButton onClick={() => console.log('clicked cart')}>
						<ShoppingCartIcon sx={Font50Sx} htmlColor='black'/>
					</IconButton>
				</div>
			</div>
		</header>

	)
}

export { Navbar }