import React from 'react';
import { motion } from 'framer-motion';

const Marquee = () => {
  // Text jo repeat hoga
  const text = "WORLDWIDE SHIPPING  •  LUXURY REDEFINED  •  SHYNEX EXCLUSIVE  •  PREMIUM QUALITY  •  ";
  
  // Array banaya taaki loop seamless lage (3 baar repeat kiya)
  const repeatedText = Array(4).fill(text).join(" ");

  return (
    <div className="w-full bg-[#d4af37] py-3 overflow-hidden border-y border-black relative z-10">
      
      {/* Moving Track */}
      <motion.div
        className="whitespace-nowrap flex"
        animate={{ x: ["0%", "-100%"] }} // Left taraf chalega
        transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 20 // Speed (jitna number bada, utna slow)
        }}
      >
        {/* Do baar render kiya taaki gap na aaye */}
        <span className="text-black font-bold text-xs md:text-sm uppercase tracking-[0.3em] mr-10">
            {repeatedText}
        </span>
        <span className="text-black font-bold text-xs md:text-sm uppercase tracking-[0.3em] mr-10">
            {repeatedText}
        </span>
      </motion.div>

    </div>
  );
};

export default Marquee;