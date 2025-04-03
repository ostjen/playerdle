import { MAX_GUESSES } from '../constants';
export default function GameInfoCard() {
    return (
        <div className="h-auto flex flex-col items-center justify-center space-y-4 p-4">
                <h2 className="text-xl font-semibold text-gray-700">How to Play ⚽︎</h2>
                <p className="text-gray-600 text-center">Guess the mystery football player in {MAX_GUESSES} chances or less!</p>
                <div className="w-full bg-gray-100 rounded-lg p-4 mt-2">
                  <p className="text-gray-700 font-medium mb-2">Match these attributes:</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center"><span className="mr-4">🌐</span> <strong>Nation</strong></li>
                    <li className="flex items-center"><span className="mr-4">🏆</span> <strong>League</strong></li>
                    <li className="flex items-center"><span className="mr-4">📍</span> <strong>Position</strong></li>
                    <li className="flex items-center"><span className="mr-4">📏</span> <strong>Height</strong></li>
                    <li className="flex items-center"><span className="mr-4">🎂</span> <strong>Age</strong></li>
                  </ul>
                </div>
                <div className="w-full bg-gray-100 rounded-lg p-4">
                  <p className="text-gray-700 font-medium mb-2">Color guide:</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center"><span className="w-4 h-4 bg-green-500 rounded mr-2"></span> Exact match</div>
                    <div className="flex items-center"><span className="w-4 h-4 bg-yellow-500 rounded mr-2"></span> Close match</div>
                    <div className="flex items-center"><span className="w-4 h-4 bg-red-500 rounded mr-2"></span> No match</div>
                  </div>
                </div>
                <p className="text-gray-500 italic mt-2">Select a player below to start guessing!</p>
        </div>
    )
}
