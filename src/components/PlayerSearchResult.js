import React from 'react';

const PlayerSearchResult = ({ player, onClick }) => {
  return (
    <li 
      className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0 transition-colors duration-150"
      onClick={() => onClick(player)}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium">{player.name}</div>
          <div className="text-sm text-gray-500">{player.nation}</div>
        </div>
        <div className="text-right">
          <div className="text-gray-700">{player.Team}</div>
          <div className="text-sm text-gray-500">{player.position}</div>
        </div>
      </div>
    </li>
  );
};

export default PlayerSearchResult; 