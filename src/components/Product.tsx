/* eslint-disable react/jsx-key */
import React from 'react'
import { ultraBoost } from '../helpers/mockdata'
import Link from 'next/link'

const Product = () => {
	return (
		// <div className='flex font-bold underline text-2xl' >
		// 	<p className='flex text-center text-sm'>
		// 		{ultraBoost.filter((el: any) => el.images.length !== 0)[0].description}
		// 	</p>
		// </div>
		<main className='p-8 bg-gray-100 flex-1'>
			<div className='carousel'>
				<section className='text-gray-700 body-font overflow-hidden'>
					<div className='container px-5 py-25 mx-auto'>
						<div className='mx-auto flex flex-wrap'>
							<div className='lg:w-1/2 w-full lg:h-auto h-64'>
							</div>
							<div className='lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0'>
								<h2 className='text-sm title-font uppercase text-gray-500 tracking-widest'>{ultraBoost[1].brand}</h2>
								<h1 className='text-gray-900 text-4xl title=font font-bold mb-1'>{ultraBoost[1].name}</h1>
								<div className='flex mb-4'>
									<span className='flex py-2 gap-1'>
										<Link className='text-gray-500 hover:text-indigo-500' href='https://github.com/allthetok'/>
										<Link className='ml-2 text-gray-500 hover:text-indigo-500' href='https://github.com/allthetok'/>
									</span>
								</div>
								<p className='leading-relaxed'>
									{ultraBoost[1].description}
								</p>
								<div className='flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5'>
									<select className='form-select'>
										{ultraBoost[1].colors.map((color: string) => (
											<option value={color}>{color}</option>
										))}
									</select>
								</div>
								<div className='flex items-center'>
									<span className='title-font font-bold text-2xl text-gray-900'>
										$&nbsp;{ultraBoost[1].price}
									</span>
									<div className='ml-auto flex flex-col items-center'>
										<button className='font-bold flex text-white bg-indigo-500 border-0 py-3 px-10 text-lg focus:outline-none hover:bg-indigo-600 rounded-full'>
											Add to Cart
										</button>
										<p className='text-gray-600 text-center pt-2 text-xs'>
											12 In stock
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</main>
	)
}

export { Product }