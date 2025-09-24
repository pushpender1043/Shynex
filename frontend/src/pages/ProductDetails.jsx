import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ShopDataContext } from '../Context/ShopContext'
import { FaStar } from "react-icons/fa";
import { FaStarHalfStroke } from "react-icons/fa6";
import RelatedProduct from '../Component/RelatedProduct';

function ProductDetails() {
  let { productId } = useParams()
  let { products, currency ,addToCart} = useContext(ShopDataContext)
  let [productData, setProductData] = useState(false)
  const [image, setImage] = useState('')
  const [image1, setImage1] = useState('')
  const [image2, setImage2] = useState('')
  const [image3, setImage3] = useState('')
  const [image4, setImage4] = useState('')
  const [size, setSize] = useState('')

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage1(item.image1)
        setImage2(item.image2)
        setImage3(item.image3)
        setImage4(item.image4)
        setImage(item.image1)
        return null
      }
    })
  }

  useEffect(() => {
    fetchProductData()
  }, [productId, products])

  return productData ? (
    <div>
      <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] 
flex flex-col lg:flex-row items-center lg:items-start justify-start gap-6 
px- py-6 md:px-8 mt-10 md:mt-15">

        
        {/* Left Section */}
        <div className="lg:w-1/2 w-full flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-start gap-4 md:gap-6 ">
          
          {/* Thumbnails */}
          <div className="lg:w-1/5 md:w-3/4 w-full flex lg:flex-col flex-row gap-3 md:gap-4 overflow-x-auto lg:overflow-visible">
            {[image1, image2, image3, image4].filter(Boolean).map((img, idx) => (
              <div
                key={idx}
                className="w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] md:w-[100px] md:h-[100px] bg-slate-300 border border-[#80808049] rounded-md flex-shrink-0"
              >
                <img
                  src={img}
                  alt={`thumbnail-${idx}`}
                  className="w-full h-full cursor-pointer rounded-md object-cover"
                  onClick={() => setImage(img)}
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="lg:w-4/5 w-full h-[250px] sm:h-[320px] md:h-[420px] lg:h-[500px]  rounded-md overflow-hidden">
            <img
              src={image}
              alt={productData?.name || "Product"}
              className="w-full h-full object-contain rounded-md"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2 w-full flex flex-col items-start gap-4 px-2 sm:px-4 md:px-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[aliceblue]">
            {productData.name.toUpperCase()}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <FaStar className="text-base sm:text-lg md:text-xl fill-[#FFD700]" />
            <FaStar className="text-base sm:text-lg md:text-xl fill-[#FFD700]" />
            <FaStar className="text-base sm:text-lg md:text-xl fill-[#FFD700]" />
            <FaStar className="text-base sm:text-lg md:text-xl fill-[#FFD700]" />
            <FaStarHalfStroke className="text-base sm:text-lg md:text-xl fill-[#FFD700]" />
            <p className="text-xs sm:text-sm md:text-base font-semibold text-white pl-2">
              (124)
            </p>
          </div>

          {/* Price */}
          <p className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
            {currency}{productData.price}
          </p>

          {/* Description */}
          <p className="w-full md:w-3/4 text-sm sm:text-base md:text-lg text-white">
            {productData.description} and stylish clothes. Easy to wash, Modern Fit, Super Comfortable, and designed for effortless style.
          </p>

          {/* Sizes */}
          <div className="flex flex-col gap-3 mt-4">
            <p className="text-base sm:text-lg md:text-xl font-semibold text-white">Select Size</p>
            <div className="flex gap-2 flex-wrap">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`border py-1.5 sm:py-2 px-3 sm:px-4 bg-slate-300 rounded-md transition ${
                    item === size ? 'bg-black text-[#2f97f1] text-base sm:text-lg' : ''
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <button className="text-xs sm:text-sm md:text-base active:bg-slate-500 cursor-pointer bg-[#495b61c9] py-2 px-4 sm:px-6 rounded-2xl mt-3 border border-[#80808049] text-white shadow-md shadow-black" onClick={()=>addToCart(productData._id,size)}>
              Add To Cart
            </button>
          </div>

          {/* Divider */}
          <div className="w-full h-[2px] bg-slate-700 my-4"></div>

          {/* Extra Info */}
          <div className="w-full text-xs sm:text-sm md:text-base text-white space-y-1">
            <p>100% Original Product.</p>
            <p>Cash On Delivery is available on this product</p>
            <p>Easy Return and Exchange policy within 7 days</p>
          </div>
        </div>
      </div>
      <div className='w-[100%] min-h-[70vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-start justify-start flex-col overflow-x-hidden '>
        <div className='flex px-[20px] mt-[90px] lg:ml-[80px] ml-[0px] lg:mt-[0px]'>
            <p className='border px-5 py-3 text-sm text-white'>
                Description 
            </p>
            <p  className='border px-5 py-3 text-sm text-white'>
                Reviews(124)
            </p>

        </div>
        <div className='w-[80%] md:h-[150px] h-[220px] bg-[#3336397] border text-white text-[13px] md:text-[15px] lg:text-[20px] px-[10px] md:px-[30px] lg:ml-[100px] ml-[20px]'>
            <p className='w-[95%] h-[90%] flex items-center justif-center text-12px'>
                “Upgrade your wardrobe with stylish pieces that match your personality and lifestyle. From casual wear to statement outfits, our collection is designed to keep you ahead in fashion while ensuring comfort and quality. . With premium fabrics, eye-catching designs, and affordable prices, we bring fashion that fits every occasion

            </p>

        </div>
        <RelatedProduct category={productData.category} subCategory={productData.subCategory}
        currentProductId={productData._id}/>

      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  )
}

export default ProductDetails
