export interface Author {
  id: string;
  name: string;
  slug: string;
  role: string;
  bio: string;
  avatarUrl: string;
  experienceYears: number;
  expertise: string[];
  socials: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export const AUTHORS_DATABASE: Record<string, Author> = {
  'afzal-khan': {
    id: 'afzal-khan',
    name: 'Afzal Khan',
    slug: 'afzal-khan',
    role: 'Founder & Technical SEO Architect',
    bio: 'Software engineer and search strategist with over 8 years of experience building organic growth engines, programmatic SEO systems, and AI content workflows for modern startups.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
    experienceYears: 8,
    expertise: ['Technical SEO', 'AI Workflow Engineering', 'Data Structures', 'SERP Analysis'],
    socials: {
      twitter: 'https://twitter.com/rankpulse',
      github: 'https://github.com/rankpulse',
    },
  },
  'elena-vance': {
    id: 'elena-vance',
    name: 'Elena Vance',
    slug: 'elena-vance',
    role: 'Head of Content Strategy & E-E-A-T',
    bio: 'Former editorial director at top SaaS publications. Specializes in search intent architecture, high-converting digital products, and sustainable content moats.',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&h=256&q=80',
    experienceYears: 10,
    expertise: ['Editorial Strategy', 'Content Clustering', 'E-E-A-T Compliance', 'Digital Publishing'],
    socials: {
      linkedin: 'https://linkedin.com/in/elena-vance',
    },
  },
  'marcus-chen': {
    id: 'marcus-chen',
    name: 'Marcus Chen',
    slug: 'marcus-chen',
    role: 'Automation & Creator Growth Lead',
    bio: 'YouTube creator and automation engineer who scaled faceless and personal channels to over 500,000 subscribers using data-driven topic validation and no-code pipelines.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
    experienceYears: 7,
    expertise: ['YouTube SEO', 'Make.com & Zapier Workflows', 'Audience Monetization', 'Video Retention'],
    socials: {
      twitter: 'https://twitter.com/marcuschen_grow',
    },
  },
};
