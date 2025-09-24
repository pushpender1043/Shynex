import React from 'react'
import back from '../assets/back.webp'
import google from '../assets/google.webp'

function Background({heroCount}) {
    if(heroCount===0){
        return(
             <img src={back} alt="" className='w-[50%] h-[100%] float-left overflow-auto object-cover '/>
        )
    }
    else if(heroCount===1){
         return(
             <img src={back} alt="" className='w-[50%] h-[100%] float-left overflow-auto object-cover'/>
        )
        

    }
    else if(heroCount===2){
         return(
             <img src={back} alt="" className='w-[50%] h-[100%] float-left overflow-auto object-cover'/>
        )
        

    }
    else if(heroCount===3){
         return(
             <img src={back} alt="" className='w-[50%] h-[100%] float-left overflow-auto object-cover'/>
        )
        

    }


}

export default Background
