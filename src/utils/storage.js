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

export const hasPlayerPlayedBefore = () => {
  try {
    // Check for any guesses or completion of onboarding
    const storedGuessesString = localStorage.getItem('guesses');
    const onboardingCompleted = localStorage.getItem('onboarding_completed');
    
    return (storedGuessesString && Object.keys(JSON.parse(storedGuessesString)).length > 0) || onboardingCompleted === 'true';
  } catch (error) {
    console.error("Error checking if player played before:", error);
  }
  return false;
};

export const setOnboardingCompleted = () => {
  localStorage.setItem('onboarding_completed', 'true');
}; 