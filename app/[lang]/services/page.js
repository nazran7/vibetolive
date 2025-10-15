'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { BsShieldFillCheck, BsRocketTakeoff } from 'react-icons/bs';
import { RiStackFill, RiSettings3Fill } from 'react-icons/ri';

import Cta from '@/components/home/cta';
import { defaultLocale, getDictionary } from '@/lib/i18n';

export default function Page({ params }) {
    const [dict, setDict] = useState({
        Service: {},
        CTA: {},
        CTAButton: {}
    });

    const [langName, setLangName] = useState(params.lang || defaultLocale);

    useEffect(() => {
        const fetchDictionary = async () => {
            const d = await getDictionary(langName);
            setDict(d);
        };
        fetchDictionary();
    }, [langName]);

    // Optional: update langName if pathname changes (like About page)
    // useEffect(() => {
    // 	const pathname = window.location.pathname;
    // 	if (pathname === '/') setLangName(defaultLocale);
    // 	else setLangName(pathname.split('/')[1]);
    // }, []);

    return (
        <main className='container mx-auto px-5'>
            {/* Hero Section */}
            <section className='relative z-10 flex flex-col items-start md:items-center pt-10 mb-10 overflow-hidden'>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 100, damping: 10 }}
                >
                    <h1 className='font-bold text-5xl md:text-7xl bg-gradient-to-r from-base-content from-50% to-primary text-center bg-clip-text text-transparent !leading-[1.25em] mb-5'>
                        {dict.Service.h1 || 'AI Prototype to Production Services'}
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 1 }}
                >
                    <p className='w-full md:w-10/12 mx-auto text-xl md:text-2xl text-base-content/80 md:text-center mb-5 md:mb-10'>
                        {dict.Service.intro ||
                            'Your AI prototype deserves more than just a demo. We transform AI-generated prototypes into secure, scalable production applications.'}
                    </p>
                </motion.div>
            </section>

            {/* Core Services */}
            <section className='flex flex-col gap-y-16 mb-32'>
                {/* Service 1: Prototype Hardening & Audit */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className='flex flex-col md:flex-row items-stretch justify-between gap-10'>
                        <div className='w-full md:w-3/5 relative rounded-2xl overflow-hidden shadow-xl'>
                            <Image
                                src={'/image/services_1.png'}
                                layout='fill'
                                objectFit='cover'
                                className='hover:scale-105 transition-all'
                                alt='Prototype Hardening'
                            />
                        </div>
                        <div className='w-full md:w-2/5 ring-2 ring-base-content/10 py-5 px-10 rounded-2xl bg-base-200 shadow-xl'>
                            <div className='flex items-center justify-between py-5'>
                                <h2 className='text-3xl font-bold'>Prototype Hardening & Audit</h2>
                                <BsShieldFillCheck size={48} />
                            </div>
                            <ul className='list-disc ml-5 mb-3 text-lg'>
                                <li>Codebase & dependency review</li>
                                <li>Data validation and model safety check</li>
                                <li>Infrastructure optimization</li>
                                <li>Security patching</li>
                            </ul>
                            <p className='text-lg font-medium'>
                                Outcome: A stable, ready-to-scale foundation for your AI product.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Service 2: Secure AI App Deployment */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className='flex flex-col md:flex-row items-stretch justify-between gap-10'>
                        <div className='w-full md:w-2/5 ring-2 ring-base-content/10 py-5 px-10 rounded-2xl bg-base-200 shadow-xl'>
                            <div className='flex items-center justify-between py-5'>
                                <BsRocketTakeoff size={48} />
                                <h2 className='text-3xl font-bold'>Secure AI App Deployment</h2>
                            </div>
                            <ul className='list-disc ml-5 mb-3 text-lg'>
                                <li>Containerized deployment (Docker / Kubernetes)</li>
                                <li>CI/CD pipelines</li>
                                <li>SSL, access control, token management</li>
                                <li>Data encryption & compliance (GDPR-ready)</li>
                            </ul>
                            <p className='text-lg font-medium'>
                                Outcome: A production-ready app that’s as safe as it is smart.
                            </p>
                        </div>
                        <div className='w-full md:w-3/5 relative rounded-2xl overflow-hidden shadow-xl'>
                            <Image
                                src={'/image/services_2.png'}
                                layout='fill'
                                objectFit='cover'
                                className='hover:scale-105 transition-all'
                                alt='Secure Deployment'
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Service 3: Scaling & Performance Optimization */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className='flex flex-col md:flex-row items-stretch justify-between gap-10'>
                        <div className='w-full md:w-3/5 relative rounded-2xl overflow-hidden shadow-xl'>
                            <Image
                                src={'/image/services_3.png'}
                                layout='fill'
                                objectFit='cover'
                                className='hover:scale-105 transition-all'
                                alt='Scaling Optimization'
                            />
                        </div>
                        <div className='w-full md:w-2/5 ring-2 ring-base-content/10 py-5 px-10 rounded-2xl bg-base-200 shadow-xl'>
                            <div className='flex items-center justify-between py-5'>
                                <RiStackFill size={48} />
                                <h2 className='text-3xl font-bold'>Scaling & Performance Optimization</h2>
                            </div>
                            <ul className='list-disc ml-5 mb-3 text-lg'>
                                <li>Load testing & API optimization</li>
                                <li>Model serving & caching setup</li>
                                <li>Cost optimization for inference workloads</li>
                                <li>Auto-scaling infrastructure configuration</li>
                            </ul>
                            <p className='text-lg font-medium'>
                                Outcome: Speed, stability, and efficiency at every scale.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Service 4: Maintenance & Production Support */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className='flex flex-col md:flex-row items-stretch justify-between gap-10'>
                        <div className='w-full md:w-2/5 ring-2 ring-base-content/10 py-5 px-10 rounded-2xl bg-base-200 shadow-xl'>
                            <div className='flex items-center justify-between py-5'>
                                <RiSettings3Fill size={48} />
                                <h2 className='text-3xl font-bold'>Maintenance & Production Support</h2>
                            </div>
                            <ul className='list-disc ml-5 mb-3 text-lg'>
                                <li>24/7 performance monitoring</li>
                                <li>Model retraining pipeline setup</li>
                                <li>Bug fixing & dependency updates</li>
                                <li>Product enhancement cycles</li>
                            </ul>
                            <p className='text-lg font-medium'>
                                Outcome: A continuously improving AI product that grows with you.
                            </p>
                        </div>
                        <div className='w-full md:w-3/5 relative rounded-2xl overflow-hidden shadow-xl'>
                            <Image
                                src={'/image/services_4.png'}
                                layout='fill'
                                objectFit='cover'
                                className='hover:scale-105 transition-all'
                                alt='Maintenance Support'
                            />
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Tech Stack */}
            <section className='mb-32'>
                <h2 className='text-4xl md:text-5xl font-bold mb-5 text-center'>Our Tech Stack</h2>
                <p className='text-lg md:text-xl text-center mb-10'>
                    React, Next.js, Node.js, FastAPI, LangChain, OpenAI, Hugging Face, AWS, Docker, Vercel, Sentry, LogRocket
                </p>
            </section>

            {/* Why Choose Us */}
            <section className='mb-32'>
                <h2 className='text-4xl md:text-5xl font-bold mb-5 text-center'>Why Choose VibeToLive.dev</h2>
                <ul className='flex flex-col md:flex-row justify-center gap-10 text-lg md:text-xl text-base-content/80 text-center'>
                    <li>✅ Deep expertise in AI & full-stack deployment</li>
                    <li>✅ Focused on indie hackers and lean startups</li>
                    <li>✅ Transparent pricing and flexible timelines</li>
                    <li>✅ Fast turnaround — prototype to production in weeks</li>
                </ul>
            </section>

            {/* CTA Section */}
            <Cta
                locale={dict.CTA}
                CTALocale={dict.CTAButton}
            />
        </main>
    );
}
