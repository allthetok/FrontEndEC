'use client'
import React from 'react'
import { Colors } from '@/helpers/types/fetypes'
import { CarouselProvider, Slider, Slide, Image, Dot } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'

type ImageProps = {
	colors: Colors[],
	colorQuery: string | string[] | undefined | null
}

const ImageCarousel = ({ colors, colorQuery }: ImageProps ) => {
	console.log(colorQuery)
	return (
		<div className='lg:w-1/2 w-full lg:h-auto h-64'>
			<CarouselProvider
				naturalSlideWidth={496}
				naturalSlideHeight={496}
				totalSlides={colors[0].images.length}
				infinite>
				<Slider>
					{colors[0].images.map((image: string, index: number) => (
						<Slide index={index} key={index}>
							<Image
								src={image}
								hasMasterSpinner={false}
								alt={`Image ${index}`}
								className='object-cover object-center rounded-lg'/>
						</Slide>
					))}
				</Slider>
				<div className='flex justify-center gap-4 py-4'>
					{colors[0].images.map((image: string, index: number) => (
						<Dot key={index} slide={index} className='h-20 w-20 disabled:opacity-50 rounded-lg overflow-hidden'>
							<Image className='object-cover h-full w-full' src={image} alt={`Image ${index}`} hasMasterSpinner={false} />
						</Dot>
					))}
				</div>
			</CarouselProvider>

		</div>
	)
}

export { ImageCarousel }