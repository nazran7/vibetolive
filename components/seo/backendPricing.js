import { FaCheck } from 'react-icons/fa';
import { MdPriceCheck } from 'react-icons/md';
import { TALLY_FORM_URL } from '@/lib/seo/site';

const REVIEW_FEATURES = [
	'UI flow and data needs review',
	'Auth and database status check',
	'API and payment needs assessment',
	'Recommended backend scope',
];

const BUILD_SPRINT_FEATURES = [
	'Auth and database setup',
	'API routes and server actions',
	'Form validation and persistence',
	'User ownership rules',
	'Admin logic',
	'Basic production backend work',
];

const PAYMENTS_FEATURES = [
	'Everything in Backend Build Sprint',
	'Stripe checkout integration',
	'Webhook verification',
	'Subscription access logic',
	'Paid-user enforcement',
	'Production payment validation',
];

const ONGOING_FEATURES = [
	'Backend maintenance support',
	'Bug fixes and flow improvements',
	'Production user support',
	'Priority support channel',
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

/** Backend-specific pricing for AI app backend landing pages. */
export default function BackendPricing() {
	return (
		<section
			id='pricing'
			className='relative z-10 py-16 bg-base-200/30 p-6 md:p-12 rounded-3xl border border-base-content/5 max-w-6xl mx-auto'
		>
			<div className='text-center max-w-3xl mx-auto mb-12'>
				<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
					<MdPriceCheck className='text-primary' /> Backend Pricing
				</div>
				<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
					Backend-Specific Pricing
				</h2>
				<p className='text-lg text-base-content/75'>
					Scoped backend options for AI-built apps that need real data, auth, APIs, and payments.
				</p>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-6xl mx-auto'>
				<div className='border border-base-content/15 bg-base-100 p-6 rounded-2xl flex flex-col justify-between'>
					<div>
						<h3 className='text-xl font-bold mb-2 text-base-content'>Backend Review</h3>
						<p className='text-xs text-base-content/60 mb-4'>Scope and gap analysis</p>
						<div className='text-3xl font-extrabold text-base-content mb-4'>
							$199 <span className='text-sm font-medium text-base-content/60'>starting</span>
						</div>
						<p className='text-sm text-base-content/80 mb-4'>
							Understand what backend is missing from your AI-built app before you commit to a build scope.
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
						<h3 className='text-xl font-bold mb-2 text-base-content'>Backend Build Sprint</h3>
						<p className='text-xs text-base-content/60 mb-4'>Core backend functionality</p>
						<div className='text-3xl font-extrabold text-primary mb-4'>
							$999 <span className='text-sm font-medium text-base-content/60'>starting</span>
						</div>
						<p className='text-sm text-base-content/80 mb-4'>
							For auth, database setup, forms, API routes, user ownership, admin logic, and basic production backend work.
						</p>
						<PlanFeatures items={BUILD_SPRINT_FEATURES} />
					</div>
					<a
						href={TALLY_FORM_URL} target='_blank' rel='noopener noreferrer'
						className='btn btn-primary btn-sm rounded-full w-full font-bold'
					>
						Start Build Sprint
					</a>
				</div>

				<div className='border border-base-content/15 bg-base-100 p-6 rounded-2xl flex flex-col justify-between'>
					<div>
						<h3 className='text-xl font-bold mb-2 text-base-content'>Backend + Payments</h3>
						<p className='text-xs text-base-content/60 mb-4'>Backend with Stripe</p>
						<div className='text-3xl font-extrabold text-base-content mb-4'>
							$1,499 <span className='text-sm font-medium text-base-content/60'>starting</span>
						</div>
						<p className='text-sm text-base-content/80 mb-4'>
							For SaaS apps, paid tools, marketplaces, or membership products needing Stripe and webhook logic.
						</p>
						<PlanFeatures items={PAYMENTS_FEATURES} />
					</div>
					<a
						href={TALLY_FORM_URL} target='_blank' rel='noopener noreferrer'
						className='btn btn-outline btn-sm rounded-full w-full font-semibold'
					>
						Backend + Payments
					</a>
				</div>

				<div className='border border-base-content/15 bg-base-100 p-6 rounded-2xl flex flex-col justify-between'>
					<div>
						<h3 className='text-xl font-bold mb-2 text-base-content'>Ongoing Backend Support</h3>
						<p className='text-xs text-base-content/60 mb-4'>Post-launch backend help</p>
						<div className='text-3xl font-extrabold text-base-content mb-4'>
							$250 <span className='text-xs font-medium text-base-content/60'>/ month</span>
						</div>
						<p className='text-sm text-base-content/80 mb-4'>
							Maintain backend logic, fix bugs, improve flows, and support production users after launch.
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
