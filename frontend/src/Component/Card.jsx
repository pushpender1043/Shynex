import React from 'react'
import { useContext } from 'react'
import { ShopDataContext } from '../Context/ShopContext'
import { useNavigate } from 'react-router-dom'

function Card({ name, image, id, price }) {
  let { currency } = useContext(ShopDataContext)
  let navigate = useNavigate()

  return (
    <div
      className='w-[300px] max-w-[90%] h-[400px] bg-[#e5e5e5] backdrop-blur-lg rounded-lg hover:scale-[102%] flex flex-col items-start justify-start p-[10px] cursor-pointer border border-[#ccc] shadow-sm hover:shadow-md transition-all duration-300'
      onClick={() => navigate(`/productDetail/${id}`)}
    >
      <img
        src={image}
        alt={name}
        className='w-[100%] h-[80%] rounded-sm object-cover'
      />
      <div className='text-[#111] text-[18px] font-medium py-[10px]'>{name}</div>
      <div className='text-[#333] text-[15px] font-semibold'>
        {currency}{price}
      </div>
    </div>
  )
}

export default Card
