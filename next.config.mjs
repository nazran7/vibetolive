import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'landingpage.huglemon.com',
			},
		],
	},
	webpack: (config) => {
		config.resolve = config.resolve || {};
		config.resolve.alias = config.resolve.alias || {};
		config.resolve.alias['@'] = path.resolve(process.cwd());
		return config;
	},
};

export default nextConfig;
