import React from 'react';
import { TrendingUp, DollarSign, Award, CheckCircle2, ArrowUpRight, ArrowLeft } from 'lucide-react';

interface CaseStudiesViewProps {
  onBack?: () => void;
}

export const CaseStudiesView: React.FC<CaseStudiesViewProps> = ({ onBack }) => {
  const caseStudies = [
    {
      title: "The Automated Developer Intelligence Newsletter",
      category: "Content & Newsletter Monetization",
      mrr: "$38,400 / mo",
      valuation: "$1,800,000",
      description: "A weekly curated newsletter delivering PostgreSQL performance tips and database scaling insights to 42,000 engineering leaders.",
      stack: ["Beehiiv", "Python Scrapers", "Stripe", "Custom SMTP"],
      breakdown: [
        "3,100 Paid Subscribers at $12/mo = $37,200 MRR",
        "Sponsor slots booked 3 months in advance at $1,500 per edition ($6,000/mo)",
        "Operating costs: $450/mo (Net profit margin: 98%)"
      ],
      lesson: "Curating high-signal technical intelligence requires zero initial venture capital and builds direct, durable relationships with high-earning professionals."
    },
    {
      title: "Shopify VAT Invoice Automation Micro-SaaS",
      category: "Micro-SaaS & E-Commerce API",
      mrr: "$24,000 / mo",
      valuation: "$1,200,000 (Acquired)",
      description: "An automated plugin solving European tax compliance and custom PDF invoice generation for Shopify merchants.",
      stack: ["React / Vite", "Node.js on Cloud Run", "Puppeteer", "PostgreSQL"],
      breakdown: [
        "1,800 active merchant stores paying an average tier of $13.30/mo",
        "Zero paid advertising; 100% organic Shopify App Store SEO discovery",
        "AI documentation chatbot resolves 95% of customer support inquiries automatically"
      ],
      lesson: "Embedding your micro-SaaS inside established platform app stores (Shopify, Chrome) gives you instant access to buyers actively searching for solutions."
    },
    {
      title: "Programmatic Real Estate Data API",
      category: "API Micro-Service & Data Feeds",
      mrr: "$51,200 / mo",
      valuation: "$2,400,000",
      description: "A RESTful API endpoint providing cleaned municipal zoning and solar potential data to real estate tech startups.",
      stack: ["FastAPI", "AWS Lambda", "Supabase", "Stripe Usage-Based Metering"],
      breakdown: [
        "240 enterprise API subscribers on tiered metered billing ($199 to $999/mo)",
        "Automated cron jobs scrape and normalize county registries weekly",
        "Zero manual human intervention required for daily data ingestion"
      ],
      lesson: "B2B developers happily pay high monthly retainers for clean, pre-parsed data APIs that save their engineering teams dozens of hours of scraping work."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
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
          <TrendingUp className="w-3.5 h-3.5" /> Real-World Application
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif-editorial mb-3">
          Verified Case Studies & Financials
        </h1>
        <p className="text-stone-600 dark:text-stone-400 text-sm">
          Deep dives into real digital service businesses scaling from zero to over $50k/mo in recurring passive cash flow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {caseStudies.map((cs, idx) => (
          <div key={idx} className="bg-stone-100/70 dark:bg-stone-900/70 p-6 rounded-2xl border border-stone-300 dark:border-stone-800 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono-data font-bold tracking-wider px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400">
                  {cs.category}
                </span>
                <span className="text-xs font-mono-data text-stone-500">Case 0{idx + 1}</span>
              </div>

              <h3 className="text-xl font-bold font-serif-editorial">
                {cs.title}
              </h3>

              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                {cs.description}
              </p>

              {/* Financial metrics */}
              <div className="grid grid-cols-2 gap-3 py-3 border-y border-stone-200 dark:border-stone-800">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-stone-500 font-mono-data">Monthly Revenue</div>
                  <div className="text-base font-bold font-mono-data text-amber-600 dark:text-amber-400">{cs.mrr}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-stone-500 font-mono-data">Valuation Exit</div>
                  <div className="text-base font-bold font-mono-data text-emerald-600 dark:text-emerald-400">{cs.valuation}</div>
                </div>
              </div>

              {/* Breakdown */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 font-mono-data">Financial Breakdown</div>
                <ul className="space-y-1.5 text-xs">
                  {cs.breakdown.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 opacity-90">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {cs.stack.map((tech, tIdx) => (
                  <span key={tIdx} className="text-[10px] font-mono-data px-2 py-1 rounded-md bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800">
              <p className="text-[11px] italic text-stone-600 dark:text-stone-400">
                <span className="font-bold not-italic">Key Takeaway:</span> {cs.lesson}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
