import React from 'react';
import { Compass, Check, ArrowRight, ShieldCheck, ExternalLink } from 'lucide-react';
import { COMPARISONS_DATABASE } from '../data/comparisonsData';

interface ComparisonsPageProps {
  navigate: (route: string) => void;
}

export const ComparisonsPage: React.FC<ComparisonsPageProps> = ({ navigate }) => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="rounded-full bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1">
          Objective Software Comparisons
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
          Head-to-Head Software Analysis
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
          Unbiased, benchmark-backed evaluations. We test pricing models, feature reliability, and practical creator workflows so you only spend budget where it counts.
        </p>
      </div>

      {/* Comparisons List */}
      <div className="space-y-12">
        {COMPARISONS_DATABASE.map((comp) => (
          <section
            key={comp.id}
            id={comp.slug}
            className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs space-y-8"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded">
                {comp.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-2">
                {comp.title}
              </h2>
              <p className="text-sm text-neutral-500 mt-1">{comp.subtitle}</p>
            </div>

            {/* Side-by-Side Comparison Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product A */}
              <div className="rounded-2xl border-2 border-blue-200 bg-blue-50/20 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-neutral-900">{comp.itemA.name}</h3>
                  <span className="rounded-full bg-blue-600 text-white text-xs font-bold px-3 py-1">
                    {comp.itemA.score} / 10
                  </span>
                </div>
                <div className="space-y-2 text-xs text-neutral-700">
                  <p><strong>Best For:</strong> {comp.itemA.bestFor}</p>
                  <p><strong>Free Plan:</strong> {comp.itemA.freePlan}</p>
                  <p><strong>Starting Price:</strong> {comp.itemA.price}</p>
                  <p className="text-emerald-800"><strong>Key Strength:</strong> {comp.itemA.strength}</p>
                  <p className="text-rose-800"><strong>Limitation:</strong> {comp.itemA.limitation}</p>
                </div>
                <a
                  href={comp.itemA.ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="block text-center rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition-colors"
                >
                  Visit Official Site →
                </a>
              </div>

              {/* Product B */}
              <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/20 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-neutral-900">{comp.itemB.name}</h3>
                  <span className="rounded-full bg-indigo-600 text-white text-xs font-bold px-3 py-1">
                    {comp.itemB.score} / 10
                  </span>
                </div>
                <div className="space-y-2 text-xs text-neutral-700">
                  <p><strong>Best For:</strong> {comp.itemB.bestFor}</p>
                  <p><strong>Free Plan:</strong> {comp.itemB.freePlan}</p>
                  <p><strong>Starting Price:</strong> {comp.itemB.price}</p>
                  <p className="text-emerald-800"><strong>Key Strength:</strong> {comp.itemB.strength}</p>
                  <p className="text-rose-800"><strong>Limitation:</strong> {comp.itemB.limitation}</p>
                </div>
                <a
                  href={comp.itemB.ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="block text-center rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition-colors"
                >
                  Visit Official Site →
                </a>
              </div>
            </div>

            {/* Editorial Verdict Block */}
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50/80 p-6 space-y-3">
              <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                Editorial Verdict &amp; Summary
              </h4>
              <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-medium">
                {comp.winnerSummary}
              </p>
              <div className="text-xs text-neutral-600 leading-relaxed whitespace-pre-line pt-2 border-t border-neutral-200/80">
                {comp.verdictMarkdown}
              </div>
              <div className="text-[11px] text-neutral-400 pt-2">
                <strong>Methodology:</strong> {comp.methodology}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
