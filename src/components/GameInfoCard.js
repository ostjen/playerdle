import React from 'react';
import { useTranslation } from 'react-i18next';
import { MAX_GUESSES } from '../constants';

export default function GameInfoCard() {
    const { t } = useTranslation();
    
    return (
        <div className="h-auto flex flex-col items-center justify-center space-y-4 p-4">
                <h2 className="text-xl font-semibold text-gray-500">{t('howToPlay')}</h2>
                <p className="text-gray-600 text-center">{t('gameDescription', { maxGuesses: MAX_GUESSES })}</p>
                <div className="w-full bg-gray-100 rounded-lg p-4 mt-2">
                  <p className="text-gray-700 font-medium mb-2">{t('attributes.title')}</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center"><span className="mr-4">🌐</span> <strong>{t('attributes.nation')}</strong></li>
                    <li className="flex items-center"><span className="mr-4">🏆</span> <strong>{t('attributes.league')}</strong></li>
                    <li className="flex items-center"><span className="mr-4">📍</span> <strong>{t('attributes.position')}</strong></li>
                    <li className="flex items-center"><span className="mr-4">📏</span> <strong>{t('attributes.height')}</strong></li>
                    <li className="flex items-center"><span className="mr-4">🎂</span> <strong>{t('attributes.age')}</strong></li>
                  </ul>
                </div>
                <div className="w-full bg-gray-100 rounded-lg p-4">
                  <p className="text-gray-700 font-medium mb-2">{t('colorGuide.title')}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center"><span className="w-4 h-4 bg-green-500 rounded mr-2"></span> {t('colorGuide.exact')}</div>
                    <div className="flex items-center"><span className="w-4 h-4 bg-yellow-500 rounded mr-2"></span> {t('colorGuide.close')}</div>
                    <div className="flex items-center"><span className="w-4 h-4 bg-red-500 rounded mr-2"></span> {t('colorGuide.none')}</div>
                  </div>
                </div>
                <p className="text-gray-500 italic mt-2">{t('startGuessing')}</p>
        </div>
    )
}
