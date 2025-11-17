import React, { useContext, useState, useEffect } from 'react';
import logo from '../assets/sv_logo.png';
import { HiOutlineSearchCircle } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { userDataContext } from '../Context/UserContext.jsx';
import { IoSearchCircle } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { AuthDataContext } from '../Context/AuthContext';
import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineContactPage } from "react-icons/md";
import axios from 'axios';
import { ShopDataContext } from '../Context/ShopContext.jsx';

function Nav() {
  let { getCurrentUser, userData } = useContext(userDataContext);
  let { serverUrl } = useContext(AuthDataContext);
  let { showSearch, setShowSearch, search, setSearch, getCartCount } = useContext(ShopDataContext);

  let [showProfile, setShowProfile] = useState(false);
  let [showNavbar, setShowNavbar] = useState(true);
  let [lastScrollY, setLastScrollY] = useState(0);

  let navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await axios.get(serverUrl + '/api/auth/logout', { withCredentials: true });
      getCurrentUser();
    } catch (error) {
      console.log(error);
    }
  };

  // Hide / Show navbar on scroll
  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      setShowNavbar(false); // scrolling down
    } else {
      setShowNavbar(true); // scrolling up
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  return (
    <div className={`w-full h-[70px] fixed top-0 left-0 z-50 bg-[WHITE] shadow-md flex items-center justify-between px-6 transition-transform duration-300 ${showNavbar ? 'translate-y-0 bg-gradient-to-l from-[#0f1c2c] to-[#1f3a40] ' : '-translate-y-[100%]'}`}>
        
      {/* Logo */}
      <div className='flex items-center gap-3 '>
        
        <img src={logo} alt="logo" className='w-15 mt-[10px] ' />
        <h1 className='text-xl italic font-bold  text-white'>Shopverse</h1>
      </div>

      {/* Menu */}
   
{/* Menu */}
<div className='hidden md:flex gap-4 text-white'>
  <div className='text-xs bg-white/20 px-4 py-2 rounded-xl cursor-pointer hover:bg-white/30 transition' onClick={() => navigate("/")}>
    HOME
  </div>
  <div className='text-xs bg-white/20 px-4 py-2 rounded-xl cursor-pointer hover:bg-white/30 transition' onClick={() => navigate("/collection")}>
    COLLECTIONS
  </div>
  <div className='text-xs bg-white/20 px-4 py-2 rounded-xl cursor-pointer hover:bg-white/30 transition' onClick={() => navigate("/about")}>
    ABOUT
  </div>
  <div className='text-xs bg-white/20 px-4 py-2 rounded-xl cursor-pointer hover:bg-white/30 transition' onClick={() => navigate("/contact")}>
    CONTACT
  </div>
</div>



      {/* Icons */}
      <div className='flex items-center gap-4 relative'>
        {!showSearch &&
          <HiOutlineSearchCircle className='w-8 h-8 text-black cursor-pointer' onClick={() => { setShowSearch(prev => !prev); navigate("/collection") }} />}
        {showSearch &&
          <IoSearchCircle className='w-8 h-8 text-black cursor-pointer' onClick={() => setShowSearch(prev => !prev)} />}

        {!userData &&
          <FaUserCircle className='w-7 h-7 text-black cursor-pointer' onClick={() => setShowProfile(prev => !prev)} />}
        {userData &&
          <div className='w-8 h-8 bg-black text-white rounded-full flex items-center justify-center cursor-pointer'
            onClick={() => setShowProfile(prev => !prev)}>
            {userData?.name.slice(0, 1)}
          </div>}

        <IoMdCart className='w-7 h-7 text-black cursor-pointer hidden md:block' onClick={() => navigate('/cart')} />
        <p className='absolute top-[-6px] right-[-10px] w-5 h-5 bg-black text-white text-xs flex items-center justify-center rounded-full'>
          {getCartCount()}
        </p>
      </div>

      {/* Search Bar */}
      {showSearch &&
        <div className='absolute top-full left-0 w-full h-[70px]  flex items-center justify-center z-40'>
          <input
            type="text"
            placeholder='Search here'
            className='w-[60%] h-[50%] bg-gradient-to-l from-[#0f1c2c] to-[#1f3a40]  text-white placeholder:text-white px-6 py-2 rounded-full text-lg '
            onChange={(e) => { setSearch(e.target.value) }}
            value={search}
          />
        </div>
      }

      {/* Profile Dropdown */}
      {showProfile && (
        <div className='absolute top-[80px] right-6 w-[220px] bg-black/90 border border-gray-400 rounded-lg z-50 p-4 shadow-lg'>
          <ul className='flex flex-col gap-3 text-white text-sm'>
            {!userData &&
              <li className='cursor-pointer hover:bg-[#2e2e2e] px-3 py-2 rounded-md' onClick={() => { navigate('/login'); setShowProfile(false); }}>
                Login
              </li>}
            {userData &&
              <li className='cursor-pointer hover:bg-[#2e2e2e] px-3 py-2 rounded-md' onClick={() => { handleLogOut(); setShowProfile(false); }}>
                Logout
              </li>}
            <li className='cursor-pointer hover:bg-[#2e2e2e] px-3 py-2 rounded-md' onClick={() => { navigate("/order"); setShowProfile(false) }}>Orders</li>
            <li className='cursor-pointer hover:bg-[#2e2e2e] px-3 py-2 rounded-md' onClick={() => { navigate("/about"); setShowProfile(false) }}>About</li>
          </ul>
        </div>
      )}

      {/* Mobile Bottom Nav */}
      <div className='md:hidden fixed bottom-0 left-0 w-full h-[50px] bg-black text-white flex justify-around items-center text-xs z-50'>
        <button className='flex flex-col items-center' onClick={() => navigate('/')}>
          <IoMdHome className='w-6 h-5' />
          Home
        </button>
        <button className='flex flex-col items-center' onClick={() => navigate('/collection')}>
          <HiOutlineCollection className='w-6 h-5' />
          Collections
        </button>
        <button className='flex flex-col items-center' onClick={() => navigate('/cart')}>
          <FaShoppingCart className='w-6 h-5' />
          Cart
        </button>
        <button className='flex flex-col items-center' onClick={() => navigate('/contact')}>
          <MdOutlineContactPage className='w-6 h-5' />
          Contact
        </button>
      </div>
    </div>
  );
}

export default Nav;
