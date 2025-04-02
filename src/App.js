import React, { useState, useEffect } from 'react';
import './App.css';
import { getPlayers } from './utils/playerData';
import PlayerSearchBox from './components/PlayerSearchBox';
import PlayerInfo from './components/PlayerInfo';

const hardcoded_response_id = '16'

// Helper function to get the target player
const getTargetPlayer = (players) => {
  console.log(players);
  console.log(players.find(player => player.id === hardcoded_response_id));
  return players.find(player => player.id === hardcoded_response_id);
};

function App() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [gameWon, setGameWon] = useState(false);

  // Load players on component mount
  useEffect(() => {
    const loadPlayers = async () => {
      try {
        const loadedPlayers = await getPlayers();
        setPlayers(loadedPlayers);
        setLoading(false);
      } catch (error) {
        console.error('Error loading players:', error);
        setLoading(false);
      }
    };

    loadPlayers();
  }, []);

  // Handle player selection
  const handleSelectPlayer = (player) => {
    setSelectedPlayer(player);
    if (player.id === hardcoded_response_id) {
      setGameWon(true);
    }
    
    // Add player to guesses with match information
    const targetPlayer = getTargetPlayer(players);
    console.log(targetPlayer);
    console.log(player);
    if (targetPlayer) {
      const newGuess = {
        player,
        matches: {
          nation: player.nation === targetPlayer.nation,
          league: player.league === targetPlayer.league,
          position: player.position === targetPlayer.position,
          height: player.height === targetPlayer.height,
          age: player.age === targetPlayer.age
        }
      };
      console.log(newGuess);
      setGuesses(prevGuesses => [...prevGuesses, newGuess]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center text-gray-800">PLAYERDLE</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Middle section - Player info */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            {loading ? (
              <div className="text-center py-4">Loading...</div>
            ) : gameWon ? (
              <div className="text-center py-4">
                <h2 className="text-2xl font-bold text-green-600 mb-4">You Win!</h2>
                <PlayerInfo player={selectedPlayer} />
              </div>
            ) : guesses.length > 0 ? (
              <div>
                <h2 className="text-xl font-semibold mb-4">Your Guesses</h2>
                <div className="space-y-4">
                  {guesses.map((guess, index) => (
                    <div key={index} className="border rounded p-3 mb-3">
                      <div className="font-semibold mb-2">{guess.player.name}</div>
                      <div className="grid grid-cols-5 gap-2 text-xs">
                        {/* Nation column */}
                        <div className="flex flex-col">
                          <span className="text-gray-500 mb-1">Nation</span>
                          <div className={`p-1 text-center rounded ${guess.matches.nation ? 'bg-green-500 text-white' : 'bg-red-100'}`}>
                            {guess.player.nation}
                          </div>
                        </div>
                        
                        {/* League column */}
                        <div className="flex flex-col">
                          <span className="text-gray-500 mb-1">League</span>
                          <div className={`p-1 text-center rounded ${guess.matches.league ? 'bg-green-500 text-white' : 'bg-red-100'}`}>
                            {guess.player.league}
                          </div>
                        </div>
                        
                        {/* Position column */}
                        <div className="flex flex-col">
                          <span className="text-gray-500 mb-1">Position</span>
                          <div className={`p-1 text-center rounded ${guess.matches.position ? 'bg-green-500 text-white' : 'bg-red-100'}`}>
                            {guess.player.position}
                          </div>
                        </div>
                        
                        {/* Height column */}
                        <div className="flex flex-col">
                          <span className="text-gray-500 mb-1">Height</span>
                          <div className={`p-1 text-center rounded ${guess.matches.height ? 'bg-green-500 text-white' : 'bg-red-100'}`}>
                            {guess.player.height}
                          </div>
                        </div>
                        
                        {/* Age column */}
                        <div className="flex flex-col">
                          <span className="text-gray-500 mb-1">Age</span>
                          <div className={`p-1 text-center rounded ${guess.matches.age ? 'bg-green-500 text-white' : 'bg-red-100'}`}>
                            {guess.player.age}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-48 flex items-center justify-center">
                <p className="text-gray-500">Select a player to see details</p>
              </div>
            )}
          </div>

          {/* Player search box */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {loading ? (
              <div className="text-center py-4">Loading player data...</div>
            ) : (
              <PlayerSearchBox 
                players={players} 
                onSelectPlayer={handleSelectPlayer} 
              />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Playerdle - A daily football player guessing game
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
