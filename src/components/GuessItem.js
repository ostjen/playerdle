import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PlayerImage from './PlayerImage';
import { MatchType } from '../utils/app_utils';

function GuessItem({ guess }) {
  const { t } = useTranslation();
  
  return (
    <div className="border rounded p-2 sm:p-3 mb-3 bg-white">
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold text-sm sm:text-base">{guess.player.name}</div>
        <div className="flex-shrink-0">
          <PlayerImage player={guess.player} />
        </div>
      </div>
      
      <div className="grid grid-cols-5 gap-1 sm:gap-2 text-[10px] sm:text-xs">
        {/* Nation column */}
        <AttributeCell 
          label={t('attributes.nation')} 
          value={guess.player.nation} 
          matchType={guess.matches.nation} 
        />
        
        {/* League column */}
        <AttributeCell 
          label={t('attributes.league')} 
          value={guess.player.league} 
          matchType={guess.matches.league} 
        />
        
        {/* Position column */}
        <AttributeCell 
          label={t('attributes.position')} 
          value={guess.player.position} 
          matchType={guess.matches.position}
          isPosition={true}
        />
        
        {/* Height column */}
        <AttributeCell 
          label={t('attributes.height')} 
          value={guess.player.height} 
          matchType={guess.matches.height}
          showDirection={true}
          direction={guess.matches.heightDirection}
        />
        
        {/* Age column */}
        <AttributeCell 
          label={t('attributes.age')} 
          value={guess.player.age} 
          matchType={guess.matches.age} 
          showDirection={true}
          direction={guess.matches.ageDirection}
        />
      </div>
    </div>
  );
}

function AttributeCell({ label, value, matchType, showDirection, direction, isPosition }) {
  const { t } = useTranslation();
  const [showPositionTooltip, setShowPositionTooltip] = useState(false);
  
  const getBackgroundColor = () => {
    if (matchType === MatchType.EXACT) return 'bg-green-500 text-white';
    if (matchType === MatchType.PARTIAL) return 'bg-yellow-500 text-white';
    return 'bg-red-100';
  };

  const renderDirectionArrow = () => {
    if (!showDirection || matchType === MatchType.EXACT) return null;
    
    if (direction === 'higher') {
      return <span className="ml-1">↑</span>;
    } else if (direction === 'lower') {
      return <span className="ml-1">↓</span>;
    }
    return null;
  };
  
  const getPositionFullName = (positionCode) => {
    return t(`positions.${positionCode}.full`, positionCode);
  };
  
  const getTranslatedPositionCode = (positionCode) => {
    return t(`positions.${positionCode}.short`, positionCode);
  };
  
  const handlePositionClick = () => {
    if (isPosition) {
      setShowPositionTooltip(!showPositionTooltip);
    }
  };
  
  // Decide what value to display based on type
  const displayValue = isPosition ? getTranslatedPositionCode(value) : value;
  
  return (
    <div className="flex flex-col relative">
      <span className="text-gray-500 text-[9px] sm:text-xs mb-0.5 sm:mb-1 truncate">{label}</span>
      <div 
        className={`py-0.5 px-1 sm:p-1 text-center rounded text-[10px] sm:text-xs font-medium ${getBackgroundColor()} ${isPosition ? 'cursor-pointer' : ''}`}
        onClick={handlePositionClick}
      >
        {displayValue}
        {renderDirectionArrow()}
      </div>
      
      {isPosition && showPositionTooltip && (
        <div className="absolute z-10 bg-black bg-opacity-90 text-white rounded py-1 px-2 text-[10px] sm:text-xs -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          {getPositionFullName(value)}
        </div>
      )}
    </div>
  );
}

export default GuessItem; 