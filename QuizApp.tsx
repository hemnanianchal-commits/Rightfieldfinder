'use client';

import { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  ArrowRight, ArrowLeft, Check, Share2, RotateCcw, 
  Sparkles, BookOpen, Briefcase,
  Code2, Cpu, Stethoscope, Palette, Scale
} from 'lucide-react';
import { QUIZ_QUESTIONS, FIELD_RECOMMENDATIONS } from '@/src/data/simpleQuizData';
import { FieldId, FieldRecommendation } from '@/src/types';

// Visual preview info for the 6 evaluated fields in the hero
const EVALUATED_FIELDS = [
  { id: 'cs_it', name: 'Computer Science', icon: Code2, color: 'text-blue-600', bg: 'bg-blue-50/80 border-blue-200/60' },
  { id: 'engineering', name: 'Engineering & Tech', icon: Cpu, color: 'text-slate-700', bg: 'bg-slate-50/80 border-slate-200/60' },
  { id: 'medical', name: 'Medical & Health', icon: Stethoscope, color: 'text-emerald-600', bg: 'bg-emerald-50/80 border-emerald-200/60' },
  { id: 'business', name: 'Business & Finance', icon: Briefcase, color: 'text-amber-600', bg: 'bg-amber-50/80 border-amber-200/60' },
  { id: 'design_arts', name: 'Design & Arts', icon: Palette, color: 'text-rose-600', bg: 'bg-rose-50/80 border-rose-200/60' },
  { id: 'social_sciences', name: 'Social Sciences', icon: Scale, color: 'text-indigo-600', bg: 'bg-indigo-50/80 border-indigo-200/60' },
] as const;

export default function QuizApp() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, FieldId>>({});
  const [result, setResult] = useState<FieldRecommendation | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const quizRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);
  const currentSelection = selectedAnswers[currentQuestionIndex];

  // Start Quiz: activate quiz state and scroll into view smoothly
  const handleStartQuiz = () => {
    setQuizStarted(true);
    setResult(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTimeout(() => {
      quizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  };

  // Select an option
  const handleSelectOption = (field: FieldId) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: field,
    }));
  };

  // Next Question or Finish
  const handleNext = () => {
    if (!currentSelection) return;

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      calculateResult();
    }
  };

  // Previous Question
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Calculate top field match
  const calculateResult = () => {
    const counts: Record<FieldId, number> = {
      cs_it: 0,
      engineering: 0,
      medical: 0,
      business: 0,
      design_arts: 0,
      social_sciences: 0,
    };

    (Object.values(selectedAnswers) as FieldId[]).forEach((field) => {
      if (counts[field] !== undefined) {
        counts[field] += 1;
      }
    });

    const sortedFields = (Object.keys(counts) as FieldId[]).sort(
      (a, b) => counts[b] - counts[a]
    );

    const winningFieldId = sortedFields[0] || 'cs_it';
    const winningRecommendation = FIELD_RECOMMENDATIONS[winningFieldId];

    setResult(winningRecommendation);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#24408E', '#E2823C', '#10B981', '#6366F1'],
      });
    } catch {
      // Safe fallback
    }

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  // Retake quiz
  const handleRetake = () => {
    setResult(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTimeout(() => {
      quizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // Share Result Handler
  const handleShare = async () => {
    const originUrl = typeof window !== 'undefined' ? window.location.origin : 'https://rightfieldfinder.com';
    const shareData = {
      title: 'RightFieldFinder Result',
      text: result 
        ? `I took the RightFieldFinder career quiz and matched with ${result.name}! Check your ideal academic field in under 90 seconds:`
        : 'Take this quick career quiz to find your ideal field:',
      url: originUrl,
    };

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        handleCopyFallback(originUrl);
      }
    } else {
      handleCopyFallback(originUrl);
    }
  };

  const handleCopyFallback = (url: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Helper to render matched field icon
  const renderFieldIcon = (fieldId: FieldId) => {
    switch (fieldId) {
      case 'cs_it':
        return <Code2 className="w-8 h-8 text-blue-600" />;
      case 'engineering':
        return <Cpu className="w-8 h-8 text-slate-700" />;
      case 'medical':
        return <Stethoscope className="w-8 h-8 text-emerald-600" />;
      case 'business':
        return <Briefcase className="w-8 h-8 text-amber-600" />;
      case 'design_arts':
        return <Palette className="w-8 h-8 text-rose-600" />;
      case 'social_sciences':
        return <Scale className="w-8 h-8 text-indigo-600" />;
    }
  };

  return (
    <>
      {/* 2. Hero Section (Single H1, short intro, ONE "Start Quiz" button) */}
      <section className="pt-16 pb-20 sm:pt-24 sm:pb-28 px-4 sm:px-6 max-w-4xl mx-auto text-center">
        {/* Subtle announcement badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 shadow-xs text-[#24408E] mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#E2823C]" />
          <span>Interactive Student Field Selector</span>
        </div>

        {/* Sole <h1> on the entire page */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#1A202C] tracking-tight leading-[1.15] mb-6">
          Which Field Is Right for Me? <br className="hidden sm:inline" />
          <span className="text-[#24408E] font-serif italic">Discover Your Path.</span>
        </h1>

        <p className="text-base sm:text-xl text-[#4A5568] max-w-2xl mx-auto leading-relaxed mb-10">
          Answer 8 simple questions about what you enjoy and how you think. Get an instant, personalized field recommendation to guide your high school and pre-university decisions.
        </p>

        {/* ONE and ONLY "Start Quiz" button on the page */}
        <div className="mb-14">
          <button
            type="button"
            id="start-quiz-button"
            onClick={handleStartQuiz}
            className="min-h-[54px] px-8 py-3.5 rounded-2xl bg-[#24408E] hover:bg-[#1B3270] text-white font-semibold text-base sm:text-lg shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all inline-flex items-center justify-center gap-2.5 active:scale-[0.98] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#24408E]/30 cursor-pointer"
          >
            <span>Start Quiz</span>
            <ArrowRight className="w-5 h-5 text-[#E2823C]" />
          </button>
          <div className="flex items-center justify-center gap-3 text-xs text-gray-500 mt-3 font-medium">
            <span>Free</span>
            <span>•</span>
            <span>8 Quick Questions</span>
            <span>•</span>
            <span>Under 90 Seconds</span>
          </div>
        </div>

        {/* Visual Showcase of the 6 Disciplines Evaluated */}
        <div className="pt-8 border-t border-gray-200/60 max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-wider font-bold text-gray-400 block mb-4">
            Evaluates 6 Core Academic Disciplines
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
            {EVALUATED_FIELDS.map((f) => {
              const IconComponent = f.icon;
              return (
                <div
                  key={f.id}
                  className="p-3 rounded-xl border border-gray-200/70 bg-white/90 backdrop-blur-xs shadow-2xs flex flex-col items-center justify-center gap-1.5 transition-all hover:scale-102 hover:shadow-xs"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${f.bg}`}>
                    <IconComponent className={`w-4 h-4 ${f.color}`} />
                  </div>
                  <span className="text-xs font-semibold text-[#1A202C] text-center leading-tight">
                    {f.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Quiz Section (Appears in place when "Start Quiz" is clicked) */}
      {quizStarted && !result && (
        <section
          ref={quizRef}
          id="quiz"
          className="py-12 px-4 sm:px-6 max-w-2xl mx-auto transition-all scroll-mt-24"
        >
          <div className="bg-white border border-gray-200/90 rounded-3xl p-6 sm:p-10 shadow-lg shadow-gray-200/40 relative overflow-hidden">
            {/* Top Accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#24408E] via-[#E2823C] to-[#24408E]" />

            {/* Progress Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-[#4A5568] mb-2.5">
                <span className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#24408E]" />
                  Question <strong className="text-[#24408E]">{currentQuestionIndex + 1}</strong> of {totalQuestions}
                </span>
                <span className="text-[#E2823C] font-bold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/60">
                  {progressPercent}%
                </span>
              </div>

              <div
                className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden p-0.5"
                role="progressbar"
                aria-valuenow={progressPercent}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="h-full bg-gradient-to-r from-[#24408E] to-[#E2823C] rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Heading */}
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#24408E] bg-[#24408E]/10 px-2.5 py-1 rounded-md inline-block mb-3">
                Step {currentQuestion.id} of 8
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A202C] leading-snug">
                {currentQuestion.question}
              </h2>
            </div>

            {/* 4 Short, Tappable Options with A, B, C, D indicators */}
            <div className="space-y-3" role="radiogroup">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = currentSelection === option.field;
                const letterBadge = ['A', 'B', 'C', 'D'][idx];

                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => handleSelectOption(option.field)}
                    className={`w-full min-h-[58px] px-5 py-3.5 rounded-2xl text-left border-2 text-base font-medium transition-all flex items-center justify-between active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24408E] ${
                      isSelected
                        ? 'border-[#24408E] bg-[#24408E]/5 text-[#24408E] font-semibold shadow-xs'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/70 bg-white text-[#1A202C]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-[#24408E] text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {letterBadge}
                      </span>
                      <span className="text-sm sm:text-base font-medium">{option.text}</span>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ml-3 transition-colors ${
                        isSelected
                          ? 'border-[#24408E] bg-[#24408E] text-white'
                          : 'border-gray-300'
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation Controls */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className={`min-h-[44px] px-4 py-2 rounded-xl text-sm font-medium inline-flex items-center gap-1.5 transition-colors ${
                  currentQuestionIndex === 0
                    ? 'opacity-0 pointer-events-none'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 cursor-pointer'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={!currentSelection}
                className={`min-h-[48px] px-6 py-2.5 rounded-xl font-semibold text-sm inline-flex items-center gap-2 transition-all ${
                  currentSelection
                    ? 'bg-[#24408E] hover:bg-[#1B3270] text-white shadow-sm hover:shadow-md cursor-pointer active:scale-98'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <span>{currentQuestionIndex === totalQuestions - 1 ? 'Show Recommendation' : 'Continue'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 4. Result Section (Appears in the same flow after finishing) */}
      {result && (
        <section
          ref={resultRef}
          id="result"
          className="py-12 px-4 sm:px-6 max-w-3xl mx-auto scroll-mt-24"
        >
          <div className="bg-white border border-gray-200/90 rounded-3xl p-6 sm:p-10 shadow-lg shadow-gray-200/50 space-y-8 relative overflow-hidden">
            {/* Header with Prominent Field Icon Badge */}
            <div className="text-center">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-md flex items-center justify-center mx-auto mb-4">
                {renderFieldIcon(result.id)}
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-[#E2823C] bg-amber-50 border border-amber-200/70 px-3.5 py-1.5 rounded-full inline-block mb-3">
                Your Primary Academic Match
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#24408E] leading-tight">
                {result.name}
              </h2>
              <p className="text-sm sm:text-base text-gray-500 mt-2 font-medium max-w-lg mx-auto">
                {result.subtitle}
              </p>
            </div>

            {/* 2-3 sentence explanation */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-2xl p-6 sm:p-7 border border-gray-200/70">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">
                Why This Fits Your Profile
              </span>
              <p className="text-base sm:text-lg text-[#1A202C] leading-relaxed">
                {result.explanation}
              </p>
            </div>

            {/* Global Guidance: What to Study & Types of Careers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200/80 rounded-2xl p-5 sm:p-6 shadow-2xs">
                <h3 className="font-serif text-lg font-bold text-[#1A202C] mb-3 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#24408E]/10 text-[#24408E] flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span>What to Study</span>
                </h3>
                <ul className="space-y-2.5 text-sm text-[#4A5568]">
                  {result.whatToStudy.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-gray-200/80 rounded-2xl p-5 sm:p-6 shadow-2xs">
                <h3 className="font-serif text-lg font-bold text-[#1A202C] mb-3 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#E2823C]/10 text-[#E2823C] flex items-center justify-center">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <span>Types of Careers</span>
                </h3>
                <div className="flex flex-wrap gap-2 pt-1">
                  {result.careerPaths.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions: Share result & Retake quiz */}
            <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleShare}
                className="w-full sm:w-auto min-h-[48px] px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm inline-flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>{copiedLink ? 'Link Copied to Clipboard!' : 'Share Your Result'}</span>
              </button>

              <button
                type="button"
                onClick={handleRetake}
                className="w-full sm:w-auto min-h-[48px] px-5 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-100 text-[#1A202C] font-medium text-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
