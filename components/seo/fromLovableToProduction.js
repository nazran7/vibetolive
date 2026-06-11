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

const LOVABLE_STACK = [
	{ name: 'Lovable', style: 'border-primary/30 text-primary bg-primary/10 font-bold' },
	{ name: 'Supabase', style: 'border-emerald-500/20 text-emerald-500 bg-emerald-500/5' },
	{ name: 'Stripe', style: 'border-violet-500/20 text-violet-500 bg-violet-500/5' },
	{ name: 'Vercel', style: 'border-base-content/20 text-base-content bg-base-content/5' },
	{ name: 'Railway', style: 'border-blue-500/20 text-blue-500 bg-blue-500/5' },
	{ name: 'Render', style: 'border-amber-500/20 text-amber-500 bg-amber-500/5' },
];

const RELATED_GUIDES = [
	{
		slug: 'ai-prototype-to-production',
		title: 'AI Prototype to Production',
		description: 'Main hub for all AI-generated apps — start here if your Lovable app is part of a broader AI build.',
	},
	{
		slug: 'from-bolt-to-production',
		title: 'From Bolt to Production',
		description: 'Bolt.new-specific production help for founders comparing AI builders.',
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

export default function FromLovableToProductionPage({ langName = 'en' }) {
	const [activeFaq, setActiveFaq] = useState(null);

	const toggleFaq = (index) => {
		setActiveFaq(activeFaq === index ? null : index);
	};

	const faqItems = [
		{
			question: 'Can a Lovable app be used in production?',
			answer:
				'Yes. A Lovable app can be used in production if the authentication, Supabase permissions, environment variables, deployment setup, payment flows, and monitoring are reviewed before launch. The risk is not using Lovable; the risk is launching a demo before the production layer is finished.',
		},
		{
			question: 'Do I need to rebuild my Lovable app from scratch?',
			answer:
				'Usually, no. Many Lovable apps have useful UI, working flows, and valid product structure. VibeToLive reviews the existing app, keeps what works, and fixes the production blockers before recommending a rebuild.',
		},
		{
			question: 'What are the most common Lovable production issues?',
			answer:
				'The most common issues are permissive Supabase access, missing or incomplete RLS policies, frontend-only route protection, exposed environment variables, incomplete Stripe webhooks, fragile deployment settings, and no monitoring after launch. These issues are common because Lovable is optimized for speed, not full production hardening.',
		},
		{
			question: 'Can you fix Supabase RLS for my Lovable app?',
			answer:
				'Yes. VibeToLive can review Supabase tables, RLS status, select/insert/update/delete policies, ownership rules, admin access, and storage permissions. The goal is to make sure users can only access the data they are allowed to access.',
		},
		{
			question: 'Can you deploy my Lovable app outside Lovable?',
			answer:
				'Yes. VibeToLive can help deploy a Lovable-built app to production hosting such as Vercel, Railway, Render, AWS, DigitalOcean, or another suitable platform. We also help configure build commands, environment variables, domains, redirects, and monitoring.',
		},
		{
			question: 'Can you help with Stripe in a Lovable app?',
			answer:
				'Yes. VibeToLive can review Stripe checkout, live and test keys, webhook signature verification, subscription status syncing, paid-user access, cancellation handling, and failed payment behavior. Payment flows should be tested before real customers use the app.',
		},
		{
			question: 'What should I send for a Lovable app review?',
			answer:
				'You can send your Lovable demo link, repo or exported code, Supabase setup details, deployment target, Stripe/payment context, known bugs, and launch goal. If you are non-technical, you can start with the app link and a short explanation of what you want users to do.',
		},
		{
			question: 'How long does it take to make a Lovable app production-ready?',
			answer:
				'The timeline depends on the app’s complexity. A simple Lovable app may only need deployment setup and basic security cleanup. A Lovable app with Supabase, Stripe, admin roles, private data, dashboards, or multiple user types usually needs a deeper production-hardening scope.',
		},
		{
			question: 'Is this only for non-technical founders?',
			answer:
				'No. VibeToLive works with non-technical founders, solo builders, startup teams, and technical founders who use Lovable to move quickly. The service is useful whenever a Lovable app works as a demo but needs production engineering before launch.',
		},
		{
			question: 'Why should I not just launch my Lovable app immediately?',
			answer:
				'You can launch quickly, but you should not launch blindly. If Supabase permissions, authentication, payment webhooks, environment variables, or monitoring are incomplete, the app can expose data, break payments, or fail for users. A production review reduces that risk before launch.',
		},
	];

	const productionNeeds = [
		'Supabase Row Level Security review',
		'Protected-route and authentication hardening',
		'Database permission cleanup',
		'Server-side access checks',
		'Safe environment variable setup',
		'Deployment configuration outside the Lovable preview environment',
		'Stripe and webhook validation',
		'Monitoring and error tracking',
		'QA across signup, login, dashboard, payment, and admin flows',
		'A production handoff with risks, fixes, and next steps',
	];

	const productionQuestions = [
		'Can users access only the data they own?',
		'Are Supabase RLS policies enabled and correctly scoped?',
		'Are admin routes protected server-side?',
		'Are API keys and service-role credentials kept private?',
		'Does the app build and deploy reliably?',
		'Are production environment variables separated from preview values?',
		'Are Stripe webhooks verified?',
		'Are payment states synced correctly?',
		'Are errors logged after launch?',
		'Can the founder update or maintain the app safely after deployment?',
	];

	const lovableProblems = [
		{
			title: 'Supabase RLS Is Missing or Too Permissive',
			desc: 'Many Lovable apps rely on frontend filters instead of database-level security. UI may hide other users’ records while Supabase still allows broader reads or writes if RLS policies are missing or too permissive.',
			bullets: [
				'Row Level Security status',
				'Ownership-based access rules',
				'Admin-only data access',
				'Insert, update, delete, and select policies',
				'Public table exposure',
				'Service-role key usage',
				'Storage bucket permissions',
			],
		},
		{
			title: 'Authentication Works Visually, But Is Not Fully Protected',
			desc: 'A login screen does not guarantee secure authentication. Production review should check protected routes, session handling, server-side authorization, roles, and direct URL access to private pages.',
			bullets: [
				'Protected routes and session handling',
				'Server-side authorization',
				'Role-based access control',
				'Admin permissions',
				'Direct URL access to private pages',
			],
		},
		{
			title: 'Preview and Production Environments Are Confused',
			desc: 'A Lovable app may work in preview but fail on production hosting without clear separation between dev, preview, and production values.',
			bullets: [
				'Development vs preview vs production',
				'Public vs private environment variables',
				'Supabase project settings',
				'Stripe test and live keys',
				'Domain and redirect URLs',
			],
		},
		{
			title: 'API Keys May Be Exposed in the Wrong Place',
			desc: 'Private keys should not be available in browser code — including service-role keys, Stripe secrets, webhook secrets, and private API tokens.',
			bullets: [
				'Service-role and database URLs',
				'Stripe secret keys',
				'Webhook and email provider secrets',
				'Client vs server vs hosting placement',
			],
		},
		{
			title: 'Stripe Checkout Works, But Webhooks Are Incomplete',
			desc: 'Checkout is only one part of a production payment system. Without webhook validation, paid-user access and subscription state can break silently.',
			bullets: [
				'Live vs test key separation',
				'Webhook signature verification',
				'Subscription status syncing',
				'Canceled and failed payment handling',
			],
		},
		{
			title: 'Admin Screens Are Hidden, Not Secured',
			desc: 'Hiding an admin link in the UI is not enough. Production admin access must be enforced through server-side checks, role verification, and database policies.',
			bullets: [
				'Server-side role verification',
				'Protected admin routes',
				'Database policy enforcement',
			],
		},
		{
			title: 'The App Has No Monitoring After Launch',
			desc: 'If a production app breaks and no one knows, it is not production-ready. Founders need visibility into errors, payments, and failed API calls before real users arrive.',
			bullets: [
				'Error tracking and server logs',
				'Payment failure visibility',
				'Alerts for critical flows',
			],
		},
	];

	const processSteps = [
		{
			step: '01',
			title: 'Lovable App Review',
			desc: 'We review your Lovable app, exported code or repo, Supabase setup, authentication flow, database tables, deployment target, and known issues.',
		},
		{
			step: '02',
			title: 'Supabase and Auth Check',
			desc: 'We check whether users can access only their own data, whether RLS policies are enabled, whether admin access is enforced, and whether authentication is safe across private pages and API routes.',
		},
		{
			step: '03',
			title: 'Production Scope',
			desc: 'We define the work needed to move from demo to production: RLS fixes, protected routes, env cleanup, Stripe validation, deployment, monitoring, and QA.',
		},
		{
			step: '04',
			title: 'Fix Production Blockers',
			desc: 'We fix database permissions, exposed secrets, fragile auth, broken builds, incomplete payment logic, and missing server-side access control.',
		},
		{
			step: '05',
			title: 'Deploy and Configure Production',
			desc: 'We prepare Vercel, Railway, Render, AWS, DigitalOcean, or Supabase production settings with domains, env vars, build settings, and runtime configuration.',
		},
		{
			step: '06',
			title: 'QA and Launch Handoff',
			desc: 'We test signup, login, dashboard access, payments, admin access, and error handling — then hand off what was fixed, configured, and what to watch after launch.',
		},
	];

	const checklistCategories = [
		{
			category: 'Supabase',
			items: [
				'Is Row Level Security enabled on private tables?',
				'Do users only access records they own?',
				'Are admin-only tables protected?',
				'Are storage buckets scoped correctly?',
				'Are service-role keys kept server-side?',
				'Are insert, update, select, and delete policies correct?',
			],
		},
		{
			category: 'Authentication',
			items: [
				'Are private routes protected?',
				'Are admin routes protected server-side?',
				'Are sessions handled correctly?',
				'Can users bypass UI restrictions by changing the URL?',
				'Are roles checked in the backend, not only the frontend?',
			],
		},
		{
			category: 'Environment Variables',
			items: [
				'Are public and private variables separated?',
				'Are Stripe secret keys private?',
				'Are Supabase service-role keys protected?',
				'Are production and preview values separated?',
				'Are redirect URLs configured for the production domain?',
			],
		},
		{
			category: 'Deployment',
			items: [
				'Does the app build outside Lovable preview?',
				'Is the correct build command configured?',
				'Are package versions stable?',
				'Is the production domain connected?',
				'Is there a rollback plan?',
			],
		},
		{
			category: 'Payments',
			items: [
				'Are Stripe live keys configured correctly?',
				'Are webhooks verified?',
				'Is the subscription state synced?',
				'Are paid-user permissions enforced?',
				'Are canceled and failed payments handled?',
			],
		},
		{
			category: 'Monitoring',
			items: [
				'Are production errors tracked?',
				'Are important API failures logged?',
				'Can payment problems be detected?',
				'Does the founder know where to check logs?',
			],
		},
	];

	return (
		<div className='w-full relative py-5 select-none'>
			<div className='absolute w-full left-0 top-0 h-[400px] z-0 overflow-hidden pointer-events-none opacity-30'>
				<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
					<defs>
						<pattern id='lovable-grid' width='24' height='24' patternUnits='userSpaceOnUse'>
							<path d='M 24 0 L 0 0 0 24' fill='none' stroke='currentColor' strokeWidth='0.5' className='text-base-content/20' />
						</pattern>
					</defs>
					<rect width='100%' height='100%' fill='url(#lovable-grid)' />
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
						From Lovable to Production
					</h1>

					<h2 className='text-2xl md:text-3xl text-primary font-bold mb-6'>
						Can you launch a Lovable-built app in production?
					</h2>

					<p className='text-lg md:text-xl text-base-content/80 mb-6 max-w-3xl mx-auto leading-relaxed'>
						Yes. A Lovable-built app can become a real production product, but it should be reviewed before real users,
						payments, private data, or customer accounts are involved. Lovable is strong for quickly building working app
						demos, but production usually requires extra work around Supabase security, authentication, environment variables,
						deployment configuration, monitoring, payment flows, and database permissions.
					</p>

					<p className='text-base md:text-lg text-base-content/70 mb-10 max-w-2xl mx-auto'>
						VibeToLive helps founders move Lovable apps from preview mode to production without rebuilding the entire product.
					</p>

					<div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-16'>
						<a
							href='mailto:hello@vibetolive.dev?subject=Launch%20My%20Lovable%20App'
							className='btn btn-wide btn-primary rounded-full hover:scale-105 transition-all text-primary-content font-bold shadow-lg shadow-primary/20'
						>
							Launch My Lovable App
						</a>
						<a
							href='mailto:hello@vibetolive.dev?subject=Request%20Lovable%20App%20Review'
							className='btn btn-wide btn-outline rounded-full hover:bg-base-content hover:text-base-100 transition-all font-semibold'
						>
							Request a Lovable App Review
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
							<FaRocket />
						</span>
						A production-ready Lovable app usually needs:
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
						VibeToLive is built for founders who created a working app in Lovable and now need experienced engineering help
						to make it safe, reliable, and ready for real users.
					</p>
				</motion.div>

				<div className='mt-16 w-full max-w-5xl'>
					<p className='text-center text-xs md:text-sm font-semibold uppercase tracking-wider text-base-content/40 mb-6'>
						Common Lovable production stack
					</p>
					<div className='flex flex-wrap gap-3 justify-center'>
						{LOVABLE_STACK.map((tech, idx) => (
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

			{/* Lovable demos vs production */}
			<section className='relative z-10 py-10 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-10'>
					<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
						<FaExclamationTriangle className='text-amber-500' /> Lovable Reality Check
					</div>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						Lovable Is Great for Demos. Production Needs More.
					</h2>
					<p className='text-lg text-base-content/75 leading-relaxed mb-4'>
						Lovable helps founders build fast. You can describe an idea, generate screens, connect data, build flows, and
						create a working product demo much faster than traditional development. That speed is valuable.
					</p>
					<p className='text-lg text-base-content/75 leading-relaxed'>
						But a Lovable preview is not the same as a production application. The most common Lovable production gap is not
						the UI — it is the layer underneath the UI: authentication, Supabase permissions, environment variables,
						deployment setup, payments, and monitoring.
					</p>
				</div>
			</section>

			<div className='border-t border-base-content/10 my-10 max-w-6xl mx-auto' />

			{/* What it means */}
			<section className='relative z-10 py-10 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-12'>
					<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
						<FaShieldAlt className='text-primary' /> Core Definition
					</div>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						What “From Lovable to Production” Means
					</h2>
					<p className='text-lg text-base-content/75 leading-relaxed'>
						Moving from Lovable to production means taking the app you built in Lovable and preparing it for real users —
						including Supabase access rules, authentication gaps, deployment, payment flows, and monitoring.
					</p>
				</div>

				<div className='bg-base-200/40 border border-base-content/10 p-6 md:p-8 rounded-2xl max-w-4xl mx-auto'>
					<h3 className='text-lg font-bold mb-4'>A production Lovable app should answer these questions clearly:</h3>
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
						If the answer is unclear, the app is still in the prototype stage.
					</p>
				</div>
			</section>

			<div className='border-t border-base-content/10 my-10 max-w-6xl mx-auto' />

			{/* Common problems */}
			<section className='relative z-10 py-10 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-12'>
					<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
						<MdWarning className='text-red-500' /> Lovable-Specific Risks
					</div>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						Common Lovable Production Problems
					</h2>
					<p className='text-lg text-base-content/75'>
						Lovable apps often look ready before they are fully production-ready. These are the issues VibeToLive commonly
						checks before launch.
					</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{lovableProblems.map((problem, idx) => (
						<motion.div
							key={idx}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: idx * 0.04 }}
							viewport={{ once: true }}
							className='bg-base-100 border border-base-content/10 p-6 rounded-xl hover:border-primary/40 transition-all'
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
							How VibeToLive Helps With Lovable Apps
						</h2>
						<p className='text-lg text-base-content/75 mb-6 leading-relaxed'>
							We do not start by assuming the app needs to be rebuilt. We review what Lovable already generated, identify
							what is usable, and fix the areas that create launch risk.
						</p>
						<p className='text-base-content/70 mb-6'>
							The goal is simple: keep the speed of Lovable, remove the hidden production risks, and help you launch with
							confidence.
						</p>
					</div>

					<div className='grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2'>
						{[
							'Lovable app review',
							'Supabase RLS and policy review',
							'Database permission cleanup',
							'Authentication hardening',
							'Protected route fixes',
							'Admin access review',
							'API route protection',
							'Environment variable cleanup',
							'Stripe payment review',
							'Webhook verification',
							'Production deployment setup',
							'Monitoring and error tracking',
							'QA across real user flows',
							'Production-readiness handoff',
						].map((tag, idx) => (
							<div key={idx} className='flex items-center gap-2'>
								<span className='text-primary'>
									<FaCheck size={12} />
								</span>
								<span className='text-sm text-base-content/85'>{tag}</span>
							</div>
						))}
					</div>
				</div>
			</section>

			<div className='border-t border-base-content/10 my-10 max-w-6xl mx-auto' />

			{/* Process */}
			<section className='relative z-10 py-10 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-12'>
					<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
						<FaCogs className='text-primary' /> Delivery Path
					</div>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						Our Lovable to Production Process
					</h2>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{processSteps.map((item, idx) => (
						<motion.div
							key={idx}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: idx * 0.05 }}
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

			{/* Checklist */}
			<section className='relative z-10 py-10 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-12'>
					<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
						<MdOutlineFeaturedPlayList className='text-primary' /> Pre-Launch Checklist
					</div>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						Lovable Production Checklist
					</h2>
					<p className='text-lg text-base-content/75'>
						Before launching a Lovable app, review these areas. If several are missing, the app is not ready for real users
						yet.
					</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{checklistCategories.map((check, idx) => (
						<div key={idx} className='border border-base-content/10 bg-base-100 p-5 rounded-xl'>
							<h3 className='font-bold text-base border-b border-base-content/10 pb-2 mb-4 flex items-center gap-2'>
								{check.category === 'Supabase' && <FaDatabase className='text-primary' />}
								{check.category === 'Authentication' && <FaLock className='text-primary' />}
								{check.category === 'Environment Variables' && <FaKey className='text-primary' />}
								{check.category === 'Deployment' && <FaServer className='text-primary' />}
								{check.category === 'Payments' && <FaCreditCard className='text-primary' />}
								{check.category === 'Monitoring' && <FaChartLine className='text-primary' />}
								{check.category}
							</h3>
							<ul className='space-y-2 text-xs text-base-content/85'>
								{check.items.map((item, itemIdx) => (
									<li key={itemIdx} className='flex gap-2 items-start'>
										<span className='text-primary mt-0.5'>
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
						Depending on the condition of your Lovable app, your production handoff may include:
					</p>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto text-sm text-base-content/95'>
					{[
						'Lovable app production review',
						'Supabase RLS and database policy audit',
						'Auth and protected-route fixes',
						'Admin access hardening',
						'Environment variable cleanup',
						'API route protection',
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
								'Founders who built an app in Lovable',
								'Non-technical founders preparing to launch',
								'Startups using Lovable for an MVP',
								'Builders who connected Lovable with Supabase',
								'Founders adding Stripe or paid access',
								'Apps with dashboards, user accounts, or private data',
								'Teams that need help moving beyond preview mode',
								'Founders who want to avoid a full rebuild',
								'Lovable apps that work in demo but feel risky for production',
							].map((item, idx) => (
								<li key={idx} className='flex items-start gap-2'>
									<span className='text-emerald-500 mt-1'>•</span>
									<span>{item}</span>
								</li>
							))}
						</ul>
						<p className='mt-4 text-xs text-base-content/60'>
							Not for landing page redesigns only — this is for Lovable apps that must work safely with real users.
						</p>
					</div>

					<div className='border border-base-content/10 bg-base-100 p-6 md:p-8 rounded-2xl'>
						<h3 className='text-xl font-bold text-amber-500 mb-6 flex items-center gap-2'>
							<FaExclamationTriangle className='text-xl' /> When Your Lovable App Is Not Ready
						</h3>
						<ul className='space-y-3 text-sm text-base-content/85'>
							{[
								'It works in preview but fails during deployment',
								'You are not sure whether Supabase RLS is configured correctly',
								'Users can access private pages by changing the URL',
								'Admin pages are hidden but not properly secured',
								'Stripe checkout works, but subscription access is unclear',
								'Environment variables are confusing or exposed',
								'The app uses test keys or preview URLs',
								'You have no monitoring after launch',
								'You are afraid to invite real users',
								'The app looks complete, but the backend feels fragile',
							].map((item, idx) => (
								<li key={idx} className='flex items-start gap-2'>
									<span className='text-amber-500 mt-1'>•</span>
									<span>{item}</span>
								</li>
							))}
						</ul>
						<p className='mt-4 text-xs text-base-content/60'>These are normal problems — and fixable before launch.</p>
					</div>
				</div>
			</section>

			{/* Why VibeToLive */}
			<section className='relative z-10 py-10 bg-base-200/40 p-6 md:p-10 rounded-3xl border border-base-content/5 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-8'>
					<h2 className='text-2xl md:text-4xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-4'>
						Why Use VibeToLive for a Lovable App?
					</h2>
					<p className='text-lg text-base-content/75'>
						Lovable gives founders speed. VibeToLive adds the production layer — without forcing a rebuild.
					</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-sm'>
					{[
						{
							title: 'Avoid Launching Too Early',
							desc: 'Prevent launching with unsafe database access, incomplete auth, or missing webhook validation.',
						},
						{
							title: 'Avoid Rebuilding Too Soon',
							desc: 'Keep the UI and flows you validated in Lovable instead of throwing away weeks of product work.',
						},
						{
							title: 'Avoid Demo-Mode Limbo',
							desc: 'Stop adjusting screens in preview while dreading production deployment — we handle the launch barrier.',
						},
					].map((item, idx) => (
						<div key={idx} className='border border-base-content/10 bg-base-100 p-5 rounded-xl'>
							<h3 className='font-bold text-base mb-2 text-primary'>{item.title}</h3>
							<p className='text-xs text-base-content/75 leading-relaxed'>{item.desc}</p>
						</div>
					))}
				</div>
			</section>

			{/* Related guides — links to hub, not competing with it */}
			<section className='relative z-10 py-12 max-w-6xl mx-auto' aria-labelledby='lovable-related-guides'>
				<div className='text-center max-w-3xl mx-auto mb-10'>
					<p className='text-sm font-semibold uppercase tracking-wide text-primary'>Related guides</p>
					<h2 id='lovable-related-guides' className='text-3xl md:text-4xl font-bold mb-4'>
						Explore more production help
					</h2>
					<p className='text-base text-base-content/75'>
						This page focuses on Lovable-specific production problems. For the full AI-builder overview, start with the main
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
									: 'border-base-content/10 hover:border-primary'
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

			{/* Final CTA */}
			<section className='relative z-10 py-16 bg-gradient-to-b from-transparent to-base-200 rounded-3xl border border-base-content/5 p-8 text-center max-w-5xl mx-auto overflow-hidden'>
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,182,0.05),transparent)] pointer-events-none' />
				<div className='relative z-10 max-w-3xl mx-auto'>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						Ready to move your Lovable app from demo to production?
					</h2>
					<p className='text-lg text-base-content/80 mb-8 leading-relaxed'>
						Send your Lovable app, repo, or demo link. VibeToLive will review the production gaps, fix the risky parts, and
						help you launch safely without starting over.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-6'>
						<a
							href='mailto:hello@vibetolive.dev?subject=Launch%20My%20Lovable%20App'
							className='btn btn-wide btn-primary rounded-full hover:scale-105 transition-all font-bold shadow-lg'
						>
							Launch My Lovable App
						</a>
						<a
							href='mailto:hello@vibetolive.dev?subject=Request%20Lovable%20App%20Review'
							className='btn btn-wide btn-outline rounded-full font-semibold hover:bg-base-content hover:text-base-100'
						>
							Request a Lovable App Review
						</a>
					</div>
					<p className='text-xs text-base-content/50'>
						Built in Lovable with Supabase, Stripe, or user accounts? We can help you make it production-ready.
					</p>
				</div>
			</section>
		</div>
	);
}
