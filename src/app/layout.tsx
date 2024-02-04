import { Inter } from 'next/font/google'
import CartProvider from '@/components/Providers'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
	children,
}: {
  children: React.ReactNode
}) {
	return (
		// <CartProvider cartMode='checkout-session' stripe={process.env.STRIPE_API_PUBLISHABLE_KEY as string} currency='USD' shouldPersist={true}>
		<CartProvider>
			<html lang="en">
				<>
					<body className={inter.className}>
						<Navbar />
						{children}
						<Footer />
					</body>
				</>
			</html>
		</CartProvider>
	)
}
