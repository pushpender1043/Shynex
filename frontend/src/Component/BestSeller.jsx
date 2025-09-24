import React from 'react'
import Title from './Title'
import { useContext } from 'react'
import { ShopDataContext } from '../Context/ShopContext'
import { useState } from 'react'
import { useEffect } from 'react'
import Card from './Card'

function BestSeller() {
    let {products}=useContext(ShopDataContext)
    let [BestSeller,setBestSeller]=useState([])
    useEffect(()=>{
        let filterProduct=products.filter((item)=>item.bestSeller)
        setBestSeller(filterProduct.slice(0,4))

    },[products])
  return (
    <div className='bg-gradient-to-l from-[#F2E9E4] to-[#F7F4EA]'>
        <div className='h-[8%] w-[100%] text-center mt-[50px] bg-gradient-to-l from-[#F2E9E4] to-[#F7F4EA]'>
            <Title text1={"BEST "} text2={"SELLER"}/>
        <p className='w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-black'>
            Tried ,Tested ,Loved Discover Our All-Time Best Sellers.
        </p>

        </div>
        <div className='w-[100%] h-[50%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px]'>
            {
                BestSeller.length > 0 ? (
                BestSeller.map((item,index)=>(
                    <Card key={index} name={item.name} id={item._id} price={item.price} image={item.image1}/>
                ))
            ): (
          <p className="text-blue-200">No best sellers available</p>
        )   

            }
        </div>
      
    </div>
  )
}

export default BestSeller
