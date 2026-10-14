import React, { useState } from 'react';
import { Sparkles, Shield, RefreshCw, Check, ArrowRight } from 'lucide-react';
import { brandConfig } from '../../config/brand';

interface FooterProps {
  navigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [activeBrand, setActiveBrand] = useState(brandConfig.siteName);

  return (
    <footer className="border-t border-neutral-200 bg-white text-neutral-600">
      {/* Brand Selector Modal */}
      {showBrandModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div>
                <h3 className="text-lg font-bold text-neutral-900">Configurable Brand Identities</h3>
                <p className="text-xs text-neutral-500">Pick any of our 10 curated brand identities to preview naming variants.</p>
              </div>
              <button
                onClick={() => setShowBrandModal(false)}
                className="text-neutral-400 hover:text-neutral-700 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 max-h-80 overflow-y-auto space-y-2 pr-1">
              {brandConfig.alternativeBrands.map((b) => (
                <div
                  key={b.name}
                  onClick={() => {
                    setActiveBrand(b.name);
                    setShowBrandModal(false);
                  }}
                  className={`cursor-pointer rounded-xl border p-3 transition-all ${
                    activeBrand === b.name
                      ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-600'
                      : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-900 text-sm">{b.name}</span>
                    {activeBrand === b.name && <Check className="h-4 w-4 text-blue-600" />}
                  </div>
                  <p className="text-xs font-medium text-blue-600">{b.tagline}</p>
                  <p className="text-[11px] text-neutral-500 mt-0.5">{b.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-3 border-t border-neutral-100 flex justify-end">
              <button
                onClick={() => setShowBrandModal(false)}
                className="rounded-lg bg-neutral-900 px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-800"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 lg:gap-10">
          {/* Brand Info Column */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold text-neutral-900">{activeBrand}</span>
            </div>
            <p className="max-w-sm text-sm text-neutral-500 leading-relaxed">
              Free AI tools, SEO research and practical strategies to help you create, automate and grow online. Built for creators, bloggers, and solo entrepreneurs.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setShowBrandModal(true)}
                className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                <RefreshCw className="h-3 w-3 text-neutral-500" /> Switch Brand Identity
              </button>
            </div>
          </div>

          {/* Column 1: Free Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">Free Tools</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('/tools/keyword-explorer')} className="hover:text-blue-600">
                  Keyword Explorer
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/tools/ai-article-writer')} className="hover:text-blue-600">
                  AI Article Writer
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/tools/trends-demand-finder')} className="hover:text-blue-600">
                  Google Trends Finder
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/tools/business-idea-generator')} className="hover:text-blue-600">
                  Business Idea Generator
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/tools/youtube-keyword-tool')} className="hover:text-blue-600">
                  YouTube SEO Tools
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/tools')} className="text-blue-600 font-semibold flex items-center gap-1">
                  All 40+ Tools <ArrowRight className="h-3 w-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Discover & Compare */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">Discover</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('/ai-tools')} className="hover:text-blue-600">
                  AI Software Directory
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/comparisons')} className="hover:text-blue-600">
                  Software Comparisons
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/prompts')} className="hover:text-blue-600">
                  Curated AI Prompts
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/resources')} className="hover:text-blue-600">
                  SEO Checklists
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/research')} className="hover:text-blue-600">
                  Original Research
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/statistics')} className="hover:text-blue-600">
                  Verified Statistics
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Trust & E-E-A-T */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">Trust & Legal</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-blue-600">
                  About Us & Mission
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/authors')} className="hover:text-blue-600">
                  Verified Authors
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/editorial-policy')} className="hover:text-blue-600">
                  Editorial Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/review-policy')} className="hover:text-blue-600">
                  Review Methodology
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/affiliate-disclosure')} className="hover:text-blue-600">
                  Affiliate Disclosure
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/privacy')} className="hover:text-blue-600">
                  Privacy Policy & GDPR
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-blue-600">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Affiliate Disclosure Notice */}
        <div className="mt-12 rounded-xl border border-neutral-200/80 bg-neutral-50/70 p-4 text-[11px] leading-relaxed text-neutral-500">
          <div className="flex items-start gap-2">
            <Shield className="h-4 w-4 text-neutral-400 shrink-0 mt-0.5" />
            <p>
              <span className="font-semibold text-neutral-700">Editorial Independence & Affiliate Disclosure:</span> We recommend software and tools based on editorial analysis, testing, and practical utility. Some links on this site may be affiliate links; if you make a purchase or subscribe through them, we may earn a referral commission at zero additional cost to you. We never accept payment to rank a tool higher in comparison matrices.
            </p>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-neutral-100 pt-8 sm:flex-row text-xs text-neutral-400">
          <p>© {brandConfig.establishedYear} {activeBrand}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/terms')} className="hover:underline">Terms of Service</button>
            <span>•</span>
            <button onClick={() => navigate('/privacy')} className="hover:underline">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => navigate('/sitemap')} className="hover:underline">Sitemap</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
