'use client'
import React, { Suspense } from 'react'
import { Forgot } from '@/components/ForgotPass'

const ForgotPage = () => {
	return (
		<main>
			<Suspense fallback={<div>Loading Content...</div>}>
				<Forgot />
			</Suspense>
		</main>
	)
}

export default ForgotPage