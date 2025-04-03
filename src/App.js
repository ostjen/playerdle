import React, { useState, useEffect } from 'react';
import './App.css';
import { getPlayers } from './utils/playerData';
import PlayerSearchBox from './components/PlayerSearchBox';
import PlayerInfo from './components/PlayerInfo';
import { get_matches, MatchType } from './utils/app_utils';
import { TARGET_PLAYER_ID, MAX_GUESSES } from './constants';
import { loadGuesses } from './utils/storage';
import GameFooter from './components/GameFooter';
import GameHeader from './components/GameHeader';

// Helper function to get the target player
const getTargetPlayer = (players) => {
  return players.find(player => player.id === TARGET_PLAYER_ID);
};

// Extract game logic to custom hooks
function usePlayerGame() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [targetPlayer, setTargetPlayer] = useState(null);
  const today = new Date().toISOString().split('T')[0];

  // Combine related effects
  useEffect(() => {
    const loadPlayers = async () => {
      try {
        const loadedPlayers = await getPlayers();
        setPlayers(loadedPlayers);
        const target = getTargetPlayer(loadedPlayers);
        setTargetPlayer(target);
        setLoading(false);
      } catch (error) {
        console.error('Error loading players:', error);
        setLoading(false);
      }
    };

    // Load players and guesses from storage
    loadPlayers();
    
    // Load saved guesses
    const storedGuesses = loadGuesses(today);
    if (storedGuesses.length > 0) {
      setGuesses(storedGuesses);
      
      const lastGuess = storedGuesses[storedGuesses.length - 1];
      if (lastGuess && lastGuess.player.id === TARGET_PLAYER_ID) {
        setGameWon(true);
        setSelectedPlayer(lastGuess.player);
      } else if (storedGuesses.length >= MAX_GUESSES) {
        setGameLost(true);
      }
    }
  }, []);

  // Handle player selection
  const handleSelectPlayer = (player) => {
    setSelectedPlayer(player);
    
    // Add player to guesses with match information
    const target = targetPlayer || getTargetPlayer(players);
    
    if (target) {
      const newGuess = {
        player,
        matches: get_matches(player, target)
      };
      
      // Update guesses state with new guess
      const updatedGuesses = [...guesses, newGuess];
      setGuesses(updatedGuesses);
      
      // Check for win or loss
      if (player.id === TARGET_PLAYER_ID) {
        setGameWon(true);
      } else if (updatedGuesses.length >= MAX_GUESSES) {
        setGameLost(true);
      }
      
      // Save UPDATED guesses to local storage
      try {
        // Get existing guesses data or initialize empty object
        const existingDataString = localStorage.getItem('guesses');
        const existingData = existingDataString ? JSON.parse(existingDataString) : {};
        
        // Update with today's guesses
        existingData[today] = updatedGuesses;
        
        // Save back to localStorage
        localStorage.setItem('guesses', JSON.stringify(existingData));
      } catch (error) {
        console.error("Error saving guesses to localStorage:", error);
      }
    }
  };

  return {
    players, loading, selectedPlayer, guesses, gameWon, gameLost, targetPlayer,
    handleSelectPlayer
  };
}

function App() {
  const { 
    players, loading, selectedPlayer, guesses, gameWon, gameLost, targetPlayer,
    handleSelectPlayer 
  } = usePlayerGame();

  return (
    <div className="min-h-screen flex flex-col">
      <GameHeader />
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
            ) : gameLost ? (
              <div className="text-center py-4">
                <h2 className="text-2xl font-bold text-red-600 mb-4">You Lost!</h2>
                <p className="mb-4">The correct player was:</p>
                <PlayerInfo player={targetPlayer} />
              </div>
            ) : guesses.length > 0 ? (
              <div>
                <h2 className="text-xl font-semibold mb-4">Your Guesses ({guesses.length}/{MAX_GUESSES})</h2>
                <div className="space-y-4">
                  {guesses.map((guess, index) => (
                    <div key={index} className="border rounded p-3 mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold">{guess.player.name}</div>
                        <div className="flex-shrink-0">
                          {(() => {
                            const imageData = guess.player.images || guess.player.image || guess.player.imagedata || guess.player.img;
                            
                            if (imageData) {
                              // Check if the image data already includes the data:image prefix
                              const imgSrc = imageData.startsWith('data:') 
                                ? imageData 
                                : `data:image/jpeg;base64,${imageData}`;
                              
                              return (
                                <img 
                                  src={imgSrc} 
                                  alt={guess.player.name} 
                                  className="w-10 h-10 rounded-full object-cover border border-gray-300"
                                />
                              );
                            } else {
                              return (
                                <img 
                                  src={`${process.env.PUBLIC_URL}/images/unknown_pfp.png`} 
                                  alt="Unknown player" 
                                  className="w-10 h-10 rounded-full object-cover border border-gray-300"
                                />
                              );
                            }
                          })()}
                        </div>
                      </div>
                      <div className="grid grid-cols-5 gap-2 text-xs">
                        {/* Nation column */}
                        <div className="flex flex-col">
                          <span className="text-gray-500 mb-1">Nation</span>
                          <div className={`p-1 text-center rounded ${guess.matches.nation === MatchType.EXACT ? 'bg-green-500 text-white' : guess.matches.nation === MatchType.PARTIAL ? 'bg-yellow-500 text-white' : 'bg-red-100'}`}>
                            {guess.player.nation}
                          </div>
                        </div>
                        
                        {/* League column */}
                        <div className="flex flex-col">
                          <span className="text-gray-500 mb-1">League</span>
                          <div className={`p-1 text-center rounded ${guess.matches.league === MatchType.EXACT ? 'bg-green-500 text-white' : guess.matches.league === MatchType.PARTIAL ? 'bg-yellow-500 text-white' : 'bg-red-100'}`}>
                            {guess.player.league}
                          </div>
                        </div>
                        
                        {/* Position column */}
                        <div className="flex flex-col">
                          <span className="text-gray-500 mb-1">Position</span>
                          <div className={`p-1 text-center rounded ${guess.matches.position === MatchType.EXACT ? 'bg-green-500 text-white' : guess.matches.position === MatchType.PARTIAL ? 'bg-yellow-500 text-white' : 'bg-red-100'}`}>
                            {guess.player.position}
                          </div>
                        </div>
                        
                        {/* Height column */}
                        <div className="flex flex-col">
                          <span className="text-gray-500 mb-1">Height</span>
                          <div className={`p-1 text-center rounded ${guess.matches.height === MatchType.EXACT ? 'bg-green-500 text-white' : guess.matches.height === MatchType.PARTIAL ? 'bg-yellow-500 text-white' : 'bg-red-100'}`}>
                            {guess.player.height}
                          </div>
                        </div>
                        
                        {/* Age column */}
                        <div className="flex flex-col">
                          <span className="text-gray-500 mb-1">Age</span>
                          <div className={`p-1 text-center rounded ${guess.matches.age === MatchType.EXACT ? 'bg-green-500 text-white' : guess.matches.age === MatchType.PARTIAL ? 'bg-yellow-500 text-white' : 'bg-red-100'}`}>
                            {guess.player.age}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-auto flex flex-col items-center justify-center space-y-4 p-4">
                <h2 className="text-xl font-semibold text-gray-700">How to Play ⚽︎</h2>
                <p className="text-gray-600 text-center">Guess the mystery football player in 5 chances or less!</p>
                <div className="w-full bg-gray-100 rounded-lg p-4 mt-2">
                  <p className="text-gray-700 font-medium mb-2">Match these attributes:</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center"><span className="mr-4">🌍</span> <strong>Nation</strong></li>
                    <li className="flex items-center"><span className="mr-4">🏆</span> <strong>League</strong></li>
                    <li className="flex items-center"><span className="mr-4">👕</span> <strong>Position</strong></li>
                    <li className="flex items-center"><span className="mr-4">📏</span> <strong>Height</strong></li>
                    <li className="flex items-center"><span className="mr-4">🎂</span> <strong>Age</strong></li>
                  </ul>
                </div>
                <div className="w-full bg-gray-100 rounded-lg p-4">
                  <p className="text-gray-700 font-medium mb-2">Color guide:</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center"><span className="w-4 h-4 bg-green-500 rounded mr-2"></span> Exact match</div>
                    <div className="flex items-center"><span className="w-4 h-4 bg-yellow-500 rounded mr-2"></span> Close match</div>
                    <div className="flex items-center"><span className="w-4 h-4 bg-red-500 rounded mr-2"></span> No match</div>
                  </div>
                </div>
                <p className="text-gray-500 italic mt-2">Select a player below to start guessing!</p>
              </div>
            )}
          </div>

          {!gameWon && !gameLost && (
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
          )}
        </div>
      </main>

      <GameFooter />
    </div>
  );
}

export default App;
