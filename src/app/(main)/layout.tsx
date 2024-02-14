import { Inter } from 'next/font/google'
import AuthProvider from '../context/AuthProvider'
import CartProvider from '../context/CartProvider/index'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
	children,
}: {
  children: React.ReactNode
}) {
	return (
		<html lang="en">
			<>
				<body className={inter.className}>
					<AuthProvider>
						<CartProvider>
							<Navbar />
							{children}
							<Footer />
						</CartProvider>
					</AuthProvider>
				</body>
			</>
		</html>
	)
}
