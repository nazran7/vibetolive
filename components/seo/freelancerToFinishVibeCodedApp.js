'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
	FaRocket,
	FaCheck,
	FaExclamationTriangle,
	FaChevronDown,
	FaBug,
	FaCode,
	FaLock,
	FaPaintBrush,
	FaUserCog,
} from 'react-icons/fa';
import {
	MdWarning,
	MdCancel,
	MdCheckCircle,
	MdHelpCenter,
} from 'react-icons/md';
import { getHrefForLocale } from '@/lib/seo/site';
import FinishPricing from '@/components/seo/finishPricing';

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
	{ name: 'Firebase', style: 'border-amber-500/20 text-amber-500 bg-amber-500/5' },
	{ name: 'Vercel', style: 'border-base-content/20 text-base-content bg-base-content/5' },
	{ name: 'Railway', style: 'border-indigo-500/20 text-indigo-500 bg-indigo-500/5' },
];

const RELATED_GUIDES = [
	{
		slug: 'ai-prototype-to-production',
		title: 'AI Prototype to Production',
		description: 'Main hub for production-ready AI apps.',
	},
	{
		slug: 'ai-app-security-audit',
		title: 'AI App Security Audit',
		description: 'Security review before launch.',
	},
	{
		slug: 'from-lovable-to-production',
		title: 'From Lovable to Production',
		description: 'Lovable-specific production help.',
	},
	{
		slug: 'from-bolt-to-production',
		title: 'From Bolt to Production',
		description: 'Bolt.new-specific production help.',
	},
	{
		slug: 'from-v0-to-production',
		title: 'From V0 to Production',
		description: 'V0-generated app production help.',
	},
	{
		slug: 'from-replit-to-production',
		title: 'From Replit to Production',
		description: 'Replit-specific production help.',
	},
	{
		slug: 'from-cursor-to-production',
		title: 'From Cursor to Production',
		description: 'Cursor-built app production help.',
	},
	{
		slug: 'production-readiness-checklist',
		title: 'Production Readiness Checklist',
		description: 'Checklist-style launch readiness guide.',
	},
];

export default function FreelancerToFinishVibeCodedAppPage({ langName = 'en' }) {
	const [activeFaq, setActiveFaq] = useState(null);

	const toggleFaq = (index) => {
		setActiveFaq(activeFaq === index ? null : index);
	};

	const faqItems = [
		{
			question: 'Can I hire someone to finish my vibe-coded app?',
			answer:
				'Yes. Many vibe-coded apps can be finished without rebuilding everything. VibeToLive reviews the current app, identifies what is missing, fixes the highest-impact blockers, and helps complete the product flow.',
		},
		{
			question: 'Do I need a freelancer or a full development agency?',
			answer:
				'It depends on the app’s condition. Close apps needing bug fixes, deployment, or backend cleanup may only need a focused finish sprint. Apps with complex payments, private data, or major architecture issues may need a larger production-hardening scope.',
		},
		{
			question: 'Do I need to rebuild my AI-generated app from scratch?',
			answer:
				'Usually, no. Many AI-generated apps have useful UI, product direction, and working flows. VibeToLive keeps what works and fixes what blocks launch.',
		},
		{
			question: 'What kinds of vibe-coded apps can you finish?',
			answer:
				'Apps built with Lovable, Bolt.new, V0, Cursor, Replit, ChatGPT, Claude, Windsurf, Base44, and custom AI-assisted codebases — commonly using Next.js, React, Supabase, Firebase, Postgres, Stripe, Vercel, Railway, or AWS.',
		},
		{
			question: 'What are the most common unfinished parts of AI-built apps?',
			answer:
				'Backend logic, authentication, protected routes, database permissions, Supabase RLS, Stripe webhooks, environment variables, deployment settings, form validation, real data wiring, monitoring, and QA.',
		},
		{
			question: 'Can you fix bugs that AI tools keep failing to fix?',
			answer:
				'Yes. VibeToLive reviews the codebase, finds the root cause, fixes the bug carefully, and checks the affected flow so one fix does not create a new problem.',
		},
		{
			question: 'Can you finish the backend of my vibe-coded app?',
			answer:
				'Yes. VibeToLive can help with API routes, server actions, database queries, authentication, user ownership rules, admin access, validation, payment logic, and third-party integrations.',
		},
		{
			question: 'Can you help finish Stripe or subscription features?',
			answer:
				'Yes. VibeToLive can review or implement Stripe checkout, webhook verification, subscription state syncing, paid-user access, cancellation handling, and customer portal setup.',
		},
		{
			question: 'What should I send for a finish review?',
			answer:
				'Send your repo, demo link, AI tool used, blocker list, deployment target, database setup, payment context, and launch goal. If non-technical, start with the app link and describe what users should be able to do.',
		},
		{
			question: 'How long does it take to finish a vibe-coded app?',
			answer:
				'A small app may only need a focused bug-fix and deployment sprint. A larger app with auth, private data, payments, dashboards, and admin features usually needs a deeper finish scope.',
		},
	];

	const finishingNeeds = [
		'The demo works, but core features are incomplete',
		'The app has bugs that AI keeps failing to fix',
		'Authentication or protected routes are unreliable',
		'Database access or Supabase RLS is unclear',
		'Stripe checkout exists, but paid access is not complete',
		'The app works in preview but fails in production',
		'The UI is close, but important flows need polish',
		'Admin features are hidden but not secure',
		'API routes or server actions need backend review',
		'The founder needs a clear launch checklist and handoff',
	];

	const finishQuestions = [
		'Do the main user flows work from start to finish?',
		'Are bugs fixed instead of being patched randomly?',
		'Does the app use real data instead of mock data?',
		'Are private pages protected?',
		'Can users access only their own records?',
		'Are forms validated and saved correctly?',
		'Are payments and subscriptions handled safely?',
		'Does the app deploy reliably?',
		'Are environment variables configured correctly?',
		'Is there basic monitoring after launch?',
		'Does the founder know what was fixed and what still needs improvement?',
	];

	const commonProblems = [
		{
			title: 'The App Looks Finished, But Core Flows Break',
			desc: 'Polished screens may hide broken full journeys.',
			bullets: [
				'Signup works, but onboarding breaks',
				'Dashboard data does not load',
				'Payment works in test mode, but live access fails',
				'One bug fix creates another bug elsewhere',
			],
		},
		{
			title: 'AI Keeps Fixing One Thing and Breaking Another',
			desc: 'Repeated prompting can create unstable changes once the app gets complex.',
			bullets: [
				'Updates the wrong file or duplicates logic',
				'Fixes symptoms instead of root causes',
				'Removes working code or adds dependencies',
				'Needs codebase review and flow testing',
			],
		},
		{
			title: 'Backend Logic Is Missing or Fragile',
			desc: 'Many vibe-coded apps start with a strong frontend and weak backend.',
			bullets: [
				'API routes without authentication checks',
				'Missing input validation',
				'Admin actions handled only in the UI',
				'Sensitive logic placed in client code',
			],
		},
		{
			title: 'Authentication Is Not Reliable Enough',
			desc: 'Secure auth needs more than a login form.',
			bullets: [
				'Protected routes and session handling',
				'Server-side authorization',
				'Admin role checks',
				'Direct URL access testing',
			],
		},
		{
			title: 'Database Rules Are Too Loose',
			desc: 'The app may save data, but production access may still be unsafe.',
			bullets: [
				'Supabase RLS or Firebase rules',
				'User ownership and admin-only access',
				'Storage bucket permissions',
				'Migration needs',
			],
		},
		{
			title: 'Stripe or Payments Are Half-Finished',
			desc: 'A payment button is not the same as a complete payment system.',
			bullets: [
				'Webhook signature verification',
				'Subscription state syncing',
				'Paid-user access enforcement',
				'Failed payment and cancellation handling',
			],
		},
		{
			title: 'Deployment Fails Outside the Builder',
			desc: 'Preview may work; production may not.',
			bullets: [
				'Missing environment variables',
				'Package conflicts and runtime mismatch',
				'Domain/callback URL issues',
				'Database connection failures',
			],
		},
		{
			title: 'The UI Needs Product Polish',
			desc: 'Sometimes the backend works, but the app still feels unfinished.',
			bullets: [
				'Broken responsive layouts',
				'Missing loading and error states',
				'Placeholder text and mock data in dashboards',
				'Unclear navigation and CTAs',
			],
		},
	];

	const processSteps = [
		{
			step: '01',
			title: 'App Review',
			desc: 'We review your app, repo, demo, stack, known bugs, AI tool used, database, auth, deployment target, and launch goal.',
		},
		{
			step: '02',
			title: 'Finish Scope',
			desc: 'We define what “finished” means — investor demo, beta users, paid customers, or public launch — and scope bug fixes, auth, payments, UI polish, deployment, and QA.',
		},
		{
			step: '03',
			title: 'Fix the Highest-Impact Blockers',
			desc: 'We start with broken core flows, auth problems, unsafe data access, payment issues, failed deployment, or exposed secrets.',
		},
		{
			step: '04',
			title: 'Complete the Product Flow',
			desc: 'We connect signup, onboarding, dashboard data, forms, payments, admin actions, email flows, settings, and file uploads end to end.',
		},
		{
			step: '05',
			title: 'Production Cleanup',
			desc: 'We clean up environment variables, server/client separation, duplicate code, database ownership rules, deployment config, and monitoring.',
		},
		{
			step: '06',
			title: 'QA and Handoff',
			desc: 'We test the most important flows and explain what was fixed, what still needs improvement, and what to watch after launch.',
		},
	];

	return (
		<div className='w-full relative py-5 select-none'>
			<div className='absolute w-full left-0 top-0 h-[400px] z-0 overflow-hidden pointer-events-none opacity-30'>
				<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
					<defs>
						<pattern id='finish-grid' width='24' height='24' patternUnits='userSpaceOnUse'>
							<path d='M 24 0 L 0 0 0 24' fill='none' stroke='currentColor' strokeWidth='0.5' className='text-base-content/20' />
						</pattern>
					</defs>
					<rect width='100%' height='100%' fill='url(#finish-grid)' />
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
						Freelancer to Finish Vibe-Coded App
					</h1>

					<h2 className='text-2xl md:text-3xl text-primary font-bold mb-6'>
						Can you hire someone to finish a vibe-coded app?
					</h2>

					<p className='text-lg md:text-xl text-base-content/80 mb-6 max-w-3xl mx-auto leading-relaxed'>
						Yes. A vibe-coded app can often be finished without rebuilding everything, but it usually needs
						experienced engineering help before it is ready for real users. The remaining work often includes bug
						fixing, backend cleanup, authentication, database permissions, payment flows, deployment, UI polish, QA,
						and production hardening.
					</p>

					<p className='text-base md:text-lg text-base-content/70 mb-10 max-w-2xl mx-auto'>
						VibeToLive helps founders finish apps built with Lovable, Bolt.new, V0, Cursor, Replit, ChatGPT, Claude,
						Windsurf, Base44, and other AI-assisted workflows.
					</p>

					<div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-16'>
						<a
							href='mailto:hello@vibetolive.dev?subject=Finish%20My%20Vibe-Coded%20App'
							className='btn btn-wide btn-primary rounded-full hover:scale-105 transition-all text-primary-content font-bold shadow-lg shadow-primary/20'
						>
							Finish My Vibe-Coded App
						</a>
						<a
							href='mailto:hello@vibetolive.dev?subject=Request%20Finish%20Review'
							className='btn btn-wide btn-outline rounded-full hover:bg-base-content hover:text-base-100 transition-all font-semibold'
						>
							Request a Finish Review
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
						A vibe-coded app usually needs finishing help when:
					</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{finishingNeeds.map((item, idx) => (
							<div key={idx} className='flex items-start gap-3'>
								<span className='text-emerald-500 mt-1'>
									<FaCheck size={14} />
								</span>
								<span className='text-base-content/80 text-sm md:text-base'>{item}</span>
							</div>
						))}
					</div>
					<p className='mt-6 text-sm text-base-content/70 border-t border-base-content/10 pt-4'>
						VibeToLive is built for founders who moved fast with AI and now need expert help finishing the product
						properly.
					</p>
				</motion.div>

				<div className='mt-16 w-full max-w-5xl space-y-8'>
					<div>
						<p className='text-center text-xs md:text-sm font-semibold uppercase tracking-wider text-base-content/40 mb-4'>
							AI tools we finish apps from
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
							Stacks we commonly work with
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
						<FaExclamationTriangle className='text-amber-500' /> Finish Reality
					</div>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						Vibe Coding Gets You Close. Finishing Still Takes Engineering.
					</h2>
					<p className='text-lg text-base-content/75 leading-relaxed mb-4'>
						Vibe coding helps founders move from idea to working demo quickly. But many vibe-coded apps get stuck when
						the app looks close but is not actually finished — signup works sometimes, dashboards use mock data,
						webhooks are unverified, or deployment fails on a real domain.
					</p>
					<p className='text-lg text-base-content/75 leading-relaxed'>
						This is where an experienced engineer becomes valuable. VibeToLive helps finish the app you already started,
						instead of throwing away the work and forcing a full rebuild.
					</p>
				</div>
			</section>

			<div className='border-t border-base-content/10 my-10 max-w-6xl mx-auto' />

			<section className='relative z-10 py-10 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-12'>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						What “Finish a Vibe-Coded App” Means
					</h2>
					<p className='text-lg text-base-content/75 leading-relaxed'>
						Turning a mostly working AI-generated prototype into a usable, reliable product — complete enough for
						testers, investors, early customers, paid users, or public launch.
					</p>
				</div>

				<div className='bg-base-200/40 border border-base-content/10 p-6 md:p-8 rounded-2xl max-w-4xl mx-auto'>
					<h3 className='text-lg font-bold mb-4'>A finished vibe-coded app should answer these questions:</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
						{finishQuestions.map((q, idx) => (
							<div key={idx} className='flex items-start gap-2 text-sm text-base-content/85'>
								<span className='text-emerald-500 mt-0.5'>
									<FaCheck size={10} />
								</span>
								<span>{q}</span>
							</div>
						))}
					</div>
					<p className='mt-6 text-sm text-base-content/70 italic'>
						If those answers are unclear, the app is not finished yet.
					</p>
				</div>
			</section>

			<div className='border-t border-base-content/10 my-10 max-w-6xl mx-auto' />

			<section className='relative z-10 py-10 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-12'>
					<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
						<MdWarning className='text-red-500' /> Common Gaps
					</div>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						Common Problems in Vibe-Coded Apps
					</h2>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{commonProblems.map((problem, idx) => (
						<motion.div
							key={idx}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: idx * 0.03 }}
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

			<section className='relative z-10 py-10 max-w-6xl mx-auto'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
					<div>
						<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
							<MdCheckCircle className='text-emerald-500' /> How We Help
						</div>
						<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
							How VibeToLive Helps Finish Vibe-Coded Apps
						</h2>
						<p className='text-lg text-base-content/75 mb-6 leading-relaxed'>
							We find what is blocking completion and help finish the product without unnecessary rebuilding — turning
							“almost working” into “ready for the next real step.”
						</p>
					</div>

					<div className='grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2'>
						{[
							'Bug fixing',
							'Codebase review',
							'Backend cleanup',
							'Authentication hardening',
							'Database permission review',
							'Supabase RLS fixes',
							'API route cleanup',
							'Stripe checkout and webhooks',
							'UI polish',
							'Form validation',
							'Dashboard data wiring',
							'Deployment setup',
							'Environment variable cleanup',
							'Monitoring and error tracking',
							'Launch QA',
							'Founder-friendly handoff',
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
						Our Process to Finish Your Vibe-Coded App
					</h2>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
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
						'App review and blocker list',
						'Bug fixes',
						'Core-flow completion',
						'Backend cleanup',
						'Auth and protected-route fixes',
						'Database permission review',
						'Supabase RLS or Firebase rules review',
						'API route protection',
						'Stripe/payment completion',
						'UI polish',
						'Responsive fixes',
						'Form validation',
						'Deployment setup',
						'Environment variable cleanup',
						'Monitoring setup',
						'QA notes',
						'Launch-readiness checklist',
						'Next-step recommendations',
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
					This service is flexible because every vibe-coded app gets stuck in a different place.
				</p>
			</section>

			<FinishPricing />

			<section className='relative z-10 py-10 max-w-6xl mx-auto'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<div className='border border-base-content/10 bg-base-100 p-6 md:p-8 rounded-2xl'>
						<h3 className='text-xl font-bold text-emerald-500 mb-6 flex items-center gap-2'>
							<FaUserCog className='text-xl' /> Who This Service Is For
						</h3>
						<ul className='space-y-3 text-sm text-base-content/85'>
							{[
								'Founders who vibe-coded an app and got stuck',
								'Non-technical founders with an AI-generated MVP',
								'Builders who used Lovable, Bolt, V0, Cursor, Replit, Claude, or ChatGPT',
								'Apps that are 60–90% complete but not launch-ready',
								'Founders who need a developer to finish bugs and backend work',
								'Apps with auth, database, payments, dashboards, or admin flows',
								'Startup teams preparing for beta users or investors',
								'Founders who do not want to rebuild from scratch',
								'Teams that need a clear finish scope and handoff',
							].map((item, idx) => (
								<li key={idx} className='flex items-start gap-2'>
									<span className='text-emerald-500 mt-1'>•</span>
									<span>{item}</span>
								</li>
							))}
						</ul>
						<p className='mt-4 text-xs text-base-content/60'>
							Not for a brand-new idea with no prototype — for apps that already exist and need to be finished properly.
						</p>
					</div>

					<div className='border border-base-content/10 bg-base-100 p-6 md:p-8 rounded-2xl'>
						<h3 className='text-xl font-bold text-amber-500 mb-6 flex items-center gap-2'>
							<FaBug className='text-xl' /> When You Need Help Finishing
						</h3>
						<ul className='space-y-3 text-sm text-base-content/85'>
							{[
								'The AI keeps failing to fix the same bug',
								'The app looks done but breaks in real use',
								'You are stuck on auth, database, or deployment',
								'Stripe or payment access is incomplete',
								'The app has too much mock data',
								'The dashboard is not connected to real backend data',
								'Forms do not save correctly',
								'You are afraid to invite real users',
								'The codebase feels messy after many AI edits',
								'You need someone to tell you what is left before launch',
							].map((item, idx) => (
								<li key={idx} className='flex items-start gap-2'>
									<span className='text-amber-500 mt-1'>•</span>
									<span>{item}</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</section>

			<section className='relative z-10 py-10 bg-base-200/40 p-6 md:p-10 rounded-3xl border border-base-content/5 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-8'>
					<h2 className='text-2xl md:text-4xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-4'>
						Why Use VibeToLive Instead of a Generic Freelancer?
					</h2>
					<p className='text-lg text-base-content/75'>
						VibeToLive is focused on AI-built and vibe-coded apps — fast UI, incomplete backend, auth gaps, mock data,
						and AI-created code drift.
					</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-sm'>
					{[
						{
							icon: <FaCode className='text-primary text-xl mb-2' />,
							title: 'Avoid Unnecessary Rebuilds',
							desc: 'Pay for a full rebuild only when the current app truly cannot be finished.',
						},
						{
							icon: <FaLock className='text-primary text-xl mb-2' />,
							title: 'Fix Production Blockers',
							desc: 'Do not hire someone who only fixes surface bugs but ignores auth, data, and payments.',
						},
						{
							icon: <FaPaintBrush className='text-primary text-xl mb-2' />,
							title: 'Stop Fragile AI Prompting',
							desc: 'Do not keep prompting until the app becomes more unstable — get a clear finish plan.',
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

			<section className='relative z-10 py-12 max-w-6xl mx-auto' aria-labelledby='finish-related-guides'>
				<div className='text-center max-w-3xl mx-auto mb-10'>
					<p className='text-sm font-semibold uppercase tracking-wide text-primary'>Related guides</p>
					<h2 id='finish-related-guides' className='text-3xl md:text-4xl font-bold mb-4'>
						More help for vibe-coded apps
					</h2>
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
						Need help finishing your vibe-coded app?
					</h2>
					<p className='text-lg text-base-content/80 mb-8 leading-relaxed'>
						Send your app, repo, or demo link. VibeToLive will review what is left, identify the blockers, and help
						finish the app without unnecessary rebuilding.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-6'>
						<a
							href='mailto:hello@vibetolive.dev?subject=Finish%20My%20Vibe-Coded%20App'
							className='btn btn-wide btn-primary rounded-full hover:scale-105 transition-all font-bold shadow-lg'
						>
							Finish My Vibe-Coded App
						</a>
						<a
							href='mailto:hello@vibetolive.dev?subject=Request%20Finish%20Review'
							className='btn btn-wide btn-outline rounded-full font-semibold hover:bg-base-content hover:text-base-100'
						>
							Request a Finish Review
						</a>
					</div>
					<p className='text-xs text-base-content/50'>
						Built with Lovable, Bolt.new, V0, Cursor, Replit, ChatGPT, Claude, Windsurf, or Base44? We can help
						finish the app and prepare it for launch.
					</p>
				</div>
			</section>
		</div>
	);
}
