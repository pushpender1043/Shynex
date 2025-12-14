import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthDataContext } from '../Context/AuthContext';
import axios from 'axios';
import { adminDataContext } from '../Context/AdminContext';
import { IoLogOutOutline, IoNotificationsOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

function Nav() {
  let navigate = useNavigate();
  let { serverUrl } = useContext(AuthDataContext);
  let { getAdmin } = useContext(adminDataContext);

  // --- LOGIC UNTOUCHED ---
  const LogOut = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true });
      getAdmin();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='w-full h-[80px] bg-[#0a0a0a] z-50 fixed top-0 flex items-center justify-between px-6 md:px-12 border-b border-[#222] shadow-2xl font-sans'>
      
      {/* --- LEFT: BRAND IDENTITY --- */}
      <div className='flex items-center gap-4 cursor-pointer' onClick={() => navigate("/")}>
        <div className='flex flex-col'>
           <h1 className='text-2xl font-serif font-bold text-white tracking-[0.2em] leading-none'>
             SHY<span className='text-[#d4af37]'>NEX</span>
           </h1>
           <div className='flex items-center gap-2 mt-1'>
             <span className='w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse'></span>
             <p className='text-[9px] text-gray-500 font-bold tracking-[0.3em] uppercase'>HQ Command Center</p>
           </div>
        </div>
      </div>

      {/* --- RIGHT: ACTIONS & PROFILE --- */}
      <div className='flex items-center gap-6'>
        
        {/* Notification Icon (Visual Only) */}
        <div className='relative cursor-pointer group'>
           <IoNotificationsOutline className='text-gray-400 text-xl group-hover:text-[#d4af37] transition-colors'/>
           <span className='absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-black'></span>
        </div>

        <div className='h-8 w-[1px] bg-[#222] hidden md:block'></div>

        {/* Admin Profile */}
        <div className='hidden md:flex items-center gap-3'>
           <div className='text-right'>
              <p className='text-white text-xs font-bold uppercase tracking-wider'>Administrator</p>
              <p className='text-[#d4af37] text-[10px] tracking-wide'>Super User</p>
           </div>
           <FaUserCircle className='text-3xl text-gray-600'/>
        </div>

        {/* Logout Button */}
        <button 
          className='flex items-center gap-2 bg-[#111] hover:bg-red-900/20 text-gray-400 hover:text-red-500 border border-[#333] hover:border-red-500/50 py-2 px-4 rounded-sm transition-all duration-300 group' 
          onClick={LogOut}
        >
          <span className='text-[10px] font-bold uppercase tracking-widest hidden sm:block'>Logout</span>
          <IoLogOutOutline className='text-lg group-hover:translate-x-1 transition-transform'/>
        </button>

      </div>

    </div>
  )
}

export default Nav;