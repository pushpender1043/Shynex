import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import google from '../assets/google.webp';
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { AuthDataContext } from '../Context/AuthContext.jsx';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase.js'; 
import { userDataContext } from '../Context/UserContext.jsx';

function Registration() {
  let navigate = useNavigate();
  let [show, setShow] = useState(false);
  let { serverUrl } = useContext(AuthDataContext);
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let { getCurrentUser } = useContext(userDataContext);

  // LOGIC: Handle Normal Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(serverUrl + '/api/auth/registration', { name, email, password }, { withCredentials: true });
      getCurrentUser();
      navigate("/");
      console.log("Registered Successfully");
    } catch (error) {
      console.log(error);
      alert("Signup Error: " + (error.response?.data?.message || error.message));
    }
  }

  // LOGIC: Handle Google Signup
  const googleSignup = async () => {
    try {
      console.log("Attempting Google Sign-In...");
      const response = await signInWithPopup(auth, provider);
      
      let user = response.user;
      let googleName = user.displayName;
      let googleEmail = user.email;

      const result = await axios.post(serverUrl + '/api/auth/googlelogin', { name: googleName, email: googleEmail }, { withCredentials: true });
      
      getCurrentUser();
      navigate("/");

    } catch (err) {
      console.error("Google Login Failed:", err);
      alert("Login Failed: " + err.message);
    }
  }

  // ✅ NEW PREMIUM IMAGE (Luxury Fashion)
  const signupImage = "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=2070&auto=format&fit=crop";

  return (
    // Outer container with subtle dark pattern background
    <div className='w-full min-h-screen flex items-center justify-center p-4 bg-[#020202] bg-[radial-gradient(circle_at_center,_#1a1a1a_0%,_#020202_100%)]'>
      
      {/* MAIN CARD Entrance Animation */}
      <div className='w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-[#0a0a0a] rounded-sm overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#d4af37]/10 animate-fade-up'>
        
        {/* LEFT SIDE: Image & Branding */}
        <div className='hidden md:flex relative flex-col justify-between p-12 overflow-hidden'>
          
          {/* Slow Zoom Animation on background image */}
          <div className='absolute inset-0 bg-cover bg-center animate-slow-zoom' style={{backgroundImage: `url(${signupImage})`}}></div>
          
          {/* Dark Overlay */}
          <div className='absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-black/20'></div>
          
          <div className='relative z-10 cursor-pointer animate-fade-up delay-200' onClick={() => navigate("/")}>
            <h1 className='text-5xl tracking-[0.15em] text-white font-serif drop-shadow-lg'>
              SHY<span className='text-[#d4af37]'>NEX</span>
            </h1>
            <div className='h-[1px] w-12 bg-[#d4af37] mt-2 mb-1'></div>
            <p className='text-[#d4af37] text-[10px] tracking-[0.4em] uppercase'>Luxury Apparel</p>
          </div>

          <div className='relative z-10 animate-fade-up delay-400'>
            <h2 className='text-3xl text-gray-100 font-serif italic leading-snug drop-shadow-md'>
              "Join the circle of exclusivity."
            </h2>
          </div>
        </div>

        {/* RIGHT SIDE: Signup Form */}
        <div className='flex flex-col justify-center px-8 py-12 md:px-16 bg-[#0a0a0a] relative'>
           {/* Subtle decorative line */}
           <div className='absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent md:hidden'></div>

           <div className='mb-10 text-center animate-fade-up delay-300'>
             <h3 className='text-3xl text-white font-serif mb-2'>Create Account</h3>
             <p className='text-gray-400 text-sm tracking-wider font-light'>Become a member of Shynex.</p>
           </div>

           <form onSubmit={handleSignup} className='flex flex-col gap-6 animate-fade-up delay-400'>
             
             {/* Name Input */}
             <div className='group relative'>
               <input
                 type="text"
                 className='peer w-full bg-transparent text-white px-1 py-3 border-b border-gray-800 focus:border-transparent outline-none transition-all placeholder-transparent font-light z-10 relative'
                 placeholder='Enter your name'
                 id="name"
                 onChange={(e) => setName(e.target.value)}
                 value={name}
                 required
               />
               <label htmlFor="name" className='absolute left-1 top-3 text-gray-500 text-sm transition-all peer-focus:-top-4 peer-focus:text-[#d4af37] peer-focus:text-xs peer-valid:-top-4 peer-valid:text-xs peer-valid:text-gray-500 pointer-events-none'>Full Name</label>
               <span className='absolute bottom-0 left-1/2 w-0 h-[1px] bg-[#d4af37] transition-all duration-500 group-focus-within:w-full group-focus-within:left-0'></span>
             </div>

             {/* Email Input */}
             <div className='group relative'>
               <input
                 type="email"
                 className='peer w-full bg-transparent text-white px-1 py-3 border-b border-gray-800 focus:border-transparent outline-none transition-all placeholder-transparent font-light z-10 relative'
                 placeholder='Enter your email'
                 id="email"
                 onChange={(e) => setEmail(e.target.value)}
                 value={email}
                 required
               />
               <label htmlFor="email" className='absolute left-1 top-3 text-gray-500 text-sm transition-all peer-focus:-top-4 peer-focus:text-[#d4af37] peer-focus:text-xs peer-valid:-top-4 peer-valid:text-xs peer-valid:text-gray-500 pointer-events-none'>Email Address</label>
               <span className='absolute bottom-0 left-1/2 w-0 h-[1px] bg-[#d4af37] transition-all duration-500 group-focus-within:w-full group-focus-within:left-0'></span>
             </div>

             {/* Password Input */}
             <div className='group relative'>
               <input
                 type={show ? "text" : "password"}
                 className='peer w-full bg-transparent text-white px-1 py-3 border-b border-gray-800 focus:border-transparent outline-none transition-all placeholder-transparent font-light z-10 relative'
                 placeholder='Create password'
                 id="password"
                 onChange={(e) => setPassword(e.target.value)}
                 value={password}
                 required
               />
               <label htmlFor="password" class='absolute left-1 top-3 text-gray-500 text-sm transition-all peer-focus:-top-4 peer-focus:text-[#d4af37] peer-focus:text-xs peer-valid:-top-4 peer-valid:text-xs peer-valid:text-gray-500 pointer-events-none'>Create Password</label>
               <span className='absolute bottom-0 left-1/2 w-0 h-[1px] bg-[#d4af37] transition-all duration-500 group-focus-within:w-full group-focus-within:left-0'></span>

               <div 
                 className='absolute right-2 top-[14px] text-gray-600 cursor-pointer hover:text-[#d4af37] transition-colors z-20'
                 onClick={() => setShow(prev => !prev)}
               >
                 {show ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
               </div>
             </div>

             {/* Gold Button */}
             <button
               className='btn-shimmer animate-fade-up delay-500 w-full py-4 mt-2 rounded-sm bg-[#d4af37] text-black font-bold text-sm uppercase tracking-[0.25em] transition-all duration-500 transform hover:-translate-y-[2px] shadow-[0_5px_20px_rgba(212,175,55,0.15)] hover:shadow-[0_10px_30px_rgba(212,175,55,0.3)]'
               type='submit'
             >
               Sign Up
             </button>

             <div className='relative flex py-2 items-center animate-fade-up delay-600'>
                <div className='flex-grow border-t border-gray-800/50'></div>
                <span className='flex-shrink-0 mx-4 text-gray-600 text-[9px] uppercase tracking-[0.2em]'>Or</span>
                <div className='flex-grow border-t border-gray-800/50'></div>
             </div>

             <button 
               type="button"
               className='animate-fade-up delay-700 w-full py-3 rounded-sm border border-gray-800 hover:border-[#d4af37]/50 bg-[#0f0f0f] text-gray-400 hover:text-[#d4af37] text-sm flex items-center justify-center gap-3 transition-all duration-500 group' 
               onClick={googleSignup}
             >
               <img className='w-5 grayscale group-hover:grayscale-0 transition-all' src={google} alt="Google" />
               <span className='tracking-wider font-light'>Sign up with Google</span>
             </button>

           </form>

           <p className='text-center text-sm text-gray-500 mt-8 font-light animate-fade-up delay-700'>
             Already have an account?{' '}
             <span
               className='text-[#d4af37] cursor-pointer hover:underline underline-offset-4 transition-all'
               onClick={() => navigate("/login")}
             >
               Login here
             </span>
           </p>

        </div>
      </div>
    </div>
  );
}

export default Registration;