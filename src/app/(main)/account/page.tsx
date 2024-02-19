/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import { getServerSession } from 'next-auth'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { AccountHeader } from '@/components/Server/AccountHeader'


const AccountPage = async () => {
	const userDetails = await getServerSession(options)
	console.log(userDetails)
	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24 gap-10'>
			<AccountHeader userDetails={userDetails!} />
		</main>
	)
}

export default AccountPage