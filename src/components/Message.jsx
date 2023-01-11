import React, { createRef, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

function Message({message}) {
  const {currentUser} = React.useContext(AuthContext)
  const {data} = React.useContext(ChatContext)
  const ref = useRef()
  React.useEffect(() => {
    ref.current?.scrollIntoView({behavior:"smooth"})
  }, [message])
  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid ? 'owner' : 'guest'} `}>
      <div className="messageInfo">
        <img className='messageImg' src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
        <span>{currentUser.metadata.creationTime}</span>
      </div>
      <div className="messageContent">
    <p>{message.text}</p>
    {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  )
}

export default Message