import React, { useState, useContext } from 'react'
import Nav from '../Component/Nav'
import Sidebar from '../Component/Sidebar'
import upload from '../assets/upload.png' 
import { AuthDataContext } from '../Context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../Component/Loading'
import { motion } from 'framer-motion'
import { FaCloudUploadAlt } from "react-icons/fa";

function Add() {
  let [image1, setImage1] = useState(false)
  let [image2, setImage2] = useState(false)
  let [image3, setImage3] = useState(false)
  let [image4, setImage4] = useState(false)
  let [name, setName] = useState("")
  let [description, setDescription] = useState("");
  let [category, setCategory] = useState("Men")
  let [price, setPrice] = useState("")
  let [subcategory, setsubCategory] = useState("TopWear");
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([])
  const [loading, setLoading] = useState(false)
  let { serverUrl } = useContext(AuthDataContext)

  const handleAddProduct = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      let formData = new FormData()
      formData.append("name", name); formData.append("description", description); formData.append("price", price);
      formData.append("category", category); formData.append("subCategory", subcategory); formData.append("bestSeller", bestSeller);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("image1", image1); formData.append("image2", image2); formData.append("image3", image3); formData.append("image4", image4);

      let result = await axios.post(serverUrl + '/api/product/addproduct', formData, { withCredentials: true })
      
      if (result.data) {
        toast.success("Masterpiece Added! 🏆")
        setLoading(false)
        setName(""); setDescription(""); setImage1(false); setImage2(false); setImage3(false); setImage4(false);
        setPrice(""); setBestSeller(false); setCategory("Men"); setsubCategory("TopWear"); setSizes([]);
      }
    } catch (error) {
      console.log(error); setLoading(false); toast.error("Failed to add product");
    }
  }

  // Premium Dark Input Style
  const inputStyle = "w-full px-4 py-3 bg-[#111] text-white border border-[#333] focus:border-[#d4af37] focus:outline-none transition-colors placeholder-gray-600 font-light rounded-sm";

  return (
    <div className='w-full min-h-screen bg-[#f8f9fa] font-sans text-gray-800'>
      <Nav />
      <div className='flex'>
        <Sidebar />
        
        {/* MAIN CONTENT AREA */}
        <div className='flex-1 lg:ml-[250px] mt-[80px] p-8 pb-20 min-h-screen bg-[#050505] text-white'>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className='mb-8 border-b border-[#222] pb-6'>
                <h1 className='text-3xl font-serif font-bold text-white mb-2'>New Arrival</h1>
                <p className='text-gray-500 text-sm'>Add a new masterpiece to the collection.</p>
            </div>
            
            <form onSubmit={handleAddProduct} className='max-w-4xl bg-[#0a0a0a] border border-[#222] p-8 md:p-10 shadow-2xl flex flex-col gap-8 rounded-sm'>
              
              {/* Image Upload */}
              <div>
                <p className='text-xs font-bold text-[#d4af37] uppercase tracking-widest mb-4'>Visuals</p>
                <div className='flex gap-4 flex-wrap'>
                  {[image1, image2, image3, image4].map((img, index) => (
                    <label key={index} htmlFor={`image${index + 1}`} className='cursor-pointer group relative'>
                      <div className={`w-24 h-28 md:w-28 md:h-32 flex items-center justify-center bg-[#111] border border-[#333] rounded-sm transition-all overflow-hidden ${img ? 'border-[#d4af37]' : 'hover:border-gray-500'}`}>
                           {img ? (
                               <img src={URL.createObjectURL(img)} className='w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity' alt="preview" />
                           ) : (
                               <div className='text-center'>
                                   <FaCloudUploadAlt className='text-2xl text-gray-600 mx-auto mb-1 group-hover:text-[#d4af37] transition-colors'/>
                                   <span className='text-[9px] text-gray-600 uppercase font-bold'>Upload</span>
                               </div>
                           )}
                      </div>
                      <input type="file" id={`image${index + 1}`} hidden onChange={(e) => {
                        if(index===0) setImage1(e.target.files[0]);
                        if(index===1) setImage2(e.target.files[0]);
                        if(index===2) setImage3(e.target.files[0]);
                        if(index===3) setImage4(e.target.files[0]);
                      }} />
                    </label>
                  ))}
                </div>
              </div>

              {/* Name & Desc */}
              <div className='grid gap-6'>
                <div>
                   <p className='text-xs font-bold text-gray-400 uppercase tracking-widest mb-2'>Product Title</p>
                   <input type="text" placeholder='e.g. Royal Silk Shirt' className={inputStyle} onChange={(e) => setName(e.target.value)} value={name} required />
                </div>
                <div>
                   <p className='text-xs font-bold text-gray-400 uppercase tracking-widest mb-2'>Story (Description)</p>
                   <textarea placeholder='Describe the product details and fabric...' className={`${inputStyle} h-32 resize-none`} onChange={(e) => setDescription(e.target.value)} value={description} required />
                </div>
              </div>

              {/* Selectors */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div>
                  <p className='text-xs font-bold text-gray-400 uppercase tracking-widest mb-2'>Category</p>
                  <select className={inputStyle} onChange={(e) => setCategory(e.target.value)} value={category}>
                    <option value="Men">Men</option><option value="Women">Women</option><option value="Kids">Kids</option>
                  </select>
                </div>
                <div>
                  <p className='text-xs font-bold text-gray-400 uppercase tracking-widest mb-2'>Type</p>
                  <select className={inputStyle} onChange={(e) => setsubCategory(e.target.value)} value={subcategory}>
                    <option value="TopWear">TopWear</option><option value="BottomWear">BottomWear</option><option value="WinterWear">WinterWear</option>
                  </select>
                </div>
                <div>
                  <p className='text-xs font-bold text-gray-400 uppercase tracking-widest mb-2'>Price (₹)</p>
                  <input type="number" placeholder='0.00' className={inputStyle} onChange={(e) => setPrice(e.target.value)} value={price} required />
                </div>
              </div>

              {/* Sizes */}
              <div>
                <p className='text-xs font-bold text-gray-400 uppercase tracking-widest mb-3'>Available Sizes</p>
                <div className='flex gap-3'>
                  {['S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                    <div key={s} onClick={() => setSizes(prev => prev.includes(s) ? prev.filter(item => item !== s) : [...prev, s])}
                      className={`w-12 h-12 flex items-center justify-center cursor-pointer border transition-all font-serif font-bold text-sm rounded-sm ${
                          sizes.includes(s) 
                          ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.4)]' 
                          : 'bg-[#111] text-gray-500 border-[#333] hover:border-gray-500 hover:text-white'
                      }`}>
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              {/* Best Seller Checkbox */}
              <div className='flex items-center gap-3 p-4 border border-[#333] bg-[#111] w-fit pr-8 rounded-sm cursor-pointer' onClick={() => setBestSeller(prev => !prev)}>
                <input type="checkbox" className='w-4 h-4 accent-[#d4af37] cursor-pointer bg-black' checked={bestSeller} readOnly />
                <label className='text-xs text-white cursor-pointer font-bold uppercase tracking-wide'>Mark as Best Seller</label>
              </div>

              <motion.button 
                whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} 
                type="submit" 
                className='w-full py-4 bg-[#d4af37] text-black font-bold text-xs uppercase tracking-[0.25em] hover:bg-white transition-colors shadow-lg mt-4'
              >
                {loading ? "Adding..." : "Add to Inventory"}
              </motion.button>

            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Add