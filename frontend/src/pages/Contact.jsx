import React from "react";
import Title from "../Component/Title";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";
import NewLetterBox from "../Component/NewLetterBox"; 
import Footer from "../Component/Footer"; 

const Contact = () => {
  // ✅ New Cinematic Image
  const contactImg = "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=2070&auto=format&fit=crop";

  return (
    <div className="w-full min-h-screen bg-[#050505] pt-[120px] font-sans text-white relative overflow-hidden">
      
      {/* --- 🌟 BLURRY GLOW EFFECTS (AMBIENT LIGHT) --- */}
      {/* Top Left Gold Glow */}
      <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-[#d4af37]/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      {/* Bottom Right Blue/Purple Glow (for contrast) */}
      <div className="absolute bottom-0 right-[-10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* --- HEADER --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 relative z-10"
      >
         <h1 className="text-4xl md:text-6xl font-serif font-bold text-white tracking-widest">
            GET IN <span className="text-[#d4af37]">TOUCH</span>
         </h1>
         <p className="text-gray-500 mt-3 text-xs uppercase tracking-[0.3em]">Concierge Services & Support</p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-10 flex flex-col lg:flex-row gap-16 mb-24 relative z-10">
        
        {/* --- LEFT: PREMIUM IMAGE (Floating Style) --- */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }} 
          whileInView={{ x: 0, opacity: 1 }} 
          transition={{ duration: 0.8 }}
          className="w-full lg:w-[40%] relative hidden lg:block"
        >
           {/* Image Frame */}
           <div className="absolute inset-0 border border-[#d4af37]/30 translate-x-4 translate-y-4 z-[-1]"></div>
           <img 
             src={contactImg} 
             alt="Contact Luxury" 
             className="w-full h-full object-cover shadow-[0_0_30px_rgba(0,0,0,0.5)] grayscale hover:grayscale-0 transition-all duration-700"
           />
        </motion.div>

        {/* --- RIGHT: GLASSMORPHISM FORM & INFO --- */}
        <motion.div 
           initial={{ x: 50, opacity: 0 }} 
           whileInView={{ x: 0, opacity: 1 }} 
           transition={{ duration: 0.8 }}
           className="w-full lg:w-[60%] flex flex-col gap-10"
        >
           {/* 1. Info Cards (Semi-Transparent) */}
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: <FaPhoneAlt />, title: "Concierge", text: "+91 98765 43210" },
                { icon: <FaEnvelope />, title: "Inquiries", text: "care@shynex.com" },
                { icon: <FaMapMarkerAlt />, title: "Headquarters", text: "New Delhi, India" }
              ].map((item, index) => (
                <div key={index} className="p-6 bg-white/5 backdrop-blur-sm border border-white/5 hover:border-[#d4af37]/50 transition-all duration-300 group hover:-translate-y-1">
                   <div className="text-[#d4af37] mb-3 text-xl group-hover:scale-110 transition-transform shadow-lg shadow-[#d4af37]/20 rounded-full w-10 h-10 flex items-center justify-center bg-black/50">{item.icon}</div>
                   <h3 className="font-bold font-serif text-white mb-1">{item.title}</h3>
                   <p className="text-xs text-gray-400 font-light">{item.text}</p>
                </div>
              ))}
           </div>

           {/* 2. Glass Form (The Star ⭐) */}
           <div className="relative p-8 md:p-10 rounded-sm overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
              
              {/* Subtle Noise/Gradient on Form */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-[50px] pointer-events-none"></div>

              <h3 className="text-2xl font-serif text-white mb-6">Send a Request</h3>
              
              <form className="flex flex-col gap-6 relative z-10">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                       <label className="text-[10px] font-bold text-[#d4af37] uppercase tracking-widest">Name</label>
                       <input type="text" className="bg-black/40 border-b border-gray-700 text-white px-2 py-3 focus:outline-none focus:border-[#d4af37] transition-colors placeholder-gray-600 font-light" placeholder="Ex. John Doe" />
                    </div>
                    <div className="flex flex-col gap-2">
                       <label className="text-[10px] font-bold text-[#d4af37] uppercase tracking-widest">Email</label>
                       <input type="email" className="bg-black/40 border-b border-gray-700 text-white px-2 py-3 focus:outline-none focus:border-[#d4af37] transition-colors placeholder-gray-600 font-light" placeholder="Ex. john@shynex.com" />
                    </div>
                 </div>
                 
                 <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-[#d4af37] uppercase tracking-widest">Subject</label>
                    <input type="text" className="bg-black/40 border-b border-gray-700 text-white px-2 py-3 focus:outline-none focus:border-[#d4af37] transition-colors placeholder-gray-600 font-light" placeholder="Ex. Custom Order" />
                 </div>

                 <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-[#d4af37] uppercase tracking-widest">Message</label>
                    <textarea rows="4" className="bg-black/40 border-b border-gray-700 text-white px-2 py-3 focus:outline-none focus:border-[#d4af37] transition-colors resize-none placeholder-gray-600 font-light" placeholder="How can we assist you today?"></textarea>
                 </div>

                 <button className="bg-[#d4af37] text-black font-bold uppercase tracking-[0.2em] py-4 mt-4 hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group">
                    Send Message <FaPaperPlane className="group-hover:translate-x-1 transition-transform text-xs" />
                 </button>
              </form>
           </div>
        </motion.div>

      </div>

      <div className="py-0 border-t border-gray-900 relative z-10">
        <NewLetterBox />
      </div>
      <Footer />
    </div>
  );
};

export default Contact;