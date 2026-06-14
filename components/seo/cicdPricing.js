import { FaCheck } from 'react-icons/fa';
import { MdPriceCheck } from 'react-icons/md';
import { TALLY_FORM_URL } from '@/lib/seo/site';

const REVIEW_FEATURES = [
	'Deployment process review',
	'Repo and branch workflow check',
	'Build and release risk assessment',
	'Recommended next steps',
];

const PIPELINE_FEATURES = [
	'GitHub Actions setup',
	'Install, typecheck, and build',
	'Lint and basic test workflow',
	'Preview deployment setup',
	'Deployment documentation',
];

const GUARDRAILS_FEATURES = [
	'Everything in Pipeline Setup',
	'Critical-flow tests',
	'Environment validation',
	'Branch protection workflow',
	'Stripe/webhook test path',
	'Rollback and monitoring notes',
];

const ONGOING_FEATURES = [
	'Deploy monitoring support',
	'Failed build triage',
	'Test improvements',
	'Safe release help after launch',
];

function PlanFeatures({ items }) {
	return (
		<ul className='space-y-3 text-xs text-base-content/75 mb-8 border-t border-base-content/10 pt-6'>
			{items.map((feature) => (
				<li key={feature} className='flex gap-2 items-center'>
					<span className='text-emerald-500'>
						<FaCheck size={10} />
					</span>
					<span>{feature}</span>
				</li>
			))}
		</ul>
	);
}

/** CI/CD-specific pricing for deployment pipeline landing pages. */
export default function CicdPricing() {
	return (
		<section
			id='pricing'
			className='relative z-10 py-16 bg-base-200/30 p-6 md:p-12 rounded-3xl border border-base-content/5 max-w-6xl mx-auto'
		>
			<div className='text-center max-w-3xl mx-auto mb-12'>
				<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
					<MdPriceCheck className='text-primary' /> CI/CD Pricing
				</div>
				<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
					CI/CD-Specific Pricing
				</h2>
				<p className='text-lg text-base-content/75'>
					Focused deployment pipeline options for AI-generated apps moving toward real users.
				</p>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-6xl mx-auto'>
				<div className='border border-base-content/15 bg-base-100 p-6 rounded-2xl flex flex-col justify-between'>
					<div>
						<h3 className='text-xl font-bold mb-2 text-base-content'>CI/CD Review</h3>
						<p className='text-xs text-base-content/60 mb-4'>Release process review</p>
						<div className='text-3xl font-extrabold text-base-content mb-4'>
							$199 <span className='text-sm font-medium text-base-content/60'>starting</span>
						</div>
						<p className='text-sm text-base-content/80 mb-4'>
							For founders unsure whether their current deploy process, repo setup, and build checks are safe enough.
						</p>
						<PlanFeatures items={REVIEW_FEATURES} />
					</div>
					<a
						href={TALLY_FORM_URL} target='_blank' rel='noopener noreferrer'
						className='btn btn-outline btn-sm rounded-full w-full font-semibold'
					>
						Request Review
					</a>
				</div>

				<div className='border-2 border-primary bg-base-100 p-6 rounded-2xl flex flex-col justify-between relative shadow-xl'>
					<div className='absolute top-3 right-3 bg-primary text-primary-content text-xs font-bold uppercase px-2 py-0.5 rounded-full'>
						Popular
					</div>
					<div>
						<h3 className='text-xl font-bold mb-2 text-base-content'>Pipeline Setup</h3>
						<p className='text-xs text-base-content/60 mb-4'>GitHub Actions and previews</p>
						<div className='text-3xl font-extrabold text-primary mb-4'>
							$499 <span className='text-sm font-medium text-base-content/60'>starting</span>
						</div>
						<p className='text-sm text-base-content/80 mb-4'>
							For AI-generated apps preparing for beta users or production launch.
						</p>
						<PlanFeatures items={PIPELINE_FEATURES} />
					</div>
					<a
						href={TALLY_FORM_URL} target='_blank' rel='noopener noreferrer'
						className='btn btn-primary btn-sm rounded-full w-full font-bold'
					>
						Set Up Pipeline
					</a>
				</div>

				<div className='border border-base-content/15 bg-base-100 p-6 rounded-2xl flex flex-col justify-between'>
					<div>
						<h3 className='text-xl font-bold mb-2 text-base-content'>Production Release Guardrails</h3>
						<p className='text-xs text-base-content/60 mb-4'>Higher-risk launch protection</p>
						<div className='text-3xl font-extrabold text-base-content mb-4'>
							$999 <span className='text-sm font-medium text-base-content/60'>starting</span>
						</div>
						<p className='text-sm text-base-content/80 mb-4'>
							For apps with payments, private data, admin roles, API routes, or higher production risk.
						</p>
						<PlanFeatures items={GUARDRAILS_FEATURES} />
					</div>
					<a
						href={TALLY_FORM_URL} target='_blank' rel='noopener noreferrer'
						className='btn btn-outline btn-sm rounded-full w-full font-semibold'
					>
						Add Guardrails
					</a>
				</div>

				<div className='border border-base-content/15 bg-base-100 p-6 rounded-2xl flex flex-col justify-between'>
					<div>
						<h3 className='text-xl font-bold mb-2 text-base-content'>Ongoing Release Support</h3>
						<p className='text-xs text-base-content/60 mb-4'>Post-launch deploy help</p>
						<div className='text-3xl font-extrabold text-base-content mb-4'>
							$250 <span className='text-xs font-medium text-base-content/60'>/ month</span>
						</div>
						<p className='text-sm text-base-content/80 mb-4'>
							For founders who want help monitoring deploys, fixing failed builds, and shipping updates safely.
						</p>
						<PlanFeatures items={ONGOING_FEATURES} />
					</div>
					<a
						href={TALLY_FORM_URL} target='_blank' rel='noopener noreferrer'
						className='btn btn-outline btn-sm rounded-full w-full font-semibold'
					>
						Get Support
					</a>
				</div>
			</div>
		</section>
	);
}
