export interface PromptItem {
  id: string;
  title: string;
  category: 'SEO' | 'Blogging' | 'Business' | 'YouTube' | 'Ecommerce' | 'Automation';
  purpose: string;
  promptTemplate: string;
  variables: Array<{ name: string; description: string; defaultValue: string }>;
  exampleOutput: string;
  tips: string;
  relatedToolSlug: string;
}

export const PROMPTS_DATABASE: PromptItem[] = [
  {
    id: 'seo-content-brief',
    title: 'The Exhaustive SEO Content Brief Generator',
    category: 'SEO',
    purpose: 'Extract user search intent, recommended H2/H3 subheadings, semantic entities, and competitive differentiation angles before writing.',
    promptTemplate: `Act as a senior technical SEO content strategist. Generate an exhaustive, publication-ready content brief for the target query: "{{KEYWORD}}".
Target Audience: {{AUDIENCE}}
Search Intent: {{INTENT}}

Provide your response with:
1. Primary Search Intent Breakdown (What does the user desperately want to solve?)
2. Suggested H1 and 3 High-CTR Meta Titles (under 60 chars)
3. Direct Quick Answer (50-70 words, high-density, no filler)
4. Comprehensive Heading Architecture (H2s and nested H3s with required talking points)
5. Semantic LSI Entity Keywords to include naturally
6. 3 Unique Angles to outperform current top 5 SERP competitors`,
    variables: [
      { name: 'KEYWORD', description: 'Your focus SEO query', defaultValue: 'best free AI tools for solopreneurs' },
      { name: 'AUDIENCE', description: 'Target reader persona', defaultValue: 'solo entrepreneurs and creators with $0 budget' },
      { name: 'INTENT', description: 'Search intent type', defaultValue: 'commercial comparison and immediate utility' },
    ],
    exampleOutput: `1. Search Intent: Fast comparison of reliable AI tools with genuine $0 tiers.
2. Title: "15 Best Free AI Tools for Solopreneurs (Tested in 2026)"
3. Quick Answer: Free AI tools for solopreneurs automate writing, graphic creation, and research without overhead. The top free utilities include Google Gemini for large-context synthesis, Canva Free for commercial graphic assets, Make.com for 1,000 monthly workflow automations, and RankPulse for zero-cost keyword discovery.`,
    tips: 'Feed this output directly into our AI Article Writer tool for maximum topical coverage.',
    relatedToolSlug: 'ai-article-writer',
  },
  {
    id: 'youtube-hook-matrix',
    title: 'The 3-Second YouTube Scroll-Stopping Hook Matrix',
    category: 'YouTube',
    purpose: 'Generate 5 high-retention video hooks that eliminate viewer drop-off in the first 15 seconds.',
    promptTemplate: `You are an elite YouTube retention consultant. Write 5 psychological opening hooks for a video titled: "{{VIDEO_TITLE}}".
Primary Pain Point: {{PAIN_POINT}}
Video Format: {{FORMAT}}

For each hook provide:
- Hook Type (e.g. Negative Frame, Curiosity Gap, High Stakes Contrast, Contrarian Proof)
- Spoken Voiceover Script (Exact words for first 8 seconds)
- Visual / Editing Cue (What appears on screen to match words)`,
    variables: [
      { name: 'VIDEO_TITLE', description: 'Proposed video title', defaultValue: 'I Built a $5,000/mo AI Automation Agency with No Code' },
      { name: 'PAIN_POINT', description: 'Core problem viewers face', defaultValue: 'Thinking you need Python programming to build AI systems' },
      { name: 'FORMAT', description: 'Length and style', defaultValue: '12-minute deep tutorial' },
    ],
    exampleOutput: `Hook 1 (Negative Frame):
Voiceover: "Almost everyone trying to build with AI right now is wasting 3 months learning Python—and it is completely unnecessary."
Visual Cue: Screen recording of complicated code being crossed out with large red marker, instantly transitioning to clean visual Make.com node dashboard.`,
    tips: 'Never say "Hey guys welcome back to the channel." Jump directly into the tension.',
    relatedToolSlug: 'ugc-script-generator',
  },
  {
    id: 'digital-product-validation',
    title: 'Etsy & Digital Product Viability Auditor',
    category: 'Ecommerce',
    purpose: 'Audit a digital product concept for market demand, competitor moats, pricing psychology, and bundle expansion.',
    promptTemplate: `Act as a seasoned digital ecommerce merchant. Audit the viability of this digital download product:
Product Concept: {{PRODUCT_CONCEPT}}
Platform: {{PLATFORM}}
Target Price: {{PRICE}}

Analyze:
1. Demand Signal & Search Volume Reality (Is this a problem people search with wallets open?)
2. Competitive Saturation Assessment
3. Three High-Value Differentiators to stand out on search result pages
4. Suggested 13 Multi-Word Search Tags`,
    variables: [
      { name: 'PRODUCT_CONCEPT', description: 'Product idea', defaultValue: 'Rental Property ROI & Tax Depreciation Google Sheet' },
      { name: 'PLATFORM', description: 'Marketplace', defaultValue: 'Etsy & Gumroad' },
      { name: 'PRICE', description: 'Intended price point', defaultValue: '$29' },
    ],
    exampleOutput: `1. Demand Signal: Extremely strong commercial buyer intent. Real estate investors actively search for automated tax spreadsheets because custom software costs $50+/mo.
2. Saturation: High on basic templates, LOW on templates with integrated IRS depreciation schedules and video walkthroughs.
3. Differentiators: Include 3-minute video onboarding, automated PDF export for CPA tax filing, and mobile-friendly input dashboard.`,
    tips: 'Use our Etsy Tag Generator to verify the exact 20-character tag limits.',
    relatedToolSlug: 'etsy-tag-generator',
  },
  {
    id: 'make-workflow-blueprint',
    title: 'No-Code AI Automation Architecture Specifier',
    category: 'Automation',
    purpose: 'Transform a messy manual business process into a bulletproof 5-step webhook and AI scenario specification.',
    promptTemplate: `Act as a Lead Automation Architect on Make.com.
Manual Process: {{MANUAL_TASK}}
Available Tools: {{TECH_STACK}}

Construct:
1. Trigger Module Configuration (Polling interval, webhook payload)
2. AI Conditioning & Formatting Prompt
3. Error Handling and Fallback Strategy (What happens if LLM rate limits or returns invalid JSON?)
4. Final Destination Action`,
    variables: [
      { name: 'MANUAL_TASK', description: 'Task to automate', defaultValue: 'Reading customer inquiry emails, finding their invoice, and drafting answer' },
      { name: 'TECH_STACK', description: 'Connected software', defaultValue: 'Gmail, Stripe, Gemini Flash, Slack' },
    ],
    exampleOutput: `Step 1: Gmail 'Watch Emails' trigger filtered by label 'Support'.
Step 2: Gemini Flash parse customer query into JSON: { intent, invoiceId, sentiment }.
Step 3: Stripe 'Retrieve Invoice' module.
Step 4: Draft Gmail response using template and ping Slack channel for 1-click human approval.`,
    tips: 'Always require human approval on financial or refund workflows.',
    relatedToolSlug: 'automation-workflow-builder',
  },
];
