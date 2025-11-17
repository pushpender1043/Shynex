import React from 'react'
import logo from "../assets/sv_logo.png";

function Footer() {
  return (
    <div className='w-full md:h-[36vh] h-auto mb-[77px] md:mb-0 bg-gradient-to-l from-[#0f1c2c] to-[#1f3a40] text-white'>
      
      <div className='w-full md:h-[28vh] h-auto flex flex-col md:flex-row items-center md:items-start justify-between md:px-[50px] px-[15px] py-[20px] md:py-0 gap-[20px]'>

        {/* Left Logo Section */}
        <div className='md:w-[30%] w-full flex flex-col items-center md:items-start text-center md:text-left gap-[10px] mt-[10px]'>
          <div className='flex items-center justify-center md:justify-start gap-[5px]'>
            <img src={logo} alt="logo" className='md:w-[40px] md:h-[40px] w-[30px] h-[30px]' />
            <p className='text-[19px] md:text-[20px] font-semibold text-[white]'>Shopverse</p>
          </div>
          <p className='text-[14px] hidden md:block text-[white ]'>
            Shopverse is your all-in-one online shopping destination, offering top-quality 
            products, unbeatable deals, and fast delivery — all backed by trusted service 
            designed to make your life easier every day.
          </p>
          <p className='text-[14px] flex md:hidden text-[white]'>
            Fast. Easy. Reliable. Shopverse Shopping
          </p>
        </div>

        {/* Company Links */}
        <div className='md:w-[25%] w-full flex flex-col items-center md:items-center text-center gap-[10px]'>
          <p className='text-[19px] md:text-[20px] font-semibold mt-[10px] text-[white]'>COMPANY</p>
          <ul className='flex flex-col gap-[5px]'>
            <li className='text-[15px] cursor-pointer hover:text-[#7ef5c0]'>Home</li>
            <li className='text-[15px] cursor-pointer hover:text-[#7ef5c0]'>About Us</li>
            <li className='text-[15px] cursor-pointer hover:text-[#7ef5c0]'>Delivery</li>
            <li className='text-[15px] cursor-pointer hover:text-[#7ef5c0]'>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className='md:w-[25%] w-full flex flex-col items-center md:items-center text-center gap-[10px]'>
          <p className='text-[19px] md:text-[20px] font-semibold mt-[10px] text-[#white]'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-[5px]'>
            <li className='text-[15px] cursor-pointer hover:text-[#7ef5c0]'>+91-9876545673</li>
            <li className='text-[15px] cursor-pointer hover:text-[#7ef5c0]'>contact@Shopverse.com</li>
            <li className='text-[15px] cursor-pointer hover:text-[#7ef5c0]'>+1-123-456-7890</li>
            <li className='text-[15px] cursor-pointer hover:text-[#7ef5c0]'>admin@Shopverse.com</li>
          </ul>
        </div>

      </div>

      <div className='w-full h-[1px] bg-[#3f5a61]'></div>

      <div className='w-full h-[10vh] flex items-center justify-center text-[white]'>
        © 2025 Shopverse.com — All Rights Reserved
      </div>
    </div>
  )
}

export default Footer
