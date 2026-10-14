export interface HandlerEvent {
  httpMethod: string;
  body: string | null;
  headers?: Record<string, string | undefined>;
}

export interface HandlerResponse {
  statusCode: number;
  headers?: Record<string, string>;
  body: string;
}

export type Handler = (event: HandlerEvent) => Promise<HandlerResponse>;

import { GoogleGenAI } from '@google/genai';

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

export const handler: Handler = async (event: HandlerEvent) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: 'ok',
        runtime: 'netlify-functions',
        geminiConfigured: !!process.env.GEMINI_API_KEY,
      }),
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { action, topic, targetKeyword, tone, wordCount, niche, timeframe, keyword, country, toolId, inputs } = body;

    if (!ai) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'GEMINI_API_KEY not configured in Netlify environment variables.',
        }),
      };
    }

    if (action === 'generate_article') {
      const prompt = `Act as an elite SEO content director. Write a structured guide for: "${topic}". Focus keyword: "${targetKeyword || topic}". Tone: "${tone || 'Authoritative'}". Word target: "${wordCount || '1500 words'}". Return JSON with keys: title, quickAnswer, keyTakeaways, tableOfContents, contentMarkdown, suggestedKeywords, faqSchema.`;
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' },
      });
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ article: JSON.parse(response.text || '{}') }),
      };
    }

    if (action === 'search_trends') {
      const prompt = `Analyze search trends and market demand velocity for: "${niche}", timeframe: "${timeframe}". Return JSON with: query, breakoutVelocity, interestScore, seasonality, competitionLevel, commercialIntent, risingQueries, recommendedContentAngles.`;
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' },
      });
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ trend: JSON.parse(response.text || '{}') }),
      };
    }

    if (action === 'analyze_keyword') {
      const targetCountry = country || 'United States (US)';
      const prompt = `Act as an elite global SEO search intelligence analyst.
Perform an in-depth keyword and SERP opportunity analysis for the seed query: "${keyword}" strictly localized for the market: "${targetCountry}".
Use local currency symbol (e.g. £ for UK, $ for US/CA/AU, € for EU, ₹ for India, ¥ for Japan), scale volume to the exact population of ${targetCountry}, provide country-specific long-tail phrases and SERP weaknesses.
Return ONLY valid JSON matching:
{
  "seedKeyword": "${keyword}",
  "country": "${targetCountry}",
  "currencySymbol": "appropriate currency symbol",
  "opportunityScore": 82,
  "searchIntent": "Commercial | Informational | Transactional | Navigational",
  "competitionIndex": "Low (Easy Win) | Moderate Competition | High Authority Only",
  "monthlyVolumeEstimate": "realistic range for ${targetCountry}",
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
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' },
      });
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ analysis: JSON.parse(response.text || '{}') }),
      };
    }

    if (action === 'run_tool') {
      const prompt = `Run tool ID "${toolId}" with inputs: ${JSON.stringify(inputs)}. Return JSON format.`;
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' },
      });
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ result: JSON.parse(response.text || '{}') }),
      };
    }

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Unsupported action' }),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err?.message || 'Server error' }),
    };
  }
};
