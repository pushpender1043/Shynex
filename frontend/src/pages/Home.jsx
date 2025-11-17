import React, { useEffect, useState, useRef } from 'react';
import Nav from '../Component/Nav';
import Product from './Product.jsx';
import OurPolicy from '../Component/OurPolicy.jsx';
import NewLetterBox from '../Component/NewLetterBox.jsx';
import Footer from '../Component/Footer.jsx';

function Home() {
  const items = [
    { img: '/src/assets/i.jpg', name: 'Shirt' },
    { img: '/src/assets/j.jpg', name: 'Jacket' },
    { img: '/src/assets/k.jpg', name: 'Pants' },
    { img: '/src/assets/l.webp', name: 'Shoes' },
    { img: '/src/assets/products/pro15/4.webp', name: 'Shoes' },
    { img: '/src/assets/l.webp', name: 'Shoes' },

     { img: '/src/assets/i.jpg', name: 'Shirt' },
    { img: '/src/assets/j.jpg', name: 'Jacket' },
    { img: '/src/assets/k.jpg', name: 'Pants' },
    { img: '/src/assets/l.webp', name: 'Shoes' },
     { img: '/src/assets/i.jpg', name: 'Shirt' },
    { img: '/src/assets/j.jpg', name: 'Jacket' },
    { img: '/src/assets/k.jpg', name: 'Pants' },
    { img: '/src/assets/l.webp', name: 'Shoes' },

  ];

  const [rotation, setRotation] = useState(0);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startRotation = useRef(0);

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

  return (
    <div className="w-full min-h-screen relative overflow-hidden">
      {/* Background */}
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

      {/* 3D Carousel */}
      <div
        className="w-full h-screen flex justify-center items-center relative cursor-grab"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
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

            // Distance from center in terms of items
            const totalItems = items.length;
            const anglePerItem = 360 / totalItems;
            let distanceFromCenter = Math.min(
              Math.abs((angle + rotation) % 360),
              360 - Math.abs((angle + rotation) % 360)
            );

            // Clear 2 images before center
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

      <Product />
      <OurPolicy />
      <NewLetterBox />
      <Footer />
    </div>
  );
}

export default Home;
