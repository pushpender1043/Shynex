import React, { useContext } from 'react';
import { ShopDataContext } from '../Context/ShopContext';
import Title from './Title';

function CartTotal() {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopDataContext);

  return (
    <div className='w-full lg:ml-[30px]'>
      <div className='text-xl py-[10px]'>
        <Title text1={'CART '} text2={'Totals'} />
      </div>

      <div className='flex flex-col gap-2 mt-2 text-sm p-[30px] border-[2px] border-gray-300 bg-white rounded-2xl shadow-md'>
        {/* Subtotal */}
        <div className='flex justify-between text-gray-800 text-[18px] p-[10px] bg-gray-100 rounded-lg'>
          <p>Subtotal</p>
          <p>{currency}{getCartAmount()}.00</p>
        </div>

        <hr className='border-gray-300' />

        {/* Shipping */}
        <div className='flex justify-between text-gray-800 text-[18px] p-[10px] bg-gray-100 rounded-lg'>
          <p>Shipping Fee</p>
          <p>{currency}{delivery_fee}.00</p>
        </div>

        <hr className='border-gray-300' />

        {/* Total */}
        <div className='flex justify-between text-gray-900 font-semibold text-[20px] p-[10px] bg-gray-200 rounded-lg'>
          <b>Total</b>
          <b>
            {currency}
            {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00
          </b>
        </div>
      </div>
    </div>
  );
}

export default CartTotal;
