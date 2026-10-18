import React, { useState, useEffect } from 'react';
import {
  Search,
  Sparkles,
  Download,
  Copy,
  Bookmark,
  Check,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  Layers,
  ArrowRight,
  ExternalLink,
  Globe,
  Filter,
  BarChart3,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Lock,
  Flame,
  Award,
} from 'lucide-react';
import { aiService, SemrushAnalysisResult, SemrushKeywordItem, SEMRUSH_COUNTRIES } from '../../services/aiService';
import { MatrixDataStreamAnimation } from '../common/MatrixDataStreamAnimation';
import { workspaceStorage } from '../../utils/workspaceStorage';
import confetti from 'canvas-confetti';

interface KeywordExplorerViewProps {
  initialKeyword?: string;
  navigate: (route: string) => void;
}

export const KeywordExplorerView: React.FC<KeywordExplorerViewProps> = ({
  initialKeyword = 'ai tools for creators',
  navigate,
}) => {
  const [query, setQuery] = useState(initialKeyword);
  const [selectedCountryCode, setSelectedCountryCode] = useState('US');
  const [loading, setLoading] = useState(false);
  const [isGroundingAI, setIsGroundingAI] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'broad' | 'phrase' | 'exact' | 'related' | 'questions' | 'serp'>('all');
  const [analysis, setAnalysis] = useState<SemrushAnalysisResult | null>(() => {
    return aiService.getInstantSemrushData(initialKeyword || 'AI tools for creators', 'US');
  });
  const [kdFilter, setKdFilter] = useState<'all' | 'easy' | 'high-vol'>('all');

  const selectedCountry = SEMRUSH_COUNTRIES.find((c) => c.code === selectedCountryCode) || SEMRUSH_COUNTRIES[0];

  const handleRunSearch = (targetQuery?: string) => {
    const q = (targetQuery !== undefined ? targetQuery : query).trim();
    if (!q) return;
    if (targetQuery !== undefined) setQuery(targetQuery);

    // Stage 1: INSTANT (<1ms) Semrush-grade rendering with local data engine
    const instantData = aiService.getInstantSemrushData(q, selectedCountryCode);
    setAnalysis(instantData);
    setLoading(false);
    setIsGroundingAI(true);

    // Stage 2: Background AI refinement (non-blocking)
    aiService
      .analyzeKeywordSemrush(q, selectedCountryCode)
      .then((aiResult) => {
        setAnalysis(aiResult);
      })
      .catch((err) => {
        console.warn('Background AI sync notice:', err);
      })
      .finally(() => {
        setIsGroundingAI(false);
      });
  };

  useEffect(() => {
    handleRunSearch(initialKeyword);
  }, []);

  const handleCountryChange = (newCode: string) => {
    setSelectedCountryCode(newCode);
    const q = query.trim() || 'keyword research';

    // 1. Instant Country Switch: 0ms latency, instant re-calculation of volume, currency & KD
    const instantData = aiService.getInstantSemrushData(q, newCode);
    setAnalysis(instantData);
    setIsGroundingAI(true);

    // 2. Non-blocking AI sync
    aiService
      .analyzeKeywordSemrush(q, newCode)
      .then((aiData) => {
        setAnalysis(aiData);
      })
      .finally(() => {
        setIsGroundingAI(false);
      });
  };

  const handleSaveWorkspace = () => {
    if (!analysis) return;
    workspaceStorage.saveItem({
      id: `kw-${Date.now()}`,
      type: 'keyword',
      title: analysis.query,
      category: analysis.isDomain ? 'Domain Audit' : 'Keyword Search',
      content: JSON.stringify(analysis, null, 2),
      metadata: {
        volume: analysis.monthlyVolume,
        kd: analysis.kdPercent,
        cpc: analysis.cpc,
        country: analysis.country,
      },
    });
    setSaved(true);
    confetti({ particleCount: 35, spread: 50, origin: { y: 0.8 } });
    setTimeout(() => setSaved(false), 2500);
  };

  const handleCopyKeywords = (items: SemrushKeywordItem[]) => {
    const text = items
      .map((k) => `${k.keyword} | Vol: ${k.volume} | KD: ${k.kd}% | CPC: ${k.cpc} | Intent: ${k.intent}`)
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportCSV = () => {
    if (!analysis) return;
    const allKeywords = [
      ...analysis.broadMatch,
      ...analysis.phraseMatch,
      ...analysis.exactMatch,
      ...analysis.relatedKeywords,
    ];

    const rows = [
      ['Keyword', 'Search Volume', 'Keyword Difficulty (KD%)', 'CPC', 'Intent', 'Competitive Density', 'Country'],
      ...allKeywords.map((k) => [
        `"${k.keyword}"`,
        `"${k.volume}"`,
        `"${k.kd}%"`,
        `"${k.cpc}"`,
        `"${k.intent}"`,
        `"${k.competitiveDensity}"`,
        `"${analysis.country}"`,
      ]),
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `rank2seo-keyword-report-${analysis.query.replace(/[^a-zA-Z0-9]/g, '-')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Determine active keyword items for Keyword Explorer
  const getDisplayKeywords = (): SemrushKeywordItem[] => {
    if (!analysis) return [];
    let list: SemrushKeywordItem[] = [];
    if (activeTab === 'all') {
      list = [...analysis.broadMatch, ...analysis.phraseMatch, ...analysis.relatedKeywords];
    } else if (activeTab === 'broad') {
      list = analysis.broadMatch;
    } else if (activeTab === 'phrase') {
      list = analysis.phraseMatch;
    } else if (activeTab === 'exact') {
      list = analysis.exactMatch;
    } else if (activeTab === 'related') {
      list = analysis.relatedKeywords;
    }

    if (kdFilter === 'easy') {
      return list.filter((k) => k.kd <= 30);
    }
    if (kdFilter === 'high-vol') {
      return list.filter((k) => k.volumeNumeric > 800);
    }
    return list;
  };

  const sampleSearches = [
    { label: 'ai tools for creators', type: 'kw' },
    { label: 'saas marketing', type: 'kw' },
    { label: 'nike.com', type: 'domain' },
    { label: 'etsy seo tags', type: 'kw' },
    { label: 'hubspot.com', type: 'domain' },
    { label: 'best running shoes uk', type: 'kw' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* SEARCH ENGINE BAR with Matrix Data Stream Background */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-[#3d2a1d] bg-gradient-to-r from-[#1c120a] via-[#24170e] to-[#140d08] p-6 sm:p-8 text-white shadow-2xl space-y-6">
        {/* Hypnotic, relaxed multi-color matrix rain */}
        <MatrixDataStreamAnimation intensity="ambient" showColorIndicator={false} className="pointer-events-none absolute inset-0 z-0 opacity-40" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/40 text-xs font-bold px-3 py-1">
                <Sparkles className="h-3.5 w-3.5 text-sky-400" />
                <span>rank2seo • 100% FREE KEYWORD ENGINE</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Global Keyword &amp; Competitor Search Engine
              </h1>
              <p className="text-xs sm:text-sm text-neutral-300">
                Exact search volume, KD% difficulty, CPC in local currencies, SERP analysis &amp; domain audits for any business or website.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto">
              <span className="rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-extrabold px-3 py-1">
                ✓ Free Forever • 100% Free Organic Search Intelligence
              </span>
            </div>
          </div>

          {/* Unified Search Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRunSearch();
          }}
          className="flex flex-col lg:flex-row items-stretch gap-3"
        >
          {/* Text Input */}
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-neutral-400">
              <Search className="h-5 w-5 text-sky-400" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter keyword or domain (e.g. 'ai tools', 'nike.com', 'etsy seo', 'saas pricing')..."
              className="w-full rounded-2xl border-2 border-[#5c3e29] bg-[#2a1a10] pl-12 pr-4 py-3.5 text-sm sm:text-base font-medium text-white placeholder-neutral-400 focus:border-sky-400 focus:outline-hidden focus:ring-2 focus:ring-sky-400/30 transition-all shadow-inner"
            />
          </div>

          {/* Global Country Selector (18+ Countries matching Semrush) */}
          <div className="relative min-w-[220px]">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-400">
              <Globe className="h-4 w-4 text-sky-400" />
            </div>
            <select
              value={selectedCountryCode}
              onChange={(e) => handleCountryChange(e.target.value)}
              className="w-full appearance-none rounded-2xl border-2 border-[#5c3e29] bg-[#2a1a10] pl-10 pr-8 py-3.5 text-xs sm:text-sm font-bold text-white focus:border-sky-400 focus:outline-hidden transition-all cursor-pointer"
            >
              {SEMRUSH_COUNTRIES.map((c) => (
                <option key={c.code} value={c.code} className="bg-[#1f130b] text-white">
                  {c.flag} {c.name} ({c.currency.trim()})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-400">
              ▼
            </div>
          </div>

          {/* Search Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-300 hover:to-sky-400 px-8 py-3.5 text-sm font-extrabold text-[#140e0a] shadow-lg shadow-sky-500/25 active:scale-98 transition-all shrink-0 cursor-pointer disabled:opacity-75"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-[#140e0a] border-t-transparent rounded-full animate-spin" />
                <span>Analyzing Keyword Matrix...</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Zap className="h-4 w-4 fill-current" />
                <span>Search Global Data</span>
              </span>
            )}
          </button>
        </form>

        {/* Quick Sample Search Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-neutral-400 font-medium">Popular Searches:</span>
          {sampleSearches.map((s, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setQuery(s.label);
                handleRunSearch(s.label);
              }}
              className="rounded-lg bg-[#301e13] hover:bg-[#452b1b] px-2.5 py-1 text-sky-200 border border-[#523522] transition-colors"
            >
              {s.type === 'domain' ? '🌐 ' : '🔍 '}
              {s.label}
            </button>
          ))}
        </div>
        </div>
      </div>

      {/* RESULTS DISPLAY */}
      {analysis && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Top Overview Control Ribbon */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl border border-neutral-200 p-4 shadow-xs">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{analysis.countryBreakdown[0]?.flag || '🌍'}</span>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-extrabold text-neutral-900">
                    {analysis.query}
                  </h2>
                  <span className="rounded-md bg-sky-100 text-sky-800 text-[11px] font-bold px-2 py-0.5">
                    {analysis.isDomain ? 'Domain Organic Audit' : 'Keyword Overview'}
                  </span>
                  <span className="rounded-md bg-neutral-100 text-neutral-700 text-[11px] font-bold px-2 py-0.5">
                    {analysis.country}
                  </span>
                  {isGroundingAI && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-[10px] font-bold px-2.5 py-0.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-ping" />
                      <span>Live AI Syncing...</span>
                    </span>
                  )}
                </div>
                <div className="text-xs text-neutral-500 mt-0.5">
                  {typeof analysis.marketInsight === 'string' ? (
                    <p>{analysis.marketInsight}</p>
                  ) : typeof analysis.marketInsight === 'object' && analysis.marketInsight !== null ? (
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      {Object.entries(analysis.marketInsight).map(([k, v]) => (
                        <span key={k} className="inline-flex items-center gap-1">
                          <strong className="text-neutral-700 capitalize">{k.replace(/([A-Z])/g, ' $1')}:</strong>
                          <span>{typeof v === 'string' ? v : JSON.stringify(v)}</span>
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleSaveWorkspace}
                className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 px-3.5 py-2 text-xs font-bold text-neutral-700 transition-colors"
              >
                {saved ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Bookmark className="h-3.5 w-3.5 text-sky-600" />}
                <span>{saved ? 'Saved!' : 'Save to Workspace'}</span>
              </button>

              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 px-4 py-2 text-xs font-extrabold text-[#140e0a] shadow-xs active:scale-98 transition-all"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export CSV Report</span>
              </button>
            </div>
          </div>

          {/* IF DOMAIN AUDIT: Semrush Domain Overview Panels */}
          {analysis.isDomain && analysis.domainAudit && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-2xl border border-neutral-200 bg-white p-5 space-y-1">
                  <span className="text-xs font-bold text-neutral-400 uppercase">Authority Score</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-sky-600">{analysis.domainAudit.authorityScore}</span>
                    <span className="text-xs text-neutral-500">/ 100</span>
                  </div>
                  <span className="text-[11px] text-emerald-600 font-bold block">✓ High Domain Trust</span>
                </div>

                <div className="rounded-2xl border border-neutral-200 bg-white p-5 space-y-1">
                  <span className="text-xs font-bold text-neutral-400 uppercase">Organic Search Traffic</span>
                  <div className="text-3xl font-extrabold text-neutral-900">
                    {analysis.domainAudit.organicTrafficMonthly}
                  </div>
                  <span className="text-[11px] text-neutral-500">Estimated visits / month</span>
                </div>

                <div className="rounded-2xl border border-neutral-200 bg-white p-5 space-y-1">
                  <span className="text-xs font-bold text-neutral-400 uppercase">Ranked Keywords</span>
                  <div className="text-3xl font-extrabold text-neutral-900">
                    {analysis.domainAudit.organicKeywordsTotal}
                  </div>
                  <span className="text-[11px] text-neutral-500">Total Google SERP rankings</span>
                </div>

                <div className="rounded-2xl border border-neutral-200 bg-white p-5 space-y-1">
                  <span className="text-xs font-bold text-neutral-400 uppercase">Paid Search Traffic</span>
                  <div className="text-3xl font-extrabold text-neutral-900">
                    {analysis.domainAudit.paidTrafficMonthly}
                  </div>
                  <span className="text-[11px] text-neutral-500">PPC Google Ads clicks</span>
                </div>
              </div>

              {/* Top Organic Ranking Keywords Table for this Domain */}
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-base text-neutral-900">
                      Top Organic Keywords Driving Traffic to {analysis.domainAudit.domain}
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Positions, search demand, and estimated traffic contribution.
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-50 text-neutral-500 uppercase font-bold border-y border-neutral-200">
                      <tr>
                        <th className="py-3 px-4">Position</th>
                        <th className="py-3 px-4">Keyword</th>
                        <th className="py-3 px-4">Search Volume</th>
                        <th className="py-3 px-4">KD%</th>
                        <th className="py-3 px-4">Traffic Share</th>
                        <th className="py-3 px-4">Ranking URL</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {analysis.domainAudit.topRankingKeywords.map((k, i) => (
                        <tr key={i} className="hover:bg-neutral-50/70 transition-colors">
                          <td className="py-3 px-4 font-mono font-extrabold text-sky-600">
                            #{k.position}
                          </td>
                          <td className="py-3 px-4 font-bold text-neutral-900">
                            {k.keyword}
                          </td>
                          <td className="py-3 px-4 font-mono">{k.volume}</td>
                          <td className="py-3 px-4 font-mono font-bold text-neutral-700">{k.kd}%</td>
                          <td className="py-3 px-4 font-bold text-emerald-600">{k.trafficShare}</td>
                          <td className="py-3 px-4 text-neutral-500 font-mono text-[11px] truncate max-w-[200px]">
                            {k.url}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* KEYWORD METRICS DASHBOARD (Semrush 6-Card Layout) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Card 1: Monthly Search Volume & 12-Month Trend Sparkline */}
            <div className="lg:col-span-2 rounded-2xl border border-neutral-200 bg-white p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Search Volume</span>
                <span className="text-xs font-bold text-sky-600">{analysis.country}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-neutral-900">{analysis.monthlyVolume}</span>
                <span className="text-xs text-neutral-500 font-medium">searches / mo</span>
              </div>

              {/* 12-Month Historical Seasonality Trend Bar Chart */}
              <div className="pt-2 border-t border-neutral-100 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-neutral-500 font-medium">
                  <span>12-Month Search Demand Trend</span>
                  <span className="text-emerald-600 font-bold">Stable Growth</span>
                </div>
                <div className="flex items-end gap-1.5 h-12 pt-1">
                  {analysis.trend12Months.map((val, idx) => (
                    <div
                      key={idx}
                      className="flex-1 bg-sky-200 hover:bg-sky-400 rounded-t transition-all cursor-pointer relative group"
                      style={{ height: `${val}%` }}
                      title={`Month ${idx + 1}: ${val}% search interest`}
                    >
                      <div className="hidden group-hover:block absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap z-10">
                        {val}%
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                  <span>12 mos ago</span>
                  <span>Now</span>
                </div>
              </div>
            </div>

            {/* Card 2: Keyword Difficulty (KD%) Ring Meter */}
            <div className="lg:col-span-2 rounded-2xl border border-neutral-200 bg-white p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Keyword Difficulty</span>
                <span
                  className="rounded-md text-[11px] font-extrabold px-2 py-0.5 text-white"
                  style={{ backgroundColor: analysis.kdStatus.color }}
                >
                  {analysis.kdStatus.label}
                </span>
              </div>

              <div className="flex items-center gap-4">
                {/* Visual circular progress meter */}
                <div className="relative h-16 w-16 shrink-0 flex items-center justify-center">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-neutral-100"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      strokeWidth="3.5"
                      strokeDasharray={`${analysis.kdPercent}, 100`}
                      stroke={analysis.kdStatus.color}
                      strokeLinecap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute font-mono font-extrabold text-base text-neutral-900">
                    {analysis.kdPercent}%
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="font-extrabold text-sm text-neutral-900">{analysis.kdStatus.label}</h4>
                  <p className="text-[11px] text-neutral-500 leading-tight">
                    {analysis.kdStatus.description}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-100 text-[11px] text-neutral-500">
                {analysis.kdPercent <= 30 ? (
                  <span className="text-emerald-700 font-bold">★ High opportunity easy win for new or growing sites!</span>
                ) : (
                  <span>Build high quality content and internal backlinks to compete.</span>
                )}
              </div>
            </div>

            {/* Card 3: Global Volume & Top 5 Countries */}
            <div className="lg:col-span-2 rounded-2xl border border-neutral-200 bg-white p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Global Volume</span>
                <span className="text-xs font-mono font-extrabold text-neutral-900">{analysis.globalVolume}</span>
              </div>

              <div className="space-y-2 pt-1">
                {analysis.countryBreakdown.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="flex items-center gap-1.5 text-neutral-800">
                        <span>{item.flag}</span>
                        <span>{item.country}</span>
                      </span>
                      <span className="font-mono text-neutral-600">{item.volume}</span>
                    </div>
                    <div className="w-full bg-neutral-100 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-sky-500 h-full rounded-full" style={{ width: `${item.sharePercent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 4: Intent */}
            <div className="lg:col-span-2 rounded-2xl border border-neutral-200 bg-white p-5 space-y-2 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Search Intent</span>
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 font-extrabold text-xs">
                  {analysis.searchIntent.badge}
                </span>
                <span className="font-extrabold text-base text-neutral-900">{analysis.searchIntent.primary}</span>
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed">{analysis.searchIntent.description}</p>
            </div>

            {/* Card 5: CPC & Competitive Density */}
            <div className="lg:col-span-2 rounded-2xl border border-neutral-200 bg-white p-5 space-y-2 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">CPC &amp; Ads Density</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-neutral-900">{analysis.cpc}</span>
                <span className="text-xs text-neutral-500 font-medium">avg cost per click</span>
              </div>
              <div className="flex items-center justify-between text-xs text-neutral-600 pt-1">
                <span>Competitive Density:</span>
                <span className="font-mono font-bold text-neutral-900">{analysis.competitiveDensity} / 1.00</span>
              </div>
            </div>

            {/* Card 6: SERP Features */}
            <div className="lg:col-span-2 rounded-2xl border border-neutral-200 bg-white p-5 space-y-2 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">SERP Features</span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {analysis.serpFeatures.map((feat, idx) => (
                  <span
                    key={idx}
                    className="rounded-md bg-neutral-100 text-neutral-700 text-[11px] font-semibold px-2 py-0.5"
                  >
                    {typeof feat === 'string' ? feat : (feat as any)?.name || (feat as any)?.feature || JSON.stringify(feat)}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* KEYWORD MATCH EXPLORER SECTION */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-200 pb-5">
              <div>
                <h3 className="text-lg font-extrabold text-neutral-900 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-sky-500" />
                  <span>Keyword Variations &amp; Intent Explorer</span>
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Explore broad, phrase match, exact search terms and high-converting questions.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyKeywords(getDisplayKeywords())}
                  className="inline-flex items-center gap-1 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy List'}</span>
                </button>
                <button
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-1 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>CSV</span>
                </button>
              </div>
            </div>

            {/* Keyword Magic Tabs & Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold">
                {[
                  { id: 'all', label: 'All Match' },
                  { id: 'broad', label: 'Broad Match' },
                  { id: 'phrase', label: 'Phrase Match' },
                  { id: 'exact', label: 'Exact Match' },
                  { id: 'related', label: 'Related' },
                  { id: 'questions', label: 'Questions' },
                  { id: 'serp', label: 'SERP Top 10' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`rounded-lg px-3 py-1.5 transition-all ${
                      activeTab === tab.id
                        ? 'bg-sky-500 text-[#140e0a] font-extrabold shadow-xs'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Quick Filters */}
              {activeTab !== 'questions' && activeTab !== 'serp' && (
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-neutral-400 font-medium">Filter:</span>
                  <button
                    onClick={() => setKdFilter(kdFilter === 'easy' ? 'all' : 'easy')}
                    className={`rounded-md px-2.5 py-1 text-xs font-bold transition-colors ${
                      kdFilter === 'easy' ? 'bg-emerald-600 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    Easy Wins (KD &le; 30%)
                  </button>
                  <button
                    onClick={() => setKdFilter(kdFilter === 'high-vol' ? 'all' : 'high-vol')}
                    className={`rounded-md px-2.5 py-1 text-xs font-bold transition-colors ${
                      kdFilter === 'high-vol' ? 'bg-sky-600 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    High Volume (&gt;800)
                  </button>
                </div>
              )}
            </div>

            {/* Keyword Magic Table */}
            {activeTab !== 'questions' && activeTab !== 'serp' && (
              <div className="overflow-x-auto border border-neutral-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-50 text-neutral-500 font-bold uppercase border-b border-neutral-200">
                    <tr>
                      <th className="py-3 px-4">Keyword</th>
                      <th className="py-3 px-4">Intent</th>
                      <th className="py-3 px-4">Volume</th>
                      <th className="py-3 px-4">KD%</th>
                      <th className="py-3 px-4">CPC</th>
                      <th className="py-3 px-4">Competitive Density</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {getDisplayKeywords().map((item, idx) => (
                      <tr key={idx} className="hover:bg-neutral-50 transition-colors">
                        <td className="py-3 px-4 font-bold text-neutral-900">
                          {item.keyword}
                        </td>
                        <td className="py-3 px-4">
                          <span className="rounded bg-indigo-50 text-indigo-700 text-[10px] font-extrabold px-1.5 py-0.5">
                            {item.intent}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-neutral-800">
                          {item.volume}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold">
                          <span
                            className="rounded px-2 py-0.5 text-white text-[11px]"
                            style={{
                              backgroundColor:
                                item.kd <= 14 ? '#10b981' : item.kd <= 29 ? '#22c55e' : item.kd <= 49 ? '#eab308' : item.kd <= 69 ? '#f97316' : '#ef4444',
                            }}
                          >
                            {item.kd}%
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono font-medium text-neutral-700">
                          {item.cpc}
                        </td>
                        <td className="py-3 px-4 font-mono text-neutral-600">
                          {item.competitiveDensity}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => {
                              setQuery(item.keyword);
                              handleRunSearch(item.keyword);
                            }}
                            className="text-sky-600 hover:text-sky-800 font-bold hover:underline"
                          >
                            Analyze →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Questions Tab */}
            {activeTab === 'questions' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysis.questions.map((q, qIdx) => (
                    <div key={qIdx} className="rounded-xl border border-neutral-200 bg-neutral-50/60 p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-sm text-neutral-900">❓ {q.question}</span>
                        <span className="rounded bg-neutral-200 text-neutral-700 font-mono text-[11px] px-2 py-0.5">
                          Vol: {q.volume}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600 bg-white p-2.5 rounded-lg border border-neutral-200">
                        <strong>AI Quick Answer Snippet:</strong>{' '}
                        {typeof q.answerSnippet === 'string'
                          ? q.answerSnippet
                          : typeof q.answerSnippet === 'object' && q.answerSnippet !== null
                          ? Object.values(q.answerSnippet).join(' ')
                          : String(q.answerSnippet || '')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Google SERP Top 10 Analysis Tab */}
            {activeTab === 'serp' && (
              <div className="space-y-4">
                <div className="overflow-x-auto border border-neutral-200 rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-50 text-neutral-500 font-bold uppercase border-b border-neutral-200">
                      <tr>
                        <th className="py-3 px-3">Rank</th>
                        <th className="py-3 px-4">Title &amp; URL</th>
                        <th className="py-3 px-3">DA</th>
                        <th className="py-3 px-3">PA</th>
                        <th className="py-3 px-4">Backlinks</th>
                        <th className="py-3 px-4">Ref Domains</th>
                        <th className="py-3 px-4">Est. Traffic</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {analysis.serpTop10.map((serp) => (
                        <tr key={serp.rank} className="hover:bg-neutral-50 transition-colors">
                          <td className="py-3 px-3 font-mono font-extrabold text-sky-600">
                            #{serp.rank}
                          </td>
                          <td className="py-3 px-4 max-w-sm">
                            <div className="font-bold text-neutral-900 truncate">{serp.title}</div>
                            <div className="text-neutral-400 font-mono text-[10px] truncate">{serp.url}</div>
                          </td>
                          <td className="py-3 px-3 font-mono font-bold text-neutral-700">{serp.domainAuthority}</td>
                          <td className="py-3 px-3 font-mono text-neutral-600">{serp.pageAuthority}</td>
                          <td className="py-3 px-4 font-mono">{serp.backlinks}</td>
                          <td className="py-3 px-4 font-mono">{serp.refDomains}</td>
                          <td className="py-3 px-4 font-mono font-bold text-emerald-600">{serp.traffic}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
