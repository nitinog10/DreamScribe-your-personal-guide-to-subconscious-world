
import React from 'react';
import type { Interpretation } from '../types';
import Spinner from './Spinner';

interface InterpretationViewProps {
  interpretation: Interpretation | null;
  isLoading: boolean;
  onVisualize: () => void;
  isVisualizing: boolean;
  imageUrl?: string;
}

const InterpretationView: React.FC<InterpretationViewProps> = ({ interpretation, isLoading, onVisualize, isVisualizing, imageUrl }) => {
  if (isLoading) {
    return <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <Spinner text="The AI is interpreting your dream..."/>
      <p className="text-sm text-gray-400">This can take a moment.</p>
    </div>;
  }

  if (!interpretation) {
    return <div className="text-center p-8 text-gray-400">No interpretation available.</div>;
  }

  return (
    <div className="space-y-6 text-gray-300">
      <div>
        <h3 className="text-lg font-bold text-violet-400 border-b border-gray-700 pb-2 mb-3">Summary</h3>
        <p className="text-base leading-relaxed">{interpretation.summary}</p>
      </div>

      <div>
        <h3 className="text-lg font-bold text-violet-400 border-b border-gray-700 pb-2 mb-3">Core Interpretation</h3>
        <p className="text-base leading-relaxed whitespace-pre-wrap">{interpretation.interpretation}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-bold text-violet-400 border-b border-gray-700 pb-2 mb-3">Key Themes</h3>
          <div className="flex flex-wrap gap-2">
            {interpretation.themes.map((theme, index) => (
              <span key={index} className="bg-gray-700 text-violet-300 text-sm font-medium px-3 py-1 rounded-full">{theme}</span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-violet-400 border-b border-gray-700 pb-2 mb-3">Emotional Landscape</h3>
          {interpretation.emotions.map((emo, index) => (
            <div key={index} className="mb-2">
              <p><strong className="font-semibold text-gray-200">{emo.emotion}:</strong> {emo.analysis}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-bold text-violet-400 border-b border-gray-700 pb-2 mb-3">Symbol Analysis</h3>
        <div className="space-y-4">
          {interpretation.symbols.map((symbol, index) => (
            <div key={index} className="bg-gray-900 p-3 rounded-lg">
              <h4 className="font-bold text-md text-teal-300">{symbol.symbol}</h4>
              <p className="text-sm mt-1"><strong className="font-semibold text-gray-400">Meaning:</strong> {symbol.meaning}</p>
              <p className="text-sm mt-1"><strong className="font-semibold text-gray-400">Psychology:</strong> {symbol.psychology}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 text-center">
        {imageUrl ? (
             <div className="mt-4">
                <h3 className="text-lg font-bold text-violet-400 mb-3">Dream Visualization</h3>
                <img src={imageUrl} alt="Dream visualization" className="rounded-lg shadow-lg mx-auto" />
            </div>
        ) : (
            <button 
                onClick={onVisualize}
                disabled={isVisualizing}
                className="inline-flex items-center px-6 py-2 bg-teal-600 text-white font-bold rounded-full hover:bg-teal-500 transition-colors disabled:bg-gray-500"
            >
                {isVisualizing ? (
                    <>
                        <Spinner size="sm" color="border-white" />
                        <span className="ml-2">Creating Image...</span>
                    </>
                ) : (
                     'Visualize Your Dream'
                )}
            </button>
        )}
      </div>
    </div>
  );
};

export default InterpretationView;
