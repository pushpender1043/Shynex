import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../Component/Nav';
import Product from './Product.jsx';
import OurPolicy from '../Component/OurPolicy.jsx';
import NewLetterBox from '../Component/NewLetterBox.jsx';
import Footer from '../Component/Footer.jsx';
import Title from '../Component/Title.jsx';
import CrazyDeals from '../Component/CrazyDeal.jsx';

// --- CONFIGURATION ---
const TRENDING_CATEGORIES = [
  { name: 'Shirts', img: '/src/assets/men.webp', link: '/collection' },
  { name: 'Jackets', img: '/src/assets/products/product7/jack4.webp', link: '/collection' },
  { name: 'Pants', img: '/src/assets/products/product3/pant3.webp', link: '/collection' },
  { name: 'Skirt', img: '/src/assets/l.webp', link: '/collection' },
  { name: 'Kurti', img: '/src/assets/products/product9/kurti4.webp', link: '/collection' },
{ name: 'Kids-kurta', img: '/src/assets/products/pro15/4.webp', link: '/collection' },
];

// --- Combine categories three times for visual loop effect ---
const CATEGORY_LOOP = [...TRENDING_CATEGORIES, ...TRENDING_CATEGORIES, ...TRENDING_CATEGORIES];

function Home() {
  // --- Existing 3D Carousel Data (UNCHANGED) ---
  const items = [
    { img: '/src/assets/men.webp', name: 'Shirt' },
    { img: '/src/assets/l.webp', name: 'Shoes' },
    { img: '/src/assets/products/product5/hood1.webp', name: 'Jacket' },
    { img: '/src/assets/products/product8/suit4.webp', name: 'Pants' },
    { img: '/src/assets/l.webp', name: 'Shoes' },
    { img: '/src/assets/products/pro15/4.webp', name: 'Shoes' },
{ img: '/src/assets/men.webp', name: 'Shirt' },
    { img: '/src/assets/l.webp', name: 'Shoes' },
    { img: '/src/assets/products/product5/hood1.webp', name: 'Jacket' },
    { img: '/src/assets/products/product8/suit4.webp', name: 'Pants' },
    { img: '/src/assets/l.webp', name: 'Shoes' },
    { img: '/src/assets/products/pro15/4.webp', name: 'Shoes' },{ img: '/src/assets/men.webp', name: 'Shirt' },
    { img: '/src/assets/l.webp', name: 'Shoes' },
    { img: '/src/assets/products/product5/hood1.webp', name: 'Jacket' },
    { img: '/src/assets/products/product8/suit4.webp', name: 'Pants' },
    { img: '/src/assets/l.webp', name: 'Shoes' },
    { img: '/src/assets/products/pro15/4.webp', name: 'Shoes' },

  ];

  // --- Existing 3D Carousel Logic (UNCHANGED) ---
  const [rotation, setRotation] = useState(0);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startRotation = useRef(0);
  const navigate = useNavigate();

  // NEW: Scroll Animation Logic (UNCHANGED)
  const policyRef = useRef(null);
  const [policyVisible, setPolicyVisible] = useState(false);
  const DARK_ACCENT = '#1a1a1a';

  // Auto rotation
  useEffect(() => {
    const interval = setInterval(() => {
      if (!dragging.current) setRotation((prev) => prev + 0.4);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  // Drag control
  const onMouseDown = (e) => {
    dragging.current = true;
    startX.current = e.clientX;
    startRotation.current = rotation;
  };
  const onMouseMove = (e) => {
    if (!dragging.current) return;
    const dx = e.clientX - startX.current;
    setRotation(startRotation.current + dx * 0.6);
  };
  const onMouseUp = () => (dragging.current = false);
  const onMouseLeave = onMouseUp;

  // Intersection Observer for OurPolicy section fade-in
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPolicyVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (policyRef.current) {
      observer.observe(policyRef.current);
    }

    return () => {
      if (policyRef.current) observer.unobserve(policyRef.current);
    };
  }, []);

  // --- Start Return JSX ---
  return (
    <div className="w-full min-h-screen relative overflow-hidden">
      
      {/* --- BACKGROUND (UNCHANGED) --- */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/bgg.jpg')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          filter: 'blur(2px)',
          zIndex: -2,
        }}
      ></div>
      <div className="absolute inset-0 bg-gray-500/30 z-[-1]"></div>

      <Nav />

      {/* --- HERO BANNER SECTION (UNCHANGED LAYOUT) --- */}
      <div className="w-full pt-40 pb-0 text-center text-white relative z-10">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight drop-shadow-lg"> 
          DISCOVER THE NEXT TREND
        </h1>
        <p className="mt-3 text-xl font-light text-gray-200">
          Interactive showcase of our best sellers. Grab and rotate!
        </p>
        <button
          onClick={() => navigate('/collection')}
          className="mt-3 px-8 py-3 text-lg font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105" 
          style={{ backgroundColor: DARK_ACCENT, color: 'white' }}
        >
          Explore Collections
        </button>
</div>


 {/* --- 3D Carousel (UNCHANGED) --- */}
      <div
        className="w-full h-[70vh] flex justify-center items-center relative cursor-grab"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        <div
          className="relative w-[400px] h-[400px]"
          style={{
            transformStyle: 'preserve-3d',
            transform: `perspective(1000px) rotateY(${rotation}deg)`,
          }}
        >
          {items.map((item, idx) => {
            const angle = (360 / items.length) * idx;
            const radius = 400;
            const rad = ((angle + rotation) * Math.PI) / 180;
            const z = radius * Math.sin(rad);

            const totalItems = items.length;
            const anglePerItem = 360 / totalItems;
            let distanceFromCenter = Math.min(
              Math.abs((angle + rotation) % 360),
              360 - Math.abs((angle + rotation) % 360)
            );

            const blur = distanceFromCenter < anglePerItem * 1 ? 0 : Math.min(6, distanceFromCenter / 15);
            const scale = distanceFromCenter < anglePerItem * 2 ? 1 : 0.7 + (360 - distanceFromCenter) / 360 * 0.3;
            const opacity = distanceFromCenter < anglePerItem * 2 ? 1 : 0.5 + (360 - distanceFromCenter) / 360 * 0.5;

            return (
              <div
                key={idx}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px) scale(${scale})`,
                  filter: `blur(${blur}px) `,
                  opacity: Math.min(Math.max(opacity, 0.4), 1),
                  zIndex: Math.round(z),
                }}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-[120px] h-[120px] rounded-lg object-cover shadow-xl"
                />
              </div>
            );
          })}
        </div>
      </div>
      
      {/* --- NEW: TRENDING CATEGORIES SLIDER (Horizontal Scroll) --- */}
      <section className="py-12 bg-white text-gray-900 border-t border-gray-100">
 <div className='h-[8%] w-[100%] text-center md:mt-[50px] '>
    <Title text1={"Featured "} text2={"Category"}/>

 </div>
        
        {/* Horizontal scroll container (Looping items and Scrollbar Hide) */}
        <div className="flex overflow-x-auto gap-6 px-8 py-4 custom-scrollbar">
          {CATEGORY_LOOP.map((cat, index) => (
            <div
              key={index}
              onClick={() => navigate(cat.link)}
              className="flex-shrink-0 w-[250px] h-[300px] overflow-hidden rounded-xl shadow-xl cursor-pointer relative group transition-transform duration-300 hover:scale-[1.03]"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 flex items-end p-4">
                <h3 className="text-2xl font-extrabold text-white z-10 tracking-wide">
                  {cat.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>


      <Product />
      
      {/* --- OurPolicy with Scroll Fade-in Animation --- */}
      <div 
        ref={policyRef} 
        className={`bg-gray-50 transition-all duration-1000 ease-out py-10 ${
          policyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <OurPolicy />
      </div>

      <NewLetterBox />
      <Footer />
    </div>
  );
}

export default Home;
