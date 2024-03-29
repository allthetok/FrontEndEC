import React from 'react'
import Link from 'next/link'
import { formatDate } from '@/helpers/fctns'
import { ProductObj } from '@/helpers/types/fetypes'
import { ImageCarousel } from '../ImageCarousel'
import { Options } from '../Options'
import { Product } from '../Product'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Font25Sx } from '@/sx/styling'
import '../FullProduct.css'

type FullProductProps = {
	productDtl: ProductObj,
	colorQuery: string | string[],
	similarProducts: ProductObj[]
}

const FullProductServer = ({ productDtl, colorQuery, similarProducts }: FullProductProps) => {
	return (
		<>
			<Link href='/products' className='flex flex-row flex-1 justify-start items-start self-center text-center leading-5 center-button pt-[4.5rem]'>
				<ArrowBackIcon sx={Font25Sx} />
				<p className='title-font font-bold text-lg text-gray-900'>&nbsp;To Products</p>
			</Link>
			<main className='p-8 bg-gray-100 flex-1'>
				<div className='carousel'>
					<section className='text-gray-700 body-font overflow-hidden'>
						<div className='container px-5 py-25 mx-auto'>
							<div className='mx-auto flex flex-wrap'>
								<ImageCarousel colors={productDtl.colors} colorQuery={colorQuery}/>
								<div className='lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0'>
									<h2 className='text-sm title-font uppercase text-gray-500 tracking-widest mb-2'>
										<Link href={`/products?product=${productDtl.brand}`}>
											{productDtl.brand}
										</Link>
										<Link href={`/model/${productDtl.modelName}`}>
										&nbsp;- {productDtl.modelName}
										</Link>
									</h2>
									<h1 className='text-gray-900 text-4xl title=font font-bold'>{productDtl.name}</h1>
									<h2 className='text-sm title-font text-gray-500 tracking-widest mt-2'>Released - {formatDate(new Date(productDtl.releaseDate))}</h2>
									<span className='leading-10 title-font font-bold text-2xl text-gray-900'>
										${productDtl.price.toFixed(2)}
									</span>
									<div className='flex mb-4'>
										<span className='flex py-2 gap-1'>
											<Link className='text-gray-500 hover:text-indigo-500' href='https://github.com/allthetok'/>
											<Link className='ml-2 text-gray-500 hover:text-indigo-500' href='https://github.com/allthetok'/>
										</span>
									</div>
									<p className='leading-relaxed'>
										{productDtl.description}
									</p>
									<Options colorQuery={colorQuery} productDtl={productDtl}/>
								</div>
							</div>
						</div>
					</section>
				</div>
				{
					similarProducts.length !== 0 ?
						(
							<>
								<div className='flex justify-center text-gray-900 text-4xl title=font font-bold pb-8 mt-12'>
									<h2>Explore Similar Products:</h2>
								</div>
								<div className='flex flex-row justify-center gap-10'>
									{similarProducts.map((indProduct: ProductObj, index: number) => (
										<Product product={indProduct} key={index}/>
									))}
								</div>
							</>
						)
						: <></>
				}
			</main>
		</>
	)
}

export { FullProductServer }