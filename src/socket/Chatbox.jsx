import React ,{useContext}from 'react'
import {Avatar,Image, message} from 'antd'
import { convertLegacyProps } from 'antd/es/button/button'
import './chatbox.css'
import { AuthContext } from '../context/authContext'
export default function ChatBoxReceiver({avatar,user,message}) {

    const {currentUser,updatedProfile}= useContext(AuthContext)
  
    return (
    <div className='chatbox'>
        <Avatar
        size={50}
        src={<Image
            src={`../upload/${avatar}`}
            style={{
                objectFit:'cover',
                width:45,
                height:45,
                borderRadius: "100%"
            }}
            preview={false}
            />}
            />

            <p className='p-receiver'>
                <strong className='strong'>

                    {user}
                </strong> <br></br>
               {message}
            </p>

    </div>
  )
}

export function ChatBoxSender({avatar,user,message}) {
    return (
        <div className='chatboxSender'>
        <Avatar
        size={50}
        src={<Image
            src={`../upload/${avatar}`}
            style={{
                objectFit:'cover',
                width:45,
                height:45,
                borderRadius: "100%"
            }}
            preview={false}
            />}
            />

            <p className='p-sender'>
                <strong className='strong'>
           
                  {user}
                </strong> <br></br>
               {message}
            </p>

    </div>
    )
  }
