import React from 'react';

const Loading = () => {
  return (
    <div className='flex items-center justify-center min-h-[50vh] w-full'>
      {/* Container */}
      <div className='relative flex flex-col items-center gap-4'>
        
        {/* Gold Spinner */}
        <div className="w-12 h-12 rounded-full border-[3px] border-[#333] border-t-[#d4af37] animate-spin"></div>
        
        {/* Optional Text */}
        <p className='text-[#d4af37] text-xs font-bold uppercase tracking-[0.2em] animate-pulse'>
          Loading...
        </p>

      </div>
    </div>
  )
}

export default Loading;