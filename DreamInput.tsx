
import React, { useState, useCallback } from 'react';
import type { Dream, Emotion } from '../types';
import { EMOTION_OPTIONS } from '../constants';
import { useSpeechToText } from '../hooks/useSpeechToText';

interface DreamInputProps {
  onAddDream: (dream: Omit<Dream, 'id' | 'date' | 'interpretation'>) => void;
  isInterpreting: boolean;
}

const DreamInput: React.FC<DreamInputProps> = ({ onAddDream, isInterpreting }) => {
  const [content, setContent] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion>('neutral');

  const handleTranscriptUpdate = useCallback((transcript: string) => {
    setContent(prev => prev ? `${prev} ${transcript}` : transcript);
  }, []);

  const { isListening, startListening, stopListening, hasSupport } = useSpeechToText(handleTranscriptUpdate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onAddDream({ content, emotion: selectedEmotion });
      setContent('');
      setSelectedEmotion('neutral');
    }
  };

  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg mb-8">
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold text-violet-300 mb-4">Good Morning! What did you dream of?</h2>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type or use the mic to describe your dream..."
          className="w-full h-32 p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-shadow duration-200"
          disabled={isInterpreting}
        />
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <span className="text-gray-400">How did it feel?</span>
            {EMOTION_OPTIONS.map(({ value, emoji, color }) => (
              <button
                key={value}
                type="button"
                onClick={() => setSelectedEmotion(value)}
                className={`text-2xl p-1 rounded-full transition-transform duration-200 ${selectedEmotion === value ? 'transform scale-125 ring-2 ring-violet-400' : 'opacity-60 hover:opacity-100'}`}
                title={value}
              >
                {emoji}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            {hasSupport && (
                <button
                    type="button"
                    onClick={isListening ? stopListening : startListening}
                    className={`p-2 rounded-full transition-colors ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-violet-600 text-white hover:bg-violet-500'}`}
                    disabled={isInterpreting}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                </button>
            )}
            <button
              type="submit"
              className="px-6 py-2 bg-violet-600 text-white font-bold rounded-full hover:bg-violet-500 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
              disabled={!content.trim() || isInterpreting}
            >
              Save & Interpret
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DreamInput;
