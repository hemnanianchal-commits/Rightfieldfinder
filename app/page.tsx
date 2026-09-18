import type { Metadata } from 'next';
import { Compass, Lightbulb } from 'lucide-react';
import QuizApp from './components/QuizApp';
import { GUIDE_TIPS } from '@/src/data/simpleQuizData';

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL('https://rightfieldfinder.com'),
    title: 'Which Field Is Right for Me? Free Student Career Quiz',
    description:
      'Take our free 90-second career quiz for high school and pre-university students. Answer 8 simple questions to find your ideal field and next steps.',
    keywords: [
      'career quiz',
      'which field is right for me',
      'student field selector',
      'career test for high school students',
      'college major quiz',
      'choose academic field',
    ],
    alternates: {
      canonical: 'https://rightfieldfinder.com/',
    },
    openGraph: {
      type: 'website',
      url: 'https://rightfieldfinder.com/',
      title: 'Which Field Is Right for Me? Free Student Career Quiz',
      description:
        'Find your ideal field in under 90 seconds. Answer 8 simple questions to get a personalized field match.',
      siteName: 'RightFieldFinder',
      images: [
        {
          url: 'https://rightfieldfinder.com/og-image.png',
          width: 1200,
          height: 630,
          alt: 'RightFieldFinder - Find the field that fits you',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Which Field Is Right for Me? Free Student Career Quiz',
      description:
        'Find your ideal field in under 90 seconds. Answer 8 simple questions to get a personalized field match.',
      images: ['https://rightfieldfinder.com/og-image.png'],
    },
    verification: {
      google: 'y4lN0VyB157omt4zTMEJ0HhoR6li0sUz07kSpfBOnRY',
    },
  };
}

export default function HomePage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'RightFieldFinder',
      url: 'https://rightfieldfinder.com/',
      description:
        'An interactive career and field selection quiz for high school and pre-university students worldwide.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'RightFieldFinder Career Quiz',
      url: 'https://rightfieldfinder.com/',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      description:
        'An interactive 8-question career test and field selector helping students match with Engineering, Medical, Computer Science, Business, Design, or Social Sciences.',
    },
  ];

  return (
    <>
      {/* Structured Data (JSON-LD WebSite & WebApplication Schema) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Ambient background aura */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#E2823C]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-[#24408E]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      {/* 1. Header (Site name only, NO quiz mentions or extra links) */}
      <header className="border-b border-gray-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2.5 text-xl font-bold font-serif tracking-tight text-[#1A202C] hover:opacity-90 transition-opacity"
          >
            <div className="w-9 h-9 rounded-xl bg-[#24408E] flex items-center justify-center text-white shadow-xs shadow-[#24408E]/20">
              <Compass className="w-5 h-5 text-[#E2823C]" />
            </div>
            <span className="font-serif tracking-tight">RightFieldFinder</span>
          </a>
          <span className="text-xs font-medium text-gray-500 hidden sm:inline-flex items-center gap-1.5 bg-gray-100/80 px-3 py-1 rounded-full border border-gray-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Global Student Guidance
          </span>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        {/* Interactive Hero, Quiz, and Result */}
        <QuizApp />

        {/* 5. Guide Section (3-4 tips only, 1-2 sentences each, plain friendly advice) */}
        <section className="py-20 px-4 sm:px-6 max-w-4xl mx-auto border-t border-gray-200/80">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#24408E] bg-[#24408E]/10 px-3 py-1 rounded-md inline-block mb-3">
              Choosing the Right Field
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A202C]">
              Simple Advice Before Deciding
            </h2>
            <p className="text-sm sm:text-base text-[#4A5568] mt-2 leading-relaxed">
              A few practical principles to keep in mind as you explore your future academic options.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GUIDE_TIPS.map((tip, idx) => (
              <div
                key={tip.id}
                className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                {/* Number watermark badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#E2823C] flex items-center justify-center">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <span className="font-serif text-2xl font-bold text-gray-200 group-hover:text-[#24408E]/20 transition-colors">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#1A202C] mb-2 leading-snug">
                  {tip.title}
                </h3>
                <p className="text-sm text-[#4A5568] leading-relaxed">
                  {tip.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 6. Simple Footer (Site name, one line description, no extra links) */}
      <footer className="border-t border-gray-200/80 py-10 px-4 sm:px-6 bg-white text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#24408E] flex items-center justify-center text-white text-xs">
              <Compass className="w-3.5 h-3.5 text-[#E2823C]" />
            </div>
            <span className="font-serif font-bold text-base text-[#1A202C]">
              RightFieldFinder
            </span>
          </div>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            An interactive career and field selection tool helping students worldwide find their academic path.
          </p>
        </div>
      </footer>
    </>
  );
}
