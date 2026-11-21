import React from 'react';
import { Bookmark, X, BookOpen, ArrowRight } from 'lucide-react';
import { CHAPTERS } from '../data/ebookContent';

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: number[];
  onSelectChapter: (id: number) => void;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({
  isOpen,
  onClose,
  bookmarks,
  onSelectChapter,
}) => {
  if (!isOpen) return null;

  const bookmarkedChapters = CHAPTERS.filter(ch => bookmarks.includes(ch.id));

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl w-full max-w-lg p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2 text-amber-600 font-bold text-base">
            <Bookmark className="w-5 h-5 fill-amber-600" /> Saved Bookmarks ({bookmarks.length})
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {bookmarkedChapters.length === 0 ? (
          <div className="text-center py-12 text-stone-500 space-y-2">
            <Bookmark className="w-8 h-8 mx-auto opacity-40" />
            <p className="text-sm font-semibold">No bookmarks saved yet.</p>
            <p className="text-xs">Click the bookmark icon on any chapter to save it for quick reference.</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {bookmarkedChapters.map(ch => (
              <div
                key={ch.id}
                onClick={() => {
                  onSelectChapter(ch.id);
                  onClose();
                }}
                className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-amber-500 dark:hover:border-amber-500 cursor-pointer transition-all flex items-center justify-between group bg-stone-50 dark:bg-stone-950"
              >
                <div>
                  <div className="text-[10px] uppercase font-mono-data text-amber-600 font-bold mb-1">
                    Chapter 0{ch.id} · {ch.readTime}
                  </div>
                  <div className="text-sm font-semibold group-hover:text-amber-600 transition-colors">
                    {ch.title}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-amber-600 transition-colors" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
