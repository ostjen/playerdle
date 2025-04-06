import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCountdown } from '../hooks/useCountdown';

const NextChallengeTimer = () => {
  const { t } = useTranslation();
  const timeLeft = useCountdown();

  // Format digits to always show two digits (e.g., 01, 02, etc.)
  const formatTimeUnit = (unit) => unit.toString().padStart(2, '0');

  return (
    <div className="mt-4 p-3 bg-blue-50 rounded-lg shadow-sm">
      <h3 className="text-md font-medium text-blue-800 mb-2">{t('nextChallenge')}</h3>
      <div className="flex justify-center space-x-4">
        <div className="text-center">
          <div className="text-xl font-bold text-blue-700">{formatTimeUnit(timeLeft.hours)}</div>
          <div className="text-xs text-blue-600">{t('hours')}</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-blue-700">{formatTimeUnit(timeLeft.minutes)}</div>
          <div className="text-xs text-blue-600">{t('minutes')}</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-blue-700">{formatTimeUnit(timeLeft.seconds)}</div>
          <div className="text-xs text-blue-600">{t('seconds')}</div>
        </div>
      </div>
    </div>
  );
};

export default NextChallengeTimer; 