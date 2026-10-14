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
      const prompt = `Perform comprehensive keyword analysis for: "${keyword}", country: "${country}". Calculate Opportunity Score (0-100). Return JSON with: seedKeyword, opportunityScore, searchIntent, competitionIndex, monthlyVolumeEstimate, cpcEstimate, easyWin, relatedLongTail, questionQueries, semanticClusters, serpGaps.`;
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
