import React, { useContext, useState, useEffect } from 'react';
import { FaFilter, FaSortAmountDown, FaTimes, FaCheck } from "react-icons/fa";
import { ShopDataContext } from '../Context/ShopContext';
import Card from '../Component/Card';
import { motion, AnimatePresence } from 'framer-motion';

function Collections() {
  const [showFilter, setShowFilter] = useState(false);
  const { products, search, showSearch } = useContext(ShopDataContext);
  
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavant");

  useEffect(() => { setFilterProduct(products); }, [products]);

  // --- FILTER LOGIC ---
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productCopy = products.slice();
    if (showSearch && search) {
      productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (category.length > 0) {
      productCopy = productCopy.filter(item => category.includes(item.category));
    }
    if (subCategory.length > 0) {
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory));
    }
    setFilterProduct(productCopy);
  };

  const sortProducts = () => {
    let fbCopy = filterProduct.slice();
    switch (sortType) {
      case 'low-high': setFilterProduct(fbCopy.sort((a, b) => (a.price - b.price))); break;
      case 'high-low': setFilterProduct(fbCopy.sort((a, b) => (b.price - a.price))); break;
      default: applyFilter(); break;
    }
  };

  useEffect(() => { sortProducts(); }, [sortType]);
  useEffect(() => { applyFilter(); }, [category, subCategory, search, showSearch]);

  return (
    <div className='w-full min-h-screen bg-[#050505] pt-[100px] font-sans text-white relative'>
      
      {/* --- HEADER --- */}
      <div className='text-center py-10'>
         <h1 className='text-4xl md:text-6xl font-serif font-bold tracking-widest text-white'>
            THE <span className='text-[#d4af37]'>ARCHIVE</span>
         </h1>
         <p className='text-gray-500 mt-2 text-xs uppercase tracking-[0.3em]'>Season 2025 / Premium Collection</p>
      </div>

      {/* --- CONTROL BAR (Updated: Removed 'sticky', added 'relative') --- */}
      <div className='relative w-full bg-[#0a0a0a] border-y border-white/10 px-6 py-4 flex justify-between items-center z-10'>
         
         {/* Filter Button */}
         <button 
            onClick={() => setShowFilter(true)}
            className='flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white hover:text-[#d4af37] transition-colors'
         >
            <FaFilter className='text-[#d4af37]' /> Filters
         </button>

         {/* Results Count */}
         <span className='hidden md:block text-gray-500 text-xs font-light tracking-wide'>
            {filterProduct.length} PREMIUM ITEMS FOUND
         </span>

         {/* Sort Dropdown */}
         <div className='flex items-center gap-3 group'>
            <span className='text-xs text-gray-500 uppercase tracking-wide group-hover:text-[#d4af37]'>Sort By:</span>
            <select 
               className='bg-transparent text-white text-sm font-bold outline-none cursor-pointer uppercase' 
               onChange={(e) => setSortType(e.target.value)}
            >
               <option value="relavant" className='bg-black text-gray-400'>Relevant</option>
               <option value="low-high" className='bg-black text-gray-400'>Price: Low to High</option>
               <option value="high-low" className='bg-black text-gray-400'>Price: High to Low</option>
            </select>
         </div>
      </div>

      {/* --- SLIDE-OUT FILTER DRAWER --- */}
      <AnimatePresence>
        {showFilter && (
          <>
            {/* Backdrop */}
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               onClick={() => setShowFilter(false)}
               className="fixed inset-0 bg-black/80 z-[60] backdrop-blur-sm"
            />
            
            {/* Drawer Panel */}
            <motion.div
               initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
               transition={{ type: "tween", duration: 0.4 }}
               className="fixed top-0 left-0 h-full w-[300px] bg-[#0f0f0f] z-[70] border-r border-[#d4af37]/30 shadow-2xl p-8 overflow-y-auto"
            >
               <div className='flex justify-between items-center mb-10'>
                  <h2 className='text-2xl font-serif text-[#d4af37]'>FILTERS</h2>
                  <FaTimes className='text-gray-400 cursor-pointer hover:text-white' onClick={() => setShowFilter(false)} size={20}/>
               </div>

               {/* Categories */}
               <div className='mb-8'>
                  <h3 className='text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-4'>Category</h3>
                  <div className='flex flex-col gap-3'>
                    {['Men', 'Women', 'Kids'].map((cat) => (
                      <label key={cat} className='flex items-center gap-3 cursor-pointer group'>
                        <div className={`w-4 h-4 border border-gray-600 flex items-center justify-center transition-all ${category.includes(cat) ? 'bg-[#d4af37] border-[#d4af37]' : ''}`}>
                           {category.includes(cat) && <FaCheck size={10} className='text-black' />}
                        </div>
                        <input type="checkbox" className='hidden' value={cat} onChange={toggleCategory} />
                        <span className={`text-sm tracking-wide transition-all ${category.includes(cat) ? 'text-white font-bold' : 'text-gray-400 group-hover:text-white'}`}>{cat}</span>
                      </label>
                    ))}
                  </div>
               </div>

               {/* Types */}
               <div>
                  <h3 className='text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-4'>Collection Type</h3>
                  <div className='flex flex-col gap-3'>
                    {['TopWear', 'BottomWear', 'WinterWear'].map((sub) => (
                      <label key={sub} className='flex items-center gap-3 cursor-pointer group'>
                        <div className={`w-4 h-4 border border-gray-600 flex items-center justify-center transition-all ${subCategory.includes(sub) ? 'bg-[#d4af37] border-[#d4af37]' : ''}`}>
                           {subCategory.includes(sub) && <FaCheck size={10} className='text-black' />}
                        </div>
                        <input type="checkbox" className='hidden' value={sub} onChange={toggleSubCategory} />
                        <span className={`text-sm tracking-wide transition-all ${subCategory.includes(sub) ? 'text-white font-bold' : 'text-gray-400 group-hover:text-white'}`}>{sub}</span>
                      </label>
                    ))}
                  </div>
               </div>

               <button 
                  onClick={() => setShowFilter(false)}
                  className='w-full mt-12 bg-white text-black font-bold uppercase tracking-[0.2em] py-4 text-xs hover:bg-[#d4af37] transition-colors'
               >
                  View Results
               </button>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- FULL WIDTH PRODUCT GRID --- */}
      <div className='max-w-[1600px] mx-auto px-4 sm:px-8 py-10'>
         <motion.div 
            layout
            className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8'
         >
            {filterProduct.length > 0 ? (
                filterProduct.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <Card 
                      id={item._id} 
                      name={item.name} 
                      images={[item.image1, item.image2, item.image3, item.image4]} 
                      price={item.price} 
                    />
                  </motion.div>
                ))
            ) : (
                <div className='col-span-full h-[50vh] flex flex-col items-center justify-center text-gray-500'>
                   <p className='text-xl font-serif'>No Pieces Found.</p>
                   <p className='text-sm mt-2'>Try adjusting your filters.</p>
                </div>
            )}
         </motion.div>
      </div>

    </div>
  );
}

export default Collections;