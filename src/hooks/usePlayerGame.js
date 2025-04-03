import { useState, useEffect, useMemo } from 'react';
import { getPlayers } from '../utils/playerData';
import { getMatches } from '../utils/app_utils';
import { MAX_GUESSES } from '../constants';
import { loadGuesses } from '../utils/storage';
import dailySelectedPlayer from '../dailySelectedPlayer';

export function usePlayerGame() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  // Reset game state when day changes
  useEffect(() => {
    setGuesses([]);
    setGameWon(false);
    setGameLost(false);
    setSelectedPlayer(null);
  }, [today]);

  // Calculate target player only when the day changes
  const targetPlayer = useMemo(() => {
    if (players.length > 0) {
      return dailySelectedPlayer(players);
    }
    return null;
  }, [players, today]);

  // Load players from API or cache
  useEffect(() => {
    const loadPlayerData = async () => {
      try {
        const loadedPlayers = await getPlayers();
        setPlayers(loadedPlayers);
        setLoading(false);
      } catch (error) {
        console.error('Error loading players:', error);
        setLoading(false);
      }
    };

    loadPlayerData();
  }, []);  // Only run once on mount

  // Load saved guesses and check win/loss state
  useEffect(() => {
    if (!targetPlayer) return; // Don't proceed if targetPlayer isn't loaded yet
    
    // Load saved guesses
    const storedGuesses = loadGuesses(today);
    if (storedGuesses.length > 0) {
      setGuesses(storedGuesses);
      
      const lastGuess = storedGuesses[storedGuesses.length - 1];
      // Check if the last guess's player name matches the target player's name
      if (lastGuess && lastGuess.player.name === targetPlayer.name) {
        setGameWon(true);
        setSelectedPlayer(lastGuess.player);
      } else if (storedGuesses.length >= MAX_GUESSES) {
        setGameLost(true);
      }
    }
  }, [targetPlayer, today]);

  // Handle player selection
  const handleSelectPlayer = (player) => {
    setSelectedPlayer(player);
    
    // Add player to guesses with match information
    if (targetPlayer) {
      const newGuess = {
        player,
        matches: getMatches(player, targetPlayer)
      };
      
      // Update guesses state with new guess
      const updatedGuesses = [...guesses, newGuess];
      setGuesses(updatedGuesses);
      
      // Check for win or loss - compare by name for more reliable matching
      if (player.name === targetPlayer.name) {
        setGameWon(true);
      } else if (updatedGuesses.length >= MAX_GUESSES) {
        setGameLost(true);
      }
      
      // Save updated guesses to local storage
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
    players, 
    loading, 
    selectedPlayer, 
    guesses, 
    gameWon, 
    gameLost, 
    targetPlayer,
    handleSelectPlayer
  };
} 