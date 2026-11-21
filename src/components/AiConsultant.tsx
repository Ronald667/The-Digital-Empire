import React, { useState } from 'react';
import { Sparkles, Loader2, ArrowRight, CheckCircle2, Bot, ShieldAlert, ArrowLeft } from 'lucide-react';

interface AiConsultantProps {
  onBack?: () => void;
}

export const AiConsultant: React.FC<AiConsultantProps> = ({ onBack }) => {
  const [skillLevel, setSkillLevel] = useState('Intermediate (Knows basic code/tools)');
  const [capital, setCapital] = useState('$500 - $1,000');
  const [hoursPerWeek, setHoursPerWeek] = useState('10 - 15 hours');
  const [niche, setNiche] = useState('API Micro-Services & Developer Tools');
  const [goal, setGoal] = useState('$5,000 / month recurring revenue');
  
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai-consultant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skillLevel,
          capital,
          hoursPerWeek,
          niche,
          goal,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setAdvice(data.advice);
      } else {
        setError(data.error || 'Failed to generate strategy.');
      }
    } catch (err: any) {
      setError(err.message || 'Network error occurred while reaching AI consultant.');
    } finally {
      setLoading(false);
    }
  };

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
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" /> AI Strategy Advisor
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif-editorial mb-3">
          Your Personal Passive Income Architect
        </h1>
        <p className="text-stone-600 dark:text-stone-400 text-sm">
          Powered by Gemini AI. Input your current resources, skills, and goals to generate a bespoke 90-day execution blueprint for digital services.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form Column */}
        <form onSubmit={handleSubmit} className="lg:col-span-1 bg-stone-100/70 dark:bg-stone-900/70 p-6 rounded-2xl border border-stone-300 dark:border-stone-800 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 font-mono-data mb-2">
            Founder Profile
          </h2>

          <div>
            <label className="block text-xs font-semibold mb-1">Your Skill Level</label>
            <select
              value={skillLevel}
              onChange={(e) => setSkillLevel(e.target.value)}
              aria-label="Your Skill Level"
              className="w-full bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none"
            >
              <option>Beginner (No coding experience)</option>
              <option>Intermediate (Knows basic code/tools)</option>
              <option>Advanced (Full-stack engineer / founder)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Available Capital</label>
            <select
              value={capital}
              onChange={(e) => setCapital(e.target.value)}
              aria-label="Available Capital"
              className="w-full bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none"
            >
              <option>$0 - $100 (Bootstrapped)</option>
              <option>$100 - $500</option>
              <option>$500 - $1,000</option>
              <option>$1,000+</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Hours Per Week</label>
            <select
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(e.target.value)}
              aria-label="Hours Per Week"
              className="w-full bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none"
            >
              <option>5 - 10 hours</option>
              <option>10 - 15 hours</option>
              <option>20 - 30 hours</option>
              <option>Full-time (40+ hours)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Preferred Niche / Model</label>
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="e.g., Micro-SaaS, Newsletter, API, Templates"
              className="w-full bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Target Financial Goal</label>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g., $3,000 / month recurring revenue"
              className="w-full bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm disabled:opacity-50 mt-4"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Generating Blueprint...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Generate AI Strategy Blueprint
              </>
            )}
          </button>
        </form>

        {/* Output Blueprint Column */}
        <div className="lg:col-span-2 bg-stone-100/70 dark:bg-stone-900/70 p-8 rounded-2xl border border-stone-300 dark:border-stone-800">
          {!advice && !loading && (
            <div className="h-full flex flex-col items-center justify-center text-center py-20 text-stone-500 space-y-3">
              <Bot className="w-12 h-12 text-amber-600 opacity-60" />
              <h3 className="text-base font-semibold">Your Blueprint Awaits</h3>
              <p className="text-xs max-w-sm">
                Configure your founder profile on the left and click generate to receive your customized 90-day digital service strategy.
              </p>
            </div>
          )}

          {loading && (
            <div className="h-full flex flex-col items-center justify-center text-center py-20 text-stone-500 space-y-3">
              <Loader2 className="w-10 h-10 text-amber-600 animate-spin" />
              <p className="text-xs font-medium animate-pulse">
                Synthesizing market intelligence and generating your custom playbook...
              </p>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-800 dark:text-rose-300 text-xs flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 mt-0.5 shrink-0" />
              <div>
                <span className="font-bold">Error: </span> {error}
              </div>
            </div>
          )}

          {advice && !loading && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" /> Customized 90-Day Strategy Ready
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(advice)}
                  className="px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 text-xs font-medium hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
                >
                  Copy Markdown
                </button>
              </div>

              <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed space-y-4">
                {advice.split('\n\n').map((para, idx) => {
                  if (para.startsWith('### ') || para.startsWith('## ')) {
                    return (
                      <h3 key={idx} className="text-base sm:text-lg font-bold font-serif-editorial text-amber-700 dark:text-amber-400 mt-4 mb-2">
                        {para.replace(/^[#]+\s*/, '')}
                      </h3>
                    );
                  }
                  if (para.startsWith('* ') || para.startsWith('- ')) {
                    return (
                      <ul key={idx} className="list-disc pl-5 space-y-1.5">
                        {para.split('\n').map((li, i) => (
                          <li key={i} className="opacity-90">{li.replace(/^[*-]\s*/, '')}</li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={idx} className="opacity-90">{para}</p>;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
