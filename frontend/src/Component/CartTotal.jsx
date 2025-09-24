import React from 'react'
import { useContext } from 'react'
import { ShopDataContext } from '../Context/ShopContext'
import Title from './Title'

function CartTotal() {
    const{currency,delivery_fee,getCartAmount}=useContext(ShopDataContext)
  return (

    <div className='w-full lg:ml-[30px]'>
        <div className='text-xl py-[10px]'>
            <Title text1={'CART '} text2={'Totals'}/>

        </div>
        <div className='flex flex-col gap-2 mt-2 text-sm p-[30px] border-[2px] border-[#4d8890]'>
     <div className='flex justify-between text-black text-[18px] p-[10px]'>
        <p>Subtotal</p>
        <p>{currency}{getCartAmount()}.00</p>
        
         </div>
        <hr />
         <div className='flex flex-col gap-2  text-sm p-[30px] '>
            <p className='text-[black]'>Shipping Fee</p>
        <p className='text-[black]'>{currency}{delivery_fee}.00</p>


     </div>
      <hr />
         <div className='flex flex-col gap-2 mt-2 text-sm p-[30px] '>
            <b className='text-[black]' >Total</b>
        <b className='text-[black]'>{currency}{getCartAmount()===0?0:getCartAmount()+delivery_fee}.00</b>


     </div>
        </div>
      
    </div>
  )
}

export default CartTotal
