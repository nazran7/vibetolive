import { FaCheck } from 'react-icons/fa';
import { MdPriceCheck } from 'react-icons/md';

const VIBE_TO_LIVE_FEATURES = [
	'Codebase intake + light audit',
	'Minimal targeted remediation',
	'Baseline security & config pass',
	'Production readiness checks',
	'Lightweight observability hooks',
	'CI/CD pipeline configuration',
	'Deploy to chosen cloud target',
	'1 work-week turnaround',
];

const ADD_SOME_SPICE_FEATURES = [
	'Everything in Vibe → Live',
	'Prioritized feature additions',
	'Targeted bug triage & fixes',
	'UI/UX refresh passes',
	'Performance tuning & scaling',
	'Technical debt reduction sprints',
	'Custom timeline based on scope',
];

const KEEP_IT_ALIVE_FEATURES = [
	'Monthly health checks & audits',
	'Dependency updates & security patching',
	'Uptime and performance monitoring',
	'Hotfix deployment for bugs',
	'Up to 2 hours monthly dev time',
	'Priority support channel access',
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

/** Canonical pricing block for all SEO landing pages. */
export default function SeoPricing() {
	return (
		<section
			id='pricing'
			className='relative z-10 py-16 bg-base-200/30 p-6 md:p-12 rounded-3xl border border-base-content/5 max-w-6xl mx-auto'
		>
			<div className='text-center max-w-3xl mx-auto mb-12'>
				<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
					<MdPriceCheck className='text-primary' /> Plans
				</div>
				<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-8 pb-8'>
					Pricing and Service Options
				</h2>
				<p className='text-lg text-base-content/75'>Simple, transparent rates designed around codebase complexity:</p>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-10'>
				<div className='border-2 border-primary bg-base-100 p-6 md:p-8 rounded-2xl flex flex-col justify-between relative shadow-xl md:scale-105'>
					<div className='absolute top-4 right-4 bg-primary text-primary-content text-xs font-bold uppercase px-2.5 py-1 rounded-full'>
						Popular
					</div>
					<div>
						<h3 className='text-2xl font-bold mb-2 text-base-content'>Vibe → Live</h3>
						<p className='text-xs text-base-content/60 mb-6'>Production-Readiness & Launch</p>
						<div className='text-4xl font-extrabold text-primary mb-6'>
							$499 <span className='text-sm font-medium text-base-content/60'>flat fee</span>
						</div>
						<p className='text-sm text-base-content/80 mb-6'>
							For founders who have a working prototype and need help getting it safely deployed.
						</p>
						<PlanFeatures items={VIBE_TO_LIVE_FEATURES} />
					</div>
					<a
						href='mailto:hello@vibetolive.dev?subject=Order%20Vibe%20to%20Live'
						className='btn btn-primary rounded-full w-full font-bold'
					>
						Choose Plan
					</a>
				</div>

				<div className='border border-base-content/15 bg-base-100 p-6 md:p-8 rounded-2xl flex flex-col justify-between'>
					<div>
						<h3 className='text-2xl font-bold mb-2 text-base-content'>Add Some Spice</h3>
						<p className='text-xs text-base-content/60 mb-6'>Enhance, Fix, Polish & Launch</p>
						<div className='text-4xl font-extrabold text-base-content mb-6'>
							$999+ <span className='text-sm font-medium text-base-content/60'>scoped</span>
						</div>
						<p className='text-sm text-base-content/80 mb-6'>
							Best when your prototype works, but important product logic is missing, broken, or unstable.
						</p>
						<PlanFeatures items={ADD_SOME_SPICE_FEATURES} />
					</div>
					<a
						href='mailto:hello@vibetolive.dev?subject=Order%20Add%20Some%20Spice'
						className='btn btn-outline rounded-full w-full font-semibold hover:bg-base-content hover:text-base-100'
					>
						Choose Plan
					</a>
				</div>

				<div className='border border-base-content/15 bg-base-100 p-6 md:p-8 rounded-2xl flex flex-col justify-between'>
					<div>
						<h3 className='text-2xl font-bold mb-2 text-base-content'>Keep It Alive</h3>
						<p className='text-xs text-base-content/60 mb-6'>Ongoing Maintenance</p>
						<div className='text-4xl font-extrabold text-base-content mb-6'>
							$250 <span className='text-xs font-medium text-base-content/60'>/ month</span>
						</div>
						<p className='text-sm text-base-content/80 mb-6'>
							For founders who want post-launch peace of mind, updates, health monitoring, and security patching.
						</p>
						<PlanFeatures items={KEEP_IT_ALIVE_FEATURES} />
					</div>
					<a
						href='mailto:hello@vibetolive.dev?subject=Order%20Keep%20It%20Alive'
						className='btn btn-outline rounded-full w-full font-semibold hover:bg-base-content hover:text-base-100'
					>
						Choose Plan
					</a>
				</div>
			</div>
		</section>
	);
}
