'use client'
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Brands } from '@/helpers/types/fetypes'
import Link from 'next/link'
import { homeLinks } from '@/helpers/pageconfig'
import { Button, FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { DropDownOptionsSx, CheckBoxSx } from '@/sx/styling'
import './ProductList.css'


type ProductFilterProps = {
	brandReq: Brands[]
	brandSelect: string[]
}


const ProductFilter = ({ brandReq, brandSelect }: ProductFilterProps) => {
	const [brandOptions, setBrandOptions] = useState(true)
	const [modelOptions, setModelOptions] = useState(false)
	const [editionOptions, setEditionOptions] = useState(false)

	const curPath= usePathname().replaceAll('%20', ' ').replace('/products/','')
	const router = useRouter()

	const handleRefresh = (brandName: string) => {
		router.replace(`?brand=${brandName}`, { scroll: false })
		setTimeout(() => {
			window.location.reload()
		}, 200)
	}

	return (
		<div className='hidden lg:block'>
			<div className='border-b border-gray-200 dark:border-gray-800 py-4'>
				<Button variant='text' className='w-full' sx={DropDownOptionsSx} onClick={() => setBrandOptions(!brandOptions)}>
					<div className='flex flex-1 items-center justify-between'>
						<span className='font-extrabold text-lg'>
							Brand
						</span>
						{brandOptions === false ? <KeyboardArrowDownIcon fontSize='medium' /> : <KeyboardArrowUpIcon fontSize='medium' />}
					</div>
				</Button>
				{brandOptions === false ? <></> :
					<FormGroup>
						{homeLinks.map((indBrand: any, index: number) => (
							// <Link href={{ pathname: '/products', query: { brand: indBrand.name } }} replace key={index}>
							// <div key={index} onClick={() => router.push(`?brand=${indBrand.name}`)}>
							<div key={index} onClick={() => handleRefresh(indBrand.name)}>
								{/* <FormControlLabel checked={curPath.includes(indBrand.name) || curPath === ''} control={<Checkbox sx={CheckBoxSx} />} label={indBrand.name}/> */}
								<FormControlLabel checked={brandSelect.includes(indBrand.name)} control={<Checkbox sx={CheckBoxSx} />} label={indBrand.name}/>
							</div>
						))}
					</FormGroup>
				}
			</div>
			<div className='border-b border-gray-200 dark:border-gray-800 py-4'>
				<Button variant='text' className='w-full' sx={DropDownOptionsSx} onClick={() => setModelOptions(!modelOptions)}>
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
				<Button variant='text' className='w-full' sx={DropDownOptionsSx} onClick={() => setEditionOptions(!editionOptions)}>
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
	)
}

export { ProductFilter }