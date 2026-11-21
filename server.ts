import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  app.use(express.json());

  // Initialize Google GenAI server-side client
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // API route for AI Passive Income Consultant / Strategy Generator
  app.post('/api/ai-consultant', async (req, res) => {
    try {
      const { skillLevel, capital, hoursPerWeek, niche, goal } = req.body;

      const prompt = `You are an expert digital entrepreneur, SaaS architect, and passive income strategist.
Generate a tailored, highly actionable 90-day passive income blueprint based on the following user profile:
- Skill Level: ${skillLevel || 'Beginner / Intermediate'}
- Available Capital: ${capital || '$500 - $1,000'}
- Available Hours per Week: ${hoursPerWeek || '10-15 hours'}
- Area of Interest / Niche: ${niche || 'API micro-services & digital content'}
- Target Financial Goal: ${goal || '$3,000/month recurring passive income'}

Please provide:
1. Executive Summary & Recommended Business Model (SaaS, API, Digital Product, Content/Newsletter network, etc.)
2. Phase-by-Phase 90-Day Action Plan (Weeks 1-4, 5-8, 9-12) with exact online services, tech stacks, and tools to leverage.
3. Monetization Strategy & Pricing Tiers.
4. Automation & Scaling Playbook (How to achieve 90%+ passive operation).
5. Risk Mitigation & Common Pitfalls to Avoid for beginners and advanced entrepreneurs alike.

Format your response in clean Markdown with clear headings and bullet points.`;

      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: prompt,
        config: {
          systemInstruction: 'You are a master digital strategist and passive income mentor who provides precise, actionable, and realistic business blueprints.',
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW }
        }
      });

      res.json({ success: true, advice: response.text });
    } catch (error: any) {
      console.error('AI Consultant Error:', error);
      res.status(500).json({ 
        success: false, 
        error: error.message || 'Failed to generate AI strategy. Please check your Gemini API key in Settings > Secrets.' 
      });
    }
  });

  // Vite middleware for development
  const isProduction = process.env.NODE_ENV === 'production';
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startServer();
