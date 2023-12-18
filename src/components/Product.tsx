import React from 'react'
import { ultraBoost } from '../helpers/mockdata'

const Product = () => {
	return (
		<div className='flex font-bold underline text-2xl' >
			<p className='flex text-center text-sm'>
				{ultraBoost.filter((el: any) => el.images.length !== 0)[0].description}
			</p>
		</div>
	)
}

export { Product }