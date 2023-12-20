'use client'
import React from 'react'
import { HomeContent } from '@/components/HomeContent'
import { Navbar } from '@/components/Navbar'

export default function Home() {
	return (
		<>
			<Navbar />
			<main className="p-8 bg-gray-100 flex-1">
				<HomeContent />
			</main>
		</>
	)
}
