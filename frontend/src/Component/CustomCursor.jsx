import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [hoverState, setHoverState] = useState("default"); // 'default', 'pointer'

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const mouseOver = (e) => {
      const target = e.target;
      
      // Check if hovering over clickable elements
      const isLink = target.closest('a') || target.closest('button') || target.closest('.cursor-pointer') || target.tagName === 'INPUT';

      if (isLink) {
        setHoverState("pointer");
      } else {
        setHoverState("default");
      }
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseover", mouseOver);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseover", mouseOver);
    };
  }, []);

  // Disable on Mobile
  if (typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    return null;
  }

  // --- ANIMATION VARIANTS (Fixed: No Big Circle) ---
  const variants = {
    default: {
      height: 10,
      width: 10,
      x: mousePosition.x - 5,
      y: mousePosition.y - 5,
      backgroundColor: "#d4af37", // Pure Gold
      mixBlendMode: "normal",
      boxShadow: "0 0 15px rgba(212, 175, 55, 0.6)", // Soft Glow
      opacity: 1
    },
    pointer: {
      height: 20, // Sirf thoda sa bada hoga
      width: 20,
      x: mousePosition.x - 10,
      y: mousePosition.y - 10,
      backgroundColor: "transparent", // Andar se khali
      border: "2px solid #d4af37", // Gold Ring ban jayega
      mixBlendMode: "normal",
      boxShadow: "0 0 20px rgba(212, 175, 55, 0.4)",
      scale: 1.2
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
      variants={variants}
      animate={hoverState}
      transition={{
        type: "tween",
        ease: "linear",
        duration: 0.1 // Instant response
      }}
    />
  );
};

export default CustomCursor;