import React from 'react';
import {useState} from 'react';
import logo from '../assets/vcart_logo.png';
import { useNavigate } from 'react-router-dom';
import google from '../assets/google.webp';
import { IoIosEye } from "react-icons/io";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useContext } from 'react';
import {AuthDataContext} from '../Context/AuthContext.jsx';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import {auth,provider} from '../../utils/Firebase.js';
import {userDataContext} from '../Context/UserContext.jsx';
  

function Registration() {
  let navigate = useNavigate();
  let [show,setShow]=useState(false);
  let {serverUrl}=useContext(AuthDataContext);
  let [name,setName]=useState("")
  let [email,setEmail]=useState("")
  let [password,setPassword]=useState("")
  let {getCurrentUser}=useContext(userDataContext);

  

  const handleSignup=async(e)=>{
    e.preventDefault();//to prevent page reloading 
    try{
        const result=await axios.post(serverUrl+'/api/auth/registration',{name,email,password},{withCredentials:true})
         getCurrentUser();
        navigate("/");
        console.log(result.data);
        console.log("Registered");
//       const parsedData = JSON.parse(result.data);
// console.log(parsedData);
    }
    catch(error){
        // console.log("kuch to gadbad");
        console.log(error)
      


    }

  }



const googleSignup=async()=>{
  try{
    const response=await signInWithPopup(auth,provider);
    console.log(response);
    //create user
    let user=response.user;
    let name=user.displayName;
    let email=user.email;

    //to save into db
    const result=await axios.post(serverUrl+'/api/auth/googlelogin',{name,email},{withCredentials:true})
    console.log(result.data)
      getCurrentUser();
        navigate("/");

  }
  catch(err){
      console.log(err);


  }
}
  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center'>
      
      {/* Logo Header */}
      <div
        className='w-full h-[80px] flex items-center px-[30px] gap-[10px] cursor-pointer'
        onClick={() => navigate("/")}
      >
        <img className='w-[40px]' src={logo} alt="logo" />
        <h1 className='text-[22px] font-sans font-bold tracking-wide'>OneCart</h1>
      </div>

      {/* Welcome Text */}
      <div className='w-full h-[100px] flex flex-col items-center justify-center gap-[10px]'>
        <span className='text-[25px] font-semibold'>Registration Page</span>
        <span className='text-[16px] text-gray-300'>Welcome to OneCart, Place Your Order</span>
      </div>

      {/* Registration Form */}
      <div className='max-w-[500px] w-[90%] h-[500px] bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center'>
        <form  action ="" className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]' onSubmit={handleSignup}>
          
          {/* Google Signup */}
          <div className='w-full h-[50px] bg-[#42656cae] hover:bg-[#42656c] text-white rounded-lg flex items-center justify-center gap-[10px] py-[10px] cursor-pointer transition-all duration-200' onClick={googleSignup}>
            <img className='w-[20px]' src={google} alt="Google" />
            Signup with Google
          </div>

          {/* OR Divider */}
          <div className='flex items-center justify-center w-full gap-2 text-gray-400'>
            <div className='w-full h-[1px] bg-gray-600'></div>
            <span className='text-sm'>OR</span>
            <div className='w-full h-[1px] bg-gray-600'></div>
          </div>

          {/* Inputs */}
         

         
          <input
           id="username"
           name="name"
            type="text"
            className='w-full px-4 py-2 rounded-md bg-[#1f2a2e] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
            placeholder='Username' onChange={(e)=>setName(e.target.value)} value={name}
            required 
          />
          <input
          id="email"
           name="email"
            type="email"
            className='w-full px-4 py-2 rounded-md bg-[#1f2a2e] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
            placeholder='Email' onChange={(e)=>setEmail(e.target.value)} value={email}
            required
          />
      {/* Password Input  */}
<div className='relative w-full'>
  <input
    type={show?"text":"password"}
     id="password"
  name="password"
    className='w-full px-4 py-2 rounded-md bg-[#1f2a2e] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
    placeholder='Password'
    required  onChange={(e)=>setPassword(e.target.value)} value={password}
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
            Create Account
          </button>
            

          {/* Navigation to Login */}
          <p className='text-sm text-gray-300'>
            Already have an account?{' '}
            <span
              className='text-blue-400 cursor-pointer hover:underline'
              onClick={() => navigate("/Login")}
            >
              Login
            </span>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Registration;
