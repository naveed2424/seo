import React, { useState } from 'react';
import { Sparkles, Copy, Check, Bookmark, ArrowRight } from 'lucide-react';
import { PROMPTS_DATABASE, PromptItem } from '../data/promptsData';
import { workspaceStorage } from '../utils/workspaceStorage';
import confetti from 'canvas-confetti';

interface PromptsPageProps {
  navigate: (route: string) => void;
}

export const PromptsPage: React.FC<PromptsPageProps> = ({ navigate }) => {
  const [selectedCat, setSelectedCat] = useState('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);

  // Maintain variable values for each prompt
  const [variableValues, setVariableValues] = useState<Record<string, Record<string, string>>>(() => {
    const initial: Record<string, Record<string, string>> = {};
    PROMPTS_DATABASE.forEach((p) => {
      initial[p.id] = {};
      p.variables.forEach((v) => {
        initial[p.id][v.name] = v.defaultValue;
      });
    });
    return initial;
  });

  const categories = ['All', 'SEO', 'YouTube', 'Ecommerce', 'Automation'];

  const filtered = PROMPTS_DATABASE.filter(
    (p) => selectedCat === 'All' || p.category === selectedCat
  );

  const handleVarChange = (promptId: string, varName: string, val: string) => {
    setVariableValues((prev) => ({
      ...prev,
      [promptId]: {
        ...(prev[promptId] || {}),
        [varName]: val,
      },
    }));
  };

  const getInterpolatedPrompt = (p: PromptItem) => {
    let text = p.promptTemplate;
    const currentVars = variableValues[p.id] || {};
    p.variables.forEach((v) => {
      const val = currentVars[v.name] || v.defaultValue;
      text = text.replaceAll(`{{${v.name}}}`, val);
    });
    return text;
  };

  const handleCopy = (p: PromptItem) => {
    const text = getInterpolatedPrompt(p);
    navigator.clipboard.writeText(text);
    setCopiedId(p.id);
    confetti({ particleCount: 25, spread: 45, origin: { y: 0.8 } });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSave = (p: PromptItem) => {
    const text = getInterpolatedPrompt(p);
    workspaceStorage.saveItem({
      id: `prompt-${p.id}`,
      type: 'prompt',
      title: p.title,
      category: p.category,
      content: text,
    });
    setSavedId(p.id);
    setTimeout(() => setSavedId(null), 2000);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="rounded-full bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1">
          Production-Grade AI Prompts
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
          Curated AI Prompt Engineering Library
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
          Substantial, battle-tested system prompts. Customize variables in real-time, preview generated outputs, and copy ready-to-run prompts into ChatGPT, Claude, or Gemini.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-1.5 border-b border-neutral-200 pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
              selectedCat === cat
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Prompts Cards */}
      <div className="space-y-8">
        {filtered.map((prompt) => (
          <div
            key={prompt.id}
            className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="rounded-md bg-rose-50 text-rose-800 text-[10px] font-bold px-2 py-0.5">
                  {prompt.category}
                </span>
                <h2 className="text-xl font-bold text-neutral-900 mt-1">{prompt.title}</h2>
                <p className="text-xs text-neutral-500 mt-1">{prompt.purpose}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSave(prompt)}
                  className="rounded-xl border border-neutral-200 px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  {savedId === prompt.id ? 'Saved' : 'Save'}
                </button>
                <button
                  onClick={() => handleCopy(prompt)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-rose-700 active:scale-98 transition-all"
                >
                  {copiedId === prompt.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span>{copiedId === prompt.id ? 'Copied!' : 'Copy Customized Prompt'}</span>
                </button>
              </div>
            </div>

            {/* Variable Inputs */}
            <div className="rounded-2xl border border-neutral-100 bg-neutral-50/70 p-4 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block">
                Interactive Variables (Customize Before Copying):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {prompt.variables.map((v) => (
                  <div key={v.name}>
                    <label className="block text-[11px] font-semibold text-neutral-700 mb-1">
                      {`{{${v.name}}}`}
                    </label>
                    <input
                      type="text"
                      value={variableValues[prompt.id]?.[v.name] || v.defaultValue}
                      onChange={(e) => handleVarChange(prompt.id, v.name, e.target.value)}
                      className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-900 focus:border-rose-500 focus:outline-hidden"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Prompt Code Block */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                Ready-to-Paste System Prompt:
              </span>
              <pre className="rounded-2xl bg-neutral-900 p-5 text-xs text-rose-300 font-mono leading-relaxed whitespace-pre-wrap overflow-x-auto border border-neutral-800">
                {getInterpolatedPrompt(prompt)}
              </pre>
            </div>

            {/* Expected Output Preview & Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/30 p-4">
                <span className="font-bold text-emerald-900 uppercase tracking-wider text-[10px] block mb-1">
                  Expected Output Preview:
                </span>
                <p className="text-emerald-950 leading-relaxed font-medium whitespace-pre-line">
                  {prompt.exampleOutput}
                </p>
              </div>

              <div className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-4 flex flex-col justify-between">
                <div>
                  <span className="font-bold text-neutral-700 uppercase tracking-wider text-[10px] block mb-1">
                    Pro Prompting Nuance:
                  </span>
                  <p className="text-neutral-600 leading-relaxed">{prompt.tips}</p>
                </div>
                {prompt.relatedToolSlug && (
                  <button
                    onClick={() => navigate(`/tools/${prompt.relatedToolSlug}`)}
                    className="mt-3 text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    Use Related Free Tool <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
