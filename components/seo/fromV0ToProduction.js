'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
	FaRocket,
	FaShieldAlt,
	FaCheck,
	FaExclamationTriangle,
	FaChevronDown,
	FaLock,
	FaDatabase,
	FaKey,
	FaServer,
	FaCreditCard,
	FaChartLine,
	FaCogs,
	FaCode,
	FaPalette,
} from 'react-icons/fa';
import {
	MdWarning,
	MdCancel,
	MdCheckCircle,
	MdHelpCenter,
	MdOutlineFeaturedPlayList,
} from 'react-icons/md';
import { getHrefForLocale } from '@/lib/seo/site';
import SeoPricing from '@/components/seo/pricing';

const V0_STACK = [
	{ name: 'V0', style: 'border-base-content/30 text-base-content bg-base-content/10 font-bold' },
	{ name: 'Next.js', style: 'border-base-content/20 text-base-content bg-base-content/5' },
	{ name: 'React', style: 'border-sky-500/20 text-sky-500 bg-sky-500/5' },
	{ name: 'shadcn/ui', style: 'border-violet-500/20 text-violet-500 bg-violet-500/5' },
	{ name: 'Tailwind CSS', style: 'border-teal-500/20 text-teal-500 bg-teal-500/5' },
	{ name: 'Vercel', style: 'border-base-content/20 text-base-content bg-base-content/5' },
	{ name: 'Stripe', style: 'border-indigo-500/20 text-indigo-500 bg-indigo-500/5' },
];

const RELATED_GUIDES = [
	{
		slug: 'ai-prototype-to-production',
		title: 'AI Prototype to Production',
		description: 'Main hub for all AI-generated app production help — start here for the full overview.',
	},
	{
		slug: 'from-lovable-to-production',
		title: 'From Lovable to Production',
		description: 'Lovable-specific production help for Supabase, auth, and deployment.',
	},
	{
		slug: 'from-bolt-to-production',
		title: 'From Bolt to Production',
		description: 'Bolt.new-specific production help for export, build, and deployment issues.',
	},
	{
		slug: 'from-cursor-to-production',
		title: 'From Cursor to Production',
		description: 'Cursor-assisted app production help for code-heavy workflows.',
	},
	{
		slug: 'security-risks-ai-generated-code',
		title: 'Security Risks in AI-Generated Code',
		description: 'Security and permissions review for AI-built applications.',
	},
	{
		slug: 'production-readiness-checklist',
		title: 'Production Readiness Checklist',
		description: 'Checklist-style guide for launch readiness across any AI stack.',
	},
];

export default function FromV0ToProductionPage({ langName = 'en' }) {
	const [activeFaq, setActiveFaq] = useState(null);

	const toggleFaq = (index) => {
		setActiveFaq(activeFaq === index ? null : index);
	};

	const faqItems = [
		{
			question: 'Can a V0-generated app be used in production?',
			answer:
				'Yes. A V0-generated app can be used in production if the UI is integrated with real backend logic, authentication, database access, environment variables, deployment, monitoring, and QA. V0 is excellent for generating interface code, but production usually requires additional engineering around the UI.',
		},
		{
			question: 'Do I need to rebuild my V0 UI from scratch?',
			answer:
				'Usually, no. Many V0-generated interfaces are strong enough to keep. VibeToLive reviews the current output, cleans up the component integration, connects the backend, and only recommends rebuilding if the UI structure is too unstable or incompatible with the product.',
		},
		{
			question: 'Why does my V0 app look finished but not work?',
			answer:
				'V0 often generates polished frontend code with mock data, visual forms, static dashboards, and placeholder flows. The app still needs backend APIs, database persistence, auth, permissions, payments, and deployment configuration before users can rely on it.',
		},
		{
			question: 'Can you connect a V0 UI to a backend?',
			answer:
				'Yes. VibeToLive can connect V0-generated interfaces to backend APIs, server actions, databases, authentication providers, payment systems, email services, AI APIs, and admin workflows.',
		},
		{
			question: 'Can you integrate V0 output into a Next.js app?',
			answer:
				'Yes. VibeToLive can integrate V0-generated pages and components into a Next.js project, including App Router structure, layouts, providers, metadata, server actions, API routes, Tailwind configuration, and shadcn/ui components.',
		},
		{
			question: 'Can you fix shadcn or Tailwind issues from V0?',
			answer:
				'Yes. VibeToLive can resolve missing shadcn components, import path issues, Tailwind config mismatches, CSS variable problems, Radix dependency conflicts, icon imports, dark mode behavior, and component naming conflicts.',
		},
		{
			question: 'Can you add authentication to a V0 app?',
			answer:
				'Yes. VibeToLive can add or review authentication, protected routes, session handling, role-based access, admin protection, and user ownership checks. A production app should protect private pages and data server-side.',
		},
		{
			question: 'Can you add Stripe payments to a V0 app?',
			answer:
				'Yes. VibeToLive can implement or review Stripe checkout, live and test keys, webhook signature verification, subscription state, customer portal behavior, paid-user access, cancellations, and failed payment handling.',
		},
		{
			question: 'What should I send for a V0 app review?',
			answer:
				'You can send your V0 output, GitHub repo, demo link, screenshots, current app stack, backend plan, database choice, payment requirements, and launch goal. If you only have the V0-generated UI, that is enough to start.',
		},
		{
			question: 'How long does it take to make a V0 app production-ready?',
			answer:
				'The timeline depends on how much of the app exists beyond the UI. A simple V0 page may only need integration and deployment. A V0-generated SaaS dashboard with authentication, database, payments, admin roles, and live data usually needs a deeper production-hardening scope.',
		},
	];

	const productionNeeds = [
		'Backend and API integration',
		'Authentication and protected routes',
		'Database connection and permission rules',
		'Server-side business logic',
		'Form handling and validation',
		'Stripe or payment integration',
		'Environment variable setup',
		'Tailwind/shadcn dependency cleanup',
		'Deployment to Vercel, Railway, Render, AWS, or similar hosting',
		'Monitoring, error tracking, and QA',
		'A clear handoff for future development',
	];

	const productionQuestions = [
		'Does the UI connect to real backend data?',
		'Are forms validated and saved correctly?',
		'Are private routes protected?',
		'Are user roles enforced server-side?',
		'Is the database permission model safe?',
		'Are API calls secure and reliable?',
		'Are environment variables configured correctly?',
		'Are payment flows implemented beyond the UI?',
		'Does the app deploy reliably?',
		'Are production errors tracked?',
		'Can the team maintain the UI and backend together?',
	];

	const v0Problems = [
		{
			title: 'The UI Is Frontend-Only',
			desc: 'V0 is strongest at generating frontend experiences — screens, buttons, forms, and dashboards without the backend logic to make them real.',
			bullets: [
				'Forms that do not save to a database',
				'Tables with mock data',
				'Pricing pages without payment logic',
				'Login screens without real auth enforcement',
				'Client-side logic that should be server-side',
			],
		},
		{
			title: 'V0 Components Need Integration Into a Real App Structure',
			desc: 'Production requires placing V0 output into a maintainable Next.js or React project with routes, layouts, providers, and deployment.',
			bullets: [
				'Next.js App Router project structure',
				'shadcn/ui design system integration',
				'Backend-connected dashboards',
				'Clear layouts and data fetching',
				'Production deployment pipeline',
			],
		},
		{
			title: 'V0 Pages and Components Have Different Production Needs',
			desc: 'A single component vs a full page vs an app-like flow each requires a different integration path.',
			bullets: [
				'Routing and metadata for full pages',
				'State management and loading states',
				'Server actions and error handling',
				'Responsive testing across devices',
			],
		},
		{
			title: 'Tailwind and shadcn Version Mismatches',
			desc: 'V0 output may expect specific Tailwind, shadcn/ui, Radix, or lucide-react versions that do not match your existing app.',
			bullets: [
				'Missing shadcn/ui components',
				'Tailwind config mismatch',
				'CSS variables not defined',
				'Radix dependency conflicts',
			],
		},
		{
			title: 'Mock Data Needs to Become Real Data',
			desc: 'V0 frequently generates realistic-looking mock data useful for design — production needs real data sources.',
			bullets: [
				'Database queries and API responses',
				'Authenticated user state',
				'Payment/subscription status',
				'Error, loading, and empty states',
			],
		},
		{
			title: 'Authentication Needs to Protect the App, Not Just the UI',
			desc: 'Real authentication requires auth provider setup, sessions, protected routes, and server-side authorization — not just visible login components.',
			bullets: [
				'Protected routes and session handling',
				'Role-based access checks',
				'User ownership checks',
				'Redirect and logout behavior',
			],
		},
		{
			title: 'Backend and API Logic May Be Missing',
			desc: 'A V0-generated interface often needs API routes, server actions, validation, webhooks, and logging to become functional.',
			bullets: [
				'API routes and server actions',
				'Input validation and business rules',
				'Payment webhooks and admin actions',
				'Sensitive logic kept off the client',
			],
		},
		{
			title: 'Deployment Is More Than Publishing the UI',
			desc: 'Production deployment needs build commands, env vars, runtime requirements, metadata, logs, and rollback planning.',
			bullets: [
				'Framework and build settings',
				'Environment variables',
				'Domain setup and redirects',
				'Error tracking and rollback plan',
			],
		},
	];

	const processSteps = [
		{
			step: '01',
			title: 'V0 Output Review',
			desc: 'We review the V0-generated page, component, or app flow — what is real, what is mock data, what is missing, and what needs backend support.',
		},
		{
			step: '02',
			title: 'Architecture and Integration Plan',
			desc: 'We define where the V0 output belongs in the production app — Next.js integration, API routes, database wiring, or reusable components.',
		},
		{
			step: '03',
			title: 'Backend and Data Wiring',
			desc: 'We connect the interface to real data: database queries, server actions, form submissions, auth-aware fetching, and validation logic.',
		},
		{
			step: '04',
			title: 'Auth, Permissions, and Security',
			desc: 'We add or review authentication and protected routes so permissions are enforced server-side for dashboards, admin areas, and private data.',
		},
		{
			step: '05',
			title: 'Payments and Integrations',
			desc: 'We wire or review Stripe, email, AI APIs, file uploads, and third-party services including webhook verification and paid-user access.',
		},
		{
			step: '06',
			title: 'Deployment and Production Configuration',
			desc: 'We configure Vercel, Railway, Render, AWS, DigitalOcean, or another platform with build settings, env vars, domains, and logs.',
		},
		{
			step: '07',
			title: 'QA, Monitoring, and Handoff',
			desc: 'We test signup, login, dashboards, forms, payments, admin access, loading/empty/error states, and hand off what was integrated and fixed.',
		},
	];

	const checklistCategories = [
		{
			category: 'UI Integration',
			icon: 'palette',
			items: [
				'Is the V0 output integrated into the real app structure?',
				'Are imports and component paths correct?',
				'Are shadcn/ui components installed and configured?',
				'Are Tailwind config and CSS variables aligned?',
				'Does the UI work across desktop, tablet, and mobile?',
				'Are loading, empty, and error states handled?',
			],
		},
		{
			category: 'Backend',
			icon: 'code',
			items: [
				'Does the UI connect to real backend data?',
				'Are API routes or server actions implemented?',
				'Is input validation in place?',
				'Is sensitive logic kept server-side?',
				'Are mock data and placeholder logic removed?',
			],
		},
		{
			category: 'Authentication',
			icon: 'lock',
			items: [
				'Are private pages protected?',
				'Are auth sessions handled correctly?',
				'Are user roles enforced server-side?',
				'Are admin pages secured?',
				'Can direct URL access bypass restrictions?',
			],
		},
		{
			category: 'Database',
			icon: 'database',
			items: [
				'Are forms saved correctly?',
				'Are user ownership rules enforced?',
				'Are dashboard tables connected to real data?',
				'Are permissions safe for private data?',
				'Are required constraints or indexes in place?',
			],
		},
		{
			category: 'Payments',
			icon: 'payment',
			items: [
				'Is Stripe checkout implemented beyond the UI?',
				'Are live and test keys separated?',
				'Are webhooks verified?',
				'Is the subscription state synced?',
				'Is paid-user access enforced server-side?',
			],
		},
		{
			category: 'Deployment',
			icon: 'server',
			items: [
				'Does the app build successfully?',
				'Are environment variables configured?',
				'Is the production domain connected?',
				'Are redirects and callback URLs correct?',
				'Is there a rollback path?',
			],
		},
		{
			category: 'Monitoring',
			icon: 'chart',
			items: [
				'Are production errors tracked?',
				'Are API failures visible?',
				'Are payment problems visible?',
				'Does the founder know where to check issues after launch?',
			],
		},
	];

	const checklistIcon = (type) => {
		switch (type) {
			case 'palette':
				return <FaPalette className='text-primary' />;
			case 'code':
				return <FaCode className='text-primary' />;
			case 'lock':
				return <FaLock className='text-primary' />;
			case 'database':
				return <FaDatabase className='text-primary' />;
			case 'payment':
				return <FaCreditCard className='text-primary' />;
			case 'server':
				return <FaServer className='text-primary' />;
			case 'chart':
				return <FaChartLine className='text-primary' />;
			default:
				return <FaCheck className='text-primary' />;
		}
	};

	return (
		<div className='w-full relative py-5 select-none'>
			<div className='absolute w-full left-0 top-0 h-[400px] z-0 overflow-hidden pointer-events-none opacity-30'>
				<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
					<defs>
						<pattern id='v0-grid' width='24' height='24' patternUnits='userSpaceOnUse'>
							<path d='M 24 0 L 0 0 0 24' fill='none' stroke='currentColor' strokeWidth='0.5' className='text-base-content/20' />
						</pattern>
					</defs>
					<rect width='100%' height='100%' fill='url(#v0-grid)' />
				</svg>
				<div className='absolute inset-0 bg-gradient-to-b from-transparent to-base-100' />
			</div>

			<section className='relative z-10 py-12 lg:py-20 flex flex-col items-center'>
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className='text-center max-w-4xl'
				>
					<h1 className='font-bold text-4xl md:text-6xl lg:text-7xl bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] text-center bg-clip-text text-transparent !leading-[1.2em] mb-6 tracking-tight'>
						From V0 to Production
					</h1>

					<h2 className='text-2xl md:text-3xl text-primary font-bold mb-6'>
						Can you turn a V0-generated UI into a production-ready app?
					</h2>

					<p className='text-lg md:text-xl text-base-content/80 mb-6 max-w-3xl mx-auto leading-relaxed'>
						Yes. A V0-generated UI can become a real production application, but it usually needs backend engineering,
						authentication, database wiring, API integration, deployment setup, environment variables, monitoring, and QA
						before real users can use it safely. V0 is excellent for generating polished React, Tailwind, and shadcn-style
						interfaces, but most V0 outputs are not complete production systems by default.
					</p>

					<p className='text-base md:text-lg text-base-content/70 mb-10 max-w-2xl mx-auto'>
						VibeToLive helps founders and teams move V0-generated apps from beautiful frontend demos to secure, functional,
						production-ready products.
					</p>

					<div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-16'>
						<a
							href='mailto:hello@vibetolive.dev?subject=Launch%20My%20V0%20App'
							className='btn btn-wide btn-primary rounded-full hover:scale-105 transition-all text-primary-content font-bold shadow-lg shadow-primary/20'
						>
							Launch My V0 App
						</a>
						<a
							href='mailto:hello@vibetolive.dev?subject=Request%20V0%20App%20Review'
							className='btn btn-wide btn-outline rounded-full hover:bg-base-content hover:text-base-100 transition-all font-semibold'
						>
							Request a V0 App Review
						</a>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className='w-full max-w-4xl bg-base-200 border border-base-content/10 p-6 md:p-8 rounded-2xl shadow-sm relative overflow-hidden'
				>
					<div className='absolute right-0 top-0 w-24 h-24 bg-violet-500/5 rounded-full blur-2xl' />
					<h3 className='text-xl md:text-2xl font-bold mb-6 flex items-center gap-2'>
						<span className='p-2 bg-violet-500/10 text-violet-600 rounded-lg'>
							<FaRocket />
						</span>
						A production-ready V0 app usually needs:
					</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{productionNeeds.map((item, idx) => (
							<div key={idx} className='flex items-start gap-3'>
								<span className='text-emerald-500 mt-1'>
									<FaCheck size={14} />
								</span>
								<span className='text-base-content/80 text-sm md:text-base'>{item}</span>
							</div>
						))}
					</div>
					<p className='mt-6 text-sm text-base-content/70 border-t border-base-content/10 pt-4'>
						V0 can give you a strong interface. VibeToLive helps turn that interface into a real app.
					</p>
				</motion.div>

				<div className='mt-16 w-full max-w-5xl'>
					<p className='text-center text-xs md:text-sm font-semibold uppercase tracking-wider text-base-content/40 mb-6'>
						Common V0 production stack
					</p>
					<div className='flex flex-wrap gap-3 justify-center'>
						{V0_STACK.map((tech, idx) => (
							<span
								key={idx}
								className={`px-4 py-2 border rounded-full text-xs md:text-sm font-medium transition-all hover:scale-105 duration-200 cursor-default ${tech.style}`}
							>
								{tech.name}
							</span>
						))}
					</div>
				</div>
			</section>

			<div className='border-t border-base-content/10 my-10 max-w-6xl mx-auto' />

			<section className='relative z-10 py-10 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-10'>
					<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
						<FaExclamationTriangle className='text-amber-500' /> V0 Reality Check
					</div>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						V0 Is Great for UI. Production Needs the Rest of the System.
					</h2>
					<p className='text-lg text-base-content/75 leading-relaxed mb-4'>
						V0 is one of the fastest ways to generate modern app interfaces — dashboards, forms, tables, settings pages,
						and responsive layouts with strong visual quality.
					</p>
					<p className='text-lg text-base-content/75 leading-relaxed'>
						But a V0-generated interface is usually only part of the product. A dashboard may have a perfect table UI but no
						real database connection. A pricing page may look polished but Stripe may not be implemented. VibeToLive helps you
						preserve the design speed of V0 while adding the production engineering needed behind it.
					</p>
				</div>
			</section>

			<div className='border-t border-base-content/10 my-10 max-w-6xl mx-auto' />

			<section className='relative z-10 py-10 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-12'>
					<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
						<FaShieldAlt className='text-primary' /> Core Definition
					</div>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						What “From V0 to Production” Means
					</h2>
					<p className='text-lg text-base-content/75 leading-relaxed'>
						Moving from V0 to production means taking V0-generated UI and connecting it to the systems required for a real
						product — backend APIs, authentication, database, deployment, and real user flow testing.
					</p>
				</div>

				<div className='bg-base-200/40 border border-base-content/10 p-6 md:p-8 rounded-2xl max-w-4xl mx-auto'>
					<h3 className='text-lg font-bold mb-4'>A production V0 app should answer these questions:</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
						{productionQuestions.map((q, idx) => (
							<div key={idx} className='flex items-start gap-2 text-sm text-base-content/85'>
								<span className='text-primary mt-0.5'>
									<FaCheck size={10} />
								</span>
								<span>{q}</span>
							</div>
						))}
					</div>
					<p className='mt-6 text-sm text-base-content/70 italic'>
						If the app only has screens, it is still a prototype.
					</p>
				</div>
			</section>

			<div className='border-t border-base-content/10 my-10 max-w-6xl mx-auto' />

			<section className='relative z-10 py-10 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-12'>
					<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
						<MdWarning className='text-red-500' /> V0-Specific Risks
					</div>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						Common V0 Production Problems
					</h2>
					<p className='text-lg text-base-content/75'>
						V0-generated apps often have high-quality interfaces, but production problems appear when the UI needs to become
						a working system.
					</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{v0Problems.map((problem, idx) => (
						<motion.div
							key={idx}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: idx * 0.04 }}
							viewport={{ once: true }}
							className='bg-base-100 border border-base-content/10 p-6 rounded-xl hover:border-violet-500/40 transition-all'
						>
							<h3 className='text-lg font-bold mb-2 text-base-content'>{problem.title}</h3>
							<p className='text-sm text-base-content/70 mb-4 leading-relaxed'>{problem.desc}</p>
							<ul className='space-y-1.5'>
								{problem.bullets.map((bullet, bulletIdx) => (
									<li key={bulletIdx} className='flex items-start gap-2 text-xs text-base-content/80'>
										<span className='text-red-400 mt-0.5'>
											<MdCancel size={12} />
										</span>
										{bullet}
									</li>
								))}
							</ul>
						</motion.div>
					))}
				</div>
			</section>

			<div className='border-t border-base-content/10 my-10 max-w-6xl mx-auto' />

			<section className='relative z-10 py-10 max-w-6xl mx-auto'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
					<div>
						<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
							<MdCheckCircle className='text-emerald-500' /> How We Help
						</div>
						<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
							How VibeToLive Helps With V0 Apps
						</h2>
						<p className='text-lg text-base-content/75 mb-6 leading-relaxed'>
							We review the current V0 output, understand what it is meant to become, and add the missing engineering
							layer around it.
						</p>
						<p className='text-base-content/70'>
							The goal is to keep the strong visual foundation from V0 and make it work as a real product.
						</p>
					</div>

					<div className='grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2'>
						{[
							'V0 UI review',
							'Next.js or React integration',
							'shadcn/ui and Tailwind cleanup',
							'Component structure cleanup',
							'Backend and API wiring',
							'Database integration',
							'Authentication setup',
							'Protected route implementation',
							'Form validation and persistence',
							'Stripe/payment integration',
							'Environment variable setup',
							'Production deployment',
							'Monitoring and error tracking',
							'QA across real user flows',
							'Founder or team handoff',
						].map((tag, idx) => (
							<div key={idx} className='flex items-center gap-2'>
								<span className='text-violet-600'>
									<FaCheck size={12} />
								</span>
								<span className='text-sm text-base-content/85'>{tag}</span>
							</div>
						))}
					</div>
				</div>
			</section>

			<div className='border-t border-base-content/10 my-10 max-w-6xl mx-auto' />

			<section className='relative z-10 py-10 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-12'>
					<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
						<FaCogs className='text-primary' /> Delivery Path
					</div>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						Our V0 to Production Process
					</h2>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
					{processSteps.map((item, idx) => (
						<motion.div
							key={idx}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: idx * 0.04 }}
							viewport={{ once: true }}
							className='bg-base-100 border border-base-content/10 p-6 rounded-2xl relative overflow-hidden group hover:border-violet-500 transition-all'
						>
							<div className='absolute right-4 top-4 text-5xl font-extrabold text-base-content/5 group-hover:text-violet-500/10 transition-colors'>
								{item.step}
							</div>
							<h3 className='text-lg font-bold mb-3 text-base-content pr-10'>{item.title}</h3>
							<p className='text-sm text-base-content/70 leading-relaxed'>{item.desc}</p>
						</motion.div>
					))}
				</div>
			</section>

			<div className='border-t border-base-content/10 my-10 max-w-6xl mx-auto' />

			<section className='relative z-10 py-10 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-12'>
					<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
						<MdOutlineFeaturedPlayList className='text-primary' /> Pre-Launch Checklist
					</div>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						V0 Production Checklist
					</h2>
					<p className='text-lg text-base-content/75'>
						If several items are missing, the V0 output is still a frontend prototype, not a production app.
					</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
					{checklistCategories.map((check, idx) => (
						<div key={idx} className='border border-base-content/10 bg-base-100 p-5 rounded-xl'>
							<h3 className='font-bold text-base border-b border-base-content/10 pb-2 mb-4 flex items-center gap-2'>
								{checklistIcon(check.icon)}
								{check.category}
							</h3>
							<ul className='space-y-2 text-xs text-base-content/85'>
								{check.items.map((item, itemIdx) => (
									<li key={itemIdx} className='flex gap-2 items-start'>
										<span className='text-violet-600 mt-0.5'>
											<FaCheck size={10} />
										</span>
										<span>{item}</span>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</section>

			<div className='border-t border-base-content/10 my-10 max-w-6xl mx-auto' />

			<section className='relative z-10 py-10 bg-base-200/30 p-6 md:p-10 rounded-3xl border border-base-content/5 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-10'>
					<h2 className='text-2xl md:text-4xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-4'>
						What You Get
					</h2>
					<p className='text-lg text-base-content/75'>
						Depending on the condition of your V0 app, your production handoff may include:
					</p>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto text-sm text-base-content/95'>
					{[
						'V0 UI and code review',
						'Component cleanup',
						'Tailwind and shadcn setup fixes',
						'Next.js or React integration',
						'Backend and API route implementation',
						'Database wiring',
						'Authentication setup',
						'Protected route fixes',
						'Form validation and persistence',
						'Stripe checkout and webhook review',
						'Environment variable cleanup',
						'Production deployment setup',
						'Monitoring and error tracking',
						'QA notes',
						'Launch-readiness checklist',
						'Founder-friendly handoff',
					].map((item, idx) => (
						<div key={idx} className='flex items-center gap-2.5 p-3 bg-base-100 rounded-xl border border-base-content/5'>
							<span className='text-emerald-500'>
								<FaCheck size={12} />
							</span>
							<span>{item}</span>
						</div>
					))}
				</div>
			</section>

			<SeoPricing />

			<section className='relative z-10 py-10 max-w-6xl mx-auto'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<div className='border border-base-content/10 bg-base-100 p-6 md:p-8 rounded-2xl'>
						<h3 className='text-xl font-bold text-emerald-500 mb-6 flex items-center gap-2'>
							<MdCheckCircle className='text-2xl' /> Who This Service Is For
						</h3>
						<ul className='space-y-3 text-sm text-base-content/85'>
							{[
								'Founders who generated an app UI in V0',
								'Teams with V0 dashboards that need real data',
								'Builders who need backend integration behind V0 screens',
								'Startups using V0 for SaaS UI or customer portals',
								'Non-technical founders with a polished UI but no production backend',
								'Developers who need help integrating V0 output into an existing app',
								'Apps with shadcn, Tailwind, or component setup conflicts',
								'V0-generated products that need auth, database, payments, or deployment',
								'Founders who want to avoid rebuilding the UI from scratch',
							].map((item, idx) => (
								<li key={idx} className='flex items-start gap-2'>
									<span className='text-emerald-500 mt-1'>•</span>
									<span>{item}</span>
								</li>
							))}
						</ul>
						<p className='mt-4 text-xs text-base-content/60'>
							Not for a simple static mockup — for V0-generated interfaces that need to become working software.
						</p>
					</div>

					<div className='border border-base-content/10 bg-base-100 p-6 md:p-8 rounded-2xl'>
						<h3 className='text-xl font-bold text-amber-500 mb-6 flex items-center gap-2'>
							<FaExclamationTriangle className='text-xl' /> When Your V0 App Is Not Ready
						</h3>
						<ul className='space-y-3 text-sm text-base-content/85'>
							{[
								'The UI looks finished but uses mock data',
								'Forms do not save anywhere',
								'The dashboard has no real backend',
								'The login page is only visual',
								'Admin pages are not protected',
								'Stripe pricing exists but payments are not implemented',
								'shadcn or Tailwind imports are broken',
								'The app does not fit cleanly into your repo',
								'API routes are missing',
								'Environment variables are unclear',
								'The app deploys visually but core flows do not work',
								'You have no monitoring after launch',
							].map((item, idx) => (
								<li key={idx} className='flex items-start gap-2'>
									<span className='text-amber-500 mt-1'>•</span>
									<span>{item}</span>
								</li>
							))}
						</ul>
						<p className='mt-4 text-xs text-base-content/60'>Normal V0 production gaps — and fixable.</p>
					</div>
				</div>
			</section>

			<section className='relative z-10 py-10 bg-base-200/40 p-6 md:p-10 rounded-3xl border border-base-content/5 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-8'>
					<h2 className='text-2xl md:text-4xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-4'>
						Why Use VibeToLive for a V0 App?
					</h2>
					<p className='text-lg text-base-content/75'>
						V0 gives you a polished UI quickly. VibeToLive turns that UI into a real product.
					</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-sm'>
					{[
						{
							title: 'Avoid Launching a Beautiful UI That Does Not Work',
							desc: 'Connect the interface to real data, users, permissions, and business rules before launch.',
						},
						{
							title: 'Avoid Rebuilding a Good V0 Interface',
							desc: 'Integrate the UI properly instead of throwing away strong design work.',
						},
						{
							title: 'Avoid Unsafe Backend Connections',
							desc: 'Protect data, payments, and private routes when wiring the UI to backend services.',
						},
					].map((item, idx) => (
						<div key={idx} className='border border-base-content/10 bg-base-100 p-5 rounded-xl'>
							<h3 className='font-bold text-base mb-2 text-violet-600'>{item.title}</h3>
							<p className='text-xs text-base-content/75 leading-relaxed'>{item.desc}</p>
						</div>
					))}
				</div>
			</section>

			<section className='relative z-10 py-12 max-w-6xl mx-auto' aria-labelledby='v0-related-guides'>
				<div className='text-center max-w-3xl mx-auto mb-10'>
					<p className='text-sm font-semibold uppercase tracking-wide text-primary'>Related guides</p>
					<h2 id='v0-related-guides' className='text-3xl md:text-4xl font-bold mb-4'>
						Explore more production help
					</h2>
					<p className='text-base text-base-content/75'>
						This page focuses on V0-specific frontend-to-production problems. For the full AI-builder overview, start with
						the main hub.
					</p>
				</div>
				<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
					{RELATED_GUIDES.map((guide) => (
						<a
							key={guide.slug}
							href={getHrefForLocale(`/${guide.slug}`, langName)}
							className={`group rounded-lg border p-5 transition hover:bg-base-200 ${
								guide.slug === 'ai-prototype-to-production'
									? 'border-primary bg-primary/5 hover:border-primary'
									: 'border-base-content/10 hover:border-violet-500'
							}`}
						>
							<h3 className='mb-2 text-lg font-semibold group-hover:text-primary'>{guide.title}</h3>
							<p className='line-clamp-2 text-sm text-base-content/70'>{guide.description}</p>
						</a>
					))}
				</div>
			</section>

			<section className='relative z-10 py-12 max-w-4xl mx-auto'>
				<div className='text-center mb-10'>
					<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
						<MdHelpCenter className='text-primary' /> FAQ
					</div>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent'>
						Frequently Asked Questions
					</h2>
				</div>

				<div className='space-y-4'>
					{faqItems.map((item, idx) => (
						<div key={idx} className='border border-base-content/10 rounded-xl overflow-hidden bg-base-100'>
							<button
								type='button'
								onClick={() => toggleFaq(idx)}
								className='w-full flex items-center justify-between p-5 text-left font-bold text-sm md:text-base text-base-content hover:bg-base-200/40 transition-colors'
							>
								<span>{item.question}</span>
								<FaChevronDown
									className={`transition-transform duration-200 text-xs text-base-content/40 flex-shrink-0 ml-4 ${
										activeFaq === idx ? 'transform rotate-180 text-violet-600' : ''
									}`}
								/>
							</button>
							{activeFaq === idx && (
								<motion.div
									initial={{ height: 0, opacity: 0 }}
									animate={{ height: 'auto', opacity: 1 }}
									transition={{ duration: 0.2 }}
									className='border-t border-base-content/5 px-5 py-4 text-xs md:text-sm text-base-content/85 leading-relaxed bg-base-200/10'
								>
									{item.answer}
								</motion.div>
							)}
						</div>
					))}
				</div>
			</section>

			<section className='relative z-10 py-16 bg-gradient-to-b from-transparent to-base-200 rounded-3xl border border-base-content/5 p-8 text-center max-w-5xl mx-auto overflow-hidden'>
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.06),transparent)] pointer-events-none' />
				<div className='relative z-10 max-w-3xl mx-auto'>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						Ready to turn your V0 UI into a real production app?
					</h2>
					<p className='text-lg text-base-content/80 mb-8 leading-relaxed'>
						Send your V0 output, repo, or demo link. VibeToLive will review what is missing, connect the backend, clean up
						the integration, and help you launch safely.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-6'>
						<a
							href='mailto:hello@vibetolive.dev?subject=Launch%20My%20V0%20App'
							className='btn btn-wide btn-primary rounded-full hover:scale-105 transition-all font-bold shadow-lg'
						>
							Launch My V0 App
						</a>
						<a
							href='mailto:hello@vibetolive.dev?subject=Request%20V0%20App%20Review'
							className='btn btn-wide btn-outline rounded-full font-semibold hover:bg-base-content hover:text-base-100'
						>
							Request a V0 App Review
						</a>
					</div>
					<p className='text-xs text-base-content/50'>
						Generated a polished UI in V0 but need auth, database, payments, backend, or deployment? We can help make it
						production-ready.
					</p>
				</div>
			</section>
		</div>
	);
}
