/* eslint-disable react/jsx-key */
'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { ultraBoost } from '../helpers/mockdata'
import { formatDate } from '@/helpers/fctns'
import { CarouselProvider, Slider, Slide, Image, Dot } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'

const Product = () => {
	const [selectedOption, setSelectedOption] = useState(ultraBoost[1].colors[0])

	const handleOptionChange = (e: any) => {
		e.preventDefault()
		setSelectedOption(e.target.value)
	}

	const handleAdd = (e: any) => {
		e.preventDefault()
		console.log('added to cart')
	}

	return (
		<main className='p-8 bg-gray-100 flex-1'>
			<div className='carousel'>
				<section className='text-gray-700 body-font overflow-hidden'>
					<div className='container px-5 py-25 mx-auto'>
						<div className='mx-auto flex flex-wrap'>
							<div className='lg:w-1/2 w-full lg:h-auto h-64'>
								<CarouselProvider
									naturalSlideWidth={496}
									naturalSlideHeight={496}
									totalSlides={ultraBoost[1].images.length}
									infinite>
									<Slider>
										{ultraBoost[1].images.map((image: string, index: number) => (
											<Slide index={index}>
												<Image
													src={image}
													hasMasterSpinner={false}
													alt={`Image ${index}`}
													className='object-cover object-center rounded-lg'/>
											</Slide>
										))}
									</Slider>
									<div className='flex justify-center gap-4 py-4'>
										{ultraBoost[1].images.map((image: string, index: number) => (
											<Dot key={index} slide={index} className='h-20 w-20 disabled:opacity-50 rounded-lg overflow-hidden'>
												<Image className='object-cover h-full w-full' src={image} alt={`Image ${index}`} hasMasterSpinner={false} />
											</Dot>
										))}
									</div>
								</CarouselProvider>

							</div>
							<div className='lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0'>
								<h2 className='text-sm title-font uppercase text-gray-500 tracking-widest mb-2'>{ultraBoost[1].brand} - {ultraBoost[1].modelName}</h2>
								<h1 className='text-gray-900 text-4xl title=font font-bold'>{ultraBoost[1].name}</h1>
								<h2 className='text-sm title-font upper case text-gray-500 tracking-widest mt-2'>Released: {formatDate(new Date(ultraBoost[1].releaseDate))}</h2>
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
									<select className='form-select' value={selectedOption} onChange={handleOptionChange}>
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
										<button className='font-bold flex text-white bg-indigo-500 border-0 py-3 px-10 text-lg focus:outline-none hover:bg-indigo-600 rounded-full' onClick={handleAdd}>
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