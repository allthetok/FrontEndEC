import React, { useState } from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import IconButton from '@mui/material/IconButton'
import { useRouter } from 'next/navigation'
import './Search.css'

const Search = () => {
	const [searchProduct, setSearchProduct] = useState('')
	const router = useRouter()

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		router.push(`/product/${searchProduct}`)
	}

	const handleClear = (e: React.MouseEvent<HTMLElement>) => {
		setSearchProduct('')
	}

	const handleChange= (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchProduct(e.target.value)
	}

	return (
		<div className='h-9 lg:w-[300px]'>
			{/* <form className='hidden items-center lg:inline-flex'>
				<input type='search' className='flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
					autoComplete='off' placeholder='Search products...'>
				</input>
			</form> */}
			<form className='search-bar' onSubmit={handleSubmit}>
				<input type='text' className='search-bar-input' value={searchProduct} onChange={handleChange} required placeholder='Search Shoes...' />
				{/* {gameSearch !== '' ?
					<IconButton onClick={handleClear} size='medium'>
						<ClearRoundedIcon fontSize='medium' htmlColor='#232B2B' sx={OpacitySx} />
					</IconButton>
					: <></>
				} */}
				<IconButton type='submit' size='medium' onClick={handleClear}>
					{/* {gameSearch !== '' ?
						<Link href={`/game/${gameSearch}`}>
							<SearchRoundedIcon fontSize='large' htmlColor='#d6ecff'/>
						</Link>
						:
						<SearchRoundedIcon fontSize='large' htmlColor='#d6ecff'/>
					} */}
					<SearchRoundedIcon fontSize='large' htmlColor='#d6ecff'/>

				</IconButton>
			</form>
		</div>
	)
}

export { Search }