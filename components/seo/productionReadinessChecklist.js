'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
	FaCheck,
	FaChevronDown,
	FaClipboardList,
} from 'react-icons/fa';
import {
	MdWarning,
	MdHelpCenter,
} from 'react-icons/md';
import { getHrefForLocale, TALLY_FORM_URL } from '@/lib/seo/site';

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
	'Custom AI-assisted code',
];

const PRODUCTION_NEEDS = [
	'Secure authentication',
	'Protected routes',
	'Server-side authorization',
	'Safe database permissions',
	'Correct environment variable handling',
	'Backend validation',
	'Payment and webhook reliability',
	'Production deployment configuration',
	'CI/CD or release checks',
	'Monitoring and error tracking',
	'QA across core user flows',
	'Clear handoff notes and rollback plan',
];

const WHO_FOR_FEATURES = [
	'User accounts',
	'Private dashboards',
	'Admin features',
	'Supabase, Firebase, Postgres, or another database',
	'Stripe or paid subscriptions',
	'File uploads',
	'API routes',
	'AI API integrations',
	'Customer data',
	'Internal business workflows',
	'A public launch coming soon',
];

const CHECKLIST_SECTIONS = [
	{
		number: 1,
		title: 'Authentication Checklist',
		intro:
			'Authentication is more than a login screen. A production app must confirm who the user is and keep private pages protected.',
		checks: [
			'Users can sign up and log in reliably',
			'Sessions persist correctly',
			'Logout works properly',
			'Password reset, magic link, or OAuth flow works if used',
			'Private pages require a valid session',
			'Logged-out users cannot access dashboards by direct URL',
			'Admin pages require admin status',
			'Auth redirects work in production',
			'Auth callback URLs use the production domain',
			'Session expiry does not break the app unexpectedly',
		],
		redFlags:
			'Your app is not production-ready if private pages are only hidden in the navigation, if admin pages can be opened by direct URL, or if authentication only works in the preview environment.',
	},
	{
		number: 2,
		title: 'Authorization Checklist',
		intro: 'Authentication confirms identity. Authorization controls what each user can do.',
		checks: [
			'Users can only access records they own',
			'Team or organization access is scoped correctly',
			'Admin actions are restricted server-side',
			'Paid features require valid paid status',
			'API routes check user permissions',
			'Server actions verify ownership before writes',
			'Users cannot change another user’s ID in a request',
			'Role checks are not only handled in the UI',
			'Sensitive actions have backend protection',
			'Unauthorized requests fail safely',
		],
		redFlags:
			'Your app is not production-ready if a user can modify request IDs to access another user’s data, if admin access is only hidden in the UI, or if API routes trust frontend state without checking permissions.',
	},
	{
		number: 3,
		title: 'Database Checklist',
		intro: 'A production database must protect data, support real usage, and match the product’s access rules.',
		checks: [
			'Database schema matches real product flows',
			'Private data is separated from public data',
			'User ownership is enforced',
			'Insert, read, update, and delete permissions are clear',
			'Required fields are enforced',
			'Important relationships are defined',
			'Indexes exist for important queries',
			'Duplicate or invalid records are prevented where possible',
			'Backups or recovery options are considered',
			'Data migrations are planned before major changes',
		],
		redFlags:
			'Your app is not production-ready if users can read or edit records they do not own, if the database has no clear ownership model, or if important production data has no backup strategy.',
	},
	{
		number: 4,
		title: 'Supabase RLS Checklist',
		intro:
			'Many AI-generated apps use Supabase, especially apps built with Lovable. Supabase can be production-ready, but only if Row Level Security is configured correctly.',
		checks: [
			'RLS is enabled on private tables',
			'Select policies restrict reads properly',
			'Insert policies assign or validate ownership',
			'Update policies verify ownership',
			'Delete policies are not too broad',
			'Admin-only data is protected',
			'Public tables are intentionally public',
			'Storage buckets have correct access rules',
			'Service-role key is never exposed to the client',
			'Policies are tested with real user accounts',
		],
		redFlags:
			'Your app is not production-ready if RLS is disabled on private tables, if all authenticated users can read all records, or if the app relies only on frontend filters to protect Supabase data.',
	},
	{
		number: 5,
		title: 'Backend and API Checklist',
		intro: 'AI-generated apps often create routes or server actions quickly. Production backend logic needs stricter checks.',
		checks: [
			'API routes require authentication where needed',
			'Server actions verify the user',
			'Request body input is validated',
			'Database writes check ownership',
			'Admin-only actions are protected',
			'External API calls handle failures',
			'Private keys stay server-side',
			'Error responses do not leak sensitive data',
			'Rate limiting is considered for sensitive endpoints',
			'Logs exist for important failures',
		],
		redFlags:
			'Your app is not production-ready if API routes can be called without auth, if server actions trust the browser, or if private API keys are used in client-side code.',
	},
	{
		number: 6,
		title: 'Environment Variables and Secrets Checklist',
		intro: 'Environment variables are a common production failure point for AI-generated apps.',
		checks: [
			'Public and private variables are separated',
			'Private keys are server-side only',
			'Production values are different from test values where needed',
			'Development, preview, and production environments are separated',
			'.env.example documents required variables without secret values',
			'Stripe live and test keys are not mixed',
			'Database URLs are stored securely',
			'Auth secrets are configured in production',
			'Webhook secrets are configured correctly',
			'No secrets are hardcoded in the repo',
		],
		redFlags:
			'Your app is not production-ready if service-role keys, Stripe secret keys, database URLs, or AI API keys are exposed in browser code, public repositories, screenshots, or frontend bundles.',
	},
	{
		number: 7,
		title: 'Payment and Stripe Checklist',
		intro: 'A checkout page is not a complete payment system. Production payments need backend validation.',
		checks: [
			'Stripe test and live modes are separated',
			'Checkout works with live products and prices',
			'Webhook endpoint is configured',
			'Webhook signature verification is enabled',
			'Subscription state syncs to the app database',
			'Paid-user access is enforced server-side',
			'Canceled users lose paid access correctly',
			'Failed payments are handled',
			'Refunds, downgrades, and upgrades are considered',
			'Customer portal works if used',
		],
		redFlags:
			'Your app is not production-ready if paid access is controlled only in the frontend, if webhooks are not verified, or if canceled users can still access paid features.',
	},
	{
		number: 8,
		title: 'Admin Access Checklist',
		intro: 'Admin features create high risk because they can expose or modify important data.',
		checks: [
			'Admin pages require admin status',
			'Admin API routes are protected',
			'Admin database queries are restricted',
			'Normal users cannot access admin URLs directly',
			'Admin actions validate input',
			'Sensitive admin actions are logged where needed',
			'Admin role assignment is controlled',
			'Admin UI does not expose secrets',
			'Admin access works in production, not only preview',
			'Admin errors are visible in logs',
		],
		redFlags:
			'Your app is not production-ready if admin pages are only hidden in the navigation, if any logged-in user can call admin endpoints, or if admin actions do not verify roles server-side.',
	},
	{
		number: 9,
		title: 'Frontend and UI Checklist',
		intro: 'A production UI should handle real usage, not only the happy path.',
		checks: [
			'Core pages work on desktop, tablet, and mobile',
			'Loading states exist for slow data',
			'Empty states exist when there is no data',
			'Error states are understandable',
			'Forms show validation feedback',
			'Buttons do not allow duplicate submissions',
			'Navigation is clear',
			'Placeholder text is removed',
			'Mock data is replaced with real data',
			'Important flows are accessible and understandable',
		],
		redFlags:
			'Your app is not production-ready if the UI only works with perfect demo data, if users get stuck after errors, or if mock content still appears in production screens.',
	},
	{
		number: 10,
		title: 'Deployment Checklist',
		intro: 'Production deployment should be repeatable and understandable.',
		checks: [
			'Build command is correct',
			'Output directory or framework settings are correct',
			'Runtime settings are configured',
			'Environment variables are set in the hosting platform',
			'Production domain is connected',
			'Redirect URLs are updated to production domain',
			'Auth callbacks use production URLs',
			'Database access works from production',
			'Logs are available',
			'Rollback path is known',
		],
		redFlags:
			'Your app is not production-ready if it only works in builder preview, if deploys depend on manual guessing, or if nobody knows how to roll back a broken release.',
	},
	{
		number: 11,
		title: 'CI/CD and Release Checklist',
		intro: 'CI/CD helps catch problems before production users see them.',
		checks: [
			'App is stored in a Git-based repo',
			'Main branch is protected where appropriate',
			'Install step works cleanly',
			'Typecheck runs before production deploy',
			'Build check runs before production deploy',
			'Lint runs if used',
			'Critical tests run where possible',
			'Preview deployments are available',
			'Production deploy process is clear',
			'Failed deploys are visible',
		],
		redFlags:
			'Your app is not production-ready if every deploy is manual, if no build checks run before launch, or if AI-generated changes go straight to production without review.',
	},
	{
		number: 12,
		title: 'Testing and QA Checklist',
		intro: 'Testing does not need to be perfect, but the main user journeys should work.',
		checks: [
			'Signup flow tested',
			'Login flow tested',
			'Password reset or magic link tested',
			'Dashboard access tested',
			'Form submission tested',
			'Database write/read tested',
			'Payment flow tested if used',
			'Subscription access tested if used',
			'Admin flow tested if used',
			'Mobile layout tested',
			'Error cases tested',
			'Empty states tested',
		],
		redFlags:
			'Your app is not production-ready if only the happy path was tested, if payments were not tested end to end, or if admin/private flows were never tested with real user roles.',
	},
	{
		number: 13,
		title: 'Monitoring and Logging Checklist',
		intro: 'A production app should not fail silently.',
		checks: [
			'Server errors are logged',
			'Frontend errors are tracked where possible',
			'API failures are visible',
			'Payment webhook failures are visible',
			'Auth failures can be investigated',
			'Database errors are visible',
			'Uptime or critical flow monitoring is considered',
			'Founder knows where to check logs',
			'Alerts exist for critical failures where needed',
			'Post-launch monitoring plan exists',
		],
		redFlags:
			'Your app is not production-ready if you would only know something broke after a user complains.',
	},
	{
		number: 14,
		title: 'Performance Checklist',
		intro: 'A production app should be fast enough for real users and stable under normal use.',
		checks: [
			'Main pages load within an acceptable time',
			'Expensive database queries are reviewed',
			'Large payloads are avoided',
			'Images and media are optimized',
			'API routes avoid unnecessary work',
			'Dashboard queries are paginated where needed',
			'Caching is used where appropriate',
			'Serverless limits are understood',
			'Third-party API delays are handled',
			'Slow states show loading feedback',
		],
		redFlags:
			'Your app is not production-ready if one dashboard query loads everything, if the app times out under normal use, or if users see blank screens during slow requests.',
	},
	{
		number: 15,
		title: 'Legal, Privacy, and User Trust Checklist',
		intro:
			'This depends on your product, but every app handling user data should consider trust basics.',
		checks: [
			'Privacy policy exists if user data is collected',
			'Terms exist if users create accounts or pay',
			'Contact/support path is visible',
			'Cookie or analytics notice is considered where relevant',
			'Data deletion process is considered',
			'Sensitive user data is minimized',
			'Emails are not exposed publicly',
			'Payment pages clearly explain what users buy',
			'AI-generated outputs have appropriate disclaimers where needed',
			'User-facing copy does not overpromise',
		],
		redFlags:
			'Your app is not production-ready if it collects private user data or payments without basic privacy, support, and trust information.',
	},
	{
		number: 16,
		title: 'Launch Handoff Checklist',
		intro: 'A production launch should include a clear handoff, even for a solo founder.',
		checks: [
			'Founder knows where the app is hosted',
			'Founder knows where environment variables live',
			'Founder knows where database lives',
			'Founder knows where logs are checked',
			'Founder knows how payments are managed',
			'Founder knows how to roll back a bad deploy',
			'Known risks are documented',
			'Future improvements are listed',
			'Critical credentials are not stored casually',
			'Post-launch watchlist is created',
		],
		redFlags:
			'Your app is not production-ready if only the original builder understands how it works or if nobody knows where to check when something breaks.',
	},
];

const READINESS_SCORES = [
	{
		level: 'Ready for Production',
		color: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-700',
		desc: 'Most critical items are complete. Auth, data access, payments, deployment, monitoring, and QA have been reviewed. Remaining issues are minor improvements.',
	},
	{
		level: 'Almost Ready',
		color: 'border-amber-500/30 bg-amber-500/5 text-amber-700',
		desc: 'The app works, but a few important areas need cleanup before launch. Common examples include incomplete monitoring, missing tests, weak handoff notes, or unclear rollback steps.',
	},
	{
		level: 'Not Ready Yet',
		color: 'border-orange-500/30 bg-orange-500/5 text-orange-700',
		desc: 'Critical launch risks remain. Common examples include unsafe database permissions, unprotected admin routes, missing webhook validation, exposed secrets, broken production deployment, or no clear auth protection.',
	},
	{
		level: 'Still a Prototype',
		color: 'border-red-500/30 bg-red-500/5 text-red-700',
		desc: 'The app looks good but relies heavily on mock data, preview behavior, frontend-only protection, incomplete backend logic, or manual testing.',
	},
];

const FAIL_CHECKLIST_NEXT_STEPS = [
	{
		condition: 'If auth or database permissions are unclear',
		action: 'request a security audit',
		slug: 'ai-app-security-audit',
	},
	{
		condition: 'If deployment is fragile',
		action: 'fix CI/CD and environment variables',
		slug: 'ai-app-cicd-setup',
	},
	{
		condition: 'If the UI is complete but the backend is missing',
		action: 'add backend implementation',
		slug: 'ai-app-builder-with-backend',
	},
	{
		condition: 'If the app is close but buggy',
		action: 'run a finish sprint',
		slug: 'freelancer-to-finish-vibe-coded-app',
	},
	{
		condition: 'If the entire app is moving from demo to real users',
		action: 'use a production-hardening pass',
		slug: 'ai-prototype-to-production',
	},
];

const RELATED_SERVICES = [
	{ slug: 'ai-prototype-to-production', title: 'AI Prototype to Production', description: 'Main production help hub.' },
	{ slug: 'ai-app-security-audit', title: 'AI App Security Audit', description: 'Security review before launch.' },
	{ slug: 'ai-app-cicd-setup', title: 'AI App CI/CD Setup', description: 'Safer deployment pipeline setup.' },
	{ slug: 'ai-app-builder-with-backend', title: 'AI App Builder With Backend', description: 'Backend implementation for AI-built apps.' },
	{ slug: 'freelancer-to-finish-vibe-coded-app', title: 'Freelancer to Finish Vibe-Coded App', description: 'Finish bugs and product gaps.' },
	{ slug: 'from-lovable-to-production', title: 'From Lovable to Production', description: 'Lovable-specific production help.' },
	{ slug: 'from-bolt-to-production', title: 'From Bolt to Production', description: 'Bolt.new-specific production help.' },
	{ slug: 'from-v0-to-production', title: 'From V0 to Production', description: 'V0-generated app production help.' },
	{ slug: 'from-replit-to-production', title: 'From Replit to Production', description: 'Replit-specific production help.' },
	{ slug: 'from-cursor-to-production', title: 'From Cursor to Production', description: 'Cursor-built app production help.' },
];

export default function ProductionReadinessChecklistPage({ langName = 'en' }) {
	const [activeFaq, setActiveFaq] = useState(null);

	const toggleFaq = (index) => {
		setActiveFaq(activeFaq === index ? null : index);
	};

	const faqItems = [
		{
			question: 'What is a production readiness checklist?',
			answer:
				'A production readiness checklist is a pre-launch review of the technical, security, deployment, payment, monitoring, and QA areas that an app should pass before real users depend on it. For AI-generated apps, this checklist is especially useful because the app may look finished while still missing backend, auth, database, or deployment safeguards.',
		},
		{
			question: 'How do I know if my AI-generated app is production-ready?',
			answer:
				'Your AI-generated app is production-ready when it has secure authentication, protected routes, safe database permissions, backend validation, correct environment variables, tested payment flows, reliable deployment, monitoring, and QA across the main user journeys. A working preview or polished UI is not enough by itself.',
		},
		{
			question: 'Do all AI apps need security review before launch?',
			answer:
				'Any AI app with user accounts, private data, payments, admin features, API routes, or database access should be reviewed before launch. Static landing pages may not need a deep security audit, but apps that store data or control access should be checked carefully.',
		},
		{
			question: 'What is the most common reason AI apps are not production-ready?',
			answer:
				'The most common reason is that the UI looks finished while backend rules are incomplete. This often shows up as weak protected routes, permissive database access, missing Supabase RLS policies, exposed environment variables, incomplete Stripe webhooks, or no monitoring after launch.',
		},
		{
			question: 'Is a production-ready app the same as a perfect app?',
			answer:
				'No. Production-ready does not mean perfect. It means the app is safe and stable enough for its next real use case. A beta launch may require less than a public paid launch, but both should protect data, handle errors, deploy reliably, and make critical failures visible.',
		},
		{
			question: 'Should I fix security or UI polish first?',
			answer:
				'Fix security and launch blockers first. Auth, database access, payment state, exposed secrets, and deployment stability are more important than visual polish. UI polish matters, but it should not come before issues that could expose data, break payments, or prevent users from using the app.',
		},
		{
			question: 'Do I need CI/CD before launching an AI app?',
			answer:
				'CI/CD is strongly recommended if the app will support real users or frequent updates. Even a basic pipeline with install, typecheck, build, tests where useful, and preview deployments can catch many problems before production.',
		},
		{
			question: 'Can I launch if some checklist items are missing?',
			answer:
				'It depends which items are missing. Missing minor polish, documentation, or advanced monitoring may be acceptable for a small beta. Missing auth protection, database permissions, payment validation, or secure environment variables should be treated as launch blockers.',
		},
		{
			question: 'What should I send for a production readiness review?',
			answer:
				'You can send your repo, demo link, app description, AI tool used, database setup, auth provider, payment provider, deployment target, known blockers, and launch goal. If you are non-technical, start with the app link and explain what users are supposed to do.',
		},
		{
			question: 'Can VibeToLive fix the issues found in the checklist?',
			answer:
				'Yes. VibeToLive can help with security audits, backend implementation, CI/CD setup, production deployment, bug fixing, payment validation, monitoring, and launch hardening. The right scope depends on which checklist items are missing.',
		},
	];

	return (
		<div className='w-full relative py-5 select-none'>
			<div className='absolute w-full left-0 top-0 h-[400px] z-0 overflow-hidden pointer-events-none opacity-30'>
				<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
					<defs>
						<pattern id='checklist-grid' width='24' height='24' patternUnits='userSpaceOnUse'>
							<path d='M 24 0 L 0 0 0 24' fill='none' stroke='currentColor' strokeWidth='0.5' className='text-base-content/20' />
						</pattern>
					</defs>
					<rect width='100%' height='100%' fill='url(#checklist-grid)' />
				</svg>
				<div className='absolute inset-0 bg-gradient-to-b from-transparent to-base-100' />
			</div>

			<section className='relative z-10 py-12 lg:py-20 flex flex-col items-center'>
				<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className='text-center max-w-4xl'>
					<h1 className='font-bold text-4xl md:text-6xl lg:text-7xl bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] text-center bg-clip-text text-transparent !leading-[1.2em] mb-6 tracking-tight'>
						Production Readiness Checklist for AI Apps
					</h1>
					<h2 className='text-2xl md:text-3xl text-primary font-bold mb-6'>
						How do you know if an AI-generated app is ready for production?
					</h2>
					<p className='text-lg md:text-xl text-base-content/80 mb-6 max-w-3xl mx-auto leading-relaxed'>
						An AI-generated app is ready for production when it can safely support real users, private data, payments,
						deployment updates, monitoring, and failure handling. A working demo is not enough. Before launch, the app
						should be reviewed across authentication, database permissions, backend logic, environment variables, payments,
						deployment, CI/CD, monitoring, and QA.
					</p>
					<p className='text-base md:text-lg text-base-content/70 mb-10 max-w-2xl mx-auto'>
						Use this checklist before launching an app built with Lovable, Bolt.new, V0, Cursor, Replit, ChatGPT, Claude,
						Windsurf, Base44, or another AI-assisted workflow.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-16'>
						<a href={TALLY_FORM_URL} target='_blank' rel='noopener noreferrer' className='btn btn-wide btn-primary rounded-full hover:scale-105 transition-all text-primary-content font-bold shadow-lg shadow-primary/20'>
							Check My App Readiness
						</a>
						<a href={TALLY_FORM_URL} target='_blank' rel='noopener noreferrer' className='btn btn-wide btn-outline rounded-full hover:bg-base-content hover:text-base-100 transition-all font-semibold'>
							Request a Production Review
						</a>
					</div>
				</motion.div>

				<motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className='w-full max-w-4xl bg-base-200 border border-base-content/10 p-6 md:p-8 rounded-2xl shadow-sm'>
					<h3 className='text-xl md:text-2xl font-bold mb-6 flex items-center gap-2'>
						<span className='p-2 bg-primary/10 text-primary rounded-lg'><FaClipboardList /></span>
						A production-ready AI app should have:
					</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{PRODUCTION_NEEDS.map((item, idx) => (
							<div key={idx} className='flex items-start gap-3'>
								<span className='text-emerald-500 mt-1'><FaCheck size={14} /></span>
								<span className='text-base-content/80 text-sm md:text-base'>{item}</span>
							</div>
						))}
					</div>
					<p className='mt-6 text-sm text-base-content/70 border-t border-base-content/10 pt-4'>
						If several items are missing, the app is still a prototype and should be hardened before real users depend on it.
					</p>
				</motion.div>
			</section>

			<div className='border-t border-base-content/10 my-10 max-w-6xl mx-auto' />

			<section className='relative z-10 py-10 max-w-6xl mx-auto px-4'>
				<div className='text-center max-w-3xl mx-auto mb-10'>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						Why AI Apps Need a Production Readiness Checklist
					</h2>
					<p className='text-lg text-base-content/75 leading-relaxed mb-4'>
						AI tools help founders build working demos faster than ever. You can generate interfaces, forms, dashboards,
						database connections, auth screens, and even API routes in a fraction of the time traditional development would
						take. That speed is useful.
					</p>
					<p className='text-lg text-base-content/75 leading-relaxed mb-4'>
						But production is different from a demo. A demo only needs to prove that the idea can work. A production app
						must protect users, handle real data, process payments correctly, recover from errors, deploy reliably, and give
						the founder visibility when something breaks.
					</p>
					<p className='text-lg text-base-content/75 leading-relaxed'>
						Many AI-generated apps look ready before they are truly safe to launch. The UI may be polished, but backend rules
						may be incomplete. The dashboard may show data, but the database may be too open. The checkout page may work in
						test mode, but webhooks may not be verified. The app may deploy once, but future changes may break it. This
						checklist helps you find those gaps before launch.
					</p>
				</div>
			</section>

			<div className='border-t border-base-content/10 my-10 max-w-6xl mx-auto' />

			<section className='relative z-10 py-10 max-w-6xl mx-auto px-4'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
					<div>
						<h2 className='text-2xl md:text-3xl font-bold mb-6'>Who This Checklist Is For</h2>
						<p className='text-base text-base-content/75 mb-4'>Use this checklist if you built an app with:</p>
						<div className='flex flex-wrap gap-2 mb-6'>
							{AI_BUILDERS.map((name) => (
								<span key={name} className='px-3 py-1.5 border border-primary/20 text-primary bg-primary/5 rounded-full text-xs font-medium'>{name}</span>
							))}
						</div>
					</div>
					<div>
						<p className='text-base text-base-content/75 mb-4'>This checklist is especially useful if your app has:</p>
						<ul className='space-y-2 text-sm text-base-content/85'>
							{WHO_FOR_FEATURES.map((item, idx) => (
								<li key={idx} className='flex items-start gap-2'>
									<span className='text-emerald-500 mt-1'><FaCheck size={10} /></span>
									<span>{item}</span>
								</li>
							))}
						</ul>
						<p className='mt-4 text-sm text-base-content/60'>
							If your project is only a static landing page, you may not need every item. If your app stores data, accepts
							payments, or has private user flows, this checklist matters.
						</p>
					</div>
				</div>
			</section>

			<div className='border-t border-base-content/10 my-10 max-w-6xl mx-auto' />

			<section className='relative z-10 py-10 max-w-6xl mx-auto px-4' id='checklist'>
				<div className='text-center max-w-3xl mx-auto mb-12'>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						The AI App Production Readiness Checklist
					</h2>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8'>
					{CHECKLIST_SECTIONS.map((section) => (
						<motion.article
							key={section.number}
							initial={{ opacity: 0, y: 16 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.35 }}
							viewport={{ once: true }}
							className='border border-base-content/10 bg-base-100 rounded-2xl p-6 md:p-8 scroll-mt-24 h-full'
							id={`checklist-${section.number}`}
						>
							<h3 className='text-xl md:text-2xl font-bold text-primary mb-3'>
								{section.number}. {section.title}
							</h3>
							<p className='text-sm md:text-base text-base-content/75 mb-5 leading-relaxed'>{section.intro}</p>

							<p className='text-sm font-bold uppercase tracking-wide text-base-content/50 mb-3'>Check:</p>
							<ul className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-6'>
								{section.checks.map((item, idx) => (
									<li key={idx} className='flex items-start gap-2 text-sm text-base-content/85'>
										<span className='text-emerald-500 mt-0.5 flex-shrink-0'><FaCheck size={10} /></span>
										<span>{item}</span>
									</li>
								))}
							</ul>

							<div className='border-t border-base-content/10 pt-5'>
								<p className='text-sm font-bold uppercase tracking-wide text-red-500 mb-2 flex items-center gap-2'>
									<MdWarning size={16} /> Red flags
								</p>
								<p className='text-sm text-base-content/80 leading-relaxed'>{section.redFlags}</p>
							</div>
						</motion.article>
					))}
				</div>
			</section>

			<div className='border-t border-base-content/10 my-10 max-w-6xl mx-auto' />

			<section className='relative z-10 py-10 max-w-6xl mx-auto px-4'>
				<div className='text-center max-w-3xl mx-auto mb-10'>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						Production Readiness Score
					</h2>
					<p className='text-lg text-base-content/75'>Use this simple scoring system.</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto'>
					{READINESS_SCORES.map((score) => (
						<div key={score.level} className={`border p-6 rounded-xl ${score.color}`}>
							<h3 className='font-bold text-lg mb-3'>{score.level}</h3>
							<p className='text-sm leading-relaxed opacity-90'>{score.desc}</p>
						</div>
					))}
				</div>
			</section>

			<div className='border-t border-base-content/10 my-10 max-w-6xl mx-auto' />

			<section className='relative z-10 py-10 max-w-6xl mx-auto px-4'>
				<div className='text-center max-w-3xl mx-auto mb-10'>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						What to Do If Your App Fails the Checklist
					</h2>
					<p className='text-lg text-base-content/75 mb-4'>
						Do not panic. Most AI-generated apps fail several checklist items before production hardening.
					</p>
				</div>
				<div className='max-w-3xl mx-auto space-y-4'>
					<p className='text-sm font-bold text-base-content/60 mb-4'>The right next step depends on the risk:</p>
					{FAIL_CHECKLIST_NEXT_STEPS.map((step, idx) => (
						<div key={idx} className='flex flex-col sm:flex-row sm:items-center gap-2 p-4 border border-base-content/10 bg-base-100 rounded-xl'>
							<span className='text-sm text-base-content/85 flex-1'>{step.condition},</span>
							<a href={getHrefForLocale(`/${step.slug}`, langName)} className='text-sm font-semibold text-primary hover:underline whitespace-nowrap'>
								{step.action} →
							</a>
						</div>
					))}
					<p className='text-base text-base-content/70 pt-4'>
						The goal is not to make the app perfect. The goal is to remove the launch blockers that could expose data, lose
						payments, break user flows, or damage trust.
					</p>
				</div>
			</section>

			<div className='border-t border-base-content/10 my-10 max-w-6xl mx-auto' />

			<section className='relative z-10 py-12 max-w-6xl mx-auto px-4'>
				<div className='text-center max-w-3xl mx-auto mb-10'>
					<p className='text-sm font-semibold uppercase tracking-wide text-primary'>Related services and guides</p>
					<h2 className='text-3xl md:text-4xl font-bold mb-4'>Get help with the gaps you find</h2>
					<p className='text-base text-base-content/75'>
						Use these pages to support this checklist without duplicating intent.
					</p>
				</div>
				<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
					{RELATED_SERVICES.map((guide) => (
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
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,182,0.05),transparent)] pointer-events-none' />
				<div className='relative z-10 max-w-3xl mx-auto'>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
						Not sure if your AI app is ready for production?
					</h2>
					<p className='text-lg text-base-content/80 mb-8 leading-relaxed'>
						Send your app, repo, or demo link. VibeToLive will review the production gaps, identify launch blockers, and
						help you decide what needs to be fixed before real users arrive.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-6'>
						<a href={TALLY_FORM_URL} target='_blank' rel='noopener noreferrer' className='btn btn-wide btn-primary rounded-full hover:scale-105 transition-all font-bold shadow-lg'>
							Check My App Readiness
						</a>
						<a href={TALLY_FORM_URL} target='_blank' rel='noopener noreferrer' className='btn btn-wide btn-outline rounded-full font-semibold hover:bg-base-content hover:text-base-100'>
							Request a Production Review
						</a>
					</div>
					<p className='text-xs text-base-content/50'>
						Built with Lovable, Bolt.new, V0, Cursor, Replit, ChatGPT, Claude, Windsurf, or Base44? Use this checklist first,
						then get expert help if anything feels risky.
					</p>
				</div>
			</section>
		</div>
	);
}
