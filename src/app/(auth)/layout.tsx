import { Inter } from 'next/font/google'
import CartProvider from '@/components/Providers'
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
					<CartProvider>
						{children}
						<Footer />
					</CartProvider>
				</body>
			</>
		</html>
	)
}
