import React, { useContext, useState, useEffect } from 'react';
import { ShopDataContext } from '../Context/ShopContext';
import Title from './Title';
import Card from './Card';
import { motion } from 'framer-motion';

function LatestCollection() {
  const { products } = useContext(ShopDataContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 8));
  }, [products]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className='py-24 bg-black'>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className='text-center mb-16'
      >
        <Title text1={"NEW "} text2={"ARRIVALS"} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-400 mt-3 font-light tracking-wide'>
          Discover the essence of luxury. The new season is here.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-8 px-4 sm:px-10 max-w-7xl mx-auto'
      >
        {latestProducts.length > 0 ? (
          latestProducts.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              {/* ✅ CHANGE: image prop mein array pass kar rahe hain [img1, img2] */}
              <Card 
                id={item._id} 
                name={item.name} 
                images={[item.image1, item.image2]} 
                price={item.price} 
              />
            </motion.div>
          ))
        ) : (
           <div className='col-span-full text-center py-20'>
              <div className="inline-block w-10 h-10 border-4 border-gray-800 border-t-[#d4af37] rounded-full animate-spin"></div>
              <p className="text-gray-500 mt-4 text-xs uppercase tracking-widest">Loading Collection...</p>
           </div>
        )}
      </motion.div>

    </div>
  );
}

export default LatestCollection;