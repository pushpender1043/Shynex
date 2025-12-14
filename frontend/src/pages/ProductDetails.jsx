import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ShopDataContext } from '../Context/ShopContext'
import { FaStar, FaTruck, FaUndo, FaShieldAlt, FaRuler, FaChevronDown } from "react-icons/fa";
import RelatedProduct from '../Component/RelatedProduct';
import { motion, AnimatePresence } from 'framer-motion';

function ProductDetails() {
  let { productId } = useParams()
  let { products, currency, addToCart } = useContext(ShopDataContext)
  let [productData, setProductData] = useState(false)
  
  // Image & Size State
  const [image, setImage] = useState('')
  const [image1, setImage1] = useState('')
  const [image2, setImage2] = useState('')
  const [image3, setImage3] = useState('')
  const [image4, setImage4] = useState('')
  const [size, setSize] = useState('')
  const [sizeError, setSizeError] = useState(false)
  
  // Accordion State for Description/Reviews
  const [openSection, setOpenSection] = useState('description');

  // Zoom State
  const [zoomStyle, setZoomStyle] = useState({ transformOrigin: 'center', transform: 'scale(1)' });

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage1(item.image1); setImage2(item.image2);
        setImage3(item.image3); setImage4(item.image4);
        setImage(item.image1)
        return null
      }
    })
  }

  useEffect(() => { fetchProductData() }, [productId, products])

  // Zoom Logic
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({ transformOrigin: `${x}% ${y}%`, transform: 'scale(2)' }); // Slight less zoom for elegance
  };

  const handleMouseLeave = () => {
    setZoomStyle({ transformOrigin: 'center', transform: 'scale(1)' });
  };

  if (!productData) return <div className="min-h-screen bg-[#050505]" />;

  return (
    <div className="w-full min-h-screen bg-[#050505] text-white font-sans pt-[100px]">
      
      {/* --- BREADCRUMB (Context) --- */}
      <div className='max-w-[1800px] mx-auto px-6 py-4 text-xs text-gray-500 uppercase tracking-widest border-b border-white/5'>
         Home / {productData.category} / <span className='text-[#d4af37]'>{productData.name}</span>
      </div>

      <div className="max-w-[1800px] mx-auto px-0 md:px-6 lg:px-12 py-10">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-24 relative">

          {/* --- LEFT: IMMERSIVE GALLERY (60% Width) --- */}
          <div className="w-full lg:w-[60%] flex flex-col-reverse md:flex-row gap-4">
            
            {/* Vertical Thumbnails (Hidden on small mobile) */}
            <div className="hidden md:flex flex-col gap-4 w-[100px] h-fit sticky top-[120px]">
              {[image1, image2, image3, image4].filter(Boolean).map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setImage(img)}
                  className={`w-full aspect-[3/4] cursor-pointer border transition-all duration-500 ${
                    image === img ? 'border-[#d4af37] opacity-100' : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* Mobile Horizontal Thumbnails */}
            <div className="flex md:hidden gap-3 overflow-x-auto px-4 pb-4 scrollbar-hide">
                 {[image1, image2, image3, image4].filter(Boolean).map((img, idx) => (
                    <div key={idx} onClick={() => setImage(img)} className={`w-20 h-24 flex-shrink-0 border ${image === img ? 'border-[#d4af37]' : 'border-gray-800'}`}>
                        <img src={img} className="w-full h-full object-cover" />
                    </div>
                 ))}
            </div>

            {/* MAIN IMAGE CANVAS (Big & Bold) */}
            <div 
              className="flex-1 bg-[#0a0a0a] relative overflow-hidden cursor-zoom-in group h-[60vh] md:h-[85vh] w-full"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={image}
                alt={productData.name}
                className="w-full h-full object-cover md:object-contain transition-transform duration-300 ease-out"
                style={zoomStyle} 
              />
              {/* Badge */}
              <div className='absolute top-6 left-6 bg-[#d4af37] text-black text-[10px] font-bold uppercase px-3 py-1 tracking-widest'>
                 Premium
              </div>
            </div>
          </div>

          {/* --- RIGHT: STICKY PRODUCT INFO (40% Width) --- */}
          <div className="w-full lg:w-[40%] flex flex-col h-fit lg:sticky lg:top-[120px] px-6 lg:px-0 pb-20">
            
            <div className='mb-8'>
                <h1 className="text-4xl xl:text-6xl font-serif font-medium text-white leading-none tracking-tight mb-4">
                {productData.name}
                </h1>
                <div className='flex justify-between items-end border-b border-white/10 pb-6'>
                    <div className='flex flex-col gap-1'>
                        <p className="text-3xl text-[#d4af37] font-serif">{currency}{productData.price}</p>
                        <p className='text-xs text-gray-500 uppercase tracking-widest'>Inclusive of all taxes</p>
                    </div>
                    <div className='flex gap-1 text-[#d4af37] text-xs'>
                        <FaStar/><FaStar/><FaStar/><FaStar/><FaStar className='text-gray-600'/>
                        <span className='text-gray-400 ml-2'>(4.8)</span>
                    </div>
                </div>
            </div>

            {/* Description Preview */}
            <p className='text-gray-400 font-light leading-relaxed text-sm mb-10'>
                {productData.description}. Designed for those who appreciate the finer things. A perfect blend of heritage craftsmanship and modern silhouette.
            </p>

            {/* Size Selector (Minimal) */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                 <p className="text-xs font-bold text-white uppercase tracking-[0.2em]">Select Size</p>
                 <button className="flex items-center gap-2 text-xs text-gray-500 hover:text-[#d4af37] transition-colors uppercase tracking-wider">
                    <FaRuler /> Size Guide
                 </button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {productData.sizes.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => { setSize(item); setSizeError(false) }}
                    className={`h-12 w-full font-sans text-sm font-medium transition-all duration-300 border ${
                      item === size 
                      ? 'bg-white text-black border-white' 
                      : 'bg-transparent text-gray-400 border-gray-800 hover:border-gray-500 hover:text-white'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              {sizeError && <p className="text-red-500 text-xs mt-3 animate-pulse">Please select a size to proceed.</p>}
            </div>

            {/* Add to Cart Button (Full Width Luxury) */}
            <button
                onClick={() => { if (!size) { setSizeError(true); return; } addToCart(productData._id, size) }}
                className='w-full bg-[#d4af37] text-black h-16 font-bold uppercase tracking-[0.3em] text-sm hover:bg-white transition-all duration-500 mb-10 shadow-[0_0_30px_rgba(212,175,55,0.1)]'
            >
                Add To Cart
            </button>

            {/* Info Accordions (Clean Lines) */}
            <div className='flex flex-col border-t border-white/10'>
                
                {/* 1. Features */}
                <div className='border-b border-white/10'>
                    <button onClick={() => setOpenSection(openSection === 'features' ? '' : 'features')} className='w-full py-6 flex justify-between items-center text-sm font-bold uppercase tracking-widest hover:text-[#d4af37] transition-colors'>
                        Product Features <FaChevronDown className={`transition-transform ${openSection === 'features' ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                        {openSection === 'features' && (
                            <motion.div initial={{height:0, opacity:0}} animate={{height:'auto', opacity:1}} exit={{height:0, opacity:0}} className='overflow-hidden'>
                                <ul className='pb-6 text-sm text-gray-400 font-light space-y-2 list-disc pl-5'>
                                    <li>Premium fabric construction.</li>
                                    <li>Tailored fit for modern silhouette.</li>
                                    <li>Resistant to fading and wear.</li>
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* 2. Delivery */}
                <div className='border-b border-white/10'>
                    <button onClick={() => setOpenSection(openSection === 'delivery' ? '' : 'delivery')} className='w-full py-6 flex justify-between items-center text-sm font-bold uppercase tracking-widest hover:text-[#d4af37] transition-colors'>
                        Shipping & Returns <FaChevronDown className={`transition-transform ${openSection === 'delivery' ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                        {openSection === 'delivery' && (
                            <motion.div initial={{height:0, opacity:0}} animate={{height:'auto', opacity:1}} exit={{height:0, opacity:0}} className='overflow-hidden'>
                                <div className='pb-6 text-sm text-gray-400 font-light space-y-4'>
                                    <div className='flex items-center gap-3'><FaTruck className='text-[#d4af37]'/> Free shipping on orders over {currency}5000</div>
                                    <div className='flex items-center gap-3'><FaUndo className='text-[#d4af37]'/> 7-Day hassle-free return policy</div>
                                    <div className='flex items-center gap-3'><FaShieldAlt className='text-[#d4af37]'/> Authenticity Guaranteed</div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>

          </div>
        </div>

        {/* --- RELATED PRODUCTS (Separated) --- */}
        <div className="mt-32 pt-10 border-t border-white/5">
            <h2 className="text-2xl font-serif text-white mb-10 text-center uppercase tracking-widest">
               Curated For You
            </h2>
            <RelatedProduct category={productData.category} subCategory={productData.subCategory} currentProductId={productData._id} />
        </div>

      </div>
    </div>
  );
}

export default ProductDetails;