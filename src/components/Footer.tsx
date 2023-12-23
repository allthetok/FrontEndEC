import { Font50Sx } from '@/sx/styling'
import { IconButton, Link } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import React from 'react'

const Footer = () => {
	return (
		<div className='flex flex-col items-center'>
			<footer className='w-full'>
				<div className='container px-8 h-full py-16 flex justify-center lg:block'>
					<div className='grid grid-cols-2 sm:grid-colos-3 lg-grid-cols-4 row-gap-8 col-gap-16'>
						<div className='sm:col-span-3 lg:col-span-1 flex sm:justify-center lg:justify-start items-start'>
							<IconButton onClick={() => console.log('clicked cart')}>
								<ShoppingCartIcon sx={Font50Sx} htmlColor='black'/>
							</IconButton>
						</div>
						<div>
							<h2 className='font-semibold text-lg'>About Us</h2>
							<nav className='pt-2 leading-loose'>
								<ul>
									<li>
										<Link className='text-gray-600 hover:text-gray-800 text-sm group relative no-underline' href='/' >
											About Us
										</Link>
									</li>
									<li>
										<Link className='text-gray-600 hover:text-gray-800 text-sm group relative no-underline' href='https://github.com/allthetok' >
											About the Developer
										</Link>
									</li>
								</ul>
							</nav>
						</div>
						<div>
							<h2 className='font-semibold text-lg'>My Account</h2>
							<nav className='pt-2 leading-loose'>
								<ul>
									<li>
										<Link className='text-gray-600 hover:text-gray-800 text-sm group relative no-underline' href='/order'>
											Order Status
										</Link>
									</li>
									<li>
										<Link className='text-gray-600 hover:text-gray-800 text-sm group relative no-underline' href='/wishlist'>
											Wishlist
										</Link>
									</li>
									<li>
										<Link className='text-gray-600 hover:text-gray-800 text-sm group relative no-underline' href='/userinfo'>
											My Account
										</Link>
									</li>
								</ul>
							</nav>
						</div>
					</div>
				</div>
			</footer>
			<div className='py-4 w-full'>
				<div className='px-6'>
					<div className='container mx-auto flex text-gray-600 text-sm items-center justify-center'>
						<div className='grid grid-flow-col gap-3'>
							<Link className='hover:text-indigo-500' href='https://github.com/allthetok'>
								<GitHubIcon />
							</Link>
							<Link className='hover:text-indigo-500' href='https://www.linkedin.com/in/allen-tokjuman-97b531131/'>
								<LinkedInIcon />
							</Link>
						</div>
						<span className='ml-8'>
							Copyright ©
							<Link href='https://github.com/allthetok' className='text-gray-600 hover:text-gray-800 no-underline'>
								Allen Tokjuman
							</Link>
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export { Footer }