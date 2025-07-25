
import React, { useMemo } from 'react';
import type { Dream } from '../types';

interface ThemeTrackerProps {
  dreams: Dream[];
}

const ThemeTracker: React.FC<ThemeTrackerProps> = ({ dreams }) => {
  const themeFrequencies = useMemo(() => {
    const counts: { [key: string]: number } = {};
    dreams.forEach(dream => {
      dream.interpretation?.themes.forEach(theme => {
        const lowerTheme = theme.toLowerCase();
        counts[lowerTheme] = (counts[lowerTheme] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10);
  }, [dreams]);

  if (themeFrequencies.length === 0) {
    return null; // Don't render if no themes are available yet
  }

  const maxCount = themeFrequencies[0]?.[1] || 1;

  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg mt-8">
      <h3 className="text-xl font-bold text-violet-300 mb-4">Recurring Themes</h3>
      <div className="space-y-3">
        {themeFrequencies.map(([theme, count]) => (
          <div key={theme} className="flex items-center">
            <p className="capitalize text-gray-300 w-1/3 truncate">{theme}</p>
            <div className="w-2/3 bg-gray-700 rounded-full h-4">
              <div 
                className="bg-teal-500 h-4 rounded-full flex items-center justify-end pr-2 text-xs text-white font-bold"
                style={{ width: `${(count / maxCount) * 100}%` }}
              >
                {count > 1 ? count : ''}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeTracker;
