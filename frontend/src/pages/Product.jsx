import React from 'react'
import LatestCollection from '../Component/LatestCollection'
import BestSeller from '../Component/BestSeller'

function Product() {
  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[rgb(12,32,37)] flex items-center justify-start flex-col py-[20px]'>

        <div className='w-[100%] min-h-[70px] flex items-center justify-center gap-[10px] flex-col bg-gradient-to-l from-[#F2E9E4] to-[#F7F4EA] '>
            <LatestCollection/>
        </div>

         <div className='w-[100%] min-h-[70px] flex items-center justify-center gap-[10px] flex-col'>
          
            <BestSeller/>

        </div>
        
  </div>
  )
}

export default Product
