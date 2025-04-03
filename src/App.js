import React, { useState, useEffect } from 'react';
import './App.css';
import { getPlayers } from './utils/playerData';
import PlayerSearchBox from './components/PlayerSearchBox';
import PlayerInfo from './components/PlayerInfo';
import { get_matches, MatchType } from './utils/app_utils';

const hardcoded_response_id = 16

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
  const today = new Date().toISOString().split('T')[0];

  // Fix loading guesses from local storage
  useEffect(() => {
    const storedGuessesString = localStorage.getItem('guesses');
    if (storedGuessesString) {
      try {
        const storedGuesses = JSON.parse(storedGuessesString);
        if (storedGuesses[today]) {
          console.log("Loading guesses from local storage:", storedGuesses[today]);
          setGuesses(storedGuesses[today]);
          
          // Also set game state if player has already won
          const lastGuess = storedGuesses[today][storedGuesses[today].length - 1];
          if (lastGuess && lastGuess.player.id === hardcoded_response_id) {
            setGameWon(true);
            setSelectedPlayer(lastGuess.player);
          }
        }
      } catch (error) {
        console.error("Error parsing stored guesses:", error);
      }
    }
  }, []);
  
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
    if (targetPlayer) {
      const newGuess = {
        player,
        matches: get_matches(player, targetPlayer)
      };
      
      // Update guesses state with new guess
      const updatedGuesses = [...guesses, newGuess];
      setGuesses(updatedGuesses);
      
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
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold">{guess.player.name}</div>
                        <div className="flex-shrink-0">
                          {(() => {
                            console.log("Guess player:", guess.player);
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
