import React, { useContext, useState, useEffect } from 'react';
import Title from '../Component/Title';
import { ShopDataContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { ImBin } from "react-icons/im";
import CartTotal from '../Component/cartTotal';

function Cart() {
  const { products, currency, cartItem, updateQuantity } = useContext(ShopDataContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];

    Object.keys(cartItem).forEach((productId) => {
      Object.keys(cartItem[productId]).forEach((size) => {
        const quantity = cartItem[productId][size];

        // Skip invalid sizes & 0 quantity
        if (!size || quantity <= 0) return;

        const productData = products.find((p) => p._id === productId);

        // Skip if product not found (prevents extra cart item)
        if (!productData) return;

        tempData.push({
          _id: productId,
          size: size,
          quantity: quantity,
        });
      });
    });

    setCartData(tempData);
  }, [cartItem, products]);

  return (
    <div className='w-[99vw] min-h-[100vh] p-[20px] overflow-hidden bg-gradient-to-l from-[#f9f9f9] to-[#eeeeee]'>
      <div className='h-[8%] w-[100%] text-center mt-[80px]'>
        <Title text1={'YOUR '} text2={'CART'} />
      </div>

      <div className='w-[100%] h-[92%] flex flex-wrap gap-[20px] text-black bg-white rounded-2xl shadow-md'>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);

          return (
            <div key={index} className='w-[100%] h-[10%] border-t border-b border-gray-300 text-black'>
              <div className='w-[100%] h-[80%] flex items-start gap-6 bg-gray-50 py-[10px] px-[20px] rounded-2xl relative'>
                <img
                  className='w-[100px] h-[100px] rounded-md border border-gray-300 bg-white'
                  src={productData.image1}
                  alt=""
                />
                <div className='flex item-start justify-center flex-col gap-[10px]'>
                  <p className="md:text-[25px] text-[20px] text-gray-800 font-medium">
                    {productData.name}
                  </p>

                  <div className="flex items-center gap-[20px] text-gray-700">
                    <p className="text-[20px] font-semibold">
                      {currency}{productData.price}
                    </p>

                    <p className="w-[40px] h-[40px] text-[16px] text-gray-800 bg-white rounded-md mt-[5px] flex items-center justify-center border border-gray-400">
                      {item.size}
                    </p>
                  </div>
                </div>

                <input
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                  className="md:max-w-20 max-w-10 md:px-2 md:py-2 py-[5px] px-[10px] text-gray-800 text-[18px] font-semibold bg-white absolute md:top-[40%] top-[46%] left-[75%] md:left-[50%] border border-gray-400 rounded-md"
                  onChange={(e) =>
                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : updateQuantity(item._id, item.size, Number(e.target.value))
                  }
                />
                <ImBin
                  className='text-gray-700 w-[25px] h-[25px] absolute top-[50%] md:top-[40%] md:right-[5%] right-1 cursor-pointer hover:text-red-500 transition'
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className='flex justify-start items-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <button
            className='text-[18px] hover:bg-gray-700 cursor-pointer bg-gray-800 py-[10px] px-[50px] rounded-2xl text-white flex items-center justify-center gap-[20px] border border-gray-400 ml-[30px] mt-[20px] transition'
            onClick={() => {
              if (cartData.length > 0) {
                navigate("/placeOrder");
              } else {
                console.log("Your Cart is Empty");
              }
            }}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
