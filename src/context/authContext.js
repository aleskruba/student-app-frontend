import {createContext, useEffect, useState} from 'react'
import axios from 'axios'

export const AuthContext = createContext()


export const AuthContextProvider = ({children}) =>{
    const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null) 

    const [updatedProfile,setUpdatedProfile] = useState()





 const login = async(inputs)=> {
     const res = await axios.post("https://studend-app-backend-production.up.railway.app/api/auth/login",inputs)
    setCurrentUser(res.data)
  

}

    const logout = async(inputs) =>{
         await axios.post("/auth/logout") 
        setCurrentUser(null)
      }



useEffect(()=>{
    localStorage.setItem('user',JSON.stringify(currentUser))
 
},[currentUser])

return (
    <AuthContext.Provider value={{currentUser,login,logout,updatedProfile,setUpdatedProfile}}>
        {children}
    </AuthContext.Provider>
    
)

}
