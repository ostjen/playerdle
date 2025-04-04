import React from 'react';
import GameHeader from './GameHeader';
import GameFooter from './GameFooter';

const GameLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <GameHeader />
      <main className="flex-grow container mx-auto px-4 py-4">
        <div className="max-w-md mx-auto">
          {children}
        </div>
      </main>
      <GameFooter />
    </div>
  );
};

export default GameLayout; 