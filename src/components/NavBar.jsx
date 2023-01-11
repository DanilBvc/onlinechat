import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { auth } from '../firebase'

function NavBar() {
  const {currentUser} = useContext(AuthContext)
  return (
    <div className='navbar'>
      <div className="user">
        <div className="user__left">
        <img className="user-logo" src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        </div>
        <div className="user__right">
        <button className='logout' onClick={()=>signOut(auth)}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default NavBar