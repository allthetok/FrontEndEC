'use client'
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import { HomePageConfig, ModelPageConfig } from '@/helpers/types/fetypes'
import LoginIcon from '@mui/icons-material/Login'
import { homeLinkMap, homeLinks, modelNames } from '../helpers/pageconfig'
import { Font25Sx } from '../sx/styling'
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
				</div>
			</header>
			<div className='pt-16'>
				<section className='grid grid-flow-row md:grid-cols-3 lg:grid-cols-5 gap-6'>
					{/* {homeLinks.map((item: HomePageConfig, index: number) => (
						<Link href={`/products?brand=${item.name}`} key={index} style={{ backgroundImage: `url(${item.src})`, backgroundPosition: 'center', backgroundSize: 'cover', minHeight: '433.33px' }}>
							<div className='flex w-auto items-center flex-col'>
								<p className='rounded text-white bg-black font-bold tracking-wider text-xl uppercase px-5 py-2'>
									{item.name}
								</p>
							</div>
						</Link>
					))} */}
					{Array.from(homeLinkMap.keys()).map((key: string, index: number) => (
						<Link href={`/products?brand=${key}`} key={index} style={{ backgroundImage: `url(${homeLinkMap.get(key)})`, backgroundPosition: 'center', backgroundSize: 'cover', minHeight: '433.33px' }}>
							<div className='flex w-auto items-center flex-col'>
								<p className='rounded text-white bg-black font-bold tracking-wider text-xl uppercase px-5 py-2'>
									{key}
								</p>
							</div>
						</Link>
					))}
				</section>
				<ul className='pt-24 grid grid-cols-4 gap-4'>
					{modelNames.map((item: ModelPageConfig, index: number) => (
						<li className='block' key={index}>
							<Link className='font-bold tracking-wider uppercase bg-indigo-500 text-white rounded-lg px-4 h-24 flex justify-center items-center text-center hover:bg-indigo-600' href={item.link}>
								<span>
									{item.name}&nbsp;
									<span className='text-xs font-normal'>
										({item.prodCount} products)
									</span>
								</span>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</>
	)
}

export { HomeContent }