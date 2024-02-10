'use client'
import React, { useState } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Checkbox, FormControlLabel } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SvgIcon from '@mui/icons-material/ArrowForward'
import { createUserExistConfig, regexValidEmail } from '../helpers/fctns'
import './Login.css'

const handleSubmit = () => {
	console.log('handle submit handler')
}

const Login = () => {
	const router = useRouter()
	const [error, setError] = useState<string | null>(null)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	return (
		<div className='max-h-[100vh] h-[100vh] overflow-y-scroll flex flex-col'>
			<div className='background-image cover-background z-[-1] w-[100%] h-[100%] block bg-cover bg-no-repeat fixed'></div>
			<header className='logo-header'>
				<div>
					<Link href='/'>
						<Image src='/AT Kicks-logos_transparent.png' alt='AT Kicks Logo' width={150} height={150} className='scale-150'/>
					</Link>
				</div>
			</header>
			<div className='grid-cols-12 gap-x-6 w-[624px] my-[200px] mx-auto'>
				<div className='form-col'>
					<div className='min-h-[auto] px-12 pb-6 bg-[#ffffff] p-8 flex flex-col'>
						<form onSubmit={handleSubmit}>
							<h5 className='m-0 pt-12 text-center text-[25px] font-bold leading-[120%] tracking-tight normal-case text-black'>
								Log in
							</h5>
							{error ? (
								<div className='flex items-center justify-center mt-[10px] flex-nowrap'>
									<span className='bg-[#ff9494] font-bold text-[16px] rounded max-w-[400px] leading-5 text-center align-middle p-[5px]'>
										Error: {error}
									</span>
								</div>
							) : <></>
							}
							<div className='text-center pt-6 flex flex-col flex-1'>
								<div></div>
								<div className='mb-3'>
									<div className='form-field min-w-[255px] flex-nowrap bg-[#7e7e7e1a] text-[#525252] w-[100%] text-[2.1rem] uppercase font-extrabold leading-[100%] tracking-[0.08em] p-0 bg-clip-padding h-12 relative'>
										<input className='h-11 py-[21px] px-2 text-[16px] leading-[19.2px] bg-transparent border-none box-border block outline-none w-[100%] font-bold'
									</div>
								</div>

							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export { Login }