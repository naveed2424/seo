import React, { useState, useEffect, useRef } from 'react';
import { Search, Sparkles, ArrowRight, TrendingUp, FileText, Cpu, Compass, BookOpen } from 'lucide-react';
import { TOOLS_DATABASE } from '../../data/toolsData';
import { BLOG_POSTS } from '../../data/blogData';
import { AI_SOFTWARE_DATABASE } from '../../data/aiSoftwareData';
import { COMPARISONS_DATABASE } from '../../data/comparisonsData';
import { workspaceStorage } from '../../utils/workspaceStorage';

interface UniversalSearchBarProps {
  navigate: (route: string) => void;
  autoFocus?: boolean;
}

export const UniversalSearchBar: React.FC<UniversalSearchBarProps> = ({ navigate, autoFocus = false }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = query.trim().toLowerCase();
    if (!clean) return;

    workspaceStorage.addRecentSearch(query);

    // Intent Recognition Logic
    if (clean.includes('keyword') || clean.includes('serp') || clean.includes('volume') || clean.includes('dog grooming')) {
      navigate(`/tools/keyword-explorer?q=${encodeURIComponent(query)}`);
    } else if (clean.includes('trend') || clean.includes('breakout') || clean.includes('demand')) {
      navigate(`/tools/trends-demand-finder?niche=${encodeURIComponent(query)}`);
    } else if (clean.includes('write') || clean.includes('article') || clean.includes('blog post') || clean.includes('content writer')) {
      navigate(`/tools/ai-article-writer?topic=${encodeURIComponent(query)}`);
    } else if (clean.includes('business idea') || clean.includes('side hustle') || clean.includes('niche')) {
      navigate('/tools/business-idea-generator');
    } else if (clean.includes('youtube') || clean.includes('video script') || clean.includes('shorts')) {
      navigate('/tools/youtube-keyword-tool');
    } else if (clean.includes('etsy') || clean.includes('kdp') || clean.includes('digital product') || clean.includes('printables')) {
      navigate('/tools/etsy-tag-generator');
    } else if (clean.includes('vs') || clean.includes('comparison') || clean.includes('chatgpt') || clean.includes('gemini')) {
      navigate('/comparisons');
    } else if (clean.includes('software') || clean.includes('claude') || clean.includes('semrush') || clean.includes('video generator')) {
      navigate('/ai-tools');
    } else {
      // General tools filter or keyword explorer
      navigate(`/tools?q=${encodeURIComponent(query)}`);
    }
    setIsOpen(false);
  };

  // Autocomplete matching
  const matchingTools = TOOLS_DATABASE.filter(
    (t) => t.name.toLowerCase().includes(query.toLowerCase()) || t.description.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const matchingArticles = BLOG_POSTS.filter(
    (b) => b.title.toLowerCase().includes(query.toLowerCase()) || b.description.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const matchingSoftware = AI_SOFTWARE_DATABASE.filter(
    (s) => s.name.toLowerCase().includes(query.toLowerCase()) || s.bestFor.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 2);

  const hasResults = query.trim().length > 1 && (matchingTools.length > 0 || matchingArticles.length > 0 || matchingSoftware.length > 0);

  const popularSearches = [
    { label: 'AI tools for small business', route: '/ai-tools' },
    { label: 'keyword research', route: '/tools/keyword-explorer' },
    { label: 'start a blog', route: '/blog/build-topical-authority' },
    { label: 'YouTube growth', route: '/tools/youtube-keyword-tool' },
    { label: 'sell digital products', route: '/blog/sell-digital-products-guide' },
    { label: 'automate my business', route: '/tools/automation-workflow-builder' },
  ];

  return (
    <div ref={containerRef} className="relative w-full max-w-3xl mx-auto z-30">
      {/* Search Input Box */}
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="group relative flex items-center rounded-2xl border-2 border-[#4d3625] bg-[#221710]/95 p-2 shadow-2xl backdrop-blur-md transition-all focus-within:border-sky-400 focus-within:shadow-xl focus-within:shadow-sky-500/20">
          <div className="flex h-11 w-11 items-center justify-center text-sky-400 group-focus-within:text-sky-300">
            <Search className="h-5 w-5" />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search AI tools, keywords, business ideas or guides..."
            autoFocus={autoFocus}
            className="w-full bg-transparent px-2 text-sm md:text-base text-white placeholder:text-neutral-400 focus:outline-hidden"
          />

          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-xl bg-sky-400 hover:bg-sky-300 px-5 py-2.5 text-sm font-extrabold text-[#19120d] shadow-md shadow-sky-500/25 active:scale-98 transition-all shrink-0"
          >
            <span>Explore</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && hasResults && (
        <div className="absolute left-0 right-0 top-full mt-2 rounded-2xl border border-neutral-200 bg-white p-3 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150 max-h-96 overflow-y-auto">
          {/* Tools Matches */}
          {matchingTools.length > 0 && (
            <div className="mb-3">
              <span className="px-2 text-[11px] font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <Cpu className="h-3.5 w-3.5 text-blue-600" /> Free Tools
              </span>
              <div className="mt-1 space-y-1">
                {matchingTools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => {
                      setIsOpen(false);
                      navigate(`/tools/${tool.slug}`);
                    }}
                    className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs hover:bg-blue-50/70 transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-neutral-900 block">{tool.name}</span>
                      <span className="text-neutral-500 line-clamp-1">{tool.description}</span>
                    </div>
                    <span className="rounded bg-blue-100 text-blue-800 text-[10px] font-bold px-1.5 py-0.5 shrink-0 ml-2">
                      {tool.badge}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Articles Matches */}
          {matchingArticles.length > 0 && (
            <div className="mb-3 border-t border-neutral-100 pt-2">
              <span className="px-2 text-[11px] font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 text-emerald-600" /> In-Depth Guides
              </span>
              <div className="mt-1 space-y-1">
                {matchingArticles.map((article) => (
                  <button
                    key={article.id}
                    onClick={() => {
                      setIsOpen(false);
                      navigate(`/blog/${article.slug}`);
                    }}
                    className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs hover:bg-emerald-50/70 transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-neutral-900 block">{article.title}</span>
                      <span className="text-neutral-500 line-clamp-1">{article.description}</span>
                    </div>
                    <span className="text-neutral-400 text-[10px] shrink-0 ml-2">{article.readingTime}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Software Directory Matches */}
          {matchingSoftware.length > 0 && (
            <div className="border-t border-neutral-100 pt-2">
              <span className="px-2 text-[11px] font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-violet-600" /> AI Software Reviews
              </span>
              <div className="mt-1 space-y-1">
                {matchingSoftware.map((software) => (
                  <button
                    key={software.id}
                    onClick={() => {
                      setIsOpen(false);
                      navigate('/ai-tools');
                    }}
                    className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs hover:bg-violet-50/70 transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-neutral-900 block">{software.name}</span>
                      <span className="text-neutral-500 line-clamp-1">{software.tagline}</span>
                    </div>
                    <span className="text-violet-600 font-bold text-[10px] shrink-0 ml-2">{software.ratingScore} ★</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Clickable Suggestion Tags (Theme: Brown & Light Blue) */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 text-xs">
        <span className="text-neutral-400 mr-1 font-medium">Try searching:</span>
        {popularSearches.map((tag) => (
          <button
            key={tag.label}
            onClick={() => {
              setQuery(tag.label);
              navigate(tag.route);
            }}
            className="rounded-full border border-[#483323] bg-[#2a1d15]/90 px-3 py-1 text-sky-200 hover:border-sky-400 hover:bg-[#38261b] hover:text-white transition-all shadow-xs"
          >
            "{tag.label}"
          </button>
        ))}
      </div>

      {/* Trust reassurance text */}
      <p className="mt-3 text-center text-xs text-neutral-300">
        Free tools • No signup for core tools • Real-time AI matrix search
      </p>
    </div>
  );
};
