// SEO Pages Data - Stored locally in frontend
export const seoPagesData = {
	'ai-prototype-to-production': {
		slug: 'ai-prototype-to-production',
		metaTitle: 'AI Prototype to Production | Make AI Apps Production-Ready',
		metaDescription: 'Transform your AI-generated prototypes into secure, scalable, production-ready applications. VibeToLive.dev helps founders, startups, and lean teams turn AI prototypes into production-ready systems.',
		metaKeywords: ['AI', 'prototype', 'production', 'software development', 'AI apps', 'production-ready'],
		featuredImage: '/img3.png',
		
		// Hero Section
		pageTitle: 'AI Prototype to Production — Make AI Apps Production-Ready',
		heroTitle: 'AI Prototype to Production — Make AI Apps Production-Ready',
		heroSubtitle: 'Build fast with AI. Launch with confidence. VibeToLive.dev helps founders, startups, and lean teams turn AI-generated prototypes into secure, scalable, production-ready applications—without rewrites, guesswork, or hidden risks.',
		heroImage: '/img3.png',
		showTechIcons: true,
		ctaLink: '#pricing',
		secondaryCtaLink: 'https://tally.so/r/mVry2j',
		
		// Feature Section
		sectionLabel: 'Why AI Prototype to Production',
		sectionHeading: 'From AI Prototype to Production Reality',
		sectionDescription: 'AI tools are powerful for moving fast from idea to working prototype, but AI-generated apps often ship with fragile logic, security gaps, and scalability limits. We take your AI-built prototype and turn it into a production-ready system—stable, secure, and engineered to grow with real users.',
		featureCards: [
			{
				title: '🚀 Ship Fast Without Breaking Later',
				description: 'Move quickly while putting the right guardrails in place—so early speed doesn\'t turn into costly rewrites once users arrive.',
			},
			{
				title: '🛡️ Security Built Into the Foundation',
				description: 'Early threat modeling, secrets handling, and access controls reduce exposure before vulnerabilities become real incidents.',
			},
			{
				title: '🏗️ Architecture Ready for Growth',
				description: 'We align your app with proven production patterns so scaling users, data, and features doesn\'t require starting over.',
			},
			{
				title: '🧩 Reduced AI-Driven Tech Debt',
				description: 'We clean up the rough edges of AI-generated code early, preventing hidden complexity from slowing future development.',
			},
			{
				title: '🚢 Production-Grade Deployment',
				description: 'Reliable CI/CD pipelines and cloud deployment practices ensure repeatable, stable releases—not fragile launches.',
			},
			{
				title: '🎯 AI Used With Intent',
				description: 'We leverage AI for speed and experimentation, but enforce human review, testing, and operational discipline where it matters most.',
			},
		],
		
		// FAQ Section
		faqList: [
			{
				question: 'Do you rewrite everything?',
				answer: 'No. We preserve what works and fix what breaks production.',
			},
			{
				question: 'What tech stacks do you support?',
				answer: 'Modern JS/TS, Python, Node, React, Next.js, and common AI stacks.',
			},
			{
				question: 'Do you run security scans?',
				answer: 'Yes—baseline checks and best-practice hardening are included.',
			},
			{
				question: 'How long does the process take?',
				answer: 'Most Vibe → Live projects complete in about one work week.',
			},
			{
				question: 'What if my AI code has serious issues?',
				answer: 'We\'ll flag it early and recommend the right remediation path.',
			},
			{
				question: 'Do you support databases and migrations?',
				answer: 'Yes—schema fixes, migrations, and data safety are handled.',
			},
			{
				question: 'What happens after launch?',
				answer: 'You can move to Keep It Alive for monitoring and updates.',
			},
		],
		
		// CTA Section
		ctaHeadline: 'Ready to Turn Your AI Prototype Into a Production-Ready App?',
		ctaSubtext: 'Let\'s talk. Share your codebase, AI stack, and launch goals. We\'ll assess what\'s needed to harden your app and map the fastest path to a stable, production-ready release.',
		ctaButton: 'Get Started',
	},
	
	// Add more SEO pages here as needed
	// 'another-seo-page': { ... },
};

// Helper function to get SEO page by slug
export const getSEOPageBySlug = (slug) => {
	return seoPagesData[slug] || null;
};

// Get all SEO page slugs (useful for static generation)
export const getAllSEOPageSlugs = () => {
	return Object.keys(seoPagesData);
};

