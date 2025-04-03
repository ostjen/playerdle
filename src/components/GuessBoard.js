import React, { useRef, useEffect } from 'react';
import GuessItem from './GuessItem';

const GuessBoard = ({ guesses, maxGuesses }) => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current && guesses.length > 0) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [guesses]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Guesses ({guesses.length}/{maxGuesses})</h2>
      <div ref={scrollContainerRef} className="h-[400px] overflow-y-auto space-y-4">
        {guesses.map((guess, index) => (
          <GuessItem key={index} guess={guess} />
        ))}
      </div>
    </div>
  );
};

export default GuessBoard; 