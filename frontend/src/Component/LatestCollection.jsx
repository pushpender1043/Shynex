import React from 'react'
import Title from './Title'
import { useContext } from 'react'
import { ShopDataContext } from '../Context/ShopContext'
import { useState } from 'react'
import { useEffect } from 'react'
import Card from './Card'


function LatestCollection() {

    let {products}=useContext(ShopDataContext)
    
    let [latestProducts,setLatestProducts]=useState([])


    useEffect(()=>{
        setLatestProducts(products.slice(0,8))

    },[products])



  return (
    <div className=' bg-[white]'>
      <div className='h-[8%] w-[100%] text-center md:mt-[50px] '>
      <Title text1={"LATEST "} text2={"COLLECTIONS"}/>
      <p className='w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text=[#7e8085]'>Step into Style -- New Collection Dropping This Season!</p>
      </div>
      <div className='w-[100%] h-[50%] mt-[30px] flex items-center justify-center flex-wrap gap-[10px] bg-[white]'>
        {
            latestProducts.map((item,index)=>(
                <Card key={index} name={item.name} image={item.image1} id={item._id} price={item.price}/>
            ))
        }


      </div>

    </div>
  )
}

export default LatestCollection
