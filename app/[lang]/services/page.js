import Image from 'next/image';
import { BsRocketTakeoff, BsShieldFillCheck } from 'react-icons/bs';
import { RiSettings3Fill, RiStackFill } from 'react-icons/ri';

import Cta from '@/components/home/cta';
import JsonLd from '@/components/seo/jsonLd';
import { getDictionary } from '@/lib/i18n';
import { buildPageMetadata, isSupportedLocale, normalizeLocale } from '@/lib/seo/site';
import { breadcrumbSchema, compactJsonLd, serviceSchema } from '@/lib/seo/schema';
import { notFound } from 'next/navigation';

const serviceCards = [
	{
		title: 'Prototype Hardening & Audit',
		icon: BsShieldFillCheck,
		image: '/image/services_1.png',
		alt: 'Prototype hardening and AI code audit',
		items: ['Codebase and dependency review', 'Data validation and model safety check', 'Infrastructure optimization', 'Security patching'],
		outcome: 'A stable, ready-to-scale foundation for your AI product.',
	},
	{
		title: 'Secure AI App Deployment',
		icon: BsRocketTakeoff,
		image: '/image/services_2.png',
		alt: 'Secure AI app deployment',
		items: ['Containerized deployment', 'CI/CD pipelines', 'SSL, access control, and token management', 'Data encryption and compliance readiness'],
		outcome: 'A production-ready app that is as safe as it is useful.',
	},
	{
		title: 'Scaling & Performance Optimization',
		icon: RiStackFill,
		image: '/image/services_3.png',
		alt: 'Scaling and performance optimization',
		items: ['Load testing and API optimization', 'Model serving and caching setup', 'Cost optimization for inference workloads', 'Auto-scaling infrastructure configuration'],
		outcome: 'Speed, stability, and efficiency at every scale.',
	},
	{
		title: 'Maintenance & Production Support',
		icon: RiSettings3Fill,
		image: '/image/services_4.png',
		alt: 'Maintenance and production support',
		items: ['Performance monitoring', 'Dependency updates', 'Bug fixing and incident response', 'Product enhancement cycles'],
		outcome: 'A continuously improving AI product that grows with your users.',
	},
];

export async function generateMetadata({ params }) {
	const langName = normalizeLocale(params.lang);
	const dict = await getDictionary(langName);

	return buildPageMetadata({
		locale: langName,
		path: '/services',
		title: `${dict.Service?.h1 || 'AI Prototype to Production Services'} | VibeToLive.dev`,
		description:
			dict.Service?.intro ||
			'Production hardening, secure deployment, scaling, and maintenance services for AI-generated applications.',
	});
}

export default async function Page({ params }) {
	if (!isSupportedLocale(params.lang)) {
		notFound();
	}

	const langName = normalizeLocale(params.lang);
	const dict = await getDictionary(langName);
	const jsonLd = compactJsonLd([
		serviceSchema({
			name: dict.Service?.h1 || 'AI Prototype to Production Services',
			description:
				dict.Service?.intro ||
				'Production hardening, secure deployment, scaling, and maintenance services for AI-generated applications.',
			path: '/services',
			locale: langName,
		}),
		breadcrumbSchema({
			locale: langName,
			items: [
				{ name: 'Home', path: '/' },
				{ name: 'Services', path: '/services' },
			],
		}),
	]);

	return (
		<main className='container mx-auto px-5'>
			<JsonLd data={jsonLd} />
			<section className='relative z-10 flex flex-col items-start md:items-center pt-10 mb-10 overflow-hidden'>
				<h1 className='font-bold text-5xl md:text-7xl bg-gradient-to-r from-base-content from-50% to-primary text-center bg-clip-text text-transparent !leading-[1.25em] mb-5'>
					{dict.Service?.h1 || 'AI Prototype to Production Services'}
				</h1>
				<p className='w-full md:w-10/12 mx-auto text-xl md:text-2xl text-base-content/80 md:text-center mb-5 md:mb-10'>
					{dict.Service?.intro ||
						'Your AI prototype deserves more than a demo. We transform AI-generated prototypes into secure, scalable production applications.'}
				</p>
			</section>

			<section className='flex flex-col gap-y-16 mb-32'>
				{serviceCards.map((service, index) => {
					const Icon = service.icon;
					const reverse = index % 2 === 1;

					return (
						<article key={service.title} className={`flex flex-col md:flex-row items-stretch justify-between gap-10 ${reverse ? 'md:flex-row-reverse' : ''}`}>
							<div className='w-full md:w-3/5 relative min-h-[260px] rounded-lg overflow-hidden shadow-xl'>
								<Image
									src={service.image}
									fill
									sizes='(max-width: 768px) 100vw, 60vw'
									className='object-cover hover:scale-105 transition-all'
									alt={service.alt}
								/>
							</div>
							<div className='w-full md:w-2/5 ring-2 ring-base-content/10 py-5 px-10 rounded-lg bg-base-200 shadow-xl'>
								<div className='flex items-center justify-between gap-5 py-5'>
									<h2 className='text-3xl font-bold'>{service.title}</h2>
									<Icon size={48} />
								</div>
								<ul className='list-disc ml-5 mb-3 text-lg'>
									{service.items.map((item) => (
										<li key={item}>{item}</li>
									))}
								</ul>
								<p className='text-lg font-medium'>Outcome: {service.outcome}</p>
							</div>
						</article>
					);
				})}
			</section>

			<section className='mb-32'>
				<h2 className='text-4xl md:text-5xl font-bold mb-5 text-center'>Our Tech Stack</h2>
				<p className='text-lg md:text-xl text-center mb-10'>
					React, Next.js, Node.js, FastAPI, LangChain, OpenAI, Hugging Face, AWS, Docker, Vercel, Sentry, and production observability tools.
				</p>
			</section>

			<section className='mb-32'>
				<h2 className='text-4xl md:text-5xl font-bold mb-5 text-center'>Why Choose VibeToLive.dev</h2>
				<ul className='grid grid-cols-1 md:grid-cols-4 gap-5 text-lg text-base-content/80 text-center'>
					<li className='rounded-lg bg-base-200 p-5'>Deep expertise in AI and full-stack deployment</li>
					<li className='rounded-lg bg-base-200 p-5'>Focused on indie hackers and lean startups</li>
					<li className='rounded-lg bg-base-200 p-5'>Transparent pricing and fixed-scope delivery</li>
					<li className='rounded-lg bg-base-200 p-5'>Fast turnaround from prototype to production</li>
				</ul>
			</section>

			<Cta locale={dict.CTA} CTALocale={dict.CTAButton} />
		</main>
	);
}
