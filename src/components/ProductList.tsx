import { ultraBoost } from '@/helpers/mockdata'
import Link from 'next/link'
import React from 'react'

const ProductList = () => {
	return (
		<main className='p-8 bg-gray-100 flex-1'>
			<section className='text-gray-700 body-font overflow-hidden'>
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
			</section>
		</main>
	)
}

export { ProductList }