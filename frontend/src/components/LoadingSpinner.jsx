import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full">
      <div className="relative w-20 h-20">
        {/* Modern Brutalist Spinner */}
        <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-brand-red rounded-full animate-spin border-t-transparent"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="text-[10px] font-black tracking-widest uppercase">WBLX</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
