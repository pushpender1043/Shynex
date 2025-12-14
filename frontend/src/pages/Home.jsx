import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; 
import Nav from '../Component/Nav';
import Footer from '../Component/Footer.jsx';
import { FaTags, FaFireAlt, FaShoppingBag, FaStar, FaCrown, FaArrowRight } from "react-icons/fa";

// --- COMPONENTS ---
import LatestCollection from '../Component/LatestCollection';
import BestSeller from '../Component/BestSeller';
import CrazyDeals from '../Component/CrazyDeal';
import OurPolicy from '../Component/OurPolicy';
import NewLetterBox from '../Component/NewLetterBox';
import CustomerLove from '../Component/CustomerLove';
import Marquee from '../Component/Marquee'; // Imported

// --- ASSETS REPLACEMENT (Premium URLs) ---
const heroImages = [
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?q=80&w=2070&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2020&auto=format&fit=crop"  
];

function Home() {
  const navigate = useNavigate();

  // --- HERO SLIDER ---
  const slides = [
    {
      id: 1,
      tag: "ROYAL COLLECTION",
      title: "Exclusive Men's Wear",
      subtitle: "Experience the epitome of luxury.",
      img: heroImages[0], 
      bg: "bg-black",
      btnColor: "bg-[#d4af37] text-black hover:bg-white",
      icon: <FaCrown className="text-[#d4af37]" />
    },
    {
      id: 2,
      tag: "WINTER LUXE",
      title: "Premium Jackets",
      subtitle: "Warmth meets sophistication.",
      img: heroImages[1],
      bg: "bg-[#0f0f0f]",
      btnColor: "bg-white text-black hover:bg-[#d4af37]",
      icon: <FaStar className="text-white" />
    },
    {
      id: 3,
      tag: "ETHNIC GLAMOUR",
      title: "Designer Kurtis",
      subtitle: "Tradition tailored for the modern era.",
      img: heroImages[2],
      bg: "bg-[#0a0a0a]",
      btnColor: "bg-[#d4af37] text-black hover:bg-white",
      icon: <FaShoppingBag className="text-[#d4af37]" />
    },
    {
      id: 4,
      tag: "URBAN CHIC",
      title: "Signature Trousers",
      subtitle: "Crafted for the perfect fit.",
      img: heroImages[3],
      bg: "bg-[#111]",
      btnColor: "bg-white text-black hover:bg-[#d4af37]",
      icon: <FaTags className="text-white" />
    },
    {
      id: 5,
      tag: "SNEAKER HEADS",
      title: "Limited Edition Kicks",
      subtitle: "Walk the talk with gold standards.",
      img: heroImages[4],
      bg: "bg-black",
      btnColor: "bg-[#d4af37] text-black hover:bg-white",
      icon: <FaFireAlt className="text-[#d4af37]" />
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4500); 
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full min-h-screen bg-black overflow-x-hidden font-sans text-white">
      <Nav />

      {/* =========================================
          1. HERO SLIDER (Mobile Optimized)
         ========================================= */}
      <div className="relative w-full h-[85vh] md:h-[90vh] overflow-hidden mt-[70px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full flex flex-col md:flex-row transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            } ${slide.bg}`}
          >
            
            {/* --- IMAGE SECTION --- */}
            <div className="w-full h-[55%] md:h-full md:w-1/2 order-1 md:order-2 relative overflow-hidden">
               <motion.img 
                  key={`img-${index}`}
                  initial={{ scale: 1.1, opacity: 0 }} 
                  animate={{ scale: 1, opacity: 1 }} 
                  transition={{ duration: 1 }}
                  src={slide.img} 
                  alt="Hero" 
                  className="w-full h-full object-cover object-top md:object-contain md:object-center drop-shadow-2xl"
               />
               <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black via-black/60 to-transparent md:hidden"></div>
            </div>

            {/* --- TEXT SECTION --- */}
            <div className="w-full h-[45%] md:h-full md:w-1/2 order-2 md:order-1 flex flex-col items-center md:items-start justify-center text-center md:text-left px-6 md:pl-20 md:pr-10 gap-3 md:gap-6 relative z-20 bg-black md:bg-transparent">
              
              <motion.div 
                key={`tag-${index}`}
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
                className="flex items-center gap-2 px-3 py-1 border border-[#d4af37]/30 rounded-full bg-[#111]"
              >
                {slide.icon}
                <span className="text-[10px] md:text-xs font-bold text-[#d4af37] tracking-[0.2em] uppercase">{slide.tag}</span>
              </motion.div>

              <motion.h1 
                key={`title-${index}`}
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-7xl font-serif font-medium text-white leading-tight"
              >
                {slide.title}
              </motion.h1>
              
              <motion.p 
                key={`sub-${index}`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
                className="text-sm md:text-xl text-gray-400 font-light tracking-wide max-w-xs md:max-w-none"
              >
                {slide.subtitle}
              </motion.p>
              
              <motion.button
                key={`btn-${index}`}
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}
                onClick={() => navigate('/collection')}
                className={`mt-4 md:mt-6 px-8 py-3 md:px-10 md:py-4 text-xs md:text-sm font-bold uppercase tracking-[0.2em] rounded-sm shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all duration-300 flex items-center gap-2 ${slide.btnColor}`}
              >
                Explore <FaArrowRight />
              </motion.button>
            </div>

          </div>
        ))}

        <div className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3 z-30">
          {slides.map((_, idx) => (
            <div 
              key={idx} 
              onClick={() => setCurrentSlide(idx)}
              className={`h-1 rounded-full cursor-pointer transition-all duration-500 ${currentSlide === idx ? 'bg-[#d4af37] w-8 md:w-12' : 'bg-gray-700 w-2 md:w-6'}`}
            ></div>
          ))}
        </div>
      </div>

      {/* ✅ 2. MOVED UP: Marquee (Immediate Brand Impact) */}
      <Marquee />

      {/* --- OTHER SECTIONS --- */}
      <section className="w-full"><LatestCollection /></section>
      
      <CrazyDeals /> {/* The Season Edit */}
      
      <section className="w-full"><BestSeller /></section>
      
      {/* ✅ 3. REORDERED: Policy before Reviews implies trust before social proof */}
      <OurPolicy />
      
      <CustomerLove />
      
      <div className="py-0 border-t border-gray-900">
        <NewLetterBox />
      </div>

      <Footer />
    </div>
  );
}

export default Home;