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

  // Inline error message
  const [sizeError, setSizeError] = useState(false)

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
      <div className="w-full min-h-screen bg-gradient-to-l from-[#f9f9f9] to-[#eaeaea] 
flex flex-col lg:flex-row items-center lg:items-start justify-start gap-6 
px- py-6 md:px-8 mt-10 md:mt-15">

        {/* Left Section */}
        <div className="lg:w-1/2 w-full flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-start gap-4 md:gap-6 ">
          {/* Thumbnails */}
          <div className="lg:w-1/5 md:w-3/4 w-full flex lg:flex-col flex-row gap-3 md:gap-4 overflow-x-auto lg:overflow-visible">
            {[image1, image2, image3, image4].filter(Boolean).map((img, idx) => (
              <div
                key={idx}
                className="w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] md:w-[100px] md:h-[100px] bg-gray-200 border border-gray-300 rounded-md flex-shrink-0"
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
          <div className="lg:w-4/5 w-full h-[250px] sm:h-[320px] md:h-[420px] lg:h-[500px] rounded-md overflow-hidden bg-gray-100">
            <img
              src={image}
              alt={productData?.name || "Product"}
              className="w-full h-full object-contain rounded-md"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2 w-full flex flex-col items-start gap-4 px-2 sm:px-4 md:px-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800">
            {productData.name.toUpperCase()}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <FaStar className="text-base sm:text-lg md:text-xl fill-yellow-500" />
            <FaStar className="text-base sm:text-lg md:text-xl fill-yellow-500" />
            <FaStar className="text-base sm:text-lg md:text-xl fill-yellow-500" />
            <FaStar className="text-base sm:text-lg md:text-xl fill-yellow-500" />
            <FaStarHalfStroke className="text-base sm:text-lg md:text-xl fill-yellow-500" />
            <p className="text-xs sm:text-sm md:text-base font-semibold text-gray-700 pl-2">
              (124)
            </p>
          </div>

          {/* Price */}
          <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
            {currency}{productData.price}
          </p>

          {/* Description */}
          <p className="w-full md:w-3/4 text-sm sm:text-base md:text-lg text-gray-700">
            {productData.description} and stylish clothes. Easy to wash, Modern Fit, Super Comfortable, and designed for effortless style.
          </p>

          {/* Sizes */}
          <div className="flex flex-col gap-3 mt-4">
            <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">Select Size</p>
            <div className="flex gap-2 flex-wrap">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => { setSize(item); setSizeError(false) }}
                  className={`border py-1.5 sm:py-2 px-3 sm:px-4 bg-gray-200 rounded-md transition ${
                    item === size ? 'bg-gray-800 text-white text-base sm:text-lg' : ''
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Inline error message */}
            {sizeError && (
              <p className="text-gray-600 text-sm mt-1">Please select size</p>
            )}

            <button
              className="text-xs sm:text-sm md:text-base active:bg-gray-400 cursor-pointer bg-gray-300 py-2 px-4 sm:px-6 rounded-2xl mt-3 border border-gray-400 text-gray-900 shadow-md"
              onClick={() => {
                if (!size) {
                  setSizeError(true)
                  return
                }
                addToCart(productData._id, size)
              }}
            >
              Add To Cart
            </button>
          </div>

          {/* Divider */}
          <div className="w-full h-[2px] bg-gray-400 my-4"></div>

          {/* Extra Info */}
          <div className="w-full text-xs sm:text-sm md:text-base text-gray-700 space-y-1">
            <p>100% Original Product.</p>
            <p>Cash On Delivery is available on this product</p>
            <p>Easy Return and Exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description & Reviews Section */}
      <div className='w-[100%] min-h-[70vh] bg-gradient-to-l from-[#f9f9f9] to-[#eaeaea] flex items-start justify-start flex-col overflow-x-hidden '>
        <div className='flex px-[20px] mt-[90px] lg:ml-[80px] ml-[0px] lg:mt-[0px]'>
            <p className='border px-5 py-3 text-gray-800'>
                Description 
            </p>
            <p  className='border px-5 py-3 text-gray-800'>
                Reviews(124)
            </p>
        </div>
        <div className='w-[80%] md:h-[150px] h-[220px] bg-gray-200 text-gray-800 text-[13px] md:text-[15px] lg:text-[20px] px-[10px] md:px-[30px] lg:ml-[100px] ml-[20px] border'>
            <p className='w-[95%] h-[90%] flex items-center justify-center text-[18px] italic'>
                “Upgrade your wardrobe with stylish pieces that match your personality and lifestyle. From casual wear to statement outfits, our collection is designed to keep you ahead in fashion while ensuring comfort and quality. With premium fabrics, eye-catching designs, and affordable prices, we bring fashion that fits every occasion.” 
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
