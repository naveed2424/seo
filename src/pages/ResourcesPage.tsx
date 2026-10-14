import React, { useState } from 'react';
import { FileCheck, Download, Check, Sparkles } from 'lucide-react';
import { RESOURCES_DATABASE, ResourceItem } from '../data/resourcesData';
import confetti from 'canvas-confetti';

export const ResourcesPage: React.FC = () => {
  // Store checked state for each checklist item
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (key: string) => {
    setCheckedItems((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      if (updated[key]) {
        confetti({ particleCount: 15, spread: 35, origin: { y: 0.8 } });
      }
      return updated;
    });
  };

  const handleDownloadChecklist = (res: ResourceItem) => {
    const content = `# ${res.title}\n\n${res.description}\n\n## Checklist Items\n${res.items.map((i, idx) => `- [ ] ${i}`).join('\n')}\n\n*Downloaded from RankPulse (rankpulse.io)*`;
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${res.id}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="rounded-full bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1">
          Operational Assets &amp; Checklists
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
          Free Launch Templates &amp; SEO Checklists
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
          Interactive checklists to audit technical SEO, validate digital products, and structure high-retention content. Check off items directly in the browser or export to Markdown.
        </p>
      </div>

      {/* Checklists List */}
      <div className="space-y-8">
        {RESOURCES_DATABASE.map((resource) => {
          const completedCount = resource.items.filter(
            (_, i) => checkedItems[`${resource.id}-${i}`]
          ).length;
          const progressPercent = Math.round((completedCount / resource.items.length) * 100);

          return (
            <div
              key={resource.id}
              className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-blue-50 text-blue-800 text-[10px] font-bold px-2 py-0.5">
                      {resource.category}
                    </span>
                    <span className="text-neutral-400 text-xs">•</span>
                    <span className="text-xs font-semibold text-neutral-500">{resource.badge}</span>
                  </div>
                  <h2 className="text-xl font-bold text-neutral-900 mt-1">{resource.title}</h2>
                  <p className="text-xs text-neutral-500 mt-1">{resource.description}</p>
                </div>

                <button
                  onClick={() => handleDownloadChecklist(resource)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 px-3.5 py-2 text-xs font-bold text-neutral-700 hover:bg-neutral-50 shrink-0 shadow-xs"
                >
                  <Download className="h-4 w-4" />
                  <span>Download .MD</span>
                </button>
              </div>

              {/* Live Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-neutral-600">
                  <span>Progress ({completedCount} of {resource.items.length} completed)</span>
                  <span className="text-blue-600">{progressPercent}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Checklist Items */}
              <div className="space-y-2 pt-2">
                {resource.items.map((item, idx) => {
                  const key = `${resource.id}-${idx}`;
                  const isChecked = !!checkedItems[key];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleCheck(key)}
                      className={`flex items-start gap-3 rounded-xl border p-3 cursor-pointer transition-all ${
                        isChecked
                          ? 'border-emerald-300 bg-emerald-50/50 text-emerald-950 line-through opacity-80'
                          : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/60 text-neutral-800'
                      }`}
                    >
                      <div
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border mt-0.5 ${
                          isChecked
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-neutral-300 bg-white'
                        }`}
                      >
                        {isChecked && <Check className="h-3.5 w-3.5" />}
                      </div>
                      <span className="text-xs font-medium leading-relaxed">{item}</span>
                    </div>
                  );
                })}
              </div>

              {/* Tip callout */}
              <div className="rounded-xl bg-blue-50/50 p-4 border border-blue-100 text-xs text-blue-900">
                <strong>Editorial Pro Tip:</strong> {resource.tips}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
