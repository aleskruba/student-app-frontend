import React, { Fragment ,  useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import './home.scss'
import './pagination.css'
import HomeComp from './HomeComp'
import Pagination from './Pagination'
import { AuthContext } from '../context/authContext'
import { message } from 'antd'
import ChatContainer from '../socket/ChatContainer'

export default function Home() {



  const [comments,setComments] = useState([])
  const [currentPage,setCurrentPage] = useState(1)
  const [postPerPage,setPostPerPage] = useState(4)

  useEffect(()=>{
    const fetchData = async () => {

      try{
     
        const res = await axios.get('/comments')

        setComments(res.data)
      }catch(err){
        console.log(err)
      }
    }
    fetchData()
  },[])


  const sortComments = comments.sort((a,b)=>{
    return new Date(b.date) - new Date(a.date);
    })  


    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;  
 
  const currentPost = sortComments.slice(firstPostIndex,lastPostIndex)

 


  return (
 
    <div className='home'>
      <div className="bottom">
    <ChatContainer />
    </div>

  
      <HomeComp  currentPost={currentPost}/>

   
  
      <Pagination totalPosts={sortComments.length} 
              postsPerPage={postPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              />

       </div>

  )
}
