
import React, { useState, useMemo } from 'react';
import type { Dream, Emotion } from '../types';
import DreamCard from './DreamCard';
import { EMOTION_OPTIONS } from '../constants';

interface DreamJournalProps {
  dreams: Dream[];
  onViewDream: (dream: Dream) => void;
  onDeleteDream: (id: string) => void;
  processingDreamId: string | null;
}

const DreamJournal: React.FC<DreamJournalProps> = ({ dreams, onViewDream, onDeleteDream, processingDreamId }) => {
  const [filter, setFilter] = useState<Emotion | 'all'>('all');

  const filteredDreams = useMemo(() => {
    if (filter === 'all') {
      return dreams;
    }
    return dreams.filter(dream => dream.emotion === filter);
  }, [dreams, filter]);

  if (dreams.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-gray-800 rounded-lg">
        <h3 className="text-2xl font-bold text-gray-300">Your Dream Journal is Empty</h3>
        <p className="text-gray-400 mt-2">Log your first dream above to begin your journey of self-discovery.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-violet-300 mb-4 sm:mb-0">My Dreams</h2>
        <div className="flex items-center space-x-2 bg-gray-800 p-1 rounded-full">
            <button 
                onClick={() => setFilter('all')}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${filter === 'all' ? 'bg-violet-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
            >
                All
            </button>
          {EMOTION_OPTIONS.map(({ value, emoji }) => (
            <button 
              key={value} 
              onClick={() => setFilter(value)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${filter === value ? 'bg-violet-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
      {filteredDreams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDreams.map(dream => (
                <DreamCard 
                    key={dream.id}
                    dream={dream}
                    onView={onViewDream}
                    onDelete={onDeleteDream}
                    isProcessing={processingDreamId === dream.id}
                />
            ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-400">
            No dreams match this filter.
        </div>
      )}
    </div>
  );
};

export default DreamJournal;
