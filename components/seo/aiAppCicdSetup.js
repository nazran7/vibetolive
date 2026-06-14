'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
	FaRocket,
	FaCheck,
	FaExclamationTriangle,
	FaChevronDown,
	FaGitAlt,
	FaServer,
	FaKey,
	FaFlask,
	FaCodeBranch,
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
import { getHrefForLocale, TALLY_FORM_URL } from '@/lib/seo/site';
import CicdPricing from '@/components/seo/cicdPricing';

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
	{ name: 'GitHub Actions', style: 'border-indigo-500/20 text-indigo-500 bg-indigo-500/5 font-bold' },
	{ name: 'Next.js', style: 'border-base-content/20 text-base-content bg-base-content/5' },
	{ name: 'Vercel', style: 'border-base-content/20 text-base-content bg-base-content/5' },
	{ name: 'Railway', style: 'border-violet-500/20 text-violet-500 bg-violet-500/5' },
	{ name: 'Render', style: 'border-teal-500/20 text-teal-500 bg-teal-500/5' },
	{ name: 'TypeScript', style: 'border-blue-500/20 text-blue-500 bg-blue-500/5' },
];

const RELATED_GUIDES = [
	{ slug: 'ai-prototype-to-production', title: 'AI Prototype to Production', description: 'Main hub for production-ready AI apps.' },
	{ slug: 'ai-app-security-audit', title: 'AI App Security Audit', description: 'Security review before launch.' },
	{ slug: 'freelancer-to-finish-vibe-coded-app', title: 'Freelancer to Finish Vibe-Coded App', description: 'Finishing bugs and launch blockers.' },
	{ slug: 'from-lovable-to-production', title: 'From Lovable to Production', description: 'Lovable-specific production help.' },
	{ slug: 'from-bolt-to-production', title: 'From Bolt to Production', description: 'Bolt.new-specific production help.' },
	{ slug: 'from-v0-to-production', title: 'From V0 to Production', description: 'V0-generated app production help.' },
	{ slug: 'from-replit-to-production', title: 'From Replit to Production', description: 'Replit-specific production help.' },
	{ slug: 'from-cursor-to-production', title: 'From Cursor to Production', description: 'Cursor-built app production help.' },
	{ slug: 'production-readiness-checklist', title: 'Production Readiness Checklist', description: 'Checklist-style launch readiness guide.' },
];

export default function AiAppCicdSetupPage({ langName = 'en' }) {
	const [activeFaq, setActiveFaq] = useState(null);

	const toggleFaq = (index) => {
		setActiveFaq(activeFaq === index ? null : index);
	};

	const faqItems = [
		{
			question: 'What is CI/CD for an AI-generated app?',
			answer:
				'A deployment workflow that checks your app before changes reach production — install checks, typecheck, build, tests, environment validation, preview deployments, deploy rules, logs, and rollback planning.',
		},
		{
			question: 'Do I need CI/CD if my AI app already deploys?',
			answer:
				'Yes, if the app will support real users, payments, private data, or frequent updates. CI/CD catches broken builds, missing environment variables, test failures, and unsafe changes before production.',
		},
		{
			question: 'Can you set up GitHub Actions for my AI app?',
			answer:
				'Yes. VibeToLive can set up GitHub Actions for install, typecheck, lint, tests, build checks, environment validation, and release workflow based on your framework and hosting platform.',
		},
		{
			question: 'Can you set up preview deployments?',
			answer:
				'Yes. VibeToLive can configure preview deployments on Vercel, Railway, Render, Netlify, AWS, DigitalOcean, or another suitable host.',
		},
		{
			question: 'What checks should an AI app run before deployment?',
			answer:
				'Dependency install, typecheck, build, lint if used, and tests for critical flows. Apps with auth, payments, or admin features should also check protected routes, API behavior, webhooks, and environment variables.',
		},
		{
			question: 'Can CI/CD prevent AI-generated code from breaking my app?',
			answer:
				'CI/CD cannot prevent every bad change, but it catches broken builds, type errors, failed tests, missing variables, dependency problems, and some API or payment-flow issues before production.',
		},
		{
			question: 'Can you add tests as part of CI/CD setup?',
			answer:
				'Yes. VibeToLive can add tests for signup, login, protected routes, form submission, API access, Stripe webhooks, paid-user access, and admin-only actions — useful protection, not test bloat.',
		},
		{
			question: 'Can you help with environment variable validation?',
			answer:
				'Yes. VibeToLive can review required variables, create or clean up .env.example, separate public and private values, and recommend runtime validation.',
		},
		{
			question: 'What should I send for a CI/CD setup review?',
			answer:
				'Send your GitHub repo, hosting platform, package manager, deployment logs, current errors, environment variable list without secret values, and launch goal.',
		},
		{
			question: 'Is CI/CD only for large teams?',
			answer:
				'No. CI/CD is useful for solo founders because it creates a repeatable release process without needing enterprise-level infrastructure.',
		},
	];

	const cicdIncludes = [
		'GitHub repository and branch workflow review',
		'Build checks before production deploy',
		'TypeScript typecheck',
		'Lint checks where useful',
		'Critical-flow tests',
		'Environment variable validation',
		'Preview deployments',
		'Production deployment guardrails',
		'Stripe webhook or API route test checks where needed',
		'Rollback planning',
		'Deployment logs and monitoring visibility',
		'Founder-friendly handoff notes',
	];

	const cicdQuestions = [
		'Does the app install dependencies cleanly?',
		'Does the app pass typecheck?',
		'Does the app build successfully?',
		'Are critical tests running before deploy?',
		'Are required environment variables present?',
		'Are preview deployments available before production?',
		'Can production deploys be reviewed before release?',
		'Are deployment logs easy to inspect?',
		'Is there a rollback path if the release breaks?',
		'Can future AI-assisted changes be checked safely?',
	];

	const cicdProblems = [
		{
			title: 'The App Deploys Manually Without Checks',
			desc: 'Visual testing does not catch every production issue.',
			bullets: ['Dependency installation', 'TypeScript and build errors', 'Missing environment variables', 'Failed tests and deployment logs'],
		},
		{
			title: 'AI Changes Break Existing Features',
			desc: 'Broad AI-assisted changes can solve one issue while creating another.',
			bullets: ['Broken imports and type errors', 'Test and API contract failures', 'Missing env variables', 'Accidental dependency changes'],
		},
		{
			title: 'No Preview Deployment Before Production',
			desc: 'Local or builder preview can miss hosting runtime issues.',
			bullets: ['Auth callbacks and redirect URLs', 'Stripe webhook configuration', 'Serverless behavior', 'Domain-specific issues'],
		},
		{
			title: 'Environment Variables Are Missing or Misconfigured',
			desc: 'One of the most common reasons apps work locally but fail in production.',
			bullets: ['Database URLs and auth secrets', 'Stripe keys and webhook secrets', 'Public vs private variables', 'Callback URLs and app URLs'],
		},
		{
			title: 'Tests Are Missing for Critical Flows',
			desc: 'Perfect coverage is not required, but important flows need protection.',
			bullets: ['Signup, login, protected routes', 'Stripe webhook handling', 'API route validation', 'Admin-only actions'],
		},
		{
			title: 'Deployment and Rollback Are Unclear',
			desc: 'Founders should know what happens when a deploy fails.',
			bullets: ['Which branch deploys to production', 'Required checks before merge', 'Where logs are visible', 'How to roll back'],
		},
	];

	const processSteps = [
		{ step: '01', title: 'App and Deployment Review', desc: 'We review your repo, framework, package manager, hosting platform, env vars, build issues, and launch goal.' },
		{ step: '02', title: 'Define the Deployment Workflow', desc: 'Main branch protection, preview branches, PR checks, production deploy trigger, required checks, and rollback process.' },
		{ step: '03', title: 'Add Build and Quality Checks', desc: 'Install, typecheck, lint, build, test command, lockfile check, and framework-specific validation.' },
		{ step: '04', title: 'Add Critical Tests', desc: 'Identify tests that matter most — auth, protected routes, webhooks, database access, API routes, or core product flow.' },
		{ step: '05', title: 'Validate Environment Variables', desc: '.env.example, runtime validation, deployment platform settings, and public/private separation.' },
		{ step: '06', title: 'Configure Preview and Production Deployments', desc: 'Vercel previews, Railway environments, Render deploys, GitHub integration, or stack-specific setup.' },
		{ step: '07', title: 'Add Rollback and Handoff Notes', desc: 'Founder-friendly documentation for deploys, checks, logs, failed deploys, rollback, and env vars.' },
	];

	const checklistCategories = [
		{
			category: 'Repository',
			icon: 'git',
			items: ['Is the app in a Git-based repo?', 'Is the main branch protected?', 'Are changes reviewed before production?', 'Is the lockfile committed?'],
		},
		{
			category: 'Build Checks',
			icon: 'cogs',
			items: ['Does dependency installation succeed?', 'Does typecheck pass?', 'Does the production build pass?', 'Are package conflicts caught before deploy?'],
		},
		{
			category: 'Tests',
			icon: 'flask',
			items: ['Are critical user flows tested?', 'Are auth and protected routes tested?', 'Are Stripe webhooks tested if payments are used?', 'Are API routes tested where needed?'],
		},
		{
			category: 'Environment Variables',
			icon: 'key',
			items: ['Is there a documented .env.example?', 'Are required variables validated?', 'Are public and private variables separated?', 'Are secrets stored in the hosting platform?'],
		},
		{
			category: 'Preview Deployments',
			icon: 'branch',
			items: ['Does every major change create a preview deploy?', 'Are preview env variables configured?', 'Can auth callbacks work in preview if needed?', 'Can the founder test before production?'],
		},
		{
			category: 'Production Deployment',
			icon: 'server',
			items: ['Is the production branch clear?', 'Are required checks enforced?', 'Is manual approval needed for risky deploys?', 'Is there a rollback path?'],
		},
		{
			category: 'Monitoring',
			icon: 'chart',
			items: ['Are deploy failures visible?', 'Are production errors tracked?', 'Are payment or webhook failures visible?', 'Does the founder know where to look after launch?'],
		},
	];

	const checklistIcon = (type) => {
		switch (type) {
			case 'git':
				return <FaGitAlt className='text-primary' />;
			case 'cogs':
				return <FaCogs className='text-primary' />;
			case 'flask':
				return <FaFlask className='text-primary' />;
			case 'key':
				return <FaKey className='text-primary' />;
			case 'branch':
				return <FaCodeBranch className='text-primary' />;
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
						<pattern id='cicd-grid' width='24' height='24' patternUnits='userSpaceOnUse'>
							<path d='M 24 0 L 0 0 0 24' fill='none' stroke='currentColor' strokeWidth='0.5' className='text-base-content/20' />
						</pattern>
					</defs>
					<rect width='100%' height='100%' fill='url(#cicd-grid)' />
				</svg>
				<div className='absolute inset-0 bg-gradient-to-b from-transparent to-base-100' />
			</div>

			<section className='relative z-10 py-12 lg:py-20 flex flex-col items-center'>
				<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className='text-center max-w-4xl'>
					<h1 className='font-bold text-4xl md:text-6xl lg:text-7xl bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] text-center bg-clip-text text-transparent !leading-[1.2em] mb-6 tracking-tight'>
						AI App CI/CD Setup
					</h1>
					<h2 className='text-2xl md:text-3xl text-primary font-bold mb-6'>Does your AI-generated app need CI/CD before launch?</h2>
					<p className='text-lg md:text-xl text-base-content/80 mb-6 max-w-3xl mx-auto leading-relaxed'>
						Yes. If your AI-generated app is moving toward real users, CI/CD helps prevent broken builds, unsafe changes,
						missing environment variables, and untested code from reaching production.
					</p>
					<p className='text-base md:text-lg text-base-content/70 mb-10 max-w-2xl mx-auto'>
						VibeToLive sets up CI/CD for apps built with Lovable, Bolt.new, V0, Cursor, Replit, ChatGPT, Claude, Windsurf,
						Base44, and custom AI-assisted codebases.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-16'>
						<a href={TALLY_FORM_URL} target='_blank' rel='noopener noreferrer' className='btn btn-wide btn-primary rounded-full hover:scale-105 transition-all text-primary-content font-bold shadow-lg shadow-primary/20'>
							Set Up CI/CD
						</a>
						<a href={TALLY_FORM_URL} target='_blank' rel='noopener noreferrer' className='btn btn-wide btn-outline rounded-full hover:bg-base-content hover:text-base-100 transition-all font-semibold'>
							Request a Deployment Review
						</a>
					</div>
				</motion.div>

				<motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className='w-full max-w-4xl bg-base-200 border border-base-content/10 p-6 md:p-8 rounded-2xl shadow-sm relative overflow-hidden'>
					<div className='absolute right-0 top-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl' />
					<h3 className='text-xl md:text-2xl font-bold mb-6 flex items-center gap-2'>
						<span className='p-2 bg-primary/10 text-primary rounded-lg'><FaRocket /></span>
						A practical CI/CD setup usually includes:
					</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{cicdIncludes.map((item, idx) => (
							<div key={idx} className='flex items-start gap-3'>
								<span className='text-emerald-500 mt-1'><FaCheck size={14} /></span>
								<span className='text-base-content/80 text-sm md:text-base'>{item}</span>
							</div>
						))}
					</div>
					<p className='mt-6 text-sm text-base-content/70 border-t border-base-content/10 pt-4'>
						VibeToLive helps founders move from “the app works on my machine” to a safer, repeatable deployment process.
					</p>
				</motion.div>

				<div className='mt-16 w-full max-w-5xl space-y-8'>
					<div>
						<p className='text-center text-xs md:text-sm font-semibold uppercase tracking-wider text-base-content/40 mb-4'>AI builders we support</p>
						<div className='flex flex-wrap gap-2 justify-center'>
							{AI_BUILDERS.map((name) => (
								<span key={name} className='px-3 py-1.5 border border-primary/20 text-primary bg-primary/5 rounded-full text-xs font-medium'>{name}</span>
							))}
						</div>
					</div>
					<div>
						<p className='text-center text-xs md:text-sm font-semibold uppercase tracking-wider text-base-content/40 mb-4'>Common CI/CD stack</p>
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
						<FaExclamationTriangle className='text-amber-500' /> Deployment Reality
					</div>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						AI Apps Move Fast. CI/CD Keeps Launches Safer.
					</h2>
					<p className='text-lg text-base-content/75 leading-relaxed mb-4'>
						When changes happen quickly, it becomes easier to break production accidentally — wrong files updated, broken
						builds, missing env vars, or payment logic that fails in production.
					</p>
					<p className='text-lg text-base-content/75 leading-relaxed'>
						CI/CD creates repeatable checks before code reaches production, so you are not relying only on manual testing or
						AI confidence.
					</p>
				</div>
			</section>

			<div className='border-t border-base-content/10 my-10 max-w-6xl mx-auto' />

			<section className='relative z-10 py-10 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-12'>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						What CI/CD Means for an AI-Generated App
					</h2>
				</div>
				<div className='bg-base-200/40 border border-base-content/10 p-6 md:p-8 rounded-2xl max-w-4xl mx-auto'>
					<h3 className='text-lg font-bold mb-4'>A production-minded CI/CD setup should answer:</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
						{cicdQuestions.map((q, idx) => (
							<div key={idx} className='flex items-start gap-2 text-sm text-base-content/85'>
								<span className='text-emerald-500 mt-0.5'><FaCheck size={10} /></span>
								<span>{q}</span>
							</div>
						))}
					</div>
					<p className='mt-6 text-sm text-base-content/70 italic'>If the answer is unclear, the deployment process is still fragile.</p>
				</div>
			</section>

			<div className='border-t border-base-content/10 my-10 max-w-6xl mx-auto' />

			<section className='relative z-10 py-10 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-12'>
					<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
						<MdWarning className='text-red-500' /> Common Problems
					</div>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						Common CI/CD Problems in AI-Generated Apps
					</h2>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{cicdProblems.map((problem, idx) => (
						<motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: idx * 0.03 }} viewport={{ once: true }} className='bg-base-100 border border-base-content/10 p-6 rounded-xl hover:border-primary/40 transition-all'>
							<h3 className='text-lg font-bold mb-2'>{problem.title}</h3>
							<p className='text-sm text-base-content/70 mb-4'>{problem.desc}</p>
							<ul className='space-y-1.5'>
								{problem.bullets.map((bullet, i) => (
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
							How VibeToLive Sets Up CI/CD for AI Apps
						</h2>
						<p className='text-lg text-base-content/75'>Not over-engineering — enough deployment safety for the product’s stage.</p>
					</div>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2'>
						{[
							'GitHub workflow review', 'Branch strategy', 'GitHub Actions setup', 'Install/build pipeline',
							'TypeScript typecheck', 'Lint checks', 'Critical-flow tests', 'Environment variable validation',
							'Preview deployment setup', 'Production deploy guardrails', 'Vercel, Railway, Render, AWS, Fly.io',
							'Stripe/webhook test workflow', 'Rollback planning', 'Deployment documentation', 'Founder-friendly handoff',
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
						Our AI App CI/CD Setup Process
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
						<MdOutlineFeaturedPlayList className='text-primary' /> Pre-Launch Checklist
					</div>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						AI App CI/CD Checklist
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
						'CI/CD readiness review', 'GitHub Actions workflow', 'Build and typecheck pipeline', 'Lint/test workflow',
						'Preview deployment setup', 'Production deployment guardrails', 'Environment variable documentation',
						'.env.example cleanup', 'Runtime env validation recommendation', 'Stripe webhook test workflow notes',
						'Deployment log review', 'Rollback plan', 'Founder-friendly deployment handoff', 'Next-step recommendations',
					].map((item, idx) => (
						<div key={idx} className='flex items-center gap-2.5 p-3 bg-base-100 rounded-xl border border-base-content/5'>
							<span className='text-emerald-500'><FaCheck size={12} /></span>
							<span>{item}</span>
						</div>
					))}
				</div>
			</section>

			<CicdPricing />

			<section className='relative z-10 py-10 max-w-6xl mx-auto'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<div className='border border-base-content/10 bg-base-100 p-6 md:p-8 rounded-2xl'>
						<h3 className='text-xl font-bold text-emerald-500 mb-6'>Who This Service Is For</h3>
						<ul className='space-y-3 text-sm text-base-content/85'>
							{[
								'Founders with AI-generated apps close to launch',
								'Apps built with Lovable, Bolt, V0, Cursor, Replit, Claude, or ChatGPT',
								'Teams that deploy manually and want a safer process',
								'Apps that keep breaking after AI-assisted changes',
								'Founders who need GitHub Actions or preview deployments',
								'Apps with auth, payments, dashboards, or private data',
								'Developers who want CI/CD before production launch',
								'Founders who need rollback and deployment clarity',
							].map((item, idx) => (
								<li key={idx} className='flex items-start gap-2'><span className='text-emerald-500 mt-1'>•</span><span>{item}</span></li>
							))}
						</ul>
					</div>
					<div className='border border-base-content/10 bg-base-100 p-6 md:p-8 rounded-2xl'>
						<h3 className='text-xl font-bold text-amber-500 mb-6'>When You Need CI/CD</h3>
						<ul className='space-y-3 text-sm text-base-content/85'>
							{[
								'The app works locally but fails in production',
								'Every deploy feels risky',
								'AI-generated changes keep breaking existing features',
								'You do not have preview deployments or build checks',
								'You do not know which environment variables production needs',
								'You use Stripe, auth, database, or private user data',
								'You want to invite real users soon',
								'You are not sure how to roll back a bad deploy',
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
						Why Use VibeToLive for AI App CI/CD?
					</h2>
					<p className='text-lg text-base-content/75'>Generic CI/CD setup often ignores the risk patterns of AI-generated apps.</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-sm'>
					{[
						{ title: 'Do Not Ship Without Checks', desc: 'Avoid pushing AI-generated changes directly to production without build and test gates.' },
						{ title: 'Do Not Rely on Manual Testing Alone', desc: 'Auth, database, payments, and admin logic need automated checks before deploy.' },
						{ title: 'Catch Env Issues Before Production', desc: 'Discover missing environment variables before a production deploy fails.' },
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
						Want safer deployments for your AI-generated app?
					</h2>
					<p className='text-lg text-base-content/80 mb-8 leading-relaxed'>
						Send your repo, deployment target, and current build/deploy problem. VibeToLive will review your release process,
						set up the right checks, and help you deploy with more confidence.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-6'>
						<a href={TALLY_FORM_URL} target='_blank' rel='noopener noreferrer' className='btn btn-wide btn-primary rounded-full hover:scale-105 transition-all font-bold shadow-lg'>Set Up CI/CD</a>
						<a href={TALLY_FORM_URL} target='_blank' rel='noopener noreferrer' className='btn btn-wide btn-outline rounded-full font-semibold hover:bg-base-content hover:text-base-100'>Request a Deployment Review</a>
					</div>
					<p className='text-xs text-base-content/50'>
						Built with Lovable, Bolt.new, V0, Cursor, Replit, ChatGPT, Claude, Windsurf, or Base44? We can add safer CI/CD before you launch.
					</p>
				</div>
			</section>
		</div>
	);
}
