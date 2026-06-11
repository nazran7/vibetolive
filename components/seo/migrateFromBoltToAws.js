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
	FaCloud,
} from 'react-icons/fa';
import {
	MdWarning,
	MdCancel,
	MdCheckCircle,
	MdHelpCenter,
	MdOutlineFeaturedPlayList,
	MdBuild,
} from 'react-icons/md';
import { getHrefForLocale } from '@/lib/seo/site';
import MigrationPricing from '@/components/seo/migrationPricing';

const AWS_STACK = [
	{ name: 'Bolt.new', style: 'border-blue-500/30 text-blue-500 bg-blue-500/10 font-bold' },
	{ name: 'AWS Amplify', style: 'border-orange-500/20 text-orange-500 bg-orange-500/5' },
	{ name: 'App Runner', style: 'border-amber-500/20 text-amber-500 bg-amber-500/5' },
	{ name: 'ECS Fargate', style: 'border-violet-500/20 text-violet-500 bg-violet-500/5' },
	{ name: 'Lambda', style: 'border-yellow-500/20 text-yellow-600 bg-yellow-500/5' },
	{ name: 'S3', style: 'border-emerald-500/20 text-emerald-500 bg-emerald-500/5' },
	{ name: 'RDS', style: 'border-indigo-500/20 text-indigo-500 bg-indigo-500/5' },
	{ name: 'CloudWatch', style: 'border-rose-500/20 text-rose-500 bg-rose-500/5' },
];

const RELATED_GUIDES = [
	{
		slug: 'from-bolt-to-production',
		title: 'From Bolt to Production',
		description: 'Main Bolt production service page for export, build, backend, and deployment help.',
	},
	{
		slug: 'ai-prototype-to-production',
		title: 'AI Prototype to Production',
		description: 'Main hub for AI-generated app production help.',
	},
	{
		slug: 'ai-app-cicd-setup',
		title: 'AI App CI/CD Setup',
		description: 'CI/CD and safer deployment setup.',
	},
	{
		slug: 'ai-app-security-audit',
		title: 'AI App Security Audit',
		description: 'Security review before launch.',
	},
	{
		slug: 'ai-app-builder-with-backend',
		title: 'AI App Builder With Backend',
		description: 'Backend implementation for AI-built apps.',
	},
	{
		slug: 'freelancer-to-finish-vibe-coded-app',
		title: 'Freelancer to Finish Vibe-Coded App',
		description: 'Finish bugs and product gaps.',
	},
	{
		slug: 'production-readiness-checklist',
		title: 'Production Readiness Checklist',
		description: 'Pre-launch checklist for auth, database, payments, and deployment.',
	},
];

const MIGRATION_INCLUDES = [
	'Bolt.new export and repo cleanup',
	'Local install and build fixes',
	'Package and dependency review',
	'Backend/API route review',
	'AWS hosting architecture selection',
	'Environment variable and secrets setup',
	'Database migration or production database setup',
	'S3 storage setup where needed',
	'Stripe/payment webhook configuration',
	'CI/CD pipeline setup',
	'Monitoring, logging, and alerting',
	'Production QA and handoff',
];

const MIGRATION_QUESTIONS = [
	'Does the app run outside Bolt.new?',
	'Does the app build cleanly in a normal repo?',
	'Which AWS service should host the frontend and backend?',
	'Are private secrets handled safely?',
	'Is the database production-ready?',
	'Are API routes and backend logic secure?',
	'Are payments and webhooks configured correctly?',
	'Is CI/CD set up for safer deployments?',
	'Are logs and errors visible after launch?',
	'Is the AWS setup understandable and cost-aware?',
];

const AWS_PROBLEMS = [
	{
		title: 'The App Works in Bolt But Fails After Export',
		desc: 'Bolt runs in a browser-based development environment. AWS does not behave like that environment.',
		bullets: [
			'Missing files',
			'Broken package scripts',
			'Dependency version conflicts',
			'Build command errors',
			'TypeScript errors',
			'Runtime mismatch',
			'Server/client boundary problems',
			'Environment variables missing',
			'Backend routes not working outside preview',
			'Assets or static files not resolving correctly',
		],
		footer: 'Before AWS migration, the app should install, run, and build cleanly outside Bolt.',
	},
	{
		title: 'The AWS Hosting Path Is Unclear',
		desc: 'AWS offers many ways to host an app. Picking the wrong path can make the app more expensive or harder to maintain than necessary.',
		bullets: [
			'AWS Amplify for frontend-focused apps',
			'AWS App Runner for containerized web apps',
			'ECS Fargate for more controlled container workloads',
			'EC2 for custom server management',
			'Lambda/API Gateway for serverless APIs',
			'S3 and CloudFront for static frontend assets',
			'RDS or Aurora for relational databases',
			'S3 for file storage',
			'CloudWatch for logs and monitoring',
			'Secrets Manager or SSM Parameter Store for secrets',
		],
		footer: 'A simple MVP should not be over-engineered. A production app with backend complexity should not be under-planned.',
	},
	{
		title: 'Backend Logic Needs Review Before AWS',
		desc: 'A Bolt-generated app may include API routes, server actions, backend utilities, or third-party integrations. Before moving to AWS, backend logic needs review.',
		bullets: [
			'API route authentication',
			'Server-side authorization',
			'Input validation',
			'Database ownership checks',
			'Admin-only actions',
			'External API failure handling',
			'Server-only secrets',
			'Error handling',
			'Runtime compatibility',
			'Logging needs',
		],
		footer: 'AWS migration should not carry unsafe backend logic into production.',
	},
	{
		title: 'Environment Variables and Secrets Need Cleanup',
		desc: 'Bolt prototypes often use placeholder keys, local values, test credentials, or mixed frontend/backend variables.',
		bullets: [
			'Public frontend variables',
			'Private server-side secrets',
			'Database URLs',
			'Stripe secret keys',
			'Webhook secrets',
			'Auth provider secrets',
			'Email provider keys',
			'AI API keys',
			'AWS credentials and IAM permissions',
			'Development vs production values',
		],
		footer: 'Private keys should not be hardcoded, committed, or exposed in the browser.',
	},
	{
		title: 'Database Choice Needs Planning',
		desc: 'A Bolt prototype may use a simple database, Supabase, Firebase, Postgres, SQLite, local storage, mock data, or no real persistence yet.',
		bullets: [
			'Keep the current database provider',
			'Move to AWS RDS Postgres',
			'Use Aurora Serverless',
			'Use DynamoDB for specific NoSQL workloads',
			'Keep Supabase/Firebase while hosting the app on AWS',
			'Migrate file storage to S3',
			'Add backups and migration scripts',
		],
		footer: 'The right choice depends on the product, data model, budget, and maintenance needs.',
	},
	{
		title: 'Stripe Webhooks Need Production Configuration',
		desc: 'If the Bolt app uses Stripe, AWS migration must handle production webhook behavior.',
		bullets: [
			'Live vs test keys',
			'Webhook endpoint URL',
			'Webhook signature verification',
			'Subscription status sync',
			'Paid-user access enforcement',
			'Canceled subscription behavior',
			'Failed payment behavior',
			'Customer portal setup',
			'Cloud logs for webhook failures',
		],
		footer: 'Payment state should be enforced by backend logic, not by frontend UI.',
	},
	{
		title: 'AWS Cost Can Grow Without Guardrails',
		desc: 'AWS is powerful, but bad setup can create avoidable costs.',
		bullets: [
			'Whether containers are always running',
			'Whether the app needs serverless or container hosting',
			'Database instance size',
			'Storage usage',
			'CloudWatch log retention',
			'Data transfer costs',
			'Build/deployment frequency',
			'Monitoring and alert costs',
			'Reserved vs on-demand choices later',
			'Budget alerts',
		],
		footer: 'For an MVP, the goal is usually a simple, cost-aware production setup.',
	},
	{
		title: 'Monitoring and Logs Are Missing',
		desc: 'A production AWS app needs visibility.',
		bullets: [
			'App logs',
			'API errors',
			'Deployment failures',
			'Payment webhook failures',
			'Database connection errors',
			'Slow responses',
			'Auth failures',
			'Infrastructure health',
			'Cost alerts',
		],
		footer: 'AWS commonly uses CloudWatch for logs and metrics, but the setup must be understandable to the person maintaining the app.',
	},
];

const PROCESS_STEPS = [
	{
		step: '01',
		title: 'Bolt App Review',
		desc: 'We review your Bolt.new project, exported code, repo, package setup, framework, backend logic, database, authentication, integrations, and launch goal. This identifies whether the app is ready for AWS or needs cleanup first.',
	},
	{
		step: '02',
		title: 'Export and Build Cleanup',
		desc: 'We make sure the app works outside Bolt. This may include fixing package scripts, dependency conflicts, TypeScript errors, build commands, runtime issues, import paths, environment variable references, and preview-only assumptions. AWS migration should not begin with a broken export.',
	},
	{
		step: '03',
		title: 'AWS Architecture Plan',
		desc: 'We choose the simplest AWS setup that fits the app — Amplify or S3 + CloudFront for frontend-heavy apps; App Runner or ECS Fargate for full-stack; Lambda/API Gateway for API-heavy backends; RDS, Aurora, or external managed databases; S3 for file storage. The goal is a practical setup, not unnecessary cloud complexity.',
	},
	{
		step: '04',
		title: 'Secrets and Environment Configuration',
		desc: 'We clean up environment variables and define where each value belongs — public frontend variables, private server-side secrets, database URLs, Stripe keys, webhook secrets, auth provider values, email keys, AI API keys, and AWS-specific configuration. Secrets should be managed through AWS services or secure deployment settings, not hardcoded.',
	},
	{
		step: '05',
		title: 'Backend, Auth, and Database Review',
		desc: 'We review the app’s backend and data access before production — API routes, server actions, authentication, protected routes, user ownership rules, admin access, database permissions, and payment access logic. The app should not carry prototype-level security into AWS.',
	},
	{
		step: '06',
		title: 'CI/CD and Deployment Setup',
		desc: 'We set up or document the release process — GitHub Actions, AWS deployment pipeline, build checks, preview/staging path if needed, production deploy process, logs, and rollback notes. A good migration should make future deploys safer, not more confusing.',
	},
	{
		step: '07',
		title: 'Monitoring, QA, and Handoff',
		desc: 'We test the production deployment and provide a handoff. Typical QA includes signup, login, dashboard access, form submission, database writes, payment flow, admin access, API errors, and deployment behavior. The handoff explains what was deployed, where it runs, where secrets live, where logs are checked, how to redeploy, what risks remain, and what should be improved next.',
	},
];

const CHECKLIST_CATEGORIES = [
	{
		category: 'Export and Repo',
		icon: 'build',
		items: [
			'Does the app run outside Bolt.new?',
			'Does dependency installation work?',
			'Are package scripts correct?',
			'Does the production build pass?',
			'Are preview-only assumptions removed?',
			'Is the repo ready for deployment?',
		],
	},
	{
		category: 'AWS Architecture',
		icon: 'cloud',
		items: [
			'Is the hosting service selected?',
			'Is the frontend/backend split clear?',
			'Is the database plan clear?',
			'Is file storage needed?',
			'Are logs and monitoring planned?',
			'Is the setup cost-aware for an MVP?',
		],
	},
	{
		category: 'Backend and Auth',
		icon: 'lock',
		items: [
			'Are API routes protected?',
			'Are server actions safe?',
			'Are private routes protected?',
			'Are admin routes secured?',
			'Are user ownership rules enforced?',
			'Is input validation in place?',
		],
	},
	{
		category: 'Database and Storage',
		icon: 'database',
		items: [
			'Is the database production-ready?',
			'Are migrations needed?',
			'Are backups considered?',
			'Are permissions safe?',
			'Is S3 needed for uploads?',
			'Are storage access rules correct?',
		],
	},
	{
		category: 'Secrets and Environment Variables',
		icon: 'key',
		items: [
			'Are public and private variables separated?',
			'Are production values configured?',
			'Are Stripe and auth secrets protected?',
			'Are database URLs stored securely?',
			'Are AWS permissions scoped?',
			'Are secrets kept out of the repo?',
		],
	},
	{
		category: 'Payments',
		icon: 'payment',
		items: [
			'Are Stripe live keys configured?',
			'Are webhooks verified?',
			'Is the subscription state synced?',
			'Is paid access enforced server-side?',
			'Are failed payments and cancellations handled?',
		],
	},
	{
		category: 'Deployment and CI/CD',
		icon: 'server',
		items: [
			'Is the build command correct?',
			'Is CI/CD configured?',
			'Are deployment logs available?',
			'Is rollback documented?',
			'Are production changes repeatable?',
		],
	},
	{
		category: 'Monitoring and Handoff',
		icon: 'chart',
		items: [
			'Are CloudWatch logs or equivalent logs available?',
			'Are critical errors visible?',
			'Are cost alerts considered?',
			'Does the founder know where the app runs?',
			'Does the founder know how to redeploy?',
		],
	},
];

export default function MigrateFromBoltToAwsPage({ langName = 'en' }) {
	const [activeFaq, setActiveFaq] = useState(null);

	const toggleFaq = (index) => {
		setActiveFaq(activeFaq === index ? null : index);
	};

	const faqItems = [
		{
			question: 'Can a Bolt.new app be migrated to AWS?',
			answer:
				'Yes. A Bolt.new app can be migrated to AWS if the exported code, dependencies, build setup, backend logic, environment variables, database, and deployment configuration are reviewed first. The migration should start by making sure the app runs cleanly outside Bolt.',
		},
		{
			question: 'Do I need to rebuild my Bolt app before moving to AWS?',
			answer:
				'Usually, no. Many Bolt apps can be cleaned up, exported, and migrated without a full rebuild. VibeToLive reviews what already works, fixes production blockers, and only recommends rebuilding if the codebase is too unstable or unsafe to maintain.',
		},
		{
			question: 'Which AWS service should host my Bolt app?',
			answer:
				'It depends on the app. A front-end-heavy app may fit AWS Amplify, S3 plus CloudFront, or a similar approach. A full-stack app may need App Runner, ECS Fargate, Lambda/API Gateway, RDS, S3, CloudWatch, or another combination. The right setup depends on backend needs, database, traffic, and budget.',
		},
		{
			question: 'Why does my Bolt app work in preview but fail on AWS?',
			answer:
				'Bolt’s browser-based preview environment is different from AWS production infrastructure. After export, problems can appear with package scripts, dependencies, build commands, environment variables, runtime behavior, server routes, and static assets.',
		},
		{
			question: 'Can you migrate the database too?',
			answer:
				'Yes. VibeToLive can help plan or implement database migration depending on your app. Options may include AWS RDS Postgres, Aurora, DynamoDB for specific workloads, Supabase, Firebase, Neon, Railway Postgres, or another managed database.',
		},
		{
			question: 'Can you set up AWS secrets and environment variables?',
			answer:
				'Yes. VibeToLive can review public and private variables, Stripe keys, auth secrets, database URLs, webhook secrets, email provider keys, AI API keys, and AWS-specific configuration. Secrets should be stored securely and kept out of browser code and public repos.',
		},
		{
			question: 'Can you set up CI/CD for AWS deployment?',
			answer:
				'Yes. VibeToLive can help set up GitHub Actions or another deployment workflow for AWS. A practical CI/CD setup may include install checks, typecheck, build checks, tests, deployment steps, logs, and rollback documentation.',
		},
		{
			question: 'Can you help with Stripe webhooks on AWS?',
			answer:
				'Yes. VibeToLive can review Stripe checkout, live/test key separation, webhook signature verification, subscription state syncing, paid-user access, cancellation handling, failed payment behavior, and webhook logs in the AWS deployment environment.',
		},
		{
			question: 'Is AWS always the best choice for a Bolt app?',
			answer:
				'No. AWS is powerful, but it can be more complex than needed for a simple app. If your Bolt app is small, Vercel, Railway, Render, or another platform may be faster and cheaper. VibeToLive can help decide whether AWS is actually the right production path.',
		},
		{
			question: 'What should I send for a Bolt to AWS migration review?',
			answer:
				'You can send your Bolt.new project link, exported code, GitHub repo, demo link, current build errors, database setup, payment context, AWS requirements, and launch goal. If you are non-technical, start with the app link and explain why you want to move it to AWS.',
		},
	];

	const helpTags = [
		'Bolt.new export review',
		'Repo and package cleanup',
		'Local install/build fixes',
		'AWS architecture recommendation',
		'Frontend and backend deployment planning',
		'Environment variable cleanup',
		'Secrets setup strategy',
		'Database and storage planning',
		'Backend/API hardening',
		'Authentication review',
		'Stripe webhook production setup',
		'CI/CD pipeline setup',
		'CloudWatch/logging setup',
		'Cost-aware infrastructure notes',
		'Production QA',
		'Founder-friendly handoff',
	];

	const whatYouGet = [
		'Bolt export review',
		'Repo cleanup',
		'Dependency and build fixes',
		'AWS hosting recommendation',
		'AWS deployment setup',
		'Environment variable cleanup',
		'Secrets setup guidance',
		'Database migration or connection setup',
		'S3 storage setup where needed',
		'Backend and API route review',
		'Authentication and authorization review',
		'Stripe webhook configuration',
		'CI/CD setup',
		'CloudWatch/logging setup',
		'Cost-control notes',
		'QA and launch-readiness checklist',
		'Founder-friendly handoff',
	];

	const checklistIcon = (type) => {
		switch (type) {
			case 'build':
				return <MdBuild className='text-primary' />;
			case 'cloud':
				return <FaCloud className='text-primary' />;
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
						<pattern id='aws-migration-grid' width='24' height='24' patternUnits='userSpaceOnUse'>
							<path d='M 24 0 L 0 0 0 24' fill='none' stroke='currentColor' strokeWidth='0.5' className='text-base-content/20' />
						</pattern>
					</defs>
					<rect width='100%' height='100%' fill='url(#aws-migration-grid)' />
				</svg>
				<div className='absolute inset-0 bg-gradient-to-b from-transparent to-base-100' />
			</div>

			<section className='relative z-10 py-12 lg:py-20 flex flex-col items-center'>
				<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className='text-center max-w-4xl'>
					<h1 className='font-bold text-4xl md:text-6xl lg:text-7xl bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] text-center bg-clip-text text-transparent !leading-[1.2em] mb-6 tracking-tight'>
						Migrate From Bolt to AWS
					</h1>
					<h2 className='text-2xl md:text-3xl text-primary font-bold mb-6'>Can you migrate a Bolt.new app to AWS?</h2>
					<p className='text-lg md:text-xl text-base-content/80 mb-6 max-w-3xl mx-auto leading-relaxed'>
						Yes. A Bolt.new app can be migrated to AWS, but the app usually needs cleanup before it runs safely in a real
						AWS production environment. Bolt is useful for quickly building a working demo, but AWS migration often
						requires export cleanup, dependency fixes, build configuration, backend review, environment variable setup,
						database planning, security hardening, CI/CD, monitoring, and cost-aware infrastructure choices.
					</p>
					<p className='text-base md:text-lg text-base-content/70 mb-10 max-w-2xl mx-auto'>
						VibeToLive helps founders move Bolt.new apps from browser-based prototype to AWS-hosted production app without
						starting from scratch.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-16'>
						<a href='mailto:hello@vibetolive.dev?subject=Migrate%20My%20Bolt%20App%20to%20AWS' className='btn btn-wide btn-primary rounded-full hover:scale-105 transition-all text-primary-content font-bold shadow-lg shadow-primary/20'>
							Migrate My Bolt App to AWS
						</a>
						<a href='mailto:hello@vibetolive.dev?subject=Request%20AWS%20Migration%20Review' className='btn btn-wide btn-outline rounded-full hover:bg-base-content hover:text-base-100 transition-all font-semibold'>
							Request an AWS Migration Review
						</a>
					</div>
				</motion.div>

				<motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className='w-full max-w-4xl bg-base-200 border border-base-content/10 p-6 md:p-8 rounded-2xl shadow-sm relative overflow-hidden'>
					<div className='absolute right-0 top-0 w-24 h-24 bg-orange-500/5 rounded-full blur-2xl' />
					<h3 className='text-xl md:text-2xl font-bold mb-6 flex items-center gap-2'>
						<span className='p-2 bg-orange-500/10 text-orange-500 rounded-lg'><FaRocket /></span>
						A Bolt to AWS migration usually includes:
					</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{MIGRATION_INCLUDES.map((item, idx) => (
							<div key={idx} className='flex items-start gap-3'>
								<span className='text-emerald-500 mt-1'><FaCheck size={14} /></span>
								<span className='text-base-content/80 text-sm md:text-base'>{item}</span>
							</div>
						))}
					</div>
					<p className='mt-6 text-sm text-base-content/70 border-t border-base-content/10 pt-4'>
						VibeToLive is built for founders who created a working app in Bolt and now need the app to run safely on AWS.
					</p>
				</motion.div>

				<div className='mt-16 w-full max-w-5xl'>
					<p className='text-center text-xs md:text-sm font-semibold uppercase tracking-wider text-base-content/40 mb-6'>
						Common Bolt to AWS stack
					</p>
					<div className='flex flex-wrap gap-3 justify-center'>
						{AWS_STACK.map((tech, idx) => (
							<span key={idx} className={`px-4 py-2 border rounded-full text-xs md:text-sm font-medium transition-all hover:scale-105 duration-200 cursor-default ${tech.style}`}>
								{tech.name}
							</span>
						))}
					</div>
				</div>
			</section>

			<div className='border-t border-base-content/10 my-10 max-w-6xl mx-auto' />

			<section className='relative z-10 py-10 max-w-6xl mx-auto px-4'>
				<div className='text-center max-w-3xl mx-auto mb-10'>
					<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
						<FaExclamationTriangle className='text-amber-500' /> Bolt vs AWS
					</div>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						Bolt Is Fast for Prototypes. AWS Needs Production Structure.
					</h2>
					<p className='text-lg text-base-content/75 leading-relaxed mb-4'>
						Bolt.new helps you create an app quickly. You can generate pages, flows, components, backend logic, and a
						working preview inside the browser. That speed is valuable.
					</p>
					<p className='text-lg text-base-content/75 leading-relaxed mb-4'>
						But AWS is a production cloud environment. It gives you control, scalability, and flexibility, but it also
						requires more decisions than a builder preview. You need to choose the right hosting path, configure environment
						variables, connect a production database, secure secrets, manage logs, handle deployment, and avoid unnecessary
						cost.
					</p>
					<p className='text-lg text-base-content/75 leading-relaxed'>
						A Bolt app may work in the Bolt preview but fail after export, local install, AWS build, runtime setup, or
						production deployment. The goal is not just to “put the app on AWS.” The goal is to make the app run safely,
						predictably, and maintainably on AWS.
					</p>
				</div>
			</section>

			<div className='border-t border-base-content/10 my-10 max-w-6xl mx-auto' />

			<section className='relative z-10 py-10 max-w-6xl mx-auto px-4'>
				<div className='text-center max-w-3xl mx-auto mb-12'>
					<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
						<FaShieldAlt className='text-primary' /> Core Definition
					</div>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						What “Migrate From Bolt to AWS” Means
					</h2>
					<p className='text-lg text-base-content/75 leading-relaxed'>
						Migrating from Bolt to AWS means taking the app generated in Bolt.new and preparing it for AWS production
						infrastructure. This may include exporting the code, cleaning up the repo, fixing packages, selecting AWS
						services, configuring secrets, connecting a database, setting up build/deploy workflows, adding monitoring, and
						testing the app in a production-like environment.
					</p>
				</div>
				<div className='bg-base-200/40 border border-base-content/10 p-6 md:p-8 rounded-2xl max-w-4xl mx-auto'>
					<h3 className='text-lg font-bold mb-4'>A successful Bolt to AWS migration should answer these questions:</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
						{MIGRATION_QUESTIONS.map((q, idx) => (
							<div key={idx} className='flex items-start gap-2 text-sm text-base-content/85'>
								<span className='text-primary mt-0.5'><FaCheck size={10} /></span>
								<span>{q}</span>
							</div>
						))}
					</div>
					<p className='mt-6 text-sm text-base-content/70 italic'>
						If these answers are unclear, the migration needs planning before production launch.
					</p>
				</div>
			</section>

			<div className='border-t border-base-content/10 my-10 max-w-6xl mx-auto' />

			<section className='relative z-10 py-10 max-w-6xl mx-auto px-4'>
				<div className='text-center max-w-3xl mx-auto mb-12'>
					<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
						<MdWarning className='text-red-500' /> Migration Risks
					</div>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						Common Problems When Moving Bolt Apps to AWS
					</h2>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{AWS_PROBLEMS.map((problem, idx) => (
						<motion.div
							key={idx}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: idx * 0.04 }}
							viewport={{ once: true }}
							className='bg-base-100 border border-base-content/10 p-6 rounded-xl hover:border-orange-500/40 transition-all h-full'
						>
							<h3 className='text-lg font-bold mb-2 text-base-content'>{problem.title}</h3>
							<p className='text-sm text-base-content/70 mb-4 leading-relaxed'>{problem.desc}</p>
							<ul className='space-y-1.5 mb-4'>
								{problem.bullets.map((bullet, bulletIdx) => (
									<li key={bulletIdx} className='flex items-start gap-2 text-xs text-base-content/80'>
										<span className='text-red-400 mt-0.5'><MdCancel size={12} /></span>
										{bullet}
									</li>
								))}
							</ul>
							{problem.footer && (
								<p className='text-xs text-base-content/60 border-t border-base-content/10 pt-3 italic'>{problem.footer}</p>
							)}
						</motion.div>
					))}
				</div>
			</section>

			<div className='border-t border-base-content/10 my-10 max-w-6xl mx-auto' />

			<section className='relative z-10 py-10 max-w-6xl mx-auto px-4'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
					<div>
						<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
							<MdCheckCircle className='text-emerald-500' /> How We Help
						</div>
						<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
							How VibeToLive Helps Migrate Bolt Apps to AWS
						</h2>
						<p className='text-lg text-base-content/75 mb-6 leading-relaxed'>
							VibeToLive takes your Bolt.new app and prepares it for an AWS production environment.
						</p>
						<p className='text-base-content/70'>
							The goal is to move your app from “works in Bolt” to “runs safely on AWS.”
						</p>
					</div>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2'>
						{helpTags.map((tag, idx) => (
							<div key={idx} className='flex items-center gap-2'>
								<span className='text-emerald-500'><FaCheck size={12} /></span>
								<span className='text-sm text-base-content/85'>{tag}</span>
							</div>
						))}
					</div>
				</div>
			</section>

			<div className='border-t border-base-content/10 my-10 max-w-6xl mx-auto' />

			<section className='relative z-10 py-10 max-w-6xl mx-auto px-4'>
				<div className='text-center max-w-3xl mx-auto mb-12'>
					<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
						<FaCogs className='text-primary' /> Delivery Path
					</div>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						Our Bolt to AWS Migration Process
					</h2>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
					{PROCESS_STEPS.map((item, idx) => (
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

			<section className='relative z-10 py-10 max-w-6xl mx-auto px-4'>
				<div className='text-center max-w-3xl mx-auto mb-12'>
					<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
						<MdOutlineFeaturedPlayList className='text-primary' /> Migration Checklist
					</div>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						Bolt to AWS Migration Checklist
					</h2>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
					{CHECKLIST_CATEGORIES.map((check, idx) => (
						<div key={idx} className='border border-base-content/10 bg-base-100 p-5 rounded-xl'>
							<h3 className='font-bold text-base border-b border-base-content/10 pb-2 mb-4 flex items-center gap-2'>
								{checklistIcon(check.icon)}
								{check.category}
							</h3>
							<ul className='space-y-2 text-xs text-base-content/85'>
								{check.items.map((item, itemIdx) => (
									<li key={itemIdx} className='flex gap-2 items-start'>
										<span className='text-emerald-500 mt-0.5'><FaCheck size={10} /></span>
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
						Depending on the app, your Bolt to AWS migration may include:
					</p>
				</div>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto text-sm text-base-content/95'>
					{whatYouGet.map((item, idx) => (
						<div key={idx} className='flex items-center gap-2.5 p-3 bg-base-100 rounded-xl border border-base-content/5'>
							<span className='text-emerald-500'><FaCheck size={12} /></span>
							<span>{item}</span>
						</div>
					))}
				</div>
			</section>

			<MigrationPricing />

			<section className='relative z-10 py-10 max-w-6xl mx-auto px-4'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<div className='border border-base-content/10 bg-base-100 p-6 md:p-8 rounded-2xl'>
						<h3 className='text-xl font-bold text-emerald-500 mb-6 flex items-center gap-2'>
							<MdCheckCircle className='text-2xl' /> Who This Service Is For
						</h3>
						<ul className='space-y-3 text-sm text-base-content/85'>
							{[
								'Founders who built an app in Bolt.new',
								'Startups moving from Bolt preview to AWS',
								'Apps that need more control than builder hosting',
								'Bolt apps with backend routes or APIs',
								'Apps with user accounts, private data, payments, or admin features',
								'Founders who need AWS but do not want cloud complexity',
								'Teams that need CI/CD and monitoring on AWS',
								'Apps that work in Bolt but fail after export',
								'Founders who want a production handoff after migration',
							].map((item, idx) => (
								<li key={idx} className='flex items-start gap-2'>
									<span className='text-emerald-500 mt-1'>•</span>
									<span>{item}</span>
								</li>
							))}
						</ul>
						<p className='mt-4 text-xs text-base-content/60'>
							This service is not for someone who only needs a generic AWS tutorial. It is for Bolt apps that need a real
							migration path to production.
						</p>
					</div>
					<div className='border border-base-content/10 bg-base-100 p-6 md:p-8 rounded-2xl'>
						<h3 className='text-xl font-bold text-amber-500 mb-6 flex items-center gap-2'>
							<FaCloud className='text-xl' /> When You Should Migrate a Bolt App to AWS
						</h3>
						<ul className='space-y-3 text-sm text-base-content/85'>
							{[
								'You need more infrastructure control',
								'You need a production backend',
								'You need custom runtime behavior',
								'You need AWS database, storage, or security services',
								'You expect more complex backend needs later',
								'You need CloudWatch/logging visibility',
								'You need S3 file storage',
								'You need a controlled deployment process',
								'You already use AWS in your company',
								'You want to move beyond builder preview limitations',
							].map((item, idx) => (
								<li key={idx} className='flex items-start gap-2'>
									<span className='text-amber-500 mt-1'>•</span>
									<span>{item}</span>
								</li>
							))}
						</ul>
						<p className='mt-4 text-xs text-base-content/60'>
							AWS may be too much if the app is a simple landing page, a small static frontend, or a prototype with no
							backend needs. In that case, Vercel, Railway, Render, or another simpler platform may be more practical.
						</p>
					</div>
				</div>
			</section>

			<section className='relative z-10 py-10 bg-base-200/40 p-6 md:p-10 rounded-3xl border border-base-content/5 max-w-6xl mx-auto'>
				<div className='text-center max-w-3xl mx-auto mb-8'>
					<h2 className='text-2xl md:text-4xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-4'>
						Why Use VibeToLive for Bolt to AWS Migration?
					</h2>
					<p className='text-lg text-base-content/75 mb-4'>
						A generic AWS migration can become overcomplicated. A Bolt-generated app needs a migration path that respects
						where the app came from: a fast browser-based AI builder with possible export, dependency, backend, and
						environment gaps.
					</p>
					<p className='text-base text-base-content/70'>
						VibeToLive understands both sides of the problem. The goal is not just AWS deployment. The goal is a Bolt app
						that runs safely and clearly in production.
					</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-sm'>
					{[
						'First, moving a broken Bolt export into AWS before fixing the app itself.',
						'Second, overbuilding AWS infrastructure for a simple MVP.',
						'Third, ignoring backend security, secrets, CI/CD, and monitoring during migration.',
					].map((item, idx) => (
						<div key={idx} className='border border-base-content/10 bg-base-100 p-5 rounded-xl'>
							<h3 className='font-bold text-base mb-2 text-primary'>Mistake {idx + 1}</h3>
							<p className='text-xs text-base-content/75 leading-relaxed'>{item}</p>
						</div>
					))}
				</div>
			</section>

			<section className='relative z-10 py-12 max-w-6xl mx-auto px-4' aria-labelledby='aws-related-guides'>
				<div className='text-center max-w-3xl mx-auto mb-10'>
					<p className='text-sm font-semibold uppercase tracking-wide text-primary'>Related guides</p>
					<h2 id='aws-related-guides' className='text-3xl md:text-4xl font-bold mb-4'>
						Explore more production help
					</h2>
					<p className='text-base text-base-content/75'>
						Use these pages to support this migration without duplicating intent.
					</p>
				</div>
				<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
					{RELATED_GUIDES.map((guide) => (
						<a
							key={guide.slug}
							href={getHrefForLocale(`/${guide.slug}`, langName)}
							className={`group rounded-lg border p-5 transition hover:bg-base-200 ${
								guide.slug === 'from-bolt-to-production'
									? 'border-primary bg-primary/5 hover:border-primary'
									: 'border-base-content/10 hover:border-orange-500'
							}`}
						>
							<h3 className='mb-2 text-lg font-semibold group-hover:text-primary'>{guide.title}</h3>
							<p className='text-sm text-base-content/70'>{guide.description}</p>
						</a>
					))}
				</div>
			</section>

			<section className='relative z-10 py-12 max-w-4xl mx-auto px-4'>
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

			<section className='relative z-10 py-16 bg-gradient-to-b from-transparent to-base-200 rounded-3xl border border-base-content/5 p-8 text-center max-w-5xl mx-4 lg:mx-auto overflow-hidden'>
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,140,0,0.06),transparent)] pointer-events-none' />
				<div className='relative z-10 max-w-3xl mx-auto'>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						Ready to migrate your Bolt app to AWS?
					</h2>
					<p className='text-lg text-base-content/80 mb-8 leading-relaxed'>
						Send your Bolt project, exported repo, or demo link. VibeToLive will review the app, recommend the right AWS
						path, clean up the production blockers, and help migrate it safely.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-6'>
						<a href='mailto:hello@vibetolive.dev?subject=Migrate%20My%20Bolt%20App%20to%20AWS' className='btn btn-wide btn-primary rounded-full hover:scale-105 transition-all font-bold shadow-lg'>
							Migrate My Bolt App to AWS
						</a>
						<a href='mailto:hello@vibetolive.dev?subject=Request%20AWS%20Migration%20Review' className='btn btn-wide btn-outline rounded-full font-semibold hover:bg-base-content hover:text-base-100'>
							Request an AWS Migration Review
						</a>
					</div>
					<p className='text-xs text-base-content/50'>
						Built in Bolt.new and need AWS hosting, backend, database, secrets, CI/CD, or monitoring? We can help you
						migrate without starting over.
					</p>
				</div>
			</section>
		</div>
	);
}
