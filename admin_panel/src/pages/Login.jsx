import React, { useContext, useState } from 'react'
// import logo from '../assets/logo.png' 
import { IoIosEye } from "react-icons/io";
import { FaRegEyeSlash } from "react-icons/fa6";
import axios from 'axios';
import { AuthDataContext } from '../Context/AuthContext.jsx';
import { adminDataContext } from '../Context/AdminContext.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

function Login() {
  let [show, setShow] = useState(false);
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let { serverUrl } = useContext(AuthDataContext)
  let { getAdmin } = useContext(adminDataContext)
  let navigate = useNavigate();

  const adminLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(serverUrl + '/api/auth/adminlogin', { email, password }, { withCredentials: true })
      toast.success("Welcome, Boss. 👑")
      getAdmin();
      navigate("/")
    } catch (error) {
      console.log(error)
      toast.error("Invalid Credentials")
    }
  }

  return (
    <div className='w-full min-h-screen bg-black flex flex-col items-center justify-center font-sans relative overflow-hidden'>
      
      {/* Background Ambience */}
      <div className='absolute -top-40 -right-40 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl'></div>
      <div className='absolute -bottom-40 -left-40 w-96 h-96 bg-gray-600/20 rounded-full blur-3xl'></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='z-10 w-[90%] max-w-[450px]'
      >
        {/* Brand Header */}
        <div className='text-center mb-8'>
           <h1 className='text-4xl font-bold text-white font-serif tracking-wider'>Shynex.</h1>
           <p className='text-amber-500 text-xs uppercase tracking-[0.3em] mt-2'>Premium Admin Access</p>
        </div>

        {/* Login Card */}
        <div className='bg-zinc-900/80 backdrop-blur-md rounded-none border border-amber-500/30 p-10 shadow-2xl shadow-amber-900/10'>
          
          <div className='text-center mb-8'>
            <h2 className='text-xl font-medium text-gray-200'>Sign In</h2>
          </div>

          <form onSubmit={adminLogin} className='flex flex-col gap-6'>
            
            <div className='group'>
              <label className='text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-2 block'>Email</label>
              <input
                type="email"
                className='w-full px-0 py-3 bg-transparent text-white border-b border-gray-700 focus:border-amber-500 focus:outline-none transition-colors placeholder-gray-600'
                placeholder='admin@shynex.com'
                required onChange={(e) => setEmail(e.target.value)} value={email}
              />
            </div>

            <div className='group relative'>
              <label className='text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-2 block'>Password</label>
              <div className='relative'>
                <input
                  type={show ? "text" : "password"}
                  className='w-full px-0 py-3 bg-transparent text-white border-b border-gray-700 focus:border-amber-500 focus:outline-none transition-colors placeholder-gray-600'
                  placeholder='Enter password'
                  required onChange={(e) => setPassword(e.target.value)} value={password}
                />
                <div className='absolute top-1/2 right-0 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-amber-400 transition-colors' onClick={() => setShow(prev => !prev)}>
                  {show ? <IoIosEye size={20} /> : <FaRegEyeSlash size={18} />}
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='w-full py-4 mt-6 bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm tracking-widest uppercase shadow-lg shadow-amber-500/20 transition-all'
              type='submit'
            >
              Access Dashboard
            </motion.button>

          </form>
        </div>
      </motion.div>
    </div>
  )
}

export default Login