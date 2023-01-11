import React from 'react'
import "../index.css"
import {  signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import {useNavigate, Link} from 'react-router-dom'
function Login() {
  const [err, setError] = React.useState(false)
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/")
    }catch(err) {
      if(err) {
        setError(true)
      }
    }
  }
  return (
    <div className="formContainer">
    <div className="formWrapper">
    <h2>Welcome!</h2>
      <span className='title'>Sign in to</span>
      <form onSubmit={handleSubmit}>
      <span className='label'>Email</span>
        <input required className='inputs' type="email" placeholder='email'/>
        <span className='label'>Password</span>
        <input required className='inputs' type="password" placeholder='password'/>
        <button className='login__btn'>Login up</button>
      </form>
      <p>You dont have an account? <Link className='link-login' to='/register'>Register</Link></p>
      {err && <span>Something went wrong</span>}
    </div>
  </div>
  )
}

export default Login