import React from 'react'
import { collection, getDocs, query, serverTimestamp, updateDoc, where, setDoc, doc, getDoc } from 'firebase/firestore'
import { db} from '../firebase'
import { AuthContext } from '../context/AuthContext'
function Search() {
  const [username, setUserName] = React.useState('')
  const [user, setUser] = React.useState(null)
  const [err, setError] = React.useState(false)
  const {currentUser} = React.useContext(AuthContext)


  const handleSearch = async () => {
    const q = query(collection(db, 'users'), where("displayName", '==', username))
    
    try {
      const querySnapShot = await getDocs(q)
    querySnapShot.forEach((doc) => {
      setUser(doc.data())
    })
    }catch(err) {
      setError(true)
    }

  }

const handleKey = (e) => {
  e.code === 'Enter' && handleSearch()
}
const handleEvent = async () =>{
  const combineID = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
 
try {
  const res = await getDoc(doc(db, "chats", combineID))
      if(!res.exists()) {

        await setDoc(doc(db,'chats', combineID), {messages: []})

        await updateDoc(doc(db, "userChats", currentUser.uid), {  
          [combineID+".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combineID+".date"]:serverTimestamp()
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combineID+".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combineID+".date"]:serverTimestamp()
        });
      }
    }catch(err) {
      setError(true)
    }
    setUser(null)
    setUserName('')
  }

  return (
    <div className='search'>
      <div className="searchfrom">
        <input className='search-input' type="text" onKeyDown={handleKey} value={username} onChange={e=>setUserName(e.target.value)} placeholder='find user' />
      </div>
      {err && <span>User not found</span>}
      {user && <div className="userChatInfo find" onClick={handleEvent}>
        <img src={user.photoURL} alt="" />
        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search