'use client';
import HeroIcons from '@/components/home/icons';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { IoDocumentText } from 'react-icons/io5';
import { useEffect, useState } from 'react';

export default function SEOHero({ locale, CTALocale, seoData }) {
	const [tilt, setTilt] = useState(45);
	const [duration, setDuration] = useState(0.8);
	const [theme, setTheme] = useState("corporate");

	useEffect(() => {
		const storedTheme = localStorage.getItem("theme");
		if (storedTheme) setTheme(storedTheme);
	}, []);

	useEffect(() => {
		const handleThemeChange = (e) => {
			setTheme(e.detail);
		};
		window.addEventListener("themeChange", handleThemeChange);
		return () => window.removeEventListener("themeChange", handleThemeChange);
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			const maxTilt = 45;
			const scrollY = window.scrollY;
			const tiltValue = Math.max(maxTilt - scrollY / 8, 0);
			setTilt(tiltValue);
			setDuration(0.3);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Use SEO data if available, otherwise fallback to locale
	const h1 = locale?.h1 || '';
	const h2 = locale?.h2 || '';
	// Always respect theme changes - use theme-based image selection like home hero
	// If seoData provides a heroImage, use it for 'corporate' theme, otherwise use standard theme logic
	const heroImage = theme === 'corporate' 
		? (seoData?.heroImage || '/img3.png')
		: '/img2.png';
	const showIcons = seoData?.showTechIcons !== false; // Default to true

	return (
		<>
			<section
				className='relative z-10 flex flex-col items-start md:items-center py-10 md:py-20 overflow-hidden'
				style={{ perspective: '800px' }}
			>
				{/* LCP element - render immediately without animation delay for better LCP score */}
				<h1 className='font-bold text-5xl md:text-7xl bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] text-center bg-clip-text text-transparent !leading-[1.25em] mb-5'>
					{h1}
				</h1>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2, duration: 1 }}
				>
					<h2 className='w-full md:w-10/12 mx-auto text-xl md:text-2xl text-base-content/80 md:text-center mb-5 md:mb-10'>{h2}</h2>

					<div className='w-full md:w-8/12 mx-auto flex flex-col md:flex-row md:items-center justify-between gap-y-5'>
						{showIcons && <HeroIcons />}

						<div className='flex flex-col md:flex-row gap-2'>
							<a
								title='get started with VibeToLive'
								className='btn btn-sm md:btn-md btn-base border-none hover:ring-1 ring-base-content text-base-100 hover:text-base-content bg-base-content hover:bg-base-100 rounded-full'
								href={seoData?.ctaLink || '#pricing'}
							>
								{CTALocale?.btn1 || 'Get Started'}
							</a>
							<a
								title='schedule consultation'
								className='btn btn-sm md:btn-md btn-base rounded-full'
								target='_blank'
								href={seoData?.secondaryCtaLink || 'https://tally.so/r/mVry2j'}
							>
								<IoDocumentText /> {CTALocale?.btn2 || 'Schedule Consultation'}
							</a>
						</div>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 100, rotateX: '0deg' }}
					animate={{ opacity: 1, y: 0, rotateX: `${tilt}deg` }}
					transition={{ delay: duration == 0.8 ? 0.4 : 0, duration: duration }}
					className='w-full'
				>
					<Image
						key={theme} // Force re-render when theme changes
						width={1024}
						height={600}
						src={heroImage}
						className='hidden md:flex w-full mt-5'
						alt={h1}
						priority
						fetchPriority="high"
					/>
				</motion.div>
			</section>

			{/* Same decorative pattern as home hero */}
			<div className='absolute w-[100%] left-[0] top-[10%] md:top-[20%] h-[300px]'>
				<svg xmlns='http://www.w3.org/2000/svg' id='patternId' width='100%' height='100%'>
					<defs>
						<pattern id='a' patternUnits='userSpaceOnUse' width='20' height='20' patternTransform='scale(3) rotate(0)'>
							<rect x='0' y='0' width='100%' height='100%' fill='hsla(0, 0%, 100%, 0)'></rect>
							<path d='M 10,-2.55e-7 V 20 Z M -1.1677362e-8,10 H 20 Z' strokeWidth='0.5' className='stroke-base-content/50' fill='none'></path>
						</pattern>
					</defs>
					<rect width='800%' height='800%' transform='translate(0,0)' fill='url(#a)'></rect>
				</svg>
				<div className='bg-gradient-to-b from-base-100 from-20% to-transparent absolute inset-0'></div>
				<div className='bg-gradient-to-l from-base-100 from-1% to-transparent to-30% absolute inset-0'></div>
				<div className='bg-gradient-to-r from-base-100 from-1% to-transparent to-30% absolute inset-0'></div>
				<div className='bg-gradient-to-t from-base-100 from-1% to-transparent to-30% absolute inset-0'></div>
			</div>
		</>
	);
}

