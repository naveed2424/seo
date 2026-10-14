import React, { useState } from 'react';
import { Search, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { TOOLS_DATABASE, ToolItem } from '../data/toolsData';
import { LightweightVisual } from '../components/common/LightweightVisual';

interface ToolsDirectoryPageProps {
  navigate: (route: string) => void;
  initialQuery?: string;
}

export const ToolsDirectoryPage: React.FC<ToolsDirectoryPageProps> = ({ navigate, initialQuery = '' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const categories = [
    'All',
    'SEO',
    'AI Writing',
    'Business',
    'YouTube',
    'Creator',
    'Ecommerce',
    'Automation',
  ];

  const filteredTools = TOOLS_DATABASE.filter((tool) => {
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    const matchesQuery =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.primaryKeyword.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      {/* Directory Header */}
      <div className="max-w-3xl space-y-3">
        <span className="rounded-full bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1">
          40+ Built-In Utilities
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
          Free AI &amp; SEO Tools
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
          Practical tools to research, create, optimize and grow — without complicated software. Zero paywalls, zero mandatory account signups.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-neutral-200 pb-6">
        {/* Categories Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50 hover:border-neutral-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter tools by keyword..."
            className="w-full rounded-xl border border-neutral-300 bg-white pl-9 pr-3 py-2 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-blue-600 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Tools Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            onClick={() => navigate(`/tools/${tool.slug}`)}
            className="group cursor-pointer rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
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

              {/* Lightweight vector micro-illustration */}
              <div className="w-full h-32 rounded-xl overflow-hidden mb-4 border border-neutral-100 bg-neutral-50/50">
                <LightweightVisual type={tool.visualType} />
              </div>

              <h3 className="font-extrabold text-base text-neutral-900 group-hover:text-blue-600 transition-colors">
                {tool.name}
              </h3>
              <p className="text-xs text-neutral-500 mt-1.5 line-clamp-2 leading-relaxed">
                {tool.description}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-blue-600">
              <span>Use Free Tool</span>
              <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-16 text-neutral-500">
          <p className="text-sm font-semibold">No tools found matching "{searchQuery}".</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-2 text-xs text-blue-600 font-bold hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};
