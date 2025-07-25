
import React from 'react';
import type { Dream } from '../types';
import { getEmotionData } from '../constants';
import Spinner from './Spinner';

interface DreamCardProps {
  dream: Dream;
  onView: (dream: Dream) => void;
  onDelete: (id: string) => void;
  isProcessing: boolean;
}

const DreamCard: React.FC<DreamCardProps> = ({ dream, onView, onDelete, isProcessing }) => {
  const emotionData = getEmotionData(dream.emotion);
  const dreamDate = new Date(dream.date);

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 flex flex-col transition-all duration-300 hover:shadow-violet-500/20 hover:ring-1 hover:ring-violet-700">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-100">{dream.interpretation?.title || 'A New Dream'}</h3>
          <p className="text-sm text-gray-400">
            {dreamDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center space-x-2">
            <span className={`text-3xl ${emotionData.color}`}>{emotionData.emoji}</span>
        </div>
      </div>
      
      <p className="text-gray-300 text-sm flex-grow mb-4 line-clamp-2">
        {dream.content}
      </p>

      <div className="border-t border-gray-700 pt-3 flex justify-between items-center">
        <button
          onClick={() => onView(dream)}
          className="text-sm text-violet-400 hover:text-violet-300 font-semibold"
          disabled={isProcessing}
        >
            {isProcessing ? <Spinner size="sm"/> : 'View Interpretation'}
        </button>
        <button
          onClick={() => onDelete(dream.id)}
          className="text-gray-500 hover:text-red-400 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DreamCard;
