'use client';
import { motion } from 'framer-motion';
import { FaQuestionCircle } from 'react-icons/fa';
import { MdSecurity, MdCloudDone, MdSpeed, MdReplay, MdLock } from 'react-icons/md';

export default function IsThisYou({ locale }) {
	const safeLocale = locale || {
		label: '',
		heading: '',
		subheading: '',
		items: [],
		closing: '',
	};

	const splitLastWord = (text) => {
		if (!text || typeof text !== 'string') return { first: '', last: '' };
		const trimmed = text.trim();
		const idx = trimmed.lastIndexOf(' ');
		if (idx === -1) return { first: '', last: trimmed };
		return { first: trimmed.slice(0, idx), last: trimmed.slice(idx + 1) };
	};

	const { first: headingFirst, last: headingLast } = splitLastWord(safeLocale.heading);

	const iconForIndex = (index) => {
		switch (index) {
			case 0:
				return MdLock;
			case 1:
				return MdSecurity;
			case 2:
				return MdCloudDone;
			case 3:
				return MdSpeed;
			case 4:
				return MdReplay;
			default:
				return FaQuestionCircle;
		}
	};

	return (
		<section className='relative py-10 md:py-20'>
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{
					duration: 0.5,
				}}
			>
				<div className='relative z-10 flex flex-col items-center gap-4 mx-auto text-center'>
					{/* <div className='text-primary text-xs md:text-sm tracking-widest font-semibold uppercase'>
						{safeLocale.label || 'IS THIS YOU'}
					</div> */}

					<h2 className='font-bold text-3xl md:text-5xl text-base-content !leading-[1.25em]'>
						{headingFirst ? `${headingFirst} ` : ''}
						<span className='text-base-content/80'>{headingLast}</span>
					</h2>

					<p className='w-full md:w-10/12 mx-auto text-base md:text-lg text-base-content/70'>
						{safeLocale.subheading}
					</p>

					<div className='w-full md:w-10/12 mx-auto mt-4 grid grid-cols-1 gap-4 md:gap-6'>
						{(safeLocale.items || []).map((item, index) => {
							const Icon = iconForIndex(index);
							const title = typeof item === 'string' ? item : item?.title;
							const subtitle = typeof item === 'string' ? '' : item?.subtitle;

							return (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.05, duration: 0.35 }}
									className='w-full'
								>
									<div className='w-full rounded-xl border border-base-content/10 bg-base-100/60 backdrop-blur p-5 md:p-6 hover:border-base-content/30 transition-colors'>
										<div className='flex items-start gap-4 text-left'>
											<div className='w-10 h-10 rounded-lg bg-base-content/10 text-base-content/80 flex items-center justify-center flex-shrink-0'>
												<Icon className='text-xl' />
											</div>
											<div className='flex flex-col gap-1'>
												<div className='font-semibold text-base-content'>{title}</div>
												{subtitle ? (
													<div className='text-sm text-base-content/60'>{subtitle}</div>
												) : null}
											</div>
										</div>
									</div>
								</motion.div>
							);
						})}
					</div>

					<p className='w-full md:w-10/12 mx-auto text-sm md:text-base text-base-content/60 mt-6 italic'>
						{safeLocale.closing}
					</p>
				</div>
			</motion.div>

			<div className='hidden md:block absolute left-[20%] top-[10%] z-0'>
				<div className='absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]'></div>
			</div>
		</section>
	);
}
