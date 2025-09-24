import React from 'react'
import Title from '../Component/Title';
import { ShopDataContext } from '../Context/ShopContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useEffect } from 'react';
import { ImBin } from "react-icons/im";
import CartTotal from '../Component/cartTotal';



function Cart() {

    const {products,currency,cartItem,updateQuantity}=useContext(ShopDataContext)
    const [cartData,setCartData]=useState([])
    const navigate=useNavigate()

    useEffect(() => {
    const tempData = [];
    for (const items in cartItem) {
        for (const item in cartItem[items]) {
            if (cartItem[items][item] > 0) {
                tempData.push({
                    _id: items,
                    size: item,
                    quantity: cartItem[items][item],
                });
            }
        }
    }
    setCartData(tempData);
}, [cartItem]);


return (
  <div className='w-[99vw] min-h-[100vh] p-[20px] overflow-hidden bg-gradient-to-l from-[#F2E9E4] to-[#F7F4EA]'>
    
    <div className='h-[8%] w-[100%] text-center mt-[80px] '>
      <Title text1={'YOUR '} text2={'CART'} />
    </div>

    <div className='w-[100%] h-[92%] flex flex-wrap gap-[20px] text-black bg-[#F7F4EA]'>
        {
            cartData.map((item,index)=>{
                const productData=products.find((product)=>product._id==item._id);
                return(
                    <div key={index} className='w-[100%] h-[10%] border-t border-b text-black'>
                        <div className='w-[100%] h-[80%] flex items-start gap-6 bg-[#F7F4EA] py-[10px] px-[20px] rounded-2xl relative'>
                            <img className='w-[100px] h-[100px] rounded-md'src={productData.image1} alt="" />
                            <div className='flex item-start justify-center flex-col gap-[10px]'>
                            <p className="md:text-[25px] text-[20px] text-[black]">
                               {productData.name}</p>
 
    <div className="flex items-center gap-[20px] text-[black]">
     <p className=" text-[black] text-[20px] ">
    {currency}{productData.price}  </p>

   <p className="w-[40px] h-[40px] text-[16px] text-black 
     bg-[#F7F4EA] rounded-md mt-[5px] flex items-center 
     justify-center border-[1px] border-[#9f9f9f]">
    {item.size}
  </p>
</div>
                        </div>

                         <input type="number"min={1} defaultValue={item.quantity}
    className=" md:max-w-20 max-w-10 md:px-2 md:py-2 py-[5px] px-[10px] text-black text-[18px]font-semibold  bg-[#F7F4EA] absolute md:top-[40%] top-[46%] left-[75%] md:left-[50%] border-[1px] border-black rounded-md" onChange={(e) => 
    e.target.value === "" || e.target.value === "0"?null:
     
    updateQuantity(item._id, item.size, Number(e.target.value))
  }/>
  <ImBin className='text-black w-[25px] h-[25px] absolute top-[50%] md:top-[40%] md:right-[5%] right-1' onClick={()=>updateQuantity(item._id, item.size, 0)}/>

                        </div>


                        </div>
                )
            })
        }
      
    </div>
    <div className='flex justify-start items-end my-20 '>
        <div className='w-full sm:w-[450px]'>
         <CartTotal/>
         <button className='text-[18px] hover:bg-slate-500 cursor-pointer bg-[#c9ada7] py-[10px] px-[50px] rounded-2xl text-white flex items-center justify-center gap-[20px] border-[1px] border-[#80808049] ml-[30px] mt-[20px]'   onClick={()=>{
            if(cartData.length>0){
                navigate("/placeOrder");
            }
            else{
                console.log("Your Cart is Empty");
            }
         }}>
  PROCEED TO CHECKOUT
</button>


        </div>

    </div>

  </div>
);

}

export default Cart
