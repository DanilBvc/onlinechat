import React from 'react';
import "../style/register.css"
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, storage, db} from '../firebase.js'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {doc, setDoc} from 'firebase/firestore'
import {useNavigate, Link} from 'react-router-dom'
function Register() {
  const [err, setError] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, `${displayName}`);
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            setError(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <h1>Welcome!</h1>
        <span className='title'>Sign up to</span>
        <form className='registerForm' onSubmit={handleSubmit}>
          <span className='label'>User name</span>
          <input required className='inputs' type="text" placeholder='name' />
          <span className='label'>Email</span>
          <input required className='inputs' type="email" placeholder='email'/>
          <span className='label'>Password</span>
          <input required className='inputs' type="password" autoComplete='on' placeholder='password'/>
          <span className='label'>Your avatar</span>
          <input required className='inputs' type="file" placeholder='chose file'/>
          <button className='register__btn'>Sign up</button>
        </form>
        {err && <span>Something went wrong</span>}
        <p className='link'>Already have an Account?<Link  className='link-login' to='/login'>Login</Link></p>
      </div>
    </div>
  );
}

export default Register;
