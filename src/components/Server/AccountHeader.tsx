/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import { Session } from 'next-auth'
import { formatDate } from '@/helpers/fctns'
import { LogoutBtn } from '../LogoutBtn'
import './AccountHeader.css'

type AccountHeaderProps = {
	userDetails: Session
}

const AccountHeader = ({ userDetails }: AccountHeaderProps) => {
	return (
		<div className='mt-[-30px] h-[375px]'>
			<div className='absolute -z-10 top-0 left-0 h-[487px] w-[100%] overflow-hidden'>
				<div className='absolute w-[100%] h-[100%] bg-gradient'></div>
			</div>
			<div className='flex pt-16 items-center justify-center'>
				<div className='mx-5 overflow-hidden'>
					<LogoutBtn />
					<div className='intro-avatar w-[68px] mx-auto border-2 rounded-md border-white m-4'>
						<img className='h-[64px] w-[64px]' src='/icons8-user-64.png' alt='User Avatar'/>
					</div>
					<div className='flex items-center flex-grow-0 flex-shrink-0 basis-auto justify-center max-w-[100%]'>
						<span className='text-2xl whitespace-nowrap overflow-hidden text-ellipsis font-bold'>{userDetails.user.email}</span>
					</div>
					<div className='flex flex-col items-center flex-grow-0 flex-shrink-0 basis-auto content-center max-w-[100%] leading-6'>
						<span className='text-sm font-extralight whitespace-nowrap overflow-hidden text-ellipsis'>ATKicks User ID: {userDetails.user.id}</span>
						{userDetails.user.externalId ? (
							<span>{userDetails.user.provider} ID: {userDetails.user.externalId}</span>
						): <></>}
					</div>
					<div className='flex flex-col items-center flex-grow-0 flex-shrink-0 basis-auto content-center max-w-[100%] leading-6'>
						<span className='text-sm font-extralight whitespace-nowrap overflow-hidden text-ellipsis'>Previous Login: {formatDate(new Date(userDetails.user.token.iat * 1000))}</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export { AccountHeader }