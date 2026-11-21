import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ReaderView } from './components/ReaderView';
import { FinancialCalculator } from './components/FinancialCalculator';
import { AiConsultant } from './components/AiConsultant';
import { CaseStudiesView } from './components/CaseStudiesView';
import { FutureHorizonView } from './components/FutureHorizonView';
import { BookmarksModal } from './components/BookmarksModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('reader');
  const [bookmarks, setBookmarks] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('digital_empire_bookmarks');
      return saved ? JSON.parse(saved) : [0, 1];
    } catch {
      return [0, 1];
    }
  });
  const [isBookmarksOpen, setIsBookmarksOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('digital_empire_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarks]);

  const handleToggleBookmark = (id: number) => {
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#292524] dark:bg-stone-950 dark:text-stone-100 flex flex-col font-sans transition-colors">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookmarksCount={bookmarks.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
      />

      <div className="flex-1">
        {activeTab === 'reader' && (
          <ReaderView
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            onNavigateToAdvisor={() => setActiveTab('ai-advisor')}
          />
        )}
        {activeTab === 'calculator' && <FinancialCalculator onBack={() => setActiveTab('reader')} />}
        {activeTab === 'ai-advisor' && <AiConsultant onBack={() => setActiveTab('reader')} />}
        {activeTab === 'cases' && <CaseStudiesView onBack={() => setActiveTab('reader')} />}
        {activeTab === 'future' && <FutureHorizonView onBack={() => setActiveTab('reader')} />}
      </div>

      <BookmarksModal
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarks={bookmarks}
        onSelectChapter={(id) => {
          setActiveTab('reader');
        }}
      />
    </div>
  );
}
