import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Google GenAI on the server side
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health Check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    geminiConfigured: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

// Fast server-side LRU-style cache
const serverSemrushCache = new Map<string, any>();

// Central Gemini Generation Endpoint
app.post('/api/gemini/generate', async (req: Request, res: Response) => {
  try {
    const { action, topic, targetKeyword, tone, wordCount, niche, timeframe, keyword, country, countryCode, toolId, inputs, query, isDomain } = req.body;

    if (!ai) {
      // If no API key configured on server, return 400 so client fallback seamlessly executes
      return res.status(400).json({
        error: 'GEMINI_API_KEY is not configured on the server. Falling back to local engine.',
      });
    }

    if (action === 'generate_article') {
      const prompt = `You are a world-class senior technical SEO strategist and editorial director for a top online business publication.
Generate an in-depth, original, high-value guide for the topic: "${topic}".
Target SEO Keyword: "${targetKeyword || topic}".
Tone: "${tone || 'Authoritative & Practical'}".
Target Length: "${wordCount || '1500 words'}".

CRITICAL E-E-A-T INSTRUCTIONS:
- Do NOT write generic AI fluff. Write with concrete examples, realistic figures, and deep tactical specificity.
- Return ONLY valid JSON with this exact structure:
{
  "title": "Compelling, high-CTR H1 Title",
  "quickAnswer": "40-75 word concise, direct answer to the query without filler.",
  "keyTakeaways": ["3-5 actionable bullet points summarizing key takeaways."],
  "tableOfContents": [
    {"id": "section-1-id", "label": "1. Section Name"},
    {"id": "section-2-id", "label": "2. Section Name"},
    {"id": "section-3-id", "label": "3. Section Name"}
  ],
  "contentMarkdown": "Full long-form guide in markdown using H3 headings matching tableOfContents IDs, comparison tables, step-by-step checklists, and actionable insights.",
  "suggestedKeywords": ["4-6 related long-tail keywords"],
  "faqSchema": [
    {"question": "Frequent Question 1", "answer": "Clear, direct answer."},
    {"question": "Frequent Question 2", "answer": "Clear, direct answer."}
  ]
}`;

      const aiResponse = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const responseText = aiResponse.text || '{}';
      const article = JSON.parse(responseText);
      return res.json({ article });
    }

    if (action === 'search_trends') {
      const prompt = `Act as a Google Trends and SEO search demand analyst.
Analyze current search trends and market breakout velocity for the niche: "${niche}".
Trend Timeframe: "${timeframe || 'Past 90 Days'}".

Return ONLY valid JSON matching this schema:
{
  "query": "${niche}",
  "breakoutVelocity": "+380% (Breakout Surge)",
  "interestScore": 89,
  "seasonality": "High in Q3/Q4, steady year-round baseline",
  "competitionLevel": "Medium",
  "commercialIntent": "High",
  "risingQueries": [
    {"query": "related rising query 1", "growth": "+420%", "intent": "Commercial"},
    {"query": "related rising query 2", "growth": "+280%", "intent": "Transactional"},
    {"query": "related rising query 3", "growth": "+190%", "intent": "Informational"}
  ],
  "recommendedContentAngles": [
    "High-CTR content angle 1",
    "High-CTR content angle 2",
    "High-CTR content angle 3"
  ]
}`;

      const aiResponse = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const responseText = aiResponse.text || '{}';
      const trend = JSON.parse(responseText);
      return res.json({ trend });
    }

    if (action === 'analyze_keyword') {
      const targetCountry = country || 'United States (US)';
      const prompt = `Act as an elite global SEO search intelligence analyst.
Perform an in-depth keyword and SERP opportunity analysis for the seed query: "${keyword}" strictly localized for the market: "${targetCountry}".

CRITICAL INSTRUCTIONS FOR ACCURACY & COUNTRY LOCALIZATION:
1. CURRENCY & CPC: Use the exact local currency symbol of ${targetCountry} (e.g., £ for UK, $ for US/CA/AU, € for EU/Germany/France/Spain/Italy, ₹ for India, ¥ for Japan, R$ for Brazil, S$ for Singapore).
2. REALISTIC VOLUME: Scale the monthly search demand realistically for ${targetCountry}'s population and digital market size. Do not give the same volume for US as UK or Australia.
3. LOCALIZED LONG-TAIL: Generate 6 distinct long-tail keywords containing regional terms, spellings, and buying patterns for ${targetCountry} (e.g. for UK: include 'UK', 'in UK', 'near me', British phrasing; for Australia: 'AU', 'Australia'; for India: 'in India', 'online India', etc.).
4. QUESTIONS: 3 authentic pain-point questions searchers in ${targetCountry} ask.
5. SERP GAPS: Mention specific local ranking weaknesses and country-specific domains (e.g., .co.uk, .gov.uk, BBC for UK; .com, .gov for US; .de for Germany).
6. OPPORTUNITY SCORE: Compute a unique 0-100 score based on local market saturation.

Return ONLY valid JSON matching this schema:
{
  "seedKeyword": "${keyword}",
  "country": "${targetCountry}",
  "currencySymbol": "appropriate currency symbol",
  "opportunityScore": 82,
  "searchIntent": "Commercial | Informational | Transactional | Navigational",
  "competitionIndex": "Low (Easy Win) | Moderate Competition | High Authority Only",
  "monthlyVolumeEstimate": "specific realistic range for ${targetCountry}",
  "cpcEstimate": "realistic local currency range e.g. £1.80 - £3.40 or $2.50 - $4.10",
  "easyWin": true,
  "marketInsight": "1-2 sentences on how this keyword performs uniquely in ${targetCountry}",
  "relatedLongTail": [
    {"keyword": "localized keyword 1", "intent": "Commercial", "opportunity": 88},
    {"keyword": "localized keyword 2", "intent": "Transactional", "opportunity": 84},
    {"keyword": "localized keyword 3", "intent": "Informational", "opportunity": 79},
    {"keyword": "localized keyword 4", "intent": "Commercial", "opportunity": 91},
    {"keyword": "localized keyword 5", "intent": "Informational", "opportunity": 82},
    {"keyword": "localized keyword 6", "intent": "Transactional", "opportunity": 86}
  ],
  "questionQueries": [
    {"question": "Country-specific question 1?", "searcherPain": "specific local friction point"},
    {"question": "Country-specific question 2?", "searcherPain": "specific local friction point"},
    {"question": "Country-specific question 3?", "searcherPain": "specific local friction point"}
  ],
  "semanticClusters": [
    {"clusterName": "Cluster 1 Name", "keywords": ["kw1", "kw2", "kw3"]},
    {"clusterName": "Cluster 2 Name", "keywords": ["kw4", "kw5", "kw6"]}
  ],
  "serpGaps": [
    "Specific weakness in ${targetCountry} ranking pages 1",
    "Specific weakness in ${targetCountry} ranking pages 2",
    "Specific weakness in ${targetCountry} ranking pages 3"
  ]
}`;

      const aiResponse = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const responseText = aiResponse.text || '{}';
      const analysis = JSON.parse(responseText);
      return res.json({ analysis });
    }

    if (action === 'analyze_keyword_semrush') {
      const targetCountry = country || 'United States';
      const cacheKey = `${String(query).toLowerCase().trim()}__${String(countryCode || targetCountry).toUpperCase()}`;

      if (serverSemrushCache.has(cacheKey)) {
        return res.json({ analysis: serverSemrushCache.get(cacheKey) });
      }

      const prompt = `Act as an elite global SEO intelligence analyst replicating an enterprise data engine.
Perform an in-depth keyword analysis or domain audit for: "${query}" in country: "${targetCountry}".
Is Domain Audit: ${isDomain ? 'true' : 'false'}.
Return ONLY valid JSON matching the data schema with:
- query: string
- isDomain: boolean
- country: string
- countryCode: string
- currencySymbol: string
- monthlyVolume: string (e.g. "45.2K")
- monthlyVolumeNumeric: number
- globalVolume: string (e.g. "160.5K")
- countryBreakdown: array of { country: string, flag: string, volume: string, sharePercent: number }
- trend12Months: array of exactly 12 integers between 10 and 100
- kdPercent: integer 0-100
- kdStatus: { label: "Very Easy" | "Easy" | "Possible" | "Difficult" | "Hard" | "Very Hard", color: string, description: string }
- searchIntent: { primary: "Informational" | "Commercial" | "Transactional" | "Navigational", badge: "I" | "C" | "T" | "N", description: string }
- cpc: string
- competitiveDensity: number (0.00 to 1.00)
- serpFeatures: array of string feature names
- broadMatch: array of { keyword, intent: "I"|"C"|"T"|"N", volume, volumeNumeric, kd, cpc, competitiveDensity, trend: number[] }
- phraseMatch: array of same
- exactMatch: array of same
- relatedKeywords: array of same
- questions: array of { question, volume, kd, answerSnippet: string }
- serpTop10: array of { rank, title, url, domainAuthority, pageAuthority, backlinks, refDomains, traffic }
- marketInsight: string (strictly a single readable sentence summarizing country market potential, NEVER return an object)
${isDomain ? '- domainAudit: { domain: string, authorityScore: number, organicTrafficMonthly: string, organicKeywordsTotal: string, paidTrafficMonthly: string, topRankingKeywords: array, mainCompetitors: array }' : ''}`;

      const aiResponse = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' },
      });

      const responseText = aiResponse.text || '{}';
      const analysis = JSON.parse(responseText);

      // Save to server cache
      serverSemrushCache.set(cacheKey, analysis);
      return res.json({ analysis });
    }

    if (action === 'generate_24h_trend_article') {
      const prompt = `Act as a senior technical SEO research fellow.
Write an exhaustive, high-authority master guide for the trending topic: "${topic}".
Target word count: strictly 3,800+ words.
Structure must include:
- H1 title with compelling CTR
- Google AI Overview Quick Answer (50 words)
- 5 Executive Key Takeaways
- 8 detailed sections with comparison tables, statistical benchmark data, step-by-step blueprints, and case studies
- GEO and regional search intent analysis for US, UK, EU, and Global markets
- E-E-A-T credentials and primary source citations
- Circular internal backlinks to rank2seo free keyword explorer and SEO intelligence tools
- Schema.org FAQ questions and answers
Return ONLY valid JSON.`;

      const aiResponse = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' },
      });

      const responseText = aiResponse.text || '{}';
      const article = JSON.parse(responseText);
      return res.json({ article });
    }

    if (action === 'run_tool') {
      const prompt = `You are a specialized business and SEO utility AI.
Execute tool ID: "${toolId}" with inputs: ${JSON.stringify(inputs)}.
Provide high-value, precise, actionable output in valid JSON.`;

      const aiResponse = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const responseText = aiResponse.text || '{}';
      const result = JSON.parse(responseText);
      return res.json({ result });
    }

    return res.status(400).json({ error: 'Unknown action specified.' });
  } catch (err: any) {
    console.error('Server Gemini Error:', err);
    return res.status(500).json({
      error: 'An error occurred during AI processing.',
      details: err?.message,
    });
  }
});

// Dev server with Vite middlewares
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`RankPulse Server running on port ${PORT}`);
  });
}

startServer();
