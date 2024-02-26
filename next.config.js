/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'assets.adidas.com',
				port: '',
				pathname: '/**',
			},
		],
	},
	env: {
		STRIPE_API_PUBLISHABLE_KEY: process.env.STRIPE_API_PUBLISHABLE_KEY,
		PROD_API_ENDPOINT: process.env.PROD_API_ENDPOINT
	}
}

module.exports = nextConfig
