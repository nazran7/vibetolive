import Image from 'next/image';
import { BsPatchQuestionFill } from 'react-icons/bs';
import { RiTeamFill } from 'react-icons/ri';

import Cta from '@/components/home/cta';
import TestimonialCard from '@/components/home/testimonial/card';
import { TestimonialsList } from '@/lib/testimonialsList';
import { getDictionary } from '@/lib/i18n';
import { buildPageMetadata, isSupportedLocale, normalizeLocale } from '@/lib/seo/site';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
	const langName = normalizeLocale(params.lang);
	const dict = await getDictionary(langName);

	return buildPageMetadata({
		locale: langName,
		path: '/about',
		title: `${dict.About?.h1 || 'About VibeToLive.dev'} | VibeToLive.dev`,
		description:
			dict.About?.h2 ||
			'Learn how VibeToLive.dev helps founders turn AI-generated prototypes into secure, scalable, production-ready products.',
	});
}

export default async function Page({ params }) {
	if (!isSupportedLocale(params.lang)) {
		notFound();
	}

	const langName = normalizeLocale(params.lang);
	const dict = await getDictionary(langName);
	const testimonials = TestimonialsList[`TESTIMONIAL_${langName.toUpperCase()}`] || [];

	return (
		<main className='container mx-auto px-5'>
			<section className='relative'>
				<div className='relative z-10 flex flex-col items-start md:items-center pt-10 mb-5 overflow-hidden'>
					<h1 className='font-bold text-5xl md:text-7xl bg-gradient-to-r from-base-content from-50% to-primary text-center bg-clip-text text-transparent !leading-[1.25em] mb-5'>
						{dict.About?.h1 || 'About VibeToLive.dev'}
					</h1>
					<h2 className='w-full md:w-10/12 mx-auto text-xl md:text-2xl text-base-content/80 md:text-center mb-5 md:mb-10'>
						{dict.About?.h2}
					</h2>
				</div>
			</section>

			<section className='flex flex-col gap-y-10 mb-32'>
				<article className='flex flex-col md:flex-row items-stretch justify-between gap-10'>
					<div className='w-full md:w-3/5 relative min-h-[280px] rounded-lg overflow-hidden shadow-xl'>
						<Image
							src='/image/about_1.jpg'
							fill
							sizes='(max-width: 768px) 100vw, 60vw'
							className='object-cover hover:scale-105 transition-all'
							alt='VibeToLive.dev production review process'
						/>
					</div>
					<div className='w-full md:w-2/5 ring-2 ring-base-content/10 py-5 px-10 rounded-lg bg-base-200 shadow-xl'>
						<div className='flex items-center justify-between gap-5 py-5'>
							<h2 className='text-3xl font-bold'>{dict.About?.why}</h2>
							<BsPatchQuestionFill size={48} />
						</div>
						<p className={`text-lg break-words ${langName === 'ar' ? 'text-right' : ''}`}>
							{dict.About?.why_content}
						</p>
					</div>
				</article>

				<article className='flex flex-col md:flex-row items-stretch justify-between gap-10'>
					<div className='w-full md:w-2/5 ring-2 ring-base-content/10 py-5 px-10 rounded-lg bg-base-200 shadow-xl'>
						<div className='flex items-center justify-between gap-5 py-5'>
							<RiTeamFill size={48} />
							<h2 className='text-3xl font-bold'>{dict.About?.team}</h2>
						</div>
						<p className={`text-lg break-words ${langName === 'ar' ? 'text-right' : ''}`}>
							{dict.About?.team_content}
						</p>
					</div>
					<div className='w-full md:w-3/5 relative min-h-[280px] rounded-lg overflow-hidden shadow-xl'>
						<Image
							src='/image/about_2.jpg'
							fill
							sizes='(max-width: 768px) 100vw, 60vw'
							className='object-cover hover:scale-105 transition-all'
							alt='VibeToLive.dev engineering team'
						/>
					</div>
				</article>
			</section>

			<section className='relative mb-20'>
				<div className='relative z-10 flex flex-col gap-5 items-start md:items-center mb-10 mx-auto'>
					<h2 className='font-bold text-3xl md:text-5xl bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] md:text-center bg-clip-text text-transparent !leading-[1.25em]'>
						{dict.Testimonial?.h3}
					</h2>
					<p className='w-full text-xl md:text-2xl text-base-content/80 md:text-center'>
						{dict.Testimonial?.description1}
					</p>
				</div>
				<div className='relative z-10 w-full columns-1 md:columns-4 gap-5'>
					{testimonials.map((item, index) => (
						<TestimonialCard key={index} testimonialItem={item} langName={langName} />
					))}
				</div>
			</section>

			<Cta locale={dict.CTA} CTALocale={dict.CTAButton} />
		</main>
	);
}
