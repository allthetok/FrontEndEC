'use client'
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import LoginIcon from '@mui/icons-material/Login'
import { Font25Sx } from '../sx/styling'
import { homeLinks } from '../helpers/pageconfig'
import '../app/globals.css'


const HomeContent = () => {
	return (
		<>
			<header className='rounded overflow-hidden bg-cover bg-center flex items-center relative max-h-screen h-96 bg-home-white'>
				<div className='bg-gradient-to-r from-black via-black to-transparent opacity-25 h-full w-full absolute inset-0'/>
				<div className='xl:container px-8 relative text-white leading-none mx-auto'>
					<h1 className='text-6xl font-bold'>Hello there</h1>
					<p className='text-xl pt-4 opacity-75'>The world is cold. But you want the <b>heat</b>.</p>
					<Link className='inline-flex mt-8 bg-white rounded text-black font-bold text-xl uppercase tracking-wide py-5 px-8 items-center shadow-lg hover:bg-black hover:text-white' href='/products'>
					Shop Shoes
						<LoginIcon sx={Font25Sx} />
					</Link>
					{/* Adidas Yeezy Nike Air Jordan New Balance */}
				</div>
			</header>
			<div className='pt-16'>
				<section className='grid grid-flow-row md:grid-cols-3 lg:grid-cols-5 gap-6'>
					{homeLinks.map((item: any, index: number) => (
						<Link href={item.link} key={index} >
							{/* <span className='group rounded overflow-hidden pb-2/3 relative h-0'>
								<div className='absolute w-full h-full flex justify-center items-center'>
									<div className='rounded text-white bg-black font-bold tracking-wider text-xl uppercase px-5 py-2'>{item.name}</div>
									<img src={item.src} alt={item.name} width={550} height={1}/>
								</div>
							</span> */}
							<Image src={item.src} alt={item.name} width={650} height={0} className='max-h-[433.33px] overflow-hidden'/>
							{/* <div className='absolute w-full h-full flex justify-center items-center'> */}
							<p className='rounded text-white bg-black font-bold tracking-wider text-xl uppercase px-5 py-2'>
								{item.name}
							</p>
							{/* </div> */}

						</Link>
					))}
					{/* <img src={homeLinks[0].src} /> */}
				</section>
			</div>
		</>
	)
}

export { HomeContent }