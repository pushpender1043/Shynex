// import React from 'react'
// import logo from "../assets/vcart_logo.png"

// function Footer() {
//   return (
//     <div className='w-[100%] md:h-[36vh] h-[21vh] mb-[77px] md:mb-[0px]'>
//         <div className='w-[100%] md:h-[30vh] h-[15vh] md:mb-[0px] bg-[#dbfcfcec] flex items-center justify-center md:px-[50px] px-[5px]'>
//             <div className='md:w-[30%] w-[35%] h-[100%]   flex items-start justify-center flex-col gap-[5px] '>
//                 <div className='flex items-start justify-start gap-[5px] mt-[10px] md:mt-[40px] '>
//                     <img src={logo} alt="" className='md:w-[40px] md:h-[40px] w-[30px] h-[30px]'/>
//                     <p className='text-[19px] md:text-[20px] text-[black]'>OneCart</p>
                  
//                 </div>
//                    <p className='text-[15px] text-[#1e2223] hidden md:block'>OneCart is your all-in-one online shopping destination,offering top-quality products,unbeatable deals,and fast-delivery-all backed by trusted service designed to make your life easier every day.</p>
//                     <p className='text-[15px] text-[#1e2223] flex md:hidden'>Fast.Easy.Reliable.OneCart Shopping</p>

         


//             </div>
//        <div className='md:w-[25%] w-[30%] h-[100%] flex items-center justify-center flex-col text-center'>
//                     <div className='flex items-center justify-center gap-[5px] mt-[10px] md:mt-[40px] '>
//                         <p className='text-[19px] md:text-[20px] text-[#1e2223] font-sans'>COMPANY</p>

//                     </div>
//                     <ul>
//                         <li className='text-[15px]  text-[#1e2223] hidden md:block  cursor-pointer'>Home</li>
//                         <li className='text-[15px]  text-[#1e2223] hidden md:block  cursor-pointer'>About Us</li>
//                         <li className='text-[15px]  text-[#1e2223] hidden md:block  cursor-pointer'>Delivery</li>
//                         <li className='text-[15px]  text-[#1e2223] hidden md:block  cursor-pointer'>Privacy Policy</li>


//                     </ul>

//                 </div>

//                 <div className='md:w-[25%] w-[40%] h-[100%] flex items-center justify-center flex-col text-center' >
//                      <div className='flex items-center justify-center gap-[5px] mt-[10px] 
//                      md:mt-[40px] '>
//                         <p className='text-[19px] md:text-[20px] text-[#1e2223] font-sans'>GET IN TOUCH</p>

//                     </div>
//                               <ul>
//                         <li className='text-[15px]  text-[#1e2223] hidden md:block  cursor-pointer'>+91-9876545673</li>
//                         <li className='text-[15px]  text-[#1e2223] hidden md:block  cursor-pointer'>contact@onecart.com</li>
//                         <li className='text-[15px]  text-[#1e2223] hidden md:block  cursor-pointer'>+1-123-456-7890</li>
//                         <li className='text-[15px]  text-[#1e2223] hidden md:block  cursor-pointer'>admin@onecart.com</li>


//                     </ul>

//                 </div>
//         </div>

      
//     </div>
//   )
// }

// export default Footer

import React from 'react'
import logo from "../assets/vcart_logo.png"

function Footer() {
  return (
    <div className='w-full md:h-[36vh] h-auto mb-[77px] md:mb-0  '>
      <div className='w-full md:h-[30vh] h-auto bg-[#dbfcfcec] flex flex-col md:flex-row items-center md:items-start justify-between md:px-[50px] px-[15px] py-[20px] md:py-0 gap-[20px] bg-gradient-to-l from-[#F2E9E4] to-[#F7F4EA] '>
        
        {/* Left Logo Section */}
        <div className='md:w-[30%] w-full flex flex-col items-center md:items-start text-center md:text-left gap-[10px] mt-[10px] '>
          <div className='flex items-center justify-center md:justify-start gap-[5px]'>
            <img src={logo} alt="logo" className='md:w-[40px] md:h-[40px] w-[30px] h-[30px]' />
            <p className='text-[19px] md:text-[20px] font-semibold text-black'>OneCart</p>
          </div>
          <p className='text-[14px] text-[#1e2223] hidden md:block'>
            OneCart is your all-in-one online shopping destination, offering top-quality 
            products, unbeatable deals, and fast delivery — all backed by trusted service 
            designed to make your life easier every day.
          </p>
          <p className='text-[14px] text-[#1e2223] flex md:hidden'>
            Fast. Easy. Reliable. OneCart Shopping
          </p>
        </div>

        {/* Company Links */}
        <div className='md:w-[25%] w-full flex flex-col items-center md:items-center text-center gap-[10px]'>
          <p className='text-[19px] md:text-[20px] text-[#1e2223] font-semibold mt-[10px]'>COMPANY</p>
          <ul className='flex flex-col gap-[5px]'>
            <li className='text-[15px] text-[#1e2223] cursor-pointer'>Home</li>
            <li className='text-[15px] text-[#1e2223] cursor-pointer'>About Us</li>
            <li className='text-[15px] text-[#1e2223] cursor-pointer'>Delivery</li>
            <li className='text-[15px] text-[#1e2223] cursor-pointer'>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className='md:w-[25%] w-full flex flex-col items-center md:items-center text-center gap-[10px]'>
          <p className='text-[19px] md:text-[20px] text-[#1e2223] font-semibold mt-[10px]'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-[5px]'>
            <li className='text-[15px] text-[#1e2223] cursor-pointer'>+91-9876545673</li>
            <li className='text-[15px] text-[#1e2223] cursor-pointer'>contact@onecart.com</li>
            <li className='text-[15px] text-[#1e2223] cursor-pointer'>+1-123-456-7890</li>
            <li className='text-[15px] text-[#1e2223] cursor-pointer'>admin@onecart.com</li>
          </ul>
        </div>

      </div>
      <div className='w-[100%] h-[1px] bg-slate-400'> </div>
      <div className='w-[100%] h-[10vh]  bg-[#dbfcfcec] flex items-center justify-center bg-gradient-to-l from-[#F2E9E4] to-[#F7F4EA]'>
        Copyright 2025@onecart.com-All Rights Reserved
      </div>
     
    </div>
  )
}

export default Footer
