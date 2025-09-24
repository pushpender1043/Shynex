import React, { useContext, useState } from 'react'
import logo from '../assets/vcart_logo.png'
import { IoIosEye } from "react-icons/io";
import { FaRegEyeSlash } from "react-icons/fa6";
import axios from 'axios';
import { AuthDataContext } from '../Context/AuthContext.jsx';
import { adminDataContext } from '../Context/AdminContext.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
      let [show,setShow]=useState(false);
      let [email,setEmail]=useState("")
      let [password,setPassword]=useState("")
      let {serverUrl}=useContext(AuthDataContext)
      let {adminData,getAdmin}=useContext(adminDataContext)
        // const [loading,setLoading]=useState(false)
      let navigate=useNavigate(); 
      

      const adminLogin=async(e)=>{
        e.preventDefault();
       
        try{
           
            const result=await axios.post(serverUrl+'/api/auth/adminlogin',{email,password},{withCredentials:true})
            console.log("Login Sucess:")
            console.log(result.data);
            toast.success("AdminLogin Successfully")
            getAdmin();
            navigate("/")
        }
      

        catch(error){
            console.log(error)
            toast.error("AdminLogin Failed")

        }

      }
  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center'>
         
         {/* Logo Header */}
         <div
           className='w-full h-[80px] flex items-center px-[30px] gap-[10px] cursor-pointer'
         >
           <img className='w-[40px]' src={logo} alt="logo" />
           <h1 className='text-[22px] font-sans font-bold tracking-wide'>OneCart</h1>
         </div>
   
         {/* Welcome Text */}
         <div className='w-full h-[100px] flex flex-col items-center justify-center gap-[10px]'>
           <span className='text-[25px] font-semibold'>Login Page</span>
           <span className='text-[16px] text-gray-300'>Welcome to OneCart, Apply to admin Login</span>
         </div>
   
         {/* Registration Form */}
         <div className='max-w-[500px] w-[80%] h-[300px] bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center'>
           <form onSubmit={adminLogin}  className='w-[90%] h-[80%] flex flex-col items-center justify-start gap-[30px]'  >
             {/* Inputs */}
             <input
             id="email"
            name="email"

               type="email"
               className='w-full px-4 py-2 rounded-md bg-[#1f2a2e] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
               placeholder='Email'
               required onChange={(e)=>setEmail(e.target.value)} value={email}
             />
         {/* Password Input  */}
   <div className='relative w-full'>
     <input
      id="password"
      name="password"
       type={show?"text":"password"}
       className='w-full px-4 py-2 rounded-md bg-[#1f2a2e] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
       placeholder='Password'
       required onChange={(e)=>setPassword(e.target.value)} value={password}
     />
   {show&&<IoIosEye
   className='text-white text-xl absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer' onClick={()=>setShow(prev=>!prev)}
   
   />}
     {!show&&<FaRegEyeSlash  className='text-white text-xl absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer' onClick={()=>setShow(prev=>!prev)} />}
   </div>
   
             
           
           
   
             {/* Submit Button */}
             <button 
               className='w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition-all duration-200 font-semibold'
               type='submit'
             >
               Log in
             </button>
   
           </form>
         </div>
       </div>
  )
}

export default Login
