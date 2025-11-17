import React from 'react'
import Title from './Title'
import { RiExchangeFundsFill } from "react-icons/ri";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";

function OurPolicy() {
  return (
    <div className='w-full min-h-screen md:min-h-[70vh] flex flex-col items-center justify-start bg-white py-[50px] px-[10px]'>

      {/* Section Title */}
      <div className='w-full text-center mb-[30px]'>
        <Title text1={"OUR "} text2={"POLICY"} />
        <p className='w-full md:w-[70%] m-auto text-[13px] md:text-[20px] px-[10px] text-gray-700'>
          Customer-Friendly Policies Committed to Your Satisfaction and Safety.
        </p>
      </div>

      {/* Policy Cards */}
      <div className='w-full flex flex-wrap items-center justify-center gap-[20px] md:gap-[40px]'>

        {/* Card 1 */}
        <div className='w-[280px] md:w-[300px] h-auto flex flex-col items-center justify-center text-center gap-[10px] p-[20px] bg-gray-100 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-transform duration-300'>
          <RiExchangeFundsFill className='md:w-[60px] md:h-[60px] w-[40px] h-[40px] text-[#7f6269]' />
          <p className='font-semibold md:text-[22px] text-[18px] text-black'>Easy Exchange Policy</p>
          <p className='font-medium md:text-[16px] text-[13px] text-gray-700'>
            Exchange Made Easy — Quick, Simple, and Customer-Friendly Process.
          </p>
        </div>

        {/* Card 2 */}
        <div className='w-[280px] md:w-[300px] h-auto flex flex-col items-center justify-center text-center gap-[10px] p-[20px] bg-gray-100 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-transform duration-300'>
          <TbRosetteDiscountCheckFilled className='md:w-[60px] md:h-[60px] w-[40px] h-[40px] text-[#7f6269]' />
          <p className='font-semibold md:text-[22px] text-[18px] text-black'>7 Days Return Policy</p>
          <p className='font-medium md:text-[16px] text-[13px] text-gray-700'>
            Shop With Confidence — 7 Days Easy Return Guarantee.
          </p>
        </div>

        {/* Card 3 */}
        <div className='w-[280px] md:w-[300px] h-auto flex flex-col items-center justify-center text-center gap-[10px] p-[20px] bg-gray-100 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-transform duration-300'>
          <BiSupport className='md:w-[60px] md:h-[60px] w-[40px] h-[40px] text-[#7f6269]' />
          <p className='font-semibold md:text-[22px] text-[18px] text-black'>Best Customer Support</p>
          <p className='font-medium md:text-[16px] text-[13px] text-gray-700'>
            Trusted Customer Support — Your Satisfaction Is Our Priority.
          </p>
        </div>

      </div>
    </div>
  )
}

export default OurPolicy
