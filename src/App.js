import React from 'react';
import './App.css';
import GameLayout from './components/GameLayout';
import GameContainer from './components/GameContainer';
import { usePlayerGame } from './hooks/usePlayerGame';

function App() {
  const { 
    players, 
    loading, 
    selectedPlayer, 
    guesses, 
    gameWon, 
    gameLost, 
    targetPlayer,
    handleSelectPlayer 
  } = usePlayerGame();

  return (
    <GameLayout>
      <GameContainer
        loading={loading}
        gameWon={gameWon}
        gameLost={gameLost}
        selectedPlayer={selectedPlayer}
        targetPlayer={targetPlayer}
        guesses={guesses}
        players={players}
        onSelectPlayer={handleSelectPlayer}
      />
    </GameLayout>
  );
}

export default App;
