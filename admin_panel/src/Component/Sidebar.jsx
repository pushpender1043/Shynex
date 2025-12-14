import React from 'react';
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaList, FaBoxOpen } from "react-icons/fa"; 
import { useNavigate, useLocation } from 'react-router-dom';

function Sidebar() {
  let navigate = useNavigate();
  let location = useLocation(); 

  // Active Link Logic
  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `flex items-center justify-center md:justify-start gap-4 px-8 py-5 cursor-pointer transition-all duration-500 border-r-2 group relative overflow-hidden
    ${isActive 
      ? 'border-[#d4af37] text-[#d4af37] bg-gradient-to-l from-[#d4af37]/10 to-transparent' 
      : 'border-transparent text-gray-500 hover:text-white hover:bg-white/5'
    }`;
  };

  return (
    <div className='w-[18%] lg:w-[250px] min-h-screen bg-[#0a0a0a] fixed left-0 top-[70px] border-r border-[#222] z-20 font-sans shadow-[5px_0_30px_rgba(0,0,0,0.5)]'>
      
      <div className='flex flex-col pt-12 gap-2'>
        
        {/* Add Product */}
        <div className={getLinkClass("/add")} onClick={() => navigate("/add")}>
          <IoMdAddCircleOutline className="text-2xl transition-transform group-hover:scale-110" />
          <p className='hidden md:block font-bold text-xs uppercase tracking-[0.2em]'>Add Product</p>
        </div>

        {/* ✅ FIXED: "/list" ko "/lists" kar diya hai */}
        <div className={getLinkClass("/lists")} onClick={() => navigate("/lists")}>
          <FaList className="text-lg transition-transform group-hover:scale-110" />
          <p className='hidden md:block font-bold text-xs uppercase tracking-[0.2em]'>Inventory</p>
        </div>

        {/* Orders */}
        <div className={getLinkClass("/orders")} onClick={() => navigate("/orders")}>
          <FaBoxOpen className="text-xl transition-transform group-hover:scale-110" />
          <p className='hidden md:block font-bold text-xs uppercase tracking-[0.2em]'>Orders</p>
        </div>

      </div>

      <div className='absolute bottom-10 w-full text-center hidden md:block'>
         <p className='text-[9px] text-[#d4af37] font-serif italic opacity-50'>Shynex Admin HQ</p>
         <p className='text-[8px] text-gray-600 mt-1'>v2.5.0 • Secure</p>
      </div>

    </div>
  )
}

export default Sidebar;