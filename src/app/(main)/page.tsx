'use client'
import React, { Suspense } from 'react'
import { HomeContent } from '@/components/HomeContent'

export default function Home() {
	return (
		<>
			<main className="p-8 bg-gray-100 flex-1">
				<Suspense fallback={<div>Loading Content...</div>}>
					<HomeContent />
				</Suspense>
			</main>
		</>
	)
}
