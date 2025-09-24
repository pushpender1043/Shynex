import React,{useEffect, useState} from 'react'
import Nav from '../Component/Nav'
import Background from '../Component/Background';
import Hero from '../Component/Hero.jsx';
import Product from './Product.jsx';
import OurPolicy from '../Component/OurPolicy.jsx';
import NewLetterBox from '../Component/NewLetterBox.jsx';
import Footer from '../Component/Footer.jsx';



function Home() {
  let heroData = [
  { text1: "30% OFF Limited Offer", text2: "Style that" },
  { text1: "Discover the Best of Bold Fashion", text2: "Limited Time Only!" },
  { text1: "Explore Our Best Collection", text2: "Shop Now!" },
  { text1: "Choose your Perfect Fashion Fit", text2: "Now on Sale!" }
];
let [heroCount,setHeroCount]=useState(0);

useEffect(()=>{
  let interval=setInterval(()=>{
    setHeroCount(prevCount=>(prevCount===3?0:prevCount+1))
  },3000)
  return ()=>clearInterval(interval)
},[])
  return (
 

 
    <div>

    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#F2E9E4] to-[#F7F4EA]'>
     
 <Background heroCount={heroCount}/> 
<Hero heroCount={heroCount}
setHeroCount={setHeroCount}
heroData={heroData[heroCount]}
 />      
 

    </div>
    <Product/>
    <OurPolicy/>
    <NewLetterBox/>
    <Footer/>

      </div>
 
  )
}

export default Home
