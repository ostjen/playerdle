import React from 'react';
import GuessItem from './GuessItem';

const GuessBoard = ({ guesses, maxGuesses }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Guesses ({guesses.length}/{maxGuesses})</h2>
      <div className="space-y-4">
        {guesses.map((guess, index) => (
          <GuessItem key={index} guess={guess} />
        ))}
      </div>
    </div>
  );
};

export default GuessBoard; 