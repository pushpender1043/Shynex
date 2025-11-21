import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 

// --- BASE CONFIGURATION ---
const CRAZY_DEALS_DATA_BASE = [
    // Ensure these paths are correct. If any path is wrong, the component might crash trying to load the image.
    { mainImage: '/src/assets/logo1.jpg', brands: ['/src/assets/logo1.png', '/src/assets/logo2.png'], dealText: 'MIN. 50% OFF Dapper Wear', link: '/collection' },
    { mainImage: '/src/assets/logo2.jpeg', brands: ['/src/assets/logo3.png', '/src/assets/logo4.png'], dealText: 'MIN. 50% OFF Refined Wardrobe Picks', link: '/collection' },
    { mainImage: '/src/assets/logo3.jpg', brands: ['/src/assets/logo5.png', '/src/assets/logo6.png'], dealText: 'MIN. 50% OFF Easygoing Styles', link: '/collection' },
    { mainImage: '/src/assets/logo4.webp', brands: ['/src/assets/logo7.png', '/src/assets/logo8.png'], dealText: 'MIN. 55% OFF Casual Appeal', link: '/collection/' },
    { mainImage: '/src/assets/logo6.jpg', brands: ['/src/assets/logo9.png', '/src/assets/logo10.png'], dealText: 'UNDER ₹899 Regal Charm', link: '/collection/' },
];

// Create data for 3 slides (15 items total)
const DEALS_PER_SLIDE = 5;
const ALL_DEALS = [
    ...CRAZY_DEALS_DATA_BASE,
    // Ensure all elements in the map functions are returning valid objects
    ...CRAZY_DEALS_DATA_BASE.map(d => ({ ...d, dealText: 'MIN. 60% OFF Winter Style ' + d.dealText })),
    ...CRAZY_DEALS_DATA_BASE.map(d => ({ ...d, dealText: 'UP TO 70% OFF Seasonal Sale ' + d.dealText })),
];
const SLIDE_COUNT = Math.ceil(ALL_DEALS.length / DEALS_PER_SLIDE);


function CrazyDeals() {
    const navigate = useNavigate();
    const dealsRef = useRef(null);
    const [dealsVisible, setDealsVisible] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0); 

    // Intersection Observer for Scroll Fade-in Animation (FIXED CLEANUP)
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setDealsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.2 }
        );

        if (dealsRef.current) {
            observer.observe(dealsRef.current);
        }

        return () => {
            // Corrected cleanup: unobserve the current ref if it exists
            if (dealsRef.current) {
                observer.unobserve(dealsRef.current);
            }
        };
    }, []);

    // --- AUTO-ROTATION LOGIC (20 seconds) ---
    useEffect(() => {
        if (!dealsVisible) return;

        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % SLIDE_COUNT);
        }, 20000); // 20 seconds

        return () => clearInterval(interval);
    }, [dealsVisible]);
    // ---------------------------------------------


    return (
        <section 
            ref={dealsRef} 
            className={`py-16 bg-gradient-to-br from-gray-800 to-gray-900 text-white transition-all duration-1000 ease-out 
                       ${dealsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            <div className="container mx-auto px-4">
                <h2 
                    className="text-5xl font-extrabold text-center mb-12 tracking-wide text-cyan-400 
                    drop-shadow-[0_0_10px_rgba(0,255,255,0.8)] 
                    animate-pulse duration-500"
                >
                    CRAZY DEALS
                </h2>
                
                {/* --- SLIDER CONTAINER --- */}
                <div className="overflow-hidden relative">
                    <div 
                        className="flex transition-transform duration-700 ease-in-out"
                        // Ensure the total width calculation is safe
                        style={{ width: `${SLIDE_COUNT * 100}%`, transform: `translateX(-${currentSlide * (100 / SLIDE_COUNT)}%)` }}
                    >
                        {/* Map through the required number of slides */}
                        {Array.from({ length: SLIDE_COUNT }).map((_, slideIndex) => {
                            const slideDeals = ALL_DEALS.slice(slideIndex * DEALS_PER_SLIDE, (slideIndex + 1) * DEALS_PER_SLIDE);

                            return (
                                <div 
                                    key={slideIndex} 
                                    className="w-full flex-shrink-0" 
                                    style={{ width: `${100 / SLIDE_COUNT}%` }} 
                                >
                                    {/* Deals Grid for the current slide - NOW FLEX */}
                                    <div 
                                        className="flex w-full gap-6 justify-center"
                                    >
                                        {/* RENDER ONLY IF slideDeals HAS CONTENT */}
                                        {slideDeals.length > 0 && slideDeals.map((deal, index) => (
                                            <div 
                                                key={index} 
                                                onClick={() => navigate(deal.link)} 
                                                className="relative bg-gray-700 rounded-lg overflow-hidden shadow-2xl group cursor-pointer 
                                                           transform transition-transform duration-300 hover:scale-105 hover:shadow-cyan-500/50 
                                                           w-[calc(100%/5-1rem)] md:w-[calc(100%/5-1rem)] flex-grow" 
                                            >
                                                {/* Card Content (Image, Logos, Text) */}
                                                <img 
                                                    src={deal.mainImage} 
                                                    alt={deal.dealText} 
                                                    className="w-full h-60 object-cover group-hover:opacity-80 transition-opacity duration-300"
                                                />
                                                {/* Brand Logos Overlay */}
                                                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center h-full">
                                                    <div className="flex flex-wrap justify-center gap-2">
                                                        {deal.brands.map((logo, logoIndex) => (
                                                            <img 
                                                                key={logoIndex} 
                                                                src={logo} 
                                                                alt="Brand Logo" 
                                                                className="h-8 md:h-10 w-auto object-contain bg-white px-2 py-1 rounded shadow-md transform transition-transform duration-300 group-hover:-translate-y-1"
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                {/* Deal Text */}
                                                <div className="p-4 text-center bg-gradient-to-r from-teal-700 to-cyan-700 font-semibold text-lg md:text-xl relative overflow-hidden">
                                                    <span className="relative z-10">{deal.dealText}</span>
                                                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transform -skew-x-12 scale-x-0 group-hover:scale-x-100 transition-all duration-500 ease-in-out"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* --- DOT INDICATORS (Below the slider) --- */}
                <div className="flex justify-center mt-8 space-x-2">
                    {Array.from({ length: SLIDE_COUNT }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                                currentSlide === index ? 'bg-white shadow-md' : 'bg-gray-500 hover:bg-gray-300'
                            }`}
                        ></button>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default CrazyDeals;