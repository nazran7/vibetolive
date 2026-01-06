'use client';
import { motion } from 'framer-motion';
import FeatureCard from '@/components/home/feature/card';
import { FeaturesList } from '@/lib/featuresList';
import { MdOutlineFeaturedPlayList } from 'react-icons/md';
import { FaRocket, FaShieldAlt, FaLayerGroup, FaTools, FaShip, FaBrain } from 'react-icons/fa';

// Icon mapping for emoji/text to React component
const iconMap = {
	'🚀': FaRocket,
	'🛡️': FaShieldAlt,
	'🏗️': FaLayerGroup,
	'🧩': FaTools,
	'🚢': FaShip,
	'🎯': FaBrain,
};

// Helper function to extract emoji from string
const extractEmoji = (str) => {
	if (!str) return null;
	const emojiRegex = /[\u{1F300}-\u{1F9FF}]/u;
	const match = str.match(emojiRegex);
	return match ? match[0] : null;
};

export default function SEOFeature({ locale, langName = 'en', seoData }) {
	// Use SEO data features if available, otherwise fallback to FeaturesList
	let list = [];

	if (seoData?.featureCards && Array.isArray(seoData.featureCards) && seoData.featureCards.length > 0) {
		// Process SEO features and map emojis to icons
		list = seoData.featureCards.map((feature) => {
			// Check if feature has an emoji icon in title (common pattern)
			let icon = FaRocket; // Default icon
			
			// Check if title starts with emoji
			if (feature.title) {
				const emoji = extractEmoji(feature.title);
				if (emoji && iconMap[emoji]) {
					icon = iconMap[emoji];
					// Remove emoji from title
					feature.title = feature.title.replace(emoji, '').trim();
				}
			}
			
			// If feature has explicit icon property
			if (feature.icon) {
				// If it's already a React component, use it
				if (typeof feature.icon === 'function') {
					icon = feature.icon;
				} else if (typeof feature.icon === 'string') {
					// Check if it's an emoji
					const emoji = extractEmoji(feature.icon);
					if (emoji && iconMap[emoji]) {
						icon = iconMap[emoji];
					}
				}
			}

			return {
				icon: icon,
				title: feature.title || '',
				description: feature.description || '',
			};
		});
	} else {
		// Fallback to FeaturesList
		list = FeaturesList[`FRETURES_${langName.toUpperCase()}`] || [];
	}

	// Ensure list is an array
	if (!Array.isArray(list)) {
		list = [];
	}

	return (
		<section id='feature' className='relative py-10 md:py-20'>
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<div className='relative z-10 flex flex-col gap-5 items-start md:items-center mb-10 mx-auto'>
					<div className='relative inline-flex items-center justify-center gap-2 border-2 border-base-content px-5 md:px-10 py-1 md:py-3 rounded-full text-lg md:text-2xl font-semibold overflow-hidden hover:bg-base-content hover:text-base-100 transition-all'>
						<div className='inline-flex items-center justify-center gap-2 z-10'>
							<MdOutlineFeaturedPlayList /> 
							<h2>{locale?.h2 || seoData?.sectionLabel || 'Features'}</h2>
						</div>
						<div className='absolute w-0 h-full bg-base-content z-[0]'></div>
					</div>

					<h3 className='font-bold text-3xl md:text-5xl bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] md:text-center bg-clip-text text-transparent !leading-[1.25em]'>
						{locale?.h3 || seoData?.sectionHeading || 'Why Choose Us'}
					</h3>

					{(locale?.description1 || seoData?.sectionDescription) && (
						<h4 className='w-full md:w-10/12 mx-auto text-xl md:text-2xl text-base-content/80 md:text-center'>
							{seoData?.sectionDescription || (
								<>
									{locale?.description1}
									<br />
									{locale?.description2}
									<br />
									{locale?.description3}
								</>
							)}
						</h4>
					)}
				</div>
			</motion.div>

			<div className='relative z-10 w-full md:w-10/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-5'>
				{list.map((item, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<FeatureCard featureItem={item} />
					</motion.div>
				))}
			</div>

			<div className='hidden md:block absolute left-[20%] top-[10%] z-0'>
				<div className='absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]'></div>
			</div>
		</section>
	);
}

