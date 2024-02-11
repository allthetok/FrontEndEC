'use client'
import React, { useState } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Checkbox, FormControlLabel } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SvgIcon from '@mui/icons-material/ArrowForward'
import { createUserExistConfig, regexValidEmail } from '../helpers/fctns'
import './Login.css'



const Signup = () => {
	const router = useRouter()
	const [error, setError] = useState<string | null>(null)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = () => {
		console.log('handle submit handler')
	}

	const handleEmailChange = (e: any) => {
		setEmail(e.currentTarget.value)
	}

	const handlePasswordChange = (e: any) => {
		setPassword(e.currentTarget.value)
	}

	const handleGoogle = () => {
		signIn('google', { callbackUrl: '/' })
	}
	const handleSpotify = () => {
		signIn('spotify', { callbackUrl: '/' })
	}
	const handleDiscord = () => {
		signIn('discord', { callbackUrl: '/' })
	}
	const handleGithub = () => {
		signIn('github', { callbackUrl: '/' })
	}
	const handleTwitch = () => {
		signIn('twitch', { callbackUrl: '/' })
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
								<div className='field-area'>
									<div className='field-input field field-wrapper'>
										<input name='existing-email' id='existing-email' type='text' autoComplete='new-password' value={email} onChange={handleEmailChange} />
										<label>Email</label>
										<span>Email</span>
									</div>
								</div>
								<div className='field-area'>
									<div className='field-input field field-wrapper'>
										<input name='existing-password' id='eisting-pass' type='password' autoComplete='new-password' value={password} onChange={handlePasswordChange} />
										<label>Password</label>
										<span>Password</span>
									</div>
								</div>
							</div>
						</form>
						<div className='flex gap-x-2 my-3 mr-0'>
							<button className='h-8 rounded-[0.625rem] p-0 flex-1 google' onClick={handleGoogle}>
								<div className='flex items-center relative justify-center'>
									<Image src='/icons8-google-48.png' width={18} height={18} alt='Google Logo' />
								</div>
							</button>
							<button className='h-8 rounded-[0.625rem] p-0 flex-1 spotify' onClick={handleSpotify}>
								<div className='flex items-center relative justify-center'>
									<Image src='/icons8-spotify-30.png' width={18} height={18} alt='Spotify Logo' />
								</div>
							</button>
							<button className='h-8 rounded-[0.625rem] p-0 flex-1 discord' onClick={handleDiscord}>
								<div className='flex items-center relative justify-center'>
									<Image src='/icons8-discord-24.png' width={18} height={18} alt='Discord Logo' />
								</div>
							</button>
							<button className='h-8 rounded-[0.625rem] p-0 flex-1 github' onClick={handleGithub}>
								<div className='flex items-center relative justify-center'>
									<Image src='/icons8-github-30.png' width={18} height={18} alt='Github Logo' />
								</div>
							</button>
							<button className='h-8 rounded-[0.625rem] p-0 flex-1 twitch' onClick={handleTwitch}>
								<div className='flex items-center relative justify-center'>
									<Image src='/icons8-twitch-50.png' width={18} height={18} alt='Twitch Logo' />
								</div>
							</button>
						</div>
						<div className={email !== '' && password!== '' ? 'enter-wrap' : 'enter-disabled-wrap'}>
							<button type='submit' className='p-0 relative border-none bg-transparent' onClick={handleSubmit}>
								<SvgIcon fontSize='large'>
									<ArrowForwardIcon />
								</SvgIcon>
							</button>
						</div>
						<div className='flex flex-col flex-1 justify-end'>
							<span className='text-[10.24px] font-extrabold leading-[100%] tracking-[0.08em] uppercase text-black mb-2'>
								<Link href='/forgotpass' className='flex flex-col items-center justify-center no-underline text-[#4a4a4a]'>
									Forgot Password
								</Link>
							</span>
							<span className='text-[10.24px] font-extrabold leading-[100%] tracking-[0.08em] uppercase text-black'>
								<Link href='/signup' className='flex flex-col items-center justify-center no-underline text-[#4a4a4a]'>
									Create Account
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