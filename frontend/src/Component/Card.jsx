import React from 'react'
import { useContext } from 'react'
import { ShopDataContext } from '../Context/ShopContext'
import { useNavigate } from 'react-router-dom'
// Assuming 'S' is the default size for immediate actions from the card
const DEFAULT_SIZE = 'S'; 

function Card({ name, image, id, price }) {
  // Destructure addToCart from ShopDataContext
  let { currency, addToCart } = useContext(ShopDataContext) 
  let navigate = useNavigate()

  // Define Dark Accent Color for High Contrast
  const DARK_ACCENT = '#1a1a1a'; 

  // Handler for Add to Cart
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent navigating to product detail
    if (addToCart) {
      // Use the specified default size 'S'
      addToCart(id, DEFAULT_SIZE); 
      // Optionally show a notification
    }
  };

  // Handler for Buy Now (Add to Cart and Navigate to Cart)
  const handleBuyNow = (e) => {
    e.stopPropagation(); // Prevent navigating to product detail
    if (addToCart) {
      // Use the specified default size 'S' and then navigate
      addToCart(id, DEFAULT_SIZE); 
    }
    navigate('/cart'); // Navigate directly to the cart page
  };

  return (
    <div
      // Base Styling: White card with strong shadow and smooth rounded corners.
      className='w-[300px] max-w-[90%] h-[400px] bg-white border border-gray-100 shadow-lg rounded-xl overflow-hidden 
                 
                 hover:shadow-2xl hover:scale-[1.03] 
                 flex flex-col items-start cursor-pointer transition-all duration-300 group relative'
      onClick={() => navigate(`/productDetail/${id}`)}
    >
      {/* 1. Image Container with Smooth Zoom Effect */}
      <div className='w-full h-[70%] overflow-hidden'> 
        <img
          src={image}
          alt={name}
          className='w-full h-full object-cover 
                     group-hover:scale-[1.05] transition-transform duration-500 ease-in-out' // Image Zoom on Hover
        />
      </div>

      {/* 2. Product Details Section */}
      <div className='flex flex-col items-start justify-center p-4 h-[30%] w-full'>
        
        {/* Name - Keeping original font size/weight */}
        <div 
          className='text-[#111] text-[18px] font-medium truncate w-full mb-1'
        > 
            {name}
        </div>
        
        {/* Price - Keeping original font size/weight, Highlighting with Dark Accent */}
        <div 
          className={`text-[15px] font-semibold`} 
          style={{ color: DARK_ACCENT }} 
        > 
          {currency}{price}
        </div>
      </div>
      
      {/* --- ACTION BUTTONS OVERLAY --- */}
      <div className='absolute inset-x-0 bottom-0 p-3 flex justify-center space-x-2 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                      transform translate-y-2 group-hover:translate-y-0'>

        {/* 1. Add to Cart Button */}
        <button
          className='flex-1 px-3 py-2 text-sm font-semibold rounded-lg text-white hover:opacity-90 transition-opacity'
          style={{ backgroundColor: DARK_ACCENT }} 
          onClick={handleAddToCart} // Calls function using DEFAULT_SIZE ('S')
        >
          Add to Cart
        </button>

        {/* 2. Buy Now Button */}
        <button
          className='flex-1 px-3 py-2 text-sm font-semibold rounded-lg border text-white transition-colors'
          style={{ backgroundColor: DARK_ACCENT, borderColor: DARK_ACCENT }}
          onClick={handleBuyNow} // Calls function using DEFAULT_SIZE ('S')
        >
          Buy Now
        </button>
      </div>
      {/* --- END ACTION BUTTONS --- */}
    </div>
  )
}

export default Card