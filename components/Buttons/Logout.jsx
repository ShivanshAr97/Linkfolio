"use client"

import { signOut } from 'next-auth/react'
import React from 'react'

const Logout = ({className = 'flex items-center gap-2 border p-2 px-4 shadow',
iconLeft = false,
iconClasses = ''}) => {
  return (
    <button className='border rounded-md px-4 py-1 bg-red-600 text-white' onClick={()=>{signOut()}}>Logout</button>
  )
}

export default Logout