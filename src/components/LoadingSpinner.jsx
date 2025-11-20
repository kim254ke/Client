import React from "react";

export default function LoadingSpinner({ fullScreen = false, message = "Loading beauty..." }) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
        <div className="text-center">
          {/* Animated Logo/Icon */}
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-ping opacity-75"></div>
            <div className="relative w-24 h-24 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
          </div>

          {/* Loading Text */}
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 animate-pulse">
            {message}
          </h2>
          
          {/* Loading Bar */}
          <div className="w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-full animate-loading-bar"></div>
          </div>

          {/* Fun Messages */}
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 animate-pulse">
            Preparing your perfect beauty experience ✨
          </p>
        </div>
      </div>
    );
  }

  // Inline spinner for smaller loading states
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-purple-200 dark:border-purple-800 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-purple-600 dark:border-t-purple-400 rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-transparent border-t-pink-600 dark:border-t-pink-400 rounded-full animate-spin-slow"></div>
      </div>
    </div>
  );
}

// Add these styles to your global CSS or in a <style> tag
export const loadingStyles = `
  @keyframes loading-bar {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(400%);
    }
  }
  
  .animate-loading-bar {
    animation: loading-bar 1.5s ease-in-out infinite;
  }

  @keyframes spin-slow {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(-360deg);
    }
  }

  .animate-spin-slow {
    animation: spin-slow 2s linear infinite;
  }
`;