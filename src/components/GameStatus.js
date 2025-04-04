import React from 'react';
import { useTranslation } from 'react-i18next';
import PlayerInfo from './PlayerInfo';
import GameInfoCard from './GameInfoCard';
import GuessBoard from './GuessBoard';
import { MAX_GUESSES } from '../constants';

const GameStatus = ({ 
  loading, 
  gameWon, 
  gameLost, 
  selectedPlayer, 
  targetPlayer, 
  guesses
}) => {
  const { t } = useTranslation();

  if (loading) {
    return <div className="text-center py-4">{t('loading')}</div>;
  }

  if (gameWon) {
    return (
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-green-600 mb-4">{t('gameWon')}</h2>
        {selectedPlayer && <PlayerInfo player={selectedPlayer} />}
      </div>
    );
  }

  if (gameLost) {
    return (
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-red-600 mb-4">{t('gameLost')}</h2>
        <p className="mb-4">{t('correctPlayer')}</p>
        {targetPlayer && <PlayerInfo player={targetPlayer} />}
      </div>
    );
  }

  if (guesses && guesses.length > 0) {
    return <GuessBoard guesses={guesses} maxGuesses={MAX_GUESSES} />;
  }

  return <GameInfoCard />;
};

export default GameStatus; 