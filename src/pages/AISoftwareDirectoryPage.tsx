import React, { useState } from 'react';
import { Sparkles, ExternalLink, ShieldCheck, Check, X, Search, Star } from 'lucide-react';
import { AI_SOFTWARE_DATABASE, AISoftwareItem } from '../data/aiSoftwareData';

export const AISoftwareDirectoryPage: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState('All');
  const [search, setSearch] = useState('');

  const categories = [
    'All',
    'AI Productivity',
    'AI Writing',
    'AI SEO',
    'AI Images',
    'AI Automation',
  ];

  const filtered = AI_SOFTWARE_DATABASE.filter((item) => {
    const matchesCat = selectedCat === 'All' || item.category === selectedCat;
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.bestFor.toLowerCase().includes(search.toLowerCase()) ||
      item.tagline.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      {/* Directory Header */}
      <div className="max-w-3xl space-y-3">
        <span className="rounded-full bg-violet-100 text-violet-800 text-xs font-bold px-3 py-1">
          Third-Party Software Discovery
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
          Curated AI Software Directory
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
          Objective editorial breakdowns of leading commercial AI platforms. Every listing details free tiers, pricing models, key strengths, and tested limitations.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-neutral-200 pb-6">
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                selectedCat === cat
                  ? 'bg-violet-600 text-white shadow-xs'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search software by name or use case..."
            className="w-full rounded-xl border border-neutral-300 bg-white pl-9 pr-3 py-2 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-violet-600 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Software Listings Cards */}
      <div className="space-y-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs hover:border-violet-300 transition-all space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-bold text-neutral-900">{item.name}</h2>
                  <span className="rounded-md bg-violet-100 text-violet-800 text-xs font-bold px-2.5 py-0.5">
                    {item.category}
                  </span>
                  <span className="flex items-center gap-1 rounded-md bg-amber-50 text-amber-900 text-xs font-bold px-2 py-0.5 border border-amber-200">
                    <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" /> {item.ratingScore} / 10
                  </span>
                  <span className="text-[11px] font-semibold text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded">
                    {item.testedStatus}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 mt-1">{item.tagline}</p>
              </div>

              <div className="flex flex-col sm:items-end shrink-0">
                <span className="text-sm font-extrabold text-neutral-900">{item.pricing}</span>
                <span className="text-[11px] text-emerald-700 font-semibold">
                  {item.freePlan ? '✓ Free plan available' : 'Paid subscription required'}
                </span>
                <a
                  href={item.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-violet-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-violet-700 transition-colors"
                >
                  <span>Visit Official Site</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Editorial Evaluation & Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-neutral-100 text-xs">
              <div className="space-y-2">
                <span className="font-bold uppercase tracking-wider text-neutral-400 text-[10px]">Best For</span>
                <p className="text-neutral-700 font-medium leading-relaxed">{item.bestFor}</p>
                <div className="pt-2">
                  <span className="font-bold uppercase tracking-wider text-neutral-400 text-[10px]">Key Features</span>
                  <ul className="mt-1 space-y-1 text-neutral-600">
                    {item.keyFeatures.map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-2">
                <span className="font-bold uppercase tracking-wider text-emerald-700 text-[10px]">Pros</span>
                <ul className="space-y-1.5 text-neutral-700">
                  {item.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-emerald-900">
                      <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <span className="font-bold uppercase tracking-wider text-rose-700 text-[10px]">Limitations</span>
                <ul className="space-y-1.5 text-neutral-700">
                  {item.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-rose-900">
                      <X className="h-3.5 w-3.5 text-rose-500 shrink-0 mt-0.5" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-3 text-[11px] text-neutral-400">
                  <strong>Last Reviewed:</strong> {item.lastReviewed}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
