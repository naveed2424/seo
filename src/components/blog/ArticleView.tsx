import React from 'react';
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Share2,
  Bookmark,
} from 'lucide-react';
import { BlogPost } from '../../data/blogData';
import { AUTHORS_DATABASE } from '../../data/authorsData';
import { TOOLS_DATABASE } from '../../data/toolsData';
import { BLOG_POSTS } from '../../data/blogData';
import { LightweightVisual } from '../common/LightweightVisual';
import { workspaceStorage } from '../../utils/workspaceStorage';

interface ArticleViewProps {
  post: BlogPost;
  navigate: (route: string) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({ post, navigate }) => {
  const author = AUTHORS_DATABASE[post.authorId] || Object.values(AUTHORS_DATABASE)[0];
  const relatedTools = TOOLS_DATABASE.filter((t) => post.relatedToolSlugs.includes(t.slug));
  const relatedPosts = BLOG_POSTS.filter((b) => post.relatedPostSlugs?.includes(b.slug));

  const handleSaveArticle = () => {
    workspaceStorage.saveItem({
      id: `saved-article-${post.id}`,
      type: 'article-draft',
      title: post.title,
      category: post.category,
      content: post.quickAnswer,
    });
    alert('Article saved to your personal workspace!');
  };

  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Schema.org Article Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.description,
            datePublished: post.publishedDate,
            dateModified: post.updatedDate,
            author: {
              '@type': 'Person',
              name: author.name,
              jobTitle: author.role,
            },
            publisher: {
              '@type': 'Organization',
              name: 'RankPulse',
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://rankpulse.io/blog/${post.slug}`,
            },
          }),
        }}
      />

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-neutral-400 mb-6">
        <button onClick={() => navigate('/')} className="hover:text-neutral-700">
          Home
        </button>
        <span>/</span>
        <button onClick={() => navigate('/blog')} className="hover:text-neutral-700">
          Blog
        </button>
        <span>/</span>
        <span className="text-neutral-700 font-medium truncate">{post.category}</span>
      </nav>

      {/* Article Header */}
      <header className="space-y-4 mb-8">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-blue-100 text-blue-800 font-bold px-3 py-1">
            {post.category}
          </span>
          <span className="text-neutral-400">•</span>
          <span className="text-neutral-500 font-medium">{post.subcategory}</span>
          <span className="text-neutral-400">•</span>
          <span className="flex items-center gap-1 text-neutral-500">
            <Clock className="h-3.5 w-3.5" /> {post.readingTime}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-base text-neutral-600 leading-relaxed max-w-3xl">
          {post.description}
        </p>

        {/* Author & Verification Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-b border-neutral-200/80 py-3.5 text-xs">
          <div className="flex items-center gap-3">
            <img
              src={author.avatarUrl}
              alt={author.name}
              className="h-9 w-9 rounded-full object-cover border border-neutral-200"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-neutral-900">{author.name}</span>
                <span title="Verified Author">
                  <ShieldCheck className="h-4 w-4 text-blue-600" />
                </span>
              </div>
              <span className="text-neutral-500 text-[11px]">{author.role}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-neutral-500 text-[11px]">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> Updated: {post.updatedDate}
            </span>
            <button
              onClick={handleSaveArticle}
              className="flex items-center gap-1 font-semibold text-neutral-700 hover:text-blue-600"
            >
              <Bookmark className="h-3.5 w-3.5" /> Save
            </button>
          </div>
        </div>
      </header>

      {/* Lightweight Vector Feature Graphic (Zero Bloat, High-Speed Loading) */}
      <div className="w-full h-56 sm:h-72 rounded-2xl overflow-hidden border border-neutral-200/90 shadow-xs mb-8 bg-neutral-50">
        <LightweightVisual type={post.visualType} className="w-full h-full" />
      </div>

      {/* QUICK ANSWER COMPONENT (Prompt Section 30) */}
      <section className="rounded-2xl border-2 border-blue-200/80 bg-blue-50/40 p-6 mb-8">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="h-4 w-4 text-blue-600" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-900">
            Quick Answer (Direct Summary)
          </h2>
        </div>
        <p className="text-sm text-neutral-800 leading-relaxed font-medium">
          {post.quickAnswer}
        </p>
      </section>

      {/* KEY TAKEAWAYS (Prompt Section 31) */}
      <section className="rounded-2xl border border-emerald-200 bg-emerald-50/30 p-6 mb-8">
        <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-3 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Key Takeaways
        </h2>
        <ul className="space-y-2 text-xs sm:text-sm text-emerald-950 font-medium">
          {post.keyTakeaways.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="text-emerald-600 font-bold mt-0.5">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Table of Contents */}
      {post.tableOfContents.length > 0 && (
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50/70 p-5 mb-8">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
            In This Guide
          </h3>
          <ul className="space-y-1.5 text-xs font-medium">
            {post.tableOfContents.map((toc) => (
              <li key={toc.id}>
                <a
                  href={`#${toc.id}`}
                  className="text-blue-600 hover:text-blue-800 hover:underline block py-0.5"
                >
                  {toc.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Content Markdown */}
      <div className="prose prose-neutral max-w-none text-sm sm:text-base leading-relaxed text-neutral-800 whitespace-pre-line mb-12">
        {post.contentMarkdown}
      </div>

      {/* Related Free Tools: Circular Internal Backlinks (Section 42) */}
      {relatedTools.length > 0 && (
        <section className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-6 sm:p-8 mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
                Put Theory Into Practice
              </span>
              <h3 className="text-lg font-bold text-neutral-900">
                Related Free Interactive Tools
              </h3>
            </div>
            <span className="text-xs text-blue-600 font-semibold hidden sm:inline">100% Free • No Signup</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedTools.map((tool) => (
              <div
                key={tool.id}
                onClick={() => navigate(`/tools/${tool.slug}`)}
                className="cursor-pointer rounded-xl border border-neutral-200 bg-white p-4 shadow-xs hover:border-blue-400 hover:shadow-md transition-all flex items-start justify-between gap-3"
              >
                <div>
                  <span className="rounded bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5">
                    {tool.category}
                  </span>
                  <h4 className="font-bold text-neutral-900 text-sm mt-1.5">{tool.name}</h4>
                  <p className="text-xs text-neutral-500 line-clamp-2 mt-1">{tool.description}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-blue-600 shrink-0 mt-2" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ Accordion Section with Schema Validation */}
      {post.faqs.length > 0 && (
        <section className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 mb-10 space-y-4">
          <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-blue-600" />
            Frequently Asked Questions
          </h3>

          <div className="space-y-3">
            {post.faqs.map((faq, idx) => (
              <div key={idx} className="rounded-xl border border-neutral-200 p-4 bg-neutral-50/40">
                <h4 className="text-xs sm:text-sm font-bold text-neutral-900">{faq.question}</h4>
                <p className="text-xs sm:text-sm text-neutral-600 mt-1.5 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Sourced Primary Citations (Section 46) */}
      {post.sources.length > 0 && (
        <section className="rounded-xl border border-neutral-200 bg-neutral-50/70 p-5 mb-10">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
            Verified Primary Sources &amp; References
          </h4>
          <ul className="space-y-2 text-xs">
            {post.sources.map((src, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-neutral-400 font-mono">[{idx + 1}]</span>
                <div>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-blue-600 hover:underline inline-flex items-center gap-1"
                  >
                    {src.name} <ExternalLink className="h-3 w-3" />
                  </a>
                  <p className="text-neutral-500 text-[11px] mt-0.5">{src.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Author Bio Box (Section 45) */}
      <footer className="rounded-2xl border border-neutral-200 bg-white p-6 flex flex-col sm:flex-row items-start gap-4">
        <img
          src={author.avatarUrl}
          alt={author.name}
          className="h-16 w-16 rounded-full object-cover border border-neutral-200 shrink-0"
        />
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <h4 className="text-base font-bold text-neutral-900">{author.name}</h4>
            <span className="text-xs text-neutral-500">({author.role})</span>
          </div>
          <p className="text-xs text-neutral-600 leading-relaxed">{author.bio}</p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {author.expertise.map((exp) => (
              <span key={exp} className="rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-semibold text-neutral-600">
                {exp}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </article>
  );
};
