# RankPulse — AI Tools, SEO Research & Online Growth Engine

> Free AI tools, SEO research, Google Trends demand discovery, and practical strategies to help creators, solo entrepreneurs, and website owners create, automate, and grow online.

---

## 1. Executive Overview

**RankPulse** combines:
- **40+ Free Dedicated AI & SEO Tools** (Keyword Explorer, AI Article Writer, Google Trends Demand Finder, Title Optimizer, Profit Calculator, UGC Script Generator, KDP Keyword Generator, Schema Generator, etc.)
- **Interactive Google Trends Searcher & Breakout Velocity Analysis**
- **In-Depth E-E-A-T Editorial Guides** (Structured Quick Answers, Key Takeaways, verified author credentials, primary citations, and circular internal links)
- **Third-Party AI Software Directory & Head-to-Head Comparisons** (ChatGPT vs Gemini, Semrush vs Ahrefs, Canva vs Adobe Express)
- **Interactive Start Here ("Find My Tool") Navigator**
- **Local Workspace** for saving keywords, drafts, and prompts with CSV and JSON export
- **Zero-Bloat Lightweight Vector Visuals & Animations** for 100% Core Web Vitals optimization

---

## 2. Technical Stack & Architecture

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Canvas Confetti
- **Lightweight Graphics:** Bespoke SVG micro-illustrations and 2D canvas particle animation (zero heavy raster assets, 0kb network delays, CLS = 0, instantaneous LCP)
- **Backend / API:**
  - Node.js Express server (`server.ts`) with Vite dev middleware for AI Studio preview
  - `@google/genai` modern SDK utilizing `gemini-3.8-flash` on the server
  - Netlify Serverless Functions (`netlify/functions/api.ts`) for 1-click Netlify deployment
  - Resilient offline fallback engine that guarantees 100% uptime even if external APIs are unreachable
- **SEO & Compliance:** Schema.org JSON-LD (`WebApplication`, `Article`, `FAQPage`), XML Sitemap, Robots.txt, OpenGraph, Twitter Cards, GDPR Cookie Consent banner

---

## 3. Netlify Deployment Instructions

RankPulse is engineered for seamless deployment on Netlify:

### Method A: Git Integration (Recommended)
1. Push this repository to GitHub or GitLab.
2. In Netlify, click **"Add new site"** → **"Import an existing project"**.
3. Netlify will automatically detect `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Functions directory:** `netlify/functions`
4. Set Environment Variables in Netlify under **Site Configuration > Environment Variables**:
   - `GEMINI_API_KEY`: Your Gemini API key from Google AI Studio.
5. Deploy! All routes, single-page application refresh redirects (`_redirects`), and serverless functions will operate immediately.

---

## 4. Google Search Console & SEO Setup

1. **Verify Domain:** Add your domain to [Google Search Console](https://search.google.com/search-console).
2. **Submit Sitemap:** Submit `https://yourdomain.com/sitemap.xml`.
3. **Inspect Robots.txt:** Ensure `https://yourdomain.com/robots.txt` is accessible.
4. **Rich Results Test:** Test any blog URL in Google's Rich Results Tool to confirm valid Schema.org Article and FAQ structured data.

---

## 5. Circular Ecosystem & Internal Linking Architecture

```
       [Google Search / Social]
                 ↓
      [In-Depth Blog Guide]
                 ↓
   [Free Interactive Tool Card]
                 ↓
  [Keyword Explorer / AI Writer]
                 ↓
 [Related Guide / Comparison Review]
                 ↓
     [Newsletter / Workspace]
```

Every blog article includes direct links to relevant free tools. Every tool features contextual links back to in-depth strategic guides.

---

## 6. Configurable Brand Identities

RankPulse includes a centralized brand config (`src/config/brand.ts`) with 10 alternative naming concepts ready to swap at any time:
1. **RankPulse** (Current default)
2. **GrowPilot**
3. **RankForge**
4. **Toolnova**
5. **GrowthKit**
6. **Rankora**
7. **ApexSEO**
8. **OmniGrowth**
9. **ContentSurge**
10. **StratifyAI**

Click the **"Switch Brand Identity"** button in the footer to preview any name instantly.
