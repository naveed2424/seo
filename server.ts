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

// Central Gemini Generation Endpoint
app.post('/api/gemini/generate', async (req: Request, res: Response) => {
  try {
    const { action, topic, targetKeyword, tone, wordCount, niche, timeframe, keyword, country, toolId, inputs } = req.body;

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
      const prompt = `Act as an elite SEO keyword research specialist.
Analyze the seed keyword: "${keyword}" for country: "${country || 'US'}".
Calculate our proprietary Opportunity Score (0-100) based on search intent, competition weakness, and commercial viability.
Return ONLY valid JSON matching this schema:
{
  "seedKeyword": "${keyword}",
  "opportunityScore": 85,
  "searchIntent": "Commercial",
  "competitionIndex": "Low (Easy Win)",
  "monthlyVolumeEstimate": "1,200 - 3,500 (Demand Estimate)",
  "cpcEstimate": "$2.80 - $4.50",
  "easyWin": true,
  "relatedLongTail": [
    {"keyword": "long-tail keyword 1", "intent": "Commercial", "opportunity": 92},
    {"keyword": "long-tail keyword 2", "intent": "Informational", "opportunity": 84},
    {"keyword": "long-tail keyword 3", "intent": "Transactional", "opportunity": 88}
  ],
  "questionQueries": [
    {"question": "How to question 1?", "searcherPain": "specific friction point"},
    {"question": "What is question 2?", "searcherPain": "specific friction point"}
  ],
  "semanticClusters": [
    {"clusterName": "Cluster 1", "keywords": ["kw1", "kw2", "kw3"]},
    {"clusterName": "Cluster 2", "keywords": ["kw4", "kw5", "kw6"]}
  ],
  "serpGaps": [
    "Identified weakness 1 in current ranking pages",
    "Identified weakness 2 in current ranking pages"
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
