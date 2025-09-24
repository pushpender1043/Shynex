// import React from 'react'
// import Title from './Title'
// import { RiExchangeFundsFill } from "react-icons/ri";
// import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
// import { BiSupport } from "react-icons/bi";


// function OurPolicy() {
//   return (
//     <div className='w-[100vw] h-[100vh] md:h-[70vh] flex items-center justify-start flex-col bg-gradient-to-l from-[#141414] to-[#0c2025] gap-[50px] '>
//         <div className='h-[8%] w-[100%] text-center mt-[70px] '>
//             <Title text1={"OUR "} text2={"POLICY"}/>
//              <p className='w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100 '>Customer-Friendly Policies Commited to Your Satisfaction and Safety.
//                 </p>

//         </div>
//         <div className='w-[100%] md:min-h-[50%] h-[20%] flex items-center justify-center flex-wrap lg:gap-[50px] gap-[10px] '>
//             <div className='w-[300px] max-w-[90%] h-[60%] flex items-center justify-center flex-col gap-[10px]'>
//                 <RiExchangeFundsFill  className='md:w-[60px] w-[30px] h-[30px] md:h-[60px] text-[#90b9ff]'/>
//                 <p className='font-semibold  md:text-[25px] text-[19px] text-[#a5e8f7]'>Easy Exchange Policy</p>
//                 <p className='font-semibold  md:text-[18px] text-[12px] text-[aliceblue] text-center'>Exchange Made Easy Quick,Simple, and Customer-Friendly Process.</p>
//             </div>


//               <div className='w-[300px] max-w-[90%] h-[60%] flex items-center justify-center flex-col gap-[10px]'>
//                 <TbRosetteDiscountCheckFilled  className='md:w-[60px] w-[30px] h-[30px] md:h-[60px] text-[#90b9ff]'/>
//                 <p className='font-semibold  md:text-[25px] text-[19px] text-[#a5e8f7]'>7 Days Return Policy</p>
//                 <p className='font-semibold  md:text-[18px] text-[12px] text-[aliceblue] text-center'>Shop With Confidene 7 days Easy Return  Guarantee.</p>



//             </div>


//               <div className='w-[300px] max-w-[90%] h-[60%] flex items-center justify-center flex-col gap-[10px]'>
//                 <BiSupport  className='md:w-[60px] w-[30px] h-[30px] md:h-[60px] text-[#90b9ff]    '/>
//                 <p className='font-semibold  md:text-[25px] text-[19px] text-[#a5e8f7]'>Best Customer Support</p>
//                 <p className='font-semibold  md:text-[18px] text-[12px] text-[aliceblue] text-center'>Trusted Customer Support Your Satisfaction Is Our Priority.</p>



//             </div>

//         </div>

      
//     </div>
//   )
// }

// export default OurPolicy
import React from 'react'
import Title from './Title'
import { RiExchangeFundsFill } from "react-icons/ri";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";

function OurPolicy() {
  return (
    <div className='w-full min-h-screen md:min-h-[70vh] flex flex-col items-center justify-start bg-gradient-to-l from-[#F2E9E4] to-[#F7F4EA] py-[50px] px-[10px]'>
      
      {/* Section Title */}
      <div className='w-full text-center mb-[30px]'>
        <Title text1={"OUR "} text2={"POLICY"} />
        <p className='w-full md:w-[70%] m-auto text-[13px] md:text-[20px] px-[10px] text-black'>
          Customer-Friendly Policies Committed to Your Satisfaction and Safety.
        </p>
      </div>

      {/* Policy Cards */}
      <div className='w-full flex flex-wrap items-center justify-center gap-[20px] md:gap-[40px]'>
        
        {/* Card 1 */}
        <div className='w-[280px] md:w-[300px] h-auto flex flex-col items-center justify-center text-center gap-[10px] p-[15px]'>
          <RiExchangeFundsFill className='md:w-[60px] md:h-[60px] w-[40px] h-[40px] text-[#90b9ff]' />
          <p className='font-semibold md:text-[22px] text-[18px] text-[black]'>Easy Exchange Policy</p>
          <p className='font-medium md:text-[16px] text-[13px] text-[black]'>
            Exchange Made Easy — Quick, Simple, and Customer-Friendly Process.
          </p>
        </div>

        {/* Card 2 */}
        <div className='w-[280px] md:w-[300px] h-auto flex flex-col items-center justify-center text-center gap-[10px] p-[15px]'>
          <TbRosetteDiscountCheckFilled className='md:w-[60px] md:h-[60px] w-[40px] h-[40px] text-[#90b9ff]' />
          <p className='font-semibold md:text-[22px] text-[18px] text-[black]'>7 Days Return Policy</p>
          <p className='font-medium md:text-[16px] text-[13px] text-[black]'>
            Shop With Confidence — 7 Days Easy Return Guarantee.
          </p>
        </div>

        {/* Card 3 */}
        <div className='w-[280px] md:w-[300px] h-auto flex flex-col items-center justify-center text-center gap-[10px] p-[15px]'>
          <BiSupport className='md:w-[60px] md:h-[60px] w-[40px] h-[40px] text-[#90b9ff]' />
          <p className='font-semibold md:text-[22px] text-[18px] text-[black]'>Best Customer Support</p>
          <p className='font-medium md:text-[16px] text-[13px] text-[black]'>
            Trusted Customer Support — Your Satisfaction Is Our Priority.
          </p>
        </div>

      </div>
    </div>
  )
}

export default OurPolicy

