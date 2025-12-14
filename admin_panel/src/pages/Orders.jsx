import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AuthDataContext } from '../Context/AuthContext'
import { toast } from 'react-toastify'
import { FaBox, FaTruck, FaClipboardList, FaMoneyBillWave } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion'

// ✅ IMPORTS
import Nav from '../Component/Nav'
import Sidebar from '../Component/Sidebar'

const STATUS_STAGES = ['Order Placed', 'Packing', 'Shipped', 'Out for delivery', 'Delivered'];

function Orders() {
  const { serverUrl } = useContext(AuthDataContext);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('All'); 

  const fetchAllOrders = async () => {
    try {
      const response = await axios.post(serverUrl + '/api/order/list', {}, { withCredentials: true })
      
      if (response.data && Array.isArray(response.data)) {
        setOrders(response.data.reverse())
      } else if (response.data && response.data.orders) {
        setOrders(response.data.orders.reverse())
      } else {
        setOrders([]) 
      }
    } catch (error) {
      console.log("Fetch Error") 
    }
  }

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    setOrders(prevOrders => prevOrders.map(order => 
      order._id === orderId ? { ...order, status: newStatus } : order
    ));

    try {
      const response = await axios.post(serverUrl + '/api/order/status', { orderId, status: newStatus }, { withCredentials: true })
      if (response.data.success) {
        toast.success("Status Updated!")
      } 
    } catch (error) {
      console.log("Backend update failed but UI looks updated.")
    }
  }

  useEffect(() => { fetchAllOrders() }, [])

  const filteredOrders = activeTab === 'All' 
    ? orders 
    : orders.filter(order => order.status === activeTab);

  const getCount = (status) => orders.filter(o => o.status === status).length;

  return (
    <div className='w-full min-h-screen bg-[#f8f9fa] font-sans text-gray-800'>
      
      <Nav />
      <div className='flex'>
        <Sidebar />

        {/* MAIN CONTENT (Dark Theme) */}
        <div className='flex-1 p-8 lg:ml-[250px] mt-[80px] min-h-screen bg-[#050505] text-white'>
            
            <div className='mb-8 border-b border-[#222] pb-6'>
                <h1 className='text-3xl font-serif font-bold text-white mb-2'>Order Management</h1>
                <p className='text-gray-500 text-sm'>Select a status to update progress.</p>
            </div>

            {/* Filter Tabs (Dark) */}
            <div className='flex flex-wrap gap-3 mb-8'>
                {['All', ...STATUS_STAGES].map((status) => (
                    <button
                    key={status}
                    onClick={() => setActiveTab(status)}
                    className={`flex items-center gap-2 px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider rounded-sm transition-all duration-300 border ${
                        activeTab === status 
                        ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.4)]' 
                        : 'bg-[#111] text-gray-500 border-[#333] hover:border-gray-500 hover:text-white'
                    }`}
                    >
                    {status === 'All' ? 'All' : status}
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-[9px] ${activeTab === status ? 'bg-black text-[#d4af37]' : 'bg-[#222] text-gray-400'}`}>
                        {status === 'All' ? orders.length : getCount(status)}
                    </span>
                    </button>
                ))}
            </div>

            {/* Order List */}
            <div className='flex flex-col gap-6'>
                <AnimatePresence mode='popLayout'>
                {filteredOrders.length === 0 ? (
                    <motion.div initial={{opacity:0}} animate={{opacity:1}} className='text-center py-20 text-gray-600'>
                        <FaClipboardList className='text-4xl mx-auto mb-3 opacity-20'/>
                        <p className='font-serif italic'>No orders found in "{activeTab}"</p>
                    </motion.div>
                ) : (
                    filteredOrders.map((order) => (
                        <motion.div 
                            layout
                            initial={{ opacity: 0, y: 10 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0, scale: 0.95 }}
                            key={order._id} 
                            className='bg-[#0a0a0a] border border-[#222] p-6 rounded-sm shadow-lg hover:border-[#d4af37]/30 transition-all relative overflow-hidden group'
                        >
                            {/* Status Strip */}
                            <div className={`absolute top-0 left-0 w-1 h-full ${
                                order.status === 'Delivered' ? 'bg-green-500' : 'bg-[#d4af37]'
                            }`}></div>

                            <div className='flex flex-col md:flex-row justify-between gap-8'>
                                
                                {/* 1. Order Info */}
                                <div className='flex-1'>
                                    <div className='flex items-center gap-3 mb-4'>
                                        <div className='p-2 bg-[#111] border border-[#333] rounded-full text-[#d4af37]'><FaBox/></div>
                                        <div>
                                            <p className='font-bold text-sm text-white'>Order <span className='font-mono text-gray-500'>#{order._id.slice(-6)}</span></p>
                                            <p className='text-[10px] text-gray-500 uppercase tracking-widest'>{new Date(order.date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    
                                    <div className='space-y-3 pl-2 border-l border-[#222] ml-4'>
                                        {order.items.map((item, index) => (
                                            <div key={index} className='flex items-center gap-4 text-sm text-gray-400'>
                                                <span className='font-bold text-white'>{item.name}</span> 
                                                <span className='text-xs text-gray-600'>x{item.quantity}</span>
                                                <span className='text-[10px] bg-[#111] px-2 py-0.5 border border-[#333] rounded text-gray-500'>{item.size}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 2. Address */}
                                <div className='flex-1 text-sm text-gray-400'>
                                    <p className='font-bold text-gray-500 mb-3 text-[10px] uppercase tracking-widest flex items-center gap-2'>
                                        <FaTruck className='text-[#d4af37]'/> Shipping To
                                    </p>
                                    <p className='font-bold text-white mb-1'>{order.address.firstName + " " + order.address.lastName}</p>
                                    <p>{order.address.street}, {order.address.city}</p>
                                    <p>{order.address.state}, {order.address.country} - <span className='text-gray-500'>{order.address.zipcode}</span></p>
                                    <p className='mt-2 font-mono text-xs text-[#d4af37]'>{order.address.phone}</p>
                                </div>

                                {/* 3. Status & Amount */}
                                <div className='w-full md:w-64 flex flex-col justify-between items-end gap-6 bg-[#111] p-4 rounded-sm border border-[#222]'>
                                    <div className='text-right w-full'>
                                        <div className='flex justify-between items-center mb-1'>
                                            <p className='text-[10px] text-gray-500 uppercase tracking-widest'>Total</p>
                                            <p className='text-[10px] uppercase font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded'>
                                                {order.paymentMethod ? 'Paid Online' : 'COD'}
                                            </p>
                                        </div>
                                        <p className='text-2xl font-serif font-bold text-white'>₹{order.amount}</p>
                                    </div>

                                    <div className='w-full'>
                                        <label className='text-[9px] uppercase font-bold text-[#d4af37] mb-2 block tracking-widest'>Action Required</label>
                                        <select 
                                            onChange={(event) => statusHandler(event, order._id)} 
                                            value={order.status} 
                                            className={`w-full p-3 text-xs font-bold uppercase tracking-widest border outline-none cursor-pointer transition-all rounded-sm bg-black text-white focus:border-[#d4af37] ${
                                                order.status === 'Delivered' 
                                                ? 'border-green-900 text-green-500' 
                                                : 'border-[#333]'
                                            }`}
                                        >
                                            {STATUS_STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                </div>

                            </div>
                        </motion.div>
                    ))
                )}
                </AnimatePresence>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Orders