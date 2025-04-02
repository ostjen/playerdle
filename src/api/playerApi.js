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

// Mock data if we can't load the CSV
const generateMockPlayers = () => {
  return [
    { name: "Lionel Messi", nation: "Argentina", team: "Inter Miami CF", position: "RW", age: 37 },
    { name: "Cristiano Ronaldo", nation: "Portugal", team: "Al Nassr", position: "ST", age: 39 },
    { name: "Kylian Mbappé", nation: "France", team: "Real Madrid", position: "ST", age: 25 },
    { name: "Erling Haaland", nation: "Norway", team: "Manchester City", position: "ST", age: 24 },
    { name: "Jude Bellingham", nation: "England", team: "Real Madrid", position: "CAM", age: 21 }
  ];
};

// Function to load player data
export const loadPlayers = async () => {
  try {
    // Try to fetch from the public directory
    const response = await fetch(`${process.env.PUBLIC_URL}/data/fifa_players_reduced.csv`);
    
    if (!response.ok) {
      console.warn('Could not load player data, using mock data instead');
      return generateMockPlayers();
    }
    
    const csvData = await response.text();
    
    return parseCSV(csvData);
  } catch (error) {
    console.error('Error loading players:', error);
    return generateMockPlayers();
  }
};

const playerApi = { loadPlayers };
export default playerApi; 