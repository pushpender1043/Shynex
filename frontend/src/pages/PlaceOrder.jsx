import React, { useState, useContext } from 'react';
import Title from '../Component/Title';
import CartTotal from '../Component/cartTotal';
import razorpay from "../assets/razorpay.png"; 
import { ShopDataContext } from '../Context/ShopContext';
import { AuthDataContext } from '../Context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaMoneyBillWave, FaLock, FaShieldAlt, FaMapMarkerAlt, FaGlobe } from "react-icons/fa"; 
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

function PlaceOrder() {
  const [method, setMethod] = useState('cod');
  const navigate = useNavigate();
  const { serverUrl } = useContext(AuthDataContext);
  const { cartItem, setCartItem, getCartAmount, delivery_fee, products } = useContext(ShopDataContext);
  
  // States
  const [loadingZip, setLoadingZip] = useState(false);
  const [formData, setFormData] = useState({
    firstName:'', lastName:'', email:'', 
    pinCode:'', city:'', state:'', country:'', // Auto-filled
    street:'', phone:'', // Manual
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(data => ({ ...data, [name]: value }));
  };

  // ✅ LOGIC: AUTO-FETCH ADDRESS FROM PINCODE
  const handlePinCodeChange = async (e) => {
    const code = e.target.value;
    setFormData(prev => ({ ...prev, pinCode: code }));

    // India Pincode is 6 digits
    if (code.length === 6) {
        setLoadingZip(true);
        try {
            // Using Free Public API for India
            const response = await axios.get(`https://api.postalpincode.in/pincode/${code}`);
            
            if (response.data && response.data[0].Status === "Success") {
                const details = response.data[0].PostOffice[0];
                setFormData(prev => ({
                    ...prev,
                    city: details.District,
                    state: details.State,
                    country: "India" // Auto-set
                }));
                toast.success("Location Fetched: " + details.District);
            } else {
                toast.error("Invalid Pincode");
            }
        } catch (error) {
            console.error("Failed to fetch location", error);
        } finally {
            setLoadingZip(false);
        }
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = { address: formData, items: orderItems, amount: getCartAmount() + delivery_fee };

      switch(method){
        case 'cod':
          const result = await axios.post(serverUrl + '/api/order/placeOrder', orderData, { withCredentials:true });
          if(result.data){ setCartItem({}); navigate('/order'); }
          break;
        case 'razorpay':
          const resultRazorpay = await axios.post(serverUrl + '/api/order/razorpay', orderData, { withCredentials:true });
          if(resultRazorpay.data){ 
              const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: resultRazorpay.data.amount,
                currency: resultRazorpay.data.currency,
                name: 'SHYNEX LUXURY',
                description: 'Order Payment',
                order_id: resultRazorpay.data.id,
                receipt: resultRazorpay.data.receipt,
                handler: async (response) => {
                    const { data } = await axios.post(serverUrl + '/api/order/verifyrazorpay', response, { withCredentials: true });
                    if (data) { navigate('/order'); setCartItem({}); }
                },
                theme: { color: "#d4af37" }
              };
              const rzp = new window.Razorpay(options);
              rzp.open();
          }
          break;
        default: break;
      }
    } catch(error){ console.log(error); }
  };

  // --- STYLES ---
  const inputGroupClass = "flex flex-col gap-1";
  const labelClass = "text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1";
  const inputClass = "bg-[#0a0a0a] border-b border-gray-700 text-white px-4 py-3 focus:outline-none focus:border-[#d4af37] transition-all placeholder-gray-600 font-light text-sm hover:border-gray-500";
  const disabledInputClass = "bg-[#111] border-b border-gray-800 text-gray-400 px-4 py-3 cursor-not-allowed text-sm font-medium";

  return (
    <div className='w-full min-h-screen bg-[#050505] pt-[120px] pb-20 px-4 sm:px-10 text-white font-sans'>
      
      <form onSubmit={onSubmitHandler} className='max-w-7xl mx-auto flex flex-col lg:flex-row gap-16'>

        {/* --- LEFT SIDE: SHIPPING FORM --- */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
          className='w-full lg:w-[60%]'
        >
          <div className='mb-10 border-b border-white/10 pb-6'>
            <Title text1={"SHIPPING "} text2={"DETAILS"} />
            <p className='text-gray-500 text-xs mt-2 uppercase tracking-wide'>Enter Zip Code to auto-detect location.</p>
          </div>

          <div className='flex flex-col gap-6'>
            
            {/* 1. PERSONAL DETAILS */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              <div className={inputGroupClass}>
                 <label className={labelClass}>First Name</label>
                 <input required name='firstName' onChange={onChangeHandler} value={formData.firstName} className={inputClass} type="text" placeholder='John' />
              </div>
              <div className={inputGroupClass}>
                 <label className={labelClass}>Last Name</label>
                 <input required name='lastName' onChange={onChangeHandler} value={formData.lastName} className={inputClass} type="text" placeholder='Doe' />
              </div>
            </div>

            <div className={inputGroupClass}>
               <label className={labelClass}>Email Address</label>
               <input required name='email' onChange={onChangeHandler} value={formData.email} className={inputClass} type="email" placeholder='john@example.com' />
            </div>

            <div className="w-full h-[1px] bg-gray-800 my-2"></div>

            {/* 2. AUTO-LOCATION SECTION (Priority Zip) */}
            <div className={inputGroupClass}>
               <label className={labelClass}>Zip Code (Auto-Detect)</label>
               <div className='relative'>
                  <input 
                    required 
                    name='pinCode' 
                    onChange={handlePinCodeChange} 
                    value={formData.pinCode} 
                    className={`${inputClass} pr-10`} 
                    type="number" 
                    placeholder='Enter Pincode (Ex: 110001)' 
                  />
                  {/* Loading Spinner or Icon */}
                  <div className="absolute inset-y-0 right-0 flex items-center px-3">
                     {loadingZip ? (
                        <div className="w-4 h-4 border-2 border-gray-600 border-t-[#d4af37] rounded-full animate-spin"></div>
                     ) : (
                        <FaMapMarkerAlt className="text-[#d4af37] animate-pulse"/>
                     )}
                  </div>
               </div>
            </div>

            {/* Auto-Filled Fields (Read Only for Luxury Feel) */}
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
               <div className={inputGroupClass}>
                  <label className={labelClass}>City</label>
                  <input readOnly name='city' value={formData.city} className={disabledInputClass} type="text" placeholder='Auto-filled' />
               </div>
               <div className={inputGroupClass}>
                  <label className={labelClass}>State</label>
                  <input readOnly name='state' value={formData.state} className={disabledInputClass} type="text" placeholder='Auto-filled' />
               </div>
               <div className={inputGroupClass}>
                  <label className={labelClass}>Country</label>
                  <div className='relative'>
                    <input readOnly name='country' value={formData.country} className={disabledInputClass} type="text" placeholder='Auto-filled' />
                    <FaGlobe className='absolute right-3 top-3 text-gray-600 text-xs' />
                  </div>
               </div>
            </div>

            <div className="w-full h-[1px] bg-gray-800 my-2"></div>

            {/* 3. MANUAL ADDRESS SECTION */}
            <div className={inputGroupClass}>
               <label className={labelClass}>Street Address / House No.</label>
               <input required name='street' onChange={onChangeHandler} value={formData.street} className={inputClass} type="text" placeholder='Flat No, Building, Street Name' />
            </div>

            <div className={inputGroupClass}>
               <label className={labelClass}>Phone Number</label>
               <input required name='phone' onChange={onChangeHandler} value={formData.phone} className={inputClass} type="number" placeholder='+91 9876543210' />
            </div>

          </div>
        </motion.div>

        {/* --- RIGHT SIDE: PAYMENT & SUMMARY --- */}
        <motion.div 
           initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
           className='w-full lg:w-[40%]'
        >
          <div className='bg-[#0a0a0a] border border-white/10 p-8 shadow-2xl relative overflow-hidden sticky top-28'>
            <div className='absolute top-0 right-0 w-20 h-20 bg-[#d4af37]/5 rounded-bl-full'></div>

            <h2 className='text-lg font-serif text-white mb-6 border-b border-gray-800 pb-4'>ORDER SUMMARY</h2>
            
            <CartTotal />
            
            <div className='mt-8'>
              <h3 className='text-xs font-bold text-gray-500 uppercase tracking-widest mb-4'>Payment Method</h3>
              
              <div className='flex flex-col gap-3'>
                {/* Razorpay */}
                <div onClick={() => setMethod('razorpay')} className={`flex items-center justify-between p-4 border cursor-pointer transition-all duration-300 group ${method === 'razorpay' ? 'border-[#d4af37] bg-white/5' : 'border-gray-800 hover:border-gray-600'}`}>
                   <div className='flex items-center gap-3'>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${method === 'razorpay' ? 'border-[#d4af37]' : 'border-gray-600'}`}>
                         {method === 'razorpay' && <div className='w-2 h-2 bg-[#d4af37] rounded-full'></div>}
                      </div>
                      <span className='text-sm font-medium text-white group-hover:text-[#d4af37] transition-colors'>Secure Online Payment</span>
                   </div>
                   <img src={razorpay} className="h-5 object-contain grayscale group-hover:grayscale-0 transition-all opacity-80" alt="Razorpay" />
                </div>

                {/* COD */}
                <div onClick={() => setMethod('cod')} className={`flex items-center justify-between p-4 border cursor-pointer transition-all duration-300 group ${method === 'cod' ? 'border-[#d4af37] bg-white/5' : 'border-gray-800 hover:border-gray-600'}`}>
                   <div className='flex items-center gap-3'>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${method === 'cod' ? 'border-[#d4af37]' : 'border-gray-600'}`}>
                         {method === 'cod' && <div className='w-2 h-2 bg-[#d4af37] rounded-full'></div>}
                      </div>
                      <span className='text-sm font-medium text-white group-hover:text-[#d4af37] transition-colors'>Cash on Delivery</span>
                   </div>
                   <FaMoneyBillWave className="text-gray-500 group-hover:text-[#d4af37] text-lg transition-colors" />
                </div>
              </div>

              <button type='submit' className='w-full mt-8 bg-[#d4af37] text-black font-bold text-xs uppercase tracking-[0.2em] py-4 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:bg-white hover:shadow-none transition-all flex items-center justify-center gap-2 group'>
                 Place Order <FaLock className='text-xs group-hover:text-black transition-colors'/>
              </button>
              
              <div className='mt-4 flex items-center justify-center gap-2 text-[10px] text-gray-500 uppercase tracking-wide'>
                 <FaShieldAlt className='text-[#d4af37]'/> SSL Encrypted Transaction
              </div>

            </div>
          </div>
        </motion.div>

      </form>
    </div>
  )
}

export default PlaceOrder;