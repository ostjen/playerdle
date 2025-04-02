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
    if (query.length > 0) {
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
        !inputRef.current.contains(event.target)
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
    setQuery(player.Name);
    setIsOpen(false);
    onSelectPlayer(player);
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        className="player-input"
        placeholder="Write and select a player"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onClick={() => setIsOpen(results.length > 0)}
      />
      
      {isOpen && (
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