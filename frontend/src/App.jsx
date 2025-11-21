import React, { useContext } from 'react'
import {Navigate,useLocation, BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import Registration from './pages/registration';
import Nav from './Component/Nav';
import { userDataContext } from './Context/UserContext';
import About from './pages/About';
import Collections from './pages/Collections';
import Product from './pages/Product';
import Contact from './pages/Contact';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import PlaceOrder from './pages/placeOrder';
import Order from './pages/Order';
import NotFound from './pages/NotFound';
import Ai from './Component/Ai';
import { ToastContainer, toast } from 'react-toastify';
import ChatWidget from './Component/ChatbotWidget';


function App() {
  let {userData}=useContext(userDataContext)
  let loacation=useLocation()
  return (
   <>
     <ToastContainer />
     {userData&& <Nav/>}
     {/* <Nav/> */}
    
  
   <Routes>
<Route
      path="/login" 
      element={
        userData ? (
          <Navigate to={location.state?.from || "/"} />
        ) : (
          <Login />
        )
      }
    />

    <Route path ='/signup' element=
    {
    
        userData ? (
          <Navigate to={location.state?.from || "/"} />
        ) : (
          <Registration />
        )
    }
    />



    <Route path ='/' element=
    {
      userData?<Home/>: <Navigate to="/login"
       state={{from: location.pathname}}/> 
    }
    />
  
    <Route path ='/about' element={userData?<About/>: <Navigate to="/login"
       state={{from: location.pathname}}/> }/>

    <Route path ='/collection' element={userData?<Collections/>: <Navigate to="/login"
       state={{from: location.pathname}}/> }/>

    <Route path ='/product' element={userData?<Product/>: <Navigate to="/login"
       state={{from: location.pathname}}/> }/>

    <Route path ='/contact' element={userData?<Contact/>: <Navigate to="/login"
       state={{from: location.pathname}}/> }/>

    <Route path ='/productDetail/:productId' element={userData?<ProductDetails/>: <Navigate to="/login"
       state={{from: location.pathname}}/> }/>

        <Route path ='/cart' element={userData?<Cart/>: <Navigate to="/login"
       state={{from: location.pathname}}/> }/>

         <Route path ='/placeOrder' element={userData?<PlaceOrder/>: <Navigate to="/login"
       state={{from: location.pathname}}/> }/>

         <Route path ='/order' element={userData?<Order/>: <Navigate to="/login"
       state={{from: location.pathname}}/> }/>

       <Route path ="*" element={<NotFound/>}/>
       </Routes>
      <Ai/>
      <ChatWidget/>
  
      </>
  )
}

export default App
