import React, { useContext } from 'react';
import { ShopDataContext } from '../Context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopDataContext);

  return (
    <div className='w-full'>
      
      <div className='text-xl mb-4'>
        <Title text1={'CART '} text2={'TOTALS'} />
      </div>

      <div className='flex flex-col gap-3 mt-2 text-sm bg-[#0a0a0a] p-6 border border-gray-800 shadow-lg relative overflow-hidden'>
        
        {/* Decorative Gold Line */}
        <div className='absolute top-0 left-0 w-1 h-full bg-[#d4af37]'></div>

        {/* Subtotal */}
        <div className='flex justify-between items-center py-2'>
          <p className='text-gray-400 font-light uppercase tracking-widest text-xs'>Subtotal</p>
          <p className='text-white font-medium font-serif text-base'>{currency} {getCartAmount()}.00</p>
        </div>
        
        <hr className='border-gray-800' />

        {/* Shipping Fee */}
        <div className='flex justify-between items-center py-2'>
          <p className='text-gray-400 font-light uppercase tracking-widest text-xs'>Shipping Fee</p>
          <p className='text-white font-medium font-serif text-base'>
             {delivery_fee === 0 ? <span className='text-[#d4af37]'>Free</span> : `+ ${currency} ${delivery_fee}.00`}
          </p>
        </div>

        <hr className='border-gray-800' />

        {/* Grand Total */}
        <div className='flex justify-between items-center pt-4 pb-2'>
          <b className='text-sm text-white font-bold uppercase tracking-widest'>Total Amount</b>
          <b className='text-xl text-[#d4af37] font-serif'>
            {currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00
          </b>
        </div>
        
        <p className='text-[9px] text-gray-600 mt-2 text-right'>*Inclusive of all taxes</p>

      </div>
    </div>
  );
};

export default CartTotal;