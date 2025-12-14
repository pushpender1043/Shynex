import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthDataContext } from './AuthContext';

export const userDataContext=createContext();

function UserContext({children}) {
    let [userData,setUserData]=useState("");
    let {serverUrl}=useContext(AuthDataContext);
  

    //   const getCurrentUser=async()=>{
    //     try{
    //         let result=await axios.get(serverUrl+"/api/user/getCurrentuser",{withCredentials: true})
    //         setUserData(result.data);
    //         console.log(result.data)

    //     }
    //     catch(error){
    //         setUserData(null);
    //         console.log(error)

    //     }
    // }
    const getCurrentUser = async () => {
  try {
    const result = await axios.get(serverUrl + "/api/user/getCurrentuser", {
      withCredentials: true,
    });
    setUserData(result.data);
    // console.log("Current user:", result.data);
  } catch (error) {
    // Only clear userData if it's an expected 401 (unauthorized)
    if (error.response?.status === 401) {
      setUserData(null);
      console.log("User not logged in");
    } else {
      console.error("Error fetching current user:", error);
    }
  }
};




    // useEffect(()=>{
    //     getCurrentUser()
    // },[])
    // UserContext.jsx (Fixed useEffect)

// ...

    useEffect(()=>{
        // Only attempt to fetch the user if the serverUrl is available
        if (serverUrl) {
            getCurrentUser()
        }
    },[serverUrl]) // FIX: Added serverUrl dependency.

// ...

    let value={
        userData,setUserData,getCurrentUser
    }
  
  return(
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
    
  )
}


export default  UserContext;
