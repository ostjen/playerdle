import React, { useState, useEffect } from 'react';
import './App.css';
import GameLayout from './components/GameLayout';
import GameContainer from './components/GameContainer';
import Onboarding from './components/Onboarding';
import { usePlayerGame } from './hooks/usePlayerGame';
import { hasPlayerPlayedBefore } from './utils/storage';
import { Analytics } from "@vercel/analytics/react" 

function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  
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

  useEffect(() => {
    // Check if this is a first-time user
    const hasPlayed = hasPlayerPlayedBefore();
    setShowOnboarding(!hasPlayed);
  }, []);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  return (
    <GameLayout>
      {showOnboarding ? (
        <Onboarding onComplete={handleOnboardingComplete} />
      ) : (
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
      )}
    </GameLayout>
  );
}

export default App;
