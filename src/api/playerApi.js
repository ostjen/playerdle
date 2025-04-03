// This file handles loading the player data

// Utility function to parse a CSV string into an array of objects
const parseCSV = (csvString) => {
  const lines = csvString.split('\n');
  const headers = lines[0].split(',').map(header => header.trim());
  
  return lines.slice(1)
    .filter(line => line.trim() !== '')
    .map(line => {
      // Handle potential commas in quoted values
      const values = [];
      let currentValue = '';
      let inQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(currentValue);
          currentValue = '';
        } else {
          currentValue += char;
        }
      }
      
      values.push(currentValue); // Add the last value
      
      // Create an object from the array of values
      const player = {};
      headers.forEach((header, index) => {
        let value = values[index]?.trim() || '';
        
        // Remove quotes if present
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.substring(1, value.length - 1);
        }
        
        // Try to auto-detect and convert numeric values
        if (value !== '') {
          // Check if value is a number
          if (!isNaN(value) && !isNaN(parseFloat(value))) {
            // Integer check (no decimal point)
            if (value.indexOf('.') === -1) {
              player[header] = parseInt(value, 10);
            } else {
              player[header] = parseFloat(value);
            }
          } else {
            player[header] = value;
          }
        } else {
          player[header] = value;
        }
      });
      
      return player;
    });
};


// Function to load player data
export const loadPlayers = async () => {
  try {
    // Try to fetch from the public directory
    const response = await fetch(`${process.env.PUBLIC_URL}/data/reduced_with_images.csv`);
    
    if (!response.ok) {
      console.warn('Could not load player data, using mock data instead');
    }
    
    const csvData = await response.text();
    const players = parseCSV(csvData);
    
    // Debug: Log the first player to see its structure
    if (players && players.length > 0) {
      console.log("First player data structure:", players[0]);
      console.log("Player image data field names:", 
        Object.keys(players[0]).filter(key => 
          key.toLowerCase().includes('image') || 
          key.toLowerCase().includes('img') || 
          key.toLowerCase().includes('photo')
        )
      );
    }
    
    return players;
  } catch (error) {
    console.error('Error loading players:', error);
  }
};

const playerApi = { loadPlayers };
export default playerApi; 