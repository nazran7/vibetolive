import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
		images: {
			remotePatterns: [
				{
					protocol: 'https',
					hostname: 'www.vibetolive.dev',
				},
				{
					protocol: 'https',
					hostname: 'vibetolive.dev',
				},
			],
		formats: ['image/avif', 'image/webp'],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		// Limit image sizes to prevent serving oversized images for small displays
		imageSizes: [16, 32, 48, 64, 96, 128, 256],
		// Optimize images more aggressively
		minimumCacheTTL: 60,
	},

	eslint: {
		ignoreDuringBuilds: true,
	},

	experimental: {
		// Optimize package imports to reduce bundle size
		optimizePackageImports: [
			'react-icons',
			'framer-motion',
			'lucide-react',
			'@tiptap/react',
			'@tiptap/starter-kit',
		],
	},

	// Target modern browsers to reduce legacy JS
	swcMinify: true,

	webpack: (config, { isServer }) => {
		config.resolve = config.resolve || {};
		config.resolve.alias = config.resolve.alias || {};
		config.resolve.alias['@'] = path.resolve(process.cwd());
		
		// Optimize for modern browsers
		if (!isServer) {
			config.resolve.alias = {
				...config.resolve.alias,
			};
		}
		
		return config;
	},

	async redirects() {
		return [
			{
				source: '/:path*',
				has: [
					{
						type: 'host',
						value: 'vibetolive.dev',
					},
				],
				destination: 'https://www.vibetolive.dev/:path*',
				permanent: true,
			},
		];
	},
};

export default nextConfig;
