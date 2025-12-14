import React, { useContext, useState, useEffect } from 'react';
import { Navigate, useLocation, Routes, Route } from 'react-router-dom';
import { ReactLenis } from '@studio-freight/react-lenis'; // Smooth Scroll
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AnimatePresence } from 'framer-motion';

// --- CONTEXT ---
import { userDataContext } from './Context/UserContext';

// --- PAGES ---
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import About from './pages/About';
import Collections from './pages/Collections';
import Product from './pages/Product';
import Contact from './pages/Contact';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Order';
import NotFound from './pages/NotFound';

// --- COMPONENTS ---
import Nav from './Component/Nav';
import ChatWidget from './Component/ChatbotWidget';
import CustomCursor from './Component/CustomCursor';
import ProductModal from './Component/ProductModal';
import Preloader from './Component/Preloader';

function App() {
  let { userData } = useContext(userDataContext);
  let location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  // 1. Cinematic Preloader Logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      window.scrollTo(0, 0);
    }, 2500); // 2.5s display time
    return () => clearTimeout(timer);
  }, []);

  // 2. ✅ NEW: DYNAMIC TAB TITLE MAGIC
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "Come back to Luxury... 💎";
      } else {
        document.title = "SHYNEX | Luxury Redefined";
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothTouch: true }}>
      
      {/* Base Theme: Black & Gold */}
      <div className='bg-black min-h-screen text-white font-sans selection:bg-[#d4af37] selection:text-black'>
        
        <CustomCursor />
        <ToastContainer theme="dark" />
        <ProductModal />

        {/* Cinematic Entrance */}
        <AnimatePresence mode='wait'>
          {isLoading && <Preloader />}
        </AnimatePresence>

        {userData && <Nav />}
        
        <Routes>
          <Route path="/login" element={ userData ? <Navigate to={location.state?.from || "/"} /> : <Login /> } />
          <Route path="/signup" element={ userData ? <Navigate to={location.state?.from || "/"} /> : <Registration /> } />
          <Route path="/" element={ userData ? <Home /> : <Navigate to="/login" state={{ from: location.pathname }} /> } />
          <Route path="/about" element={ userData ? <About /> : <Navigate to="/login" state={{ from: location.pathname }} /> } />
          <Route path="/collection" element={ userData ? <Collections /> : <Navigate to="/login" state={{ from: location.pathname }} /> } />
          <Route path="/product" element={ userData ? <Product /> : <Navigate to="/login" state={{ from: location.pathname }} /> } />
          <Route path="/contact" element={ userData ? <Contact /> : <Navigate to="/login" state={{ from: location.pathname }} /> } />
          <Route path="/productDetail/:productId" element={ userData ? <ProductDetails /> : <Navigate to="/login" state={{ from: location.pathname }} /> } />
          <Route path="/cart" element={ userData ? <Cart /> : <Navigate to="/login" state={{ from: location.pathname }} /> } />
          <Route path="/placeOrder" element={ userData ? <PlaceOrder /> : <Navigate to="/login" state={{ from: location.pathname }} /> } />
          <Route path="/order" element={ userData ? <Order /> : <Navigate to="/login" state={{ from: location.pathname }} /> } />
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* Floating Widgets */}
        {userData && (
          <>
            <ChatWidget />
          </>
        )}

      </div>
    </ReactLenis>
  );
}

export default App;