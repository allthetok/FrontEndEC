'use client'
import React, { Suspense } from 'react'
import { Signup } from '@/components/Signup'

const SignUpPage = () => {
	return (
		<main>
			<Suspense fallback={<div>Loading Page...</div>}>
				<Signup />
			</Suspense>
		</main>
	)
}

export default SignUpPage