import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import React from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { db, storage } from '../firebase'
import {v4 as uuid} from "uuid"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
function Input() {
  const [img, setImg] = React.useState("")
  const [text, setText] = React.useState('')
  const {currentUser} = React.useContext(AuthContext)
  const [err, setErr] = React.useState(false)
  const {data} = React.useContext(ChatContext)
  const handleSend = async () => {
  try {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          }).catch((err) => {
            setErr(true)
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  }catch(err) {
    if(err) {
      alert('Choose chat to input your message')
    }
  }
  };
  return (
    <div className='input'>
      <input value={text} className='input-message' type="text" placeholder='input your message'  onChange={e=>setText(e.target.value)} />
      <div className="send">
        <img className='input-img' src={require('../assets/img.png')} alt="" />
        <input type="file" className='input-file' onChange={e=>setImg(e.target.files[0])}/>
      </div>
      <button onClick={handleSend}>Send</button>
    </div>
  )
}

export default Input