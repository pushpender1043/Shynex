import React, { useContext, useState, useEffect } from 'react';
import { ShopDataContext } from '../Context/ShopContext';
import Title from './Title';
import Card from './Card';
import { motion } from 'framer-motion';

function BestSeller() {
  const { products } = useContext(ShopDataContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const filterProduct = products.filter((item) => item.bestSeller);
    setBestSeller(filterProduct.slice(0, 4));
  }, [products]);

  return (
    <div className='py-24 bg-[#0a0a0a] border-t border-gray-900'> 
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className='text-center mb-16'
      >
        <Title text1={"OUR "} text2={"BESTSELLERS"} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-500 mt-3 font-light tracking-wide'>
          Curated Excellence. The pieces everyone desires.
        </p>
      </motion.div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-8 px-4 sm:px-10 max-w-7xl mx-auto'>
        {bestSeller.length > 0 ? (
          bestSeller.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* ✅ UPDATE: Passing images array for Swap Effect */}
              <Card 
                id={item._id} 
                name={item.name} 
                images={[item.image1, item.image2, item.image3, item.image4]} 
                price={item.price} 
              />
            </motion.div>
          ))
        ) : (
           <div className='col-span-full text-center py-20'>
              <div className="inline-block w-10 h-10 border-4 border-gray-800 border-t-[#d4af37] rounded-full animate-spin"></div>
           </div>
        )}
      </div>
    </div>
  );
}

export default BestSeller;