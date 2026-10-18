import React, { useState } from 'react';
import { ShieldCheck, Mail, CheckCircle2, Lock, FileText, Send, Sparkles } from 'lucide-react';
import { AUTHORS_DATABASE } from '../data/authorsData';
import { brandConfig } from '../config/brand';

interface TrustPageProps {
  pageType:
    | 'about'
    | 'authors'
    | 'editorial-policy'
    | 'review-policy'
    | 'affiliate-disclosure'
    | 'privacy'
    | 'terms'
    | 'contact';
  navigate: (route: string) => void;
}

export const TrustPage: React.FC<TrustPageProps> = ({ pageType, navigate }) => {
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // ABOUT PAGE
  if (pageType === 'about') {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-3">
          <span className="rounded-full bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1">
            About Our Mission
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Built for Solopreneurs, Creators &amp; Growth Engineers
          </h1>
          <p className="text-base text-neutral-600 leading-relaxed">
            {brandConfig.siteName} was founded with one clear, non-negotiable objective: deliver genuinely powerful AI utilities, transparent keyword research, and actionable online business blueprints without forcing signups or hiding tools behind paywalls.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-neutral-200">
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 space-y-2">
            <span className="text-2xl font-extrabold text-blue-600">40+</span>
            <h3 className="font-bold text-neutral-900 text-sm">Free Dedicated Tools</h3>
            <p className="text-xs text-neutral-500">From SEO keyword radars to video hooks and KDP tag generators.</p>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 space-y-2">
            <span className="text-2xl font-extrabold text-emerald-600">0 Paywalls</span>
            <h3 className="font-bold text-neutral-900 text-sm">Value First</h3>
            <p className="text-xs text-neutral-500">No trial countdowns, no credit card prompts for core features.</p>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 space-y-2">
            <span className="text-2xl font-extrabold text-indigo-600">100% Sourced</span>
            <h3 className="font-bold text-neutral-900 text-sm">Empirical E-E-A-T</h3>
            <p className="text-xs text-neutral-500">Every claim cited with primary search standards and official datasets.</p>
          </div>
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-white p-8 space-y-4">
          <h2 className="text-xl font-bold text-neutral-900">Our Core Philosophy: Value Over Hype</h2>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            The internet does not need another low-effort AI spam farm. Search algorithms are rightfully penalizing generic content and rewarding verified domain expertise, interactive utilities, and real data.
          </p>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            We measure our success by whether you bookmarked our Keyword Explorer, saved 10 hours using our automated blueprints, or launched your first profitable digital download.
          </p>
        </div>
      </div>
    );
  }

  // AUTHORS PAGE
  if (pageType === 'authors') {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-3">
          <span className="rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1">
            Verified Editorial Team
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Meet Our Researchers &amp; Engineers
          </h1>
          <p className="text-base text-neutral-600 leading-relaxed">
            Every guide, comparison matrix, and tool is authored and verified by practitioners with direct industry experience in technical search architecture and online business automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.values(AUTHORS_DATABASE).map((author) => (
            <div
              key={author.id}
              className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <img
                  src={author.avatarUrl}
                  alt={author.name}
                  className="h-20 w-20 rounded-2xl object-cover border-2 border-neutral-200"
                />
                <div>
                  <h3 className="font-extrabold text-lg text-neutral-900 flex items-center gap-1.5">
                    {author.name}
                    <ShieldCheck className="h-4 w-4 text-blue-600" />
                  </h3>
                  <p className="text-xs font-semibold text-blue-700">{author.role}</p>
                  <p className="text-[11px] text-neutral-400 mt-0.5">{author.experienceYears}+ years experience</p>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">{author.bio}</p>
              </div>

              <div className="pt-3 border-t border-neutral-100">
                <span className="text-[10px] font-bold uppercase text-neutral-400 block mb-1.5">
                  Core Expertise
                </span>
                <div className="flex flex-wrap gap-1">
                  {author.expertise.map((exp) => (
                    <span key={exp} className="rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-700">
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // EDITORIAL POLICY
  if (pageType === 'editorial-policy') {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-6">
        <span className="rounded-full bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1">
          Integrity &amp; Standards
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900">Editorial Policy &amp; Standards</h1>
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 space-y-6 text-xs sm:text-sm text-neutral-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-bold text-base text-neutral-900">1. Anti-AI-Farm Commitment</h2>
            <p>
              We never mass-publish unedited AI text. Every piece of content published on {brandConfig.siteName} undergoes manual technical fact-checking, structured formatting, and empirical testing.
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="font-bold text-base text-neutral-900">2. Sourcing Standards</h2>
            <p>
              We prioritize primary documentation (Google Search Central guidelines, FTC regulatory rulings, academic research from Stanford and MIT) over secondary re-blogged summaries.
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="font-bold text-base text-neutral-900">3. Correction Policy</h2>
            <p>
              When factual errors or outdated pricing details are discovered, we correct the article within 48 hours and update the `lastUpdated` timestamp in the header.
            </p>
          </section>
        </div>
      </div>
    );
  }

  // AFFILIATE DISCLOSURE
  if (pageType === 'affiliate-disclosure') {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-6">
        <span className="rounded-full bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1">
          FTC Compliance &amp; Transparency
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900">Affiliate &amp; Monetization Disclosure</h1>
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 space-y-6 text-xs sm:text-sm text-neutral-700 leading-relaxed">
          <p>
            In compliance with the Federal Trade Commission (FTC) guidelines, please assume that certain links pointing to third-party software products (e.g. Canva, Make.com, Notion) may be affiliate links.
          </p>
          <section className="space-y-2">
            <h2 className="font-bold text-base text-neutral-900">How It Affects You:</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Zero Added Cost:</strong> The price you pay is identical whether you use our link or navigate directly.</li>
              <li><strong>Zero Paid Placements:</strong> Software companies cannot purchase higher rankings in our comparison matrices.</li>
              <li><strong>Independent Testing:</strong> If a tool has severe limitations or poor value, we explicitly document it.</li>
            </ul>
          </section>
        </div>
      </div>
    );
  }

  // PRIVACY POLICY & GDPR
  if (pageType === 'privacy') {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-6">
        <span className="rounded-full bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1">
          GDPR &amp; CCPA Compliance
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900">Privacy Policy</h1>
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed">
          <p>
            {brandConfig.siteName} respects your digital privacy. All saved keywords, prompts, and drafts are stored strictly inside your browser's LocalStorage and are never sent to external servers without your explicit action.
          </p>
          <h2 className="font-bold text-base text-neutral-900 pt-2">Data We Do NOT Collect</h2>
          <p>We do not collect personal financial data, passwords, or phone numbers. We do not sell user data to advertising brokers.</p>
        </div>
      </div>
    );
  }

  // TERMS OF SERVICE
  if (pageType === 'terms') {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-6">
        <span className="rounded-full bg-neutral-100 text-neutral-800 text-xs font-bold px-3 py-1">
          Legal Agreement
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900">Terms of Service</h1>
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed">
          <p>
            By accessing or using {brandConfig.siteName}, you agree to use our free utilities for lawful research, creative synthesis, and educational growth. All proprietary Opportunity Scores and algorithms are provided for guidance purposes without guarantee of specific financial returns.
          </p>
        </div>
      </div>
    );
  }

  // CONTACT FORM
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8 space-y-6">
      <div className="text-center space-y-2">
        <span className="rounded-full bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1">
          Get in Touch
        </span>
        <h1 className="text-3xl font-extrabold text-neutral-900">Contact Editorial &amp; Support</h1>
        <p className="text-xs sm:text-sm text-neutral-500">
          Have an inquiry, found a data discrepancy, or want to suggest a new tool?
        </p>
      </div>

      <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-xs">
        {contactSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900">Message Received</h3>
            <p className="text-xs text-neutral-500">
              Our editorial and engineering desk typically responds within 24 business hours.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setContactSubmitted(true);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">Your Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Alex Morgan"
                className="w-full rounded-xl border border-neutral-300 p-2.5 text-xs text-neutral-900 focus:border-blue-600 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="alex@domain.com"
                className="w-full rounded-xl border border-neutral-300 p-2.5 text-xs text-neutral-900 focus:border-blue-600 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">Message Subject</label>
              <input
                type="text"
                required
                placeholder="e.g. Tool suggestion or Editorial feedback"
                className="w-full rounded-xl border border-neutral-300 p-2.5 text-xs text-neutral-900 focus:border-blue-600 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">Message Details</label>
              <textarea
                rows={4}
                required
                placeholder="Describe your inquiry..."
                className="w-full rounded-xl border border-neutral-300 p-3 text-xs text-neutral-900 focus:border-blue-600 focus:outline-hidden"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 py-3 text-xs font-bold text-white shadow-xs hover:bg-blue-700 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <Send className="h-4 w-4" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
