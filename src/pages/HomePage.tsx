import React, { useState } from 'react';
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
  Video,
  Play,
  Globe,
  Clock,
  Zap,
  BarChart3,
  Check,
} from 'lucide-react';
import { MatrixDataStreamAnimation } from '../components/common/MatrixDataStreamAnimation';
import { SEMRUSH_COUNTRIES } from '../services/aiService';
import { TOOLS_DATABASE } from '../data/toolsData';

interface HomePageProps {
  navigate: (route: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const [quickQuery, setQuickQuery] = useState('');
  const [quickCountry, setQuickCountry] = useState('US');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickQuery.trim()) {
      navigate('/tools/keyword-explorer');
    } else {
      navigate(`/tools/keyword-explorer?q=${encodeURIComponent(quickQuery.trim())}`);
    }
  };

  const sampleChips = [
    'ai tools for creators',
    'saas marketing',
    'nike.com',
    'etsy seo tags',
    'hubspot.com',
    'best running shoes uk',
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* HERO SECTION with Slower Multi-Color Matrix Data Stream (30s Cycle) */}
      <section className="relative overflow-hidden border-b border-[#3b2b1f] bg-[#1a120c] py-20 sm:py-28 text-white shadow-2xl">
        {/* Film Matrix Digital Rain Canvas (Slow speed + 30s color morphing) */}
        <MatrixDataStreamAnimation intensity="active" showColorIndicator={true} />

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8 space-y-6">
          {/* Top Pill (Theme: Brown & Light Blue Matrix) */}
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-[#2d1f15]/90 px-4 py-1.5 text-xs font-semibold text-sky-300 shadow-lg backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-sky-400 animate-ping" />
            <span className="tracking-wide">rank2seo • 100% Free Global Search Engine</span>
          </div>

          {/* MAIN H1 & SECOND LINE */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight sm:leading-none">
            Exact Keywords &amp; Search Volume.
            <span className="block mt-2 text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-200 to-amber-300">
              Free Global Keyword Explorer for All Countries.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
            Analyze exact search volume, keyword difficulty (KD%), CPC in local currencies (<span className="text-sky-300">£, $, €, ₹, ¥</span>), and competitor website rankings 100% free with no monthly subscription.
          </p>

          {/* FLAGSHIP SEMRUSH SEARCH BAR IN HERO */}
          <div className="mt-8 mx-auto max-w-3xl">
            <form
              onSubmit={handleHeroSearch}
              className="flex flex-col sm:flex-row items-stretch gap-2.5 rounded-3xl bg-[#261910]/90 p-2.5 border-2 border-sky-400 shadow-2xl backdrop-blur-md"
            >
              <div className="relative flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-neutral-400">
                  <Search className="h-5 w-5 text-sky-400" />
                </div>
                <input
                  type="text"
                  value={quickQuery}
                  onChange={(e) => setQuickQuery(e.target.value)}
                  placeholder="Enter keyword or domain (e.g. 'ai tools', 'nike.com', 'etsy seo')..."
                  className="w-full rounded-2xl border-0 bg-transparent pl-12 pr-4 py-3.5 text-sm sm:text-base font-semibold text-white placeholder-neutral-400 focus:outline-hidden"
                />
              </div>

              {/* Country Selector */}
              <div className="relative min-w-[170px] sm:border-l sm:border-[#4d3322]">
                <select
                  value={quickCountry}
                  onChange={(e) => setQuickCountry(e.target.value)}
                  className="w-full appearance-none rounded-2xl bg-transparent pl-4 pr-8 py-3.5 text-xs sm:text-sm font-bold text-white focus:outline-hidden cursor-pointer"
                >
                  {SEMRUSH_COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code} className="bg-[#1f130b] text-white">
                      {c.flag} {c.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-400">
                  ▼
                </div>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-400 hover:bg-sky-300 px-6 py-3.5 text-sm font-extrabold text-[#140e0a] shadow-lg shadow-sky-500/25 active:scale-98 transition-all shrink-0 cursor-pointer"
              >
                <span>Search</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            {/* Quick sample chips */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-neutral-400">Try Quick Search:</span>
              {sampleChips.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setQuickQuery(chip);
                    navigate(`/tools/keyword-explorer?q=${encodeURIComponent(chip)}`);
                  }}
                  className="rounded-lg bg-[#382315] hover:bg-[#4a301e] px-2.5 py-1 text-sky-200 border border-[#523522] transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 24-HOUR AUTONOMOUS GOOGLE TREND BLOG SPOTLIGHT */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
        <div className="rounded-3xl border-2 border-emerald-400 bg-gradient-to-r from-[#17100b] via-[#24170e] to-[#121c15] p-6 sm:p-8 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-bold px-3 py-1">
              <Clock className="h-3.5 w-3.5 text-emerald-400" />
              <span>AUTONOMOUS 24-HOUR GOOGLE TRENDS AGENT</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              3,800+ Word Deep Pillar Posts Written Daily on Breakout Trends
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">
              Our automated research agent scans breakout Google Trends demand every 24 hours to generate fully SEO, GEO, and E-E-A-T optimized master guides with circular internal backlinks to bring massive traffic.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => navigate('/blog')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 px-6 py-3.5 text-sm font-extrabold text-[#091a10] shadow-lg shadow-emerald-500/30 active:scale-98 transition-all"
            >
              <Zap className="h-4 w-4 fill-current" />
              <span>Read 24H Trend Guides (3,800+ Words)</span>
            </button>
          </div>
        </div>
      </section>

      {/* ENTERPRISE COMPARISON MATRIX */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
              Why rank2seo Delivers Premium SEO Intelligence for $0
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Enterprise SEO Intelligence Without the $139.95/mo Bill
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500">
              Compare core features side-by-side. rank2seo delivers the same deep keyword search models, volume accuracy, and competitive insights for free.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-neutral-50 text-neutral-500 font-bold uppercase border-y border-neutral-200">
                <tr>
                  <th className="py-3 px-4">Feature</th>
                  <th className="py-3 px-4 text-emerald-700 bg-emerald-50/50">rank2seo (Our Platform)</th>
                  <th className="py-3 px-4 text-neutral-400">Legacy $140/mo Tools</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 font-medium">
                <tr>
                  <td className="py-3.5 px-4 font-bold text-neutral-900">Monthly Subscription Price</td>
                  <td className="py-3.5 px-4 font-extrabold text-emerald-600 bg-emerald-50/30">$0.00 (100% Free Forever)</td>
                  <td className="py-3.5 px-4 text-neutral-400 line-through">$139.95 / Month</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-neutral-900">Credit Card or Signup Required</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600 bg-emerald-50/30">❌ Never (Instant Access)</td>
                  <td className="py-3.5 px-4 text-neutral-500">Required for 7-day trial</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-neutral-900">Global Country Intelligence</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600 bg-emerald-50/30">18+ Countries &amp; Local Currencies</td>
                  <td className="py-3.5 px-4 text-neutral-600">Supported</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-neutral-900">Search Volume &amp; 12-Month Trends</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600 bg-emerald-50/30">Included with historical charts</td>
                  <td className="py-3.5 px-4 text-neutral-600">Included</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-neutral-900">Keyword Difficulty (KD%) &amp; Intent</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600 bg-emerald-50/30">0-100% Gauge + Exact Ranking Advice</td>
                  <td className="py-3.5 px-4 text-neutral-600">Included</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-neutral-900">Competitor Domain Organic Audits</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600 bg-emerald-50/30">Included (Top 10 keywords &amp; traffic)</td>
                  <td className="py-3.5 px-4 text-neutral-600">Included</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-neutral-900">Autonomous 24h Trend Blog Engine</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600 bg-emerald-50/30">✓ Included (3,800+ word guides daily)</td>
                  <td className="py-3.5 px-4 text-rose-500">❌ Not Available</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => navigate('/tools/keyword-explorer')}
              className="inline-flex items-center gap-2 rounded-xl bg-sky-500 hover:bg-sky-400 px-6 py-3 text-xs font-extrabold text-[#140e0a] shadow-xs transition-all cursor-pointer"
            >
              <span>Launch Keyword Explorer Now</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* UGC PROMO VIDEO CALLOUT */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#422d20] bg-gradient-to-r from-[#201610] to-[#140e0a] p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <span className="rounded bg-sky-400/20 text-sky-300 text-[10px] font-bold px-2.5 py-0.5">
              SOCIAL MEDIA READY
            </span>
            <h3 className="text-xl font-extrabold">
              🎬 Watch &amp; Download 78s UGC Animated Video
            </h3>
            <p className="text-xs text-neutral-300">
              Motion graphics video detailing all free keyword tools ready to publish on TikTok, YouTube Shorts &amp; Facebook.
            </p>
          </div>
          <button
            onClick={() => navigate('/video')}
            className="rounded-xl bg-sky-400 hover:bg-sky-300 px-5 py-3 text-xs font-extrabold text-[#140e0a] shrink-0"
          >
            Watch Video Studio (78s) →
          </button>
        </div>
      </section>

      {/* POPULAR FREE TOOLS DIRECTORY PREVIEW */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">All Included Free</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
              Popular Free Tools on rank2seo
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Explore our full ecosystem of SEO, content, and automation utilities.
            </p>
          </div>

          <button
            onClick={() => navigate('/tools')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-800 hover:underline shrink-0"
          >
            <span>View All 40+ Free Tools</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TOOLS_DATABASE.slice(0, 8).map((tool) => (
            <div
              key={tool.id}
              onClick={() => navigate(`/tools/${tool.slug}`)}
              className="group cursor-pointer rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs hover:border-sky-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="rounded-md bg-sky-50 text-sky-700 text-[10px] font-bold px-2 py-0.5 border border-sky-100">
                    {tool.category}
                  </span>
                  <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
                    {tool.badge}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-neutral-900 group-hover:text-sky-600 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-neutral-500 line-clamp-2 mt-1 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-sky-600">
                <span>Use Tool</span>
                <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
