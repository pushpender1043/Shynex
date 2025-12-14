import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure CSS is imported

// Pages
import Add from './pages/Add';
import Home from './pages/Home';
import Login from './pages/Login';
import Lists from './pages/lists'; // Note: check capitalization in your folder (Lists vs lists)
import Orders from './pages/Orders';

// Context
import { adminDataContext } from './Context/AdminContext';

function App() {
  let { adminData } = useContext(adminDataContext); // Fixed destructuring based on context structure

  return (
    // Global Dark Theme Wrapper
    <div className='bg-black min-h-screen text-gray-200 font-sans selection:bg-[#d4af37] selection:text-black'>
      
      {/* Dark Theme Toasts */}
      <ToastContainer theme="dark" position="bottom-right" />

      {!adminData ? (
        <Login />
      ) : (
        <>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/add' element={<Add />} />
            <Route path='/lists' element={<Lists />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;