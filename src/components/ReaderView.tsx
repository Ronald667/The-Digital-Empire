import React, { useState, useEffect } from 'react';
import { Chapter } from '../types';
import { CHAPTERS } from '../data/ebookContent';
import { 
  BookOpen, Bookmark, Volume2, VolumeX, CheckCircle2, 
  ChevronRight, ChevronLeft, Award, Sparkles, Sliders, HelpCircle, ArrowRight,
  Highlighter, Trash2
} from 'lucide-react';

interface HighlightItem {
  id: string;
  chapterId: number;
  text: string;
  timestamp: number;
}

interface ReaderViewProps {
  bookmarks: number[];
  onToggleBookmark: (id: number) => void;
  onNavigateToAdvisor: () => void;
}

export const ReaderView: React.FC<ReaderViewProps> = ({
  bookmarks,
  onToggleBookmark,
  onNavigateToAdvisor,
}) => {
  const [selectedId, setSelectedId] = useState<number>(0);
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans'>('serif');
  const [theme, setTheme] = useState<'sepia' | 'dark' | 'light'>('sepia');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});
  const [showExplanation, setShowExplanation] = useState<{ [key: number]: boolean }>({});
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  
  const [highlights, setHighlights] = useState<HighlightItem[]>(() => {
    try {
      const saved = localStorage.getItem('digital_empire_highlights');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [selectedText, setSelectedText] = useState<string>('');

  const currentChapter: Chapter = CHAPTERS.find(c => c.id === selectedId) || CHAPTERS[0];
  const isBookmarked = bookmarks.includes(currentChapter.id);

  // Persist highlights to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('digital_empire_highlights', JSON.stringify(highlights));
    } catch (e) {
      console.error(e);
    }
  }, [highlights]);

  // Scroll to top and reset progress when chapter changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setScrollProgress(0);
    setSelectedText('');
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [selectedId]);

  // Track scroll depth for progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentScroll = window.scrollY;
        const progress = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle text selection for highlighting
  const handleMouseUp = () => {
    const selection = window.getSelection();
    const text = selection ? selection.toString().trim() : '';
    if (text.length > 3) {
      setSelectedText(text);
    }
  };

  const handleSaveHighlight = () => {
    if (!selectedText) return;
    const newHighlight: HighlightItem = {
      id: Math.random().toString(36).substring(2, 9),
      chapterId: selectedId,
      text: selectedText,
      timestamp: Date.now()
    };
    setHighlights(prev => [newHighlight, ...prev]);
    setSelectedText('');
    window.getSelection()?.removeAllRanges();
  };

  const handleDeleteHighlight = (id: string) => {
    setHighlights(prev => prev.filter(h => h.id !== id));
  };

  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in your browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const textToRead = `${currentChapter.title}. ${currentChapter.subtitle}. ${currentChapter.content.replace(/#/g, '')}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    setQuizAnswers(prev => ({ ...prev, [questionIndex]: optionIndex }));
    setShowExplanation(prev => ({ ...prev, [questionIndex]: true }));
  };

  // Theme classes
  const themeClasses = {
    sepia: 'bg-[#FBF9F5] text-[#292524] border-stone-200',
    dark: 'bg-stone-950 text-stone-100 border-stone-800',
    light: 'bg-white text-stone-900 border-stone-200'
  }[theme];

  const sidebarClasses = {
    sepia: 'bg-[#F3EFEA] border-stone-300 text-stone-800',
    dark: 'bg-stone-900 border-stone-800 text-stone-200',
    light: 'bg-stone-50 border-stone-200 text-stone-800'
  }[theme];

  const fontClasses = fontFamily === 'serif' ? 'font-serif-editorial' : 'font-sans';
  const sizeClasses = {
    sm: 'text-sm leading-relaxed',
    md: 'text-base leading-relaxed',
    lg: 'text-lg leading-loose'
  }[fontSize];

  const chapterHighlights = highlights.filter(h => h.chapterId === selectedId);

  return (
    <div className={`min-h-[calc(100vh-73px)] flex flex-col transition-colors ${themeClasses}`}>
      {/* Sticky Scroll Progress Bar at the Top */}
      <div className="sticky top-[73px] z-30 w-full h-1 bg-stone-200/50 dark:bg-stone-800">
        <div 
          className="h-full bg-amber-500 transition-all duration-100 ease-out" 
          style={{ width: `${scrollProgress}%` }}
          aria-label="Reading progress"
        />
      </div>

      <div className="flex flex-col lg:flex-row flex-1">
        {/* Sidebar: Table of Contents & Highlights */}
        <aside className={`w-full lg:w-80 border-r p-6 shrink-0 overflow-y-auto ${sidebarClasses}`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 font-mono-data">
              Table of Contents
            </h2>
            <span className="text-xs text-stone-500 font-mono-data">
              {CHAPTERS.length} Chapters
            </span>
          </div>

          <div className="space-y-2 mb-8">
            {CHAPTERS.map((ch) => {
              const active = ch.id === selectedId;
              const bookmarked = bookmarks.includes(ch.id);
              return (
                <button
                  key={ch.id}
                  onClick={() => setSelectedId(ch.id)}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 group ${
                    active 
                      ? 'bg-amber-600 text-white shadow-md' 
                      : 'hover:bg-stone-200/50 dark:hover:bg-stone-800/60'
                  }`}
                >
                  <span className={`text-xs font-mono-data font-bold mt-0.5 shrink-0 ${active ? 'text-amber-200' : 'text-stone-400'}`}>
                    0{ch.id}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-semibold truncate ${active ? 'text-white' : ''}`}>
                      {ch.title.split(':')[0]}
                    </div>
                    <div className={`text-xs truncate opacity-80 ${active ? 'text-amber-100' : 'text-stone-500'}`}>
                      {ch.readTime}
                    </div>
                  </div>
                  {bookmarked && (
                    <Bookmark className={`w-3.5 h-3.5 mt-1 shrink-0 ${active ? 'text-amber-200 fill-amber-200' : 'text-amber-600 fill-amber-600'}`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Saved Highlights Section */}
          <div className="border-t border-stone-300 dark:border-stone-800 pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 font-mono-data flex items-center gap-1.5">
                <Highlighter className="w-3.5 h-3.5" /> Highlights ({highlights.length})
              </h3>
            </div>
            {highlights.length === 0 ? (
              <p className="text-xs text-stone-500 italic">
                Select any text in the reading area to save highlights.
              </p>
            ) : (
              <div className="space-y-2.5 max-h-60 overflow-y-auto">
                {highlights.map(h => (
                  <div key={h.id} className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs relative group">
                    <div className="font-semibold text-amber-800 dark:text-amber-300 mb-1">
                      Chapter 0{h.chapterId}
                    </div>
                    <p className="opacity-95 line-clamp-3">"{h.text}"</p>
                    <button
                      onClick={() => handleDeleteHighlight(h.id)}
                      className="absolute top-2 right-2 text-stone-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Delete highlight"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AI Callout Banner in Sidebar */}
          <div className="mt-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-stone-800 dark:text-stone-200">
            <div className="flex items-center gap-2 mb-2 text-amber-700 dark:text-amber-400 font-semibold text-sm">
              <Sparkles className="w-4 h-4" /> Want a Custom Strategy?
            </div>
            <p className="text-xs mb-3 opacity-90">
              Generate your personalized 90-day passive income blueprint using our AI Strategy Advisor.
            </p>
            <button
              onClick={onNavigateToAdvisor}
              className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors shadow-sm"
            >
              Launch AI Advisor <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>

        {/* Main Reading Canvas */}
        <main className="flex-1 max-w-4xl mx-auto px-6 sm:px-12 py-10" onMouseUp={handleMouseUp}>
          {/* Reading Controls Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-300 dark:border-stone-800">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-wider font-mono-data text-stone-500">
                Chapter {currentChapter.id} of {CHAPTERS.length - 1}
              </span>
              <span aria-hidden="true" className="text-stone-400">·</span>
              <span className="text-xs uppercase tracking-wider font-mono-data text-amber-700 dark:text-amber-400 font-semibold">
                {currentChapter.category}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Audio narration button */}
              <button
                onClick={toggleSpeech}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors border ${
                  isSpeaking 
                    ? 'bg-amber-600 text-white border-amber-600 animate-pulse' 
                    : 'bg-stone-100 dark:bg-stone-900 border-stone-300 dark:border-stone-700 hover:border-amber-500'
                }`}
                title="Listen to chapter narration"
              >
                {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isSpeaking ? 'Stop Audio' : 'Listen'}</span>
              </button>

              {/* Bookmark button */}
              <button
                onClick={() => onToggleBookmark(currentChapter.id)}
                className={`p-1.5 rounded-lg border transition-colors ${
                  isBookmarked 
                    ? 'bg-amber-500/10 border-amber-500 text-amber-600' 
                    : 'border-stone-300 dark:border-stone-700 hover:border-stone-400'
                }`}
                title="Bookmark chapter"
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-600' : ''}`} />
              </button>

              {/* Font style toggle */}
              <button
                onClick={() => setFontFamily(prev => prev === 'serif' ? 'sans' : 'serif')}
                className="px-2.5 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 text-xs font-medium hover:bg-stone-200 dark:hover:bg-stone-800"
                title="Toggle Font Family"
              >
                {fontFamily === 'serif' ? 'Serif' : 'Sans'}
              </button>

              {/* Theme switcher */}
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as any)}
                aria-label="Select theme"
                className="bg-transparent border border-stone-300 dark:border-stone-700 rounded-lg px-2.5 py-1.5 text-xs font-medium focus:outline-none"
              >
                <option value="sepia">Sepia Paper</option>
                <option value="dark">Dark Mode</option>
                <option value="light">Crisp White</option>
              </select>
            </div>
          </div>

          {/* Chapter Header */}
          <div className="mb-10">
            {selectedId > 0 && (
              <button
                onClick={() => setSelectedId(prev => Math.max(0, prev - 1))}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 mb-4 hover:underline"
              >
                <ChevronLeft className="w-4 h-4" /> Back to Chapter 0{selectedId - 1}
              </button>
            )}
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 font-serif-editorial">
              {currentChapter.title}
            </h1>
            <p className="text-lg opacity-80 font-medium">
              {currentChapter.subtitle}
            </p>
          </div>

          {/* Chapter Body Content */}
          <div className={`prose dark:prose-invert max-w-none space-y-6 ${fontClasses} ${sizeClasses}`}>
            {currentChapter.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-2xl font-bold mt-8 mb-4 font-serif-editorial text-amber-700 dark:text-amber-400">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-xl font-semibold mt-6 mb-3 font-serif-editorial">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('* ') || paragraph.startsWith('- ')) {
                return (
                  <ul key={index} className="list-disc pl-5 space-y-2 my-4">
                    {paragraph.split('\n').map((item, i) => (
                      <li key={i} className="opacity-90">
                        {item.replace(/^[*-]\s*/, '')}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={index} className="leading-relaxed opacity-95">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Key Takeaways Section */}
          <div className="mt-12 p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-center gap-2 mb-4 text-amber-700 dark:text-amber-400 font-bold text-base">
              <Award className="w-5 h-5" /> Key Takeaways
            </div>
            <ul className="space-y-3">
              {currentChapter.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm opacity-90">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actionable Steps for Beginners & Advanced */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-stone-300 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-900/50">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-3 font-mono-data">
                Beginner Action Steps
              </h3>
              <ul className="space-y-2.5">
                {currentChapter.actionSteps.beginner.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs opacity-90">
                    <span className="w-5 h-5 rounded-full bg-amber-600/20 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-2xl border border-stone-300 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-900/50">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-3 font-mono-data">
                Advanced Entrepreneur Steps
              </h3>
              <ul className="space-y-2.5">
                {currentChapter.actionSteps.advanced.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs opacity-90">
                    <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Chapter Quiz Section */}
          <div className="mt-12 p-8 rounded-2xl border border-stone-300 dark:border-stone-800 bg-stone-100/30 dark:bg-stone-900/30">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-bold font-serif-editorial">Chapter Knowledge Check</h3>
            </div>

            <div className="space-y-8">
              {currentChapter.quiz.map((q, qIdx) => {
                const selectedOption = quizAnswers[qIdx];
                const isAnswered = selectedOption !== undefined;
                const isCorrect = selectedOption === q.correctIndex;

                return (
                  <div key={qIdx} className="space-y-3 pb-6 border-b border-stone-200 dark:border-stone-800 last:border-none">
                    <p className="text-sm font-semibold">
                      {qIdx + 1}. {q.question}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => {
                        let btnStyle = "border-stone-300 dark:border-stone-700 hover:border-amber-500";
                        if (isAnswered) {
                          if (optIdx === q.correctIndex) {
                            btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-semibold";
                          } else if (optIdx === selectedOption) {
                            btnStyle = "bg-rose-500/20 border-rose-500 text-rose-800 dark:text-rose-300";
                          }
                        }
                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleAnswerSelect(qIdx, optIdx)}
                            className={`p-3 text-left text-xs rounded-xl border transition-all ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {showExplanation[qIdx] && (
                      <div className={`p-3 rounded-lg text-xs mt-2 ${isCorrect ? 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300' : 'bg-amber-500/10 text-amber-800 dark:text-amber-300'}`}>
                        <span className="font-bold">{isCorrect ? 'Correct! ' : 'Explanation: '}</span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chapter Navigation Footer */}
          <div className="mt-12 pt-6 border-t border-stone-300 dark:border-stone-800 flex items-center justify-between">
            <button
              onClick={() => setSelectedId(prev => Math.max(0, prev - 1))}
              disabled={selectedId === 0}
              className={`px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-1 transition-colors ${
                selectedId === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-stone-200 dark:hover:bg-stone-800'
              }`}
            >
              <ChevronLeft className="w-4 h-4" /> Previous Chapter
            </button>
            
            <button
              onClick={() => setSelectedId(prev => Math.min(CHAPTERS.length - 1, prev + 1))}
              disabled={selectedId === CHAPTERS.length - 1}
              className={`px-4 py-2 rounded-xl text-xs font-semibold bg-amber-600 text-white flex items-center gap-1 transition-colors ${
                selectedId === CHAPTERS.length - 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-amber-500 shadow-sm'
              }`}
            >
              Next Chapter <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </main>
      </div>

      {/* Floating Highlight Action Pill */}
      {selectedText && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-stone-100 px-5 py-3.5 rounded-2xl shadow-2xl border border-stone-800 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4">
          <div className="text-xs max-w-xs truncate">
            <span className="font-semibold text-amber-400">Selected:</span> "{selectedText}"
          </div>
          <button
            onClick={handleSaveHighlight}
            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors whitespace-nowrap flex items-center gap-1.5"
          >
            <Highlighter className="w-3.5 h-3.5" /> Highlight & Save
          </button>
        </div>
      )}
    </div>
  );
};
