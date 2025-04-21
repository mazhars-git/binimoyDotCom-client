"use client";

const LoadingState = () => {
  return (
    <div className="flex justify-center items-center h-full min-h-[200px]">
      <div className="relative w-20 h-20">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-emerald-100 border-t-emerald-500 animate-spin"></div>
        
        {/* Middle ring */}
        <div className="absolute inset-2 rounded-full border-4 border-emerald-50 border-t-emerald-400 animate-spin animation-delay-100"></div>
        
        {/* Inner ring */}
        <div className="absolute inset-4 rounded-full border-4 border-emerald-100 border-t-emerald-600 animate-spin animation-delay-200"></div>
        
        {/* Center dot */}
        <div className="absolute inset-6 rounded-full bg-emerald-500"></div>
      </div>
    </div>
  );
};

export default LoadingState;