import React from 'react'
import { createContext } from 'react'
export const AuthDataContext=createContext();
function AuthContext({children}) {
    let serverUrl=import.meta.env.VITE_SERVER_URL;
    let value={
        serverUrl
    }
  return (
        <AuthDataContext.Provider value={value}>
            {children}
        </AuthDataContext.Provider>
  )
}

export default AuthContext;
