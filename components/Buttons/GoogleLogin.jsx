"use client"

import { signIn } from 'next-auth/react'

const GoogleLogin = () => {
  return (
    <button onClick={()=>signIn('google')}>sign in</button>
  )
}

export default GoogleLogin