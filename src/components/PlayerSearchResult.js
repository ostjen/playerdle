import React from 'react';

const PlayerSearchResult = ({ player, onClick }) => {
  // Debug the player object
  console.log("Player in search result:", player);
  
  // Determine which field has the image data
  const imageData = player.images || player.image || player.imagedata || player.img;
  // Check if the image data already includes the data:image prefix
  const imgSrc = imageData && imageData.startsWith('data:') 
    ? imageData 
    : imageData ? `data:image/jpeg;base64,${imageData}` : null;
  
  return (
    <li 
      className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0 transition-colors duration-150"
      onClick={() => onClick(player)}
    >
      <div className="flex items-center">
        <div className="mr-3 flex-shrink-0">
          {imgSrc ? (
            <img 
              src={imgSrc} 
              alt={player.name} 
              className="w-8 h-8 rounded-full object-cover border border-gray-300"
            />
          ) : (
            <img 
              src={`${process.env.PUBLIC_URL}/images/unknown_pfp.png`} 
              alt="Unknown player" 
              className="w-8 h-8 rounded-full object-cover border border-gray-300"
            />
          )}
        </div>
        <div className="flex-grow flex items-center justify-between">
          <div>
            <div className="font-medium">{player.name}</div>
            <div className="text-sm text-gray-500">{player.nation}</div>
          </div>
          <div className="text-right">
            <div className="text-gray-700">{player.Team}</div>
            <div className="text-sm text-gray-500">{player.position}</div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default PlayerSearchResult; 