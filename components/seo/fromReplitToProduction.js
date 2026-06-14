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
} from 'react-icons/fa';
import {
	MdWarning,
	MdCancel,
	MdCheckCircle,
	MdHelpCenter,
	MdOutlineFeaturedPlayList,
	MdSettings,
} from 'react-icons/md';
import { getHrefForLocale, TALLY_FORM_URL } from '@/lib/seo/site';
import SeoPricing from '@/components/seo/pricing';

const REPLIT_STACK = [
	{ name: 'Replit', style: 'border-orange-500/30 text-orange-500 bg-orange-500/10 font-bold' },
	{ name: 'Postgres', style: 'border-blue-500/20 text-blue-500 bg-blue-500/5' },
	{ name: 'Supabase', style: 'border-emerald-500/20 text-emerald-500 bg-emerald-500/5' },
	{ name: 'Neon', style: 'border-violet-500/20 text-violet-500 bg-violet-500/5' },
	{ name: 'Vercel', style: 'border-base-content/20 text-base-content bg-base-content/5' },
	{ name: 'Railway', style: 'border-indigo-500/20 text-indigo-500 bg-indigo-500/5' },
	{ name: 'Stripe', style: 'border-purple-500/20 text-purple-500 bg-purple-500/5' },
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

export default function FromReplitToProductionPage({ langName = 'en' }) {
	const [activeFaq, setActiveFaq] = useState(null);

	const toggleFaq = (index) => {
		setActiveFaq(activeFaq === index ? null : index);
	};

	const faqItems = [
		{
			question: 'Can a Replit app be used in production?',
			answer:
				'Yes. A Replit app can be used in production if the deployment setup, secrets, database, backend, authentication, payments, monitoring, and QA are reviewed before launch. The risk is not using Replit; the risk is treating a development workspace like a finished production system.',
		},
		{
			question: 'Do I need to rebuild my Replit app from scratch?',
			answer:
				'Usually, no. Many Replit apps have useful logic, working UI, and valid product direction. VibeToLive reviews the current app, keeps what works, and fixes the production blockers before recommending a rebuild.',
		},
		{
			question: 'Should I keep my app on Replit or move it to another host?',
			answer:
				'It depends on the app’s stack, traffic needs, database requirements, background jobs, budget, and long-term maintenance plan. Some apps can stay on Replit deployment; others are better moved to Vercel, Railway, Render, AWS, DigitalOcean, or another production host.',
		},
		{
			question: 'Can you migrate a Replit app to Postgres or Supabase?',
			answer:
				'Yes. VibeToLive can review the current storage setup and help move the app to Postgres, Supabase, Neon, Railway Postgres, Render Postgres, Firebase, or MongoDB for safer, more reliable data access.',
		},
		{
			question: 'Can you fix Replit deployment issues?',
			answer:
				'Yes. VibeToLive can review replit.toml, start commands, build commands, runtime settings, port configuration, environment variables, logs, and hosting behavior.',
		},
		{
			question: 'Can you review Replit secrets and environment variables?',
			answer:
				'Yes. VibeToLive can review public and private variables, database URLs, Stripe keys, auth secrets, webhook secrets, and development vs production values. Private credentials should not be hardcoded or exposed in browser code.',
		},
		{
			question: 'Can you help with Stripe in a Replit app?',
			answer:
				'Yes. VibeToLive can review Stripe checkout, live and test keys, webhook signature verification, subscription state syncing, paid-user access, cancellation handling, and failed payment behavior.',
		},
		{
			question: 'What should I send for a Replit app review?',
			answer:
				'You can send your Replit project link, GitHub repo, demo link, deployment logs, current database setup, known errors, payment context, and launch goal. If you are non-technical, start with the Replit link and what you want users to do.',
		},
		{
			question: 'How long does it take to make a Replit app production-ready?',
			answer:
				'A simple Replit app may only need secrets cleanup, deployment configuration, and basic security review. Apps with authentication, payments, private data, admin features, or database migration usually need deeper hardening.',
		},
		{
			question: 'Is this only for non-technical founders?',
			answer:
				'No. VibeToLive works with non-technical founders, technical founders, solo builders, and startup teams whenever a Replit-built app works as a demo but needs production engineering before real users depend on it.',
		},
	];

	const productionNeeds = [
		'Replit development vs production environment review',
		'Secrets and environment variable cleanup',
		'replit.toml and run-command review',
		'Deployment configuration review',
		'Replit DB or file storage migration planning',
		'External database setup, such as Postgres or Supabase',
		'Backend and API route hardening',
		'Authentication and protected-route review',
		'Stripe or payment webhook validation',
		'Monitoring, logs, and error tracking',
		'QA across real user flows',
		'A launch handoff with risks and next steps',
	];

	const productionQuestions = [
		'Is the app running as a production deployment, not just a development workspace?',
		'Are secrets stored safely and separated from public code?',
		'Is the database suitable for real users and future growth?',
		'Are environment variables separated between development and production?',
		'Is the run command or replit.toml configuration stable?',
		'Are private routes protected server-side?',
		'Are API routes validating access and input?',
		'Are Stripe or payment webhooks verified?',
		'Are logs and production errors visible?',
		'Can the app be maintained if the founder stops editing inside Replit?',
	];

	const replitProblems = [
		{
			title: 'Development Workspace and Production Deployment Are Mixed',
			desc: 'A Replit workspace is great for building, but production needs a repeatable deployment process — not just a workspace that happens to run.',
			bullets: [
				'Development command used instead of production command',
				'Preview behavior treated like live hosting',
				'Environment values not separated',
				'Unclear deployment path after code changes',
			],
		},
		{
			title: 'Replit Secrets Need Review',
			desc: 'Production requires knowing which values are safe, where they are used, and whether they belong in development or production.',
			bullets: [
				'API keys and database URLs',
				'Stripe secret keys and webhook secrets',
				'Auth and email provider secrets',
				'Development vs production value mixing',
			],
		},
		{
			title: 'Replit DB May Not Be the Best Production Database',
			desc: 'Prototype storage can work for experiments, but real products often need Postgres, Supabase, Neon, or another managed database.',
			bullets: [
				'Clear ownership rules and backups',
				'Query performance and migration strategy',
				'Access control for production data',
			],
		},
		{
			title: 'replit.toml and Run Commands Can Break Deployment',
			desc: 'Configuration that works during development may not be ideal for production hosting.',
			bullets: [
				'Start and build command separation',
				'Runtime and port configuration',
				'Dev vs production script separation',
				'Background jobs and static assets',
			],
		},
		{
			title: 'Backend and API Routes Need Hardening',
			desc: 'Before production, routes need security review for auth, validation, permissions, and error handling.',
			bullets: [
				'API routes without authentication checks',
				'User ownership not verified',
				'Admin actions protected only in the UI',
				'Sensitive logic exposed to the client',
			],
		},
		{
			title: 'Authentication Needs Real Protection',
			desc: 'Login flows must be tested beyond the UI with protected routes, sessions, and server-side authorization.',
			bullets: [
				'Role-based access and admin checks',
				'User ownership validation',
				'Direct URL access testing',
			],
		},
		{
			title: 'Payments Need Webhook Validation',
			desc: 'Checkout alone is not enough — payment state must be enforced by the backend, not only by frontend UI.',
			bullets: [
				'Test vs live key separation',
				'Webhook signature verification',
				'Subscription state and paid-user access',
				'Canceled and failed payment handling',
			],
		},
		{
			title: 'Monitoring Is Often Missing',
			desc: 'Many Replit prototypes have no production monitoring — creating risk after launch.',
			bullets: [
				'Server errors and failed API calls',
				'Payment and authentication failures',
				'Sentry, hosting logs, or uptime checks',
			],
		},
	];

	const processSteps = [
		{
			step: '01',
			title: 'Replit App Review',
			desc: 'We review your Replit project, framework, run command, secrets, database, backend routes, auth flow, deployment target, and known blockers.',
		},
		{
			step: '02',
			title: 'Environment and Secrets Review',
			desc: 'We check public vs private values, development vs production keys, Stripe keys, database URLs, auth secrets, and webhook secrets.',
		},
		{
			step: '03',
			title: 'Database and Storage Review',
			desc: 'We review whether current storage is safe for real users and plan migration to Postgres, Supabase, Neon, or another managed database if needed.',
		},
		{
			step: '04',
			title: 'Backend and Auth Hardening',
			desc: 'We review backend routes, protected pages, user ownership rules, admin access, and session handling server-side.',
		},
		{
			step: '05',
			title: 'Payment and Integration Review',
			desc: 'We review Stripe, email, AI APIs, and third-party integrations for production behavior including webhook verification.',
		},
		{
			step: '06',
			title: 'Production Deployment',
			desc: 'We configure Replit deployment or another platform — Vercel, Railway, Render, AWS, DigitalOcean, or Fly.io — with build settings, domains, and logs.',
		},
		{
			step: '07',
			title: 'QA, Monitoring, and Handoff',
			desc: 'We test signup, login, dashboards, payments, admin access, and error states — then hand off what was fixed and what to watch after launch.',
		},
	];

	const checklistCategories = [
		{
			category: 'Replit Configuration',
			icon: 'settings',
			items: [
				'Is the app using a production-ready start command?',
				'Is replit.toml configured correctly?',
				'Are development and production scripts separated?',
				'Is the correct runtime version used?',
				'Is port configuration stable?',
				'Are background tasks handled safely?',
			],
		},
		{
			category: 'Secrets and Environment',
			icon: 'key',
			items: [
				'Are private keys stored safely?',
				'Are public variables safe to expose?',
				'Are development and production values separated?',
				'Are Stripe live and test keys separated?',
				'Are database URLs stored correctly?',
				'Are webhook secrets configured?',
			],
		},
		{
			category: 'Database',
			icon: 'database',
			items: [
				'Is the current database suitable for production?',
				'Does the app need migration from Replit DB or simple storage?',
				'Are user ownership rules enforced?',
				'Are backups and migrations planned?',
				'Are permissions safe for private data?',
			],
		},
		{
			category: 'Backend',
			icon: 'code',
			items: [
				'Are API routes protected?',
				'Is request validation in place?',
				'Are admin actions secured?',
				'Is sensitive logic server-side?',
				'Are user permissions checked before database access?',
			],
		},
		{
			category: 'Authentication',
			icon: 'lock',
			items: [
				'Are private pages protected?',
				'Are sessions handled correctly?',
				'Are user roles enforced server-side?',
				'Are admin pages secured?',
				'Can direct URL access bypass restrictions?',
			],
		},
		{
			category: 'Payments',
			icon: 'payment',
			items: [
				'Are Stripe live keys configured?',
				'Are webhooks verified?',
				'Is subscription state synced?',
				'Is paid-user access enforced?',
				'Are failed payments and cancellations handled?',
			],
		},
		{
			category: 'Deployment',
			icon: 'server',
			items: [
				'Is the production host selected clearly?',
				'Does the app build and run reliably?',
				'Are domains and redirects configured?',
				'Are logs available?',
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
				'Are uptime or critical flows monitored?',
				'Does the founder know where to check logs?',
			],
		},
	];

	const checklistIcon = (type) => {
		switch (type) {
			case 'settings':
				return <MdSettings className='text-primary' />;
			case 'key':
				return <FaKey className='text-primary' />;
			case 'database':
				return <FaDatabase className='text-primary' />;
			case 'code':
				return <FaCode className='text-primary' />;
			case 'lock':
				return <FaLock className='text-primary' />;
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
						<pattern id='replit-grid' width='24' height='24' patternUnits='userSpaceOnUse'>
							<path d='M 24 0 L 0 0 0 24' fill='none' stroke='currentColor' strokeWidth='0.5' className='text-base-content/20' />
						</pattern>
					</defs>
					<rect width='100%' height='100%' fill='url(#replit-grid)' />
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
						From Replit to Production
					</h1>

					<h2 className='text-2xl md:text-3xl text-primary font-bold mb-6'>
						Can you launch a Replit-built app in production?
					</h2>

					<p className='text-lg md:text-xl text-base-content/80 mb-6 max-w-3xl mx-auto leading-relaxed'>
						Yes. A Replit-built app can become a real production product, but it should be reviewed before real users,
						payments, private data, or customer traffic are involved. Replit is excellent for fast development and
						AI-assisted coding, but production usually requires careful review of deployment, secrets, database choice,
						backend security, authentication, payments, monitoring, and hosting strategy.
					</p>

					<p className='text-base md:text-lg text-base-content/70 mb-10 max-w-2xl mx-auto'>
						VibeToLive helps founders move Replit apps from working demo to production-ready product without rebuilding
						everything from scratch.
					</p>

					<div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-16'>
						<a
							href={TALLY_FORM_URL} target='_blank' rel='noopener noreferrer'
							className='btn btn-wide btn-primary rounded-full hover:scale-105 transition-all text-primary-content font-bold shadow-lg shadow-primary/20'
						>
							Launch My Replit App
						</a>
						<a
							href={TALLY_FORM_URL} target='_blank' rel='noopener noreferrer'
							className='btn btn-wide btn-outline rounded-full hover:bg-base-content hover:text-base-100 transition-all font-semibold'
						>
							Request a Replit App Review
						</a>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className='w-full max-w-4xl bg-base-200 border border-base-content/10 p-6 md:p-8 rounded-2xl shadow-sm relative overflow-hidden'
				>
					<div className='absolute right-0 top-0 w-24 h-24 bg-orange-500/5 rounded-full blur-2xl' />
					<h3 className='text-xl md:text-2xl font-bold mb-6 flex items-center gap-2'>
						<span className='p-2 bg-orange-500/10 text-orange-500 rounded-lg'>
							<FaRocket />
						</span>
						A production-ready Replit app usually needs:
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
						Replit can help you build quickly. VibeToLive helps make sure the app is ready to survive outside the
						prototype stage.
					</p>
				</motion.div>

				<div className='mt-16 w-full max-w-5xl'>
					<p className='text-center text-xs md:text-sm font-semibold uppercase tracking-wider text-base-content/40 mb-6'>
						Common Replit production stack
					</p>
					<div className='flex flex-wrap gap-3 justify-center'>
						{REPLIT_STACK.map((tech, idx) => (
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
						<FaExclamationTriangle className='text-amber-500' /> Replit Reality Check
					</div>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						Replit Is Great for Building. Production Needs a Cleaner Setup.
					</h2>
					<p className='text-lg text-base-content/75 leading-relaxed mb-4'>
						Replit is one of the easiest ways to start building software — create a project, use AI assistance, test
						quickly, and share a link without complex local setup.
					</p>
					<p className='text-lg text-base-content/75 leading-relaxed'>
						But a Replit workspace is often a development environment first. A production product needs stable hosting,
						secrets, database access, logs, auth, and monitoring. VibeToLive helps you keep what works from the Replit
						prototype and fix the parts that can break when real users arrive.
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
						What “From Replit to Production” Means
					</h2>
					<p className='text-lg text-base-content/75 leading-relaxed'>
						Moving from Replit to production means preparing your app for stable, secure, real-user use — whether on
						Replit deployment or Vercel, Railway, Render, AWS, with database migration and backend hardening.
					</p>
				</div>

				<div className='bg-base-200/40 border border-base-content/10 p-6 md:p-8 rounded-2xl max-w-4xl mx-auto'>
					<h3 className='text-lg font-bold mb-4'>A production Replit app should answer these questions:</h3>
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
						If those answers are unclear, the app is still in prototype mode.
					</p>
				</div>
			</section>

			<div className='border-t border-base-content/10 my-10 max-w-6xl mx-auto' />

			<section className='relative z-10 py-10 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-12'>
					<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
						<MdWarning className='text-red-500' /> Replit-Specific Risks
					</div>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						Common Replit Production Problems
					</h2>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{replitProblems.map((problem, idx) => (
						<motion.div
							key={idx}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: idx * 0.04 }}
							viewport={{ once: true }}
							className='bg-base-100 border border-base-content/10 p-6 rounded-xl hover:border-orange-500/40 transition-all'
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
							How VibeToLive Helps With Replit Apps
						</h2>
						<p className='text-lg text-base-content/75 mb-6 leading-relaxed'>
							We review what is already working, identify production risks, and recommend the cleanest path to launch —
							from “it works in Replit” to “safe and stable for real users.”
						</p>
					</div>

					<div className='grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2'>
						{[
							'Replit app review',
							'Development vs production cleanup',
							'Secrets and environment review',
							'replit.toml and start-command cleanup',
							'Build and deployment configuration',
							'Replit DB migration planning',
							'External database setup',
							'Backend and API hardening',
							'Authentication review',
							'Protected-route fixes',
							'Stripe and webhook validation',
							'Production hosting setup',
							'Monitoring and logging',
							'QA across real user flows',
							'Founder-friendly handoff notes',
						].map((tag, idx) => (
							<div key={idx} className='flex items-center gap-2'>
								<span className='text-orange-500'>
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
						Our Replit to Production Process
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
							className='bg-base-100 border border-base-content/10 p-6 rounded-2xl relative overflow-hidden group hover:border-orange-500 transition-all'
						>
							<div className='absolute right-4 top-4 text-5xl font-extrabold text-base-content/5 group-hover:text-orange-500/10 transition-colors'>
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
						Replit Production Checklist
					</h2>
					<p className='text-lg text-base-content/75'>
						If several items are missing, the Replit app is still a prototype.
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
										<span className='text-orange-500 mt-0.5'>
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
						'Replit app production review',
						'Secrets and environment cleanup',
						'replit.toml and start-command review',
						'Build and deployment fixes',
						'Replit DB or storage migration plan',
						'External database setup',
						'Backend and API route hardening',
						'Authentication and protected-route fixes',
						'Stripe checkout and webhook review',
						'Production hosting configuration',
						'Domain and redirect setup',
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
								'Founders who built an app in Replit',
								'Non-technical founders preparing to launch',
								'Startup teams using Replit for an MVP',
								'Builders who used Replit AI or AI-assisted coding',
								'Apps that work in Replit but feel fragile for production',
								'Apps that need database migration or hosting cleanup',
								'Apps with user accounts, payments, dashboards, or admin features',
								'Founders who want to avoid a full rebuild',
								'Teams that need help moving beyond the development workspace',
							].map((item, idx) => (
								<li key={idx} className='flex items-start gap-2'>
									<span className='text-emerald-500 mt-1'>•</span>
									<span>{item}</span>
								</li>
							))}
						</ul>
						<p className='mt-4 text-xs text-base-content/60'>
							Not just for making the app run — for making it safe, stable, and maintainable after launch.
						</p>
					</div>

					<div className='border border-base-content/10 bg-base-100 p-6 md:p-8 rounded-2xl'>
						<h3 className='text-xl font-bold text-amber-500 mb-6 flex items-center gap-2'>
							<FaExclamationTriangle className='text-xl' /> When Your Replit App Is Not Ready
						</h3>
						<ul className='space-y-3 text-sm text-base-content/85'>
							{[
								'It only runs reliably inside the Replit workspace',
								'You are not sure whether the current deployment is production-safe',
								'Secrets or API keys are confusing',
								'The app uses development credentials',
								'The database is not ready for real users',
								'replit.toml or start commands are unclear',
								'Authentication works visually but not securely',
								'Admin pages are hidden but not protected',
								'Stripe checkout works, but webhooks are missing',
								'There is no monitoring after launch',
								'You are unsure whether to stay on Replit or move to another host',
							].map((item, idx) => (
								<li key={idx} className='flex items-start gap-2'>
									<span className='text-amber-500 mt-1'>•</span>
									<span>{item}</span>
								</li>
							))}
						</ul>
						<p className='mt-4 text-xs text-base-content/60'>Common Replit production gaps — and fixable before launch.</p>
					</div>
				</div>
			</section>

			<section className='relative z-10 py-10 bg-base-200/40 p-6 md:p-10 rounded-3xl border border-base-content/5 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-8'>
					<h2 className='text-2xl md:text-4xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-4'>
						Why Use VibeToLive for a Replit App?
					</h2>
					<p className='text-lg text-base-content/75'>
						Replit gives you speed and accessibility. VibeToLive gives you production structure.
					</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-sm'>
					{[
						{
							title: 'Avoid Launching From a Dev Setup',
							desc: 'Prevent launching from a development-style configuration that is not stable for real users.',
						},
						{
							title: 'Avoid Misplaced Secrets',
							desc: 'Keep sensitive data and credentials in the right place with clear dev vs production separation.',
						},
						{
							title: 'Avoid Rebuilding Too Early',
							desc: 'Clean up the app and move it to the right production setup instead of throwing away working logic.',
						},
					].map((item, idx) => (
						<div key={idx} className='border border-base-content/10 bg-base-100 p-5 rounded-xl'>
							<h3 className='font-bold text-base mb-2 text-orange-500'>{item.title}</h3>
							<p className='text-xs text-base-content/75 leading-relaxed'>{item.desc}</p>
						</div>
					))}
				</div>
			</section>

			<section className='relative z-10 py-12 max-w-6xl mx-auto' aria-labelledby='replit-related-guides'>
				<div className='text-center max-w-3xl mx-auto mb-10'>
					<p className='text-sm font-semibold uppercase tracking-wide text-primary'>Related guides</p>
					<h2 id='replit-related-guides' className='text-3xl md:text-4xl font-bold mb-4'>
						Explore more production help
					</h2>
					<p className='text-base text-base-content/75'>
						This page focuses on Replit-specific production problems. For the full AI-builder overview, start with the main
						hub.
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
									: 'border-base-content/10 hover:border-orange-500'
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
										activeFaq === idx ? 'transform rotate-180 text-orange-500' : ''
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
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.06),transparent)] pointer-events-none' />
				<div className='relative z-10 max-w-3xl mx-auto'>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						Ready to move your Replit app from demo to production?
					</h2>
					<p className='text-lg text-base-content/80 mb-8 leading-relaxed'>
						Send your Replit project, repo, or demo link. VibeToLive will review the setup, clean up the production
						blockers, configure deployment, and help you launch safely without starting over.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-6'>
						<a
							href={TALLY_FORM_URL} target='_blank' rel='noopener noreferrer'
							className='btn btn-wide btn-primary rounded-full hover:scale-105 transition-all font-bold shadow-lg'
						>
							Launch My Replit App
						</a>
						<a
							href={TALLY_FORM_URL} target='_blank' rel='noopener noreferrer'
							className='btn btn-wide btn-outline rounded-full font-semibold hover:bg-base-content hover:text-base-100'
						>
							Request a Replit App Review
						</a>
					</div>
					<p className='text-xs text-base-content/50'>
						Built in Replit and unsure about deployment, secrets, database, auth, or production hosting? We can help make
						it production-ready.
					</p>
				</div>
			</section>
		</div>
	);
}
