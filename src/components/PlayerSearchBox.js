import React, { useState, useEffect, useRef } from 'react';
import { searchPlayers } from '../utils/playerData';
import PlayerSearchResult from './PlayerSearchResult';

const PlayerSearchBox = ({ players, onSelectPlayer }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);

  // Handle search input change
  useEffect(() => {
    // Only search if we have a query and players data
    if (query.length > 0 && players && players.length > 0) {
      const searchResults = searchPlayers(query, players);
      setResults(searchResults);
      setIsOpen(searchResults.length > 0);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query, players]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        resultsRef.current && 
        !resultsRef.current.contains(event.target) &&
        inputRef.current && !inputRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle player selection
  const handleSelectPlayer = (player) => {
    console.log("Player selected:", player);
    setQuery('');
    setIsOpen(false);
    onSelectPlayer(player);
  };

  // Focus the input field on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="relative w-full">
      <div className="mb-2 text-sm font-medium text-gray-700">
        Search and select a player
      </div>
      <input
        ref={inputRef}
        type="text"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Type player name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onClick={() => {
          // If there are already results, show them on click
          if (results.length > 0) {
            setIsOpen(true);
          }
        }}
      />
      
      {isOpen && results.length > 0 && (
        <ul 
          ref={resultsRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {results.map((player, index) => (
            <PlayerSearchResult 
              key={index}
              player={player}
              onClick={handleSelectPlayer}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlayerSearchBox; 