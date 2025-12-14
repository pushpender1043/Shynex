import React from 'react'

function Title({ text1, text2 }) {
  return (
    <div className='flex flex-col items-center justify-center mb-10'>
      
      {/* 1. Small Top Text (Text1) */}
      <p className='text-gray-500 text-[10px] sm:text-xs font-sans font-medium uppercase tracking-[0.4em] mb-1'>
        {text1}
      </p>

      {/* 2. Big Hero Text (Text2) */}
      <h2 className='text-[#d4af37] text-3xl sm:text-5xl font-serif font-bold uppercase tracking-widest leading-none'>
        {text2}
      </h2>

      {/* 3. Decorative Bottom Element */}
      <div className='flex items-center gap-2 mt-3 opacity-60'>
         <div className='h-[1px] w-8 bg-gradient-to-r from-transparent to-[#d4af37]'></div>
         <div className='w-1.5 h-1.5 bg-[#d4af37] rotate-45'></div>
         <div className='h-[1px] w-8 bg-gradient-to-l from-transparent to-[#d4af37]'></div>
      </div>

    </div>
  )
}

export default Title