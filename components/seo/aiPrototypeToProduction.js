'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
	FaRocket, 
	FaShieldAlt, 
	FaLayerGroup, 
	FaTools, 
	FaShip, 
	FaBrain, 
	FaCheck, 
	FaTimes, 
	FaExclamationTriangle, 
	FaChevronDown,
	FaQuestionCircle,
	FaCogs
} from 'react-icons/fa';
import { 
	FaEarthAsia, 
	FaShield, 
	FaLock,
	FaCode,
	FaDatabase,
	FaKey,
	FaServer,
	FaCreditCard,
	FaChartLine,
	FaVials
} from 'react-icons/fa6';
import { 
	MdOutlineFeaturedPlayList, 
	MdWarning, 
	MdCancel,
	MdCheckCircle,
	MdHelpCenter
} from 'react-icons/md';
import SeoPricing from '@/components/seo/pricing';

// Tech Logos list helper
const TECH_PARTNERS = [
	{ name: 'Lovable', style: 'border-primary/20 text-primary bg-primary/5' },
	{ name: 'Bolt.new', style: 'border-blue-500/20 text-blue-500 bg-blue-500/5' },
	{ name: 'V0', style: 'border-base-content/20 text-base-content bg-base-content/5' },
	{ name: 'Cursor', style: 'border-emerald-500/20 text-emerald-500 bg-emerald-500/5' },
	{ name: 'Replit', style: 'border-red-500/20 text-red-500 bg-red-500/5' },
	{ name: 'ChatGPT', style: 'border-teal-500/20 text-teal-500 bg-teal-500/5' },
	{ name: 'Claude', style: 'border-amber-500/20 text-amber-500 bg-amber-500/5' },
	{ name: 'Windsurf', style: 'border-purple-500/20 text-purple-500 bg-purple-500/5' },
	{ name: 'Base44', style: 'border-indigo-500/20 text-indigo-500 bg-indigo-500/5' },
];

export default function AiPrototypeToProductionPage({ seoData, dict, langName }) {
	const [activeFaq, setActiveFaq] = useState(null);

	const toggleFaq = (index) => {
		setActiveFaq(activeFaq === index ? null : index);
	};

	// 10 FAQs provided in request
	const faqItems = [
		{
			question: 'Can an AI-generated app really be used in production?',
			answer: 'Yes. An AI-generated app can be used in production if the backend, authentication, database permissions, deployment, payments, monitoring, and user flows are reviewed before launch. The issue is not that the app was built with AI. The risk is launching a prototype before the production layer is finished.'
		},
		{
			question: 'Do I need to rebuild my AI app from scratch?',
			answer: 'Usually, no. Many AI-generated apps have useful screens, workflows, and product logic that can be preserved. VibeToLive focuses on reviewing the existing codebase, keeping what works, and fixing the production blockers before recommending a rebuild.'
		},
		{
			question: 'What tools do you support?',
			answer: 'VibeToLive supports apps built with Lovable, Bolt.new, V0, Cursor, Replit, ChatGPT, Claude, Windsurf, Base44, and custom AI-assisted codebases. We also work with common production stacks including Next.js, React, Node.js, TypeScript, Supabase, Firebase, Postgres, Stripe, Vercel, Railway, Render, AWS, and DigitalOcean.'
		},
		{
			question: 'How long does it take to make an AI app production-ready?',
			answer: 'The timeline depends on the size and condition of the app. A simple prototype may only need deployment cleanup, environment variable setup, and basic security review. Apps with payments, teams, admin roles, private data, or complex backend logic usually need a deeper production-hardening scope.'
		},
		{
			question: 'Can you help with Stripe and subscriptions?',
			answer: 'Yes. VibeToLive can review Stripe checkout, webhook verification, customer state, subscription status, paid-user access, canceled-user handling, and payment-related permissions. Payment logic should be tested before real customers use the app.'
		},
		{
			question: 'Can you deploy the app for me?',
			answer: 'Yes. VibeToLive can help deploy your AI-generated app to platforms such as Vercel, Railway, Render, AWS, DigitalOcean, or similar hosting providers. We also help configure environment variables, domains, build settings, runtime behavior, and monitoring.'
		},
		{
			question: 'Is this service only for technical founders?',
			answer: 'No. VibeToLive is especially useful for non-technical and semi-technical founders who used AI tools to build quickly but now need experienced engineering help before launch. You can send a demo link, repo, or current app state, and we can identify what is missing.'
		},
		{
			question: 'What makes an AI prototype different from a production app?',
			answer: 'An AI prototype proves that the idea can work. A production app must safely support real users, private data, payments, deployment updates, monitoring, and failure handling. The production step is where security, reliability, backend logic, and operational readiness are added.'
		},
		{
			question: 'Can you work with messy AI-generated code?',
			answer: 'Yes. AI-generated code often contains duplicate logic, incomplete checks, fragile backend routes, or confusing environment setup. VibeToLive reviews the current codebase, identifies what is usable, and fixes the parts that create production risk.'
		},
		{
			question: 'What should I send for an app review?',
			answer: 'You can send a repo link, demo link, product description, current blocker list, screenshots, deployment target, and any known issues. If the app uses Supabase, Firebase, Stripe, or a hosting platform, include enough context to review the production setup safely.'
		}
	];

	return (
		<div className="w-full relative py-5 select-none">
			{/* Decorative grid pattern background - matches VibeToLive style */}
			<div className="absolute w-full left-0 top-0 h-[400px] z-0 overflow-hidden pointer-events-none opacity-30">
				<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
					<defs>
						<pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
							<path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-base-content/20" />
						</pattern>
					</defs>
					<rect width="100%" height="100%" fill="url(#grid)" />
				</svg>
				<div className="absolute inset-0 bg-gradient-to-b from-transparent to-base-100"></div>
			</div>

			{/* ================= HERO SECTION ================= */}
			<section className="relative z-10 py-12 lg:py-20 flex flex-col items-center">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center max-w-4xl"
				>
					{/* H1 Title with VibeToLive gradient style */}
					<h1 className="font-bold text-4xl md:text-6xl lg:text-7xl bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] text-center bg-clip-text text-transparent !leading-[1.2em] mb-6 tracking-tight">
						AI Prototype to Production
					</h1>

					<h2 className="text-2xl md:text-3xl text-primary font-bold mb-6">
						Can you turn an AI-generated prototype into a production-ready app?
					</h2>

					<p className="text-lg md:text-xl text-base-content/80 mb-8 max-w-3xl mx-auto leading-relaxed">
						Yes. An AI-generated prototype can become a real product, but it needs more than a working demo. 
						Before real users, payments, customer data, or production traffic are involved, the app should be reviewed for 
						authentication, security, databases, webhooks, and deployment.
					</p>

					<p className="text-base md:text-lg text-base-content/70 mb-10 max-w-2xl mx-auto">
						VibeToLive helps founders turn apps built with <strong className="text-base-content">Lovable, Bolt.new, V0, Cursor, Replit, ChatGPT, Claude, Windsurf, Base44,</strong> and other AI-assisted workflows into secure, scalable, production-ready products without rebuilding everything from scratch.
					</p>

					{/* Action Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
						<a
							href="mailto:hello@vibetolive.dev?subject=Get%20Production%20Help"
							className="btn btn-wide btn-primary rounded-full hover:scale-105 transition-all text-primary-content font-bold shadow-lg shadow-primary/20"
						>
							Get Production Help
						</a>
						<a
							href="https://tally.so/r/mVry2j"
							target="_blank"
							rel="noopener noreferrer"
							className="btn btn-wide btn-outline rounded-full hover:bg-base-content hover:text-base-100 transition-all font-semibold"
						>
							Request an App Review
						</a>
					</div>
				</motion.div>

				{/* Needs List */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="w-full max-w-4xl bg-base-200 border border-base-content/10 p-6 md:p-8 rounded-2xl shadow-sm relative overflow-hidden"
				>
					<div className="absolute right-0 top-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
					<h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
						<span className="p-2 bg-primary/10 text-primary rounded-lg"><FaRocket /></span>
						A production-ready AI app usually needs:
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{[
							'Backend and API route hardening',
							'Authentication and protected-route review',
							'Database access control and permission cleanup',
							'Safe environment variable setup',
							'Production deployment configuration',
							'CI/CD and rollback planning',
							'Stripe or payment webhook validation',
							'Monitoring, logging, and error tracking',
							'QA across real user flows',
							'A launch handoff with known risks and next steps'
						].map((item, idx) => (
							<div key={idx} className="flex items-start gap-3">
								<span className="text-emerald-500 mt-1"><FaCheck size={14} /></span>
								<span className="text-base-content/80 text-sm md:text-base">{item}</span>
							</div>
						))}
					</div>
				</motion.div>

				{/* Tech Logos row */}
				<div className="mt-16 w-full max-w-5xl">
					<p className="text-center text-xs md:text-sm font-semibold uppercase tracking-wider text-base-content/40 mb-6">
						Production-ready handoffs for apps built with
					</p>
					<div className="flex flex-wrap gap-3 justify-center">
						{TECH_PARTNERS.map((tech, idx) => (
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

			{/* Subtle separator */}
			<div className="border-t border-base-content/10 my-10 max-w-6xl mx-auto"></div>

			{/* ================= IS THIS YOU? / PAIN POINTS SECTION ================= */}
			<section className="relative z-10 py-10">
				<div className="text-center max-w-3xl mx-auto mb-16">
					<div className="inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5">
						<FaExclamationTriangle className="text-amber-500" /> Is This You?
					</div>
					<h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6">
						AI Prototypes Are Fast. Production Is the Hard Part.
					</h2>
					<p className="text-lg text-base-content/75 leading-relaxed">
						AI tools excel at generating screens, forms, dashboards, and early logic. But a working demo is not the same thing as a production-ready application. Most AI prototypes fail when they need to support real accounts, private data, API errors, paid users, and webhooks.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
					{[
						{
							title: 'Works in demo, feels unsafe to launch',
							desc: "You can show it off — but you don't trust it with real users."
						},
						{
							title: 'Auth, secrets & data security are unclear',
							desc: "Not sure what's safe to expose, or what's already leaking."
						},
						{
							title: 'Deployment is fragile or confusing',
							desc: "It runs in preview, but production feels like a minefield."
						},
						{
							title: 'Performance drops with real users',
							desc: "Signups and spikes make the app slow or unstable."
						},
						{
							title: 'Supabase RLS isn\'t configured',
							desc: "Frontend filters hide data the database still exposes."
						},
						{
							title: 'You don\'t want to start over',
							desc: "You want to ship what you already built — safely."
						}
					].map((card, idx) => (
						<motion.div
							key={idx}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: idx * 0.05 }}
							viewport={{ once: true }}
							className="bg-base-100 border border-base-content/10 p-6 rounded-xl hover:border-primary transition-all duration-200 shadow-sm flex flex-col justify-between"
						>
							<div>
								<div className="w-10 h-10 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center mb-4 font-bold">
									0{idx + 1}
								</div>
								<h3 className="text-lg font-bold mb-2 text-base-content">{card.title}</h3>
								<p className="text-sm text-base-content/70 leading-relaxed">{card.desc}</p>
							</div>
						</motion.div>
					))}
				</div>
			</section>

			{/* Subtle separator */}
			<div className="border-t border-base-content/10 my-10 max-w-6xl mx-auto"></div>

			{/* ================= WHAT PRODUCTION READY MEANS SECTION ================= */}
			<section className="relative z-10 py-10">
				<div className="text-center max-w-3xl mx-auto mb-16">
					<div className="inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5">
						<FaShieldAlt className="text-primary" /> Core Definition
					</div>
					<h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6">
						What “Production-Ready” Means for an AI App
					</h2>
					<p className="text-lg text-base-content/75 leading-relaxed">
						A production-ready AI app is an application that can safely run outside a demo environment. It protects user data, handles failures, deploys reliably, and gives you visibility when things break.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
					{[
						{
							icon: <FaLock className="text-primary" />,
							title: 'Secure Authentication',
							desc: 'A login screen is not enough. The app needs secure session handling, protected routes, server-side permission checks, password reset handling, and role-based access control.'
						},
						{
							icon: <FaShield className="text-primary" />,
							title: 'Backend and API Protection',
							desc: 'AI tools often create API routes that work during testing but do not validate requests. A production backend should verify who is making requests, rate limits, and server-side route guards.'
						},
						{
							icon: <FaDatabase className="text-primary" />,
							title: 'Correct Database Permissions',
							desc: 'AI prototypes connect quickly to databases. In production, policies like Supabase RLS (Row Level Security), server-side ownership checks, and column-level permission rules are critical.'
						},
						{
							icon: <FaKey className="text-primary" />,
							title: 'Safe Environment Variables',
							desc: 'Production apps use secrets (Stripe, API keys, DB credentials). We ensure private keys are never exposed in client bundles, browser code, or public repositories.'
						},
						{
							icon: <FaServer className="text-primary" />,
							title: 'Stable Deployment',
							desc: 'App preview hosting environments differ from production. We wire up the correct build commands, domains, runtime settings, package versions, and failovers on platforms like Vercel or AWS.'
						},
						{
							icon: <FaCreditCard className="text-primary" />,
							title: 'Payment and Webhook Validation',
							desc: 'If using Stripe, subscription syncing, checkout security, canceled-user logic, refund flows, and webhook signature verification must be validated to prevent unauthorized access.'
						},
						{
							icon: <FaChartLine className="text-primary" />,
							title: 'Monitoring and Error Tracking',
							desc: 'Your app should not fail silently. We set up basic visibility (Sentry, Logtail, Axiom) so you know when API keys expire, payment webhooks fail, or critical routes return 500s.'
						},
						{
							icon: <FaVials className="text-primary" />,
							title: 'QA Across Real User Flows',
							desc: 'We test critical paths: signup, checkout, dashboard actions, state mutations, and edge cases. The goal is to remove blockers that compromise data or ruin user experiences.'
						}
					].map((item, idx) => (
						<div key={idx} className="flex gap-4 p-4 border border-base-content/5 rounded-xl hover:bg-base-200/50 transition-colors">
							<div className="flex-shrink-0 w-12 h-12 rounded-xl bg-base-200 flex items-center justify-center text-xl">
								{item.icon}
							</div>
							<div>
								<h3 className="text-lg font-bold mb-2 text-base-content">{item.title}</h3>
								<p className="text-sm text-base-content/75 leading-relaxed">{item.desc}</p>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Subtle separator */}
			<div className="border-t border-base-content/10 my-10 max-w-6xl mx-auto"></div>

			{/* ================= COMMON PROBLEMS (BLOCKERS) SECTION ================= */}
			<section className="relative z-10 py-10 bg-base-200/40 p-6 md:p-10 rounded-3xl border border-base-content/5 max-w-6xl mx-auto">
				<div className="text-center max-w-3xl mx-auto mb-12">
					<div className="inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5">
						<MdWarning className="text-red-500" /> Pre-Launch Red Flags
					</div>
					<h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6">
						Common Production Blockers in AI Apps
					</h2>
					<p className="text-lg text-base-content/75">
						These are the hidden gaps that look fine in demo mode but will collapse or leak user data immediately in production:
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
					{[
						'Login works visually, but private paths are accessible directly by URL modification',
						'Admin pages are hidden in UI markup but lack actual server-side role validation',
						'Supabase/Firebase policies allow users to query or edit records they do not own',
						'API routes trust input parameters blindly from client states',
						'Stripe payments checkout successfully, but webhook signature checks are absent',
						'Subscription statuses do not sync after subscription cancellations or failed retries',
						'Private API secret keys are exposed inside standard environment variables on the client side',
						'App builds and functions fine in dev preview but crashes during Vercel/Railway compilation',
						'Forms submit and save corrupted, duplicate, or blank values in the database',
						'Permissions are visually blocked in user screens but API routes respond to any token',
						'Database structures lack necessary keys, unique fields, ownership links, or indexes',
						'No logging, uptime tracing, or error tracking is configured',
						'No git rollback plan exists if a live code update introduces critical bugs',
						'AI-generated source files contain heavy, complex duplicate routes and logic blocks',
						'No core checkout or data mutation flows are verified with mock real users'
					].map((blocker, idx) => (
						<div key={idx} className="flex gap-3 items-start p-3 bg-base-100 rounded-xl border border-base-content/5">
							<span className="text-red-500 mt-1 flex-shrink-0"><MdCancel size={18} /></span>
							<p className="text-sm text-base-content/85 leading-snug">{blocker}</p>
						</div>
					))}
				</div>
			</section>

			{/* ================= HOW VIBETOLIVE TURNS PROTOTYPES TO PRODUCTS ================= */}
			<section className="relative z-10 py-16 max-w-6xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					<div>
						<div className="inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5">
							<MdCheckCircle className="text-emerald-500" /> Our Approach
						</div>
						<h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6">
							How VibeToLive Turns AI Prototypes Into Real Products
						</h2>
						<p className="text-lg text-base-content/75 mb-6 leading-relaxed">
							We do not throw away your AI-generated app. Instead, we preserve what already works, clean up technical debt, and build the security and operations layer needed for stable delivery.
						</p>
						<p className="text-base-content/70 mb-8 leading-relaxed">
							Whether you built using Lovable, Bolt, or Cursor, each tool creates distinct gaps. Lovable apps need RLS policies, Bolt apps need export stability, and Cursor apps require structural code unification. We address them all.
						</p>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
							{[
								'AI codebase scan',
								'Authentication check',
								'Database RLS fixes',
								'API route guards',
								'Secrets separation',
								'Stripe webhooks setup',
								'CI/CD pipeline wiring',
								'Deployments & redirects',
								'Observability dashboard',
								'Launch checklist'
							].map((tag, idx) => (
								<div key={idx} className="flex items-center gap-2">
									<span className="text-primary font-bold"><FaCheck size={12} /></span>
									<span className="text-sm md:text-base text-base-content/85">{tag}</span>
								</div>
							))}
						</div>
					</div>

					{/* Side list detailing builders gaps */}
					<div className="bg-base-200 border border-base-content/15 p-6 md:p-8 rounded-2xl relative shadow-md">
						<div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
						<h3 className="text-xl font-bold mb-4 border-b border-base-content/10 pb-4 text-base-content">
							Tool-Specific Hardening Gaps
						</h3>
						<div className="space-y-4">
							<div>
								<h4 className="text-sm font-bold text-primary">Lovable Apps</h4>
								<p className="text-xs text-base-content/70 mt-1">Often need database connection validation, RLS setup, and domain-level DNS/redirect mapping.</p>
							</div>
							<div>
								<h4 className="text-sm font-bold text-primary">Bolt.new Apps</h4>
								<p className="text-xs text-base-content/70 mt-1">Need local environment extraction, compilation resolution, and serverless adapter packaging.</p>
							</div>
							<div>
								<h4 className="text-sm font-bold text-primary">V0 & Cursor Apps</h4>
								<p className="text-xs text-base-content/70 mt-1">Require full-stack integration, duplicate code cleanup, and consolidated auth validation rules.</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ================= COMPATIBILITY LIST ================= */}
			<section className="relative z-10 py-10 bg-base-200/20 p-6 md:p-10 rounded-3xl border border-base-content/5 max-w-6xl mx-auto">
				<div className="text-center max-w-3xl mx-auto mb-10">
					<h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-4">
						Supported AI Builders & Tech Stacks
					</h2>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
					<div className="border border-base-content/10 bg-base-100 p-6 rounded-xl">
						<h3 className="text-lg font-bold mb-4 text-primary flex items-center gap-2">
							<span className="p-1.5 bg-primary/10 rounded-md"><FaCode /></span> AI Builders
						</h3>
						<ul className="grid grid-cols-2 gap-2 text-sm text-base-content/85">
							{['Lovable', 'Bolt.new', 'V0', 'Cursor', 'Replit', 'ChatGPT', 'Claude', 'Windsurf', 'Base44'].map((item) => (
								<li key={item} className="flex items-center gap-1.5">• {item}</li>
							))}
						</ul>
					</div>
					<div className="border border-base-content/10 bg-base-100 p-6 rounded-xl">
						<h3 className="text-lg font-bold mb-4 text-primary flex items-center gap-2">
							<span className="p-1.5 bg-primary/10 rounded-md"><FaDatabase /></span> Services & Stacks
						</h3>
						<ul className="grid grid-cols-2 gap-2 text-sm text-base-content/85">
							{['Next.js', 'React', 'Node.js', 'TypeScript', 'Supabase', 'Firebase', 'Postgres', 'Stripe', 'Clerk', 'Auth.js', 'Vercel', 'Railway', 'Render', 'AWS', 'DigitalOcean', 'Sentry', 'PostHog'].map((item) => (
								<li key={item} className="flex items-center gap-1.5">• {item}</li>
							))}
						</ul>
					</div>
				</div>
			</section>

			{/* ================= PROCESS SECTION (TIMELINE) ================= */}
			<section className="relative z-10 py-16 max-w-6xl mx-auto">
				<div className="text-center max-w-3xl mx-auto mb-16">
					<div className="inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5">
						<FaCogs className="text-primary" /> Delivery Path
					</div>
					<h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6">
						Our AI Prototype to Production Process
					</h2>
					<p className="text-lg text-base-content/75">
						Six clear, structured steps to harden, secure, deploy, and verify your application:
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{[
						{
							step: '01',
							title: 'App Review',
							desc: 'We review your current repository, demo link, configuration, database schema, and launch goals to identify all production blockers.'
						},
						{
							step: '02',
							title: 'Production Scope',
							desc: 'We map out a precise hardening schedule covering RLS rules, routes to protect, payment flows to verify, and deployment configurations.'
						},
						{
							step: '03',
							title: 'Fix Launch Blockers',
							desc: 'We secure database access, fix broken compilation commands, separate env secrets, guard API endpoints, and ensure valid authentication.'
						},
						{
							step: '04',
							title: 'Configure Deployment',
							desc: 'We configure build paths, redirect behaviors, runtime nodes, serverless behaviors, DNS configs, and deploy on your chosen cloud.'
						},
						{
							step: '05',
							title: 'Setup Observability',
							desc: 'We wire up basic logging, payment notification handles, error tracking systems, and alerts so you see failures immediately.'
						},
						{
							step: '06',
							title: 'QA and Handoff',
							desc: 'We execute complete journey validation (signups, checkout) and hand off a maintenance runbook so you own your pipeline.'
						}
					].map((item, idx) => (
						<motion.div
							key={idx}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: idx * 0.05 }}
							viewport={{ once: true }}
							className="bg-base-100 border border-base-content/10 p-6 rounded-2xl relative overflow-hidden group hover:border-primary transition-all duration-200"
						>
							<div className="absolute right-4 top-4 text-5xl font-extrabold text-base-content/5 group-hover:text-primary/10 transition-colors">
								{item.step}
							</div>
							<h3 className="text-lg font-bold mb-3 text-base-content pr-10">{item.title}</h3>
							<p className="text-sm text-base-content/70 leading-relaxed">{item.desc}</p>
						</motion.div>
					))}
				</div>
			</section>

			{/* ================= WHAT YOU GET DELIVERABLES SECTION ================= */}
			<section className="relative z-10 py-10 bg-base-200/30 p-6 md:p-10 rounded-3xl border border-base-content/5 max-w-6xl mx-auto">
				<div className="text-center max-w-3xl mx-auto mb-10">
					<h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-4">
						What You Get In the Handoff
					</h2>
					<p className="text-lg text-base-content/75">
						A robust codebase and the keys to run it. Your production deliverable packages include:
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto text-sm text-base-content/95">
					{[
						'Production-readiness review',
						'Launch blocker list',
						'Backend and API cleanup',
						'Authentication & route fixes',
						'Supabase/Postgres permission checks',
						'Environment variable audit',
						'Stripe payment flow validation',
						'Webhook signature checks',
						'Build and packaging fixes',
						'Production cloud setup',
						'CI/CD workflow code',
						'Monitoring configuration',
						'QA validation logs',
						'Founder-friendly launch checklist'
					].map((item, idx) => (
						<div key={idx} className="flex items-center gap-2.5 p-3 bg-base-100 rounded-xl border border-base-content/5">
							<span className="text-emerald-500"><FaCheck size={12} /></span>
							<span>{item}</span>
						</div>
					))}
				</div>
			</section>

			{/* ================= WHO THIS IS FOR / FIT SECTION ================= */}
			<section className="relative z-10 py-16 max-w-6xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<div className="border border-base-content/10 bg-base-100 p-6 md:p-8 rounded-2xl">
						<h3 className="text-xl font-bold text-emerald-500 mb-6 flex items-center gap-2">
							<span className="p-2 bg-emerald-500/10 rounded-xl"><MdCheckCircle /></span> A Great Fit For
						</h3>
						<ul className="space-y-4 text-base-content/85 text-sm md:text-base">
							{[
								'Founders with working AI-generated app prototypes',
								'Non-technical founders who built with Lovable, Bolt, V0, Replit, or Base44',
								'Startup teams preparing to launch an MVP and accept users',
								'Builders who used Cursor, Claude, ChatGPT, or Windsurf to iterate quickly',
								'Founders who want to bypass a slow, expensive manual rewrite',
								'Apps preparing to add billing, user dashboards, and databases safely',
								'Teams stuck between "the demo works" and "the product is live"'
							].map((item, idx) => (
								<li key={idx} className="flex items-start gap-2.5">
									<span className="text-emerald-500 mt-1">•</span>
									<span>{item}</span>
								</li>
							))}
						</ul>
					</div>

					<div className="border border-base-content/10 bg-base-100 p-6 md:p-8 rounded-2xl">
						<h3 className="text-xl font-bold text-red-500 mb-6 flex items-center gap-2">
							<span className="p-2 bg-red-500/10 rounded-xl"><MdCancel /></span> Not A Fit For
						</h3>
						<ul className="space-y-4 text-base-content/85 text-sm md:text-base">
							{[
								'Someone who only needs marketing landing page styling changes',
								'Pure visual changes with no database, auth, or logic backend',
								'Greenfield projects with no code, design, or proto built yet',
								'Fully customized, pre-audited enterprise architecture products'
							].map((item, idx) => (
								<li key={idx} className="flex items-start gap-2.5">
									<span className="text-red-500 mt-1">•</span>
									<span>{item}</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</section>

			{/* ================= WHY VIBETOLIVE / REBUILDING FROM SCRATCH ================= */}
			<section className="relative z-10 py-10 bg-base-200/40 p-6 md:p-10 rounded-3xl border border-base-content/5 max-w-6xl mx-auto">
				<div className="text-center max-w-3xl mx-auto mb-10">
					<h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-4">
						Why Use VibeToLive Instead of Rebuilding From Scratch?
					</h2>
					<p className="text-lg text-base-content/75 mb-6">
						A full rebuild is not necessary. Many AI-generated apps contain useful product direction, UI structures, and valid flows. We keep the good parts and harden the infrastructure.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-sm">
					{[
						{
							title: 'Avoid Launching Too Early',
							desc: 'Prevent launching with wide-open Supabase databases or missing webhook validation checks, which invite immediate hacks and broken payments.'
						},
						{
							title: 'Avoid Rebuilding Too Soon',
							desc: 'Don\'t throw away weeks of rapid design mockups and page flow layouts you verified with users. Finish it properly rather than rewriting.'
						},
						{
							title: 'Avoid Demo-Mode Limbo',
							desc: 'Stop endlessly adjusting fields in visual builders while dreading production cloud wiring. We handle the final launch barrier for you.'
						}
					].map((item, idx) => (
						<div key={idx} className="border border-base-content/10 bg-base-100 p-5 rounded-xl">
							<h3 className="font-bold text-base mb-2 text-primary">{item.title}</h3>
							<p className="text-xs text-base-content/75 leading-relaxed">{item.desc}</p>
						</div>
					))}
				</div>
			</section>

			{/* ================= AI PROTOTYPE TO PRODUCTION CHECKLIST ================= */}
			<section className="relative z-10 py-16 max-w-6xl mx-auto">
				<div className="text-center max-w-3xl mx-auto mb-12">
					<div className="inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5">
						<MdOutlineFeaturedPlayList className="text-primary" /> Pre-Launch Checklist
					</div>
					<h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6">
						AI Prototype to Production Checklist
					</h2>
					<p className="text-lg text-base-content/75">
						Run these validation tests on your code before going live:
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{[
						{
							category: 'Authentication',
							items: [
								'Are private pages protected server-side?',
								'Can users access only their own data?',
								'Are admin routes actually restricted?',
								'Are sessions handled safely?'
							]
						},
						{
							category: 'Database',
							items: [
								'Are permissions locked down?',
								'Are ownership rules enforced?',
								'Are sensitive tables protected?',
								'Are required constraints and indexes in place?'
							]
						},
						{
							category: 'Environment Variables',
							items: [
								'Are private keys kept server-side?',
								'Are public variables safe to expose?',
								'Are production and development values separated?',
								'Are webhook secrets configured correctly?'
							]
						},
						{
							category: 'Payments',
							items: [
								'Are webhooks verified?',
								'Is subscription state synced?',
								'Are canceled or failed payments handled?',
								'Is paid-user access enforced server-side?'
							]
						},
						{
							category: 'Deployment',
							items: [
								'Does the app build successfully in production?',
								'Are build commands and runtime settings correct?',
								'Are domains, redirects, and environment variables configured?',
								'Is there a rollback path?'
							]
						},
						{
							category: 'Monitoring',
							items: [
								'Are production errors tracked?',
								'Are failed payments or API errors visible?',
								'Are logs accessible?',
								'Does the founder know what to watch after launch?'
							]
						},
						{
							category: 'QA Tests',
							items: [
								'Has signup been tested?',
								'Has login been tested?',
								'Have payments been tested?',
								'Have admin flows been tested?',
								'Have empty states and error flows been tested?'
							]
						}
					].map((check, idx) => (
						<div key={idx} className="border border-base-content/10 bg-base-100 p-5 rounded-xl flex flex-col justify-between">
							<div>
								<h3 className="font-bold text-base border-b border-base-content/10 pb-2 mb-4 text-base-content">
									{check.category}
								</h3>
								<ul className="space-y-3 text-xs text-base-content/85">
									{check.items.map((item, itemIdx) => (
										<li key={itemIdx} className="flex gap-2 items-start">
											<span className="text-primary mt-0.5"><FaCheck size={10} /></span>
											<span>{item}</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					))}
				</div>
			</section>

			<SeoPricing />

			{/* ================= FAQ SECTION ================= */}
			<section className="relative z-10 py-16 max-w-4xl mx-auto">
				<div className="text-center mb-12">
					<div className="inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5">
						<MdHelpCenter className="text-primary" /> FAQ
					</div>
					<h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent">
						Frequently Asked Questions
					</h2>
				</div>

				<div className="space-y-4">
					{faqItems.map((item, idx) => (
						<div
							key={idx}
							className="border border-base-content/10 rounded-xl overflow-hidden bg-base-100"
						>
							<button
								onClick={() => toggleFaq(idx)}
								className="w-full flex items-center justify-between p-5 text-left font-bold text-sm md:text-base text-base-content hover:bg-base-200/40 transition-colors"
							>
								<span>{item.question}</span>
								<FaChevronDown
									className={`transition-transform duration-200 text-xs text-base-content/40 ${
										activeFaq === idx ? 'transform rotate-180 text-primary' : ''
									}`}
								/>
							</button>
							{activeFaq === idx && (
								<motion.div
									initial={{ height: 0, opacity: 0 }}
									animate={{ height: 'auto', opacity: 1 }}
									transition={{ duration: 0.2 }}
									className="border-t border-base-content/5 px-5 py-4 text-xs md:text-sm text-base-content/85 leading-relaxed bg-base-200/10"
								>
									{item.answer}
								</motion.div>
							)}
						</div>
					))}
				</div>
			</section>

			{/* ================= FINAL CTA SECTION ================= */}
			<section className="relative z-10 py-16 bg-gradient-to-b from-transparent to-base-200 rounded-3xl border border-base-content/5 p-8 text-center max-w-5xl mx-auto overflow-hidden">
				{/* Inner radial gradient decoration */}
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,182,0.05),transparent)] pointer-events-none"></div>
				<div className="relative z-10 max-w-3xl mx-auto">
					<h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6">
						Ready to turn your AI prototype into a real product?
					</h2>
					<p className="text-lg text-base-content/80 mb-8 leading-relaxed max-w-2xl mx-auto">
						Send your app, repository, or demo link. VibeToLive will review what is missing and help you move from prototype to production without starting over.
					</p>

					{/* CTAs */}
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
						<a
							href="mailto:hello@vibetolive.dev?subject=Get%20Production%20Help"
							className="btn btn-wide btn-primary rounded-full hover:scale-105 transition-all text-primary-content font-bold shadow-lg"
						>
							Get Production Help
						</a>
						<a
							href="mailto:hello@vibetolive.dev?subject=Request%20App%20Review"
							className="btn btn-wide btn-outline rounded-full font-semibold hover:bg-base-content hover:text-base-100"
						>
							Request an App Review
						</a>
					</div>

					<p className="text-xs text-base-content/50">
						Built with Lovable, Bolt.new, V0, Cursor, Replit, ChatGPT, Claude, Windsurf, or Base44? We can help you make it production-ready.
					</p>
				</div>
			</section>
		</div>
	);
}
