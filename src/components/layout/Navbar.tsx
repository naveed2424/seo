import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Bookmark,
  ChevronDown,
  Menu,
  X,
  Compass,
  TrendingUp,
  Briefcase,
  Layers,
  FileText,
  Cpu,
  Video,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';
import { brandConfig } from '../../config/brand';
import { workspaceStorage } from '../../utils/workspaceStorage';

interface NavbarProps {
  currentRoute: string;
  navigate: (route: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, navigate, onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const savedCount = workspaceStorage.getItems().length;

  const handleNav = (route: string) => {
    setActiveMegaMenu(null);
    setMobileMenuOpen(false);
    navigate(route);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => handleNav('/')}
            className="flex items-center gap-2.5 text-left transition-opacity hover:opacity-90"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-neutral-900">{brandConfig.siteName}</span>
              <span className="ml-1.5 hidden rounded-md bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold text-blue-700 sm:inline">
                GROWTH OS
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-neutral-600">
            {/* AI Tools Mega Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMegaMenu('ai-tools')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button
                onClick={() => handleNav('/tools')}
                className={`flex items-center gap-1 rounded-md px-3 py-2 transition-colors hover:text-neutral-900 ${
                  currentRoute.startsWith('/tools') ? 'text-blue-600 font-semibold' : ''
                }`}
              >
                AI Tools <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              </button>

              {activeMegaMenu === 'ai-tools' && (
                <div className="absolute left-0 top-full w-[480px] rounded-xl border border-neutral-200 bg-white p-4 shadow-xl grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Writing & Content</span>
                    <button
                      onClick={() => handleNav('/tools/ai-article-writer')}
                      className="block w-full text-left rounded-lg p-2 text-xs hover:bg-neutral-50 transition-colors"
                    >
                      <span className="font-semibold text-neutral-900 block">AI Article Writer</span>
                      <span className="text-neutral-500">Long-form E-E-A-T guides</span>
                    </button>
                    <button
                      onClick={() => handleNav('/tools/content-summarizer')}
                      className="block w-full text-left rounded-lg p-2 text-xs hover:bg-neutral-50 transition-colors"
                    >
                      <span className="font-semibold text-neutral-900 block">Content Summarizer</span>
                      <span className="text-neutral-500">Executive takeaways</span>
                    </button>
                    <button
                      onClick={() => handleNav('/tools/ugc-script-generator')}
                      className="block w-full text-left rounded-lg p-2 text-xs hover:bg-neutral-50 transition-colors"
                    >
                      <span className="font-semibold text-neutral-900 block">UGC Video Scripts</span>
                      <span className="text-neutral-500">3-second hooks & retention</span>
                    </button>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">SEO & Growth</span>
                    <button
                      onClick={() => handleNav('/tools/keyword-explorer')}
                      className="block w-full text-left rounded-lg p-2 text-xs hover:bg-blue-50/50 transition-colors"
                    >
                      <span className="font-semibold text-blue-700 block flex items-center justify-between">
                        Keyword Explorer <span className="bg-blue-100 text-blue-800 text-[10px] px-1 rounded">Flagship</span>
                      </span>
                      <span className="text-neutral-500">0-100 Opportunity Score</span>
                    </button>
                    <button
                      onClick={() => handleNav('/tools/trends-demand-finder')}
                      className="block w-full text-left rounded-lg p-2 text-xs hover:bg-neutral-50 transition-colors"
                    >
                      <span className="font-semibold text-neutral-900 block">Google Trends Finder</span>
                      <span className="text-neutral-500">Breakout query velocity</span>
                    </button>
                    <button
                      onClick={() => handleNav('/tools')}
                      className="block w-full text-left rounded-lg p-2 text-xs text-blue-600 font-semibold hover:underline"
                    >
                      View All 40+ Free Tools →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* SEO Dropdown */}
            <button
              onClick={() => handleNav('/tools/keyword-explorer')}
              className={`rounded-md px-3 py-2 transition-colors hover:text-neutral-900 ${
                currentRoute === '/tools/keyword-explorer' ? 'text-blue-600 font-semibold' : ''
              }`}
            >
              SEO Explorer
            </button>

            {/* AI Directory */}
            <button
              onClick={() => handleNav('/ai-tools')}
              className={`rounded-md px-3 py-2 transition-colors hover:text-neutral-900 ${
                currentRoute.startsWith('/ai-tools') ? 'text-blue-600 font-semibold' : ''
              }`}
            >
              AI Directory
            </button>

            {/* Comparisons */}
            <button
              onClick={() => handleNav('/comparisons')}
              className={`rounded-md px-3 py-2 transition-colors hover:text-neutral-900 ${
                currentRoute.startsWith('/comparisons') ? 'text-blue-600 font-semibold' : ''
              }`}
            >
              Comparisons
            </button>

            {/* Blog */}
            <button
              onClick={() => handleNav('/blog')}
              className={`rounded-md px-3 py-2 transition-colors hover:text-neutral-900 ${
                currentRoute.startsWith('/blog') ? 'text-blue-600 font-semibold' : ''
              }`}
            >
              Guides & Blog
            </button>

            {/* Resources & Prompts */}
            <button
              onClick={() => handleNav('/prompts')}
              className={`rounded-md px-3 py-2 transition-colors hover:text-neutral-900 ${
                currentRoute.startsWith('/prompts') ? 'text-blue-600 font-semibold' : ''
              }`}
            >
              Prompts
            </button>

            <button
              onClick={() => handleNav('/resources')}
              className={`rounded-md px-3 py-2 transition-colors hover:text-neutral-900 ${
                currentRoute.startsWith('/resources') ? 'text-blue-600 font-semibold' : ''
              }`}
            >
              Checklists
            </button>
          </nav>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-3">
          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs text-neutral-500 hover:border-neutral-300 hover:bg-neutral-100 transition-colors"
            title="Search anything (CMD+K)"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden rounded bg-white px-1.5 py-0.5 text-[10px] font-semibold text-neutral-400 border border-neutral-200 sm:inline">
              ⌘K
            </kbd>
          </button>

          {/* Workspace Button */}
          <button
            onClick={() => handleNav('/workspace')}
            className="relative flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
            title="My Saved Workspace"
          >
            <Bookmark className="h-3.5 w-3.5 text-indigo-600" />
            <span className="hidden sm:inline">Workspace</span>
            {savedCount > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">
                {savedCount}
              </span>
            )}
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => handleNav('/tools')}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 active:scale-98 transition-all"
          >
            Explore Free Tools
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-neutral-600 hover:text-neutral-900 lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-neutral-200 bg-white px-4 py-4 lg:hidden animate-in slide-in-from-top-2 duration-150 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            <button
              onClick={() => handleNav('/tools')}
              className="flex items-center gap-2 rounded-lg p-2.5 text-left text-neutral-800 bg-neutral-50 hover:bg-blue-50"
            >
              <Cpu className="h-4 w-4 text-blue-600" /> Free Tools
            </button>
            <button
              onClick={() => handleNav('/tools/keyword-explorer')}
              className="flex items-center gap-2 rounded-lg p-2.5 text-left text-neutral-800 bg-neutral-50 hover:bg-blue-50"
            >
              <TrendingUp className="h-4 w-4 text-indigo-600" /> Keyword Explorer
            </button>
            <button
              onClick={() => handleNav('/blog')}
              className="flex items-center gap-2 rounded-lg p-2.5 text-left text-neutral-800 bg-neutral-50 hover:bg-blue-50"
            >
              <FileText className="h-4 w-4 text-emerald-600" /> Guides & Blog
            </button>
            <button
              onClick={() => handleNav('/ai-tools')}
              className="flex items-center gap-2 rounded-lg p-2.5 text-left text-neutral-800 bg-neutral-50 hover:bg-blue-50"
            >
              <Layers className="h-4 w-4 text-violet-600" /> AI Directory
            </button>
            <button
              onClick={() => handleNav('/comparisons')}
              className="flex items-center gap-2 rounded-lg p-2.5 text-left text-neutral-800 bg-neutral-50 hover:bg-blue-50"
            >
              <Compass className="h-4 w-4 text-amber-600" /> Comparisons
            </button>
            <button
              onClick={() => handleNav('/prompts')}
              className="flex items-center gap-2 rounded-lg p-2.5 text-left text-neutral-800 bg-neutral-50 hover:bg-blue-50"
            >
              <Sparkles className="h-4 w-4 text-rose-600" /> Prompt Library
            </button>
          </div>
          <button
            onClick={() => handleNav('/start')}
            className="w-full rounded-lg bg-blue-600 py-2.5 text-center text-sm font-bold text-white shadow-sm"
          >
            Start Here (Find My Tool)
          </button>
        </div>
      )}
    </header>
  );
};
