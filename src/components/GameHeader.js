import React from 'react';
import LanguageSelector from './LanguageSelector';

export default function GameHeader() {
    return (
        <header className="bg-white border-b border-gray-200 shadow-sm py-4">
          <div className="container mx-auto px-4 flex items-center justify-center relative">
            <h1 className="text-3xl font-bold text-center text-gray-800">PLAYERDLE</h1>
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
              <LanguageSelector />
            </div>
          </div>
        </header>
    );
}
