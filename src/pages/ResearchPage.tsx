import React, { useState } from 'react';
import { BarChart3, ExternalLink, Calendar, ShieldCheck, Download } from 'lucide-react';
import { RESEARCH_STUDIES, STATISTICS_DATABASE } from '../data/researchData';

export const ResearchPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'studies' | 'statistics'>('studies');

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="rounded-full bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1">
          Primary Datasets &amp; Citations
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
          Original Research &amp; Industry Statistics
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
          Transparent, verifiable empirical datasets. We analyze software pricing shifts, search algorithm behavior, and creator monetization realities with zero fabricated figures.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-neutral-200 gap-6 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('studies')}
          className={`pb-3 transition-colors ${
            activeTab === 'studies'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          Original Research Studies
        </button>
        <button
          onClick={() => setActiveTab('statistics')}
          className={`pb-3 transition-colors ${
            activeTab === 'statistics'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          Verified Statistics Hub
        </button>
      </div>

      {/* Studies Tab */}
      {activeTab === 'studies' && (
        <div className="space-y-8">
          {RESEARCH_STUDIES.map((study) => (
            <div
              key={study.id}
              className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="rounded-md bg-blue-50 text-blue-800 text-[10px] font-bold px-2 py-0.5">
                    Empirical Analysis
                  </span>
                  <h2 className="text-2xl font-bold text-neutral-900 mt-1">{study.title}</h2>
                  <div className="flex items-center gap-3 text-xs text-neutral-400 mt-1">
                    <span>Published: {study.date}</span>
                    <span>•</span>
                    <span>Sample: {study.sampleSize}</span>
                  </div>
                </div>
              </div>

              {/* Data points KPI grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {study.dataPoints.map((dp, idx) => (
                  <div key={idx} className="rounded-2xl border border-blue-100 bg-blue-50/30 p-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                      {dp.metric}
                    </span>
                    <p className="text-2xl font-extrabold text-blue-700 mt-1">{dp.value}</p>
                    <p className="text-[11px] text-neutral-500 mt-1">{dp.context}</p>
                  </div>
                ))}
              </div>

              {/* Key Findings */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Key Findings
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-neutral-700">
                  {study.keyFindings.map((finding, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Methodology & Limitations */}
              <div className="rounded-2xl border border-neutral-100 bg-neutral-50/70 p-5 text-xs text-neutral-500 space-y-2">
                <p>
                  <strong className="text-neutral-800">Methodology:</strong> {study.methodology}
                </p>
                <p>
                  <strong className="text-neutral-800">Limitations &amp; Boundary Conditions:</strong>{' '}
                  {study.limitations}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Statistics Hub Tab */}
      {activeTab === 'statistics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {STATISTICS_DATABASE.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div>
                <span className="rounded-md bg-neutral-100 text-neutral-700 text-[10px] font-bold px-2 py-0.5">
                  {item.category}
                </span>
                <p className="text-3xl font-extrabold text-neutral-900 mt-3">{item.stat}</p>
                <p className="text-xs sm:text-sm text-neutral-600 mt-1.5 leading-relaxed">
                  {item.label}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400">
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-600 hover:underline flex items-center gap-1"
                >
                  Source: {item.source} <ExternalLink className="h-3 w-3" />
                </a>
                <span>{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
