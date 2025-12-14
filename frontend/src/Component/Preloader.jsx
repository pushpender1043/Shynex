import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Preloader = () => {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} 0 Q${dimension.width / 2} 0 0 0 L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 }
    }
  }

  const slideUp = {
    initial: { top: 0 },
    exit: { top: "-100vh", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }
  }

  return (
    <motion.div 
        variants={slideUp} 
        initial="initial" 
        exit="exit" 
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-transparent" // bg transparent kiya taaki SVG dikhe
    >
        {dimension.width > 0 && (
            <>
                {/* BLACK BACKGROUND WITH CURVE */}
                <svg className="absolute top-0 w-full h-[calc(100%+300px)] pointer-events-none fill-[#050505]">
                    <motion.path 
                        variants={curve} 
                        initial="initial" 
                        exit="exit" 
                    ></motion.path>
                </svg>

                {/* CONTENT (Text & Loading) */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.5 } }} // Text jaldi gayab hoga
                    className='relative z-10 flex flex-col items-center gap-2 text-white'
                >
                    <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-[0.2em] flex items-center">
                        SHY<span className="text-[#d4af37]">NEX</span>
                        <span className="text-[#d4af37] text-6xl md:text-8xl leading-none -mt-4 ml-1">.</span>
                    </h1>
                    
                    <p className='text-xs uppercase tracking-[0.5em] text-gray-500 mt-4'>
                        Luxury Redefined
                    </p>

                    {/* Gold Loading Line */}
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: 100 }}
                        transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                        className="h-[2px] bg-[#d4af37] mt-6"
                    />
                </motion.div>
            </>
        )}
    </motion.div>
  );
};

export default Preloader;