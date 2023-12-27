import React from 'react'

const Search = () => {
	return (
		<div className='h-9 lg:w-[300px]'>
			<form className='hidden items-center lg:inline-flex'>
				<input type='search' className='flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
					autoComplete='off' placeholder='Search products...'>
				</input>
			</form>
		</div>
	)
}

export { Search }