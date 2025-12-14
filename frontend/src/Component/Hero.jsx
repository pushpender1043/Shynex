import React from 'react'
import { FaCircle } from "react-icons/fa";
import { motion } from 'framer-motion';

function Hero({heroData, heroCount, setHeroCount}) {
  return (
    <div className='w-full h-[100%] flex relative overflow-hidden group'>
        
        {/* Text Content with Animation */}
        <div className='absolute z-20 text-white left-[10%] top-[25%] md:top-[30%] lg:top-[35%] flex flex-col gap-4'>
            <motion.p 
              key={heroData.text1} // Key change hone pe animation trigger hoga
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className='text-[#d4af37] font-bold text-lg md:text-xl uppercase tracking-[0.3em]'
            >
              {heroData.text2}
            </motion.p>
            
            <motion.h1 
              key={heroData.text2}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='text-4xl md:text-6xl lg:text-7xl font-serif leading-tight text-white drop-shadow-lg'
            >
              {heroData.text1}
            </motion.h1>

            <motion.div
               initial={{ width: 0 }}
               animate={{ width: 100 }}
               transition={{ duration: 1, delay: 0.5 }}
               className="h-[2px] bg-[#d4af37] mt-4"
            ></motion.div>
        </div>

        {/* Navigation Dots (Gold & White) */}
        <div className='absolute bottom-10 left-[10%] flex items-center gap-4 z-30'>
          {[0, 1, 2, 3].map((index) => (
            <FaCircle
              key={index}
              onClick={() => setHeroCount(index)}
              className={`w-3 h-3 cursor-pointer transition-all duration-300 ${
                heroCount === index 
                  ? "text-[#d4af37] scale-125 drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" 
                  : "text-white/50 hover:text-white"
              }`}
            />
          ))}
        </div>

        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent pointer-events-none"></div>
      
    </div>
  )
}

export default Hero