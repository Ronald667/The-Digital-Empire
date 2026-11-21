import React from 'react';
import { Compass, Sparkles, Cpu, Globe, Zap, ShieldAlert, ArrowLeft } from 'lucide-react';

interface FutureHorizonViewProps {
  onBack?: () => void;
}

export const FutureHorizonView: React.FC<FutureHorizonViewProps> = ({ onBack }) => {
  const predictions = [
    {
      year: "2026 - 2028",
      title: "Autonomous Agent Swarms & Micro-Corporations",
      description: "Solo founders will transition from operators to board chairs, managing specialized AI agent swarms for marketing, code deployment, and finance.",
      impact: "Reduces minimum viable team size from 5 people to 1 person while multiplying output by 10x."
    },
    {
      year: "2028 - 2031",
      title: "Agent-to-Agent (A2A) SaaS Marketplaces",
      description: "Software will no longer be built primarily for human eyes and mouse clicks. APIs will be designed for autonomous AI agents to discover, evaluate, and transact instantly.",
      impact: "B2B SaaS sales funnels will be fully automated via cryptographic agent handshakes."
    },
    {
      year: "2031 - 2035",
      title: "Decentralized Compute & API Liquidity Networks",
      description: "Compute and data storage will operate on decentralized peer-to-peer cloud nodes, eliminating single points of failure and central cloud monopolies.",
      impact: "Infrastructure costs drop near zero, enabling hyper-profitable micro-services with under $10 monthly overhead."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {onBack && (
        <button 
          onClick={onBack} 
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 mb-6 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to eBook Reader
        </button>
      )}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Compass className="w-3.5 h-3.5" /> 2026 - 2035 Horizon
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif-editorial mb-3">
          The Future of Online Services
        </h1>
        <p className="text-stone-600 dark:text-stone-400 text-sm">
          Predictive analysis on how autonomous intelligence, agentic markets, and decentralized compute will reshape leveraged passive income over the next decade.
        </p>
      </div>

      <div className="space-y-6">
        {predictions.map((p, idx) => (
          <div key={idx} className="bg-stone-100/70 dark:bg-stone-900/70 p-8 rounded-2xl border border-stone-300 dark:border-stone-800 flex flex-col md:flex-row gap-6 items-start">
            <div className="px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-mono-data font-bold shrink-0">
              {p.year}
            </div>

            <div className="space-y-3 flex-1">
              <h3 className="text-xl font-bold font-serif-editorial">
                {p.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                {p.description}
              </p>
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200">
                <span className="font-bold">Strategic Impact:</span> {p.impact}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
