import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Users, Zap, ShieldCheck, Download, ArrowLeft } from 'lucide-react';

interface FinancialCalculatorProps {
  onBack?: () => void;
}

export const FinancialCalculator: React.FC<FinancialCalculatorProps> = ({ onBack }) => {
  const [modelType, setModelType] = useState<'saas' | 'api' | 'newsletter' | 'templates'>('saas');
  const [traffic, setTraffic] = useState<number>(10000); // monthly visitors / requests
  const [conversionRate, setConversionRate] = useState<number>(2.5); // %
  const [avgPrice, setAvgPrice] = useState<number>(29); // $ per month / item
  const [monthlyCosts, setMonthlyCosts] = useState<number>(50); // $ server / tools
  const [automationLevel, setAutomationLevel] = useState<number>(92); // %

  // Calculations
  const payingCustomers = Math.round(traffic * (conversionRate / 100));
  const monthlyRevenue = payingCustomers * avgPrice;
  const netMonthlyProfit = Math.max(0, monthlyRevenue - monthlyCosts);
  const annualRecurringRevenue = netMonthlyProfit * 12;
  const estimatedValuation = annualRecurringRevenue * 4; // 4x ARR exit multiple

  const handleExportReport = () => {
    const report = `--- THE DIGITAL EMPIRE: FINANCIAL SIMULATOR REPORT ---
Model Type: ${modelType.toUpperCase()}
Monthly Traffic/Requests: ${traffic.toLocaleString()}
Conversion Rate: ${conversionRate}%
Paying Customers/Subscribers: ${payingCustomers.toLocaleString()}
Average Price Point: $${avgPrice}
Monthly Revenue: $${monthlyRevenue.toLocaleString()}
Monthly Operating Costs: $${monthlyCosts.toLocaleString()}
Net Monthly Profit (MRR): $${netMonthlyProfit.toLocaleString()}
Annual Recurring Revenue (ARR): $${annualRecurringRevenue.toLocaleString()}
Estimated Business Valuation (4x ARR): $${estimatedValuation.toLocaleString()}
Automation Level: ${automationLevel}%
`;
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `digital-empire-simulation-${modelType}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

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
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Calculator className="w-3.5 h-3.5" /> Interactive ROI Simulator
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif-editorial mb-3">
          Passive Income Financial Modeler
        </h1>
        <p className="text-stone-600 dark:text-stone-400 text-sm">
          Simulate revenue velocity, operating margins, valuation multiples, and automation scores for your digital service business.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-1 bg-stone-100/70 dark:bg-stone-900/70 p-6 rounded-2xl border border-stone-300 dark:border-stone-800 space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 font-mono-data">
            Model Parameters
          </h2>

          {/* Model Type Selector */}
          <div>
            <label className="block text-xs font-semibold mb-2">Business Service Model</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'saas', label: 'Micro-SaaS' },
                { id: 'api', label: 'API Micro-Service' },
                { id: 'newsletter', label: 'Paid Newsletter' },
                { id: 'templates', label: 'Digital Templates' }
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => setModelType(m.id as any)}
                  className={`p-2.5 text-xs font-semibold rounded-xl border text-left transition-all ${
                    modelType === m.id 
                      ? 'bg-amber-600 text-white border-amber-600 shadow-sm' 
                      : 'border-stone-300 dark:border-stone-700 hover:border-stone-400'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Traffic / Requests slider */}
          <div>
            <div className="flex justify-between text-xs font-medium mb-1">
              <span>Monthly Traffic / API Calls</span>
              <span className="font-mono-data text-amber-600 dark:text-amber-400">{traffic.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="500"
              max="250000"
              step="500"
              value={traffic}
              onChange={(e) => setTraffic(Number(e.target.value))}
              aria-label="Monthly Traffic / API Calls"
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>

          {/* Conversion Rate */}
          <div>
            <div className="flex justify-between text-xs font-medium mb-1">
              <span>Conversion / Paid Rate</span>
              <span className="font-mono-data text-amber-600 dark:text-amber-400">{conversionRate}%</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="15"
              step="0.5"
              value={conversionRate}
              onChange={(e) => setConversionRate(Number(e.target.value))}
              aria-label="Conversion / Paid Rate"
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>

          {/* Average Price */}
          <div>
            <div className="flex justify-between text-xs font-medium mb-1">
              <span>Avg Price / Subscription</span>
              <span className="font-mono-data text-amber-600 dark:text-amber-400">${avgPrice}/mo</span>
            </div>
            <input
              type="range"
              min="5"
              max="299"
              step="2"
              value={avgPrice}
              onChange={(e) => setAvgPrice(Number(e.target.value))}
              aria-label="Avg Price / Subscription"
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>

          {/* Monthly Operating Costs */}
          <div>
            <div className="flex justify-between text-xs font-medium mb-1">
              <span>Monthly Cloud / Tool Costs</span>
              <span className="font-mono-data text-amber-600 dark:text-amber-400">${monthlyCosts}/mo</span>
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              step="25"
              value={monthlyCosts}
              onChange={(e) => setMonthlyCosts(Number(e.target.value))}
              aria-label="Monthly Cloud / Tool Costs"
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>

          {/* Automation Level */}
          <div>
            <div className="flex justify-between text-xs font-medium mb-1">
              <span>Automation Score</span>
              <span className="font-mono-data text-amber-600 dark:text-amber-400">{automationLevel}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="99"
              step="1"
              value={automationLevel}
              onChange={(e) => setAutomationLevel(Number(e.target.value))}
              aria-label="Automation Score"
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Results / Dashboard Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-stone-900 text-stone-100 shadow-md border border-stone-800">
              <div className="flex items-center justify-between mb-3 text-stone-400">
                <span className="text-xs uppercase tracking-wider font-mono-data">Net Monthly Profit (MRR)</span>
                <DollarSign className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-3xl font-bold font-mono-data text-amber-400">
                ${netMonthlyProfit.toLocaleString()}
                <span className="text-xs text-stone-400 font-sans font-normal ml-2">/ month</span>
              </div>
              <p className="text-xs text-stone-400 mt-2">
                After deducting ${monthlyCosts} monthly cloud infrastructure costs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-amber-600 text-white shadow-md">
              <div className="flex items-center justify-between mb-3 text-amber-100">
                <span className="text-xs uppercase tracking-wider font-mono-data">Estimated Business Valuation</span>
                <TrendingUp className="w-5 h-5 text-amber-200" />
              </div>
              <div className="text-3xl font-bold font-mono-data text-white">
                ${estimatedValuation.toLocaleString()}
              </div>
              <p className="text-xs text-amber-100 mt-2">
                Calculated at a standard 4x Annual Recurring Revenue (ARR) multiple.
              </p>
            </div>
          </div>

          {/* Detailed Breakdown Card */}
          <div className="bg-stone-100/70 dark:bg-stone-900/70 p-6 rounded-2xl border border-stone-300 dark:border-stone-800 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 font-mono-data">
              Simulation Metrics & Projections
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
                <div className="text-xs text-stone-500 mb-1">Active Subscribers</div>
                <div className="text-xl font-bold font-mono-data flex items-center gap-1">
                  <Users className="w-4 h-4 text-amber-600" />
                  {payingCustomers.toLocaleString()}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
                <div className="text-xs text-stone-500 mb-1">Annual Run Rate (ARR)</div>
                <div className="text-xl font-bold font-mono-data text-emerald-600 dark:text-emerald-400">
                  ${annualRecurringRevenue.toLocaleString()}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
                <div className="text-xs text-stone-500 mb-1">Passive Automation</div>
                <div className="text-xl font-bold font-mono-data text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  {automationLevel}%
                </div>
              </div>
            </div>

            {/* Milestone Checklist */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-stone-500 font-mono-data">
                Milestone Roadmap to ${netMonthlyProfit.toLocaleString()} MRR
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Phase 1: Build MVP and validate core service with first 10 paying beta users.</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Phase 2: Establish organic distribution via app store SEO or curated community networks.</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Phase 3: Automate customer support and billing retries to reach {automationLevel}% passive operation.</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleExportReport}
              className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" /> Export Simulation Report (TXT)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
