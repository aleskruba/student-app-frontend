import React, { useContext, useRef } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import socketIOClient from "socket.io-client";
import { AuthContext } from '../context/authContext'
import ChatBoxReceiver, { ChatBoxSender } from './Chatbox';
import InputText from './InputText';
import {
  doc,
  setDoc,
  collection,
  serverTimestamp,
  query,
  onSnapshot,
  orderBy,

} from 'firebase/firestore';
import db from "../firebaseConfig/firebaseConfig.js"


export default function ChatContainer() {
  const {currentUser,updatedProfile}= useContext(AuthContext)

  const user = updatedProfile?.username
  const avatar = updatedProfile?.img

 

  let socketio = socketIOClient('http://localhost:8801')
  const [chats,setChats] = useState([])
  const chatsRef = collection(db , "Messages")
  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }  

  useEffect(()=>{

    const q = query(chatsRef , orderBy('createdAt' , 'asc'))
  
    const unsub = onSnapshot(q, (querySnapshot) =>{
      const fireChats =[]
      querySnapshot.forEach(doc => {
        fireChats.push(doc.data())
      });
     setChats([...fireChats])
    })
    return ()=> {
      unsub()
    }
  
  },[])

  function addToFirrebase(chat){
    const newChat = {
        avatar,
        createdAt: serverTimestamp(),
        user,
        message: chat.message
    }

    const chatRef = doc(chatsRef)
    setDoc(chatRef , newChat)

    .catch(console.log)
 } 

  useEffect(()=> {
    socketio.on('chat', senderChats => {
        setChats(senderChats)
    })
})

function sendChatToSocket(chat){
  socketio.emit("chat" , chat)
}

function addMessage(chat){

  const newChat = {...chat , user , avatar}
  addToFirrebase(chat)
  setChats([...chats , newChat])
  sendChatToSocket([...chats , newChat])
}

function ChatsList(){
  return( <div >
        {
           chats.map((chat, index) => {
            if(chat.user === user) return <ChatBoxSender  key={index} message={chat.message} avatar={chat.avatar} user={chat.user} />
            return <ChatBoxReceiver key={index} message={chat.message} avatar={chat.avatar} user={chat.user} />
        })
        }
        <div  />
  </div>)
 
}

  return (
    <div>
           <ChatsList
             />
            
            <InputText addMessage={addMessage} />
        </div>


  )
}
