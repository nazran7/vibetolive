'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
	FaShieldAlt,
	FaCheck,
	FaExclamationTriangle,
	FaChevronDown,
	FaLock,
	FaUserShield,
	FaServer,
	FaEye,
} from 'react-icons/fa';
import {
	MdWarning,
	MdCancel,
	MdCheckCircle,
	MdHelpCenter,
	MdSecurity,
} from 'react-icons/md';
import { getHrefForLocale, TALLY_FORM_URL } from '@/lib/seo/site';
import AuditPricing from '@/components/seo/auditPricing';

const AI_BUILDERS = [
	'Lovable',
	'Bolt.new',
	'V0',
	'Cursor',
	'Replit',
	'ChatGPT',
	'Claude',
	'Windsurf',
	'Base44',
];

const TECH_STACK = [
	{ name: 'Next.js', style: 'border-base-content/20 text-base-content bg-base-content/5' },
	{ name: 'Supabase', style: 'border-teal-500/20 text-teal-500 bg-teal-500/5' },
	{ name: 'Stripe', style: 'border-violet-500/20 text-violet-500 bg-violet-500/5' },
	{ name: 'Clerk', style: 'border-indigo-500/20 text-indigo-500 bg-indigo-500/5' },
	{ name: 'Auth.js', style: 'border-blue-500/20 text-blue-500 bg-blue-500/5' },
	{ name: 'Prisma', style: 'border-emerald-500/20 text-emerald-500 bg-emerald-500/5' },
	{ name: 'Vercel', style: 'border-base-content/20 text-base-content bg-base-content/5' },
	{ name: 'Sentry', style: 'border-red-500/20 text-red-500 bg-red-500/5' },
];

const RELATED_GUIDES = [
	{
		slug: 'ai-prototype-to-production',
		title: 'AI Prototype to Production',
		description: 'Main hub for all AI-generated app production help.',
	},
	{
		slug: 'from-lovable-to-production',
		title: 'From Lovable to Production',
		description: 'Lovable-specific production help including Supabase and auth.',
	},
	{
		slug: 'from-bolt-to-production',
		title: 'From Bolt to Production',
		description: 'Bolt.new-specific production and security hardening.',
	},
	{
		slug: 'from-v0-to-production',
		title: 'From V0 to Production',
		description: 'V0-generated app production help.',
	},
	{
		slug: 'from-replit-to-production',
		title: 'From Replit to Production',
		description: 'Replit-specific deployment and secrets review.',
	},
	{
		slug: 'from-cursor-to-production',
		title: 'From Cursor to Production',
		description: 'Cursor-built app production and security review.',
	},
	{
		slug: 'security-risks-ai-generated-code',
		title: 'Security Risks in AI-Generated Code',
		description: 'Educational overview of common AI code security risks.',
	},
	{
		slug: 'production-readiness-checklist',
		title: 'Production Readiness Checklist',
		description: 'Checklist-style guide for launch readiness.',
	},
];

export default function AiAppSecurityAuditPage({ langName = 'en' }) {
	const [activeFaq, setActiveFaq] = useState(null);

	const toggleFaq = (index) => {
		setActiveFaq(activeFaq === index ? null : index);
	};

	const faqItems = [
		{
			question: 'What is an AI app security audit?',
			answer:
				'An AI app security audit is a focused review before launch. It checks authentication, authorization, database access, API routes, exposed secrets, payment flows, admin access, deployment settings, and monitoring to find risks that could affect real users, private data, or payments.',
		},
		{
			question: 'Do AI-generated apps have more security problems?',
			answer:
				'AI-generated apps are not automatically insecure, but they are often built quickly and may skip production hardening. Common issues include weak protected routes, permissive database access, exposed environment variables, frontend-only authorization, incomplete Stripe webhooks, and missing monitoring.',
		},
		{
			question: 'Can you audit a Lovable app?',
			answer:
				'Yes. VibeToLive can audit Lovable apps using Supabase, authentication, dashboards, admin panels, or Stripe — including RLS, storage permissions, protected routes, environment variables, and payment flows.',
		},
		{
			question: 'Can you audit a Bolt.new, V0, Cursor, or Replit app?',
			answer:
				'Yes. VibeToLive audits apps built with Bolt.new, V0, Cursor, Replit, ChatGPT, Claude, Windsurf, Base44, and custom AI-assisted codebases. The audit adapts to the stack and how the app was built.',
		},
		{
			question: 'What are the most common AI app security risks?',
			answer:
				'Missing server-side auth checks, unprotected admin routes, overly broad database permissions, exposed secrets, unsafe API routes, weak input validation, incomplete Stripe webhook verification, and no monitoring after launch — even when the UI looks complete.',
		},
		{
			question: 'Can you review Supabase RLS?',
			answer:
				'Yes. VibeToLive can review Supabase Row Level Security status, select/insert/update/delete policies, user ownership rules, admin access, service-role usage, and storage bucket permissions.',
		},
		{
			question: 'Can you check if my API keys are exposed?',
			answer:
				'Yes. VibeToLive can review environment variable usage, client/server boundaries, public variables, private secrets, hardcoded keys, repository exposure risk, and hosting configuration.',
		},
		{
			question: 'Can you audit Stripe and payment security?',
			answer:
				'Yes. VibeToLive can review Stripe checkout, live/test key separation, webhook signature verification, subscription state syncing, paid-user access enforcement, cancellation behavior, and failed payment handling.',
		},
		{
			question: 'Do you fix the issues after the audit?',
			answer:
				'Yes, fix support can be scoped after the audit. Some founders only need the findings report; others want VibeToLive to fix RLS policies, protected routes, API validation, Stripe webhooks, environment variables, or monitoring.',
		},
		{
			question: 'What should I send for an audit?',
			answer:
				'Send your repo, demo link, app description, auth provider, database setup, payment setup, deployment target, and known concerns. If you are non-technical, start with the app link and explain what users can do in the app.',
		},
	];

	const auditChecks = [
		'Authentication and protected routes',
		'Server-side authorization',
		'Supabase RLS and database permissions',
		'API route and server action protection',
		'Exposed environment variables and secrets',
		'Stripe webhook and payment access logic',
		'Admin panel access',
		'User ownership rules',
		'Input validation and unsafe writes',
		'File upload or storage permissions',
		'Dependency and package risks',
		'Production deployment security',
		'Monitoring and error visibility',
	];

	const securityQuestions = [
		'Can users access only their own data?',
		'Are private routes protected server-side?',
		'Are admin routes actually restricted?',
		'Are database rules strict enough?',
		'Are Supabase RLS policies enabled and correctly scoped?',
		'Are private environment variables hidden from the client?',
		'Are API routes validating authentication and input?',
		'Are Stripe webhooks verified?',
		'Is paid-user access enforced server-side?',
		'Are file uploads and storage buckets protected?',
		'Are errors logged after launch?',
		'Does the founder know what security risks remain?',
	];

	const securityRisks = [
		{
			title: 'Login Exists, But Routes Are Not Really Protected',
			desc: 'AI tools often generate login flows, but security depends on what happens after login.',
			bullets: [
				'Private pages requiring a valid session',
				'Direct URL access to protected pages',
				'Middleware and API route verification',
				'Role checks outside the UI',
			],
		},
		{
			title: 'Authorization Is Missing or Inconsistent',
			desc: 'Being logged in does not mean a user should access every record, admin action, or paid feature.',
			bullets: [
				'API routes and server actions',
				'Admin pages and team spaces',
				'Paid features and file access',
				'Update and delete actions',
			],
		},
		{
			title: 'Database Permissions Are Too Open',
			desc: 'Production data needs strict access rules whether using Supabase, Firebase, Postgres, or MongoDB.',
			bullets: [
				'User ownership and public vs private data',
				'Insert, update, delete permissions',
				'Storage bucket access',
				'Service-role usage',
			],
		},
		{
			title: 'Supabase RLS Is Missing, Disabled, or Too Permissive',
			desc: 'Supabase security depends heavily on correct Row Level Security policies.',
			bullets: [
				'RLS disabled on private tables',
				'Policies without ownership checks',
				'Admin logic handled only in the UI',
				'Public storage buckets for private files',
			],
		},
		{
			title: 'Environment Variables and Secrets Are Exposed',
			desc: 'AI-generated apps can accidentally expose secrets across frontend and backend files.',
			bullets: [
				'Database URLs and service-role keys',
				'Stripe secret keys and webhook secrets',
				'Auth secrets and AI API keys',
				'Secrets in browser bundles or public repos',
			],
		},
		{
			title: 'API Routes Trust the Frontend Too Much',
			desc: 'A hidden button is not a security boundary. Server actions must enforce rules.',
			bullets: [
				'Session verification and input validation',
				'Record ownership and admin-only actions',
				'Sensitive logic kept server-side',
				'Safe error responses',
			],
		},
		{
			title: 'Admin Pages Are Hidden, Not Secured',
			desc: 'Admin dashboards may be hidden from navigation but accessible by direct URL.',
			bullets: [
				'Server-side role checks',
				'Middleware and database permissions',
				'Admin-only query filters',
				'Logging for sensitive actions',
			],
		},
		{
			title: 'Stripe Checkout Works, But Payment Security Is Incomplete',
			desc: 'A checkout page does not mean the payment system is secure.',
			bullets: [
				'Webhook signature verification',
				'Subscription state syncing',
				'Paid-user access enforcement server-side',
				'Failed payment and cancellation handling',
			],
		},
		{
			title: 'Input Validation Is Weak',
			desc: 'Production apps need server-side validation for dashboards, admin forms, and payments.',
			bullets: [
				'Required fields enforced server-side',
				'Users cannot update fields they should not control',
				'File upload restrictions',
				'Webhook payload verification',
			],
		},
		{
			title: 'Monitoring Is Missing',
			desc: 'Security is not only prevention — production apps need visibility.',
			bullets: [
				'Server errors and failed API requests',
				'Auth failures and webhook failures',
				'Database errors and admin actions',
				'User-impacting crashes',
			],
		},
	];

	const processSteps = [
		{
			step: '01',
			title: 'App and Stack Review',
			desc: 'We review your app, repo, demo, framework, auth provider, database, payment setup, deployment target, and known concerns.',
		},
		{
			step: '02',
			title: 'Security Surface Mapping',
			desc: 'We identify login, dashboards, admin panels, API routes, database tables, storage buckets, payment flows, webhooks, and env vars.',
		},
		{
			step: '03',
			title: 'Auth and Access Review',
			desc: 'We check protected routes, admin access, role checks, ownership rules, and direct URL access testing.',
		},
		{
			step: '04',
			title: 'Database and Data Access Review',
			desc: 'For Supabase: RLS status, policies, storage permissions, service-role usage. For others: ownership checks and admin-only access.',
		},
		{
			step: '05',
			title: 'Secrets, Payments, and Integrations',
			desc: 'We check environment variables, Stripe webhooks, subscription state, paid access, live/test keys, and third-party integrations.',
		},
		{
			step: '06',
			title: 'Findings Report',
			desc: 'You receive a prioritized report: what is safe, what is risky, what must be fixed before launch, and what can wait.',
		},
		{
			step: '07',
			title: 'Optional Fix Support',
			desc: 'After the audit, VibeToLive can fix permissions, harden routes, validate payments, or prepare the app for launch.',
		},
	];

	const severityLevels = [
		{
			level: 'Critical',
			color: 'text-red-600 border-red-500/30 bg-red-500/5',
			desc: 'Can expose private data, allow unauthorized access, leak secrets, or create serious launch risk.',
			examples: 'Exposed service-role keys, disabled RLS, unprotected admin routes, unauthenticated API writes, unverified webhooks.',
		},
		{
			level: 'High',
			color: 'text-orange-600 border-orange-500/30 bg-orange-500/5',
			desc: 'Can create security problems under realistic use.',
			examples: 'Inconsistent role checks, weak ownership validation, unsafe file permissions, broad database policies.',
		},
		{
			level: 'Medium',
			color: 'text-amber-600 border-amber-500/30 bg-amber-500/5',
			desc: 'Should be fixed soon but may not block launch with limited exposure.',
			examples: 'Incomplete validation, missing rate limits, unclear error handling, weak monitoring.',
		},
		{
			level: 'Low',
			color: 'text-base-content/70 border-base-content/20 bg-base-content/5',
			desc: 'Useful improvements but not immediate launch blockers.',
			examples: 'Clearer logs, unused code cleanup, better dependency notes, security documentation.',
		},
	];

	return (
		<div className='w-full relative py-5 select-none'>
			<div className='absolute w-full left-0 top-0 h-[400px] z-0 overflow-hidden pointer-events-none opacity-30'>
				<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
					<defs>
						<pattern id='security-grid' width='32' height='32' patternUnits='userSpaceOnUse'>
							<path d='M 32 0 L 0 0 0 32' fill='none' stroke='currentColor' strokeWidth='0.5' className='text-base-content/20' />
						</pattern>
					</defs>
					<rect width='100%' height='100%' fill='url(#security-grid)' />
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
						AI App Security Audit
					</h1>

					<h2 className='text-2xl md:text-3xl text-primary font-bold mb-6'>
						Is your AI-generated app safe to launch?
					</h2>

					<p className='text-lg md:text-xl text-base-content/80 mb-6 max-w-3xl mx-auto leading-relaxed'>
						An AI-generated app can look finished while still having serious security gaps. Before launch, the app
						should be reviewed for authentication, database permissions, exposed secrets, API route protection, admin
						access, payment webhooks, and production configuration.
					</p>

					<p className='text-base md:text-lg text-base-content/70 mb-10 max-w-2xl mx-auto'>
						VibeToLive audits apps built with Lovable, Bolt.new, V0, Cursor, Replit, ChatGPT, Claude, Windsurf,
						Base44, and other AI-assisted workflows.
					</p>

					<div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-16'>
						<a
							href={TALLY_FORM_URL} target='_blank' rel='noopener noreferrer'
							className='btn btn-wide btn-primary text-primary-content rounded-full hover:scale-105 transition-all font-bold shadow-lg shadow-primary/20'
						>
							Request a Security Audit
						</a>
						<a
							href={TALLY_FORM_URL} target='_blank' rel='noopener noreferrer'
							className='btn btn-wide btn-outline rounded-full hover:bg-base-content hover:text-base-100 transition-all font-semibold'
						>
							Review My AI App Before Launch
						</a>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className='w-full max-w-4xl bg-base-200 border border-base-content/10 p-6 md:p-8 rounded-2xl shadow-sm relative overflow-hidden'
				>
					<div className='absolute right-0 top-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl' />
					<h3 className='text-xl md:text-2xl font-bold mb-6 flex items-center gap-2'>
						<span className='p-2 bg-primary/10 text-primary rounded-lg'>
							<FaShieldAlt />
						</span>
						An AI app security audit usually checks:
					</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{auditChecks.map((item, idx) => (
							<div key={idx} className='flex items-start gap-3'>
								<span className='text-emerald-500 mt-1'>
									<FaCheck size={14} />
								</span>
								<span className='text-base-content/80 text-sm md:text-base'>{item}</span>
							</div>
						))}
					</div>
					<p className='mt-6 text-sm text-base-content/70 border-t border-base-content/10 pt-4'>
						VibeToLive is built for founders who moved fast with AI and now need to know whether the app is safe enough
						for real users.
					</p>
				</motion.div>

				<div className='mt-16 w-full max-w-5xl space-y-8'>
					<div>
						<p className='text-center text-xs md:text-sm font-semibold uppercase tracking-wider text-base-content/40 mb-4'>
							AI builders we audit
						</p>
						<div className='flex flex-wrap gap-2 justify-center'>
							{AI_BUILDERS.map((name) => (
								<span
									key={name}
									className='px-3 py-1.5 border border-primary/20 text-primary bg-primary/5 rounded-full text-xs font-medium'
								>
									{name}
								</span>
							))}
						</div>
					</div>
					<div>
						<p className='text-center text-xs md:text-sm font-semibold uppercase tracking-wider text-base-content/40 mb-4'>
							Stacks we commonly review
						</p>
						<div className='flex flex-wrap gap-3 justify-center'>
							{TECH_STACK.map((tech) => (
								<span
									key={tech.name}
									className={`px-4 py-2 border rounded-full text-xs md:text-sm font-medium ${tech.style}`}
								>
									{tech.name}
								</span>
							))}
						</div>
					</div>
				</div>
			</section>

			<div className='border-t border-base-content/10 my-10 max-w-6xl mx-auto' />

			<section className='relative z-10 py-10 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-10'>
					<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
						<FaExclamationTriangle className='text-amber-500' /> Security Reality
					</div>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						AI Apps Can Look Secure Before They Actually Are
					</h2>
					<p className='text-lg text-base-content/75 leading-relaxed mb-4'>
						A login page does not guarantee protected routes. A dashboard does not guarantee safe database access. A
						hidden admin link does not guarantee admin protection. A Stripe checkout button does not guarantee
						verified payment state.
					</p>
					<p className='text-lg text-base-content/75 leading-relaxed'>
						Many AI-generated apps are built for speed first. Security usually needs a separate review before launch.
						That does not mean AI-generated code is bad — it means the app should be audited before real users,
						private data, payments, or customer accounts are involved.
					</p>
				</div>
			</section>

			<div className='border-t border-base-content/10 my-10 max-w-6xl mx-auto' />

			<section className='relative z-10 py-10 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-12'>
					<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
						<MdSecurity className='text-primary' /> Core Definition
					</div>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						What an AI App Security Audit Means
					</h2>
					<p className='text-lg text-base-content/75 leading-relaxed'>
						A focused review of the parts of your app that can create real launch risk — not a full rewrite, but
						finding the security gaps that matter most before users depend on the product.
					</p>
				</div>

				<div className='bg-base-200/40 border border-base-content/10 p-6 md:p-8 rounded-2xl max-w-4xl mx-auto'>
					<h3 className='text-lg font-bold mb-4'>A secure AI-generated app should answer these questions:</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
						{securityQuestions.map((q, idx) => (
							<div key={idx} className='flex items-start gap-2 text-sm text-base-content/85'>
								<span className='text-emerald-500 mt-0.5'>
									<FaCheck size={10} />
								</span>
								<span>{q}</span>
							</div>
						))}
					</div>
					<p className='mt-6 text-sm text-base-content/70 italic'>
						If the answer is unclear, the app should not be treated as production-ready yet.
					</p>
				</div>
			</section>

			<div className='border-t border-base-content/10 my-10 max-w-6xl mx-auto' />

			<section className='relative z-10 py-10 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-12'>
					<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
						<MdWarning className='text-red-500' /> Common Risks
					</div>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						Common Security Risks in AI-Generated Apps
					</h2>
					<p className='text-lg text-base-content/75'>
						AI-built apps often have the same pattern: the interface looks good, but the security model is incomplete.
					</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{securityRisks.map((risk, idx) => (
						<motion.div
							key={idx}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: idx * 0.03 }}
							viewport={{ once: true }}
							className='bg-base-100 border border-base-content/10 p-6 rounded-xl hover:border-primary/40 transition-all'
						>
							<h3 className='text-lg font-bold mb-2 text-base-content'>{risk.title}</h3>
							<p className='text-sm text-base-content/70 mb-4 leading-relaxed'>{risk.desc}</p>
							<ul className='space-y-1.5'>
								{risk.bullets.map((bullet, bulletIdx) => (
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
							<MdCheckCircle className='text-emerald-500' /> What We Review
						</div>
						<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
							What VibeToLive Reviews
						</h2>
						<p className='text-lg text-base-content/75 mb-6 leading-relaxed'>
							The goal is a clear answer: what is safe, what is risky, what must be fixed before launch, and what can
							wait.
						</p>
					</div>

					<div className='grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2'>
						{[
							'Authentication setup',
							'Authorization logic',
							'Protected routes and middleware',
							'API routes and server actions',
							'Supabase RLS',
							'Firebase or database rules',
							'Postgres ownership checks',
							'Admin access',
							'Environment variables',
							'Exposed secrets',
							'Stripe checkout and webhooks',
							'Paid-user access',
							'File storage permissions',
							'Input validation',
							'Dependency and package concerns',
							'Deployment configuration',
							'Logging and monitoring',
							'Production-readiness risks',
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
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						Our AI App Security Audit Process
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
							className='bg-base-100 border border-base-content/10 p-6 rounded-2xl relative overflow-hidden group hover:border-primary transition-all'
						>
							<div className='absolute right-4 top-4 text-5xl font-extrabold text-base-content/5 group-hover:text-primary/10 transition-colors'>
								{item.step}
							</div>
							<h3 className='text-lg font-bold mb-3 text-base-content pr-10'>{item.title}</h3>
							<p className='text-sm text-base-content/70 leading-relaxed'>{item.desc}</p>
						</motion.div>
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
						'Security findings report',
						'Launch-risk summary',
						'Auth and protected-route review',
						'API route and server action review',
						'Database permission review',
						'Supabase RLS review where applicable',
						'Environment variable and secret exposure review',
						'Stripe/payment security review',
						'Admin access review',
						'Input validation review',
						'Deployment security notes',
						'Monitoring and logging recommendations',
						'Prioritized fix list',
						'Founder-friendly explanation of risks',
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

			<section className='relative z-10 py-10 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-10'>
					<h2 className='text-2xl md:text-4xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-4'>
						Audit Severity Levels
					</h2>
					<p className='text-base text-base-content/75'>Each finding is grouped by severity so you know what blocks launch.</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto'>
					{severityLevels.map((item, idx) => (
						<div key={idx} className={`border p-5 rounded-xl ${item.color}`}>
							<h3 className='font-bold text-lg mb-2'>{item.level}</h3>
							<p className='text-sm mb-3 opacity-90'>{item.desc}</p>
							<p className='text-xs opacity-75'>
								<span className='font-semibold'>Examples: </span>
								{item.examples}
							</p>
						</div>
					))}
				</div>
			</section>

			<AuditPricing />

			<section className='relative z-10 py-10 max-w-6xl mx-auto'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<div className='border border-base-content/10 bg-base-100 p-6 md:p-8 rounded-2xl'>
						<h3 className='text-xl font-bold text-emerald-500 mb-6 flex items-center gap-2'>
							<FaUserShield className='text-xl' /> Who This Service Is For
						</h3>
						<ul className='space-y-3 text-sm text-base-content/85'>
							{[
								'Founders with AI-generated apps',
								'Non-technical founders preparing to launch',
								'Startups using Lovable, Bolt, V0, Cursor, or Replit',
								'Builders who connected Supabase, Firebase, or Postgres',
								'Apps with login, dashboards, admin roles, or private data',
								'Apps using Stripe or paid subscriptions',
								'Founders who are unsure whether their app is safe',
								'Teams that need a security review before production',
								'Apps built quickly that now need risk assessment',
							].map((item, idx) => (
								<li key={idx} className='flex items-start gap-2'>
									<span className='text-emerald-500 mt-1'>•</span>
									<span>{item}</span>
								</li>
							))}
						</ul>
					</div>

					<div className='border border-base-content/10 bg-base-100 p-6 md:p-8 rounded-2xl'>
						<h3 className='text-xl font-bold text-amber-500 mb-6 flex items-center gap-2'>
							<FaExclamationTriangle className='text-xl' /> When You Need an Audit
						</h3>
						<ul className='space-y-3 text-sm text-base-content/85'>
							{[
								'Your app has user accounts or private user data',
								'Your app has an admin dashboard',
								'Your app uses Supabase, Firebase, or Postgres',
								'Your app uses Stripe or paid access',
								'You are unsure whether RLS is configured correctly',
								'You used AI to generate backend or API logic',
								'You are not sure whether private keys are exposed',
								'You plan to invite real users soon',
								'You want to avoid a security mistake before launch',
							].map((item, idx) => (
								<li key={idx} className='flex items-start gap-2'>
									<span className='text-amber-500 mt-1'>•</span>
									<span>{item}</span>
								</li>
							))}
						</ul>
						<p className='mt-4 text-xs text-base-content/60'>
							Static landing pages may not need this audit. Apps with data, payments, or private flows probably do.
						</p>
					</div>
				</div>
			</section>

			<section className='relative z-10 py-10 bg-base-200/40 p-6 md:p-10 rounded-3xl border border-base-content/5 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-8'>
					<h2 className='text-2xl md:text-4xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-4'>
						Why Use VibeToLive for AI App Security?
					</h2>
					<p className='text-lg text-base-content/75'>
						AI-generated apps move fast. VibeToLive helps make sure that speed does not turn into security risk.
					</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-sm'>
					{[
						{
							icon: <FaEye className='text-primary text-xl mb-2' />,
							title: 'Do Not Trust the Demo UI',
							desc: 'A working demo is not safe just because the UI looks complete.',
						},
						{
							icon: <FaLock className='text-primary text-xl mb-2' />,
							title: 'Enforce Server-Side Permissions',
							desc: 'Do not trust frontend checks instead of server-side and database-level permissions.',
						},
						{
							icon: <FaServer className='text-primary text-xl mb-2' />,
							title: 'Review Before Launch',
							desc: 'Do not launch without knowing whether auth, data access, payments, and secrets are secure.',
						},
					].map((item, idx) => (
						<div key={idx} className='border border-base-content/10 bg-base-100 p-5 rounded-xl'>
							{item.icon}
							<h3 className='font-bold text-base mb-2'>{item.title}</h3>
							<p className='text-xs text-base-content/75 leading-relaxed'>{item.desc}</p>
						</div>
					))}
				</div>
			</section>

			<section className='relative z-10 py-12 max-w-6xl mx-auto' aria-labelledby='security-related-guides'>
				<div className='text-center max-w-3xl mx-auto mb-10'>
					<p className='text-sm font-semibold uppercase tracking-wide text-primary'>Related guides</p>
					<h2 id='security-related-guides' className='text-3xl md:text-4xl font-bold mb-4'>
						Production help beyond the audit
					</h2>
					<p className='text-base text-base-content/75'>
						This page focuses on security review before launch. For full production hardening by tool, see the guides
						below.
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
									: 'border-base-content/10 hover:border-primary'
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
										activeFaq === idx ? 'transform rotate-180 text-primary' : ''
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
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,182,0.05),transparent)] pointer-events-none' />
				<div className='relative z-10 max-w-3xl mx-auto'>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						Want to know if your AI app is safe to launch?
					</h2>
					<p className='text-lg text-base-content/80 mb-8 leading-relaxed'>
						Send your app, repo, or demo link. VibeToLive will review the security risks, explain what needs to be
						fixed, and help you decide whether the app is ready for real users.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-6'>
						<a
							href={TALLY_FORM_URL} target='_blank' rel='noopener noreferrer'
							className='btn btn-wide btn-primary text-primary-content rounded-full hover:scale-105 transition-all font-bold shadow-lg'
						>
							Request a Security Audit
						</a>
						<a
							href={TALLY_FORM_URL} target='_blank' rel='noopener noreferrer'
							className='btn btn-wide btn-outline rounded-full font-semibold hover:bg-base-content hover:text-base-100'
						>
							Review My AI App Before Launch
						</a>
					</div>
					<p className='text-xs text-base-content/50'>
						Built with Lovable, Bolt.new, V0, Cursor, Replit, ChatGPT, Claude, Windsurf, or Base44? We can audit the
						security before you launch.
					</p>
				</div>
			</section>
		</div>
	);
}
