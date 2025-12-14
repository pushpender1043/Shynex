import React, { useState, useEffect, useContext } from 'react';
import Title from '../Component/Title';
import { ShopDataContext } from '../Context/ShopContext';
import { AuthDataContext } from '../Context/AuthContext';
import axios from 'axios';
import { FaBoxOpen, FaCircle } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';

function Order() {
    let [orderData, setOrderData] = useState([]);
    let { currency } = useContext(ShopDataContext);
    let { serverUrl } = useContext(AuthDataContext);

    const loadOrderData = async () => {
        try {
            const result = await axios.post(serverUrl + '/api/order/userOrder', {}, { withCredentials: true });
            if (result.data) {
                let allOrdersItem = [];
                result.data.map((order) => {
                    order.items.map((item) => {
                        item['status'] = order.status;
                        item['payment'] = order.payment;
                        item['paymentMethod'] = order.paymentMethod;
                        item['date'] = order.date;
                        allOrdersItem.push(item);
                    });
                });
                setOrderData(allOrdersItem.reverse());
            }
        } catch (error) { console.log(error); }
    };

    useEffect(() => { loadOrderData(); }, []);

    // --- ANIMATION VARIANTS ---
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    return (
        <div className='w-full min-h-screen pt-[120px] pb-20 px-4 md:px-10 bg-[#050505] font-sans text-white'>
            
            <div className='max-w-7xl mx-auto'>
                
                {/* HEADER */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                    className='text-center mb-16'
                >
                    <Title text1={'ORDER '} text2={'HISTORY'} />
                    <p className='text-gray-500 mt-2 text-xs uppercase tracking-[0.2em]'>Track your exclusive purchases.</p>
                </motion.div>

                {/* ORDER LIST */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className='flex flex-col gap-6'
                >
                    {orderData.length === 0 ? (
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className='flex flex-col items-center justify-center py-24 bg-white/5 border border-white/10 rounded-sm'
                        >
                            <FaBoxOpen className='text-5xl text-[#d4af37] mb-6 opacity-50' />
                            <p className='text-xl text-gray-400 font-serif'>No Orders Yet</p>
                            <p className='text-gray-600 text-sm mt-2'>Your luxury collection awaits.</p>
                        </motion.div>
                    ) : (
                        orderData.map((item, index) => (
                            <motion.div 
                                key={index} 
                                variants={itemVariants}
                                className='bg-[#0a0a0a] border border-white/10 hover:border-[#d4af37]/50 p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 shadow-lg transition-all duration-300 group relative overflow-hidden'
                            >
                                {/* Gold Accent Line on Hover */}
                                <div className='absolute left-0 top-0 bottom-0 w-1 bg-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

                                {/* LEFT: Image */}
                                <div className='w-24 h-28 md:w-32 md:h-40 flex-shrink-0 overflow-hidden border border-gray-800'>
                                    <img src={item.image1} alt={item.name} className='w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity' />
                                </div>

                                {/* MIDDLE: Info */}
                                <div className='flex-1 w-full flex flex-col justify-between h-full gap-4 md:gap-0'>
                                    <div>
                                        <h3 className='text-lg md:text-xl font-serif font-bold text-white mb-2 line-clamp-1'>{item.name}</h3>
                                        <div className='flex flex-wrap gap-4 text-sm text-gray-400'>
                                            <p className='text-[#d4af37] font-bold'>{currency}{item.price}</p>
                                            <span className='w-[1px] h-4 bg-gray-700'></span>
                                            <p>Size: <span className='text-white'>{item.size}</span></p>
                                            <span className='w-[1px] h-4 bg-gray-700'></span>
                                            <p>Qty: <span className='text-white'>{item.quantity}</span></p>
                                        </div>
                                    </div>

                                    <div className='flex items-center gap-2 mt-4 md:mt-0'>
                                        <span className='text-[10px] text-gray-500 uppercase tracking-widest'>Ordered On:</span>
                                        <span className='text-xs text-gray-300 font-medium'>{new Date(item.date).toDateString()}</span>
                                    </div>
                                </div>

                                {/* RIGHT: Status & Actions */}
                                <div className='flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-6'>
                                    
                                    {/* Status Badge */}
                                    <div className='flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full'>
                                        <FaCircle className={`text-[8px] ${item.status === 'Delivered' ? 'text-green-500' : 'text-[#d4af37] animate-pulse'}`} />
                                        <p className='text-xs font-bold uppercase tracking-wider text-gray-300'>{item.status}</p>
                                    </div>

                                    {/* Track Button */}
                                    <button
                                        onClick={loadOrderData}
                                        className='px-6 py-3 border border-[#d4af37] text-[#d4af37] text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#d4af37] hover:text-black transition-all shadow-[0_0_15px_-5px_rgba(212,175,55,0.3)]'
                                    >
                                        Track Item
                                    </button>
                                </div>

                            </motion.div>
                        ))
                    )}
                </motion.div>
            </div>
        </div>
    );
}

export default Order;