import React from 'react';
import { ChatContext } from '../context/ChatContext';
import Input from './Input';
import Messages from './Messages';

function Chat() {
  const {data} = React.useContext(ChatContext)
  return (
    <div className="chat">
      <div className="chatInfo">
      <img className={`chatImg ${data.user.photoURL ? '' : 'hide'}`} src={data.user.photoURL} alt="" />
        <span className='chatName'>{data.user?.displayName}</span>
      </div>
      <Messages />
      <Input />
    </div>
  );
}

export default Chat;
