import React, { useState, useContext } from 'react';
import Title from '../Component/Title';
import CartTotal from '../Component/cartTotal';
import razorpay from "../assets/razorpay.png"; 
import { ShopDataContext } from '../Context/ShopContext';
import { AuthDataContext } from '../Context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PlaceOrder() {
  let [method, setMethod] = useState('cod');
  let navigate = useNavigate();
  let { serverUrl } = useContext(AuthDataContext);
  const { cartItem, setCartItem, getCartAmount, delivery_fee, products } = useContext(ShopDataContext);
  let [formData, setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    pinCode:'',
    country:'',
    phone:'',
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        const { data } = await axios.post(serverUrl + '/api/order/verifyrazorpay', response, { withCredentials: true });
        if (data) {
          navigate('/order');
          setCartItem({});
        }
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
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
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      };

      switch(method){
        case 'cod':
          const result = await axios.post(serverUrl + '/api/order/placeOrder', orderData, { withCredentials:true });
          if(result.data){
            setCartItem({});
            navigate('/order');
          }
          break;

        case 'razorpay':
          const resultRazorpay = await axios.post(serverUrl + '/api/order/razorpay', orderData, { withCredentials:true });
          if(resultRazorpay.data){
            initPay(resultRazorpay.data);
          }
          break;

        default:
          break;
      }
    } catch(error){
      console.log(error);
    }
  };

  return (
    <div className='w-full min-h-[100vh] bg-gradient-to-l from-[#f9f9f9] to-[#eeeeee] flex items-center justify-center flex-col md:flex-row gap-[50px] relative overflow-x-hidden'>
      
      {/* Left: Form */}
      <div className='lg:w-[50%] w-full h-full flex items-center justify-center lg:mt-0 mt-[90px]'>
        <form onSubmit={onSubmitHandler} className='lg:w-[70%] w-[95%] lg:h-[70%] h-full'>

          <div className='py-[10px] pt-[50px]'>
            <Title text1={"Delivery "} text2={"Information"} />
          </div>

          {/* First & Last Name */}
          <div className="w-full h-[70px] flex items-center justify-between px-[10px]">
            <input type="text" placeholder="First name" className="w-[48%] h-[50px] px-3 rounded-lg bg-white text-gray-800 outline-none border border-gray-300" onChange={onChangeHandler} name='firstName' value={formData.firstName} required/>
            <input type="text" placeholder="Last name" className="w-[48%] h-[50px] px-3 rounded-lg bg-white text-gray-800 outline-none border border-gray-300" onChange={onChangeHandler} name='lastName' value={formData.lastName}/>
          </div>

          {/* Email */}
          <div className="w-full h-[70px] flex items-center px-[10px]">
            <input type="email" placeholder="Email address" className="w-full h-[50px] px-3 rounded-lg bg-white text-gray-800 outline-none border border-gray-300" onChange={onChangeHandler} name='email' value={formData.email} required/>
          </div>

          {/* Street */}
          <div className="w-full h-[70px] flex items-center px-[10px]">
            <input type="text" placeholder="Street" className="w-full h-[50px] px-3 rounded-lg bg-white text-gray-800 outline-none border border-gray-300" onChange={onChangeHandler} name='street' value={formData.street} required/>
          </div>

          {/* City & State */}
          <div className="w-full h-[70px] flex items-center justify-between px-[10px]">
            <input type="text" placeholder="City" className="w-[48%] h-[50px] px-3 rounded-lg bg-white text-gray-800 outline-none border border-gray-300" onChange={onChangeHandler} name='city' value={formData.city} required/>
            <input type="text" placeholder="State" className="w-[48%] h-[50px] px-3 rounded-lg bg-white text-gray-800 outline-none border border-gray-300" onChange={onChangeHandler} name='state' value={formData.state} required/>
          </div>

          {/* Pincode & Country */}
          <div className="w-full h-[70px] flex items-center justify-between px-[10px]">
            <input type="text" placeholder="Pincode" className="w-[48%] h-[50px] px-3 rounded-lg bg-white text-gray-800 outline-none border border-gray-300" onChange={onChangeHandler} name='pinCode' value={formData.pinCode} required/>
            <input type="text" placeholder="Country" className="w-[48%] h-[50px] px-3 rounded-lg bg-white text-gray-800 outline-none border border-gray-300" onChange={onChangeHandler} name='country' value={formData.country} required/>
          </div>

          {/* Phone */}
          <div className="w-full h-[70px] flex items-center px-[10px]">
            <input type="text" placeholder="Phone" className="w-full h-[50px] px-3 rounded-lg bg-white text-gray-800 outline-none border border-gray-300" onChange={onChangeHandler} name='phone' value={formData.phone} required/>
          </div>

          {/* Place Order Button */}
          <div>
            <button 
              type="submit" 
              className="w-[90%] sm:w-auto text-sm sm:text-[18px] cursor-pointer bg-gray-800 hover:bg-gray-700 py-2 sm:py-[10px] px-4 sm:px-[20px] rounded-2xl text-white flex items-center justify-center gap-2 sm:gap-[20px] border border-gray-400 mt-5 mx-auto block"
            >
              PLACE ORDER
            </button>
          </div>
        </form>
      </div>

      {/* Right: Cart Totals */}
      <div className='lg:w-[50%] w-full min-h-full flex items-center justify-center gap-[30px]'>
        <div className='lg:w-[70%] w-[90%] lg:h-[70%] h-full flex items-center justify-center gap-[10px] flex-col'>
          <CartTotal/>
          <div className='py-[10px] pt-[50px]'>
            <Title text1={"Payment "} text2={"Method"} />
          </div>
          <div className='w-[100%] h-[30vh] lg:h-[100px] flex items-start mt-[20px] lg:mt-[0px] justify-center gap-[50px]'>

            <button
              onClick={() => setMethod('razorpay')}
              className={`w-[150px] h-[50px] rounded-sm ${method === 'razorpay' ? 'border-[5px] border-gray-600 rounded-sm' : ''}`}>
              <img src={razorpay} className="w-[100%] h-[100%] object-fill rounded-sm" alt="Razorpay" />
            </button>

            <button
              onClick={() => setMethod('cod')}
              className={`w-[200px] h-[50px] bg-white text-gray-800 px-[20px] rounded-sm font-bold ${method === 'cod' ? 'border-[5px] border-gray-600 rounded-sm' : ''}`}>
              CASH ON DELIVERY
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder;
