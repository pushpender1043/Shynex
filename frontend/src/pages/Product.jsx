import React from 'react'
import LatestCollection from '../Component/LatestCollection'
import BestSeller from '../Component/BestSeller'
import CrazyDeals from '../Component/CrazyDeal'

function Product() {
  return (
    <div className='w-[100vw] min-h-[100vh] bg-[white] flex items-center justify-start flex-col py-[20px]'>

        <div className='w-[100%] min-h-[70px] flex items-center justify-center gap-[10px] flex-col bg-gradient-to-l from-[#F2E9E4] to-[#F7F4EA] '>
            <LatestCollection/>
        </div>
        <CrazyDeals/>

         <div className='w-[100%] min-h-[70px] flex items-center justify-center gap-[10px] flex-col'>
          
            <BestSeller/>

        </div>
        
  </div>
  )
}

export default Product
