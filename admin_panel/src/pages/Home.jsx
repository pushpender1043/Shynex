import React, { useContext, useEffect, useState } from 'react'
import Nav from '../Component/Nav'
import Sidebar from '../Component/Sidebar'
import { AuthDataContext } from '../Context/AuthContext';
import axios from 'axios';
import { FaBoxOpen, FaShoppingBag, FaRupeeSign, FaChartLine } from "react-icons/fa";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // ✅ Import Added

function Home() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const { serverUrl } = useContext(AuthDataContext)
  const navigate = useNavigate(); // ✅ Initialize Navigation

  const fetchCounts = async () => {
    try {
      const products = await axios.get(`${serverUrl}/api/product/list`, {}, { withCredentials: true })
      setTotalProducts(products.data.length)

      const orders = await axios.post(`${serverUrl}/api/order/list`, {}, { withCredentials: true })
      
      if (orders.data) {
          setTotalOrders(orders.data.length);
          const revenue = orders.data.reduce((acc, order) => acc + (order.amount || 0), 0);
          setTotalRevenue(revenue);
      }
    } catch (error) {
      console.log("Failed to Fetch counts", error)
    }
  }
  useEffect(() => { fetchCounts() }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className='w-full min-h-screen bg-[#f8f9fa] font-sans text-gray-800'>
      <Nav />
      <div className='flex'>
        <Sidebar />
        
        {/* MAIN CONTENT AREA */}
        <div className='flex-1 p-8 lg:ml-[250px] mt-[80px] min-h-screen'>
          
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            
            {/* Header */}
            <div className='mb-10 flex justify-between items-end border-b border-gray-200 pb-6'>
                <div>
                    <h1 className='text-3xl font-serif font-bold text-[#111] mb-1'>Dashboard</h1>
                    <p className='text-gray-500 text-sm tracking-wide'>Welcome back, Administrator.</p>
                </div>
                <div className='hidden md:block'>
                    <button className='bg-black text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#d4af37] transition-all shadow-lg'>
                        Refresh Data
                    </button>
                </div>
            </div>
            
            {/* Stats Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              
              {/* Products */}
              <motion.div variants={cardVariants} className='bg-[#111] p-6 relative overflow-hidden shadow-xl rounded-sm group hover:-translate-y-2 transition-transform duration-300'>
                <div className='absolute right-0 top-0 w-24 h-24 bg-[#d4af37]/10 rounded-bl-full'></div>
                <div className='flex justify-between items-start mb-4'>
                    <div className='p-3 bg-white/10 rounded-full text-[#d4af37]'><FaBoxOpen size={20}/></div>
                </div>
                <h3 className='text-3xl font-serif text-white font-bold mb-1'>{totalProducts}</h3>
                <p className='text-gray-400 text-xs uppercase tracking-widest font-bold'>Total Inventory</p>
              </motion.div>

              {/* Orders */}
              <motion.div variants={cardVariants} className='bg-white p-6 relative overflow-hidden shadow-lg border border-gray-100 rounded-sm group hover:-translate-y-2 transition-transform duration-300'>
                <div className='flex justify-between items-start mb-4'>
                    <div className='p-3 bg-black rounded-full text-white'><FaShoppingBag size={20}/></div>
                </div>
                <h3 className='text-3xl font-serif text-[#111] font-bold mb-1'>{totalOrders}</h3>
                <p className='text-gray-500 text-xs uppercase tracking-widest font-bold'>Total Orders</p>
              </motion.div>
              
               {/* Revenue */}
               <motion.div variants={cardVariants} className='bg-gradient-to-br from-[#d4af37] to-[#b8860b] p-6 shadow-lg rounded-sm text-white group hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden'>
                <div className='absolute -right-6 -bottom-6 text-white/20'><FaRupeeSign size={100}/></div>
                <div className='flex justify-between items-start mb-4 relative z-10'>
                    <div className='p-3 bg-black/20 rounded-full text-white'><FaRupeeSign size={20}/></div>
                </div>
                <h3 className='text-3xl font-serif font-bold mb-1 relative z-10'>₹{totalRevenue.toLocaleString()}</h3>
                <p className='text-white/80 text-xs uppercase tracking-widest font-bold relative z-10'>Total Revenue</p>
              </motion.div>

              {/* Site Visits (Dummy) */}
              <motion.div variants={cardVariants} className='bg-white p-6 shadow-lg border border-gray-100 rounded-sm group hover:-translate-y-2 transition-transform duration-300'>
                <div className='flex justify-between items-start mb-4'>
                    <div className='p-3 bg-gray-100 rounded-full text-gray-600'><FaChartLine size={20}/></div>
                </div>
                <h3 className='text-3xl font-serif text-[#111] font-bold mb-1'>2.4k</h3>
                <p className='text-gray-500 text-xs uppercase tracking-widest font-bold'>Site Visits</p>
              </motion.div>

            </div>

            {/* Quick Actions (FIXED NOW) */}
            <div className='mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8'>
                <div className='bg-white p-8 shadow-lg border border-gray-100 rounded-sm'>
                    <h3 className='text-lg font-serif font-bold mb-6 border-b pb-4'>System Status</h3>
                    <div className='flex items-center gap-2 text-green-600 text-sm font-bold bg-green-50 p-3 rounded'>
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        Backend Services Online
                    </div>
                </div>
                
                {/* ✅ BUTTONS AB KAAM KARENGE */}
                <div className='bg-[#111] p-8 shadow-lg rounded-sm text-white'>
                    <h3 className='text-lg font-serif font-bold mb-6 border-b border-gray-800 pb-4 text-[#d4af37]'>Quick Actions</h3>
                    <div className='flex gap-4'>
                        <button 
                            onClick={() => navigate('/add')} 
                            className='bg-white/10 hover:bg-white/20 px-4 py-2 text-xs uppercase tracking-wide rounded transition-all border border-transparent hover:border-[#d4af37]'
                        >
                            Add Product
                        </button>
                        <button 
                            onClick={() => navigate('/orders')} 
                            className='bg-white/10 hover:bg-white/20 px-4 py-2 text-xs uppercase tracking-wide rounded transition-all border border-transparent hover:border-[#d4af37]'
                        >
                            View Orders
                        </button>
                    </div>
                </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Home