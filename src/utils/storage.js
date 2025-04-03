// New file for localStorage interactions
export const saveGuesses = (date, guesses) => {
  try {
    const existingDataString = localStorage.getItem('guesses');
    const existingData = existingDataString ? JSON.parse(existingDataString) : {};
    existingData[date] = guesses;
    localStorage.setItem('guesses', JSON.stringify(existingData));
  } catch (error) {
    console.error("Error saving guesses to localStorage:", error);
  }
};

export const loadGuesses = (date) => {
  try {
    const storedGuessesString = localStorage.getItem('guesses');
    if (storedGuessesString) {
      const storedGuesses = JSON.parse(storedGuessesString);
      return storedGuesses[date] || [];
    }
  } catch (error) {
    console.error("Error parsing stored guesses:", error);
  }
  return [];
}; 