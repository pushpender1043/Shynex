import React from "react";
import { FaShippingFast, FaTags, FaHeadset } from "react-icons/fa";
import { motion } from "framer-motion";
import imge from "../assets/back.webp";
import NewLetterBox from "../Component/NewLetterBox";
import Title from "../Component/Title";

const About = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#F2E9E4] to-[#F7F4EA] px-6 py-12">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
        {/* Left: Image */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={imge}
            alt="Clothes"
            className="rounded-2xl shadow-xl hover:scale-105 transition-transform duration-500"
          />
        </motion.div>

        {/* Right: Text */}
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left"
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Title text1={"About "} text2={"OneCart"} />
          <p className="text-gray-700 leading-relaxed text-lg">
            At <b className="text-[#c9ada7]">OneCart</b>, we believe shopping
            should be simple, stylish, and affordable. From trendy outfits to
            timeless classics, we bring you the best fashion collection that
            blends comfort with quality. Our mission is to make your shopping
            journey effortless and enjoyable.
          </p>
        </motion.div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-20 text-center">
        <Title text1={"Why "} text2={"Choose Us"} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {/* Fast Delivery */}
          <motion.div
            className="bg-[#EBD9D1] rounded-2xl shadow-lg p-8 hover:shadow-xl hover:-translate-y-2 transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <FaShippingFast className="text-5xl text-[#c9ada7] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Fast Delivery
            </h3>
            <p className="text-gray-600">
              Get your favorite outfits delivered quickly at your doorstep with
              our trusted delivery network.
            </p>
          </motion.div>

          {/* Best Prices */}
          <motion.div
            className="bg-[#EBD9D1] rounded-2xl shadow-lg p-8 hover:shadow-xl hover:-translate-y-2 transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <FaTags className="text-5xl text-[#c9ada7] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Best Prices
            </h3>
            <p className="text-gray-600">
              Enjoy stylish fashion at unbeatable prices with exclusive offers
              and discounts.
            </p>
          </motion.div>

          {/* 24/7 Support */}
          <motion.div
            className="bg-[#EBD9D1] rounded-2xl shadow-lg p-8 hover:shadow-xl hover:-translate-y-2 transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <FaHeadset className="text-5xl text-[#c9ada7] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              24/7 Support
            </h3>
            <p className="text-gray-600">
              Our support team is available anytime to assist you with queries
              and ensure smooth shopping.
            </p>
          </motion.div>
        </div>
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
    </div>
  );
};

export default About;
