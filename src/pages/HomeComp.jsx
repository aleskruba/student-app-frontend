import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import ReactQuill from 'react-quill'
import { useState } from 'react'
import axios from 'axios'

export default function HomeComp({currentPost}) {

  const [replies,setReplies] = useState([])


  let sum = 0      
              
  
  useEffect(()=>{
    const fetchData = async () => {
      try{
        const response = await axios.get('/replies')
        setReplies(response.data)
     
      }catch(err){
        console.log(err)
      }
    }
    fetchData()
  },[])



  return (
    <>
    {currentPost.map(comment => { sum = 0 ; return (
       
    <div className="box" key={comment.id}>
        <Link className='link'  to={`/post/${comment.id}`}>
        <div className="comment-profil" >
      
            
            <div className="comment-items">
                
                <div className="img">               
             {!comment?.img  || comment?.img == 'nothing' ? <img src={`../upload/avatar.jpg`} alt="" />   : <img src={`../upload/${comment.img}`} alt="" /> }
                </div>
                
                  <div className='item1'>
                        <span><b>{comment?.username}</b></span>           
                  </div>
                  <div className='item2'>
                      <i>{moment(comment?.date).format('DD.MM HH:m')}</i> 
                  </div>
              </div>
        
        <div className="content">

              
            <div className='title'>
               <b> <ReactQuill
                  
                  value={'Title: '+comment.title}
                  readOnly={true}
                  theme={"bubble"}
                   /></b>  
            </div>
 
            <div className="text">
               <ReactQuill value={comment.comment} readOnly={true} theme={"bubble"}/>
           
            </div>
           
            </div>
          
        

            {replies.map((rep,key)=> {
         
         if (rep.uidcomment ===comment.id && comment.uid === rep.uidcommentauthor )
             sum = sum +1  
   } ) }
                     
           <div className='numberOfReplies'>

          {currentPost.uidcomment ===replies.id && currentPost.uid === replies.uidcommentauthor ?
          <Fragment>
           {sum > 0 ? <span> replies : {sum}</span> : null}    
           </Fragment>
          :
          
            null
          }
      
     </div>
   
        
        </div>
        </Link>
        </div>
 ) } )}</>

  )
}
