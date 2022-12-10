import React,{Component, useContext, useState} from 'react'
import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import axios from 'axios'
import moment from 'moment'
import ReactQuill from 'react-quill'
import { Fragment } from 'react'
import './page.scss'

export default function Page() {

  const [comment,setComment] = useState({})
  const [replies,setReplies] = useState([])

  const [replyState,setReplyState] = useState(false)
  const {currentUser,updatedProfile} = useContext(AuthContext)
 
  
  const navigate = useNavigate()

  const location =   useLocation()

  const commentID = location.pathname.split("/")[2]
  const [value, setValue] = useState('');

  useEffect(()=>{
    const fetchData = async () => {
      try{
        const res = await axios.get(`/comments/${commentID}`)
             setComment(res.data)
  
      }catch(err){
        console.log(err)
      }
    }
    fetchData()
  },[commentID])


  
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
  },[replyState])

  const handleDelete = async () => {
    if(window.confirm("Are you sure that you want to delete this comment ?")) {
    try{
     await axios.delete(`/comments/${commentID}`)
      navigate('/')

    }catch(err){
      console.log(err)
    }
  }
  }

  
  const handleDeleteReply = async (replyID) => {
    if(window.confirm("Are you sure that you want to delete this reply ?")) {
 

    const data = {
      replyID: replyID
    }
    try{
     await axios.delete(`/replies/${replyID}`,{data})
     const newReplyObject = [...replies].filter(con => con.id !== replyID)
     setReplies(newReplyObject)
     

    }catch(err){
      console.log(err)
    }
   }
  }

  const [replyActive,setReplyActive] = useState(false)

  const replyFunction = () =>{
    setReplyActive(true)
  }

const cancelReplyFuntion =() => {
  setReplyActive(false)
}



const handleSubmit = async (e) =>{
  e.preventDefault();

  try{
      await axios.post('/replies/',{
        comment:value,
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        uidcomment:comment.id,
        uiduser:currentUser.id,
        uidcommentauthor:comment.cID

      })
      setReplyState(!replyState)
      setReplyActive(false)
      setValue('')
  }catch(err){
      console.log(err)
  }

}

  return (
    <div className='home'>
     
     <div className="box">

     <div className="comment-profil" >

     <div className="comment-items">

     <div className="img">
          {!comment?.img  || comment?.img == 'nothing' ? <img src={`../upload/avatar.jpg`} alt="" />   : <img src={`../upload/${comment.img}`} alt="" /> }
          </div>
                    
          <div className='item1'>
             <div className='name'> <span><b>{comment?.username}</b></span></div>
          </div>
          
          <div className='item2'>
             <div className='date'><p><i>Posted {moment(comment?.date).format('DD.MM HH:m')} </i></p></div>
             </div>  
         </div>  
         
          <div className='content'> 
                <div className='titlereply'>  <h3>{comment?.title}</h3></div>
                 <div className="quillLengthreply"> 
                 <ReactQuill value={comment?.comment} 
                             readOnly={true} 
                             theme={"bubble"}/>
                 </div>
                 <div className="buttons">
                 {comment?.cID   == updatedProfile?.id ?
             
                <button className="button-delete" onClick={handleDelete}> delete</button>
                    :
                    <Fragment>
                    {!replyActive &&
                    <button className="button-reply" onClick={replyFunction}> reply</button>
                    }</Fragment>
                  
                  }
                  </div>  
                  
    

              {replyActive &&
                <Fragment>
                    
                   
                    <div className="editContainer"> 
                    <ReactQuill  theme="snow" value={value} onChange={setValue} />
                    </div>
                    
                 <div className="buttonsItem">   
              
                          <button className='button-cancel' onClick={cancelReplyFuntion}> Cancel </button>
                         <button className='button-send' onClick={handleSubmit}> Send </button>
                    
                  </div>
                    
                  </Fragment>
                      
            
              }

            </div>
                  


              </div>
      
        </div>
    

        
        {replies.sort((a,b)=>{
    return new Date(b.date) - new Date(a.date);
    }).map(r=>(  
         
          <Fragment key={r.id}>
     
            
        {comment?.id == r?.uidcomment ?
<div className="box1">

<div className="comment-profil1" >

<div className="comment-items1">

        <div className="img">
           {!r?.img  || r?.img == 'nothing' ? <img src={`../upload/avatar.jpg`} alt="" />   : <img src={`../upload/${r?.img}`} alt="" /> }
          </div>
             
          <div className='item1'>
                 <span><b>{r.username}</b></span>
            </div>
            
            <div className='item2'>
                 <p><i>{moment(r?.date).format('DD.MM HH:m')}</i> </p>
              </div>    
          
            </div>
            <div className='content1'>
            <div className='title'> <h3>RE : {r?.title}</h3></div> 
            
            <div className="quillLengthreply"> 
                <ReactQuill 
           
                value={r?.reply} 
                readOnly={true} 
                theme={"bubble"}
                />
                </div>
  
 
        {r.uiduser == currentUser?.id  ? 
            <div className="buttons">
              <button  className='button-delete' onClick={()=>handleDeleteReply(r.id)}>delete
            </button>
          </div> 
          : null }
        
        </div>
          </div>

        </div>
        : null } 
        </Fragment>
      
        ))}

    </div>
  )
}
