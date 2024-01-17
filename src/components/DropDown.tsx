/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client'
import React, { SyntheticEvent } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { AutoCompleteSx } from '@/sx/styling'

type DropDownProps = {
	sortBy: string,
	onSortChange: (e: SyntheticEvent<Element, Event>, value: string | null) => void
}
const DropDown = ({ sortBy, onSortChange }: DropDownProps) => {
	const sortOptions = ['Newest', 'Price, low to high', 'Price, high to low', 'Name, A to Z']
	return (
		<>
			<Autocomplete
				// className='auto-comp'
				disablePortal
				id='filter-combo'
				options={sortOptions}
				value={sortBy}
				onChange={onSortChange}
				sx={AutoCompleteSx}
				renderInput={(params) => <TextField {...params} variant='outlined' />} />
		</>
	)
}

export { DropDown }