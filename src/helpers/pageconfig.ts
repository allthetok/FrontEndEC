import { HomePageConfig, ModelPageConfig } from './types/fetypes'

const homeLinks: HomePageConfig[] = [
	{
		name: 'Adidas',
		src: '/adbanner.jpg'
	},
	{
		name: 'Air Jordan',
		src: '/ajbanner.jpg'
	},
	{
		name: 'New Balance',
		src: '/nbbanner.jpg'
	},
	{
		name: 'Yeezy',
		src: '/yzybanner.jpg'
	},
	{
		name: 'Nike',
		src: '/nikebanner.jpg'
	}
]

const homeLinkMap = new Map<string, string>([
	['Adidas', '/adbanner.jpg'],
	['Yeezy', '/yzybanner.jpg'],
	['Nike', '/nikebanner.jpg'],
	['Air Jordan', '/ajbanner.jpg'],
	['New Balance', '/nbbanner.jpg']
])

const modelNames: ModelPageConfig[] = [
	{
		link: '/model/UltraBoost',
		name: 'Adidas Ultraboost',
		prodCount: 4
	},
	{
		link: '/model/Superstar',
		name: 'Adidas Superstar',
		prodCount: 2
	},
	{
		link: '/model/Stan Smith',
		name: 'Adidas Stan Smith',
		prodCount: 2
	},
	{
		link: '/model/NMD',
		name: 'Adidas NMD',
		prodCount: 2
	},
	{
		link: '/model/Yeezy Boost 350',
		name: 'Yeezy 350',
		prodCount: 1
	},
	{
		link: '/model/Yeezy Boost 500',
		name: 'Yeezy 500',
		prodCount: 3
	},
	{
		link: '/model/Yeezy Boost 700',
		name: 'Yeezy 700',
		prodCount: 3
	},
	{
		link: '/model/Yeezy Foam Runner - Yeezy Slides',
		name: 'Yeezy Slides/Foam Runner',
		prodCount: 2
	},
	{
		link: '/model/Nike Air Force 1',
		name: 'Nike Air Force 1',
		prodCount: 2
	},

	{
		link: '/model/Nike Air Max 97',
		name: 'Nike Air Max 97',
		prodCount: 1
	},
	{
		link: '/model/Nike Dunk',
		name: 'Nike Dunk',
		prodCount: 2
	},
	{
		link: '/model/Nike Blazer',
		name: 'Nike Blazer',
		prodCount: 3
	},

	{
		link: '/model/Air Jordan 1',
		name: 'Air Jordan 1',
		prodCount: 3
	},
	{
		link: '/model/Air Jordan 4',
		name: 'Air Jordan 4',
		prodCount: 2
	},
	{
		link: '/model/Air Jordan 5',
		name: 'Air Jordan 5',
		prodCount: 1
	},

	{
		link: '/model/New Balance 2002R',
		name: 'New Balance 2002R',
		prodCount: 1
	},
	{
		link: '/model/New Balance 530',
		name: 'New Balance 530',
		prodCount: 1
	},
	{
		link: '/model/New Balance 5740',
		name: 'New Balance 5740',
		prodCount: 2
	}
]

export { homeLinks, modelNames, homeLinkMap }