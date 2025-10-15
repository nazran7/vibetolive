'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Cta from '@/components/home/cta';
import { defaultLocale, getDictionary } from '@/lib/i18n';

export default function CaseStudiesPage({ params }) {
  const [dict, setDict] = useState({
    CaseStudies: {},
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

  const cases = dict.CaseStudies?.cases || [];

  return (
    <main className='container mx-auto px-5'>
      {/* Hero */}
      <section className='relative z-10 flex flex-col items-start md:items-center pt-10 mb-16 overflow-hidden'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 100, damping: 10 }}
        >
          <h1 className='font-bold text-5xl md:text-7xl bg-gradient-to-r from-base-content from-50% to-primary text-center bg-clip-text text-transparent !leading-[1.25em] mb-5'>
            {dict.CaseStudies?.h1 || 'AI Prototype to Production Success Stories'}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          <p className='w-full md:w-10/12 mx-auto text-xl md:text-2xl text-base-content/80 md:text-center mb-10'>
            {dict.CaseStudies?.intro || 'Every AI prototype has potential. These real-world stories show how VibeToLive.dev helped founders and small teams transform raw ideas into fully deployed, scalable products.'}
          </p>
        </motion.div>
      </section>

      {/* Case Studies Cards */}
      <section className='flex flex-col gap-y-16 mb-32'>
        {cases.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`flex flex-col md:flex-row bg-base-200 items-stretch md:items-center shadow-lg rounded-2xl overflow-hidden ${i % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
          >
            {/* Image */}
            <div className='relative w-full md:w-2/5 md:h-auto flex flex-shrink-0'>
              <img
                src={c.image}
                alt={c.title}
                className="w-full h-[100%] object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Text Box */}
            <div className='w-full md:w-3/5  p-6 md:p-10 flex flex-col justify-center'>
              <h2 className='text-3xl font-bold mb-3'>{c.title}</h2>
              {c.client && <p className='font-medium mb-2'>Client Type: {c.client}</p>}
              {c.challenge && <p className='mb-2'><strong>Challenge:</strong> {c.challenge}</p>}
              {c.solution && (
                <>
                  <p className='mb-2 font-semibold'>Solution:</p>
                  <ul className='list-disc ml-6 mb-2'>
                    {c.solution.map((s, si) => <li key={si}>{s}</li>)}
                  </ul>
                </>
              )}
              {c.result && (
                <>
                  <p className='mb-2 font-semibold'>Result:</p>
                  <ul className='list-disc ml-6 mb-2'>
                    {c.result.map((r, ri) => <li key={ri}>{r}</li>)}
                  </ul>
                </>
              )}
              {c.quote && <blockquote className='mt-4 italic text-gray-700'>“{c.quote}”</blockquote>}
            </div>
          </motion.div>
        ))}
      </section>

      {/* CTA */}
      <Cta
        locale={dict.CTA}
        CTALocale={dict.CTAButton}
      />
    </main>
  );
}
