import React from 'react';

const PlayerInfo = ({ player }) => {
  if (!player) {
    return (
      <div className="text-center py-4 text-gray-500">
        No player selected
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{player.Name}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-sm text-gray-500">Nation</div>
          <div className="font-medium">{player.Nation}</div>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-sm text-gray-500">Age</div>
          <div className="font-medium">{player.Age}</div>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-sm text-gray-500">Team</div>
          <div className="font-medium">{player.Team}</div>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-sm text-gray-500">Position</div>
          <div className="font-medium">{player.Position}</div>
        </div>
      </div>
    </div>
  );
};

export default PlayerInfo; 