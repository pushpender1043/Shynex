import React, { useContext, useState, useEffect } from 'react';
import Title from '../Component/Title';
import { ShopDataContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBinLine } from "react-icons/ri"; // Cleaner Icon
import CartTotal from '../Component/cartTotal';
import { FaArrowRight, FaLock } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';

function Cart() {
  const { products, currency, cartItem, updateQuantity } = useContext(ShopDataContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    Object.keys(cartItem).forEach((productId) => {
      Object.keys(cartItem[productId]).forEach((size) => {
        const quantity = cartItem[productId][size];
        if (!size || quantity <= 0) return;
        const productData = products.find((p) => p._id === productId);
        if (!productData) return;
        tempData.push({
          _id: productId,
          size: size,
          quantity: quantity,
        });
      });
    });
    setCartData(tempData);
  }, [cartItem, products]);

  // --- ANIMATION VARIANTS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } }
  };

  return (
    <div className='w-full min-h-screen pt-[120px] pb-[80px] px-4 md:px-8 bg-[#050505] text-white font-sans'>
      
      {/* HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className='text-center mb-16'
      >
        <Title text1={'SHOPPING '} text2={'BAG'} />
        <p className='text-gray-500 text-xs uppercase tracking-[0.2em] mt-2'>
           {cartData.length} Items Reserved
        </p>
      </motion.div>

      <div className='max-w-7xl mx-auto flex flex-col lg:flex-row gap-12'>
        
        {/* --- LEFT SIDE: CART ITEMS LIST --- */}
        <div className='w-full lg:w-[65%]'>
          {cartData.length === 0 ? (
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }}
               className='text-center py-24 bg-white/5 border border-white/10 rounded-sm'
            >
              <p className='text-2xl text-gray-400 font-serif mb-2'>Your bag is empty.</p>
              <p className='text-gray-600 text-sm mb-8'>Looks like you haven't found your style yet.</p>
              <button 
                onClick={() => navigate('/collection')} 
                className='text-[#d4af37] border-b border-[#d4af37] pb-1 font-bold uppercase tracking-widest text-xs hover:text-white hover:border-white transition-all'
              >
                Explore Collection
              </button>
            </motion.div>
          ) : (
            <motion.div 
               variants={containerVariants}
               initial="hidden"
               animate="visible"
               className='flex flex-col gap-6'
            >
              <AnimatePresence>
                {cartData.map((item, index) => {
                  const productData = products.find((product) => product._id === item._id);
                  return (
                    <motion.div 
                      key={`${item._id}-${item.size}`} // Unique Key
                      variants={itemVariants}
                      exit="exit"
                      layout
                      className='bg-[#0a0a0a] p-4 sm:p-6 border border-white/5 hover:border-[#d4af37]/30 transition-all duration-300 group flex gap-6 items-start relative'
                    >
                      
                      {/* Product Image */}
                      <div 
                        className='w-24 h-32 sm:w-32 sm:h-40 flex-shrink-0 overflow-hidden cursor-pointer'
                        onClick={() => navigate(`/productDetail/${item._id}`)}
                      >
                        <img 
                           className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100' 
                           src={productData.image1} 
                           alt={productData.name} 
                        />
                      </div>

                      {/* Product Details */}
                      <div className='flex-1 flex flex-col justify-between h-32 sm:h-40 py-1'>
                        
                        <div>
                           <div className='flex justify-between items-start'>
                              <h3 
                                onClick={() => navigate(`/productDetail/${item._id}`)}
                                className='text-lg sm:text-xl font-serif text-white hover:text-[#d4af37] transition-colors cursor-pointer line-clamp-1 w-[80%]'
                              >
                                {productData.name}
                              </h3>
                              <p className='text-[#d4af37] font-bold font-sans text-lg'>
                                {currency}{productData.price}
                              </p>
                           </div>
                           
                           <div className='flex items-center gap-4 mt-3'>
                              <span className='px-3 py-1 bg-white/5 border border-white/10 text-gray-300 text-xs font-bold uppercase tracking-wider'>
                                Size: {item.size}
                              </span>
                              <span className={`text-[10px] uppercase font-bold tracking-wider ${item.quantity > 3 ? 'text-green-500' : 'text-red-500'}`}>
                                {item.quantity > 3 ? 'In Stock' : 'Low Stock'}
                              </span>
                           </div>
                        </div>

                        {/* Controls: Qty & Remove */}
                        <div className='flex justify-between items-end'>
                           <div className='flex items-center gap-3'>
                              <p className='text-xs text-gray-500 font-bold uppercase tracking-wider'>Qty</p>
                              <div className='flex items-center border border-gray-700 bg-black'>
                                 <button 
                                    className='px-3 py-1 text-gray-400 hover:text-white transition-colors'
                                    onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}
                                 >-</button>
                                 <span className='px-2 text-sm font-bold text-white'>{item.quantity}</span>
                                 <button 
                                    className='px-3 py-1 text-gray-400 hover:text-white transition-colors'
                                    onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                                 >+</button>
                              </div>
                           </div>

                           <button 
                              onClick={() => updateQuantity(item._id, item.size, 0)}
                              className='flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors text-xs uppercase font-bold tracking-wider group/del'
                           >
                              <RiDeleteBinLine size={16} className='group-hover/del:scale-110 transition-transform'/> Remove
                           </button>
                        </div>

                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* --- RIGHT SIDE: SUMMARY (Sticky) --- */}
        {cartData.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
            className='w-full lg:w-[35%] h-fit lg:sticky lg:top-[120px]'
          >
            <div className='bg-[#0a0a0a] border border-white/10 p-8 shadow-2xl relative overflow-hidden'>
              
              {/* Gold Top Border */}
              <div className='absolute top-0 left-0 w-full h-1 bg-[#d4af37]'></div>

              <h2 className='text-xl font-serif text-white mb-8 border-b border-gray-800 pb-4'>
                 ORDER SUMMARY
              </h2>
              
              <div className='mb-8'>
                 <CartTotal />
              </div>

              <button
                onClick={() => navigate("/placeOrder")}
                className='w-full py-4 bg-[#d4af37] text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-white transition-all duration-300 flex items-center justify-center gap-3 group'
              >
                Proceed to Checkout <FaArrowRight className='group-hover:translate-x-1 transition-transform'/>
              </button>
              
              {/* Trust Badges */}
              <div className='mt-8 pt-6 border-t border-gray-900 flex flex-col gap-3 text-gray-500 text-xs text-center'>
                 <div className='flex items-center justify-center gap-2'>
                    <FaLock size={12} className='text-[#d4af37]'/>
                    <span className='uppercase tracking-wide'>Secure Encrypted Checkout</span>
                 </div>
                 <p className='font-light italic'>"Luxury is in each detail."</p>
              </div>

            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}

export default Cart;