import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import contactImg from "../assets/back.webp"; // 👉 replace with actual image
import NewLetterBox from "../Component/NewLetterBox";

const Contact = () => {
  return (
    <>
      <div className="w-full min-h-screen bg-gradient-to-l from-[#F2E9E4] to-[#F7F4EA] px-6 py-12 flex flex-col md:flex-row items-center justify-center gap-12">
        
        {/* Left: Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <img
            src={contactImg}
            alt="Contact"
            className="rounded-2xl shadow-xl hover:scale-105 transition-transform duration-500"
          />
        </motion.div>

        {/* Right: Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 space-y-6 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-[black] mb-6 tracking-wide">
            Contact <span className="text-[black]">Us</span>
          </h2>

          {/* Phone */}
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(168,187,163,0.5)" }}
            className="flex items-center gap-4 bg-[#EBD9D1] p-6 rounded-2xl shadow-md transition duration-300"
          >
            <FaPhoneAlt className="text-2xl text-[black]" />
            <div>
              <h3 className="text-lg font-semibold text-black">Phone</h3>
              <p className="text-black">+91 98765 43210</p>
            </div>
          </motion.div>

          {/* Email */}
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(168,187,163,0.5)" }}
            className="flex items-center gap-4 bg-[#EBD9D1] p-6 rounded-2xl shadow-md transition duration-300"
          >
            <FaEnvelope className="text-2xl text-[#black]" />
            <div>
              <h3 className="text-lg font-semibold text-black">Email</h3>
              <p className="text-black">support@onecart.com</p>
            </div>
          </motion.div>

          {/* Address */}
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(168,187,163,0.5)" }}
            className="flex items-center gap-4 bg-[#EBD9D1] p-6 rounded-2xl shadow-md transition duration-300"
          >
            <FaMapMarkerAlt className="text-2xl text-[black]" />
            <div>
              <h3 className="text-lg font-semibold text-black">Address</h3>
              <p className="text-black">New Delhi, India</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Newsletter */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="py-12 bg-[#F7F4EA]"
      >
        <NewLetterBox />
      </motion.div>
    </>
  );
};

export default Contact;
