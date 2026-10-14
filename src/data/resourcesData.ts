export interface ResourceItem {
  id: string;
  title: string;
  category: 'SEO' | 'Online Business' | 'Blogging' | 'Creators' | 'Checklist';
  badge: 'Free Download' | 'Interactive Checklist' | 'Template';
  description: string;
  items: string[];
  tips: string;
  fileFormat: string;
}

export const RESOURCES_DATABASE: ResourceItem[] = [
  {
    id: 'seo-launch-checklist',
    title: 'The 35-Point Website SEO Launch Checklist',
    category: 'SEO',
    badge: 'Interactive Checklist',
    description: 'Ensure your website has flawless technical fundamentals, canonical tags, clean robots.txt, and structured Schema before indexing.',
    items: [
      'Self-referential canonical tag on all indexable pages',
      'Valid Schema.org WebApplication or Article markup validated via Google Rich Results',
      'XML sitemap submitted to Google Search Console and Bing Webmaster Tools',
      'Robots.txt correctly allows public indexing and blocks internal search parameter URLs',
      'Page title under 60 characters with unique focus keyword',
      'Meta description between 140–160 characters with clear call-to-action',
      'OpenGraph and Twitter Card social preview images verified',
      'Core Web Vitals LCP < 1.8s and zero layout shifts (CLS < 0.05)',
      'Clean semantic H1 (exactly one per page) and nested H2/H3 architecture',
      'Circular internal links linking to core topical pillar and relevant free tools',
    ],
    tips: 'Bookmark this checklist and complete it before publishing any new domain or major section.',
    fileFormat: 'Interactive & Markdown',
  },
  {
    id: 'digital-product-launch-blueprint',
    title: 'Digital Product Launch & Pricing Blueprint',
    category: 'Online Business',
    badge: 'Template',
    description: 'Step-by-step roadmap from initial Google Trends validation to Etsy/Shopify listing and first 100 sales.',
    items: [
      'Search demand validation using RankPulse Keyword Explorer (Score > 65)',
      'Minimum Viable Asset creation using free tools (Canva Free or Google Sheets)',
      '13 Multi-word Etsy tags generated under 20-character limit',
      'High-contrast mockup presentation image (2000x2000px)',
      'Customer onboarding instruction sheet with video walkthrough link',
      'Launch price testing at initial 30% discount to generate first 10 verified reviews',
      'Automated email delivery setup via Gumroad, Etsy, or Shopify Digital Downloads',
    ],
    tips: 'Focus on eliminating friction in the first 60 seconds after the customer downloads the asset.',
    fileFormat: 'Markdown & PDF Checklist',
  },
  {
    id: 'youtube-retention-template',
    title: 'YouTube 60-Second Video Script Structure',
    category: 'Creators',
    badge: 'Template',
    description: 'A proven psychological script structure that keeps average percentage viewed above 70% on YouTube tutorials and Shorts.',
    items: [
      '0:00 - 0:03 | The Visual Pattern Interrupt & Direct Promise',
      '0:03 - 0:10 | Agitate the Hidden Cost of the Old Way',
      '0:10 - 0:30 | Reveal Step 1 with Screen Demonstration',
      '0:30 - 0:45 | The "Secret Nuance" that Competitors Omit',
      '0:45 - 0:55 | The Concrete Transformation / Result',
      '0:55 - 1:00 | Seamless Loop or Value-First CTA to Related Free Tool',
    ],
    tips: 'Never use generic logos or channel intros in the first 10 seconds.',
    fileFormat: 'Script Template',
  },
];
