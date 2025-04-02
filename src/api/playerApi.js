// This file handles loading the player data

// Utility function to parse a CSV string into an array of objects
const parseCSV = (csvString) => {
  const lines = csvString.split('\n');
  const headers = lines[0].split(',');
  
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
        player[header.trim()] = values[index]?.trim() || '';
      });
      
      return player;
    });
};

// Mock data if we can't load the CSV
const generateMockPlayers = () => {
  return [
    { Name: "Lionel Messi", Nation: "Argentina", Team: "Inter Miami CF", Position: "RW", Age: "37" },
    { Name: "Cristiano Ronaldo", Nation: "Portugal", Team: "Al Nassr", Position: "ST", Age: "39" },
    { Name: "Kylian Mbappé", Nation: "France", Team: "Real Madrid", Position: "ST", Age: "25" },
    { Name: "Erling Haaland", Nation: "Norway", Team: "Manchester City", Position: "ST", Age: "24" },
    { Name: "Jude Bellingham", Nation: "England", Team: "Real Madrid", Position: "CAM", Age: "21" }
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