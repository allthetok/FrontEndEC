'use client'
import { ultraBoost } from '@/helpers/mockdata'
import Link from 'next/link'
import React, { SyntheticEvent, useState } from 'react'
import { DropDown } from './DropDown'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Button, IconButton } from '@mui/material'
import { DropDownOptionsSx } from '@/sx/styling'

const ProductList = () => {
	const [sortBy, setSortBy] = useState('Newest')

	const onSortChange = (e: SyntheticEvent<Element, Event>, value: string | null): void => {
		e.preventDefault()
		setSortBy(value!)
	}
	return (
		<main className='p-8 bg-gray-100 flex-1'>
			<div>
				<div className='px-4 pt-20 text-center'>
					<h1 className='text-4xl font-extrabold tracking-normal'>
							AT Kicks
					</h1>
					<p className='mx-auto mt-4 max-w-3xl text-xl whitespace-nowrap'>
							Walk into the next new style. Sport, Home, Travel. AT Kicks is a step above the rest.
					</p>
				</div>
			</div>
			<div className='flex items-center justify-between border-b border-gray-200 pb-4 pt-24 dark:border-gray-800'>
				<h1 className='text-xl font-bold tracking-tight sm:text-2xl'>
					10 results
				</h1>
				<DropDown sortBy={sortBy} onSortChange={onSortChange} />
			</div>
			<section className='pb=24 pt-6' aria-labelledby='products-heading'>
				<div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
					<div className='hidden lg:block'>
						<div>
							<Button variant='text' sx={DropDownOptionsSx}>
								<span className='font-bold'>
										Brand
									<KeyboardArrowDownIcon fontSize='medium' />
								</span>
							</Button>
						</div>
					</div>
				</div>

			</section>
		</main>
	)
}




{/* <section className='text-gray-700 body-font overflow-hidden'>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
					{ultraBoost.map((item: any, index: number) => (
						<Link href='' key={index}>
							<div className='bg-white h-full rounded-lg overflow-hidden'>
								<div className='flex flex-col p-8'>
									<div className='block relative h-48 rounded overflow-hidden'>
										<img className='object-contain object-center w-full h-full block' src={ultraBoost[1].images[0]}/>
									</div>
									<div className='pt-8 flex justify-between'>
										<div className='flex-1 mr-3'>
											<h2 className='text-gray-900 title-font text-sm font-bold capitalize'>{item.name}</h2>
											<span className='pt-1 text-xs text-gray-500'>{item.brand}</span>
										</div>
										<p className='font-bold text-xl text-indigo-500'>
											$&nbsp;{item.price}
										</p>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			</section> */}


export { ProductList }