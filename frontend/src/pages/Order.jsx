import React, { useState, useEffect, useContext } from 'react';
import Title from '../Component/Title';
import { ShopDataContext } from '../Context/ShopContext';
import { AuthDataContext } from '../Context/AuthContext';
import axios from 'axios';

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
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadOrderData();
    }, []);

    return (
        <div className='w-[99vw] min-h-[100vh] p-[20px] pb-[150px] overflow-hidden bg-gradient-to-l from-[#f9f9f9] to-[#eaeaea]'>
            <div className='h-[8%] w-[100%] text-center mt-[80px]'>
                <Title text1={'MY '} text2={'ORDER'} />
            </div>

            <div className='w-[100%] h-[92%] flex flex-wrap gap-[20px]'>
                {orderData.map((item, index) => (
                    <div key={index} className='w-[100%] h-[10%] border-t border-b border-gray-300'>
                        <div className='w-[100%] h-[80%] flex items-start gap-6 bg-white py-[10px] px-[20px] rounded-2xl relative shadow-md'>
                            <img src={item.image1} alt="" className='w-[130px] h-[130px] rounded-md' />
                            <div className='flex items-start justify-center flex-col gap-[5px]'>
                                <p className='md:text-[25px] text-[20px] text-gray-800'>
                                    {item.name}
                                </p>
                                <div className='flex items-center gap-[8px] md:gap-[20px] text-gray-600'>
                                    <p className='md:text-[18px] text-[12px]'>
                                        {currency}{item.price}
                                    </p>
                                    <p className='md:text-[18px] text-[12px]'>
                                        Quantity: {item.quantity}
                                    </p>
                                    <p className='md:text-[18px] text-[12px]'>
                                        Size: {item.size}
                                    </p>
                                </div>

                                <div className='flex items-center text-gray-600'>
                                    <p className='md:text-[18px] text-[12px]'>
                                        Date: <span className='text-gray-800 pl-[10px] md:text-[16px] text-[11px]'>{new Date(item.date).toDateString()}</span>
                                    </p>
                                </div>

                                <div className='flex items-center text-gray-600'>
                                    <p className='md:text-[16px] text-[12px]'>
                                        Payment Method: {item.paymentMethod}
                                    </p>
                                </div>

                                <div className='absolute md:left-[55%] md:top-[40%] right-[2%] top-[2%]'>
                                    <div className='flex items-center gap-[5px]'>
                                        <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                                        <p className='md:text-[17px] text-[10px] text-gray-800'>{item.status}</p>
                                    </div>
                                </div>

                                <div className='absolute md:right-[5%] right-[1%] md:top-[40%] top-[70%]'>
                                    <button
                                        className='md:px-[15px] px-[5px] py-[3px] rounded-md bg-gray-200 text-gray-800 text-[12px] md:text-[16px] cursor-pointer hover:bg-gray-300'
                                        onClick={loadOrderData}
                                    >
                                        Track Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Order;
