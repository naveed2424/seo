export interface ComparisonItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  itemA: {
    name: string;
    score: number;
    bestFor: string;
    freePlan: string;
    price: string;
    strength: string;
    limitation: string;
    ctaUrl: string;
  };
  itemB: {
    name: string;
    score: number;
    bestFor: string;
    freePlan: string;
    price: string;
    strength: string;
    limitation: string;
    ctaUrl: string;
  };
  winnerSummary: string;
  verdictMarkdown: string;
  methodology: string;
  lastUpdated: string;
  relatedToolSlugs: string[];
}

export const COMPARISONS_DATABASE: ComparisonItem[] = [
  {
    id: 'chatgpt-vs-gemini',
    slug: 'chatgpt-vs-gemini',
    title: 'ChatGPT vs Google Gemini (2026 In-Depth Comparison)',
    subtitle: 'Which flagship AI platform delivers superior writing, reasoning, research, and daily workflow value?',
    category: 'AI Productivity',
    itemA: {
      name: 'ChatGPT (OpenAI)',
      score: 9.4,
      bestFor: 'General problem solving, creative brainstorming, and interactive writing via Canvas',
      freePlan: 'Yes (GPT-4o mini + limited GPT-4o)',
      price: '$20/month for Plus',
      strength: 'Canvas interactive editor and rich custom GPT ecosystem',
      limitation: 'Smaller context window compared to Gemini 1.5/2.0 series',
      ctaUrl: 'https://chat.openai.com',
    },
    itemB: {
      name: 'Google Gemini (Google)',
      score: 9.3,
      bestFor: 'Massive document/video analysis, Google Workspace integration, and web grounding',
      freePlan: 'Yes (Standard Gemini Flash)',
      price: '$19.99/month (includes 2TB Google One)',
      strength: '2,000,000+ token context window and native multimodal analysis',
      limitation: 'Slightly more corporate tone requiring more explicit prompt steering',
      ctaUrl: 'https://gemini.google.com',
    },
    winnerSummary: 'Tie depending on use case: Choose ChatGPT for creative writing and code editing; choose Gemini for massive research documents and Google Workspace synergy.',
    verdictMarkdown: `
### Key Differences at a Glance
1. **Context Window:** Gemini is the undisputed winner when processing massive datasets, 2-hour video transcripts, or 500-page financial reports without chunking.
2. **Interactive Editing:** ChatGPT's Canvas interface provides a superior inline drafting experience where you can highlight text and request specific modifications.
3. **Ecosystem Value:** Gemini Advanced includes 2TB of Google Drive storage and Gemini in Gmail/Docs, making it a stronger standalone economic bundle if you already use Google services.
    `,
    methodology: 'Evaluated across 40 standardized benchmark prompts spanning 5 categories: technical synthesis, long-context recall, creative prose, factual accuracy, and latency.',
    lastUpdated: '2026-09-28',
    relatedToolSlugs: ['ai-article-writer', 'content-summarizer'],
  },
  {
    id: 'semrush-vs-ahrefs',
    slug: 'semrush-vs-ahrefs',
    title: 'Semrush vs Ahrefs: Which SEO Giant Is Worth Your Budget?',
    subtitle: 'An objective head-to-head analysis of keyword databases, backlink accuracy, and pricing.',
    category: 'AI SEO',
    itemA: {
      name: 'Semrush',
      score: 9.4,
      bestFor: 'All-in-one search marketing, PPC keyword research, and on-page technical optimization',
      freePlan: 'No (Limited free search query tier)',
      price: 'Starts at $139.95/month',
      strength: 'Massive commercial keyword database with search intent labels',
      limitation: 'Interface can feel dense and overwhelming for solopreneurs',
      ctaUrl: 'https://semrush.com',
    },
    itemB: {
      name: 'Ahrefs',
      score: 9.3,
      bestFor: 'Backlink profile auditing, broken link building, and intuitive Content Explorer',
      freePlan: 'Ahrefs Webmaster Tools (Free for verified domains)',
      price: 'Starts at $129/month',
      strength: 'Fastest backlink crawler and cleanest UX design',
      limitation: 'Credits system can consume budget quickly on deep domain crawls',
      ctaUrl: 'https://ahrefs.com',
    },
    winnerSummary: 'Semrush edges ahead for full-funnel digital marketers; Ahrefs remains the gold standard for pure link building. Beginners should use free tools like RankPulse first.',
    verdictMarkdown: `
### Why New Creators Should Wait to Subscribe
Both Semrush and Ahrefs cost over $1,500 per year. If your site is under 6 months old with under 5,000 monthly visitors, your time is much better spent executing on long-tail keywords using our free [Keyword Explorer](/tools/keyword-explorer) and building high-quality content before investing in enterprise-tier tracking.
    `,
    methodology: 'Tested with 1,000 target keywords across ecommerce, SaaS, and local business niches, comparing SERP ranking correlation and freshness.',
    lastUpdated: '2026-08-20',
    relatedToolSlugs: ['keyword-explorer', 'seo-title-generator', 'schema-generator'],
  },
  {
    id: 'canva-vs-adobe-express',
    slug: 'canva-vs-adobe-express',
    title: 'Canva vs Adobe Express: The Best Tool for Digital Product Creators',
    subtitle: 'Which platform makes designing sellable printables, social assets, and templates faster in 2026?',
    category: 'Creator Growth',
    itemA: {
      name: 'Canva',
      score: 9.2,
      bestFor: 'Etsy digital products, shareable templates, and rapid social media graphics',
      freePlan: 'Generous free tier with thousands of templates',
      price: '$120/year for Pro',
      strength: 'Vast third-party template marketplace and customer familiar UX',
      limitation: 'Complex vector editing is limited compared to Illustrator',
      ctaUrl: 'https://canva.com',
    },
    itemB: {
      name: 'Adobe Express',
      score: 8.9,
      bestFor: 'Photoshop-grade layer effects, Firefly generative fill, and Creative Cloud sync',
      freePlan: 'Generous free plan with Firefly generative credits',
      price: '$9.99/month',
      strength: 'Superior Firefly generative fill and integration with Photoshop/Illustrator',
      limitation: 'Smaller template community compared to Canva',
      ctaUrl: 'https://adobe.com/express',
    },
    winnerSummary: 'Canva wins for template sellers and marketplace compatibility; Adobe Express wins if you need precise Firefly generative text effects.',
    verdictMarkdown: `
If your goal is to sell templates on Etsy or Gumroad, **Canva is the clear winner** because buyers expect editable Canva template links. Adobe Express is an outstanding tool for solo marketing teams already paying for Creative Cloud.
    `,
    methodology: 'Built 10 identical digital download templates (meal planners, budget spreadsheets, and Pinterest pins) measuring time to completion and export fidelity.',
    lastUpdated: '2026-09-05',
    relatedToolSlugs: ['etsy-tag-generator', 'kdp-keyword-generator', 'profit-calculator'],
  },
];
