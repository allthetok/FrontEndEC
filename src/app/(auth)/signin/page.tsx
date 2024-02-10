'use client'
import React, { Suspense } from 'react'
import { Login } from '@/components/Login'

const SignInPage = () => {
	return (
		<main>
			<Suspense fallback={<div>Loading Page...</div>}>
				<Login />
			</Suspense>
		</main>
	)
}

export default SignInPage