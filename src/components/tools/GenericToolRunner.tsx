import React, { useState } from 'react';
import { Sparkles, Copy, Check, Bookmark, ArrowRight, CheckCircle2, AlertTriangle, BookOpen } from 'lucide-react';
import { ToolItem } from '../../data/toolsData';
import { aiService } from '../../services/aiService';
import { LightweightVisual } from '../common/LightweightVisual';
import { workspaceStorage } from '../../utils/workspaceStorage';
import confetti from 'canvas-confetti';

interface GenericToolRunnerProps {
  tool: ToolItem;
  navigate: (route: string) => void;
}

export const GenericToolRunner: React.FC<GenericToolRunnerProps> = ({ tool, navigate }) => {
  // Initialize inputs with schema defaults
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    tool.inputsSchema.forEach((inp) => {
      initial[inp.name] = inp.defaultValue || '';
    });
    return initial;
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  // Profit calculator live calculation
  const isProfitCalc = tool.id === 'niche-profit-calculator';

  const calculateProfitMetrics = () => {
    const traffic = parseFloat(formData.monthlyTraffic) || 10000;
    const cr = (parseFloat(formData.conversionRate) || 2.0) / 100;
    const aov = parseFloat(formData.productPrice) || 47;

    const monthlyOrders = Math.round(traffic * cr);
    const monthlyRevenue = monthlyOrders * aov;
    const annualRevenue = monthlyRevenue * 12;
    const estimatedPlatformFees = monthlyRevenue * 0.05; // 5% payment/platform fee
    const monthlyNetProfit = monthlyRevenue - estimatedPlatformFees;

    return {
      monthlyOrders,
      monthlyRevenue,
      annualRevenue,
      monthlyNetProfit,
    };
  };

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRun = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      if (isProfitCalc) {
        setResult(calculateProfitMetrics());
      } else {
        const res = await aiService.runTool(tool.id, formData);
        setResult(res);
      }
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Run on mount once
  React.useEffect(() => {
    handleRun();
  }, [tool.id]);

  const handleSaveWorkspace = () => {
    if (!result) return;
    workspaceStorage.saveItem({
      id: `${tool.id}-${Date.now()}`,
      type: 'tool',
      title: tool.name,
      category: tool.category,
      content: JSON.stringify(result, null, 2),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Tool Header Card with Lightweight Vector Visual */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 shadow-xs mb-8">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1">
              {tool.category} Utility
            </span>
            <span className="text-xs text-neutral-400">Estimated execution: {tool.estimatedTime}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            {tool.name}
          </h1>
          <p className="text-sm text-neutral-600 leading-relaxed">
            {tool.description}
          </p>
        </div>

        {/* Lightweight SVG Vector Visual */}
        <div className="w-44 h-28 shrink-0 rounded-xl overflow-hidden shadow-xs border border-neutral-100 bg-neutral-50/50">
          <LightweightVisual type={tool.visualType} />
        </div>
      </div>

      {/* Main Interactive Tool Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Left Column: Form Inputs */}
        <div className="lg:col-span-5 space-y-4">
          <form onSubmit={handleRun} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
              Tool Parameters
            </h2>

            {tool.inputsSchema.map((field) => (
              <div key={field.name}>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {field.label}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    rows={4}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full rounded-xl border border-neutral-300 p-3 text-xs text-neutral-900 focus:border-blue-600 focus:outline-hidden"
                  />
                ) : field.type === 'select' ? (
                  <select
                    value={formData[field.name] || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    className="w-full rounded-xl border border-neutral-300 p-2.5 text-xs text-neutral-900 focus:border-blue-600 focus:outline-hidden"
                  >
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full rounded-xl border border-neutral-300 p-2.5 text-xs text-neutral-900 focus:border-blue-600 focus:outline-hidden"
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-3 text-xs font-bold text-white shadow-sm hover:bg-blue-700 active:scale-98 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Execute {tool.name}</span>
                </>
              )}
            </button>
          </form>

          {/* Related In-Depth Guides (Circular Linking) */}
          {tool.relatedGuides.length > 0 && (
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-emerald-600" /> Recommended Strategic Guides
              </h3>
              <div className="space-y-2">
                {tool.relatedGuides.map((guide, idx) => (
                  <button
                    key={idx}
                    onClick={() => navigate(`/blog/${guide.slug}`)}
                    className="flex w-full items-center justify-between text-left rounded-lg p-2 text-xs font-semibold text-neutral-800 hover:bg-emerald-50/60 hover:text-emerald-900 transition-colors"
                  >
                    <span className="line-clamp-1">{guide.title}</span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 ml-2 text-neutral-400" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Output Results */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm min-h-[380px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Generated Output
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveWorkspace}
                    className="rounded-lg border border-neutral-200 px-2.5 py-1 text-xs font-medium text-neutral-600 hover:bg-neutral-50 transition-colors"
                  >
                    {saved ? 'Saved!' : 'Save Result'}
                  </button>
                </div>
              </div>

              {/* Profit Calculator Output */}
              {isProfitCalc && result && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="rounded-xl bg-emerald-50 p-4 border border-emerald-100">
                      <span className="text-xs font-bold text-emerald-800 uppercase">Monthly Revenue</span>
                      <p className="text-2xl font-extrabold text-emerald-900 mt-1">
                        ${result.monthlyRevenue?.toLocaleString()}
                      </p>
                      <span className="text-[10px] text-emerald-700">({result.monthlyOrders} orders/mo)</span>
                    </div>

                    <div className="rounded-xl bg-blue-50 p-4 border border-blue-100">
                      <span className="text-xs font-bold text-blue-800 uppercase">Annualized Run-Rate</span>
                      <p className="text-2xl font-extrabold text-blue-900 mt-1">
                        ${result.annualRevenue?.toLocaleString()}
                      </p>
                      <span className="text-[10px] text-blue-700">Net after 5% fees: ${result.monthlyNetProfit?.toLocaleString()}/mo</span>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    Based on your input parameters ({formData.monthlyTraffic} monthly visitors at {formData.conversionRate}% conversion rate with ${formData.productPrice} average order value).
                  </p>
                </div>
              )}

              {/* Title Generator Output */}
              {result?.titles && (
                <div className="space-y-2.5">
                  {result.titles.map((t: any, i: number) => (
                    <div key={i} className="rounded-xl border border-neutral-200 p-3 hover:border-blue-300 transition-colors flex items-start justify-between gap-3">
                      <div>
                        <p className="font-bold text-xs sm:text-sm text-neutral-900">{t.title}</p>
                        <div className="flex items-center gap-3 text-[10px] text-neutral-400 mt-1">
                          <span>CTR Rating: <strong className="text-blue-600">{t.ctrScore}</strong></span>
                          <span>•</span>
                          <span>{t.charCount} characters (SERP Safe)</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCopyText(t.title)}
                        className="rounded-lg p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 shrink-0"
                        title="Copy Title"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Meta Description Output */}
              {result?.descriptions && (
                <div className="space-y-3">
                  {result.descriptions.map((d: any, i: number) => (
                    <div key={i} className="rounded-xl border border-neutral-200 p-3.5 hover:border-blue-300 transition-colors">
                      <p className="text-xs text-neutral-800 leading-relaxed font-medium">{d.text}</p>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-100 text-[10px] text-neutral-400">
                        <span>{d.charCount} chars • {d.status} Length</span>
                        <button
                          onClick={() => handleCopyText(d.text)}
                          className="font-bold text-blue-600 hover:underline flex items-center gap-1"
                        >
                          <Copy className="h-3 w-3" /> Copy Snippet
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Business Ideas Output */}
              {result?.ideas && (
                <div className="space-y-4">
                  {result.ideas.map((idea: any, i: number) => (
                    <div key={i} className="rounded-xl border border-neutral-200 p-4 space-y-2 bg-neutral-50/30">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-xs sm:text-sm text-neutral-900">{idea.title}</h4>
                        <span className="rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
                          {idea.estimatedMargin} Margin
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600 leading-relaxed">{idea.concept}</p>
                      <div className="text-[11px] text-neutral-500 pt-1">
                        <strong>Monetization:</strong> {idea.monetization}
                      </div>
                      <div className="text-[11px] text-blue-900 bg-blue-50/70 p-2 rounded-lg font-medium">
                        <strong>Step 1 Action:</strong> {idea.firstStep}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* YouTube Output */}
              {result?.titleHooks && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-neutral-700 uppercase">Suggested Video Hooks</h4>
                  <div className="space-y-1.5">
                    {result.titleHooks.map((h: string, i: number) => (
                      <div key={i} className="rounded-lg bg-neutral-50 p-2.5 text-xs font-semibold text-neutral-900 flex justify-between items-center">
                        <span>{h}</span>
                        <button onClick={() => handleCopyText(h)} className="text-neutral-400 hover:text-neutral-800">
                          <Copy className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <h4 className="text-xs font-bold text-neutral-700 uppercase pt-2">Recommended Video Tags</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {result.tags?.map((t: string, i: number) => (
                      <span key={i} className="rounded-full bg-blue-50 text-blue-800 text-[11px] px-2.5 py-0.5 border border-blue-100">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* UGC Script Output */}
              {result?.hook && (
                <div className="space-y-3 text-xs leading-relaxed">
                  <div className="rounded-xl bg-purple-50 p-3 border border-purple-100">
                    <span className="font-bold text-purple-900 block text-[11px] uppercase mb-1">3-Second Hook (Pattern Interrupt)</span>
                    <p className="whitespace-pre-line text-purple-950 font-medium">{result.hook}</p>
                  </div>
                  <div className="rounded-xl bg-neutral-50 p-3 border border-neutral-200">
                    <span className="font-bold text-neutral-700 block text-[11px] uppercase mb-1">Problem Agitation</span>
                    <p className="whitespace-pre-line text-neutral-800">{result.problem}</p>
                  </div>
                  <div className="rounded-xl bg-emerald-50 p-3 border border-emerald-100">
                    <span className="font-bold text-emerald-900 block text-[11px] uppercase mb-1">Value Solution &amp; CTA</span>
                    <p className="whitespace-pre-line text-emerald-950 font-medium">{result.solution}\n\n{result.callToAction}</p>
                  </div>
                </div>
              )}

              {/* KDP & Etsy Output */}
              {(result?.sevenKeywordBoxes || result?.tags) && (
                <div className="space-y-3">
                  {result.optimizedTitle && (
                    <div className="rounded-xl bg-amber-50/70 p-3 border border-amber-200">
                      <span className="text-[10px] font-bold text-amber-900 uppercase block mb-1">Optimized Listing Title</span>
                      <p className="text-xs font-bold text-neutral-900">{result.optimizedTitle}</p>
                    </div>
                  )}

                  <h4 className="text-xs font-bold text-neutral-700 uppercase">Tags / Keyword Boxes</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(result.sevenKeywordBoxes || result.tags).map((tag: string, i: number) => (
                      <div key={i} className="rounded-lg border border-neutral-200 p-2 text-xs font-semibold text-neutral-800 bg-neutral-50 flex items-center justify-between">
                        <span>{tag}</span>
                        <span className="text-[10px] text-neutral-400 font-normal">{tag.length} chars</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Schema JSON-LD Output */}
              {result?.jsonLdCode && (
                <div className="space-y-2">
                  <pre className="rounded-xl bg-neutral-900 p-4 text-[11px] text-emerald-400 font-mono overflow-x-auto max-h-72">
                    {result.jsonLdCode}
                  </pre>
                  <button
                    onClick={() => handleCopyText(result.jsonLdCode)}
                    className="w-full rounded-xl bg-neutral-900 py-2 text-xs font-bold text-white hover:bg-neutral-800"
                  >
                    Copy JSON-LD Code
                  </button>
                </div>
              )}

              {/* Generic fallback */}
              {result?.output && (
                <div className="rounded-xl bg-neutral-50 p-4 text-xs text-neutral-800 leading-relaxed whitespace-pre-line">
                  {result.output}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Educational SEO Section: How to use, Best practices, FAQ (Section 41) */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 space-y-6">
        <h3 className="text-lg font-bold text-neutral-900">
          How to Maximize Results with {tool.name}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-neutral-600 leading-relaxed">
          <div className="space-y-2">
            <h4 className="font-bold text-neutral-900 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Best Practices &amp; Intent Alignment
            </h4>
            <p>
              Always prioritize specific, descriptive inputs over single-word queries. Include your exact target audience and customer friction points to allow the AI engine to ground suggestions in verifiable search intent.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-neutral-900 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 text-amber-500" /> Common Mistakes to Avoid
            </h4>
            <p>
              Never copy AI outputs blindly without editorial fact-checking. Treat generated outputs as high-fidelity structural drafts that need your personal experience, screenshots, or localized nuances.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
