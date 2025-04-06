import { useState, useEffect } from 'react';

export function useCountdown() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeUntilMidnight());

  function calculateTimeUntilMidnight() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const difference = tomorrow - now;
    
    // Convert to hours, minutes, seconds
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    return {
      hours,
      minutes,
      seconds,
      total: difference
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const timeRemaining = calculateTimeUntilMidnight();
      setTimeLeft(timeRemaining);
      
      // Clear interval when countdown reaches zero
      if (timeRemaining.total <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(timer);
  }, []);

  return timeLeft;
} 