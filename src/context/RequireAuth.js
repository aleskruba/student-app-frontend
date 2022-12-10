import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'


export default function RequireAuth({children}) {

    const {currentUser }= useContext(AuthContext)
    const navigate = useNavigate()

  useEffect(()=>{
    if(!currentUser) {
        return navigate('/login')
    } 
        return navigate('/')
  },[currentUser])  


      return children

  
}
