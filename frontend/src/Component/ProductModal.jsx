import React, { useContext, useState } from 'react';
import { ShopDataContext } from '../Context/ShopContext';
import { RiCloseLine } from "react-icons/ri";
import { FaStar, FaTruck } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';

function ProductModal() {
  const { isModalOpen, closeModal, modalProduct, currency, addToCart } = useContext(ShopDataContext);
  const [size, setSize] = useState('');

  if (!isModalOpen || !modalProduct) return null;

  return (
    <AnimatePresence>
      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          
          {/* Backdrop (Dark Blur) */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          ></motion.div>

          {/* Modal Content */}
          <motion.div 
            initial={{ y: 50, opacity: 0, scale: 0.9 }} 
            animate={{ y: 0, opacity: 1, scale: 1 }} 
            exit={{ y: 50, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-[#111] border border-[#d4af37]/30 w-full max-w-4xl rounded-sm shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            
            {/* Close Button */}
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 z-10 transition-colors">
              <RiCloseLine size={28} />
            </button>

            {/* Left: Image */}
            <div className="w-full md:w-1/2 bg-black flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-gray-800">
               <img 
                 src={modalProduct.image1} 
                 alt={modalProduct.name} 
                 className="max-h-[300px] md:max-h-[400px] object-contain drop-shadow-xl"
               />
            </div>

            {/* Right: Details */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center text-white">
               
               <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2 leading-tight">{modalProduct.name}</h2>
               
               <div className="flex items-center gap-2 mb-4">
                  <span className="text-[#d4af37] flex text-sm"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></span>
                  <span className="text-xs text-gray-500">(Top Rated)</span>
               </div>

               <p className="text-2xl font-bold text-[#d4af37] mb-4 font-sans">
                  {currency}{modalProduct.price}
               </p>

               <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light line-clamp-3">
                  {modalProduct.description}
               </p>

               {/* Size Selector */}
               <div className="mb-6">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Select Size</p>
                  <div className="flex gap-2">
                    {modalProduct.sizes.map((item, index) => (
                      <button 
                        key={index}
                        onClick={() => setSize(item)}
                        className={`w-10 h-10 border transition-all flex items-center justify-center text-sm font-medium ${size === item ? 'bg-[#d4af37] text-black border-[#d4af37]' : 'border-gray-700 text-gray-300 hover:border-gray-500'}`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
               </div>

               {/* Buttons */}
               <div className="flex gap-4">
                  <button 
                    onClick={() => {
                        if(size) { addToCart(modalProduct._id, size); closeModal(); }
                        else { alert("Please Select Size"); }
                    }}
                    className="flex-1 bg-white text-black font-bold uppercase tracking-[0.2em] py-3 text-xs hover:bg-[#d4af37] transition-colors"
                  >
                    Add to Cart
                  </button>
                  <button 
                    onClick={() => window.location.href = `/productDetail/${modalProduct._id}`}
                    className="px-4 py-3 border border-gray-600 text-gray-300 hover:text-white hover:border-white transition-colors"
                  >
                    View Full
                  </button>
               </div>

               <div className="mt-6 flex items-center gap-2 text-xs text-gray-500">
                  <FaTruck /> <p>Free Shipping & Returns available.</p>
               </div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default ProductModal;