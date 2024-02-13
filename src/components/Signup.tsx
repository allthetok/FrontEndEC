/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { UserExistConfig } from '@/helpers/types/fetypes'
import { createUserExistConfig, regexValidEmail } from '../helpers/fctns'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SvgIcon from '@mui/icons-material/ArrowForward'
import './Login.css'



const Signup = () => {
	const [error, setError] = useState<string | null>(null)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [verPassword, setVerPassword] = useState('')

	const router = useRouter()

	const handleSubmit = async (e: any) => {
		e.preventDefault()

		if (password !== verPassword) {
			setError('Passwords do not match')
			return
		}
		else if (email === '' || password === '' || verPassword === '') {
			setError('Must provide all fields')
			return
		}
		else if (!regexValidEmail(email)) {
			setError('Invalid email')
			return
		}

		const userStatusConfig: UserExistConfig = createUserExistConfig('post', 'resolveUser', email, 'ATKNative')
		const userStatus = await axios(userStatusConfig)
			.then((response: AxiosResponse) => {
				return response.status === 200
					? { userExists: response.data.userExists }
					: { userExists: true }
			})
			.catch((err: AxiosError) => {
				return { userExists: true }
			})

		if (userStatus.userExists) {
			setError(`There already exists a user with email: ${email}`)
			return
		}

		const signInResponse = await signIn('credentials', {
			email: email,
			password: password,
			redirect: false
		})
		if (signInResponse && !signInResponse.error) {
			router.push('/')
		}
		else {
			setError('Invalid email or password')
			return
		}
	}

	const handleEmailChange = (e: any) => {
		setEmail(e.currentTarget.value)
	}

	const handlePasswordChange = (e: any) => {
		setPassword(e.currentTarget.value)
	}

	const handleVerPasswordChange = (e: any) => {
		setVerPassword(e.currentTarget.value)
	}

	return (
		<div className='max-h-[100vh] h-[100vh] overflow-y-scroll flex flex-col'>
			<div className='background-image cover-background z-[-1] w-[100%] h-[100%] block bg-cover bg-no-repeat fixed'></div>
			<header className='logo-header'>
				<div>
					<Link href='/'>
						<Image src='/AT Kicks-logos_white.png' alt='AT Kicks Logo' width={150} height={150} className='scale-150'/>
					</Link>
				</div>
			</header>
			<div className='grid-cols-12 gap-x-6 w-[624px] my-[200px] mx-auto'>
				<div className='form-col'>
					<div className='min-h-[auto] px-12 pb-6 bg-[#ffffff] p-8 flex flex-col'>
						<form onSubmit={handleSubmit}>
							<h5 className='m-0 pt-12 text-center text-[25px] font-bold leading-[120%] tracking-tight normal-case text-black'>
								Signup to AT Kicks
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
								<div className='field-area'>
									<div className='field-input field field-wrapper'>
										<input name='new-email' id='new-email' type='text' autoComplete='new-password' value={email} onChange={handleEmailChange} />
										<label>Email</label>
										<span>Email</span>
									</div>
								</div>
								<div className='field-area'>
									<div className='field-input field field-wrapper'>
										<input name='new-password' id='new-password' type='password' autoComplete='new-password' value={password} onChange={handlePasswordChange} />
										<label>Password</label>
										<span>Password</span>
									</div>
								</div>
								<div className='field-area'>
									<div className='field-input field field-wrapper'>
										<input name='new-passwordver' id='new-passwordver' type='password' autoComplete='off' value={verPassword} onChange={handleVerPasswordChange} />
										<label>Verify Password</label>
										<span>Verify Password</span>
									</div>
								</div>
							</div>
						</form>
						<div className={email !== '' && password !== '' && verPassword !== '' ? 'enter-wrap' : 'enter-disabled-wrap'}>
							<button type='submit' className='p-0 relative border-none bg-transparent' onClick={handleSubmit}>
								<SvgIcon fontSize='large'>
									<ArrowForwardIcon />
								</SvgIcon>
							</button>
						</div>
						<div className='flex flex-col flex-1 justify-end'>
							<span className='text-[10.24px] font-extrabold leading-[100%] tracking-[0.08em] uppercase text-black mb-2'>
								<Link href='/signin' className='flex flex-col items-center justify-center no-underline text-[#4a4a4a]'>
									Back to Login
								</Link>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export { Signup }