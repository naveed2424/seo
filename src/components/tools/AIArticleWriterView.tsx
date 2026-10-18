import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  Download,
  Copy,
  Bookmark,
  Check,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Search,
  Layers,
  Flame,
} from 'lucide-react';
import { aiService, GeneratedArticle, TrendDemandResult } from '../../services/aiService';
import { LightweightVisual } from '../common/LightweightVisual';
import { workspaceStorage } from '../../utils/workspaceStorage';
import confetti from 'canvas-confetti';

interface AIArticleWriterViewProps {
  initialTopic?: string;
  navigate: (route: string) => void;
}

export const AIArticleWriterView: React.FC<AIArticleWriterViewProps> = ({
  initialTopic = '10 High-Demand Digital Products to Sell on Etsy in 2026',
  navigate,
}) => {
  const [topic, setTopic] = useState(initialTopic);
  const [targetKeyword, setTargetKeyword] = useState('etsy digital products to sell');
  const [tone, setTone] = useState('Authoritative & Practical');
  const [wordCount, setWordCount] = useState('Comprehensive Blueprint (~1500 words)');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [article, setArticle] = useState<GeneratedArticle | null>(null);

  // Google Trends searcher panel state
  const [trendsNiche, setTrendsNiche] = useState('AI workflows for small business');
  const [trendsLoading, setTrendsLoading] = useState(false);
  const [trendResult, setTrendResult] = useState<TrendDemandResult | null>(null);
  const [showTrendsModal, setShowTrendsModal] = useState(false);

  const handleSearchTrends = async () => {
    if (!trendsNiche.trim()) return;
    setTrendsLoading(true);
    try {
      const res = await aiService.searchTrends(trendsNiche, 'Past 90 Days');
      setTrendResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setTrendsLoading(false);
    }
  };

  const handleSelectTrendTopic = (trendQuery: string) => {
    setTopic(`How to Master ${trendQuery} in 2026: Definitive Guide`);
    setTargetKeyword(trendQuery);
    setShowTrendsModal(false);
  };

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const res = await aiService.generateArticle({
        topic,
        targetKeyword,
        tone,
        wordCount,
      });
      setArticle(res);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToWorkspace = () => {
    if (!article) return;
    workspaceStorage.saveItem({
      id: `draft-${Date.now()}`,
      type: 'article-draft',
      title: article.title,
      category: 'AI Generated Article',
      content: article.contentMarkdown,
      metadata: { keyword: targetKeyword, wordCount },
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCopyMarkdown = () => {
    if (!article) return;
    const fullText = `# ${article.title}

## Quick Answer
${article.quickAnswer}

## Key Takeaways
${article.keyTakeaways.map((t: string) => `- ${t}`).join('\n')}

${article.contentMarkdown}

## Frequently Asked Questions
${article.faqSchema.map((f: { question: string; answer: string }) => `### ${f.question}\n${f.answer}`).join('\n\n')}
    `;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMD = () => {
    if (!article) return;
    const fullText = `# ${article.title}\n\n## Quick Answer\n${article.quickAnswer}\n\n## Key Takeaways\n${article.keyTakeaways.map((t: string) => `- ${t}`).join('\n')}\n\n${article.contentMarkdown}`;
    const blob = new Blob([fullText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${article.title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 shadow-xs mb-8">
        <div className="max-w-2xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1">Flagship Writer</span>
            <span className="text-xs text-neutral-400">Google Trends Searcher Integrated</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            AI Article Writer &amp; Google Trends Searcher
          </h1>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Generate high-demand, E-E-A-T-ready blog posts crafted for modern search algorithms (Google, Perplexity, AI Overviews). Includes structured Quick Answers, Key Takeaways, FAQ schema, and circular internal links.
          </p>

          <div className="pt-1">
            <button
              onClick={() => {
                setShowTrendsModal(true);
                if (!trendResult) handleSearchTrends();
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-orange-50 border border-orange-200 px-3.5 py-1.5 text-xs font-bold text-orange-800 hover:bg-orange-100 transition-colors"
            >
              <Flame className="h-4 w-4 text-orange-600" />
              <span>Search Google Trends Demand First →</span>
            </button>
          </div>
        </div>

        {/* Vector SVG Badge */}
        <div className="w-48 h-32 shrink-0 rounded-xl overflow-hidden shadow-xs border border-emerald-100 bg-emerald-50/30">
          <LightweightVisual type="article-writer" />
        </div>
      </div>

      {/* Google Trends Modal */}
      {showTrendsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-150 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-600" />
                <h3 className="text-lg font-bold text-neutral-900">Google Trends Search Demand Explorer</h3>
              </div>
              <button
                onClick={() => setShowTrendsModal(false)}
                className="text-neutral-400 hover:text-neutral-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-neutral-500 mt-2 mb-4">
              Enter any niche to uncover breakout query velocity (+300% to +500% surge) before competitors discover them:
            </p>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={trendsNiche}
                onChange={(e) => setTrendsNiche(e.target.value)}
                placeholder="e.g. Etsy printables, AI video editing, freelance side hustles"
                className="w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-xs text-neutral-900 focus:border-orange-500 focus:outline-hidden"
              />
              <button
                onClick={handleSearchTrends}
                disabled={trendsLoading}
                className="rounded-xl bg-orange-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-orange-700 shrink-0 disabled:opacity-50"
              >
                {trendsLoading ? 'Searching...' : 'Find Breakouts'}
              </button>
            </div>

            {trendResult && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-xl bg-orange-50 p-3 border border-orange-100">
                    <span className="text-[10px] font-bold text-orange-700 uppercase">Demand Velocity</span>
                    <p className="text-sm font-extrabold text-orange-900 mt-0.5">{trendResult.breakoutVelocity}</p>
                  </div>
                  <div className="rounded-xl bg-blue-50 p-3 border border-blue-100">
                    <span className="text-[10px] font-bold text-blue-700 uppercase">Interest Score</span>
                    <p className="text-sm font-extrabold text-blue-900 mt-0.5">{trendResult.interestScore} / 100</p>
                  </div>
                  <div className="rounded-xl bg-emerald-50 p-3 border border-emerald-100">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase">Commercial Intent</span>
                    <p className="text-sm font-extrabold text-emerald-900 mt-0.5">{trendResult.commercialIntent}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-neutral-700 uppercase mb-2">Rising Search Queries (Click to Select &amp; Write Guide):</h4>
                  <div className="space-y-2">
                    {trendResult.risingQueries.map((rq: { query: string; growth: string; intent: string }, idx: number) => (
                      <div
                        key={idx}
                        onClick={() => handleSelectTrendTopic(rq.query)}
                        className="flex items-center justify-between rounded-xl border border-neutral-200 p-3 hover:border-orange-500 hover:bg-orange-50/40 cursor-pointer transition-all"
                      >
                        <div>
                          <span className="font-bold text-xs text-neutral-900">{rq.query}</span>
                          <span className="ml-2 text-[10px] text-neutral-400">[{rq.intent}]</span>
                        </div>
                        <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5">
                          {rq.growth}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Input Configuration Box */}
      <form onSubmit={handleGenerate} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
              Target Topic / Working Title
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. How to Monetize a Faceless YouTube Channel in 2026"
              className="w-full rounded-xl border border-neutral-300 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-900 focus:border-blue-600 focus:bg-white focus:outline-hidden"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
              Focus SEO Keyword
            </label>
            <input
              type="text"
              value={targetKeyword}
              onChange={(e) => setTargetKeyword(e.target.value)}
              placeholder="e.g. faceless youtube monetization"
              className="w-full rounded-xl border border-neutral-300 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-900 focus:border-blue-600 focus:bg-white focus:outline-hidden"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
              Tone &amp; Authority Style
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full rounded-xl border border-neutral-300 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-900 focus:border-blue-600 focus:bg-white focus:outline-hidden"
            >
              <option value="Authoritative & Practical">Authoritative & Practical (Recommended)</option>
              <option value="Step-by-Step Educational">Step-by-Step Educational</option>
              <option value="Executive SaaS & Analytical">Executive SaaS & Analytical</option>
              <option value="Casual & Direct Solopreneur">Casual & Direct Solopreneur</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
              Target Length &amp; Depth
            </label>
            <select
              value={wordCount}
              onChange={(e) => setWordCount(e.target.value)}
              className="w-full rounded-xl border border-neutral-300 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-900 focus:border-blue-600 focus:bg-white focus:outline-hidden"
            >
              <option value="Comprehensive Blueprint (~1500 words)">Comprehensive Blueprint (~1500 words)</option>
              <option value="Deep-Dive Topical Pillar (~2200 words)">Deep-Dive Topical Pillar (~2200 words)</option>
              <option value="Standard Tactical Guide (~800 words)">Standard Tactical Guide (~800 words)</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-neutral-100">
          <span className="text-xs text-neutral-400">
            Generates compliant E-E-A-T Quick Answer, Key Takeaways, Subheadings &amp; Schema
          </span>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 active:scale-98 disabled:opacity-50 transition-all"
          >
            {loading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Generating Blueprint...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Generate Article Guide</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Generated Article Preview */}
      {article && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Action Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-white p-3">
            <span className="text-xs font-bold text-neutral-900">
              Ready for Publication: <span className="text-emerald-700">~1,500 Words Generated</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyMarkdown}
                className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-neutral-500" />}
                <span>{copied ? 'Copied' : 'Copy Full Markdown'}</span>
              </button>

              <button
                onClick={handleDownloadMD}
                className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
              >
                <Download className="h-3.5 w-3.5 text-neutral-500" />
                <span>Download .MD</span>
              </button>

              <button
                onClick={handleSaveToWorkspace}
                className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-neutral-800"
              >
                {saved ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Bookmark className="h-3.5 w-3.5 text-indigo-400" />}
                <span>{saved ? 'Saved Draft' : 'Save Draft'}</span>
              </button>
            </div>
          </div>

          {/* Article Presentation Sheet */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xs space-y-6">
            <div>
              <span className="rounded-md bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1">
                E-E-A-T Optimized Blueprint
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-3 tracking-tight">
                {article.title}
              </h2>
            </div>

            {/* Quick Answer Block */}
            <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-2 flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-blue-600" /> Quick Answer (Zero-Click Summary)
              </h3>
              <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-medium">
                {article.quickAnswer}
              </p>
            </div>

            {/* Key Takeaways */}
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-2">
                Key Takeaways
              </h3>
              <ul className="space-y-1.5 text-xs sm:text-sm text-emerald-950 font-medium">
                {article.keyTakeaways.map((takeaway: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Table of Contents */}
            <div className="rounded-xl border border-neutral-200 bg-neutral-50/70 p-4">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2 block">
                Table of Contents
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {article.tableOfContents.map((toc: { id: string; label: string }) => (
                  <div key={toc.id} className="text-blue-600 font-medium">
                    {toc.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content Body */}
            <div className="prose prose-neutral max-w-none text-xs sm:text-sm leading-relaxed text-neutral-700 whitespace-pre-line border-t border-b border-neutral-100 py-6">
              {article.contentMarkdown}
            </div>

            {/* FAQ Schema Preview */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Generated FAQ Schema (E-E-A-T Rich Snippets)
              </h4>
              <div className="space-y-2">
                {article.faqSchema.map((faq: { question: string; answer: string }, idx: number) => (
                  <div key={idx} className="rounded-xl border border-neutral-200 p-4 bg-neutral-50/30">
                    <p className="font-bold text-xs text-neutral-900">{faq.question}</p>
                    <p className="text-xs text-neutral-600 mt-1">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
