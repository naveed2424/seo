/**
 * Brand Configuration for RankPulse
 * Centralizes brand identity, naming, colors, domains, and monetization settings.
 * Theme: Rich Brown & Luminous Cyber Light Blue with Matrix Data Animation
 */

export interface BrandConfig {
  siteName: string;
  tagline: string;
  subTagline: string;
  logoText: string;
  domain: string;
  primaryColor: string;
  accentColor: string;
  creatorName: string;
  contactEmail: string;
  supportEmail: string;
  freeToolsCount: number;
  establishedYear: number;
  socials: {
    twitter: string;
    github: string;
    youtube: string;
    linkedin: string;
  };
  alternativeBrands: Array<{
    name: string;
    tagline: string;
    description: string;
  }>;
}

export const brandConfig: BrandConfig = {
  siteName: "rank2seo",
  tagline: "Global Keyword Research, Search Volume & Organic Competitor Intelligence",
  subTagline: "Find exact keywords for businesses, products & websites across all countries 100% free.",
  logoText: "rank2seo",
  domain: "rank2seo.com",
  primaryColor: "#0ea5e9", // Luminous Light Blue / Cyber Cerulean
  accentColor: "#452d1c",  // Rich Espresso Brown
  creatorName: "rank2seo Engineering & Data Team",
  contactEmail: "hello@rank2seo.com",
  supportEmail: "support@rank2seo.com",
  freeToolsCount: 42,
  establishedYear: 2026,
  socials: {
    twitter: "https://twitter.com/rank2seo",
    github: "https://github.com/rank2seo",
    youtube: "https://youtube.com/@rank2seo",
    linkedin: "https://linkedin.com/company/rank2seo",
  },
  alternativeBrands: [
    { name: "GrowPilot", tagline: "Your AI autopilot for online growth", description: "Modern creator-focused brand with automation emphasis." },
    { name: "RankForge", tagline: "Forge authority, rank higher, build wealth", description: "Strong engineering-led SEO and business optimization brand." },
    { name: "Toolnova", tagline: "The universe of high-impact AI utilities", description: "Directory-first brand focusing on software discovery and speed." },
    { name: "GrowthKit", tagline: "Essential AI and SEO toolkits for builders", description: "Modular toolkit identity tailored for solopreneurs and makers." },
    { name: "Rankora", tagline: "Intelligent search & organic traffic engine", description: "Sleek SaaS-oriented brand for serious content marketers." },
    { name: "ApexSEO", tagline: "Peak performance search intelligence", description: "Analytical and data-first SEO research brand." },
    { name: "OmniGrowth", tagline: "All-in-one growth architecture for the AI era", description: "Comprehensive platform spanning creators, ecommerce, and AI." },
    { name: "ContentSurge", tagline: "Turn high-demand search into compounding traffic", description: "Editorial-driven platform focusing on content velocity and E-E-A-T." },
    { name: "StratifyAI", tagline: "Strategic AI tools for sustainable businesses", description: "Consulting-grade tools for SMBs, consultants, and agencies." },
    { name: "PulseRank", tagline: "Live pulse on search trends and AI workflows", description: "Trend-driven SEO and creator growth platform." },
  ],
};
