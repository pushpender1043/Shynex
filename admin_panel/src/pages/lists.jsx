import React, { useState, useEffect, useContext } from 'react'
import Nav from '../Component/Nav'
import Sidebar from '../Component/Sidebar'
import { AuthDataContext } from '../Context/AuthContext';
import axios from 'axios';
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

function Lists() {
  let [list, setList] = useState([]);
  let { serverUrl } = useContext(AuthDataContext);

  const fetchList = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/product/list")
      setList(result.data);
    } catch (error) { console.log(error) }
  }

  const removeList = async (id) => {
    if(window.confirm("Are you sure you want to remove this asset?")) {
        try {
        let result = await axios.post(`${serverUrl}/api/product/remove/${id}`, {}, { withCredentials: true })
        if (result.data) {
            toast.success("Asset Removed Successfully");
            fetchList();
        }
        } catch (error) { console.log(error) }
    }
  }

  useEffect(() => { fetchList() }, [])

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className='w-full min-h-screen bg-[#f8f9fa] font-sans text-gray-800'>
      
      <Nav />
      <div className='flex'>
        <Sidebar />
        
        {/* MAIN CONTENT AREA */}
        <div className='flex-1 p-8 lg:ml-[250px] mt-[80px] min-h-screen bg-[#050505] text-white'> {/* ✅ Dark Background Added */}
          
          <div className='mb-8 flex justify-between items-end border-b border-[#222] pb-6'>
             <div>
                <h1 className='text-3xl font-serif font-bold text-white mb-2'>Inventory Management</h1>
                <p className='text-gray-500 text-sm'>Manage your exclusive collection.</p>
             </div>
             <div className='bg-[#111] text-[#d4af37] px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-sm border border-[#333]'>
                Total Items: {list.length}
             </div>
          </div>

          {/* TABLE HEADER */}
          <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-4 bg-[#111] text-[#d4af37] py-4 px-6 text-[10px] font-bold uppercase tracking-[0.2em] rounded-t-sm border-b border-[#333]'>
            <p>Image</p> 
            <p>Product Name</p> 
            <p>Category</p> 
            <p>Price</p> 
            <p className='text-center'>Action</p>
          </div>

          {/* LIST ITEMS */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className='flex flex-col bg-[#0a0a0a] border border-[#222] rounded-b-sm'
          >
            {list?.length > 0 ? (list.map((item, index) => (
              <motion.div 
                variants={itemVariants}
                key={index} 
                className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-4 items-center p-4 border-b border-[#222] hover:bg-[#111] transition-colors group last:border-none'
              >
                {/* Image */}
                <div className='w-12 h-12 overflow-hidden border border-[#333] rounded-sm group-hover:border-[#d4af37] transition-colors'>
                    <img src={item.image1} className='w-full h-full object-cover opacity-80 group-hover:opacity-100' alt="" />
                </div>

                {/* Name */}
                <p className='text-gray-300 font-serif font-medium text-sm truncate group-hover:text-white transition-colors'>
                    {item.name}
                </p>

                {/* Category */}
                <p className='text-gray-500 text-xs uppercase tracking-wide font-bold'>
                    {item.category}
                </p>

                {/* Price */}
                <p className='text-[#d4af37] font-bold font-sans text-sm'>
                    ₹{item.price}
                </p>

                {/* Action */}
                <div className='flex justify-center'>
                   <button 
                     onClick={() => removeList(item._id)} 
                     className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-900/20 text-gray-500 hover:text-red-500 transition-all'
                     title="Remove Item"
                   >
                     <FaTrash size={12} />
                   </button>
                </div>

              </motion.div>
            ))) : (
              <div className='text-center py-20 flex flex-col items-center justify-center text-gray-600'>
                 <p className='font-serif text-lg italic'>Inventory is empty.</p>
                 <p className='text-xs mt-2'>Add new products to see them here.</p>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </div>
  )
}

export default Lists