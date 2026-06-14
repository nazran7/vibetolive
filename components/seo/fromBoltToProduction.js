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
	FaBox,
} from 'react-icons/fa';
import {
	MdWarning,
	MdCancel,
	MdCheckCircle,
	MdHelpCenter,
	MdOutlineFeaturedPlayList,
	MdBuild,
} from 'react-icons/md';
import { getHrefForLocale, TALLY_FORM_URL } from '@/lib/seo/site';
import SeoPricing from '@/components/seo/pricing';

const BOLT_STACK = [
	{ name: 'Bolt.new', style: 'border-blue-500/30 text-blue-500 bg-blue-500/10 font-bold' },
	{ name: 'Vercel', style: 'border-base-content/20 text-base-content bg-base-content/5' },
	{ name: 'Railway', style: 'border-violet-500/20 text-violet-500 bg-violet-500/5' },
	{ name: 'Render', style: 'border-amber-500/20 text-amber-500 bg-amber-500/5' },
	{ name: 'Supabase', style: 'border-emerald-500/20 text-emerald-500 bg-emerald-500/5' },
	{ name: 'Stripe', style: 'border-indigo-500/20 text-indigo-500 bg-indigo-500/5' },
	{ name: 'Node.js', style: 'border-green-500/20 text-green-500 bg-green-500/5' },
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
		slug: 'from-v0-to-production',
		title: 'From V0 to Production',
		description: 'V0-generated app production help for UI-first prototypes.',
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

export default function FromBoltToProductionPage({ langName = 'en' }) {
	const [activeFaq, setActiveFaq] = useState(null);

	const toggleFaq = (index) => {
		setActiveFaq(activeFaq === index ? null : index);
	};

	const faqItems = [
		{
			question: 'Can a Bolt.new app be used in production?',
			answer:
				'Yes. A Bolt.new app can be used in production if the exported code, dependencies, backend logic, authentication, environment variables, deployment setup, and monitoring are reviewed before launch. The risk is not using Bolt; the risk is assuming a preview demo is automatically production-ready.',
		},
		{
			question: 'Do I need to rebuild my Bolt app from scratch?',
			answer:
				'Usually, no. Many Bolt apps have useful UI, working flows, and a valid product direction. VibeToLive reviews the existing app, keeps what works, fixes build and production blockers, and only recommends a rebuild if the current codebase is too unstable or unsafe.',
		},
		{
			question: 'Why does my Bolt app work in preview but fail after export?',
			answer:
				'Bolt runs in a browser-based development environment, which can behave differently from a local machine or production hosting platform. After export, issues can appear with dependencies, scripts, build commands, environment variables, runtime assumptions, or server-side configuration.',
		},
		{
			question: 'Can you fix Bolt app build errors?',
			answer:
				'Yes. VibeToLive can review package setup, dependency conflicts, TypeScript errors, build scripts, framework configuration, runtime settings, and deployment logs. The goal is to make the app build reliably outside Bolt and deploy correctly in production.',
		},
		{
			question: 'Can you deploy my Bolt app to Vercel?',
			answer:
				'Yes. VibeToLive can help deploy a Bolt-generated app to Vercel if Vercel is the right fit for the stack. We can also help with Railway, Render, AWS, DigitalOcean, or another hosting platform depending on the app’s backend, database, and runtime requirements.',
		},
		{
			question: 'Can you help with backend and database setup?',
			answer:
				'Yes. VibeToLive can review API routes, database connections, Supabase/Firebase/Postgres permissions, server-side validation, user ownership rules, and admin access. A production app should protect data at the backend and database level, not only in the UI.',
		},
		{
			question: 'Can you help with Stripe in a Bolt app?',
			answer:
				'Yes. VibeToLive can review Stripe checkout, live and test keys, webhook signature verification, subscription state, paid-user access, cancellation handling, and failed payment behavior. Payment flows should be validated before real customers use the app.',
		},
		{
			question: 'What should I send for a Bolt app review?',
			answer:
				'You can send your Bolt.new project link, exported code, GitHub repo, demo link, deployment logs, known errors, database setup, payment context, and launch goal. If you are non-technical, start with the app link and a short explanation of what is not working.',
		},
		{
			question: 'How long does it take to make a Bolt app production-ready?',
			answer:
				'The timeline depends on the condition of the exported app. A simple Bolt app may need export cleanup, deployment setup, and basic security review. A Bolt app with authentication, payments, admin features, private data, or backend complexity usually needs a deeper production-hardening scope.',
		},
		{
			question: 'Is /deploy-bolt-to-vercel the same as this page?',
			answer:
				'No. /from-bolt-to-production is the commercial service page for founders who need help launching a Bolt app. A deploy-bolt-to-vercel tutorial belongs under /blog/ for people searching how to deploy — this page is for production engineering help.',
		},
	];

	const productionNeeds = [
		'Export and local setup review',
		'Package and dependency cleanup',
		'Build error fixes outside Bolt’s browser environment',
		'Backend and API route hardening',
		'Authentication and protected-route review',
		'Safe environment variable setup',
		'Database connection and permission review',
		'Stripe or payment webhook validation',
		'Deployment to Vercel, Railway, Render, AWS, or similar hosting',
		'Monitoring, logging, and production QA',
		'A clear handoff for future updates',
	];

	const productionQuestions = [
		'Does the app build outside Bolt.new?',
		'Do all packages work outside the browser-based environment?',
		'Are server-side routes configured correctly?',
		'Are private environment variables protected?',
		'Does authentication work securely in production?',
		'Is the database connection production-safe?',
		'Are payments and webhooks validated?',
		'Can the app deploy reliably to Vercel, Railway, Render, AWS, or another platform?',
		'Are production errors logged?',
		'Can the founder or team maintain the app after launch?',
	];

	const boltProblems = [
		{
			title: 'The App Works in Bolt But Fails After Export',
			desc: 'A Bolt app may work in the browser preview but fail when exported to a local machine, GitHub repo, or production hosting platform.',
			bullets: [
				'Missing files or incomplete package setup',
				'Dependency version conflicts',
				'Incorrect scripts or build command mismatch',
				'Runtime differences between Bolt preview and production',
				'Local environment variables not configured',
			],
		},
		{
			title: 'Package and Dependency Issues',
			desc: 'Bolt can install packages quickly, but production needs dependency stability across export and hosting.',
			bullets: [
				'package.json scripts correctness',
				'Dependencies vs devDependencies separation',
				'Package version compatibility',
				'TypeScript, ESLint, or runtime errors after export',
				'Preview-only fragile setup',
			],
		},
		{
			title: 'Backend Logic Is Incomplete',
			desc: 'Production backend logic often needs review beyond what the Bolt preview demonstrates.',
			bullets: [
				'API routes without authorization checks',
				'Missing request validation',
				'Database writes without ownership checks',
				'Admin logic handled only in the UI',
				'No clear client vs server separation',
			],
		},
		{
			title: 'Environment Variables Are Not Production-Ready',
			desc: 'Demo apps may use placeholder keys. Production needs clean separation between public and private variables.',
			bullets: [
				'Private server-side secrets',
				'Database URLs and Stripe secret keys',
				'Webhook and API provider keys',
				'Production vs development values',
				'Keys never in browser code or public repos',
			],
		},
		{
			title: 'Authentication Looks Finished But Needs Hardening',
			desc: 'Login screens and dashboards must be protected server-side, not only hidden in the UI.',
			bullets: [
				'Protected routes and session handling',
				'Server-side authorization checks',
				'Role-based access control',
				'Admin access protection',
				'Direct URL access testing',
			],
		},
		{
			title: 'Database Access Needs Review',
			desc: 'Connections to Supabase, Firebase, Postgres, or MongoDB may work in demo but need stricter data control in production.',
			bullets: [
				'User ownership rules',
				'Table or collection permissions',
				'Admin-only operations',
				'Insert, update, delete, and read permissions',
				'Storage bucket permissions',
			],
		},
		{
			title: 'Stripe Checkout Is Not the Same as Production Payments',
			desc: 'A payment button is only the beginning — webhooks, subscription state, and paid-user access must be validated.',
			bullets: [
				'Stripe test vs live key separation',
				'Webhook signature verification',
				'Subscription state syncing',
				'Canceled and failed payment handling',
				'Paid-user access control',
			],
		},
		{
			title: 'Deployment Settings Are Fragile',
			desc: 'Bolt apps often need deployment cleanup before they work on Vercel, Railway, Render, AWS, or DigitalOcean.',
			bullets: [
				'Build command and output directory',
				'Runtime and framework detection',
				'Domain setup and redirect URLs',
				'Serverless compatibility',
				'Rollback plan and log visibility',
			],
		},
	];

	const processSteps = [
		{
			step: '01',
			title: 'Bolt App Review',
			desc: 'We review your Bolt.new app, exported code, repo, framework, package setup, backend logic, database connection, auth flow, deployment target, and known blockers.',
		},
		{
			step: '02',
			title: 'Export and Build Cleanup',
			desc: 'We check whether the app runs outside Bolt, whether dependencies install correctly, whether scripts work, and whether the app can build in a normal production workflow.',
		},
		{
			step: '03',
			title: 'Backend and Auth Review',
			desc: 'We review backend logic, API routes, authentication, protected routes, user permissions, and admin access so the app does not rely on demo-state UI logic.',
		},
		{
			step: '04',
			title: 'Environment and Database Setup',
			desc: 'We clean up environment variables and review database connections, permissions, and production vs test value separation.',
		},
		{
			step: '05',
			title: 'Payment and Integration Review',
			desc: 'If the app uses Stripe, email, AI APIs, or webhooks, we review live keys, webhook verification, server-side access, and failure handling.',
		},
		{
			step: '06',
			title: 'Production Deployment',
			desc: 'We configure Vercel, Railway, Render, AWS, DigitalOcean, or another platform with build settings, domains, redirects, env vars, and logs.',
		},
		{
			step: '07',
			title: 'Monitoring, QA, and Handoff',
			desc: 'We add basic monitoring, test signup/login/payments/admin flows, and hand off what was fixed, configured, and what to watch after launch.',
		},
	];

	const checklistCategories = [
		{
			category: 'Export and Build',
			icon: 'build',
			items: [
				'Does the app run outside Bolt.new?',
				'Does npm install or your package manager work?',
				'Are scripts correct in package.json?',
				'Does the app build without TypeScript or runtime errors?',
				'Are dependency versions stable?',
				'Are preview-only assumptions removed?',
			],
		},
		{
			category: 'Backend',
			icon: 'code',
			items: [
				'Are API routes protected?',
				'Is request validation in place?',
				'Are server actions safe?',
				'Does backend logic verify user access?',
				'Is sensitive logic kept server-side?',
			],
		},
		{
			category: 'Authentication',
			icon: 'lock',
			items: [
				'Are private pages protected?',
				'Are admin routes secured?',
				'Are sessions handled correctly?',
				'Are user roles enforced server-side?',
				'Can direct URL access bypass restrictions?',
			],
		},
		{
			category: 'Database',
			icon: 'database',
			items: [
				'Are user ownership rules enforced?',
				'Are read and write permissions safe?',
				'Are admin-only records protected?',
				'Are production database credentials configured correctly?',
				'Are migrations or schema changes documented?',
			],
		},
		{
			category: 'Environment Variables',
			icon: 'key',
			items: [
				'Are private keys kept server-side?',
				'Are public keys safe to expose?',
				'Are production and development values separated?',
				'Are Stripe, auth, email, and API keys configured correctly?',
				'Are secrets stored in the hosting platform, not hardcoded?',
			],
		},
		{
			category: 'Payments',
			icon: 'payment',
			items: [
				'Are Stripe live keys configured?',
				'Are webhooks verified?',
				'Is the subscription state synced?',
				'Is paid-user access enforced?',
				'Are failed payments and cancellations handled?',
			],
		},
		{
			category: 'Deployment',
			icon: 'server',
			items: [
				'Is the build command correct?',
				'Is the output directory correct?',
				'Are runtime settings configured?',
				'Is the production domain connected?',
				'Is there a rollback path?',
			],
		},
		{
			category: 'Monitoring',
			icon: 'chart',
			items: [
				'Are production errors tracked?',
				'Are failed API calls visible?',
				'Are payment issues visible?',
				'Does the founder know where to check logs?',
			],
		},
	];

	const checklistIcon = (type) => {
		switch (type) {
			case 'build':
				return <MdBuild className='text-primary' />;
			case 'code':
				return <FaCode className='text-primary' />;
			case 'lock':
				return <FaLock className='text-primary' />;
			case 'database':
				return <FaDatabase className='text-primary' />;
			case 'key':
				return <FaKey className='text-primary' />;
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
						<pattern id='bolt-grid' width='24' height='24' patternUnits='userSpaceOnUse'>
							<path d='M 24 0 L 0 0 0 24' fill='none' stroke='currentColor' strokeWidth='0.5' className='text-base-content/20' />
						</pattern>
					</defs>
					<rect width='100%' height='100%' fill='url(#bolt-grid)' />
				</svg>
				<div className='absolute inset-0 bg-gradient-to-b from-transparent to-base-100' />
			</div>

			{/* Hero */}
			<section className='relative z-10 py-12 lg:py-20 flex flex-col items-center'>
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className='text-center max-w-4xl'
				>
					<h1 className='font-bold text-4xl md:text-6xl lg:text-7xl bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] text-center bg-clip-text text-transparent !leading-[1.2em] mb-6 tracking-tight'>
						From Bolt to Production
					</h1>

					<h2 className='text-2xl md:text-3xl text-primary font-bold mb-6'>
						Can you launch a Bolt.new app in production?
					</h2>

					<p className='text-lg md:text-xl text-base-content/80 mb-6 max-w-3xl mx-auto leading-relaxed'>
						Yes. A Bolt.new app can become a production-ready product, but it usually needs engineering review after the
						demo stage. Bolt is excellent for quickly creating working prototypes in a browser-based development
						environment, but production launch often requires export cleanup, dependency fixes, backend hardening,
						environment variable setup, deployment configuration, authentication review, payment validation, monitoring,
						and QA.
					</p>

					<p className='text-base md:text-lg text-base-content/70 mb-10 max-w-2xl mx-auto'>
						VibeToLive helps founders move Bolt.new apps from fast demo to real production without starting over.
					</p>

					<div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-16'>
						<a
							href={TALLY_FORM_URL} target='_blank' rel='noopener noreferrer'
							className='btn btn-wide btn-primary rounded-full hover:scale-105 transition-all text-primary-content font-bold shadow-lg shadow-primary/20'
						>
							Launch My Bolt App
						</a>
						<a
							href={TALLY_FORM_URL} target='_blank' rel='noopener noreferrer'
							className='btn btn-wide btn-outline rounded-full hover:bg-base-content hover:text-base-100 transition-all font-semibold'
						>
							Request a Bolt App Review
						</a>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className='w-full max-w-4xl bg-base-200 border border-base-content/10 p-6 md:p-8 rounded-2xl shadow-sm relative overflow-hidden'
				>
					<div className='absolute right-0 top-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl' />
					<h3 className='text-xl md:text-2xl font-bold mb-6 flex items-center gap-2'>
						<span className='p-2 bg-blue-500/10 text-blue-500 rounded-lg'>
							<FaRocket />
						</span>
						A production-ready Bolt app usually needs:
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
						VibeToLive is built for founders who created a working app in Bolt.new and now need the app to run safely in
						a real production environment.
					</p>
				</motion.div>

				<div className='mt-16 w-full max-w-5xl'>
					<p className='text-center text-xs md:text-sm font-semibold uppercase tracking-wider text-base-content/40 mb-6'>
						Common Bolt.new production stack
					</p>
					<div className='flex flex-wrap gap-3 justify-center'>
						{BOLT_STACK.map((tech, idx) => (
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

			{/* Bolt preview vs production */}
			<section className='relative z-10 py-10 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-10'>
					<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
						<FaExclamationTriangle className='text-amber-500' /> Bolt Reality Check
					</div>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						Bolt.new Is Fast. Production Is a Different Environment.
					</h2>
					<p className='text-lg text-base-content/75 leading-relaxed mb-4'>
						Bolt.new helps founders and builders move quickly — describe an app, generate the frontend, add routes, install
						packages, and preview a working product directly in the browser. That speed removes a lot of early setup work.
					</p>
					<p className='text-lg text-base-content/75 leading-relaxed'>
						But a Bolt.new preview is not the same as a production deployment. The most common Bolt production problems
						are usually environment problems, dependency problems, backend gaps, authentication risks, and deployment
						issues — not design problems. VibeToLive helps you keep the product momentum you created in Bolt while making
						the app stable enough for real users.
					</p>
				</div>
			</section>

			<div className='border-t border-base-content/10 my-10 max-w-6xl mx-auto' />

			{/* Definition */}
			<section className='relative z-10 py-10 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-12'>
					<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
						<FaShieldAlt className='text-primary' /> Core Definition
					</div>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						What “From Bolt to Production” Means
					</h2>
					<p className='text-lg text-base-content/75 leading-relaxed'>
						Moving from Bolt to production means taking the app you generated in Bolt.new and preparing it to run outside
						the Bolt preview environment — export, repo setup, package fixes, env vars, backend review, hosting, and
						monitoring.
					</p>
				</div>

				<div className='bg-base-200/40 border border-base-content/10 p-6 md:p-8 rounded-2xl max-w-4xl mx-auto'>
					<h3 className='text-lg font-bold mb-4'>A production Bolt app should answer these questions:</h3>
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
						If those answers are unclear, the app is still a prototype.
					</p>
				</div>
			</section>

			<div className='border-t border-base-content/10 my-10 max-w-6xl mx-auto' />

			{/* Common problems */}
			<section className='relative z-10 py-10 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-12'>
					<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
						<MdWarning className='text-red-500' /> Bolt-Specific Risks
					</div>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						Common Bolt.new Production Problems
					</h2>
					<p className='text-lg text-base-content/75'>
						Bolt.new is powerful for building quickly, but the production step often reveals issues hidden during preview.
					</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{boltProblems.map((problem, idx) => (
						<motion.div
							key={idx}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: idx * 0.04 }}
							viewport={{ once: true }}
							className='bg-base-100 border border-base-content/10 p-6 rounded-xl hover:border-blue-500/40 transition-all'
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

			{/* How we help */}
			<section className='relative z-10 py-10 max-w-6xl mx-auto'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
					<div>
						<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
							<MdCheckCircle className='text-emerald-500' /> How We Help
						</div>
						<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
							How VibeToLive Helps With Bolt.new Apps
						</h2>
						<p className='text-lg text-base-content/75 mb-6 leading-relaxed'>
							We do not assume the app needs to be rebuilt. First, we review what Bolt generated, identify what is usable,
							and fix the blockers that prevent safe production launch.
						</p>
						<p className='text-base-content/70'>
							The goal is to move your app from “it works in Bolt” to “it runs safely for real users.”
						</p>
					</div>

					<div className='grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2'>
						{[
							'Bolt.new app review',
							'Export and repo setup',
							'Local run and build fixes',
							'Package and dependency cleanup',
							'Framework configuration',
							'Backend and API route hardening',
							'Authentication review',
							'Database permission review',
							'Environment variable cleanup',
							'Stripe and webhook validation',
							'Production deployment setup',
							'Vercel, Railway, Render, AWS configuration',
							'Monitoring and error tracking',
							'Launch QA',
							'Founder handoff notes',
						].map((tag, idx) => (
							<div key={idx} className='flex items-center gap-2'>
								<span className='text-blue-500'>
									<FaCheck size={12} />
								</span>
								<span className='text-sm text-base-content/85'>{tag}</span>
							</div>
						))}
					</div>
				</div>
			</section>

			<div className='border-t border-base-content/10 my-10 max-w-6xl mx-auto' />

			{/* Process — 7 steps */}
			<section className='relative z-10 py-10 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-12'>
					<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
						<FaCogs className='text-primary' /> Delivery Path
					</div>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						Our Bolt to Production Process
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
							className='bg-base-100 border border-base-content/10 p-6 rounded-2xl relative overflow-hidden group hover:border-blue-500 transition-all'
						>
							<div className='absolute right-4 top-4 text-5xl font-extrabold text-base-content/5 group-hover:text-blue-500/10 transition-colors'>
								{item.step}
							</div>
							<h3 className='text-lg font-bold mb-3 text-base-content pr-10'>{item.title}</h3>
							<p className='text-sm text-base-content/70 leading-relaxed'>{item.desc}</p>
						</motion.div>
					))}
				</div>
			</section>

			<div className='border-t border-base-content/10 my-10 max-w-6xl mx-auto' />

			{/* Checklist */}
			<section className='relative z-10 py-10 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-12'>
					<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
						<MdOutlineFeaturedPlayList className='text-primary' /> Pre-Launch Checklist
					</div>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						Bolt.new Production Checklist
					</h2>
					<p className='text-lg text-base-content/75'>
						Before launching a Bolt.new app, review these areas. If several are missing, the Bolt app is still in demo mode.
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
										<span className='text-blue-500 mt-0.5'>
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

			{/* What you get */}
			<section className='relative z-10 py-10 bg-base-200/30 p-6 md:p-10 rounded-3xl border border-base-content/5 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-10'>
					<h2 className='text-2xl md:text-4xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-4'>
						What You Get
					</h2>
					<p className='text-lg text-base-content/75'>
						Depending on the condition of your Bolt app, your production handoff may include:
					</p>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto text-sm text-base-content/95'>
					{[
						'Bolt.new app production review',
						'Export and repo cleanup',
						'Dependency and package fixes',
						'Build error fixes',
						'Backend route hardening',
						'Authentication and protected-route fixes',
						'Database permission review',
						'Environment variable cleanup',
						'Stripe checkout and webhook review',
						'Production deployment setup',
						'Domain and redirect configuration',
						'Monitoring and error tracking setup',
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
				<p className='mt-6 text-center text-sm text-base-content/60 max-w-2xl mx-auto'>
					Designed for founders who built quickly in Bolt and now need the app to survive outside the preview environment.
				</p>
			</section>

			<SeoPricing />

			{/* Audience */}
			<section className='relative z-10 py-10 max-w-6xl mx-auto'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<div className='border border-base-content/10 bg-base-100 p-6 md:p-8 rounded-2xl'>
						<h3 className='text-xl font-bold text-emerald-500 mb-6 flex items-center gap-2'>
							<MdCheckCircle className='text-2xl' /> Who This Service Is For
						</h3>
						<ul className='space-y-3 text-sm text-base-content/85'>
							{[
								'Founders who built an app in Bolt.new',
								'Non-technical founders preparing to launch',
								'Startup teams using Bolt for an MVP',
								'Builders whose app works in Bolt but fails after export',
								'Apps with package, dependency, or build errors',
								'Apps that need backend or authentication review',
								'Apps preparing to add payments or real users',
								'Founders who want to avoid a full rebuild',
								'Teams that need help moving beyond demo mode',
							].map((item, idx) => (
								<li key={idx} className='flex items-start gap-2'>
									<span className='text-emerald-500 mt-1'>•</span>
									<span>{item}</span>
								</li>
							))}
						</ul>
						<p className='mt-4 text-xs text-base-content/60'>
							Not only for visual UI fixes — for Bolt apps that need production engineering before real users rely on them.
						</p>
					</div>

					<div className='border border-base-content/10 bg-base-100 p-6 md:p-8 rounded-2xl'>
						<h3 className='text-xl font-bold text-amber-500 mb-6 flex items-center gap-2'>
							<FaBox className='text-xl' /> When Your Bolt App Is Not Ready
						</h3>
						<ul className='space-y-3 text-sm text-base-content/85'>
							{[
								'It works in Bolt but fails locally',
								'It works locally but fails on Vercel, Railway, Render, or AWS',
								'Package installation fails after export',
								'The build command is unclear',
								'Environment variables are confusing',
								'Private keys may be exposed',
								'Authentication works visually but not securely',
								'Admin pages are hidden but not protected',
								'Stripe checkout works, but webhooks are missing',
								'Database access rules are unclear',
								'There is no monitoring after launch',
								'You are afraid to invite real users because the app feels fragile',
							].map((item, idx) => (
								<li key={idx} className='flex items-start gap-2'>
									<span className='text-amber-500 mt-1'>•</span>
									<span>{item}</span>
								</li>
							))}
						</ul>
						<p className='mt-4 text-xs text-base-content/60'>
							Normal issues for Bolt-generated apps — and fixable before launch.
						</p>
					</div>
				</div>
			</section>

			{/* Why VibeToLive */}
			<section className='relative z-10 py-10 bg-base-200/40 p-6 md:p-10 rounded-3xl border border-base-content/5 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-8'>
					<h2 className='text-2xl md:text-4xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-4'>
						Why Use VibeToLive for a Bolt App?
					</h2>
					<p className='text-lg text-base-content/75'>
						Bolt gives you speed. VibeToLive gives you production readiness — without forcing a rebuild.
					</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-sm'>
					{[
						{
							title: 'Avoid Launching Too Early',
							desc: 'Prevent launching with fragile auth, exposed secrets, or unsafe backend logic.',
						},
						{
							title: 'Avoid Rebuilding Too Soon',
							desc: 'Keep the speed advantage Bolt gave you instead of throwing away validated product work.',
						},
						{
							title: 'Avoid Demo-Mode Limbo',
							desc: 'Stop staying stuck because production deployment and build cleanup feel too technical.',
						},
					].map((item, idx) => (
						<div key={idx} className='border border-base-content/10 bg-base-100 p-5 rounded-xl'>
							<h3 className='font-bold text-base mb-2 text-blue-500'>{item.title}</h3>
							<p className='text-xs text-base-content/75 leading-relaxed'>{item.desc}</p>
						</div>
					))}
				</div>
			</section>

			{/* Related guides */}
			<section className='relative z-10 py-12 max-w-6xl mx-auto' aria-labelledby='bolt-related-guides'>
				<div className='text-center max-w-3xl mx-auto mb-10'>
					<p className='text-sm font-semibold uppercase tracking-wide text-primary'>Related guides</p>
					<h2 id='bolt-related-guides' className='text-3xl md:text-4xl font-bold mb-4'>
						Explore more production help
					</h2>
					<p className='text-base text-base-content/75'>
						This page focuses on Bolt.new-specific production problems. For the full AI-builder overview, start with the
						main hub.
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
									: 'border-base-content/10 hover:border-blue-500'
							}`}
						>
							<h3 className='mb-2 text-lg font-semibold group-hover:text-primary'>{guide.title}</h3>
							<p className='line-clamp-2 text-sm text-base-content/70'>{guide.description}</p>
						</a>
					))}
				</div>
			</section>

			{/* FAQ */}
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
										activeFaq === idx ? 'transform rotate-180 text-blue-500' : ''
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

			{/* Final CTA */}
			<section className='relative z-10 py-16 bg-gradient-to-b from-transparent to-base-200 rounded-3xl border border-base-content/5 p-8 text-center max-w-5xl mx-auto overflow-hidden'>
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06),transparent)] pointer-events-none' />
				<div className='relative z-10 max-w-3xl mx-auto'>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						Ready to move your Bolt.new app from demo to production?
					</h2>
					<p className='text-lg text-base-content/80 mb-8 leading-relaxed'>
						Send your Bolt app, repo, or exported code. VibeToLive will review the build, fix the risky parts, configure
						production deployment, and help you launch safely without starting over.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-6'>
						<a
							href={TALLY_FORM_URL} target='_blank' rel='noopener noreferrer'
							className='btn btn-wide btn-primary rounded-full hover:scale-105 transition-all font-bold shadow-lg'
						>
							Launch My Bolt App
						</a>
						<a
							href={TALLY_FORM_URL} target='_blank' rel='noopener noreferrer'
							className='btn btn-wide btn-outline rounded-full font-semibold hover:bg-base-content hover:text-base-100'
						>
							Request a Bolt App Review
						</a>
					</div>
					<p className='text-xs text-base-content/50'>
						Built in Bolt.new and stuck after export, build, backend, or deployment issues? We can help you make it
						production-ready.
					</p>
				</div>
			</section>
		</div>
	);
}
