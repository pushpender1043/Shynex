import React, { useContext, useState, useEffect, useRef, useCallback } from 'react';
import { RiSearchLine, RiUserLine, RiShoppingBagLine, RiCloseLine } from "react-icons/ri";
import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import { MdOutlineContactPage } from "react-icons/md";
import { FaMicrophoneAlt } from "react-icons/fa"; // Voice Icon
import { userDataContext } from '../Context/UserContext.jsx';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { AuthDataContext } from '../Context/AuthContext';
import axios from 'axios';
import { ShopDataContext } from '../Context/ShopContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify'; 
import open from "../assets/audio/open.mp3"; 

function Nav() {
    let { getCurrentUser, userData } = useContext(userDataContext);
    let { serverUrl } = useContext(AuthDataContext);
    let { showSearch, setShowSearch, search, setSearch, getCartCount } = useContext(ShopDataContext);

    let [showProfile, setShowProfile] = useState(false);
    let [showNavbar, setShowNavbar] = useState(true);
    let [lastScrollY, setLastScrollY] = useState(0);
    let [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

    // --- VOICE SEARCH STATES ---
    const [activeAi, setActiveAi] = useState(false);
    const recognitionRef = useRef(null);
    const openingSoundRef = useRef(null);

    let navigate = useNavigate();
    let location = useLocation(); 

    const handleLogOut = async () => {
        try {
            await axios.get(serverUrl + '/api/auth/logout', { withCredentials: true });
            getCurrentUser();
        } catch (error) {
            console.log(error);
        }
    };

    const controlNavbar = () => {
        if (window.scrollY > lastScrollY) { setShowNavbar(false); setIsMegaMenuOpen(false); }
        else { setShowNavbar(true); }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);
        return () => window.removeEventListener('scroll', controlNavbar);
    }, [lastScrollY]);

    // --- VOICE SEARCH LOGIC ---
    useEffect(() => { 
        openingSoundRef.current = new Audio(open); 
    }, []);

    const speak = useCallback((message) => {
        try {
            const utter = new SpeechSynthesisUtterance(message);
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utter);
        } catch (error) { console.log("Speech error", error); }
    }, []);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return;
        const recognition = new SpeechRecognition();
        recognition.lang = "en-IN"; 
        recognitionRef.current = recognition;

        recognition.onresult = (e) => {
            const transcript = e.results[0][0].transcript.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").trim();
            setActiveAi(false);

            if (transcript.includes("home")) { speak("Opening home page"); navigate("/"); }
            else if (transcript.includes("collection") || transcript.includes("shop")) { speak("Opening collection"); navigate("/collection"); }
            else if (transcript.includes("cart")) { speak("Opening cart"); navigate("/cart"); }
            else {
                 setSearch(transcript); 
                 speak(`Searching for ${transcript}`);
                 setShowSearch(true); 
            }
        };
        recognition.onend = () => setActiveAi(false);
    }, [navigate, speak, setSearch]);

    const startRecognition = () => {
        try { openingSoundRef.current.play().catch(()=>{}); } catch (err) {}
        if (recognitionRef.current) {
            setActiveAi(true);
            recognitionRef.current.start();
        }
        else { toast.error("Voice search not supported."); }
    };

    const menuImage = "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop";

    return (
        <>
            {/* --- DESKTOP NAVBAR --- */}
            <div 
                className={`w-full h-[80px] fixed top-0 left-0 z-50 flex items-center justify-between px-6 md:px-12 transition-transform duration-500 ease-in-out bg-[#050505] border-b border-[#222] ${
                    showNavbar ? 'translate-y-0' : '-translate-y-full'
                }`}
                onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
                {/* LOGO */}
                <div className='flex items-center cursor-pointer group' onClick={()=>navigate('/')}>
                    <h1 className='text-2xl font-serif font-bold text-white tracking-[0.2em] group-hover:text-[#d4af37] transition-colors duration-500'>
                        SHY<span className='text-[#d4af37] group-hover:text-white transition-colors duration-500'>NEX</span>
                    </h1>
                </div>

                {/* MENU LINKS */}
                <div className='hidden md:flex gap-12 font-light text-xs text-gray-400 h-full items-center'>
                    {['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'].map((item) => {
                        const path = item === 'HOME' ? '/' : `/${item.toLowerCase()}`;
                        const isActive = location.pathname === path;
                        return (
                            <div 
                                key={item}
                                className="h-full flex items-center relative group"
                                onMouseEnter={() => item === 'COLLECTION' ? setIsMegaMenuOpen(true) : setIsMegaMenuOpen(false)}
                            >
                                <p 
                                    onClick={() => { navigate(path); setIsMegaMenuOpen(false); }} 
                                    className={`cursor-pointer transition-all tracking-[0.25em] py-2 ${isActive ? 'text-white font-medium' : 'hover:text-white'}`}
                                >
                                    {item}
                                    <span className={`absolute bottom-6 left-0 h-[1px] bg-[#d4af37] transition-all duration-500 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                                </p>
                            </div>
                        )
                    })}
                </div>

                {/* ICONS */}
                <div className='flex items-center gap-8'>
                    <div className='cursor-pointer text-gray-400 hover:text-[#d4af37] transition-colors' onClick={() => { setShowSearch(!showSearch); if(!showSearch && location.pathname !== '/collection') navigate("/collection"); }}>
                        <RiSearchLine className='text-xl' />
                    </div>

                    {/* PROFILE DROPDOWN */}
                    <div className='relative cursor-pointer group' onClick={() => setShowProfile(prev => !prev)}>
                        {!userData ? (
                            <RiUserLine className='text-xl text-gray-400 group-hover:text-[#d4af37] transition-colors duration-300' />
                        ) : (
                            <div className='w-8 h-8 rounded-full border border-gray-600 group-hover:border-[#d4af37] flex items-center justify-center text-xs font-bold text-[#d4af37] transition-all bg-[#111] shadow-[0_0_10px_rgba(212,175,55,0.2)]'>
                                {userData?.name.slice(0, 1).toUpperCase()}
                            </div>
                        )}

                        <AnimatePresence>
                            {showProfile && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-14 right-0 w-48 bg-[#0a0a0a]/95 backdrop-blur-xl border border-[#d4af37]/30 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] rounded-sm overflow-hidden z-50"
                                >
                                    <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
                                    <ul className='flex flex-col text-gray-300 text-xs font-medium tracking-wide'>
                                        {!userData ? (
                                            <li onClick={() => { navigate('/login'); setShowProfile(false); }} className='px-6 py-4 hover:bg-white/5 hover:text-[#d4af37] transition-all cursor-pointer flex items-center gap-3 border-b border-white/5'>
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></span> Login / Sign Up
                                            </li>
                                        ) : (
                                            <>
                                                <li className="px-6 py-3 bg-white/5 text-[#d4af37] text-[10px] uppercase tracking-widest font-bold border-b border-white/5">
                                                    Hello, {userData.name.split(" ")[0]}
                                                </li>
                                                <li onClick={() => { navigate("/order"); setShowProfile(false) }} className='px-6 py-3 hover:bg-white/5 hover:text-white transition-all cursor-pointer flex items-center justify-between group'>
                                                    My Orders <span className="opacity-0 group-hover:opacity-100 text-[#d4af37] transition-opacity">→</span>
                                                </li>
                                                <li onClick={() => { handleLogOut(); setShowProfile(false); }} className='px-6 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-500 transition-all cursor-pointer flex items-center gap-2 border-t border-white/5'>
                                                    Logout
                                                </li>
                                            </>
                                        )}
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className='relative cursor-pointer hidden md:block group' onClick={() => navigate('/cart')}>
                        <RiShoppingBagLine className='text-xl text-gray-400 group-hover:text-[#d4af37] transition-colors' />
                        {getCartCount() > 0 && (
                            <span className='absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#d4af37] text-black text-[9px] font-bold flex items-center justify-center rounded-full'>
                                {getCartCount()}
                            </span>
                        )}
                    </div>
                </div>

                {/* --- MEGA MENU PANEL --- */}
                <AnimatePresence>
                    {isMegaMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="absolute top-[80px] left-0 w-full bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-[#d4af37]/30 shadow-2xl z-40 hidden md:block"
                            onMouseEnter={() => setIsMegaMenuOpen(true)}
                            onMouseLeave={() => setIsMegaMenuOpen(false)}
                        >
                            <div className="max-w-7xl mx-auto px-12 py-10 grid grid-cols-4 gap-12">
                                {['MEN', 'WOMEN', 'KIDS'].map((title, colIndex) => (
                                    <div key={colIndex}>
                                        <h3 className="text-[#d4af37] font-serif font-bold text-lg mb-4 tracking-wider">{title}</h3>
                                        <ul className="space-y-3 text-gray-400 text-sm font-light">
                                            {colIndex === 0 && ['Topwear', 'Bottomwear', 'Winter Collection', 'Accessories', 'New Arrivals'].map(link => <li key={link} className="hover:text-white cursor-pointer hover:translate-x-1 transition-transform" onClick={()=>navigate('/collection')}>{link}</li>)}
                                            {colIndex === 1 && ['Dresses & Gowns', 'Tops & Tees', 'Ethnic Wear', 'Jewelry', 'Best Sellers'].map(link => <li key={link} className="hover:text-white cursor-pointer hover:translate-x-1 transition-transform" onClick={()=>navigate('/collection')}>{link}</li>)}
                                            {colIndex === 2 && ['Boys Clothing', 'Girls Clothing', 'Footwear', 'Toys & Accessories'].map(link => <li key={link} className="hover:text-white cursor-pointer hover:translate-x-1 transition-transform" onClick={()=>navigate('/collection')}>{link}</li>)}
                                        </ul>
                                    </div>
                                ))}
                                <div className="relative group overflow-hidden cursor-pointer" onClick={()=>navigate('/collection')}>
                                    <img src={menuImage} alt="Featured" className="w-full h-48 object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                                    <div className="absolute bottom-4 left-4">
                                        <p className="text-white font-bold uppercase tracking-widest text-xs">New Season</p>
                                        <p className="text-[#d4af37] font-serif text-xl">Winter '25</p>
                                    </div>
                                    <div className="absolute inset-0 border border-[#d4af37]/0 group-hover:border-[#d4af37]/50 transition-all duration-500"></div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* SEARCH BAR */}
                <div className={`absolute top-[80px] left-0 w-full bg-[#050505] border-b border-[#222] overflow-hidden transition-all duration-500 ease-in-out z-50 ${showSearch ? 'h-[80px] opacity-100' : 'h-0 opacity-0'}`}>
                    <div className='flex items-center justify-center h-full px-6 max-w-4xl mx-auto relative'>
                        <div className='relative w-full group'>
                            <input 
                                type="text" 
                                placeholder='Search for products...' 
                                className='w-full bg-transparent border-b border-gray-700 text-white px-2 py-3 outline-none focus:border-[#d4af37] transition-all pl-10 pr-16 placeholder-gray-600 font-light tracking-wide text-lg' 
                                onChange={(e) => { setSearch(e.target.value) }} 
                                value={search} 
                            />
                            <RiSearchLine className='absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#d4af37] transition-colors' size={20} />
                            
                            <button
                                onClick={startRecognition}
                                type="button" 
                                className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all duration-300 ${activeAi ? "bg-red-700 text-white animate-pulse shadow-lg" : "text-gray-500 hover:text-[#d4af37]"} flex items-center justify-center`}
                            >
                                <FaMicrophoneAlt className="w-5 h-5" />
                            </button>
                        </div>
                        <RiCloseLine className='text-3xl text-gray-500 cursor-pointer ml-8 hover:text-red-500 hover:rotate-90 transition-all duration-300' onClick={() => setShowSearch(false)} />
                    </div>
                </div>
            </div>

            {/* --- MOBILE BOTTOM NAV (FIXED: Added 'fixed bottom-0') --- */}
            <div className='md:hidden fixed bottom-0 left-0 w-full h-[70px] bg-black border-t border-[#222] flex justify-around items-center z-[100] pb-2'>
                {[ { icon: IoMdHome, label: 'Home', path: '/' }, { icon: HiOutlineCollection, label: 'Shop', path: '/collection' }, { icon: RiShoppingBagLine, label: 'Cart', path: '/cart', badge: getCartCount() }, { icon: MdOutlineContactPage, label: 'Contact', path: '/contact' } ].map((navItem, index) => {
                    const isActive = location.pathname === navItem.path;
                    return (
                        <div key={index} onClick={() => navigate(navItem.path)} className={`flex flex-col items-center gap-1.5 cursor-pointer p-2 relative group ${isActive ? 'text-[#d4af37]' : 'text-gray-600'}`}>
                            <div className='relative'>
                                <navItem.icon className={`text-xl transition-all duration-300 ${isActive ? '-translate-y-1' : ''}`} />
                                {navItem.badge > 0 && <span className='absolute -top-2 -right-2 bg-[#d4af37] text-black w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold'>{navItem.badge}</span>}
                            </div>
                            <span className={`text-[9px] font-medium uppercase tracking-widest transition-all ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>{navItem.label}</span>
                        </div>
                    )
                })}
            </div>
        </>
    );
}

export default Nav;