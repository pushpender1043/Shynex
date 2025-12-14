import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io"; 
import { motion } from "framer-motion";

function Footer() {
  const navigate = useNavigate();

  const handleNav = (path) => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
    navigate(path);
  };

  return (
    // THEME: LUXURY BLACK & GOLD WITH ANIMATIONS
    <footer className='w-full mt-20 bg-[#050505] border-t border-[#d4af37]/20 text-gray-400 font-sans relative overflow-hidden'>
      
      {/* Background Ambience (Restored) */}
      <div className='absolute top-0 left-1/4 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none'></div>

      <div className='max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16 relative z-10'>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>

          {/* 1. BRAND SECTION */}
          <div className='flex flex-col gap-6'>
            {/* Shynex Text Logo */}
            <div className='cursor-pointer' onClick={() => handleNav('/')}>
              <h1 className='text-3xl font-serif font-bold text-white tracking-[0.15em]'>
                SHY<span className='text-[#d4af37]'>NEX</span>
              </h1>
              {/* ✅ WORDING UPDATED */}
              <p className='text-[10px] uppercase tracking-[0.3em] text-[#d4af37] mt-1'>
                Luxury Apparel & Couture
              </p>
            </div>
            
            {/* ✅ WORDING UPDATED */}
            <p className='text-sm text-gray-500 leading-relaxed font-light'>
              Redefining modern fashion. We curate timeless silhouettes that blend sophisticated tailoring with contemporary aesthetics.
            </p>
            
            {/* Social Icons with Framer Motion (Restored) */}
            <div className='flex gap-4 mt-2'>
              {[FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn].map((Icon, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -5, scale: 1.1, borderColor: '#d4af37', color: '#d4af37' }}
                  whileTap={{ scale: 0.9 }}
                  className='w-10 h-10 rounded-full bg-[#111] border border-gray-800 flex items-center justify-center cursor-pointer transition-colors text-gray-400 hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                >
                  <Icon size={16} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* 2. QUICK LINKS */}
          <div>
            <h3 className='text-md font-serif font-bold text-white mb-6 tracking-widest uppercase relative inline-block'>
              Quick Links
              <span className='absolute -bottom-2 left-0 w-1/2 h-[1px] bg-[#d4af37]'></span>
            </h3>
            <ul className='flex flex-col gap-3 text-sm font-light'>
              {['Home', 'Collection', 'About', 'Contact'].map((item, index) => (
                <li 
                  key={index}
                  onClick={() => handleNav(item === 'Home' ? '/' : `/${item.toLowerCase()}`)} 
                  className='cursor-pointer flex items-center gap-2 hover:text-[#d4af37] transition-all duration-300 group'
                >
                  <IoIosArrowForward className='text-[#d4af37] text-xs transition-transform duration-300 group-hover:translate-x-1' /> 
                  <span className='group-hover:translate-x-1 transition-transform duration-300'>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. POLICIES */}
          <div>
            <h3 className='text-md font-serif font-bold text-white mb-6 tracking-widest uppercase relative inline-block'>
              Our Policies
              <span className='absolute -bottom-2 left-0 w-1/2 h-[1px] bg-[#d4af37]'></span>
            </h3>
            <ul className='flex flex-col gap-3 text-sm font-light'>
              {['Privacy Policy', 'Terms & Conditions', 'Return Policy', 'Delivery Info'].map((item, index) => (
                <li 
                  key={index}
                  onClick={() => handleNav('/about')} 
                  className='cursor-pointer flex items-center gap-2 hover:text-[#d4af37] transition-all duration-300 group'
                >
                  <IoIosArrowForward className='text-[#d4af37] text-xs transition-transform duration-300 group-hover:translate-x-1' /> 
                  <span className='group-hover:translate-x-1 transition-transform duration-300'>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. CONTACT INFO */}
          <div>
            <h3 className='text-md font-serif font-bold text-white mb-6 tracking-widest uppercase relative inline-block'>
              Contact Us
              <span className='absolute -bottom-2 left-0 w-1/2 h-[1px] bg-[#d4af37]'></span>
            </h3>
            <ul className='flex flex-col gap-5 text-sm font-light'>
              <li className='flex items-start gap-4 group cursor-default'>
                <div className='mt-1 p-2 bg-[#111] border border-gray-800 rounded-full text-[#d4af37] group-hover:border-[#d4af37] transition-colors'>
                    <FaPhoneAlt size={12} />
                </div>
                <div>
                  <p className='text-gray-500 text-xs uppercase tracking-wider'>Call Us</p>
                  <p className='text-white font-medium group-hover:text-[#d4af37] transition-colors'>+91 98765 43210</p>
                </div>
              </li>
              <li className='flex items-start gap-4 group cursor-default'>
                <div className='mt-1 p-2 bg-[#111] border border-gray-800 rounded-full text-[#d4af37] group-hover:border-[#d4af37] transition-colors'>
                    <FaEnvelope size={12} />
                </div>
                <div>
                  <p className='text-gray-500 text-xs uppercase tracking-wider'>Email Us</p>
                  <p className='text-white font-medium group-hover:text-[#d4af37] transition-colors'>support@shynex.com</p>
                </div>
              </li>
              <li className='flex items-start gap-4 group cursor-default'>
                <div className='mt-1 p-2 bg-[#111] border border-gray-800 rounded-full text-[#d4af37] group-hover:border-[#d4af37] transition-colors'>
                    <FaMapMarkerAlt size={12} />
                </div>
                <div>
                  <p className='text-gray-500 text-xs uppercase tracking-wider'>Location</p>
                  <p className='text-white font-medium group-hover:text-[#d4af37] transition-colors'>New Delhi, India</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* --- COPYRIGHT BAR --- */}
      <div className='border-t border-[#d4af37]/10 bg-black'>
        <div className='max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-600 font-light tracking-wide'>
          {/* ✅ WORDING UPDATED */}
          <p className='hover:text-gray-400 transition-colors'>© 2025 Shynex Luxury. All Rights Reserved.</p>
          <div className='flex gap-6 mt-3 md:mt-0'>
             <span className='hover:text-[#d4af37] cursor-pointer transition-colors'>Privacy</span>
             <span className='hover:text-[#d4af37] cursor-pointer transition-colors'>Terms</span>
             <span className='hover:text-[#d4af37] cursor-pointer transition-colors'>Sitemap</span>
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer;