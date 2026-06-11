import { FaCheck } from 'react-icons/fa';
import { MdPriceCheck } from 'react-icons/md';

const FINISH_REVIEW_FEATURES = [
	'App and blocker review',
	'Launch risk assessment',
	'Recommended next steps',
	'Scope clarity before hiring',
];

const FINISH_SPRINT_FEATURES = [
	'Critical bug fixes',
	'Backend cleanup',
	'Auth and route fixes',
	'UI polish',
	'Deployment help',
	'Core-flow completion',
];

const LAUNCH_READY_FEATURES = [
	'Everything in Finish Sprint',
	'Production hardening',
	'Database permission fixes',
	'Stripe/payment completion',
	'Monitoring setup',
	'QA and launch handoff',
];

const ONGOING_FEATURES = [
	'Monthly health checks',
	'Bug fixes and small improvements',
	'Production support',
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

/** Finish-specific pricing for vibe-coded app completion landing pages. */
export default function FinishPricing() {
	return (
		<section
			id='pricing'
			className='relative z-10 py-16 bg-base-200/30 p-6 md:p-12 rounded-3xl border border-base-content/5 max-w-6xl mx-auto'
		>
			<div className='text-center max-w-3xl mx-auto mb-12'>
				<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
					<MdPriceCheck className='text-primary' /> Finish Pricing
				</div>
				<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
					Pricing and Service Options
				</h2>
				<p className='text-lg text-base-content/75'>
					Scoped finishing offers for vibe-coded apps — from expert review to hands-on completion.
				</p>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-6xl mx-auto'>
				<div className='border border-base-content/15 bg-base-100 p-6 rounded-2xl flex flex-col justify-between'>
					<div>
						<h3 className='text-xl font-bold mb-2 text-base-content'>Finish Review</h3>
						<p className='text-xs text-base-content/60 mb-4'>Expert scope review</p>
						<div className='text-3xl font-extrabold text-base-content mb-4'>
							$199 <span className='text-sm font-medium text-base-content/60'>starting</span>
						</div>
						<p className='text-sm text-base-content/80 mb-4'>
							For founders unsure whether the app needs small fixes, deeper engineering, or a full production pass.
						</p>
						<PlanFeatures items={FINISH_REVIEW_FEATURES} />
					</div>
					<a
						href='mailto:hello@vibetolive.dev?subject=Finish%20Review'
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
						<h3 className='text-xl font-bold mb-2 text-base-content'>Finish Sprint</h3>
						<p className='text-xs text-base-content/60 mb-4'>Hands-on blocker fixes</p>
						<div className='text-3xl font-extrabold text-primary mb-4'>
							$799 <span className='text-sm font-medium text-base-content/60'>starting</span>
						</div>
						<p className='text-sm text-base-content/80 mb-4'>
							For apps that are close but need bug fixes, backend cleanup, UI polish, auth fixes, or deployment help.
						</p>
						<PlanFeatures items={FINISH_SPRINT_FEATURES} />
					</div>
					<a
						href='mailto:hello@vibetolive.dev?subject=Finish%20Sprint'
						className='btn btn-primary btn-sm rounded-full w-full font-bold'
					>
						Start Sprint
					</a>
				</div>

				<div className='border border-base-content/15 bg-base-100 p-6 rounded-2xl flex flex-col justify-between'>
					<div>
						<h3 className='text-xl font-bold mb-2 text-base-content'>Launch-Ready Finish</h3>
						<p className='text-xs text-base-content/60 mb-4'>Finish, harden, and test</p>
						<div className='text-3xl font-extrabold text-base-content mb-4'>
							$1,499 <span className='text-sm font-medium text-base-content/60'>starting</span>
						</div>
						<p className='text-sm text-base-content/80 mb-4'>
							For apps with user accounts, private data, payments, dashboards, or production deployment requirements.
						</p>
						<PlanFeatures items={LAUNCH_READY_FEATURES} />
					</div>
					<a
						href='mailto:hello@vibetolive.dev?subject=Launch-Ready%20Finish'
						className='btn btn-outline btn-sm rounded-full w-full font-semibold'
					>
						Go Launch-Ready
					</a>
				</div>

				<div className='border border-base-content/15 bg-base-100 p-6 rounded-2xl flex flex-col justify-between'>
					<div>
						<h3 className='text-xl font-bold mb-2 text-base-content'>Ongoing Product Support</h3>
						<p className='text-xs text-base-content/60 mb-4'>Post-launch partner</p>
						<div className='text-3xl font-extrabold text-base-content mb-4'>
							$250 <span className='text-xs font-medium text-base-content/60'>/ month</span>
						</div>
						<p className='text-sm text-base-content/80 mb-4'>
							For founders who want help after launch with bug fixes, improvements, monitoring, and production support.
						</p>
						<PlanFeatures items={ONGOING_FEATURES} />
					</div>
					<a
						href='mailto:hello@vibetolive.dev?subject=Ongoing%20Product%20Support'
						className='btn btn-outline btn-sm rounded-full w-full font-semibold'
					>
						Get Support
					</a>
				</div>
			</div>
		</section>
	);
}
