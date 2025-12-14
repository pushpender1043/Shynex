import React from 'react'
import { FaExchangeAlt, FaCheckCircle, FaHeadset, FaGem } from 'react-icons/fa' // Gem icon added for flair
import { motion } from 'framer-motion'

const OurPolicy = () => {
  return (
    // Container: Dark Theme with subtle borders
    <div className='bg-[#0a0a0a] py-16 border-t border-gray-900 text-white font-sans'>
      <div className='max-w-7xl mx-auto px-4 sm:px-10'>
        
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-gray-800'>
          
          {/* 1. Exchange Policy */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='flex flex-col items-center gap-4 px-4'
          >
            <div className='text-[#d4af37] text-4xl mb-2'>
               <FaExchangeAlt />
            </div>
            <div>
               <p className='font-serif font-bold text-lg tracking-wide mb-1 text-white'>Seamless Exchange</p>
               <p className='text-gray-500 text-sm font-light'>Hassle-free upgrades for your perfect fit.</p>
            </div>
          </motion.div>

          {/* 2. Return Policy */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='flex flex-col items-center gap-4 px-4 pt-8 sm:pt-0'
          >
            <div className='text-[#d4af37] text-4xl mb-2'>
               <FaCheckCircle />
            </div>
            <div>
               <p className='font-serif font-bold text-lg tracking-wide mb-1 text-white'>7 Days Privilege</p>
               <p className='text-gray-500 text-sm font-light'>Shop with confidence. Returns are on us.</p>
            </div>
          </motion.div>

          {/* 3. Customer Support */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className='flex flex-col items-center gap-4 px-4 pt-8 sm:pt-0'
          >
            <div className='text-[#d4af37] text-4xl mb-2'>
               <FaHeadset />
            </div>
            <div>
               <p className='font-serif font-bold text-lg tracking-wide mb-1 text-white'>Concierge Support</p>
               <p className='text-gray-500 text-sm font-light'>24/7 Dedicated assistance for our members.</p>
            </div>
          </motion.div>

        </div>

      </div>
    </div>
  )
}

export default OurPolicy