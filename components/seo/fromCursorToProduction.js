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
	FaProjectDiagram,
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

const CURSOR_STACK = [
	{ name: 'Cursor', style: 'border-emerald-500/30 text-emerald-500 bg-emerald-500/10 font-bold' },
	{ name: 'Next.js', style: 'border-base-content/20 text-base-content bg-base-content/5' },
	{ name: 'TypeScript', style: 'border-blue-500/20 text-blue-500 bg-blue-500/5' },
	{ name: 'Prisma', style: 'border-violet-500/20 text-violet-500 bg-violet-500/5' },
	{ name: 'Supabase', style: 'border-teal-500/20 text-teal-500 bg-teal-500/5' },
	{ name: 'GitHub Actions', style: 'border-indigo-500/20 text-indigo-500 bg-indigo-500/5' },
	{ name: 'Vercel', style: 'border-base-content/20 text-base-content bg-base-content/5' },
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
		slug: 'from-v0-to-production',
		title: 'From V0 to Production',
		description: 'V0-generated app production help for UI-to-backend integration.',
	},
	{
		slug: 'from-replit-to-production',
		title: 'From Replit to Production',
		description: 'Replit-specific production help for deployment, secrets, and database migration.',
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

export default function FromCursorToProductionPage({ langName = 'en' }) {
	const [activeFaq, setActiveFaq] = useState(null);

	const toggleFaq = (index) => {
		setActiveFaq(activeFaq === index ? null : index);
	};

	const faqItems = [
		{
			question: 'Can a Cursor-built app be used in production?',
			answer:
				'Yes. A Cursor-built app can be used in production if the architecture, backend, authentication, database access, environment variables, payments, tests, deployment, and monitoring are reviewed before launch. Cursor accelerates development, but production still requires engineering review and hardening.',
		},
		{
			question: 'Is Cursor the same as Lovable, Bolt, V0, or Replit?',
			answer:
				'No. Cursor is an AI-assisted code editor, not mainly a visual app builder or hosting platform. Production work focuses on reviewing the codebase, architecture, backend logic, tests, CI/CD, deployment setup, and maintainability.',
		},
		{
			question: 'Do I need to rebuild my Cursor-built app from scratch?',
			answer:
				'Usually, no. Many Cursor-built apps have useful product logic and working features. VibeToLive reviews the existing codebase, keeps what works, fixes production risks, and only recommends a rebuild if the architecture is too unstable or unsafe to maintain.',
		},
		{
			question: 'What are the most common Cursor production issues?',
			answer:
				'Common issues include architecture drift, duplicated logic, inconsistent auth checks, unsafe API routes, weak database ownership rules, missing validation, exposed secrets, incomplete Stripe webhook handling, missing tests, no CI/CD, and limited monitoring after launch.',
		},
		{
			question: 'Can you review my Cursor codebase?',
			answer:
				'Yes. VibeToLive can review a Cursor-built repo for architecture, backend security, auth, database access, environment variables, Stripe/payment logic, tests, deployment settings, and production readiness.',
		},
		{
			question: 'Can you add tests and CI/CD to a Cursor-built app?',
			answer:
				'Yes. VibeToLive can add or improve typecheck, lint, build checks, critical-flow tests, API tests, webhook tests, and CI/CD pipelines to catch production-breaking issues before deployment.',
		},
		{
			question: 'Can you help deploy a Cursor-built app?',
			answer:
				'Yes. VibeToLive can help deploy to Vercel, Railway, Render, AWS, DigitalOcean, Fly.io, or another platform. We configure environment variables, domains, build settings, runtime behavior, logs, and rollback planning.',
		},
		{
			question: 'Can you help with Stripe in a Cursor-built app?',
			answer:
				'Yes. VibeToLive can review Stripe checkout, live and test keys, webhook signature verification, subscription state syncing, paid-user access, cancellation handling, and failed payment behavior.',
		},
		{
			question: 'What should I send for a Cursor app review?',
			answer:
				'You can send your GitHub repo, demo link, current blocker list, stack details, deployment target, database setup, payment context, and launch goal. If unsure what is wrong, send the repo and explain what the app is supposed to do.',
		},
		{
			question: 'How long does it take to make a Cursor-built app production-ready?',
			answer:
				'A simple app may only need production review, deployment setup, and basic hardening. A larger app with payments, private data, admin roles, APIs, and limited test coverage usually needs a deeper production-hardening scope.',
		},
	];

	const productionNeeds = [
		'Architecture and codebase review',
		'Backend and API route hardening',
		'Authentication and authorization review',
		'Database permission and ownership checks',
		'Environment variable cleanup',
		'Test coverage for critical flows',
		'CI/CD pipeline setup',
		'Deployment configuration',
		'Stripe or payment webhook validation',
		'Monitoring and error tracking',
		'Performance and reliability review',
		'QA across real user journeys',
		'A clear handoff for future development',
	];

	const productionQuestions = [
		'Is the architecture understandable and maintainable?',
		'Are API routes and server actions protected?',
		'Are authentication and authorization enforced server-side?',
		'Can users access only the data they own?',
		'Are environment variables and secrets handled safely?',
		'Are database queries and mutations validated?',
		'Are payment webhooks verified?',
		'Are critical flows covered by tests?',
		'Does the app build reliably in CI?',
		'Can the app deploy safely with rollback options?',
		'Are production errors and logs visible?',
		'Can another developer maintain the codebase after launch?',
	];

	const cursorProblems = [
		{
			title: 'Architecture Drift',
			desc: 'Cursor can help you add features quickly, but the app may develop inconsistent patterns that make future updates risky.',
			bullets: [
				'Similar logic duplicated across routes',
				'Server and client responsibilities mixed',
				'Multiple auth-check patterns',
				'No clear boundary between product logic and UI',
			],
		},
		{
			title: 'AI-Accepted Code Needs Review',
			desc: 'Generated or AI-assisted code should not be accepted blindly before production launch.',
			bullets: [
				'Incomplete edge-case handling',
				'Insecure shortcuts and weak validation',
				'Client-side logic that belongs on the server',
				'Error handling gaps',
			],
		},
		{
			title: 'Backend and API Routes May Be Fragile',
			desc: 'API routes and server actions added quickly during feature development need production review.',
			bullets: [
				'Authentication and authorization checks',
				'Input validation and error handling',
				'Database ownership checks',
				'Sensitive logic placement',
			],
		},
		{
			title: 'Authentication May Be Inconsistent',
			desc: 'Login, dashboards, middleware, and API routes added at different times can create inconsistent security.',
			bullets: [
				'Protected routes and middleware behavior',
				'Server-side authorization',
				'Admin access protection',
				'Direct URL access testing',
			],
		},
		{
			title: 'Database Access Needs Ownership Rules',
			desc: 'Production data access must be strict — whether using Supabase, Postgres, Prisma, Drizzle, or Firebase.',
			bullets: [
				'User and organization/team scoping',
				'Insert/update/delete validation',
				'Public vs private data separation',
				'Migration safety and indexes',
			],
		},
		{
			title: 'Tests Are Often Missing',
			desc: 'AI-assisted development can create working features quickly, but critical flows need test protection.',
			bullets: [
				'Signup, login, and protected routes',
				'Payment webhook handling',
				'API route access checks',
				'Build and typecheck in CI',
			],
		},
		{
			title: 'CI/CD Is Often Added Too Late',
			desc: 'The app may run locally but still fail in a proper CI/CD pipeline.',
			bullets: [
				'Typecheck, lint, and test steps',
				'Build and environment validation',
				'Deployment preview and rollback path',
			],
		},
		{
			title: 'Environment Variables, Payments, and Monitoring',
			desc: 'Cursor-built apps can accumulate secrets, incomplete payment logic, and no production visibility.',
			bullets: [
				'Public vs private variable separation',
				'Stripe webhook verification',
				'Sentry, hosting logs, or observability setup',
			],
		},
	];

	const processSteps = [
		{
			step: '01',
			title: 'Codebase and Architecture Review',
			desc: 'We review the repo, framework, folder structure, routing, backend logic, database access, auth setup, env vars, and deployment target.',
		},
		{
			step: '02',
			title: 'Production Risk Mapping',
			desc: 'We identify issues that could block launch: exposed secrets, incomplete auth, unsafe database access, missing payment validation, fragile API routes, or missing monitoring.',
		},
		{
			step: '03',
			title: 'Architecture and Code Cleanup',
			desc: 'We consolidate duplicated logic, separate server/client responsibilities, standardize API patterns, and remove unused generated code.',
		},
		{
			step: '04',
			title: 'Backend, Auth, and Database Hardening',
			desc: 'We improve API routes, server actions, middleware, protected pages, role checks, database ownership rules, and validation logic.',
		},
		{
			step: '05',
			title: 'Tests and CI/CD',
			desc: 'We add or improve typecheck, lint, build checks, critical-flow tests, API tests, webhook tests, and CI/CD pipeline setup.',
		},
		{
			step: '06',
			title: 'Deployment and Environment Setup',
			desc: 'We configure Vercel, Railway, Render, AWS, DigitalOcean, or Fly.io with env vars, domains, build settings, logs, and rollback options.',
		},
		{
			step: '07',
			title: 'Monitoring, QA, and Handoff',
			desc: 'We test signup, login, dashboards, payments, admin access, API errors, and production build behavior — then hand off what was fixed.',
		},
	];

	const checklistCategories = [
		{
			category: 'Architecture',
			icon: 'architecture',
			items: [
				'Is the folder structure clear?',
				'Are server and client responsibilities separated?',
				'Is business logic duplicated?',
				'Are API patterns consistent?',
				'Can another developer understand the codebase?',
			],
		},
		{
			category: 'Backend',
			icon: 'code',
			items: [
				'Are API routes protected?',
				'Are server actions safe?',
				'Is input validation in place?',
				'Are admin actions secured?',
				'Is sensitive logic kept server-side?',
			],
		},
		{
			category: 'Authentication',
			icon: 'lock',
			items: [
				'Are private routes protected?',
				'Is middleware configured correctly?',
				'Are sessions handled safely?',
				'Are roles enforced server-side?',
				'Can direct URL access bypass restrictions?',
			],
		},
		{
			category: 'Database',
			icon: 'database',
			items: [
				'Are user ownership rules enforced?',
				'Are organization/team scopes correct?',
				'Are insert, update, delete, and read permissions safe?',
				'Are constraints and indexes in place?',
				'Are migrations safe and documented?',
			],
		},
		{
			category: 'Environment Variables',
			icon: 'key',
			items: [
				'Are public and private variables separated?',
				'Are production and development values separated?',
				'Are Stripe, auth, database, and API secrets protected?',
				'Are variables configured in the hosting platform?',
			],
		},
		{
			category: 'Payments',
			icon: 'payment',
			items: [
				'Are Stripe live and test keys separated?',
				'Are webhooks verified?',
				'Is subscription state synced?',
				'Is paid-user access enforced server-side?',
				'Are cancellations and failed payments handled?',
			],
		},
		{
			category: 'Tests and CI/CD',
			icon: 'cogs',
			items: [
				'Does the app pass typecheck?',
				'Does the app build reliably?',
				'Are critical flows tested?',
				'Is CI/CD configured before production deploys?',
				'Is there a rollback path?',
			],
		},
		{
			category: 'Deployment',
			icon: 'server',
			items: [
				'Is the hosting platform selected correctly?',
				'Are domains and redirects configured?',
				'Are runtime settings correct?',
				'Are logs available?',
			],
		},
		{
			category: 'Monitoring',
			icon: 'chart',
			items: [
				'Are production errors tracked?',
				'Are failed API calls visible?',
				'Are payment issues visible?',
				'Does the founder know where to check issues after launch?',
			],
		},
	];

	const checklistIcon = (type) => {
		switch (type) {
			case 'architecture':
				return <FaProjectDiagram className='text-primary' />;
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
			case 'cogs':
				return <FaCogs className='text-primary' />;
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
						<pattern id='cursor-grid' width='24' height='24' patternUnits='userSpaceOnUse'>
							<path d='M 24 0 L 0 0 0 24' fill='none' stroke='currentColor' strokeWidth='0.5' className='text-base-content/20' />
						</pattern>
					</defs>
					<rect width='100%' height='100%' fill='url(#cursor-grid)' />
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
						From Cursor to Production
					</h1>

					<h2 className='text-2xl md:text-3xl text-primary font-bold mb-6'>
						Can a Cursor-built app be launched in production?
					</h2>

					<p className='text-lg md:text-xl text-base-content/80 mb-6 max-w-3xl mx-auto leading-relaxed'>
						Yes. A Cursor-built app can become a production-ready product, but it should be reviewed before real users,
						private data, payments, or production traffic are involved. Cursor helps developers move quickly with
						AI-assisted coding, but fast changes can create architecture drift, incomplete security checks, fragile API
						routes, and deployment risks.
					</p>

					<p className='text-base md:text-lg text-base-content/70 mb-10 max-w-2xl mx-auto'>
						VibeToLive helps founders and teams take Cursor-built codebases from fast AI-assisted development to secure,
						maintainable, production-ready software.
					</p>

					<div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-16'>
						<a
							href='mailto:hello@vibetolive.dev?subject=Launch%20My%20Cursor-Built%20App'
							className='btn btn-wide btn-primary rounded-full hover:scale-105 transition-all text-primary-content font-bold shadow-lg shadow-primary/20'
						>
							Launch My Cursor-Built App
						</a>
						<a
							href='mailto:hello@vibetolive.dev?subject=Request%20Cursor%20App%20Review'
							className='btn btn-wide btn-outline rounded-full hover:bg-base-content hover:text-base-100 transition-all font-semibold'
						>
							Request a Cursor App Review
						</a>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className='w-full max-w-4xl bg-base-200 border border-base-content/10 p-6 md:p-8 rounded-2xl shadow-sm relative overflow-hidden'
				>
					<div className='absolute right-0 top-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl' />
					<h3 className='text-xl md:text-2xl font-bold mb-6 flex items-center gap-2'>
						<span className='p-2 bg-emerald-500/10 text-emerald-500 rounded-lg'>
							<FaRocket />
						</span>
						A production-ready Cursor-built app usually needs:
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
						Cursor helps you write code faster. VibeToLive helps make sure that code is safe, stable, and maintainable in
						production.
					</p>
				</motion.div>

				<div className='mt-16 w-full max-w-5xl'>
					<p className='text-center text-xs md:text-sm font-semibold uppercase tracking-wider text-base-content/40 mb-6'>
						Common Cursor production stack
					</p>
					<div className='flex flex-wrap gap-3 justify-center'>
						{CURSOR_STACK.map((tech, idx) => (
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
						<FaExclamationTriangle className='text-amber-500' /> Cursor Reality Check
					</div>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						Cursor Helps You Build Fast. Production Needs Engineering Discipline.
					</h2>
					<p className='text-lg text-base-content/75 leading-relaxed mb-4'>
						Cursor is an AI-assisted code editor — not a visual app builder. It helps you write, refactor, and ship code
						faster across many files, routes, server actions, and integrations.
					</p>
					<p className='text-lg text-base-content/75 leading-relaxed'>
						Speed can create hidden problems: duplicated logic, weak auth checks, missing tests, and changes accepted from
						AI without full review. VibeToLive helps review the full codebase and turn fast AI-assisted development into
						production-grade software.
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
						What “From Cursor to Production” Means
					</h2>
					<p className='text-lg text-base-content/75 leading-relaxed'>
						Moving from Cursor to production means preparing a codebase built or accelerated with Cursor for real-world
						use — architecture review, security, tests, CI/CD, deployment, and monitoring.
					</p>
				</div>

				<div className='bg-base-200/40 border border-base-content/10 p-6 md:p-8 rounded-2xl max-w-4xl mx-auto'>
					<h3 className='text-lg font-bold mb-4'>A production Cursor-built app should answer these questions:</h3>
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
						If those answers are unclear, the app is not fully production-ready yet.
					</p>
				</div>
			</section>

			<div className='border-t border-base-content/10 my-10 max-w-6xl mx-auto' />

			<section className='relative z-10 py-10 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-12'>
					<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
						<MdWarning className='text-red-500' /> Cursor-Specific Risks
					</div>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						Common Cursor-Built App Production Problems
					</h2>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{cursorProblems.map((problem, idx) => (
						<motion.div
							key={idx}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: idx * 0.04 }}
							viewport={{ once: true }}
							className='bg-base-100 border border-base-content/10 p-6 rounded-xl hover:border-emerald-500/40 transition-all'
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
							How VibeToLive Helps With Cursor-Built Apps
						</h2>
						<p className='text-lg text-base-content/75 mb-6 leading-relaxed'>
							We inspect the current architecture, identify production risks, and create a practical launch path — keeping
							the speed of Cursor while adding engineering discipline.
						</p>
					</div>

					<div className='grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2'>
						{[
							'Cursor-built codebase review',
							'Architecture cleanup',
							'Backend and API route hardening',
							'Authentication and authorization review',
							'Database access review',
							'Supabase, Firebase, Postgres, Prisma checks',
							'Environment variable cleanup',
							'Stripe and webhook validation',
							'Test and CI/CD setup',
							'Deployment configuration',
							'Performance and reliability review',
							'Monitoring and error tracking',
							'QA across important user flows',
							'Founder or team handoff notes',
						].map((tag, idx) => (
							<div key={idx} className='flex items-center gap-2'>
								<span className='text-emerald-500'>
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
						Our Cursor to Production Process
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
							className='bg-base-100 border border-base-content/10 p-6 rounded-2xl relative overflow-hidden group hover:border-emerald-500 transition-all'
						>
							<div className='absolute right-4 top-4 text-5xl font-extrabold text-base-content/5 group-hover:text-emerald-500/10 transition-colors'>
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
						Cursor Production Checklist
					</h2>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{checklistCategories.map((check, idx) => (
						<div key={idx} className='border border-base-content/10 bg-base-100 p-5 rounded-xl'>
							<h3 className='font-bold text-base border-b border-base-content/10 pb-2 mb-4 flex items-center gap-2'>
								{checklistIcon(check.icon)}
								{check.category}
							</h3>
							<ul className='space-y-2 text-xs text-base-content/85'>
								{check.items.map((item, itemIdx) => (
									<li key={itemIdx} className='flex gap-2 items-start'>
										<span className='text-emerald-500 mt-0.5'>
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
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto text-sm text-base-content/95'>
					{[
						'Cursor codebase review',
						'Architecture risk report',
						'Backend and API route hardening',
						'Auth and protected-route fixes',
						'Database access review',
						'Environment variable cleanup',
						'Stripe checkout and webhook review',
						'Test and CI/CD setup',
						'Build and deployment fixes',
						'Hosting configuration',
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
								'Founders who built an app with Cursor',
								'Developers who used Cursor heavily and want production review',
								'Non-technical founders working with AI-assisted codebases',
								'Startup teams preparing a Cursor-built MVP for launch',
								'Apps with user accounts, payments, dashboards, APIs, or admin features',
								'Codebases that grew quickly and now feel hard to trust',
								'Teams that need CI/CD, tests, and deployment confidence',
								'Founders who want to avoid a full rebuild',
								'Builders who need an experienced engineer to review AI-assisted code',
							].map((item, idx) => (
								<li key={idx} className='flex items-start gap-2'>
									<span className='text-emerald-500 mt-1'>•</span>
									<span>{item}</span>
								</li>
							))}
						</ul>
						<p className='mt-4 text-xs text-base-content/60'>
							Not for a simple UI mockup — for Cursor-built codebases that need to become stable production systems.
						</p>
					</div>

					<div className='border border-base-content/10 bg-base-100 p-6 md:p-8 rounded-2xl'>
						<h3 className='text-xl font-bold text-amber-500 mb-6 flex items-center gap-2'>
							<FaExclamationTriangle className='text-xl' /> When Your Cursor App Is Not Ready
						</h3>
						<ul className='space-y-3 text-sm text-base-content/85'>
							{[
								'The app works locally but you do not trust it for real users',
								'The architecture feels messy after many AI-assisted changes',
								'Auth checks are inconsistent',
								'API routes were added quickly without validation',
								'Database ownership rules are unclear',
								'You are not sure whether secrets are exposed',
								'Stripe checkout works, but webhook handling is incomplete',
								'There are no tests for critical flows',
								'CI/CD is missing',
								'The app deploys, but errors are hard to debug',
								'You are afraid one change will break another part of the app',
							].map((item, idx) => (
								<li key={idx} className='flex items-start gap-2'>
									<span className='text-amber-500 mt-1'>•</span>
									<span>{item}</span>
								</li>
							))}
						</ul>
						<p className='mt-4 text-xs text-base-content/60'>
							Normal problems in fast AI-assisted development — fixable before launch.
						</p>
					</div>
				</div>
			</section>

			<section className='relative z-10 py-10 bg-base-200/40 p-6 md:p-10 rounded-3xl border border-base-content/5 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-8'>
					<h2 className='text-2xl md:text-4xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-4'>
						Why Use VibeToLive for a Cursor-Built App?
					</h2>
					<p className='text-lg text-base-content/75'>
						Cursor helps you move fast. VibeToLive helps make that speed production-safe.
					</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-sm'>
					{[
						{
							title: 'Avoid Launching Without Security Review',
							desc: 'Do not launch an AI-assisted codebase without reviewing security and data access.',
						},
						{
							title: 'Avoid Architecture Drift',
							desc: 'Prevent inconsistent patterns that make future development slower and riskier.',
						},
						{
							title: 'Avoid Skipping Tests and CI/CD',
							desc: 'Add deployment discipline because the app works locally is not enough for production.',
						},
					].map((item, idx) => (
						<div key={idx} className='border border-base-content/10 bg-base-100 p-5 rounded-xl'>
							<h3 className='font-bold text-base mb-2 text-emerald-600'>{item.title}</h3>
							<p className='text-xs text-base-content/75 leading-relaxed'>{item.desc}</p>
						</div>
					))}
				</div>
			</section>

			<section className='relative z-10 py-12 max-w-6xl mx-auto' aria-labelledby='cursor-related-guides'>
				<div className='text-center max-w-3xl mx-auto mb-10'>
					<p className='text-sm font-semibold uppercase tracking-wide text-primary'>Related guides</p>
					<h2 id='cursor-related-guides' className='text-3xl md:text-4xl font-bold mb-4'>
						Explore more production help
					</h2>
					<p className='text-base text-base-content/75'>
						This page focuses on Cursor-specific AI-assisted codebase problems. For the full AI-builder overview, start with
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
									: 'border-base-content/10 hover:border-emerald-500'
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
										activeFaq === idx ? 'transform rotate-180 text-emerald-500' : ''
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
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.06),transparent)] pointer-events-none' />
				<div className='relative z-10 max-w-3xl mx-auto'>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						Ready to move your Cursor-built app from fast codebase to production?
					</h2>
					<p className='text-lg text-base-content/80 mb-8 leading-relaxed'>
						Send your repo, demo link, or current blocker list. VibeToLive will review the architecture, harden the risky
						parts, configure deployment, and help you launch safely without starting over.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-6'>
						<a
							href='mailto:hello@vibetolive.dev?subject=Launch%20My%20Cursor-Built%20App'
							className='btn btn-wide btn-primary rounded-full hover:scale-105 transition-all font-bold shadow-lg'
						>
							Launch My Cursor-Built App
						</a>
						<a
							href='mailto:hello@vibetolive.dev?subject=Request%20Cursor%20App%20Review'
							className='btn btn-wide btn-outline rounded-full font-semibold hover:bg-base-content hover:text-base-100'
						>
							Request a Cursor App Review
						</a>
					</div>
					<p className='text-xs text-base-content/50'>
						Built fast with Cursor and unsure about architecture, auth, database, tests, CI/CD, or deployment? We can help
						make it production-ready.
					</p>
				</div>
			</section>
		</div>
	);
}
