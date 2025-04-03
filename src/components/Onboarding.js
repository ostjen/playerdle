import React, { useState, useRef, useEffect } from 'react';
import { setOnboardingCompleted } from '../utils/storage';

const Onboarding = ({ onComplete }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const containerRef = useRef(null);

  // Required minimum swipe distance
  const minSwipeDistance = 50;

  const onboardingData = [
    {
      title: "<i><small>Welcome to</small><br></i> <b>Playerdle</b>!",
      content: "<b>Try to guess the mystery football player</b>"
    },
    {
      title: "<b>How to Play</b>",
      content: "For each guess, you'll see feedback on how close you are to the target player based on a set of attributes."
    },
    {
      title: "<b>Attributes</b>",
      content: `
      <ul class="list-none space-y-2 mt-2">
        <li class="flex items-center"><span class="mr-2">⚽</span> <b>Position</b></li>
        <li class="flex items-center"><span class="mr-2">🌍</span> <b>Nationality</b></li>
        <li class="flex items-center"><span class="mr-2">🏆</span> <b>Club</b></li>
        <li class="flex items-center"><span class="mr-2">🎂</span> <b>Age</b></li>
        <li class="flex items-center"><span class="mr-2">📏</span> <b>Height</b></li>
      </ul>`
    },
    {
      title: "",
      content: "Our DB contains <b>over 400 players</b> from the top leagues in the world."
    }
  ];

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && currentPage < onboardingData.length - 1) {
      setCurrentPage(prev => prev + 1);
    } else if (isRightSwipe && currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < onboardingData.length - 1) {
      setCurrentPage(prev => prev + 1);
    } else {
      completeOnboarding();
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const completeOnboarding = () => {
    setOnboardingCompleted();
    onComplete();
  };

  // Function to render HTML content safely
  const renderHtmlContent = (htmlContent) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="relative">
        {/* Navigation arrows as a separate overlay layer */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="flex items-center justify-between h-full px-2">
            <div className="pointer-events-auto">
              {currentPage > 0 && (
                <button 
                  onClick={goToPrevPage}
                  className="bg-gray-100 p-1.5 rounded-full shadow-md hover:bg-gray-200 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
            </div>
            
            <div className="pointer-events-auto">
              <button 
                onClick={goToNextPage}
                className="bg-gray-100 p-1.5 rounded-full shadow-md hover:bg-gray-200 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Content container */}
        <div 
          ref={containerRef}
          className="relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="flex transition-transform duration-300 ease-in-out" 
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {onboardingData.map((page, index) => (
              <div key={index} className="w-full flex-shrink-0 px-16">
                <div className="text-center py-10">
                  <h2 className="text-3xl mb-10 text-center">{renderHtmlContent(page.title)}</h2>
                  <div className="text-gray-700 mb-6 text-lg">
                    {renderHtmlContent(page.content)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Page indicator dots */}
      <div className="flex justify-center mt-6 space-x-3">
        {onboardingData.map((_, index) => (
          <div 
            key={index} 
            className={`h-3 w-3 rounded-full ${currentPage === index ? 'bg-blue-500' : 'bg-gray-300'} cursor-pointer`}
            onClick={() => setCurrentPage(index)}
          />
        ))}
      </div>

      {/* Skip / Continue button */}
      <div className="text-center mt-8">
        {currentPage < onboardingData.length - 1 ? (
          <button 
            onClick={completeOnboarding} 
            className="text-blue-500 text-base underline hover:text-blue-700 transition-colors"
          >
            Skip
          </button>
        ) : (
          <button 
            onClick={completeOnboarding} 
            className="bg-blue-500 text-white px-8 py-3 rounded-lg font-medium text-lg hover:bg-blue-600 transition-colors"
          >
            Get Started
          </button>
        )}
      </div>
    </div>
  );
};

export default Onboarding; 