import React, { useState, useEffect } from 'react';
import { Search, X, Cpu, BookOpen, Layers, Compass, ArrowRight } from 'lucide-react';
import { TOOLS_DATABASE } from '../../data/toolsData';
import { BLOG_POSTS } from '../../data/blogData';
import { AI_SOFTWARE_DATABASE } from '../../data/aiSoftwareData';
import { COMPARISONS_DATABASE } from '../../data/comparisonsData';
import { PROMPTS_DATABASE } from '../../data/promptsData';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  navigate: (route: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose, navigate }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else navigate(''); // toggle via parent
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const term = searchTerm.toLowerCase().trim();

  const filteredTools = TOOLS_DATABASE.filter(
    (t) => t.name.toLowerCase().includes(term) || t.description.toLowerCase().includes(term)
  ).slice(0, 4);

  const filteredArticles = BLOG_POSTS.filter(
    (b) => b.title.toLowerCase().includes(term) || b.description.toLowerCase().includes(term)
  ).slice(0, 4);

  const filteredSoftware = AI_SOFTWARE_DATABASE.filter(
    (s) => s.name.toLowerCase().includes(term) || s.bestFor.toLowerCase().includes(term)
  ).slice(0, 3);

  const filteredComparisons = COMPARISONS_DATABASE.filter(
    (c) => c.title.toLowerCase().includes(term)
  ).slice(0, 2);

  const filteredPrompts = PROMPTS_DATABASE.filter(
    (p) => p.title.toLowerCase().includes(term) || p.purpose.toLowerCase().includes(term)
  ).slice(0, 2);

  const handleSelect = (route: string) => {
    onClose();
    navigate(route);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-neutral-200 overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center border-b border-neutral-200 px-4 py-3.5 bg-neutral-50/50">
          <Search className="h-5 w-5 text-neutral-400 mr-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search all free tools, SEO guides, prompts, and software reviews..."
            autoFocus
            className="w-full bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden"
          />
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Search Results Container */}
        <div className="max-h-[65vh] overflow-y-auto p-4 space-y-4">
          {/* Quick shortcuts if empty */}
          {!term && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">Quick Navigation</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => handleSelect('/tools/keyword-explorer')}
                  className="flex items-center gap-2 p-2.5 rounded-lg border border-neutral-100 hover:bg-blue-50 text-left"
                >
                  <Cpu className="h-4 w-4 text-blue-600" />
                  <div>
                    <span className="font-semibold block text-neutral-900">Keyword Explorer</span>
                    <span className="text-neutral-400 text-[11px]">Free search volume & opportunity</span>
                  </div>
                </button>
                <button
                  onClick={() => handleSelect('/tools/ai-article-writer')}
                  className="flex items-center gap-2 p-2.5 rounded-lg border border-neutral-100 hover:bg-emerald-50 text-left"
                >
                  <BookOpen className="h-4 w-4 text-emerald-600" />
                  <div>
                    <span className="font-semibold block text-neutral-900">AI Article Writer</span>
                    <span className="text-neutral-400 text-[11px]">Google Trends & E-E-A-T builder</span>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Tools Results */}
          {filteredTools.length > 0 && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1.5">
                <Cpu className="h-3.5 w-3.5 text-blue-600" /> Tools ({filteredTools.length})
              </p>
              <div className="space-y-1">
                {filteredTools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => handleSelect(`/tools/${tool.slug}`)}
                    className="flex w-full items-center justify-between rounded-lg p-2 text-left hover:bg-blue-50/70 text-xs transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-neutral-900 block">{tool.name}</span>
                      <span className="text-neutral-500 line-clamp-1">{tool.description}</span>
                    </div>
                    <span className="text-blue-600 text-[10px] font-bold shrink-0 ml-2">Open Tool →</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Articles Results */}
          {filteredArticles.length > 0 && (
            <div className="border-t border-neutral-100 pt-3">
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 text-emerald-600" /> Guides ({filteredArticles.length})
              </p>
              <div className="space-y-1">
                {filteredArticles.map((article) => (
                  <button
                    key={article.id}
                    onClick={() => handleSelect(`/blog/${article.slug}`)}
                    className="flex w-full items-center justify-between rounded-lg p-2 text-left hover:bg-emerald-50/70 text-xs transition-colors"
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

          {/* Comparisons */}
          {filteredComparisons.length > 0 && (
            <div className="border-t border-neutral-100 pt-3">
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1.5">
                <Compass className="h-3.5 w-3.5 text-amber-600" /> Comparisons
              </p>
              <div className="space-y-1">
                {filteredComparisons.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleSelect(`/comparisons/${c.slug}`)}
                    className="flex w-full items-center justify-between rounded-lg p-2 text-left hover:bg-amber-50/70 text-xs transition-colors"
                  >
                    <span className="font-semibold text-neutral-900">{c.title}</span>
                    <span className="text-amber-700 text-[10px] font-bold">Compare →</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {term && filteredTools.length === 0 && filteredArticles.length === 0 && filteredSoftware.length === 0 && (
            <div className="py-8 text-center text-xs text-neutral-400">
              No direct matches found for "{term}". Try searching "keywords", "youtube", "digital products", or browse all tools.
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="border-t border-neutral-200 bg-neutral-50 px-4 py-2.5 flex items-center justify-between text-[11px] text-neutral-400">
          <span>Navigate with mouse or arrow keys</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
