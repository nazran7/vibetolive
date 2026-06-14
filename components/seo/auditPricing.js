import { FaCheck } from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';
import { TALLY_FORM_URL } from '@/lib/seo/site';

const SNAPSHOT_FEATURES = [
	'Targeted auth review',
	'Database access check',
	'Exposed secrets scan',
	'Highest-risk launch areas',
	'Prioritized findings summary',
];

const LAUNCH_AUDIT_FEATURES = [
	'Auth and protected routes',
	'API route review',
	'Database permissions',
	'Environment variables',
	'Stripe/payment flows',
	'Admin access review',
	'Deployment security notes',
	'Monitoring recommendations',
];

const FIX_SUPPORT_FEATURES = [
	'Full security audit',
	'RLS and permission fixes',
	'Protected route hardening',
	'API validation fixes',
	'Stripe webhook validation',
	'Secret and env cleanup',
	'Optional deployment support',
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

/** Audit-specific pricing for security audit landing pages. */
export default function AuditPricing() {
	return (
		<section
			id='pricing'
			className='relative z-10 py-16 bg-base-200/30 p-6 md:p-12 rounded-3xl border border-base-content/5 max-w-6xl mx-auto'
		>
			<div className='text-center max-w-3xl mx-auto mb-12'>
				<div className='inline-flex items-center gap-2 border-2 border-base-content px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-5'>
					<MdSecurity className='text-primary' /> Audit Pricing
				</div>
				<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-base-content from-50% to-[#9c9c9c] bg-clip-text text-transparent mb-6'>
					Audit-Specific Pricing
				</h2>
				<p className='text-lg text-base-content/75'>
					Focused security review options before you share your app with testers, investors, or real users.
				</p>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto'>
				<div className='border border-base-content/15 bg-base-100 p-6 md:p-8 rounded-2xl flex flex-col justify-between'>
					<div>
						<h3 className='text-2xl font-bold mb-2 text-base-content'>Security Snapshot</h3>
						<p className='text-xs text-base-content/60 mb-6'>Focused pre-launch review</p>
						<div className='text-4xl font-extrabold text-base-content mb-6'>
							$299 <span className='text-sm font-medium text-base-content/60'>starting</span>
						</div>
						<p className='text-sm text-base-content/80 mb-6'>
							For founders who need a focused review before sharing with testers, investors, or early users.
						</p>
						<PlanFeatures items={SNAPSHOT_FEATURES} />
					</div>
					<a
						href={TALLY_FORM_URL} target='_blank' rel='noopener noreferrer'
						className='btn btn-outline rounded-full w-full font-semibold hover:bg-base-content hover:text-base-100'
					>
						Request Snapshot
					</a>
				</div>

				<div className='border-2 border-primary bg-base-100 p-6 md:p-8 rounded-2xl flex flex-col justify-between relative shadow-xl md:scale-105'>
					<div className='absolute top-4 right-4 bg-primary text-primary-content text-xs font-bold uppercase px-2.5 py-1 rounded-full'>
						Popular
					</div>
					<div>
						<h3 className='text-2xl font-bold mb-2 text-base-content'>Launch Security Audit</h3>
						<p className='text-xs text-base-content/60 mb-6'>Full pre-launch security review</p>
						<div className='text-4xl font-extrabold text-primary mb-6'>
							$499 <span className='text-sm font-medium text-base-content/60'>starting</span>
						</div>
						<p className='text-sm text-base-content/80 mb-6'>
							For founders preparing to launch with real users, private data, payments, or dashboards.
						</p>
						<PlanFeatures items={LAUNCH_AUDIT_FEATURES} />
					</div>
					<a
						href={TALLY_FORM_URL} target='_blank' rel='noopener noreferrer'
						className='btn btn-primary rounded-full w-full font-bold'
					>
						Request Audit
					</a>
				</div>

				<div className='border border-base-content/15 bg-base-100 p-6 md:p-8 rounded-2xl flex flex-col justify-between'>
					<div>
						<h3 className='text-2xl font-bold mb-2 text-base-content'>Audit + Fix Support</h3>
						<p className='text-xs text-base-content/60 mb-6'>Audit and remediate</p>
						<div className='text-4xl font-extrabold text-base-content mb-6'>
							$999 <span className='text-sm font-medium text-base-content/60'>starting</span>
						</div>
						<p className='text-sm text-base-content/80 mb-6'>
							For apps with Supabase, Stripe, user accounts, dashboards, admin features, or unclear production risk.
						</p>
						<PlanFeatures items={FIX_SUPPORT_FEATURES} />
					</div>
					<a
						href={TALLY_FORM_URL} target='_blank' rel='noopener noreferrer'
						className='btn btn-outline rounded-full w-full font-semibold hover:bg-base-content hover:text-base-100'
					>
						Audit + Fix
					</a>
				</div>
			</div>
		</section>
	);
}
