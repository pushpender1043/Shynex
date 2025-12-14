import React, { useContext, useMemo } from 'react';
import { ShopDataContext } from '../Context/ShopContext';
import { Link } from 'react-router-dom';
import { FaStar, FaEye } from "react-icons/fa"; 
import { motion } from 'framer-motion';

function Card({ id, image, images, name, price }) { // ✅ Accept both 'image' and 'images'
  const { currency, products, openModal } = useContext(ShopDataContext);
  
  const ratingData = useMemo(() => {
    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const rating = (3.5 + (hash % 16) / 10).toFixed(1);
    return { rating };
  }, [id]);

  const productObj = products.find(p => p._id === id);

  // ✅ SMART IMAGE LOGIC:
  // Agar 'images' (Array) aaya hai to usse use karo (Swap Effect ke liye)
  // Nahi to purana 'image' (String) use karo (Fallback)
  let img1, img2;

  if (images && Array.isArray(images)) {
      img1 = images[0];
      img2 = images.length > 1 ? images[1] : images[0];
  } else if (image) {
      img1 = image;
      img2 = image; // Hover pe same image rahegi
  } else {
      img1 = ""; // Placeholder logic if needed
      img2 = "";
  }

  return (
    <div className="block h-full cursor-pointer group relative"> 
      <motion.div 
        whileHover={{ y: -5 }} 
        transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
        className="bg-[#0a0a0a] border border-white/5 hover:border-[#d4af37]/30 rounded-sm overflow-hidden h-full shadow-lg hover:shadow-[0_10px_30px_-10px_rgba(212,175,55,0.1)] transition-all duration-500"
      >
        
        {/* --- IMAGE SECTION --- */}
        <Link to={`/productDetail/${id}`} className="relative w-full h-[380px] block overflow-hidden bg-[#111]">
          
          {/* Main Image */}
          <img 
            src={img1} 
            alt={name} 
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out opacity-100 group-hover:opacity-0 z-10"
          />

          {/* Second Image (Hover) */}
          <img 
            src={img2} 
            alt={name} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out scale-105 group-hover:scale-100 z-0"
          />
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none"></div>

          {/* Rating Badge */}
          <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1 flex items-center gap-2 rounded-full z-30">
             <span className="text-[10px] font-bold text-white tracking-widest">{ratingData.rating}</span>
             <FaStar className="text-[#d4af37] text-[10px]" />
          </div>

          {/* Quick View Button */}
          <div 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); openModal(productObj); }}
            className="absolute top-3 right-3 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#d4af37] hover:scale-110 z-30 shadow-lg"
            title="Quick View"
          >
             <FaEye size={14} />
          </div>

          {/* Hover Button */}
          <div className="absolute bottom-0 left-0 right-0 z-30 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
             <button className="w-full bg-[#d4af37] text-black font-bold uppercase tracking-[0.2em] py-3 text-xs hover:bg-white transition-colors">
               View Product
             </button>
          </div>
        </Link>

        {/* --- DETAILS SECTION --- */}
        <div className="p-5 text-center bg-[#0a0a0a] relative z-20 border-t border-white/5">
          <Link to={`/productDetail/${id}`}>
            <h3 className="text-gray-300 font-serif text-[16px] tracking-wide line-clamp-1 group-hover:text-[#d4af37] transition-colors duration-300">
              {name}
            </h3>
          </Link>
          
          <div className="flex items-center justify-center gap-3 mt-2">
             <p className="text-sm font-light text-gray-500 line-through decoration-[#d4af37]/50">
               {currency}{price + 500}
             </p>
             <p className="text-md font-bold text-white font-sans tracking-wide">
                {currency}{price}
             </p>
          </div>
        </div>

      </motion.div>
    </div>
  );
}

export default Card;