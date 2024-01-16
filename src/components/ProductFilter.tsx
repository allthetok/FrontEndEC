'use client'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Brands, Models, ProductObj } from '@/helpers/types/fetypes'
import Link from 'next/link'
import { homeLinks } from '@/helpers/pageconfig'
import { Button, FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { DropDownOptionsSx, CheckBoxSx, LabelSx } from '@/sx/styling'
import './ProductList.css'
import { compareBySortOption, compareName } from '@/helpers/fctns'


type ProductFilterProps = {
	brandReq: Brands[]
	brandSelect: string[],
	modelsAvailable: Models[],
	handleModelClick: (value: string | null) => void,
	editionsAvailable: ProductObj[],
	handleEditionClick: (value: string | null) => void,
}


const ProductFilter = ({ brandReq, brandSelect, modelsAvailable, handleModelClick, editionsAvailable, handleEditionClick }: ProductFilterProps) => {
	const [brandOptions, setBrandOptions] = useState(true)
	const [modelOptions, setModelOptions] = useState(true)
	const [editionOptions, setEditionOptions] = useState(false)

	const curPath= usePathname().replaceAll('%20', ' ').replace('/products/','')
	const router = useRouter()

	const handleRefresh = (brandName: string, checked: boolean) => {
		let queryPath = ''
		if (checked) {
			if (brandSelect.filter((name: string) => name !== brandName).length === 0) { //only current brand active
				queryPath = '/products'
			}
			else if (brandSelect.length === 5) { //all products are selected
				queryPath = `/products?brand=${brandName}`
			}
			else { //other brands are selected, remove this from path
				queryPath = '/products?brand=' + brandSelect.filter((name: string) => name !== brandName).join('&brand=')
			}
		}
		else {
			if (brandSelect.filter((name: string) => name !== brandName).length !== 0) { //other brand active, update current path to include them and now include new brand to filter on
				queryPath = '/products?brand=' + brandSelect.join('&brand=') + `&brand=${brandName}`
			}
			else { //no brands active (edge case that may never occur)
				queryPath = `?brand=${brandName}`
			}
		}

		router.replace(queryPath, { scroll: false })
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
							<div key={index} onClick={() => handleRefresh(indBrand.name, brandSelect.includes(indBrand.name))}>
								{/* <FormControlLabel checked={curPath.includes(indBrand.name) || curPath === ''} control={<Checkbox sx={CheckBoxSx} />} label={indBrand.name}/> */}
								<FormControlLabel checked={brandSelect.includes(indBrand.name)} control={<Checkbox sx={CheckBoxSx} />} label={indBrand.name} sx={LabelSx}/>
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
						{modelsAvailable.sort(compareName).map((indModel: Models, index: number) => (
							<div key={index} onClick={() => handleModelClick(indModel.name)}>
								<FormControlLabel checked={indModel.active} control={<Checkbox sx={CheckBoxSx} />} label={indModel.name} sx={LabelSx}/>
							</div>
						))}
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
						{editionsAvailable.sort(compareName).map((indEdition: ProductObj, index: number) => (
							<div key={index} onClick={() => handleEditionClick(indEdition.name)}>
								<FormControlLabel checked={indEdition.active} control={<Checkbox sx={CheckBoxSx} />} label={indEdition.name} sx={LabelSx}/>
							</div>
						))}
					</FormGroup>
				}
			</div>
		</div>
	)
}

export { ProductFilter }