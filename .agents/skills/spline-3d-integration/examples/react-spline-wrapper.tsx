import React, { useState, Suspense } from 'react';
import Spline from '@splinetool/react-spline';
import type { Application } from '@splinetool/runtime';

interface SplineWrapperProps {
  sceneUrl: string;
  className?: string;
  onLoaded?: (app: Application) => void;
  posterImage?: string;
}

/**
 * Production-ready Spline wrapper with loading skeleton and smooth fade-in
 */
export const ReactSplineWrapper: React.FC<SplineWrapperProps> = ({
  sceneUrl,
  className = 'w-full h-[600px]',
  onLoaded,
  posterImage,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = (splineApp: Application) => {
    setIsLoaded(true);
    if (onLoaded) {
      onLoaded(splineApp);
    }
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-slate-950 ${className}`}>
      {/* Loading & Poster Placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm transition-opacity duration-500">
          {posterImage && (
            <img
              src={posterImage}
              alt="3D Scene Preview"
              className="absolute inset-0 w-full h-full object-cover opacity-40 blur-sm"
            />
          )}
          <div className="relative z-10 flex items-center space-x-3 text-slate-300">
            <svg
              className="animate-spin h-6 w-6 text-indigo-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="text-sm font-medium tracking-wide">Initializing 3D Scene...</span>
          </div>
        </div>
      )}

      {/* Error Fallback */}
      {hasError && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-900 text-slate-400 p-6 text-center">
          <p className="text-sm mb-2 text-rose-400">Unable to load 3D scene</p>
          {posterImage && (
            <img
              src={posterImage}
              alt="Fallback Preview"
              className="w-full max-h-[300px] object-cover rounded-lg"
            />
          )}
        </div>
      )}

      {/* Main Spline Canvas */}
      <Suspense fallback={null}>
        <div className={`w-full h-full transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <Spline
            scene={sceneUrl}
            onLoad={handleLoad}
            onError={() => setHasError(true)}
          />
        </div>
      </Suspense>
    </div>
  );
};

export default ReactSplineWrapper;
