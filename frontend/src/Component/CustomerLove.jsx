import React from 'react';
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// --- PREMIUM REVIEWS DATA (Translated to English for Luxury Feel) ---
const reviews = [
  {
    id: 1,
    name: "Rohan Das",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    text: "Ordered a jacket from Shynex. The quality is absolutely premium! The fabric feels luxurious and the fit is tailored to perfection. Highly recommended.",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Fashion Blogger",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.5,
    text: "I adore the ethnic collection here. The intricate details and soft fabric make it a delight to wear. The Gold & Black packaging was a nice touch!",
  },
  {
    id: 3,
    name: "Amit Verma",
    role: "Entrepreneur",
    image: "https://randomuser.me/api/portraits/men/86.jpg",
    rating: 5,
    text: "Got the best deal on limited edition sneakers. It's rare to find such authentic styles at these prices. Customer support is very professional.",
  },
  {
    id: 4,
    name: "Sneha Gupta",
    role: "HR Manager",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    text: "A seamless shopping experience. The UI is elegant, and the return policy is completely hassle-free. Shynex is now my go-to for fashion.",
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "Fitness Coach",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    rating: 4,
    text: "Ordered sportswear. The material is breathable and fits perfectly for my intense workouts. Premium quality at its best.",
  },
  {
    id: 6,
    name: "Anjali Mehta",
    role: "Artist",
    image: "https://randomuser.me/api/portraits/women/90.jpg",
    rating: 5,
    text: "Absolutely in love with the trendy tops! The colors are vibrant and true to the images. Felt like unboxing a gift to myself.",
  }
];

const CustomerLove = () => {
  
  // --- SLIDER CONFIGURATION ---
  const settings = {
    dots: true,
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 3,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    focusOnSelect: true,
    arrows: false,
    dotsClass: "slick-dots custom-dots", // Custom class for Gold dots
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768, // Mobile view
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "20px"
        }
      }
    ]
  };

  return (
    <div className='py-24 bg-black overflow-hidden font-sans border-t border-gray-900'>
      
      {/* --- CSS FOR SLIDER MAGIC (Black & Gold Theme) --- */}
      <style>{`
        /* Inactive Cards: Darker, Smaller, Blurry */
        .slick-slide > div {
          transform: scale(0.85);
          transition: all 0.5s ease;
          opacity: 0.4;
          filter: blur(2px) grayscale(100%);
        }

        /* Active Center Card: Pop out, Gold Glow */
        .slick-center > div {
          transform: scale(1.05);
          opacity: 1;
          filter: blur(0px) grayscale(0%);
          position: relative;
          z-index: 10;
        }
        
        /* Gold Dots Logic */
        .custom-dots {
            bottom: -40px; 
            display: flex !important; 
            justify-content: center;
        }
        .custom-dots li button:before {
            font-size: 10px;
            color: #555; /* Inactive color */
            opacity: 1;
        }
        .custom-dots li.slick-active button:before {
            color: #d4af37; /* Active GOLD color */
        }
        
        .slick-slide:focus { outline: none; }
      `}</style>

      {/* Title Section */}
      <div className='text-center mb-16'>
        <div className='inline-flex gap-3 items-center mb-3'>
            <p className='text-gray-400 font-medium text-2xl sm:text-3xl font-serif tracking-widest uppercase'>
                Client <span className='text-[#d4af37] font-bold'>Diaries</span>
            </p>
            <div className='w-12 h-[2px] bg-[#d4af37]'></div>
        </div>
        <p className='text-gray-500 mt-2 text-sm uppercase tracking-[0.2em] font-light'>
            Voices of our cherished patrons
        </p>
      </div>

      {/* Slider Section */}
      <div className='max-w-7xl mx-auto px-0 md:px-4'>
        <Slider {...settings}>
          {reviews.map((review) => (
            
            <div key={review.id} className="py-10 px-4 outline-none"> 
              
              {/* --- CARD DESIGN --- */}
              <div className='bg-[#111] p-8 rounded-none border border-gray-800 shadow-2xl h-full flex flex-col justify-between relative mx-2 group hover:border-[#d4af37] transition-colors duration-500'>
                
                {/* Gold Quote Icon */}
                <div className='absolute -top-4 right-6 bg-black p-2 border border-gray-800 group-hover:border-[#d4af37] transition-colors'>
                   <FaQuoteLeft size={24} className='text-[#d4af37]' />
                </div>

                {/* Profile */}
                <div className='flex items-center gap-5 mb-6 border-b border-gray-800 pb-4'>
                   <img 
                     src={review.image} 
                     alt={review.name} 
                     className='w-14 h-14 rounded-full border border-gray-600 object-cover group-hover:border-[#d4af37] transition-colors'
                   />
                   <div>
                      <h3 className='font-serif font-bold text-white text-lg tracking-wide'>{review.name}</h3>
                      <p className='text-[10px] text-[#d4af37] font-bold uppercase tracking-widest'>{review.role}</p>
                   </div>
                </div>

                {/* Review Text */}
                <p className='text-gray-400 text-sm leading-relaxed italic font-light'>
                  "{review.text}"
                </p>

                {/* Rating Stars */}
                <div className='flex gap-1 mt-6 text-[#d4af37] text-xs'>
                   {[...Array(5)].map((_, i) => (
                     <FaStar key={i} className={i < Math.floor(review.rating) ? "text-[#d4af37]" : "text-gray-700"} />
                   ))}
                </div>

              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CustomerLove;