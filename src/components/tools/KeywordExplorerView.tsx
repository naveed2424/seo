import React, { useState } from 'react';
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
} from 'lucide-react';
import { aiService, KeywordAnalysisResult } from '../../services/aiService';
import { LightweightVisual } from '../common/LightweightVisual';
import { workspaceStorage } from '../../utils/workspaceStorage';
import confetti from 'canvas-confetti';

interface KeywordExplorerViewProps {
  initialKeyword?: string;
  navigate: (route: string) => void;
}

export const KeywordExplorerView: React.FC<KeywordExplorerViewProps> = ({ initialKeyword = 'AI tools for creators', navigate }) => {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [country, setCountry] = useState('United States (US)');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'keywords' | 'questions' | 'longtail' | 'clusters' | 'serp'>('overview');
  const [analysis, setAnalysis] = useState<KeywordAnalysisResult | null>(null);

  const handleRunSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!keyword.trim()) return;
    setLoading(true);
    try {
      const result = await aiService.analyzeKeyword(keyword, country);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Run automatically on mount if initialKeyword is provided
  React.useEffect(() => {
    handleRunSearch();
  }, []);

  const handleSaveWorkspace = () => {
    if (!analysis) return;
    workspaceStorage.saveItem({
      id: `kw-${Date.now()}`,
      type: 'keyword',
      title: analysis.seedKeyword,
      category: 'SEO Keyword',
      content: JSON.stringify(analysis, null, 2),
      metadata: { score: analysis.opportunityScore, intent: analysis.searchIntent },
    });
    setSaved(true);
    confetti({ particleCount: 35, spread: 50, origin: { y: 0.8 } });
    setTimeout(() => setSaved(false), 2500);
  };

  const handleCopyKeywords = () => {
    if (!analysis) return;
    const list = analysis.relatedLongTail.map((k) => `${k.keyword} [Intent: ${k.intent}] (Score: ${k.opportunity})`).join('\n');
    navigator.clipboard.writeText(list);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportCSV = () => {
    if (!analysis) return;
    const rows = [
      ['Keyword', 'Intent', 'Opportunity Score'],
      ...analysis.relatedLongTail.map((k) => [k.keyword, k.intent, k.opportunity.toString()]),
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `rankpulse-keywords-${analysis.seedKeyword.replace(/\s+/g, '-')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Tool Header with Vector Illustration */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 shadow-xs mb-8">
        <div className="max-w-2xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1">Flagship Utility</span>
            <span className="text-xs text-neutral-400">100% Free • No API Key Required</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Keyword Explorer &amp; Opportunity Radar
          </h1>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Uncover high-intent search queries, long-tail variations, and searcher pain points. Evaluate our proprietary 0–100 Opportunity Score to find realistic rank targets before creating content.
          </p>
        </div>

        {/* Lightweight SVG Vector Visual */}
        <div className="w-48 h-32 shrink-0 rounded-xl overflow-hidden shadow-xs border border-blue-100 bg-blue-50/30">
          <LightweightVisual type="keyword-explorer" />
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleRunSearch} className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6 shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
              Seed Keyword or Topic
            </label>
            <div className="relative">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g. digital products, AI automation, dog grooming"
                className="w-full rounded-xl border border-neutral-300 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-900 focus:border-blue-600 focus:bg-white focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
              Target Market
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full rounded-xl border border-neutral-300 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-900 focus:border-blue-600 focus:bg-white focus:outline-hidden"
            >
              <option value="United States (US)">United States (US)</option>
              <option value="United Kingdom (UK)">United Kingdom (UK)</option>
              <option value="Canada (CA)">Canada (CA)</option>
              <option value="Australia (AU)">Australia (AU)</option>
              <option value="Worldwide">Worldwide</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-neutral-100">
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
            <span>AI Semantic Radar active. Opportunity score reflects search intent, difficulty &amp; SERP gaps.</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 active:scale-98 disabled:opacity-50 transition-all"
          >
            {loading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Analyzing Opportunity...</span>
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                <span>Explore Keyword</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Results Section */}
      {analysis && (
        <div className="space-y-6">
          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-white p-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800">
              <span className="text-neutral-400">Target:</span>
              <span className="font-bold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded">"{analysis.seedKeyword}"</span>
              {analysis.easyWin && (
                <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
                  ★ EASY WIN OPPORTUNITY
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyKeywords}
                className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-neutral-500" />}
                <span>{copied ? 'Copied' : 'Copy List'}</span>
              </button>

              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
              >
                <Download className="h-3.5 w-3.5 text-neutral-500" />
                <span>Export CSV</span>
              </button>

              <button
                onClick={handleSaveWorkspace}
                className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-neutral-800 transition-colors"
              >
                {saved ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Bookmark className="h-3.5 w-3.5 text-indigo-400" />}
                <span>{saved ? 'Saved!' : 'Save to Workspace'}</span>
              </button>
            </div>
          </div>

          {/* Metric KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Opportunity Score Card */}
            <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50/70 to-indigo-50/50 p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-800">Opportunity Score</span>
                <span className="text-[10px] font-semibold text-blue-600 bg-white px-2 py-0.5 rounded-full border border-blue-200">
                  RankPulse Metric
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-blue-700">{analysis.opportunityScore}</span>
                <span className="text-xs font-bold text-neutral-400">/ 100</span>
              </div>
              <p className="mt-1 text-[11px] text-blue-900/80">
                {analysis.opportunityScore >= 75
                  ? 'High commercial upside relative to SERP weakness. Recommended target.'
                  : 'Requires established domain authority and comprehensive backlinks.'}
              </p>
            </div>

            {/* Search Intent */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-5">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Search Intent</span>
              <div className="mt-2">
                <span className="inline-block rounded-md bg-purple-100 text-purple-800 text-base font-bold px-2.5 py-1">
                  {analysis.searchIntent}
                </span>
              </div>
              <p className="mt-2 text-[11px] text-neutral-500">
                Searchers are looking to compare options, evaluate software, or find specific tools.
              </p>
            </div>

            {/* Demand Range */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-5">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Demand Range</span>
              <div className="mt-2 text-lg font-bold text-neutral-900">{analysis.monthlyVolumeEstimate}</div>
              <p className="mt-2 text-[11px] text-neutral-400">
                Estimated monthly search demand range based on semantic sampling.
              </p>
            </div>

            {/* Commercial Value */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-5">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Estimated CPC Value</span>
              <div className="mt-2 text-lg font-bold text-emerald-700">{analysis.cpcEstimate}</div>
              <p className="mt-2 text-[11px] text-neutral-400">
                Advertiser bidding value indicates high commercial purchasing intent.
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-neutral-200 gap-6 text-sm font-semibold">
            {[
              { id: 'overview', label: 'Overview & SERP Gaps' },
              { id: 'keywords', label: 'Keywords & Scores' },
              { id: 'questions', label: 'Questions & Pain Points' },
              { id: 'clusters', label: 'Topic Clusters' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content 1: Overview & SERP Gaps */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-neutral-200 bg-white p-6">
                <h3 className="text-base font-bold text-neutral-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Identified SERP Weaknesses &amp; Content Gaps
                </h3>
                <p className="text-xs text-neutral-500 mb-4">
                  These represent concrete opportunities where current Page 1 ranking articles fail searchers:
                </p>
                <div className="space-y-2.5">
                  {analysis.serpGaps.map((gap, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50/40 p-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white text-xs font-bold">
                        {i + 1}
                      </span>
                      <p className="text-xs text-emerald-950 font-medium leading-relaxed">{gap}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button: Create Article with AI */}
              <div className="rounded-2xl border border-indigo-200 bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-lg font-bold">Ready to write a guide for this keyword?</h4>
                  <p className="text-xs text-blue-100 mt-1">
                    Pass "{analysis.seedKeyword}" directly into our AI Article Writer to create an E-E-A-T structured blueprint in seconds.
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/tools/ai-article-writer?topic=${encodeURIComponent(analysis.seedKeyword)}`)}
                  className="rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-neutral-900 hover:bg-neutral-100 shrink-0 shadow-sm"
                >
                  Create Article Now →
                </button>
              </div>
            </div>
          )}

          {/* Tab Content 2: Keywords & Scores Table */}
          {activeTab === 'keywords' && (
            <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-neutral-200 bg-neutral-50 text-[11px] uppercase tracking-wider text-neutral-500">
                    <tr>
                      <th className="px-4 py-3">Keyword Query</th>
                      <th className="px-4 py-3">Intent</th>
                      <th className="px-4 py-3">Opportunity Score</th>
                      <th className="px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {analysis.relatedLongTail.map((item, idx) => (
                      <tr key={idx} className="hover:bg-neutral-50/70 transition-colors">
                        <td className="px-4 py-3 font-semibold text-neutral-900">{item.keyword}</td>
                        <td className="px-4 py-3">
                          <span className="rounded bg-neutral-100 px-2 py-0.5 text-[10px] font-bold text-neutral-700">
                            {item.intent}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-blue-600">{item.opportunity}</span>
                            <div className="h-1.5 w-16 rounded-full bg-neutral-100 overflow-hidden">
                              <div
                                className="h-full bg-blue-600 rounded-full"
                                style={{ width: `${item.opportunity}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => navigate(`/tools/ai-article-writer?topic=${encodeURIComponent(item.keyword)}`)}
                            className="text-blue-600 font-semibold hover:underline flex items-center gap-1"
                          >
                            Draft Guide <ArrowRight className="h-3 w-3" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab Content 3: Questions */}
          {activeTab === 'questions' && (
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 space-y-4">
              <h3 className="text-base font-bold text-neutral-900">What Searchers Are Desperately Asking</h3>
              <p className="text-xs text-neutral-500">
                Answer these questions in your H2/H3 subheadings and FAQ Schema to win rich search snippets:
              </p>
              <div className="space-y-3">
                {analysis.questionQueries.map((q, idx) => (
                  <div key={idx} className="rounded-xl border border-neutral-200 p-4 hover:border-blue-200 transition-colors">
                    <div className="flex items-center gap-2 font-bold text-neutral-900 text-sm">
                      <HelpCircle className="h-4 w-4 text-blue-600 shrink-0" />
                      <span>{q.question}</span>
                    </div>
                    <div className="mt-2 text-xs text-neutral-500 pl-6">
                      <span className="font-semibold text-neutral-700">Searcher Friction:</span> {q.searcherPain}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content 4: Clusters */}
          {activeTab === 'clusters' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {analysis.semanticClusters.map((cluster, idx) => (
                <div key={idx} className="rounded-2xl border border-neutral-200 bg-white p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Layers className="h-4 w-4 text-indigo-600" />
                    <h4 className="font-bold text-neutral-900 text-sm">{cluster.clusterName}</h4>
                  </div>
                  <ul className="space-y-2 text-xs text-neutral-600">
                    {cluster.keywords.map((kw, i) => (
                      <li key={i} className="flex items-center gap-1.5 rounded-md bg-neutral-50 p-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                        <span className="font-medium text-neutral-800">{kw}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
