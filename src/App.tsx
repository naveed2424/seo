/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { GlobalSearchModal } from './components/search/GlobalSearchModal';
import { CookieConsent } from './components/common/CookieConsent';

// Pages
import { HomePage } from './pages/HomePage';
import { ToolsDirectoryPage } from './pages/ToolsDirectoryPage';
import { KeywordExplorerView } from './components/tools/KeywordExplorerView';
import { AIArticleWriterView } from './components/tools/AIArticleWriterView';
import { GenericToolRunner } from './components/tools/GenericToolRunner';
import { BlogIndexPage } from './pages/BlogIndexPage';
import { ArticleView } from './components/blog/ArticleView';
import { AISoftwareDirectoryPage } from './pages/AISoftwareDirectoryPage';
import { ComparisonsPage } from './pages/ComparisonsPage';
import { PromptsPage } from './pages/PromptsPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ResearchPage } from './pages/ResearchPage';
import { WorkspacePage } from './pages/WorkspacePage';
import { StartHerePage } from './pages/StartHerePage';
import { TrustPage } from './pages/TrustPages';

// Data
import { TOOLS_DATABASE } from './data/toolsData';
import { BLOG_POSTS } from './data/blogData';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Sync route with browser history
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (route: string) => {
    if (!route) return;
    window.history.pushState({}, '', route);
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Parse path & params
  const [pathname, searchParamsStr] = currentRoute.split('?');
  const searchParams = new URLSearchParams(searchParamsStr || '');

  // Render view
  const renderCurrentView = () => {
    // 1. Homepage
    if (pathname === '/' || pathname === '') {
      return <HomePage navigate={navigate} />;
    }

    // 2. Start Here Navigator
    if (pathname === '/start' || pathname === '/find-tool') {
      return <StartHerePage navigate={navigate} />;
    }

    // 3. Flagship Tools
    if (pathname === '/tools/keyword-explorer') {
      const q = searchParams.get('q') || 'AI tools for creators';
      return <KeywordExplorerView initialKeyword={q} navigate={navigate} />;
    }

    if (pathname === '/tools/ai-article-writer') {
      const topic = searchParams.get('topic') || '10 High-Demand Digital Products to Sell on Etsy in 2026';
      return <AIArticleWriterView initialTopic={topic} navigate={navigate} />;
    }

    // 4. Tools Directory
    if (pathname === '/tools' || pathname === '/tools/') {
      const q = searchParams.get('q') || '';
      return <ToolsDirectoryPage navigate={navigate} initialQuery={q} />;
    }

    // 5. Specific Individual Tool
    if (pathname.startsWith('/tools/')) {
      const slug = pathname.replace('/tools/', '').replace(/\/$/, '');
      const tool = TOOLS_DATABASE.find((t) => t.slug === slug);
      if (tool) {
        return <GenericToolRunner tool={tool} navigate={navigate} />;
      }
      return <ToolsDirectoryPage navigate={navigate} />;
    }

    // 6. Blog & Specific Guides
    if (pathname === '/blog' || pathname === '/blog/') {
      return <BlogIndexPage navigate={navigate} />;
    }

    if (pathname.startsWith('/blog/')) {
      const slug = pathname.replace('/blog/', '').replace(/\/$/, '');
      const post = BLOG_POSTS.find((p) => p.slug === slug);
      if (post) {
        return <ArticleView post={post} navigate={navigate} />;
      }
      return <BlogIndexPage navigate={navigate} />;
    }

    // 7. Third-Party Software Directory
    if (pathname === '/ai-tools' || pathname === '/ai-tools/') {
      return <AISoftwareDirectoryPage />;
    }

    // 8. Comparisons
    if (pathname.startsWith('/comparisons')) {
      return <ComparisonsPage navigate={navigate} />;
    }

    // 9. Prompts
    if (pathname === '/prompts' || pathname === '/prompts/') {
      return <PromptsPage navigate={navigate} />;
    }

    // 10. Resources & Checklists
    if (pathname === '/resources' || pathname === '/resources/') {
      return <ResourcesPage />;
    }

    // 11. Research & Statistics
    if (pathname === '/research' || pathname === '/statistics') {
      return <ResearchPage />;
    }

    // 12. Workspace
    if (pathname === '/workspace' || pathname === '/workspace/') {
      return <WorkspacePage navigate={navigate} />;
    }

    // 13. Trust & E-E-A-T Compliance Pages
    if (pathname === '/about') return <TrustPage pageType="about" navigate={navigate} />;
    if (pathname === '/authors') return <TrustPage pageType="authors" navigate={navigate} />;
    if (pathname === '/editorial-policy') return <TrustPage pageType="editorial-policy" navigate={navigate} />;
    if (pathname === '/review-policy') return <TrustPage pageType="review-policy" navigate={navigate} />;
    if (pathname === '/affiliate-disclosure') return <TrustPage pageType="affiliate-disclosure" navigate={navigate} />;
    if (pathname === '/privacy') return <TrustPage pageType="privacy" navigate={navigate} />;
    if (pathname === '/terms') return <TrustPage pageType="terms" navigate={navigate} />;
    if (pathname === '/contact') return <TrustPage pageType="contact" navigate={navigate} />;

    // Fallback: 404 / Home
    return (
      <div className="mx-auto max-w-xl py-24 text-center space-y-4 px-4">
        <h2 className="text-3xl font-extrabold text-neutral-900">Page Not Found</h2>
        <p className="text-sm text-neutral-500">
          The page or tool you were looking for has moved or does not exist.
        </p>
        <button
          onClick={() => navigate('/')}
          className="rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-blue-700"
        >
          Return to Growth Engine
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa] selection:bg-blue-600 selection:text-white">
      {/* Global Navigation */}
      <Navbar
        currentRoute={currentRoute}
        navigate={navigate}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Global Search Modal (CMD+K) */}
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        navigate={navigate}
      />

      {/* GDPR Privacy Consent */}
      <CookieConsent />

      {/* Global Footer */}
      <Footer navigate={navigate} />
    </div>
  );
}
