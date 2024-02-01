import React from 'react'
import IconButton from '@mui/material/IconButton'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import { OpacitySx } from '@/sx/styling'
import './Search.css'

type SearchProps = {
	searchProduct: string,
	handleSubmit: (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement>) => void,
	handleClear: (e: React.MouseEvent<HTMLElement>) => void,
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Search = ({ searchProduct, handleSubmit, handleClear, handleChange }: SearchProps) => {

	return (
		<div className='flex flex-col gap-0 min-w-[403px] max-w-[403px]'>
			<div className='min-w-[403px]'>
				<form className='search-bar' onSubmit={handleSubmit}>
					<input type='text' className='search-bar-input text-gray-500' value={searchProduct} onChange={handleChange} required placeholder='Search Shoes...' />
					{searchProduct !== '' ?
						<IconButton onClick={handleClear} size='medium'>
							<ClearRoundedIcon fontSize='medium' htmlColor='#232B2B' sx={OpacitySx} />
						</IconButton>
						: <></>
					}
					<IconButton type='submit' size='medium' onClick={handleSubmit}>
						<SearchRoundedIcon fontSize='large' htmlColor='#232B2B'/>
					</IconButton>
				</form>
			</div>
		</div>
	)
}



export { Search }