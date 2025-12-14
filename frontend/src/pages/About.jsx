import React from "react";
import Title from "../Component/Title";
import { FaShippingFast, FaTags, FaHeadset, FaLeaf } from "react-icons/fa";
import { motion } from "framer-motion";
import NewLetterBox from "../Component/NewLetterBox"; 
import Footer from "../Component/Footer"; 

const About = () => {
  // ✅ Premium Image URL (Fashion Studio Vibe)
  const aboutImage = "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop";

  const features = [
    { icon: <FaShippingFast />, title: "Expedited Delivery", desc: "Your style reaches you before the trend fades." },
    { icon: <FaTags />, title: "Exclusive Pricing", desc: "Luxury fashion curated at accessible points." },
    { icon: <FaHeadset />, title: "Concierge Support", desc: "24/7 dedicated assistance for our elite members." },
    { icon: <FaLeaf />, title: "Sustainability", desc: "Eco-conscious packaging for a better tomorrow." },
  ];

  return (
    <div className="w-full min-h-screen bg-[#050505] pt-[120px] font-sans text-white">
      
      {/* --- PAGE HEADER --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
         <h1 className="text-4xl md:text-6xl font-serif font-bold text-white tracking-widest">
            THE <span className="text-[#d4af37]">LEGACY</span>
         </h1>
         <p className="text-gray-500 mt-3 text-xs uppercase tracking-[0.3em]">Crafting Elegance Since 2025</p>
      </motion.div>

      {/* --- STORY SECTION (New Structure) --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-10 flex flex-col lg:flex-row items-center gap-16 mb-32">
        
        {/* Left: Image with Gold Border Effect */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }} 
          whileInView={{ x: 0, opacity: 1 }} 
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 relative"
        >
          <div className="absolute top-4 left-4 w-full h-full border-2 border-[#d4af37]/30 z-0"></div>
          <img 
            src={aboutImage} 
            alt="About Shynex" 
            className="w-full h-auto relative z-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] grayscale hover:grayscale-0 transition-all duration-700 ease-in-out" 
          />
        </motion.div>

        {/* Right: Content */}
        <motion.div 
           initial={{ x: 50, opacity: 0 }} 
           whileInView={{ x: 0, opacity: 1 }} 
           transition={{ duration: 0.8 }}
           className="w-full lg:w-1/2 flex flex-col gap-8"
        >
          <div>
            <h3 className="text-2xl font-serif text-white mb-2">Our Philosophy</h3>
            <div className="w-16 h-[2px] bg-[#d4af37]"></div>
          </div>
          
          <p className="text-gray-400 text-lg leading-relaxed font-light">
            Welcome to <b className="text-white">SHYNEX</b>. We are not just a brand; we are a movement in modern luxury. 
            Born from a desire to bridge the gap between high-end aesthetics and everyday wearability, Shynex stands for quality, precision, and timeless style.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed font-light">
            Each piece in our collection is curated with an obsession for detail. We believe that true luxury lies not in the price tag, but in the feeling of wearing something exceptional.
          </p>
          
          {/* Quote Box */}
          <div className="p-6 bg-[#111] border-l-2 border-[#d4af37]">
            <p className="text-[#d4af37] italic font-serif text-xl">"To adorn the world with confidence and elegance."</p>
          </div>
        </motion.div>
      </div>

      {/* --- WHY CHOOSE US (Minimal Grid) --- */}
      <div className="bg-[#0a0a0a] py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-6">
                <Title text1={"WHY "} text2={"CHOOSE US"} />
                <p className="text-gray-500 text-sm hidden md:block">Excellence in every detail.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((item, index) => (
                <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }} 
                whileInView={{ y: 0, opacity: 1 }} 
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-[#050505] border border-white/5 hover:border-[#d4af37]/50 transition-all duration-500 group cursor-default hover:-translate-y-2"
                >
                <div className="text-3xl text-gray-600 group-hover:text-[#d4af37] mb-6 transition-colors duration-300">{item.icon}</div>
                <h3 className="font-bold text-white text-lg mb-3 font-serif tracking-wide">{item.title}</h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed group-hover:text-gray-300 transition-colors">{item.desc}</p>
                </motion.div>
            ))}
            </div>
        </div>
      </div>
      
      {/* --- FOOTER SECTION --- */}
      <div className="py-0 border-t border-gray-900">
        <NewLetterBox />
      </div>
      <Footer />
    </div>
  );
};

export default About;