import React, { useContext, useState, useEffect } from 'react'
import { ShopDataContext } from '../Context/ShopContext'
import Title from './Title'
import Card from './Card'
import { motion } from 'framer-motion' 

function RelatedProduct({ category, subCategory, currentProductId }) {
    
    let { products } = useContext(ShopDataContext)
    let [related, setRelated] = useState([])

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice()
            productsCopy = productsCopy.filter((item) => category === item.category)
            productsCopy = productsCopy.filter((item) => subCategory === item.subCategory)
            productsCopy = productsCopy.filter((item) => currentProductId !== item._id)
            setRelated(productsCopy.slice(0, 4)) // Show top 4
        }
    }, [products, category, subCategory, currentProductId])

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        // ✅ CHANGED: Dark Theme Background
        <div className='w-full bg-[#050505] text-white py-10'> 
            
            {/* Header */}
            <div className='text-center mb-12'>
                {/* Note: Title component should handle dark mode text, or styling applied via parent */}
                <Title text1={"MATCHING "} text2={"ESTHETICS"} /> 
                <p className='w-full md:w-1/2 m-auto text-xs text-gray-500 mt-2 font-light tracking-[0.2em] uppercase'>
                    Curated selections to complete your look.
                </p>
            </div>

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-8'
            >
                {related.length > 0 ? (
                    related.map((item, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <Card 
                                id={item._id} 
                                name={item.name} 
                                price={item.price} 
                                images={[item.image1, item.image2, item.image3, item.image4]}
                            />
                        </motion.div>
                    ))
                ) : (
                    <div className='col-span-full text-center py-20 text-gray-600 font-serif text-sm tracking-widest'>
                        No matching pieces found in the archive.
                    </div>
                )}
            </motion.div>
            
        </div>
    )
}

export default RelatedProduct