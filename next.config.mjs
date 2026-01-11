import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'https://www.vibetolive.dev',
			},
		],
		formats: ['image/avif', 'image/webp'],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
	},

	eslint: {
		ignoreDuringBuilds: true,
	},

	experimental: {
		// Optimize package imports to reduce bundle size
		optimizePackageImports: ['react-icons', 'framer-motion'],
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
};

export default nextConfig;
