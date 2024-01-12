'use client'
import React, { useState } from 'react'
import { Button, FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { DropDownOptionsSx, CheckBoxSx } from '@/sx/styling'
import './ProductList.css'

const ProductFilter = () => {
	const [brandOptions, setBrandOptions] = useState(false)
	const [modelOptions, setModelOptions] = useState(false)
	const [editionOptions, setEditionOptions] = useState(false)
	return (
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
	)
}

export { ProductFilter }