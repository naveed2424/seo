import React from 'react';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Cpu,
  BookOpen,
  Search,
  CheckCircle2,
  ShieldCheck,
  Compass,
  Layers,
  Flame,
  FileCheck,
  ExternalLink,
} from 'lucide-react';
import { HeroBackgroundAnimation } from '../components/common/HeroBackgroundAnimation';
import { UniversalSearchBar } from '../components/search/UniversalSearchBar';
import { LightweightVisual } from '../components/common/LightweightVisual';
import { TOOLS_DATABASE } from '../data/toolsData';
import { BLOG_POSTS } from '../data/blogData';
import { AI_SOFTWARE_DATABASE } from '../data/aiSoftwareData';
import { COMPARISONS_DATABASE } from '../data/comparisonsData';
import { RESOURCES_DATABASE } from '../data/resourcesData';
import { NewsletterCapture } from '../components/common/NewsletterCapture';

interface HomePageProps {
  navigate: (route: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  // Curated popular free tools
  const popularTools = TOOLS_DATABASE.slice(0, 8);

  const intentActions = [
    { label: 'Research Keywords', query: 'keyword research', icon: TrendingUp, color: 'text-blue-600 bg-blue-50' },
    { label: 'Write Articles', query: 'ai article writer', icon: BookOpen, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Find Business Ideas', query: 'business ideas', icon: Sparkles, color: 'text-amber-600 bg-amber-50' },
    { label: 'YouTube Growth', query: 'youtube growth', icon: Compass, color: 'text-rose-600 bg-rose-50' },
    { label: 'Automate Workflows', query: 'automate my business', icon: Cpu, color: 'text-purple-600 bg-purple-50' },
    { label: 'Sell Digital Products', query: 'sell digital products', icon: Layers, color: 'text-indigo-600 bg-indigo-50' },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-neutral-200/80 bg-white py-16 sm:py-24">
        {/* Animated Background Canvas */}
        <HeroBackgroundAnimation />

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          {/* Top Pill (Prompt Section 4) */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold text-blue-800 shadow-xs mb-6 backdrop-blur-xs">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            <span>AI + SEO + Growth — Free Tools &amp; Practical Guides</span>
          </div>

          {/* MAIN H1 & SECOND LINE (Prompt Section 4) */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-neutral-900 leading-tight sm:leading-none">
            Grow Smarter With AI.
            <span className="block mt-2 text-3xl sm:text-5xl font-bold text-neutral-700">
              Better Tools. Better Content. Better Traffic.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-neutral-600 leading-relaxed">
            Discover powerful AI tools, research better keywords, create useful content and learn practical strategies for growing your business online.
          </p>

          {/* UNIVERSAL SEARCH BAR */}
          <div className="mt-10">
            <UniversalSearchBar navigate={navigate} />
          </div>
        </div>
      </section>

      {/* SECTION 1: POPULAR FREE TOOLS (Prompt Section 40) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Zero Cost Utilities</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
              Popular Free Tools
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Battle-tested tools to research, create, optimize and automate — no mandatory login.
            </p>
          </div>

          <button
            onClick={() => navigate('/tools')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline shrink-0"
          >
            <span>View All 40+ Free Tools</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {popularTools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => navigate(`/tools/${tool.slug}`)}
              className="group cursor-pointer rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-xs hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="rounded-md bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 border border-blue-100">
                    {tool.category}
                  </span>
                  <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
                    {tool.badge}
                  </span>
                </div>

                {/* Micro illustration visual for each tool */}
                <div className="w-full h-24 rounded-lg overflow-hidden mb-3 border border-neutral-100 bg-neutral-50/50">
                  <LightweightVisual type={tool.visualType} />
                </div>

                <h3 className="font-bold text-sm text-neutral-900 group-hover:text-blue-600 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-neutral-500 line-clamp-2 mt-1 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-blue-600">
                <span>Use Tool</span>
                <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: "WHAT DO YOU WANT AI TO HELP YOU WITH?" (Section 40) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-neutral-200/80 bg-neutral-100/60 p-8 sm:p-12">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              What do you want AI to help you with?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-2">
              Choose your goal to jump directly into verified tools and tactical step-by-step blueprints.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {intentActions.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => navigate(`/tools?q=${encodeURIComponent(item.query)}`)}
                  className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-4 text-center hover:border-blue-500 hover:shadow-md transition-all group"
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.color} mb-2.5`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold text-neutral-800 group-hover:text-blue-600">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: HOW WE HELP (Research, Create, Optimize, Automate, Grow) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">The Growth Flywheel</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
            How We Help You Grow
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Five sequential stages to build a resilient, high-margin digital business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { step: '01', title: 'Research', desc: 'Find untapped long-tail queries and breakout trends before saturation.', route: '/tools/keyword-explorer' },
            { step: '02', title: 'Create', desc: 'Generate high-density guides, video hooks, and digital assets.', route: '/tools/ai-article-writer' },
            { step: '03', title: 'Optimize', desc: 'Polish titles, meta descriptions, CTR, and Schema.org rich snippets.', route: '/tools/seo-title-generator' },
            { step: '04', title: 'Automate', desc: 'Connect AI agents and no-code pipelines to reclaim 15+ hours weekly.', route: '/tools/automation-workflow-builder' },
            { step: '05', title: 'Grow', desc: 'Monetize traffic via digital products, SaaS referrals, and email lists.', route: '/blog/sell-digital-products-guide' },
          ].map((item) => (
            <div
              key={item.step}
              onClick={() => navigate(item.route)}
              className="cursor-pointer rounded-2xl border border-neutral-200 bg-white p-5 hover:border-blue-400 hover:shadow-xs transition-all space-y-2"
            >
              <span className="text-xs font-extrabold text-blue-600 font-mono">{item.step}</span>
              <h3 className="font-bold text-neutral-900 text-sm">{item.title}</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: TRENDING GUIDES & EDITORIAL (Prompt Section 40) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Editorial Authority</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
              Trending Guides &amp; Blueprints
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              In-depth research, no AI fluff. Real frameworks tested on modern search algorithms.
            </p>
          </div>

          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline shrink-0"
          >
            <span>Browse All Guides</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <article
              key={post.id}
              onClick={() => navigate(`/blog/${post.slug}`)}
              className="group cursor-pointer rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Lightweight Vector Visual (User Request) */}
                <div className="w-full h-36 rounded-xl overflow-hidden mb-4 border border-neutral-100 bg-neutral-50/60">
                  <LightweightVisual type={post.visualType} />
                </div>

                <div className="flex items-center gap-2 text-xs mb-2">
                  <span className="rounded-md bg-blue-50 text-blue-700 font-bold px-2 py-0.5 text-[10px]">
                    {post.category}
                  </span>
                  <span className="text-neutral-400">•</span>
                  <span className="text-neutral-400 text-[11px]">{post.readingTime}</span>
                </div>

                <h3 className="font-extrabold text-base text-neutral-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-neutral-500 mt-2 line-clamp-2 leading-relaxed">
                  {post.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-blue-600">
                <span>Read Full Guide</span>
                <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 5 & 6: AI SOFTWARE DISCOVERY & COMPARISONS (Prompt Section 40) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Popular AI Software */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600">Software Directory</span>
                <h3 className="text-xl font-extrabold text-neutral-900">Curated AI Software</h3>
              </div>
              <button
                onClick={() => navigate('/ai-tools')}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                View Directory →
              </button>
            </div>

            <div className="space-y-3">
              {AI_SOFTWARE_DATABASE.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate('/ai-tools')}
                  className="cursor-pointer rounded-2xl border border-neutral-200 bg-white p-4 hover:border-purple-300 transition-all flex items-start justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-neutral-900">{item.name}</h4>
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                        {item.ratingScore} ★
                      </span>
                      <span className="text-[10px] text-neutral-400">({item.testedStatus})</span>
                    </div>
                    <p className="text-xs text-neutral-600 mt-1 line-clamp-1">{item.tagline}</p>
                    <p className="text-[11px] text-neutral-400 mt-1">
                      <strong>Best for:</strong> {item.bestFor}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-neutral-400 shrink-0">{item.pricing.split('/')[0]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Software Comparisons */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Head-to-Head</span>
                <h3 className="text-xl font-extrabold text-neutral-900">Latest Comparisons</h3>
              </div>
              <button
                onClick={() => navigate('/comparisons')}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                View All →
              </button>
            </div>

            <div className="space-y-3">
              {COMPARISONS_DATABASE.map((comp) => (
                <div
                  key={comp.id}
                  onClick={() => navigate(`/comparisons/${comp.slug}`)}
                  className="cursor-pointer rounded-2xl border border-neutral-200 bg-white p-4 hover:border-amber-300 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                      {comp.category}
                    </span>
                    <span className="text-[10px] text-neutral-400">Updated {comp.lastUpdated}</span>
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-neutral-900 line-clamp-1">{comp.title}</h4>
                  <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                    {comp.winnerSummary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: FREE RESOURCES & CHECKLISTS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-blue-200/80 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50 p-8 sm:p-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Templates &amp; Workbooks</span>
              <h3 className="text-2xl font-extrabold text-neutral-900">Free Operational Resources</h3>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                Zero friction, immediate access. Downloadable blueprints to launch faster.
              </p>
            </div>
            <button
              onClick={() => navigate('/resources')}
              className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700"
            >
              Browse All Checklists →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {RESOURCES_DATABASE.map((res) => (
              <div
                key={res.id}
                onClick={() => navigate('/resources')}
                className="cursor-pointer rounded-2xl border border-neutral-200 bg-white p-5 hover:border-blue-400 hover:shadow-xs transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded">
                    {res.badge}
                  </span>
                  <FileCheck className="h-4 w-4 text-emerald-600" />
                </div>
                <h4 className="font-bold text-sm text-neutral-900">{res.title}</h4>
                <p className="text-xs text-neutral-500 line-clamp-2">{res.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: NEWSLETTER CTA */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <NewsletterCapture />
      </section>
    </div>
  );
};
