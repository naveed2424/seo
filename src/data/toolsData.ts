import { VisualType } from '../components/common/LightweightVisual';

export interface ToolItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: 'AI Writing' | 'SEO' | 'Business' | 'Social' | 'Creator' | 'YouTube' | 'Ecommerce' | 'Automation';
  badge: 'Popular' | 'New' | 'Flagship' | 'Free';
  visualType: VisualType;
  primaryKeyword: string;
  searchIntent: 'informational' | 'transactional' | 'commercial';
  estimatedTime: string;
  inputsSchema: Array<{
    name: string;
    label: string;
    type: 'text' | 'textarea' | 'select' | 'number';
    placeholder?: string;
    options?: string[];
    defaultValue?: string;
    required?: boolean;
    helperText?: string;
  }>;
  relatedGuides: Array<{
    title: string;
    slug: string;
  }>;
}

export const TOOLS_DATABASE: ToolItem[] = [
  {
    id: 'keyword-explorer',
    name: 'Keyword Explorer & Opportunity Radar',
    slug: 'keyword-explorer',
    description: 'Discover search volume trends, long-tail variations, question queries, and our proprietary 0–100 Opportunity Score.',
    category: 'SEO',
    badge: 'Flagship',
    visualType: 'keyword-explorer',
    primaryKeyword: 'keyword explorer free',
    searchIntent: 'commercial',
    estimatedTime: 'Instant',
    inputsSchema: [
      {
        name: 'keyword',
        label: 'Seed Keyword or Topic',
        type: 'text',
        placeholder: 'e.g. digital products, AI automation, dog grooming',
        defaultValue: 'AI tools for creators',
        required: true,
      },
      {
        name: 'country',
        label: 'Target Market',
        type: 'select',
        options: ['United States (US)', 'United Kingdom (UK)', 'Canada (CA)', 'Australia (AU)', 'Worldwide'],
        defaultValue: 'United States (US)',
      },
    ],
    relatedGuides: [
      { title: 'How to Find Low-Competition Keywords with High Commercial Intent', slug: 'find-low-competition-keywords' },
      { title: 'Long-Tail Keywords Explained: The 2026 Guide to Organic Traffic', slug: 'long-tail-keywords-guide' },
    ],
  },
  {
    id: 'ai-article-writer',
    name: 'AI Article Writer & Trends Searcher',
    slug: 'ai-article-writer',
    description: 'Generate comprehensive, E-E-A-T-ready blog posts with Quick Answers, Key Takeaways, structured headings, and search trend insights.',
    category: 'AI Writing',
    badge: 'Flagship',
    visualType: 'article-writer',
    primaryKeyword: 'ai article writer free',
    searchIntent: 'transactional',
    estimatedTime: '5-15 sec',
    inputsSchema: [
      {
        name: 'topic',
        label: 'Target Topic / Working Title',
        type: 'text',
        placeholder: 'e.g. How to Monetize a Faceless YouTube Channel in 2026',
        defaultValue: '10 High-Demand Digital Products to Sell on Etsy in 2026',
        required: true,
      },
      {
        name: 'targetKeyword',
        label: 'Primary SEO Keyword',
        type: 'text',
        placeholder: 'e.g. etsy digital products 2026',
        defaultValue: 'etsy digital products to sell',
      },
      {
        name: 'tone',
        label: 'Tone of Voice',
        type: 'select',
        options: ['Authoritative & Practical', 'Casual & Direct', 'Executive SaaS', 'Step-by-Step Educational'],
        defaultValue: 'Authoritative & Practical',
      },
      {
        name: 'wordCount',
        label: 'Target Length',
        type: 'select',
        options: ['Standard Guide (~800 words)', 'Comprehensive Blueprint (~1500 words)', 'Deep-Dive Pillar (~2200 words)'],
        defaultValue: 'Comprehensive Blueprint (~1500 words)',
      },
    ],
    relatedGuides: [
      { title: 'How to Build Topical Authority with Topic Clusters and Pillar Pages', slug: 'build-topical-authority' },
      { title: 'SEO Checklist for New Websites: From Day 0 to 1,000 Organic Visitors', slug: 'seo-checklist-new-websites' },
    ],
  },
  {
    id: 'google-trends-demand',
    name: 'Google Trends & Search Demand Finder',
    slug: 'trends-demand-finder',
    description: 'Inspect breakout search trends, search volume velocity, seasonal spikes, and high-demand topics before competition arrives.',
    category: 'SEO',
    badge: 'New',
    visualType: 'trends-surge',
    primaryKeyword: 'google trends topic search',
    searchIntent: 'informational',
    estimatedTime: '2 sec',
    inputsSchema: [
      {
        name: 'niche',
        label: 'Niche or Industry',
        type: 'text',
        placeholder: 'e.g. AI workflows, remote side hustles, Notion templates',
        defaultValue: 'AI automation for small business',
        required: true,
      },
      {
        name: 'timeframe',
        label: 'Trend Window',
        type: 'select',
        options: ['Past 30 Days (Breakout Velocity)', 'Past 90 Days (Quarterly Momentum)', 'Past 12 Months (Sustained Demand)'],
        defaultValue: 'Past 90 Days (Quarterly Momentum)',
      },
    ],
    relatedGuides: [
      { title: 'How to Optimize Content for AI Search Engines (Perplexity, ChatGPT, SGE)', slug: 'optimize-for-ai-search' },
      { title: 'Keyword Research for Beginners: The Zero-Budget Framework', slug: 'keyword-research-beginners' },
    ],
  },
  {
    id: 'seo-title-generator',
    name: 'SEO Title & SERP CTR Optimizer',
    slug: 'seo-title-generator',
    description: 'Generate high-CTR title tags crafted for maximum click-through rate, pixel width constraints, and search intent alignment.',
    category: 'SEO',
    badge: 'Popular',
    visualType: 'meta-tags',
    primaryKeyword: 'seo title generator',
    searchIntent: 'transactional',
    estimatedTime: 'Instant',
    inputsSchema: [
      {
        name: 'topic',
        label: 'Article Topic or Keyword',
        type: 'text',
        placeholder: 'e.g. best email marketing software',
        defaultValue: 'best free AI tools for solopreneurs',
        required: true,
      },
      {
        name: 'intent',
        label: 'Primary Reader Emotion / Intent',
        type: 'select',
        options: ['Curiosity & Value', 'Speed & Simplicity', 'Definitive Comparison', 'Data-Driven & Proof'],
        defaultValue: 'Curiosity & Value',
      },
    ],
    relatedGuides: [
      { title: 'How to Get Your First 1,000 Google Visitors Without Paid Ads', slug: 'get-first-1000-visitors' },
    ],
  },
  {
    id: 'meta-description-generator',
    name: 'Meta Description Generator',
    slug: 'meta-description-generator',
    description: 'Create compelling 150-160 character meta snippets designed to maximize SERP clicks without getting truncated.',
    category: 'SEO',
    badge: 'Free',
    visualType: 'meta-tags',
    primaryKeyword: 'meta description generator',
    searchIntent: 'transactional',
    estimatedTime: 'Instant',
    inputsSchema: [
      {
        name: 'pageTitle',
        label: 'Page Title & Subject',
        type: 'text',
        placeholder: 'e.g. 15 Realistic Side Hustles You Can Start in 2026',
        defaultValue: 'Complete Guide to Selling Digital Downloads on Shopify',
        required: true,
      },
      {
        name: 'keyword',
        label: 'Focus Keyword',
        type: 'text',
        placeholder: 'e.g. sell digital downloads shopify',
        defaultValue: 'sell digital downloads shopify',
      },
    ],
    relatedGuides: [
      { title: 'SEO Checklist for New Websites: From Day 0 to 1,000 Organic Visitors', slug: 'seo-checklist-new-websites' },
    ],
  },
  {
    id: 'business-idea-generator',
    name: 'AI Business Idea & Niche Generator',
    slug: 'business-idea-generator',
    description: 'Generate vetted online business concepts categorized by startup cost, monetization model, moat, and difficulty score.',
    category: 'Business',
    badge: 'Popular',
    visualType: 'business-growth',
    primaryKeyword: 'ai business idea generator',
    searchIntent: 'informational',
    estimatedTime: '3 sec',
    inputsSchema: [
      {
        name: 'skills',
        label: 'Your Background or Interests',
        type: 'text',
        placeholder: 'e.g. writing, data analysis, fitness, video editing, no-code',
        defaultValue: 'graphic design and content creation',
        required: true,
      },
      {
        name: 'capital',
        label: 'Starting Capital',
        type: 'select',
        options: ['$0 (Zero-cost Sweat Equity)', 'Under $100 (Domain + Minimal Tools)', '$500 - $1,000 (Software + Assets)'],
        defaultValue: 'Under $100 (Domain + Minimal Tools)',
      },
      {
        name: 'model',
        label: 'Preferred Business Model',
        type: 'select',
        options: ['Digital Products & Printables', 'Micro-SaaS & AI Wrappers', 'Affiliate / Content Publishing', 'High-Ticket Freelance / Agency'],
        defaultValue: 'Digital Products & Printables',
      },
    ],
    relatedGuides: [
      { title: 'How to Start an Online Business in 2026: The Low-Risk Playbook', slug: 'start-online-business-2026' },
      { title: 'How Affiliate Marketing Works: Honest Blueprint for Real Earnings', slug: 'how-affiliate-marketing-works' },
    ],
  },
  {
    id: 'niche-profit-calculator',
    name: 'Digital Product Profit & Traffic Calculator',
    slug: 'profit-calculator',
    description: 'Calculate realistic revenue projections based on organic traffic, conversion rate, product pricing, and customer lifetime value.',
    category: 'Business',
    badge: 'Free',
    visualType: 'profit-calc',
    primaryKeyword: 'digital product profit calculator',
    searchIntent: 'informational',
    estimatedTime: 'Instant',
    inputsSchema: [
      {
        name: 'monthlyTraffic',
        label: 'Estimated Monthly Visitors',
        type: 'number',
        placeholder: '5000',
        defaultValue: '10000',
        required: true,
      },
      {
        name: 'conversionRate',
        label: 'Landing Page Conversion Rate (%)',
        type: 'number',
        placeholder: '2.5',
        defaultValue: '2.0',
        required: true,
      },
      {
        name: 'productPrice',
        label: 'Average Order Value ($)',
        type: 'number',
        placeholder: '39',
        defaultValue: '47',
        required: true,
      },
    ],
    relatedGuides: [
      { title: 'The Ultimate Guide to Selling Digital Products Without An Audience', slug: 'sell-digital-products-guide' },
    ],
  },
  {
    id: 'youtube-keyword-tool',
    name: 'YouTube Keyword & Tag Optimizer',
    slug: 'youtube-keyword-tool',
    description: 'Uncover search queries viewers type into YouTube, suggested video tags, high-CTR thumbnail concepts, and playlist themes.',
    category: 'YouTube',
    badge: 'Popular',
    visualType: 'youtube-studio',
    primaryKeyword: 'youtube keyword tool free',
    searchIntent: 'commercial',
    estimatedTime: '2 sec',
    inputsSchema: [
      {
        name: 'topic',
        label: 'Video Topic or Channel Focus',
        type: 'text',
        placeholder: 'e.g. how to use Make.com for automation',
        defaultValue: 'how to build AI agents without coding',
        required: true,
      },
      {
        name: 'format',
        label: 'Target Video Format',
        type: 'select',
        options: ['Long-form Deep Tutorial (10-20 min)', 'Quick Tactical Guide (5-8 min)', 'YouTube Shorts (< 60s)'],
        defaultValue: 'Long-form Deep Tutorial (10-20 min)',
      },
    ],
    relatedGuides: [
      { title: 'YouTube Keyword Research & Algorithm Ranking Secrets', slug: 'youtube-keyword-research' },
      { title: 'How to Repurpose One Video into 10 Compounding Content Assets', slug: 'repurpose-content-guide' },
    ],
  },
  {
    id: 'ugc-script-generator',
    name: 'UGC & Video Hook Script Generator',
    slug: 'ugc-script-generator',
    description: 'Generate high-retention video scripts with visual cues, 3-second scroll-stopping hooks, problem setup, and clear CTAs.',
    category: 'Creator',
    badge: 'Free',
    visualType: 'social-viral',
    primaryKeyword: 'ugc script generator free',
    searchIntent: 'transactional',
    estimatedTime: '3 sec',
    inputsSchema: [
      {
        name: 'productName',
        label: 'Product, Tool, or Offer Name',
        type: 'text',
        placeholder: 'e.g. Notion Budget Planner, AI SEO Tool',
        defaultValue: 'RankPulse Free Keyword Explorer',
        required: true,
      },
      {
        name: 'coreBenefit',
        label: 'The #1 Big Transformation or Pain Relieved',
        type: 'text',
        placeholder: 'e.g. Finds low competition keywords in 30 seconds',
        defaultValue: 'Finds untapped keywords with high search volume and low competition for free',
        required: true,
      },
      {
        name: 'style',
        label: 'Script Persona',
        type: 'select',
        options: ['Direct Solopreneur Hack', 'Relatable Honest Review', 'Behind-the-scenes Tutorial', 'High-Energy Problem Agitator'],
        defaultValue: 'Direct Solopreneur Hack',
      },
    ],
    relatedGuides: [
      { title: 'How to Find YouTube Video Ideas That Attract Compounding Views', slug: 'youtube-video-ideas' },
    ],
  },
  {
    id: 'kdp-keyword-generator',
    name: 'Amazon KDP & Ebook Keyword Generator',
    slug: 'kdp-keyword-generator',
    description: 'Craft high-intent keyword strings tailored for Amazon 7 backend keyword boxes, subtitle ideas, and reader search intent.',
    category: 'Ecommerce',
    badge: 'Popular',
    visualType: 'kdp-book',
    primaryKeyword: 'amazon kdp keyword generator',
    searchIntent: 'commercial',
    estimatedTime: 'Instant',
    inputsSchema: [
      {
        name: 'topic',
        label: 'Book Subject or Genre',
        type: 'text',
        placeholder: 'e.g. ADHD productivity workbook for adults',
        defaultValue: 'habit tracking journal for entrepreneurs',
        required: true,
      },
      {
        name: 'targetReader',
        label: 'Ideal Reader Demographic',
        type: 'text',
        placeholder: 'e.g. busy mothers, freelance developers, college students',
        defaultValue: 'remote workers and solo founders',
      },
    ],
    relatedGuides: [
      { title: 'The Realistic Amazon KDP Publisher Blueprint: Zero Fluff Guide', slug: 'amazon-kdp-beginner-guide' },
      { title: 'Digital Products You Can Sell in 2026 With Zero Inventory', slug: 'digital-products-to-sell' },
    ],
  },
  {
    id: 'etsy-tag-generator',
    name: 'Etsy 13-Tag & Title SEO Optimizer',
    slug: 'etsy-tag-generator',
    description: 'Generate 13 high-demand multi-word Etsy tags (under 20 characters) and conversion-focused listing titles.',
    category: 'Ecommerce',
    badge: 'Free',
    visualType: 'ecommerce-cart',
    primaryKeyword: 'etsy tag generator free',
    searchIntent: 'transactional',
    estimatedTime: 'Instant',
    inputsSchema: [
      {
        name: 'itemDescription',
        label: 'Product Type & Target Occasion',
        type: 'text',
        placeholder: 'e.g. Wedding Budget Spreadsheet Excel & Google Sheets',
        defaultValue: 'Minimalist Daily Planner Printable PDF',
        required: true,
      },
      {
        name: 'nicheAudience',
        label: 'Customer Intended Use',
        type: 'text',
        placeholder: 'e.g. home office organization, student planning',
        defaultValue: 'aesthetic desk setup and work organization',
      },
    ],
    relatedGuides: [
      { title: 'Beginner Guide to Etsy Digital Products: What Actually Sells', slug: 'etsy-digital-products-guide' },
    ],
  },
  {
    id: 'schema-generator',
    name: 'Schema.org JSON-LD Markup Generator',
    slug: 'schema-generator',
    description: 'Generate compliant FAQPage, HowTo, SoftwareApplication, and Article structured data to earn rich Google snippets.',
    category: 'SEO',
    badge: 'Free',
    visualType: 'schema-tree',
    primaryKeyword: 'schema generator json ld',
    searchIntent: 'transactional',
    estimatedTime: 'Instant',
    inputsSchema: [
      {
        name: 'schemaType',
        label: 'Structured Data Type',
        type: 'select',
        options: ['FAQPage (Questions & Answers)', 'SoftwareApplication (Web App/Tool)', 'Article / BlogPost', 'HowTo Guide'],
        defaultValue: 'FAQPage (Questions & Answers)',
      },
      {
        name: 'entityTitle',
        label: 'Primary Title / Topic',
        type: 'text',
        placeholder: 'e.g. Keyword Explorer Tool or How to Start a Blog FAQ',
        defaultValue: 'Frequently Asked Questions About SEO Keyword Research',
        required: true,
      },
    ],
    relatedGuides: [
      { title: 'How to Build Topical Authority with Topic Clusters and Pillar Pages', slug: 'build-topical-authority' },
    ],
  },
  {
    id: 'content-summarizer',
    name: 'Content Summarizer & Key Takeaways Generator',
    slug: 'content-summarizer',
    description: 'Condense long articles, transcripts, or reports into executive summaries, key takeaways, and actionable bullet points.',
    category: 'AI Writing',
    badge: 'Free',
    visualType: 'article-writer',
    primaryKeyword: 'content summarizer tool',
    searchIntent: 'transactional',
    estimatedTime: 'Instant',
    inputsSchema: [
      {
        name: 'rawContent',
        label: 'Text or Article to Summarize',
        type: 'textarea',
        placeholder: 'Paste your long-form text, notes, or article transcript here...',
        defaultValue: 'Search engines are prioritizing Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T). Publishers who provide verified author bios, primary data, and interactive utilities consistently outperform AI spam farms.',
        required: true,
      },
    ],
    relatedGuides: [
      { title: 'How to Optimize Content for AI Search Engines (Perplexity, ChatGPT, SGE)', slug: 'optimize-for-ai-search' },
    ],
  },
  {
    id: 'automation-workflow-builder',
    name: 'AI Agent & No-Code Workflow Blueprint',
    slug: 'automation-workflow-builder',
    description: 'Design step-by-step automation logic connecting AI models, Google Sheets, email triggers, and webhook actions without code.',
    category: 'Automation',
    badge: 'New',
    visualType: 'automation-flow',
    primaryKeyword: 'no-code automation workflow builder',
    searchIntent: 'informational',
    estimatedTime: 'Instant',
    inputsSchema: [
      {
        name: 'workflowGoal',
        label: 'What task do you want to automate?',
        type: 'text',
        placeholder: 'e.g. Automatically summarize customer inquiries and draft replies in Gmail',
        defaultValue: 'Auto-generate weekly SEO keyword clusters and email report to team',
        required: true,
      },
      {
        name: 'preferredPlatform',
        label: 'Automation Platform',
        type: 'select',
        options: ['Make.com (Recommended for Flexibility)', 'Zapier', 'n8n (Self-hosted/Privacy)', 'Native Webhook & AI Script'],
        defaultValue: 'Make.com (Recommended for Flexibility)',
      },
    ],
    relatedGuides: [
      { title: 'AI Automation for Small Businesses: 7 High-ROI Workflows', slug: 'ai-automation-small-business' },
      { title: 'No-Code Automation for Beginners: Make.com vs Zapier', slug: 'no-code-automation-beginners' },
    ],
  },
];
