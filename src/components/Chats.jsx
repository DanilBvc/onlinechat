import { doc, onSnapshot } from 'firebase/firestore'
import React from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { db } from '../firebase'

function Chats() {
  const [chats, setChats] = React.useState([])
  const {currentUser} = React.useContext(AuthContext)
  const {dispatch} = React.useContext(ChatContext)
  React.useEffect(() => {
   const getChats = () => {
    const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
      setChats(doc.data())
    })
    return () => {
      unsub()
    }
   }
   currentUser.uid && getChats()
  }, [currentUser.uid])
const handleEvent = (userInfo) => {
  dispatch({type:"CHANGE_USER", payload:userInfo})
}
  return (
    <>
      <span className='chats-txt'>Messages</span>
     <div className="chats">
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div
          className={`userChat ${chat[1].userInfo ?  '' : 'hide'}`}
          key={chat[0]}
          onClick={() => handleEvent(chat[1].userInfo)}
        >
          <img className='userChat-img' src={chat[1].userInfo ?  chat[1].userInfo.photoURL : ''} alt="" />
          <div className="userChatInfo">
            <span className='userChatName'>{chat[1].userInfo ? chat[1].userInfo.displayName : ''}</span>
            <p className='userChatLast'>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
    </>
   
  )
}

export default Chats