/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import { Session } from 'next-auth'
import { formatDate } from '@/helpers/fctns'
import './AccountHeader.css'

type AccountHeaderProps = {
	userDetails: Session
}

const AccountHeader = ({ userDetails }: AccountHeaderProps) => {
	return (
		<div className='header-profile-wrapper'>
			<div className='bg-wrapper'>
				<div className='bg-intro'></div>
			</div>
			<div className='intro-container'>
				<div className='intro-name'>
					<div className='name-container'>
						<span>{userDetails.user.email}</span>
					</div>
					<div className='id-container'>
						<span>ATKicks User ID: {userDetails.user.id}</span>
						{userDetails.user.externalId ? (
							<span>{userDetails.user.provider} ID: {userDetails.user.externalId}</span>
						): <></>}
					</div>
					<div className='id-container'>
						<span>Previous Login: {formatDate(new Date(userDetails.user.token!.iat * 1000))}</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export { AccountHeader }