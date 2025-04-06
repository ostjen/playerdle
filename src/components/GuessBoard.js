import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import GuessItem from './GuessItem';

const GuessBoard = ({ guesses, maxGuesses }) => {
  const { t } = useTranslation();
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current && guesses.length > 0) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [guesses]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        {t('guesses.title', { current: guesses.length, max: maxGuesses })}
      </h2>
      <div 
        ref={scrollContainerRef} 
        className="overflow-y-auto space-y-4 h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px] border border-gray-200 rounded p-3"
      >
        {guesses.map((guess, index) => (
          <GuessItem key={index} guess={guess} />
        ))}
      </div>
    </div>
  );
};

export default GuessBoard; 