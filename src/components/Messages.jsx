import { doc, onSnapshot } from 'firebase/firestore'
import React from 'react'
import { ChatContext } from '../context/ChatContext'
import { db } from '../firebase'
import Message from './Message'

function Messages() {
  const [messages, setMessages] = React.useState([])
  const {data} = React.useContext(ChatContext)
  React.useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
      return () => {
        unSub()
      }
    })
  }, [data.chatId])
  return (
    <div className='messages'>
      {messages.map(m=>(<Message message={m} key={m.id}/>))}
    </div>
  )
}

export default Messages