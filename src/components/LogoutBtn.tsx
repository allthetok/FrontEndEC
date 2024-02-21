'use client'
import React from 'react'
import { signOut } from 'next-auth/react'
import LoginIcon from '@mui/icons-material/Login'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation'
import { Font50Sx } from '@/sx/styling'


const LogoutBtn = () => {
	return (
		<div className='no-underline flex flex-row cursor-pointer border-2 border-black rounded-md gap-5 bg-purple-300 mb-5 hover:bg-red-700' onClick={() => signOut()}>
			<CancelPresentationIcon sx={Font50Sx} htmlColor='black' className='ml-8' />
			<h3 className='inline-block align-baseline font-black text-3xl pt-[0.375rem] text-black'>Logout</h3>
		</div>
	)
}

export { LogoutBtn }