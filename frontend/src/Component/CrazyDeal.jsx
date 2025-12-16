import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaStar } from "react-icons/fa"; 
import { motion } from 'framer-motion';
import logo1 from "../assets/logo1.jpg";
import logo2 from "../assets/logo2.jpeg";
import logo3 from "../assets/logo3.jpg";
import logo4 from "../assets/logo4.webp";
import logo6 from "../assets/logo6.jpg";

// --- DATA ---
const CRAZY_DEALS_DATA_BASE = [
    
    { mainImage: logo1, dealText: 'The Gentleman’s Cut', link: '/collection', subText: "Suits & Blazers" },
    { mainImage: logo2, dealText: 'Urban Sophistication', link: '/collection', subText: "Modern Fit" },
    { mainImage: logo3, dealText: 'Weekend Luxe', link: '/collection', subText: "Relaxed Wear" },
    { mainImage:logo4, dealText: 'Street Couture', link: '/collection/', subText: "Limited Drop" },
    { mainImage: logo6, dealText: 'Royal Heritage', link: '/collection/', subText: "Wedding Series" },
];

const ALL_DEALS = [
    ...CRAZY_DEALS_DATA_BASE,
    ...CRAZY_DEALS_DATA_BASE.map(d => ({ ...d, dealText: 'Winter Essentials' })),
    ...CRAZY_DEALS_DATA_BASE.map(d => ({ ...d, dealText: 'Last Chance to Buy' })),
];

function CrazyDeals() {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [timeLeft, setTimeLeft] = useState({ hours: 11, minutes: 59, seconds: 59 });
    
    // ✅ SMART LOGIC: Mobile = 1 Card, Desktop = 5 Cards
    const [itemsPerSlide, setItemsPerSlide] = useState(window.innerWidth < 768 ? 1 : 5);

    useEffect(() => {
        const handleResize = () => {
            setItemsPerSlide(window.innerWidth < 768 ? 1 : 5);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Resize hone par slide reset karo taaki layout na toote
    useEffect(() => { setCurrentSlide(0) }, [itemsPerSlide]);

    // Calculate Slides based on dynamic itemsPerSlide
    const SLIDE_COUNT = Math.ceil(ALL_DEALS.length / itemsPerSlide);

    // Timer Logic
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                return { hours: 12, minutes: 0, seconds: 0 }; 
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Auto Slide Logic
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % SLIDE_COUNT);
        }, 5000); 
        return () => clearInterval(interval);
    }, [SLIDE_COUNT]); 

    return (
        <div className="py-24 bg-[#050505] text-white overflow-hidden relative border-t border-[#111]">
            
            <div className="container mx-auto px-4 relative z-10">
                
                {/* HEADER */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-8 border-b border-[#222] pb-6">
                    <motion.div 
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-3">
                            <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-widest text-white">
                                THE SEASON <span className='text-[#d4af37] italic'>EDIT</span>
                            </h2>
                        </div>
                        <p className="text-gray-500 mt-2 text-xs uppercase tracking-[0.3em]">Curated selections. Limited availability.</p>
                    </motion.div>

                    {/* Timer */}
                    <div className="flex items-center gap-6">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest hidden sm:block">Offer Ends In:</p>
                        <div className="flex gap-2 text-center">
                            {['hours', 'minutes', 'seconds'].map((unit, i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <div className="bg-[#111] border border-[#333] w-12 h-12 flex items-center justify-center">
                                        <span className="text-[#d4af37] font-sans text-xl font-bold">
                                            {String(timeLeft[unit]).padStart(2, '0')}
                                        </span>
                                    </div>
                                    <span className="text-[8px] text-gray-600 uppercase tracking-widest mt-1">{unit.substr(0, 3)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* --- SLIDER --- */}
                <div className="overflow-hidden relative">
                    <motion.div 
                        className="flex transition-transform duration-1000 ease-in-out"
                        style={{ width: `${SLIDE_COUNT * 100}%`, transform: `translateX(-${currentSlide * (100 / SLIDE_COUNT)}%)` }}
                    >
                        {Array.from({ length: SLIDE_COUNT }).map((_, slideIndex) => {
                            const slideDeals = ALL_DEALS.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide);

                            return (
                                <div key={slideIndex} className="w-full flex-shrink-0" style={{ width: `${100 / SLIDE_COUNT}%` }}>
                                    <div className="flex w-full gap-4 justify-center px-2 h-full">
                                        {slideDeals.length > 0 && slideDeals.map((deal, index) => (
                                            <motion.div 
                                                key={index} 
                                                whileHover={{ y: -5 }}
                                                onClick={() => navigate(deal.link)} 
                                                // ✅ FIXED: Height increased for mobile, flex-1 handles width automatically
                                                className="relative h-[450px] md:h-[400px] overflow-hidden group cursor-pointer 
                                                           flex-1 bg-black border border-[#111] hover:border-[#d4af37]/30 transition-all duration-500" 
                                            >
                                                <img 
                                                    src={deal.mainImage} 
                                                    alt={deal.dealText} 
                                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                                                />
                                                
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

                                                <div className="absolute top-4 left-4 border border-[#d4af37] text-[#d4af37] text-[9px] font-bold px-3 py-1 uppercase tracking-widest backdrop-blur-md">
                                                    Limited
                                                </div>

                                                <div className="absolute bottom-6 left-4 right-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <FaStar className="text-[10px] text-[#d4af37]" />
                                                        <p className="text-gray-300 text-[10px] font-bold tracking-[0.2em] uppercase">{deal.subText}</p>
                                                    </div>
                                                    <h3 className="text-white font-serif text-lg leading-tight mb-4 group-hover:text-[#d4af37] transition-colors">
                                                        {deal.dealText}
                                                    </h3>
                                                    
                                                    <div className="w-full h-[1px] bg-white/20 group-hover:bg-[#d4af37] transition-colors"></div>
                                                    
                                                    <div className="flex items-center justify-between mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                        <span className="text-[10px] uppercase tracking-widest text-white">Shop Now</span>
                                                        <FaArrowRight className="text-[#d4af37] text-xs" />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* DOTS */}
                <div className="flex justify-center mt-12 gap-2">
                    {Array.from({ length: SLIDE_COUNT }).map((_, index) => (
                        <div
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-[2px] transition-all duration-500 cursor-pointer ${
                                currentSlide === index ? 'w-12 bg-[#d4af37]' : 'w-4 bg-[#333] hover:bg-gray-500'
                            }`}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CrazyDeals;