import React from 'react';

function PlayerImage({ player, className }) {
  const imageData = player.images || player.image || player.imagedata || player.img;
  
  if (imageData) {
    const imgSrc = imageData.startsWith('data:') 
      ? imageData 
      : `data:image/jpeg;base64,${imageData}`;
    
    return (
      <img 
        src={imgSrc} 
        alt={player.name} 
        className={className || "w-10 h-10 rounded-full object-cover border border-gray-300"}
      />
    );
  } 
  
  return (
    <img 
      src={`${process.env.PUBLIC_URL}/images/unknown_pfp.png`} 
      alt="Unknown player" 
      className={className || "w-10 h-10 rounded-full object-cover border border-gray-300"}
    />
  );
}

export default PlayerImage;
