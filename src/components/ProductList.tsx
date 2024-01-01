/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'
import { ultraBoost } from '@/helpers/mockdata'
import Image from 'next/image'
import Link from 'next/link'
import React, { SyntheticEvent, useState } from 'react'
import { DropDown } from './DropDown'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import { CheckBoxSx, DropDownOptionsSx } from '@/sx/styling'
import './ProductList.css'

const ProductList = () => {
	const [sortBy, setSortBy] = useState('Newest')
	const [brandOptions, setBrandOptions] = useState(false)
	const [modelOptions, setModelOptions] = useState(false)
	const [editionOptions, setEditionOptions] = useState(false)

	const onSortChange = (e: SyntheticEvent<Element, Event>, value: string | null): void => {
		e.preventDefault()
		setSortBy(value!)
	}
	return (
		// <main className='p-8 bg-gray-100 flex-1'>
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
					{ultraBoost.length} results
				</h1>
				<DropDown sortBy={sortBy} onSortChange={onSortChange} />
			</div>
			<section className='pb=24 pt-6' aria-labelledby='products-heading'>
				<div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
					<div className='hidden lg:block'>
						<div className='border-b border-gray-200 dark:border-gray-800 py-4'>
							<Button variant='text' sx={DropDownOptionsSx} onClick={() => setBrandOptions(!brandOptions)}>
								<div className='flex flex-1 items-center justify-between'>
									<span className='font-extrabold text-lg'>
										Brand
									</span>
									{brandOptions === false ? <KeyboardArrowDownIcon fontSize='medium' /> : <KeyboardArrowUpIcon fontSize='medium' />}
								</div>
							</Button>
							{brandOptions === false ? <></> :
								<FormGroup>
									<FormControlLabel control={<Checkbox sx={CheckBoxSx} />} label='Adidas' />
									<FormControlLabel control={<Checkbox sx={CheckBoxSx} />} label='Air Jordan' />
									<FormControlLabel control={<Checkbox sx={CheckBoxSx} />} label='New Balance' />
									<FormControlLabel control={<Checkbox sx={CheckBoxSx} />} label='Yeezy' />
									<FormControlLabel control={<Checkbox sx={CheckBoxSx} />} label='Nike' />
								</FormGroup>
							}
						</div>
						<div className='border-b border-gray-200 dark:border-gray-800 py-4'>
							<Button variant='text' sx={DropDownOptionsSx} onClick={() => setModelOptions(!modelOptions)}>
								<div className='flex flex-1 items-center justify-between'>
									<span className='font-extrabold text-lg'>
										Model
									</span>
									{modelOptions === false ? <KeyboardArrowDownIcon fontSize='medium' /> : <KeyboardArrowUpIcon fontSize='medium' />}
								</div>
							</Button>
							{modelOptions === false ? <></> :
								<FormGroup>
									<FormControlLabel control={<Checkbox sx={CheckBoxSx} />} label='UltraBoost' />
									<FormControlLabel control={<Checkbox sx={CheckBoxSx} />} label='Superstar' />
									<FormControlLabel control={<Checkbox sx={CheckBoxSx} />} label='Stan Smith' />
									<FormControlLabel control={<Checkbox sx={CheckBoxSx} />} label='NMD' />
								</FormGroup>
							}
						</div>
						<div className='border-b border-gray-200 dark:border-gray-800 py-4'>
							<Button variant='text' sx={DropDownOptionsSx} onClick={() => setEditionOptions(!editionOptions)}>
								<div className='flex flex-1 items-center justify-between'>
									<span className='font-extrabold text-lg'>
										Edition
									</span>
									{editionOptions === false ? <KeyboardArrowDownIcon fontSize='medium' /> : <KeyboardArrowUpIcon fontSize='medium' />}
								</div>
							</Button>
							{editionOptions === false ? <></> :
								<FormGroup>
									<FormControlLabel control={<Checkbox sx={CheckBoxSx} />} label='UltraBoost Light' />
									<FormControlLabel control={<Checkbox sx={CheckBoxSx} />} label='UltraBoost 1.0 Shoes' />
									<FormControlLabel control={<Checkbox sx={CheckBoxSx} />} label='UltraBoost 22 Shoes' />
									<FormControlLabel control={<Checkbox sx={CheckBoxSx} />} label='UltraBoost 4.0 Shoes' />
								</FormGroup>
							}
						</div>
					</div>
					<div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-3 lg:gap-x-8'>
						{ultraBoost.map((item: any, index: number) => (
							<Link className='group text-sm' href='' key={index}>
								<div className='w-full overflow-hidden rounded-lg border-2 border-gray-200 bg-gray-100 group-hover:opacity-75'>
									{/* <Image className='h-full w-full object-cover object-center' src={ultraBoost[1].images[0]} alt={`${item.name}`} loading='lazy' width={255} height={280}/> */}
									<img className='h-full w-full object-cover object-center product-image' src={ultraBoost[1].images[0]} alt={`${item.name}`}/>
								</div>
								<h3 className='mt-4 font-medium flex flex-1 items-center justify-between'>
									<div className='hover:underline'>{item.name}</div>
									<span className='pt-1 text-xs text-gray-500 uppercase'>{item.brand}</span>
								</h3>
								<p className='mt-2 font-medium text-sm'>
									${Number(item.price).toFixed(2)}
								</p>
							</Link>
						))}
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