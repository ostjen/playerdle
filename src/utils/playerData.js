import { loadPlayers } from '../api/playerApi';

// Get players from localStorage or load from API
export const getPlayers = async () => {
  const playersCache = localStorage.getItem('playerdle_players');
  
  if (playersCache) {
    return JSON.parse(playersCache);
  } else {
    const players = await loadPlayers();
    
    // Cache the players in localStorage
    localStorage.setItem('playerdle_players', JSON.stringify(players));
    
    return players;
  }
};

// Normalize text for searching (remove accents, apostrophes, and other special characters)
export const normalizeText = (text) => {
  if (!text) return '';
  
  // Convert to lowercase and normalize accents
  return text
    .toLowerCase()
    // Normalize accents to their base letters
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Remove apostrophes and other non-alphanumeric characters except spaces
    .replace(/[^\w\s]/g, '')
    // Replace multiple spaces with a single space
    .replace(/\s+/g, ' ')
    .trim();
};

// Search players by name
export const searchPlayers = (query, players) => {
  if (!query || query.length < 1) return [];
  
  const normalizedQuery = normalizeText(query);
  
  return players
    .filter(player => {
      const normalizedName = normalizeText(player.name);
      return normalizedName.includes(normalizedQuery);
    })
    .slice(0, 10); // Limit to 10 results
};

// Select daily player
export const getDailyPlayer = (players) => {
  // Use a date-based seed for consistent daily player
  const today = new Date();
  const dateString = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
  
  // Create a simple hash of the date string
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    hash = ((hash << 5) - hash) + dateString.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Use the hash to select a player
  const index = Math.abs(hash) % players.length;
  return players[index];
};

const playerDataUtils = { getPlayers, searchPlayers, getDailyPlayer };
export default playerDataUtils; 