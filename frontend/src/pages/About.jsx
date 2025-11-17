import React, { useState } from "react";
import { FaShippingFast, FaTags, FaHeadset, FaGift, FaLeaf, FaSmile } from "react-icons/fa";
import { motion } from "framer-motion";
import imge from "../assets/back.webp";
import bg from '../assets/about.png';
import NewLetterBox from "../Component/NewLetterBox";
import Title from "../Component/Title";

const About = () => {
  const baseCards = [
    { icon: <FaShippingFast className="text-5xl text-[#c59a8a] mx-auto mb-4" />, title: "Fast Delivery", desc: "Get your favorite outfits quickly at your doorstep with our trusted delivery network." },
    { icon: <FaTags className="text-5xl text-[#c59a8a] mx-auto mb-4" />, title: "Best Prices", desc: "Enjoy exclusive fashion deals and unbeatable prices every day." },
    { icon: <FaHeadset className="text-5xl text-[#c59a8a] mx-auto mb-4" />, title: "24/7 Support", desc: "Our support team is available around the clock for your queries." },
    { icon: <FaGift className="text-5xl text-[#c59a8a] mx-auto mb-4" />, title: "Special Rewards", desc: "Earn points and rewards with every purchase." },
    { icon: <FaLeaf className="text-5xl text-[#c59a8a] mx-auto mb-4" />, title: "Eco Friendly", desc: "All our packaging is 100% recyclable and sustainable." },
    { icon: <FaSmile className="text-5xl text-[#c59a8a] mx-auto mb-4" />, title: "Happy Customers", desc: "Over 50,000+ happy shoppers trust Shopverse." },
  ];

  return (
    <div className="w-full min-h-screen bg-white pt-[80px] px-6 pb-12 overflow-hidden">
      
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}ijj
        >
          <img
            src={bg}
            alt="Clothes"
            className="h-120 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-500 "
            
          />
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 text-center md:text-left"
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Title text1={"About "} text2={"Shopverse"} />
          <p className="text-gray-700 leading-relaxed text-lg mt-4">
            At <b className="text-[#c59a8a]">Shopverse</b>, we bring you the perfect blend of style, comfort, and affordability. From trendy outfits to timeless classics, we ensure your shopping experience is effortless and enjoyable.
          </p>
        </motion.div>
      </div>

      {/* Why Choose Us Section - Scrollable */}
      <div className="mt-24 text-center">
        <Title text1={"Why "} text2={"Choose Us"} />

        <div className="flex gap-8 mt-10 overflow-x-auto snap-x snap-mandatory px-4 hide-scrollbar">
          {baseCards.map((card, i) => (
            <motion.div
              key={i}
              className="min-w-[300px] max-w-[300px] h-[220px] bg-[#e0e0e0] rounded-2xl shadow-lg p-8 flex-shrink-0 snap-start hover:shadow-xl hover:-translate-y-2 transition duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-center">{card.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{card.title}</h3>
              <p className="text-gray-600">{card.desc}</p>
            </motion.div>
          ))}
        </div>
        <p className="text-gray-500 mt-3 text-sm">Scroll → to explore more</p>
      </div>

      {/* Newsletter Section */}
      <motion.div
        className="pt-[60px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <NewLetterBox />
      </motion.div>

      {/* Hide Scrollbar CSS */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default About;
