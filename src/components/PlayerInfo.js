import React from 'react';

const PlayerInfo = ({ player }) => {
  if (!player) {
    return (
      <div className="text-center py-4 text-gray-500">
        No player selected
      </div>
    );
  }

  console.log("Player in PlayerInfo:", player);
  const imageData = player.images || player.image || player.imagedata || player.img;
  // Check if the image data already includes the data:image prefix
  const imgSrc = imageData && imageData.startsWith('data:') 
    ? imageData 
    : imageData ? `data:image/jpeg;base64,${imageData}` : null;

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <div className="mx-auto">
          {imgSrc ? (
            <img 
              src={imgSrc} 
              alt={player.name} 
              className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
            />
          ) : (
            <img 
              src={`${process.env.PUBLIC_URL}/images/unknown_pfp.png`} 
              alt="Unknown player" 
              className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
            />
          )}
        </div>
      </div>
      <h2 className="text-xl font-bold mb-4 text-center">{player.name}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-sm text-gray-500">Nation</div>
          <div className="font-medium">{player.nation}</div>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-sm text-gray-500">Age</div>
          <div className="font-medium">{player.age}</div>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-sm text-gray-500">Team</div>
          <div className="font-medium">{player.team}</div>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-sm text-gray-500">Position</div>
          <div className="font-medium">{player.position}</div>
        </div>
      </div>
    </div>
  );
};

export default PlayerInfo; 