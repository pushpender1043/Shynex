import React from 'react'
import { useContext } from 'react'
import { ShopDataContext } from '../Context/ShopContext'
import { useNavigate } from 'react-router-dom'

function Card({name,image,id,price}) {
    let {currency}=useContext(ShopDataContext)
    let navigate=useNavigate()
  return (
    
 <div className='w-[300px] max-w-[90%] h-[400px] bg-[#fffff0aa]  backdrop-blur-lg rounded-lg hover:scale-[102%] flex items-start justify-start flex-col p-[10px] cursor-pointer border-[1px] border-[#80808049]' onClick={()=>navigate(`/productDetail/${id}`)}>
    <img src={image} alt="" className='w-[100%] h-[80%] rounded-sm object-cover' />
    <div className='text-[black] text-[18px] py-[10px]'>{name}</div>
    <div className='text-[black] text-[14px] '>{currency}{price}</div>
</div>  

  )
}

export default Card
