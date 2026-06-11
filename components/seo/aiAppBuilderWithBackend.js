'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
	FaRocket,
	FaCheck,
	FaExclamationTriangle,
	FaChevronDown,
	FaDatabase,
	FaLock,
	FaServer,
	FaCreditCard,
	FaUserShield,
	FaCode,
	FaCloud,
} from 'react-icons/fa';
import {
	MdWarning,
	MdCancel,
	MdCheckCircle,
	MdHelpCenter,
	MdOutlineFeaturedPlayList,
} from 'react-icons/md';
import { getHrefForLocale } from '@/lib/seo/site';
import BackendPricing from '@/components/seo/backendPricing';

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
	{ name: 'Supabase', style: 'border-teal-500/20 text-teal-500 bg-teal-500/5 font-bold' },
	{ name: 'Postgres', style: 'border-blue-500/20 text-blue-500 bg-blue-500/5' },
	{ name: 'Firebase', style: 'border-amber-500/20 text-amber-500 bg-amber-500/5' },
	{ name: 'Prisma', style: 'border-violet-500/20 text-violet-500 bg-violet-500/5' },
	{ name: 'Stripe', style: 'border-indigo-500/20 text-indigo-500 bg-indigo-500/5' },
	{ name: 'Next.js API', style: 'border-base-content/20 text-base-content bg-base-content/5' },
];

const RELATED_GUIDES = [
	{ slug: 'ai-prototype-to-production', title: 'AI Prototype to Production', description: 'Main hub for AI-generated app production help.' },
	{ slug: 'from-v0-to-production', title: 'From V0 to Production', description: 'V0 frontend-to-production and backend integration.' },
	{ slug: 'from-lovable-to-production', title: 'From Lovable to Production', description: 'Lovable-specific production help.' },
	{ slug: 'from-bolt-to-production', title: 'From Bolt to Production', description: 'Bolt.new-specific production help.' },
	{ slug: 'from-replit-to-production', title: 'From Replit to Production', description: 'Replit-specific production help.' },
	{ slug: 'from-cursor-to-production', title: 'From Cursor to Production', description: 'Cursor-built app production help.' },
	{ slug: 'ai-app-security-audit', title: 'AI App Security Audit', description: 'Security and permissions review.' },
	{ slug: 'freelancer-to-finish-vibe-coded-app', title: 'Freelancer to Finish Vibe-Coded App', description: 'Finishing bugs and product gaps.' },
	{ slug: 'production-readiness-checklist', title: 'Production Readiness Checklist', description: 'Checklist-style launch readiness guide.' },
];

export default function AiAppBuilderWithBackendPage({ langName = 'en' }) {
	const [activeFaq, setActiveFaq] = useState(null);

	const toggleFaq = (index) => {
		setActiveFaq(activeFaq === index ? null : index);
	};

	const faqItems = [
		{
			question: 'Can you add a backend to an AI-generated app?',
			answer:
				'Yes. VibeToLive can add authentication, database setup, API routes, server actions, form handling, admin logic, Stripe payments, file storage, and production deployment support.',
		},
		{
			question: 'Is VibeToLive an AI app builder tool?',
			answer:
				'No. VibeToLive is a service that adds backend engineering to apps built with AI tools — not another drag-and-drop AI builder.',
		},
		{
			question: 'What backend does my AI app need?',
			answer:
				'Most apps need auth, database storage, ownership rules, API routes, env vars, and form validation. Paid apps also need Stripe checkout, webhooks, and paid-user logic.',
		},
		{
			question: 'Can you connect my AI app to Supabase?',
			answer:
				'Yes. Tables, Row Level Security, auth integration, storage buckets, policies, service-role usage, and user ownership rules.',
		},
		{
			question: 'Can you connect my AI app to Postgres or Firebase?',
			answer:
				'Yes. Postgres, Supabase, Firebase, Neon, Railway Postgres, Render Postgres, MongoDB, or another suitable database depending on your needs.',
		},
		{
			question: 'Can you add Stripe payments to the backend?',
			answer:
				'Yes. Stripe checkout, webhook verification, subscription syncing, paid-user access, cancellations, failed payments, and customer portal setup.',
		},
		{
			question: 'Can you add admin features?',
			answer:
				'Yes. Admin dashboards, owner tools, moderation screens, and admin-only API actions with backend role checks.',
		},
		{
			question: 'Can you work with a V0-generated frontend?',
			answer:
				'Yes. V0 apps often have strong UI but need backend integration for real data, auth, forms, APIs, Stripe, and deployment.',
		},
		{
			question: 'What should I send for a backend review?',
			answer:
				'App demo, repo, AI tool used, desired user flows, database choice, payment requirements, admin needs, and launch goal.',
		},
		{
			question: 'How long does backend setup take?',
			answer:
				'A simple app may only need auth, database, and form persistence. SaaS apps with subscriptions, admin roles, and complex permissions need a deeper scope.',
		},
	];

	const backendNeeds = [
		'Authentication and session handling',
		'Protected routes and server-side authorization',
		'Database schema and ownership rules',
		'API routes or server actions',
		'Input validation',
		'User dashboards connected to real data',
		'Admin workflows',
		'Stripe checkout and webhook logic',
		'Email or notification workflows',
		'File upload and storage rules',
		'Environment variable setup',
		'Monitoring and error tracking',
		'Production deployment configuration',
	];

	const backendQuestions = [
		'Can users create accounts and stay logged in safely?',
		'Are private pages protected server-side?',
		'Does the app save real data to a real database?',
		'Can users access only the records they own?',
		'Are admin features protected by backend rules?',
		'Are forms validated before database writes?',
		'Are API routes safe and reliable?',
		'Are Stripe webhooks verified?',
		'Is paid-user access enforced server-side?',
		'Are environment variables and secrets protected?',
		'Does the backend work in production, not only preview?',
	];

	const backendGaps = [
		{
			title: 'The UI Uses Mock Data',
			desc: 'Dashboards with realistic charts may still be prototypes without real backend data.',
			bullets: ['Database queries and API responses', 'Authenticated user data', 'Payment/subscription state', 'Saved form submissions'],
		},
		{
			title: 'Forms Do Not Save Correctly',
			desc: 'Beautiful forms need server-side validation and safe persistence.',
			bullets: ['Server-side validation', 'Permission checks', 'Database writes', 'Duplicate submission handling'],
		},
		{
			title: 'Authentication Is Visual, Not Fully Enforced',
			desc: 'A login screen is not the same as a secure auth system.',
			bullets: ['Protected routes and session handling', 'Server-side authorization', 'Admin restrictions', 'Password reset behavior'],
		},
		{
			title: 'Database Access Is Too Open or Missing',
			desc: 'Connecting a database is not enough — access rules must match the product.',
			bullets: ['Supabase, Firebase, Postgres, Prisma', 'Who can read, create, update, delete', 'Ownership and team scoping', 'Migration planning'],
		},
		{
			title: 'Supabase RLS Needs Review',
			desc: 'Production Supabase apps need Row Level Security that matches the product.',
			bullets: ['RLS enabled on private tables', 'Insert/update/delete policies', 'Storage bucket permissions', 'Service-role key usage'],
		},
		{
			title: 'API Routes Need Server-Side Rules',
			desc: 'Production APIs need validation and authorization.',
			bullets: ['Session verification', 'Ownership checks before DB access', 'Admin-only action restrictions', 'Private keys server-side'],
		},
		{
			title: 'Payments Need Backend Enforcement',
			desc: 'A checkout button does not complete a payment system.',
			bullets: ['Webhook signature verification', 'Subscription state syncing', 'Paid-user access enforcement', 'Cancellation handling'],
		},
		{
			title: 'Admin Features Need Real Authorization',
			desc: 'Admin pages need backend protection, not hidden nav links.',
			bullets: ['Role-based access control', 'Admin-only database queries', 'Protected mutations', 'Direct URL access testing'],
		},
	];

	const processSteps = [
		{ step: '01', title: 'App and Backend Review', desc: 'Review app, AI builder, repo, UI flows, database, auth, payments, admin features, and launch goal.' },
		{ step: '02', title: 'Backend Scope', desc: 'Define user accounts, dashboards, admin workflows, APIs, payments, email, file uploads, and team accounts.' },
		{ step: '03', title: 'Database and Data Model', desc: 'Tables, relationships, ownership rules, indexes, RLS policies, storage buckets, and migrations.' },
		{ step: '04', title: 'Auth and Permission Layer', desc: 'Protected routes, server-side checks, role logic, user ownership, admin restrictions, and sessions.' },
		{ step: '05', title: 'API and Business Logic', desc: 'API routes, server actions, validation, integrations, payment logic, admin mutations, and file handling.' },
		{ step: '06', title: 'Deployment and Environment Setup', desc: 'Env vars, database URLs, API keys, Stripe secrets, hosting settings, domains, and logs.' },
		{ step: '07', title: 'QA and Handoff', desc: 'Test backend-connected flows and document what was built, connected services, env vars, and next steps.' },
	];

	const checklistCategories = [
		{
			category: 'Authentication',
			icon: 'lock',
			items: ['Can users sign up and log in?', 'Are private routes protected?', 'Are roles enforced server-side?', 'Can direct URL access bypass restrictions?'],
		},
		{
			category: 'Database',
			icon: 'database',
			items: ['Is real data stored in production?', 'Are ownership rules enforced?', 'Are read/write/delete permissions safe?', 'Are migrations or indexes needed?'],
		},
		{
			category: 'API Routes',
			icon: 'code',
			items: ['Are API routes authenticated?', 'Is input validated server-side?', 'Are admin actions restricted?', 'Are private keys kept server-side?'],
		},
		{
			category: 'Forms',
			icon: 'server',
			items: ['Do forms save correctly?', 'Are required fields enforced?', 'Are invalid submissions rejected?', 'Can users only edit their own records?'],
		},
		{
			category: 'Payments',
			icon: 'payment',
			items: ['Is Stripe checkout connected?', 'Are webhooks verified?', 'Is subscription state synced?', 'Is paid access enforced server-side?'],
		},
		{
			category: 'Admin',
			icon: 'shield',
			items: ['Are admin pages protected?', 'Are admin actions checked server-side?', 'Are admin queries restricted?', 'Are sensitive actions logged?'],
		},
		{
			category: 'Deployment',
			icon: 'cloud',
			items: ['Are environment variables configured?', 'Are production database URLs set?', 'Are secrets kept private?', 'Are logs available?'],
		},
	];

	const checklistIcon = (type) => {
		switch (type) {
			case 'lock':
				return <FaLock className='text-primary' />;
			case 'database':
				return <FaDatabase className='text-primary' />;
			case 'code':
				return <FaCode className='text-primary' />;
			case 'server':
				return <FaServer className='text-primary' />;
			case 'payment':
				return <FaCreditCard className='text-primary' />;
			case 'shield':
				return <FaUserShield className='text-primary' />;
			case 'cloud':
				return <FaCloud className='text-primary' />;
			default:
				return <FaCheck className='text-primary' />;
		}
	};

	return (
		<div className='w-full relative py-5 select-none'>
			<div className='absolute w-full left-0 top-0 h-[400px] z-0 overflow-hidden pointer-events-none opacity-30'>
				<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
					<defs>
						<pattern id='backend-grid' width='24' height='24' patternUnits='userSpaceOnUse'>
							<path d='M 24 0 L 0 0 0 24' fill='none' stroke='currentColor' strokeWidth='0.5' className='text-base-content/20' />
						</pattern>
					</defs>
					<rect width='100%' height='100%' fill='url(#backend-grid)' />
				</svg>
				<div className='absolute inset-0 bg-gradient-to-b from-transparent to-base-100' />
			</div>

			<section className='relative z-10 py-12 lg:py-20 flex flex-col items-center'>
				<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className='text-center max-w-4xl'>
					<h1 className='font-bold text-4xl md:text-6xl lg:text-7xl bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] text-center bg-clip-text text-transparent !leading-[1.2em] mb-6 tracking-tight'>
						AI App Builder With Backend
					</h1>
					<h2 className='text-2xl md:text-3xl text-primary font-bold mb-6'>Can you add a real backend to an AI-built app?</h2>
					<p className='text-lg md:text-xl text-base-content/80 mb-6 max-w-3xl mx-auto leading-relaxed'>
						Yes. Most AI-generated prototypes need extra engineering before they can support users, data, payments, admin
						actions, API routes, and production workflows.
					</p>
					<p className='text-base md:text-lg text-base-content/70 mb-4 max-w-2xl mx-auto'>
						VibeToLive helps founders add real backend systems to apps built with Lovable, Bolt.new, V0, Cursor, Replit,
						ChatGPT, Claude, Windsurf, Base44, and other AI-assisted tools.
					</p>
					<p className='text-sm text-base-content/60 mb-10 max-w-xl mx-auto italic'>
						VibeToLive is not another AI app builder — it is the engineering layer that turns your AI-generated interface
						into a real app with a working backend.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-16'>
						<a href='mailto:hello@vibetolive.dev?subject=Add%20Backend%20to%20My%20AI%20App' className='btn btn-wide btn-primary rounded-full hover:scale-105 transition-all text-primary-content font-bold shadow-lg shadow-primary/20'>
							Add Backend to My AI App
						</a>
						<a href='mailto:hello@vibetolive.dev?subject=Request%20Backend%20Review' className='btn btn-wide btn-outline rounded-full hover:bg-base-content hover:text-base-100 transition-all font-semibold'>
							Request a Backend Review
						</a>
					</div>
				</motion.div>

				<motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className='w-full max-w-4xl bg-base-200 border border-base-content/10 p-6 md:p-8 rounded-2xl shadow-sm relative overflow-hidden'>
					<h3 className='text-xl md:text-2xl font-bold mb-6 flex items-center gap-2'>
						<span className='p-2 bg-primary/10 text-primary rounded-lg'><FaRocket /></span>
						A backend-ready AI app usually needs:
					</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{backendNeeds.map((item, idx) => (
							<div key={idx} className='flex items-start gap-3'>
								<span className='text-emerald-500 mt-1'><FaCheck size={14} /></span>
								<span className='text-base-content/80 text-sm md:text-base'>{item}</span>
							</div>
						))}
					</div>
				</motion.div>

				<div className='mt-16 w-full max-w-5xl space-y-8'>
					<div>
						<p className='text-center text-xs md:text-sm font-semibold uppercase tracking-wider text-base-content/40 mb-4'>AI tools we add backends to</p>
						<div className='flex flex-wrap gap-2 justify-center'>
							{AI_BUILDERS.map((name) => (
								<span key={name} className='px-3 py-1.5 border border-primary/20 text-primary bg-primary/5 rounded-full text-xs font-medium'>{name}</span>
							))}
						</div>
					</div>
					<div>
						<p className='text-center text-xs md:text-sm font-semibold uppercase tracking-wider text-base-content/40 mb-4'>Common backend stack</p>
						<div className='flex flex-wrap gap-3 justify-center'>
							{TECH_STACK.map((tech) => (
								<span key={tech.name} className={`px-4 py-2 border rounded-full text-xs md:text-sm font-medium ${tech.style}`}>{tech.name}</span>
							))}
						</div>
					</div>
				</div>
			</section>

			<div className='border-t border-base-content/10 my-10 max-w-6xl mx-auto' />

			<section className='relative z-10 py-10 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-10'>
					<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
						<FaExclamationTriangle className='text-amber-500' /> Backend Reality
					</div>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						AI App Builders Are Fast. Backend Work Still Matters.
					</h2>
					<p className='text-lg text-base-content/75 leading-relaxed mb-4'>
						Many AI-generated apps are front-end-heavy — polished dashboards with mock data, login pages without full
						protection, pricing pages without Stripe wiring, and admin panels without role checks.
					</p>
					<p className='text-lg text-base-content/75 leading-relaxed'>
						A real backend stores data, protects accounts, validates actions, handles payments, and gives you control over
						production behavior — without throwing away the AI-generated work you already have.
					</p>
				</div>
			</section>

			<div className='border-t border-base-content/10 my-10 max-w-6xl mx-auto' />

			<section className='relative z-10 py-10 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-12'>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						What “AI App Builder With Backend” Should Mean
					</h2>
					<p className='text-lg text-base-content/75'>
						We help founders take AI-built apps and add the backend systems needed for a real product — not a
						drag-and-drop AI tool.
					</p>
				</div>
				<div className='bg-base-200/40 border border-base-content/10 p-6 md:p-8 rounded-2xl max-w-4xl mx-auto'>
					<h3 className='text-lg font-bold mb-4'>A backend-ready AI app should answer:</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
						{backendQuestions.map((q, idx) => (
							<div key={idx} className='flex items-start gap-2 text-sm text-base-content/85'>
								<span className='text-emerald-500 mt-0.5'><FaCheck size={10} /></span>
								<span>{q}</span>
							</div>
						))}
					</div>
					<p className='mt-6 text-sm text-base-content/70 italic'>If the app cannot answer these yet, it needs backend work before launch.</p>
				</div>
			</section>

			<div className='border-t border-base-content/10 my-10 max-w-6xl mx-auto' />

			<section className='relative z-10 py-10 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-12'>
					<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
						<MdWarning className='text-red-500' /> Common Gaps
					</div>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						Common Backend Gaps in AI-Generated Apps
					</h2>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{backendGaps.map((gap, idx) => (
						<motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: idx * 0.03 }} viewport={{ once: true }} className='bg-base-100 border border-base-content/10 p-6 rounded-xl hover:border-primary/40 transition-all'>
							<h3 className='text-lg font-bold mb-2'>{gap.title}</h3>
							<p className='text-sm text-base-content/70 mb-4'>{gap.desc}</p>
							<ul className='space-y-1.5'>
								{gap.bullets.map((bullet, i) => (
									<li key={i} className='flex items-start gap-2 text-xs text-base-content/80'>
										<span className='text-red-400 mt-0.5'><MdCancel size={12} /></span>
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
							How VibeToLive Adds Backend to AI-Built Apps
						</h2>
						<p className='text-lg text-base-content/75'>Connect the interface to reliable backend behavior.</p>
					</div>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2'>
						{[
							'Backend architecture planning', 'Database schema setup', 'Supabase, Firebase, Postgres integration',
							'API routes and server actions', 'Authentication setup', 'Protected-route implementation',
							'User ownership rules', 'Admin role logic', 'Form validation and persistence',
							'Stripe checkout and webhooks', 'Email and notification workflows', 'File upload permissions',
							'Environment variable cleanup', 'Deployment configuration', 'Monitoring and error tracking', 'QA across real user flows',
						].map((tag, idx) => (
							<div key={idx} className='flex items-center gap-2'>
								<span className='text-emerald-500'><FaCheck size={12} /></span>
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
						Our Backend Build Process
					</h2>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
					{processSteps.map((item, idx) => (
						<motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: idx * 0.04 }} viewport={{ once: true }} className='bg-base-100 border border-base-content/10 p-6 rounded-2xl relative overflow-hidden group hover:border-primary transition-all'>
							<div className='absolute right-4 top-4 text-5xl font-extrabold text-base-content/5 group-hover:text-primary/10 transition-colors'>{item.step}</div>
							<h3 className='text-lg font-bold mb-3 pr-10'>{item.title}</h3>
							<p className='text-sm text-base-content/70 leading-relaxed'>{item.desc}</p>
						</motion.div>
					))}
				</div>
			</section>

			<div className='border-t border-base-content/10 my-10 max-w-6xl mx-auto' />

			<section className='relative z-10 py-10 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-12'>
					<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
						<MdOutlineFeaturedPlayList className='text-primary' /> Backend Checklist
					</div>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						AI App Backend Checklist
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
								{check.items.map((item, i) => (
									<li key={i} className='flex gap-2 items-start'>
										<span className='text-emerald-500 mt-0.5'><FaCheck size={10} /></span>
										<span>{item}</span>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</section>

			<section className='relative z-10 py-10 bg-base-200/30 p-6 md:p-10 rounded-3xl border border-base-content/5 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-10'>
					<h2 className='text-2xl md:text-4xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-4'>What You Get</h2>
				</div>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto text-sm'>
					{[
						'Backend readiness review', 'Database schema setup', 'Supabase/Firebase/Postgres integration',
						'API routes or server actions', 'Authentication setup', 'Protected route fixes',
						'User ownership rules', 'Admin access logic', 'Form validation and persistence',
						'Stripe checkout and webhook setup', 'File upload permissions', 'Environment variable cleanup',
						'Deployment setup', 'Monitoring recommendations', 'QA notes', 'Founder-friendly backend handoff',
					].map((item, idx) => (
						<div key={idx} className='flex items-center gap-2.5 p-3 bg-base-100 rounded-xl border border-base-content/5'>
							<span className='text-emerald-500'><FaCheck size={12} /></span>
							<span>{item}</span>
						</div>
					))}
				</div>
			</section>

			<BackendPricing />

			<section className='relative z-10 py-10 max-w-6xl mx-auto'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<div className='border border-base-content/10 bg-base-100 p-6 md:p-8 rounded-2xl'>
						<h3 className='text-xl font-bold text-emerald-500 mb-6'>Who This Service Is For</h3>
						<ul className='space-y-3 text-sm text-base-content/85'>
							{[
								'Founders with AI-generated frontend apps',
								'Builders who used V0 and need backend integration',
								'Lovable or Bolt users with incomplete backend logic',
								'Cursor or Replit users who need backend cleanup',
								'Apps with mock data that needs to become real data',
								'Apps that need authentication and database setup',
								'Apps adding Stripe or subscriptions',
								'Apps needing admin workflows',
								'Teams that want to avoid rebuilding the frontend',
							].map((item, idx) => (
								<li key={idx} className='flex items-start gap-2'><span className='text-emerald-500 mt-1'>•</span><span>{item}</span></li>
							))}
						</ul>
						<p className='mt-4 text-xs text-base-content/60'>Not for someone looking for a no-code AI builder — for founders who need backend engineering.</p>
					</div>
					<div className='border border-base-content/10 bg-base-100 p-6 md:p-8 rounded-2xl'>
						<h3 className='text-xl font-bold text-amber-500 mb-6'>When You Need a Backend</h3>
						<ul className='space-y-3 text-sm text-base-content/85'>
							{[
								'Your app has screens but no real data',
								'Forms do not save anywhere',
								'The dashboard uses mock data',
								'You need user accounts or private user data',
								'You need admin features or Stripe subscriptions',
								'You need file uploads or API integrations',
								'You are unsure how data should be stored',
								'The app works visually but does not function as a product',
							].map((item, idx) => (
								<li key={idx} className='flex items-start gap-2'><span className='text-amber-500 mt-1'>•</span><span>{item}</span></li>
							))}
						</ul>
					</div>
				</div>
			</section>

			<section className='relative z-10 py-10 bg-base-200/40 p-6 md:p-10 rounded-3xl border border-base-content/5 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-8'>
					<h2 className='text-2xl md:text-4xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-4'>
						Why Use VibeToLive for AI App Backend Work?
					</h2>
					<p className='text-lg text-base-content/75'>Practical backend that matches your product stage — not slow, overbuilt development.</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-sm'>
					{[
						{ title: 'Do Not Launch Frontend-Only', desc: 'A polished UI is not a complete product without real backend behavior.' },
						{ title: 'Add Backend With Security', desc: 'Backend logic needs proper permissions, not just connected databases.' },
						{ title: 'Connect, Do Not Rebuild', desc: 'Your existing AI-generated UI can often be connected to a real backend.' },
					].map((item, idx) => (
						<div key={idx} className='border border-base-content/10 bg-base-100 p-5 rounded-xl'>
							<h3 className='font-bold text-base mb-2 text-primary'>{item.title}</h3>
							<p className='text-xs text-base-content/75 leading-relaxed'>{item.desc}</p>
						</div>
					))}
				</div>
			</section>

			<section className='relative z-10 py-12 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-10'>
					<p className='text-sm font-semibold uppercase tracking-wide text-primary'>Related guides</p>
					<h2 className='text-3xl md:text-4xl font-bold mb-4'>More production help</h2>
				</div>
				<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
					{RELATED_GUIDES.map((guide) => (
						<a key={guide.slug} href={getHrefForLocale(`/${guide.slug}`, langName)} className={`group rounded-lg border p-5 transition hover:bg-base-200 ${guide.slug === 'ai-prototype-to-production' ? 'border-primary bg-primary/5 hover:border-primary' : 'border-base-content/10 hover:border-primary'}`}>
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
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent'>Frequently Asked Questions</h2>
				</div>
				<div className='space-y-4'>
					{faqItems.map((item, idx) => (
						<div key={idx} className='border border-base-content/10 rounded-xl overflow-hidden bg-base-100'>
							<button type='button' onClick={() => toggleFaq(idx)} className='w-full flex items-center justify-between p-5 text-left font-bold text-sm md:text-base hover:bg-base-200/40 transition-colors'>
								<span>{item.question}</span>
								<FaChevronDown className={`transition-transform duration-200 text-xs text-base-content/40 flex-shrink-0 ml-4 ${activeFaq === idx ? 'transform rotate-180 text-primary' : ''}`} />
							</button>
							{activeFaq === idx && (
								<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} transition={{ duration: 0.2 }} className='border-t border-base-content/5 px-5 py-4 text-xs md:text-sm text-base-content/85 leading-relaxed bg-base-200/10'>
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
						Need a real backend for your AI-built app?
					</h2>
					<p className='text-lg text-base-content/80 mb-8 leading-relaxed'>
						Send your app, repo, or demo link. VibeToLive will review the current interface, define the backend scope, and
						help connect the app to real users, data, payments, and production workflows.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-6'>
						<a href='mailto:hello@vibetolive.dev?subject=Add%20Backend%20to%20My%20AI%20App' className='btn btn-wide btn-primary rounded-full hover:scale-105 transition-all font-bold shadow-lg'>Add Backend to My AI App</a>
						<a href='mailto:hello@vibetolive.dev?subject=Request%20Backend%20Review' className='btn btn-wide btn-outline rounded-full font-semibold hover:bg-base-content hover:text-base-100'>Request a Backend Review</a>
					</div>
					<p className='text-xs text-base-content/50'>
						Built with Lovable, Bolt.new, V0, Cursor, Replit, ChatGPT, Claude, Windsurf, or Base44? We can add the backend layer your app needs.
					</p>
				</div>
			</section>
		</div>
	);
}
