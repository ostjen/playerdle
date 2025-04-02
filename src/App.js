import React, { useState, useEffect } from 'react';
import './App.css';
import { getPlayers } from './utils/playerData';
import PlayerSearchBox from './components/PlayerSearchBox';
import PlayerInfo from './components/PlayerInfo';

function App() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

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
    // Here you would implement game logic
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
            ) : (
              selectedPlayer ? (
                <PlayerInfo player={selectedPlayer} />
              ) : (
                <div className="h-48 flex items-center justify-center">
                  <p className="text-gray-500">Select a player to see details</p>
                </div>
              )
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
