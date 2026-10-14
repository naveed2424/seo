/**
 * Brand Configuration for RankPulse
 * Centralizes brand identity, naming, colors, domains, and monetization settings.
 * Easily reconfigurable to any of the 10 included brand identities.
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
  siteName: "RankPulse",
  tagline: "Grow Smarter With AI.",
  subTagline: "Better Tools. Better Content. Better Traffic.",
  logoText: "RankPulse",
  domain: "rankpulse.io",
  primaryColor: "#2563eb", // Premium Royal Blue
  accentColor: "#7c3aed",  // Subtle Violet
  creatorName: "RankPulse Editorial & Engineering Team",
  contactEmail: "hello@rankpulse.io",
  supportEmail: "support@rankpulse.io",
  freeToolsCount: 42,
  establishedYear: 2026,
  socials: {
    twitter: "https://twitter.com/rankpulse",
    github: "https://github.com/rankpulse",
    youtube: "https://youtube.com/@rankpulse",
    linkedin: "https://linkedin.com/company/rankpulse",
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
