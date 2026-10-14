import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, ArrowRight, Search, ShieldCheck } from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../data/blogData';
import { AUTHORS_DATABASE } from '../data/authorsData';
import { LightweightVisual } from '../components/common/LightweightVisual';

interface BlogIndexPageProps {
  navigate: (route: string) => void;
}

export const BlogIndexPage: React.FC<BlogIndexPageProps> = ({ navigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const pillars = [
    'All',
    'AI Tools',
    'SEO & Traffic',
    'Online Business',
    'Make Money Online',
    'Creator Growth',
    'Automation',
  ];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesQuery =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.primaryKeyword.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      {/* Blog Hub Header */}
      <div className="max-w-3xl space-y-3">
        <span className="rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1">
          Editorial &amp; Research Hub
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
          Practical Growth Blueprints &amp; Guides
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
          Not another generic AI news blog. Every piece is structured with Quick Answers, Key Takeaways, verified author credentials, and circular links to our free tools.
        </p>
      </div>

      {/* 6 Topical Pillars Navigation */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-neutral-200 pb-6">
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {pillars.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50 hover:border-neutral-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides by topic..."
            className="w-full rounded-xl border border-neutral-300 bg-white pl-9 pr-3 py-2 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-emerald-600 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Featured / Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => {
          const author = AUTHORS_DATABASE[post.authorId] || Object.values(AUTHORS_DATABASE)[0];
          return (
            <article
              key={post.id}
              onClick={() => navigate(`/blog/${post.slug}`)}
              className="group cursor-pointer rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Lightweight Vector Visual (0-byte network fetch) */}
                <div className="w-full h-40 rounded-xl overflow-hidden mb-4 border border-neutral-100 bg-neutral-50/50">
                  <LightweightVisual type={post.visualType} />
                </div>

                <div className="flex items-center gap-2 text-xs mb-2">
                  <span className="rounded-md bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 text-[10px]">
                    {post.category}
                  </span>
                  <span className="text-neutral-400">•</span>
                  <span className="text-neutral-500 text-[11px] flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {post.readingTime}
                  </span>
                </div>

                <h2 className="font-extrabold text-base text-neutral-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-xs text-neutral-500 mt-2 line-clamp-2 leading-relaxed">
                  {post.description}
                </p>
              </div>

              {/* Author bar and CTA */}
              <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <img
                    src={author.avatarUrl}
                    alt={author.name}
                    className="h-6 w-6 rounded-full object-cover border border-neutral-200"
                  />
                  <span className="font-semibold text-neutral-700 text-[11px]">{author.name}</span>
                </div>

                <span className="font-bold text-emerald-600 flex items-center gap-1 group-hover:underline">
                  Read <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
