import React, { useState,useContext } from 'react'
import './inputText.css'
import { AuthContext } from '../context/authContext'

export default function InputText({addMessage}) {
  const {currentUser,updatedProfile}= useContext(AuthContext)
 
  const [message , setMessage] = useState('')

  function addAMessage(){
    if(message == '') return;
    addMessage({
        message
    })
    setMessage('')
}

  return (

    <div className='inputTextContainer'>
   
            
     <textarea
              required='required'
              className='inputTextArea' 
              rows={6}
              placeholder="Write something..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              
              >
     </textarea>
             

        
                      <button className='inputTextButton'
                    onClick={()=> addAMessage()}>
                    SEND    
                </button>

          

    </div>
  )
}
