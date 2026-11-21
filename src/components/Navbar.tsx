import React from 'react';
import { BookOpen, Calculator, Sparkles, TrendingUp, Compass, Bookmark } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  bookmarksCount: number;
  onOpenBookmarks: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  bookmarksCount,
  onOpenBookmarks,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 text-stone-100 px-6 py-4 flex items-center justify-between gap-8 transition-all">
      {/* Zone 1: Brand Wordmark */}
      <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => setActiveTab('reader')}>
        <div className="w-9 h-9 rounded-lg bg-amber-600 flex items-center justify-center text-white shadow-md">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap">
            The Digital Empire
          </span>
          <span className="hidden sm:block text-[10px] tracking-widest uppercase text-amber-400 font-mono-data">
            Passive Income & Digital Services
          </span>
        </div>
      </div>

      {/* Zone 2: Navigation Links */}
      <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-300">
        <button
          onClick={() => setActiveTab('reader')}
          className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            activeTab === 'reader' ? 'text-amber-400 font-semibold' : 'hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" /> eBook Reader
        </button>
        <button
          onClick={() => setActiveTab('calculator')}
          className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            activeTab === 'calculator' ? 'text-amber-400 font-semibold' : 'hover:text-white'
          }`}
        >
          <Calculator className="w-4 h-4" /> ROI Simulator
        </button>
        <button
          onClick={() => setActiveTab('ai-advisor')}
          className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            activeTab === 'ai-advisor' ? 'text-amber-400 font-semibold' : 'hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" /> AI Strategy Advisor
        </button>
        <button
          onClick={() => setActiveTab('cases')}
          className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            activeTab === 'cases' ? 'text-amber-400 font-semibold' : 'hover:text-white'
          }`}
        >
          <TrendingUp className="w-4 h-4" /> Case Studies
        </button>
        <button
          onClick={() => setActiveTab('future')}
          className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            activeTab === 'future' ? 'text-amber-400 font-semibold' : 'hover:text-white'
          }`}
        >
          <Compass className="w-4 h-4" /> 2035 Horizon
        </button>
      </nav>

      {/* Zone 3: Primary Action & Bookmarks */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenBookmarks}
          className="relative p-2 text-stone-300 hover:text-white hover:bg-stone-800 rounded-lg transition-colors flex items-center gap-1 text-xs font-medium"
          title="Saved Bookmarks"
        >
          <Bookmark className="w-4 h-4" />
          <span className="hidden sm:inline">Bookmarks</span>
          {bookmarksCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-500 text-stone-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {bookmarksCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('ai-advisor')}
          className="px-4 py-2 text-xs font-semibold text-stone-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors whitespace-nowrap shrink-0 shadow-sm flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" /> Build Strategy
        </button>
      </div>
    </header>
  );
};
