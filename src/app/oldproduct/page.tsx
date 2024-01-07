import { FullProduct } from '@/components/FullProduct'
import React from 'react'

export default function Home() {
	console.log('hello')
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<FullProduct />
		</main>
	)
}
