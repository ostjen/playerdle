import React from 'react';
import GameStatus from './GameStatus';
import PlayerSearchBox from './PlayerSearchBox';

const GameContainer = ({ 
  loading, 
  gameWon, 
  gameLost, 
  selectedPlayer, 
  targetPlayer, 
  guesses,
  players,
  onSelectPlayer
}) => {
  return (
    <>
      {/* Game Status Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <GameStatus
          loading={loading}
          gameWon={gameWon}
          gameLost={gameLost}
          selectedPlayer={selectedPlayer}
          targetPlayer={targetPlayer}
          guesses={guesses}
        />
      </div>

      {/* Player Search Section - Only show if game is still in progress */}
      {!gameWon && !gameLost && (
        <div className="bg-white rounded-lg shadow-md p-6">
          {loading ? (
            <div className="text-center py-4">Loading player data...</div>
          ) : (
            <PlayerSearchBox 
              players={players} 
              onSelectPlayer={onSelectPlayer}
              guesses={guesses}
            />
          )}
        </div>
      )}
    </>
  );
};

export default GameContainer; 