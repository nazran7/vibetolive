import { FaCheck } from 'react-icons/fa';
import { MdPriceCheck } from 'react-icons/md';

const REVIEW_FEATURES = [
	'Bolt app and AWS fit review',
	'Migration risk assessment',
	'Hosting options comparison',
	'Estimated migration scope',
];

const SPRINT_FEATURES = [
	'Export cleanup',
	'Build fixes',
	'AWS deployment setup',
	'Environment variables',
	'Basic backend review',
	'Production handoff',
];

const PRODUCTION_FEATURES = [
	'Everything in Migration Sprint',
	'Backend API hardening',
	'Database migration planning',
	'Stripe webhook setup',
	'Auth and admin review',
	'S3 storage setup',
	'CI/CD pipeline',
	'CloudWatch logging',
];

const ONGOING_FEATURES = [
	'AWS maintenance support',
	'Deploy and rollback help',
	'Monitoring and logs',
	'Cost control guidance',
	'Bug fixes after migration',
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

/** AWS migration-specific pricing for Bolt to AWS landing pages. */
export default function MigrationPricing() {
	return (
		<section
			id='pricing'
			className='relative z-10 py-16 bg-base-200/30 p-6 md:p-12 rounded-3xl border border-base-content/5 max-w-6xl mx-auto'
		>
			<div className='text-center max-w-3xl mx-auto mb-12'>
				<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
					<MdPriceCheck className='text-primary' /> Migration Pricing
				</div>
				<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
					Migration-Specific Pricing
				</h2>
				<p className='text-lg text-base-content/75'>
					AWS migration options for Bolt.new apps — not generic deployment pricing.
				</p>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-6xl mx-auto'>
				<div className='border border-base-content/15 bg-base-100 p-6 rounded-2xl flex flex-col justify-between'>
					<div>
						<h3 className='text-xl font-bold mb-2 text-base-content'>AWS Migration Review</h3>
						<p className='text-xs text-base-content/60 mb-4'>Scope and path clarity</p>
						<div className='text-3xl font-extrabold text-base-content mb-4'>
							$299 <span className='text-sm font-medium text-base-content/60'>starting</span>
						</div>
						<p className='text-sm text-base-content/80 mb-4'>
							For founders who need an expert review of the Bolt app, AWS fit, migration risks, hosting options, and
							estimated migration scope. Best when the app is built in Bolt but the AWS path is unclear.
						</p>
						<PlanFeatures items={REVIEW_FEATURES} />
					</div>
					<a
						href='mailto:hello@vibetolive.dev?subject=AWS%20Migration%20Review'
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
						<h3 className='text-xl font-bold mb-2 text-base-content'>Bolt to AWS Migration Sprint</h3>
						<p className='text-xs text-base-content/60 mb-4'>Export cleanup and AWS deploy</p>
						<div className='text-3xl font-extrabold text-primary mb-4'>
							$999 <span className='text-sm font-medium text-base-content/60'>starting</span>
						</div>
						<p className='text-sm text-base-content/80 mb-4'>
							For founders who need export cleanup, build fixes, AWS deployment setup, environment variables, basic
							backend review, and production handoff. Best for simpler Bolt apps moving to AWS for production hosting.
						</p>
						<PlanFeatures items={SPRINT_FEATURES} />
					</div>
					<a
						href='mailto:hello@vibetolive.dev?subject=Bolt%20to%20AWS%20Migration%20Sprint'
						className='btn btn-primary btn-sm rounded-full w-full font-bold'
					>
						Start Migration
					</a>
				</div>

				<div className='border border-base-content/15 bg-base-100 p-6 rounded-2xl flex flex-col justify-between'>
					<div>
						<h3 className='text-xl font-bold mb-2 text-base-content'>AWS Production Migration</h3>
						<p className='text-xs text-base-content/60 mb-4'>Full production migration</p>
						<div className='text-3xl font-extrabold text-base-content mb-4'>
							$1,999 <span className='text-sm font-medium text-base-content/60'>starting</span>
						</div>
						<p className='text-sm text-base-content/80 mb-4'>
							For Bolt apps with backend APIs, database, Stripe, auth, private data, admin features, file storage, CI/CD,
							monitoring, or higher production risk. Best for apps that need a complete production migration, not just
							hosting.
						</p>
						<PlanFeatures items={PRODUCTION_FEATURES} />
					</div>
					<a
						href='mailto:hello@vibetolive.dev?subject=AWS%20Production%20Migration'
						className='btn btn-outline btn-sm rounded-full w-full font-semibold'
					>
						Full Migration
					</a>
				</div>

				<div className='border border-base-content/15 bg-base-100 p-6 rounded-2xl flex flex-col justify-between'>
					<div>
						<h3 className='text-xl font-bold mb-2 text-base-content'>Ongoing AWS Support</h3>
						<p className='text-xs text-base-content/60 mb-4'>Post-migration maintenance</p>
						<div className='text-3xl font-extrabold text-base-content mb-4'>
							$350 <span className='text-xs font-medium text-base-content/60'>/ month</span>
						</div>
						<p className='text-sm text-base-content/80 mb-4'>
							For founders who want help with AWS maintenance, deploys, monitoring, logs, cost control, bug fixes, and
							production support after migration.
						</p>
						<PlanFeatures items={ONGOING_FEATURES} />
					</div>
					<a
						href='mailto:hello@vibetolive.dev?subject=Ongoing%20AWS%20Support'
						className='btn btn-outline btn-sm rounded-full w-full font-semibold'
					>
						Get Support
					</a>
				</div>
			</div>
		</section>
	);
}
