
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 mb-8 text-center">
      <div className="flex items-center justify-center space-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-violet-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Dream<span className="text-violet-400">Scribe</span>
        </h1>
      </div>
       <p className="text-gray-400 mt-2">Your personal guide to the subconscious world.</p>
    </header>
  );
};

export default Header;
