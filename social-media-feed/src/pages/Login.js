import React from 'react'
import {auth} from '../firebaseConfig'
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth'

const Login = () => {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
      alert('Logged in successfully!')
    } catch (error) {
      console.error('Error logging in:', error.message)
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  )
}

export default Login
