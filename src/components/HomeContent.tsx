import React from 'react'
import Link from 'next/link'
import LoginIcon from '@mui/icons-material/Login'
import { Font25Sx } from '../sx/styling'
import '../app/globals.css'


const HomeContent = () => {
	return (
		<header className='rounded overflow-hidden bg-cover bg-center flex items-center relative max-h-screen h-96 bg-home-white'>
			<div className='bg-gradient-to-r from-black via-black to-transparent opacity-25 h-full w-full absolute inset-0'/>
			<div className='xl:container px-8 relative text-white leading-none mx-auto'>
				<h1 className='text-6xl font-bold'>Hello there</h1>
				<p className='text-xl pt-4 opacity-75'>The world is cold. But you want the <b>heat</b>.</p>
				<Link className='inline-flex mt-8 bg-white rounded text-black font-bold text-xl uppercase tracking-wide py-5 px-8 items-center shadow-lg hover:bg-black hover:text-white' href='/products'>
					Shop Shoes
					<LoginIcon sx={Font25Sx} />
				</Link>
			</div>
		</header>
	)
}

export { HomeContent }