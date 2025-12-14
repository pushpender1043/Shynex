import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaExclamationTriangle, FaHome } from "react-icons/fa";

function NotFound() {
  let navigate = useNavigate();

  return (
    <div className='w-full min-h-screen bg-black flex flex-col items-center justify-center text-center px-4 font-sans text-white relative overflow-hidden'>
        
        {/* Animated Content */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className='max-w-lg z-10'
        >
            <FaExclamationTriangle className='text-6xl text-[#d4af37] mx-auto mb-6 animate-pulse' />

            <h1 className='text-9xl font-extrabold text-[#111] stroke-white drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]'>
                404
            </h1>

            <h2 className='text-3xl font-serif font-bold text-white mt-4'>
                Page Not Found
            </h2>
            <p className='text-gray-500 mt-3 text-sm md:text-base font-light'>
                The page you are looking for might have been removed or is temporarily unavailable.
            </p>

            <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='mt-8 px-8 py-3 bg-[#d4af37] text-black font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center gap-2 mx-auto'
                onClick={() => navigate("/")}
            >
                <FaHome /> Back to Home
            </motion.button>

        </motion.div>

        {/* Background Ambience */}
        <div className='absolute top-20 left-20 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-[100px] pointer-events-none'></div>
        <div className='absolute bottom-20 right-20 w-64 h-64 bg-gray-700/10 rounded-full blur-[100px] pointer-events-none'></div>
    </div>
  )
}

export default NotFound