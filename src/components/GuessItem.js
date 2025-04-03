import React from 'react';
import PlayerImage from './PlayerImage';
import { MatchType } from '../utils/app_utils';

function GuessItem({ guess }) {
  return (
    <div className="border rounded p-3 mb-3">
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold">{guess.player.name}</div>
        <div className="flex-shrink-0">
          <PlayerImage player={guess.player} />
        </div>
      </div>
      <div className="grid grid-cols-5 gap-2 text-xs">
        {/* Nation column */}
        <AttributeCell 
          label="Nation" 
          value={guess.player.nation} 
          matchType={guess.matches.nation} 
        />
        
        {/* League column */}
        <AttributeCell 
          label="League" 
          value={guess.player.league} 
          matchType={guess.matches.league} 
        />
        
        {/* Position column */}
        <AttributeCell 
          label="Position" 
          value={guess.player.position} 
          matchType={guess.matches.position} 
        />
        
        {/* Height column */}
        <AttributeCell 
          label="Height" 
          value={guess.player.height} 
          matchType={guess.matches.height} 
        />
        
        {/* Age column */}
        <AttributeCell 
          label="Age" 
          value={guess.player.age} 
          matchType={guess.matches.age} 
        />
      </div>
    </div>
  );
}

function AttributeCell({ label, value, matchType }) {
  const getBackgroundColor = () => {
    if (matchType === MatchType.EXACT) return 'bg-green-500 text-white';
    if (matchType === MatchType.PARTIAL) return 'bg-yellow-500 text-white';
    return 'bg-red-100';
  };
  
  return (
    <div className="flex flex-col">
      <span className="text-gray-500 mb-1">{label}</span>
      <div className={`p-1 text-center rounded ${getBackgroundColor()}`}>
        {value}
      </div>
    </div>
  );
}

export default GuessItem; 