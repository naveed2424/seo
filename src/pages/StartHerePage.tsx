import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, TrendingUp, Cpu, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

interface StartHerePageProps {
  navigate: (route: string) => void;
}

export const StartHerePage: React.FC<StartHerePageProps> = ({ navigate }) => {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const goals = [
    {
      id: 'traffic',
      title: 'Get More Website Traffic',
      desc: 'Rank on Page 1 of Google with low-competition, high-intent keywords.',
      tools: [
        { name: 'Keyword Explorer & Opportunity Radar', slug: 'keyword-explorer', type: 'Flagship Tool' },
        { name: 'SEO Title & SERP CTR Optimizer', slug: 'seo-title-generator', type: 'CTR Utility' },
      ],
      guides: [
        { title: 'How to Find Low-Competition Keywords with High Commercial Intent', slug: 'find-low-competition-keywords' },
        { title: 'How to Build Topical Authority with Topic Clusters', slug: 'build-topical-authority' },
      ],
    },
    {
      id: 'digital-products',
      title: 'Sell Digital Products',
      desc: 'Create and launch high-margin printables, Notion templates, and spreadsheets without an audience.',
      tools: [
        { name: 'Etsy 13-Tag & Title SEO Optimizer', slug: 'etsy-tag-generator', type: 'Ecommerce' },
        { name: 'Digital Product Profit & Traffic Calculator', slug: 'profit-calculator', type: 'Financial' },
      ],
      guides: [
        { title: 'The Ultimate Guide to Selling Digital Products Without An Audience', slug: 'sell-digital-products-guide' },
      ],
    },
    {
      id: 'automation',
      title: 'Automate My Business',
      desc: 'Cut 15+ weekly hours of manual tasks with AI agents, webhooks, and Make.com.',
      tools: [
        { name: 'AI Agent & No-Code Workflow Blueprint', slug: 'automation-workflow-builder', type: 'Automation' },
        { name: 'Content Summarizer & Key Takeaways Generator', slug: 'content-summarizer', type: 'Writing' },
      ],
      guides: [
        { title: 'AI Automation for Small Businesses: 7 High-ROI Workflows', slug: 'ai-automation-small-business' },
      ],
    },
    {
      id: 'youtube',
      title: 'Grow a YouTube Channel',
      desc: 'Create search-driven tutorials and faceless authority videos that compound views for years.',
      tools: [
        { name: 'YouTube Keyword & Tag Optimizer', slug: 'youtube-keyword-tool', type: 'YouTube' },
        { name: 'UGC & Video Hook Script Generator', slug: 'ugc-script-generator', type: 'Scripting' },
      ],
      guides: [
        { title: 'YouTube Keyword Research: Video Ideas with Compounding Views', slug: 'youtube-keyword-research' },
      ],
    },
    {
      id: 'content',
      title: 'Create Content Faster',
      desc: 'Draft comprehensive, E-E-A-T compliant articles with zero generic fluff.',
      tools: [
        { name: 'AI Article Writer & Trends Searcher', slug: 'ai-article-writer', type: 'Flagship' },
        { name: 'Schema.org JSON-LD Markup Generator', slug: 'schema-generator', type: 'SEO' },
      ],
      guides: [
        { title: 'SEO Checklist for New Websites: From Day 0 to 1,000 Visitors', slug: 'find-low-competition-keywords' },
      ],
    },
  ];

  const activeData = goals.find((g) => g.id === selectedGoal);

  const handleSelectGoal = (id: string) => {
    setSelectedGoal(id);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="rounded-full bg-blue-100 text-blue-800 text-xs font-bold px-3.5 py-1">
          Interactive Personalized Navigator
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
          What are you trying to accomplish?
        </h1>
        <p className="text-sm text-neutral-600 leading-relaxed">
          Select your primary focus area below. We will immediately curate the exact free tools and strategic blueprints you need to execute.
        </p>
      </div>

      {/* Goal Cards Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {goals.map((goal) => {
          const isSelected = selectedGoal === goal.id;
          return (
            <div
              key={goal.id}
              onClick={() => handleSelectGoal(goal.id)}
              className={`cursor-pointer rounded-2xl border p-5 transition-all text-left flex flex-col justify-between ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-600 shadow-md'
                  : 'border-neutral-200 bg-white hover:border-blue-300 hover:shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-extrabold text-base text-neutral-900">{goal.title}</h3>
                  {isSelected && <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0" />}
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed">{goal.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-blue-600">
                <span>{isSelected ? 'Selected' : 'Select Path'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Tailored Path Output */}
      {activeData && (
        <div className="rounded-3xl border border-blue-200 bg-white p-6 sm:p-10 shadow-sm space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Your Recommended Path</span>
            <h2 className="text-2xl font-extrabold text-neutral-900 mt-1">
              Next Steps for: {activeData.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recommended Free Tools */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Step 1: Execute with Free Tools
              </h3>
              <div className="space-y-2">
                {activeData.tools.map((t) => (
                  <div
                    key={t.slug}
                    onClick={() => navigate(`/tools/${t.slug}`)}
                    className="cursor-pointer rounded-xl border border-neutral-200 p-4 hover:border-blue-400 hover:bg-blue-50/40 transition-all flex items-center justify-between"
                  >
                    <div>
                      <span className="rounded bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5">
                        {t.type}
                      </span>
                      <p className="font-bold text-xs sm:text-sm text-neutral-900 mt-1">{t.name}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-blue-600 shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Blueprints */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Step 2: Read Foundation Guides
              </h3>
              <div className="space-y-2">
                {activeData.guides.map((g) => (
                  <div
                    key={g.slug}
                    onClick={() => navigate(`/blog/${g.slug}`)}
                    className="cursor-pointer rounded-xl border border-neutral-200 p-4 hover:border-emerald-400 hover:bg-emerald-50/40 transition-all flex items-center justify-between"
                  >
                    <p className="font-bold text-xs sm:text-sm text-neutral-900 leading-snug">{g.title}</p>
                    <ArrowRight className="h-4 w-4 text-emerald-600 shrink-0 ml-2" />
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
