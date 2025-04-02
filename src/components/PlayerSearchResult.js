import React from 'react';

const PlayerSearchResult = ({ player, onClick }) => {
  return (
    <li 
      className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0 transition-colors duration-150"
      onClick={() => onClick(player)}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium">{player.Name}</div>
          <div className="text-sm text-gray-500">{player.Nation}</div>
        </div>
        <div className="text-right">
          <div className="text-gray-700">{player.Team}</div>
          <div className="text-sm text-gray-500">{player.Position}</div>
        </div>
      </div>
    </li>
  );
};

export default PlayerSearchResult; 