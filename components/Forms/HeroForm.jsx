"use client";

import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const HeroForm = () => {

    useEffect(() => {
      if('localStorage' in window && window.localStorage.getItem('username')){
        const username  = window.localStorage.getItem('username')
        window.localStorage.removeItem('username')
        redirect('/account?user='+username)
      }
    }, [])
    
  const submitHandler = async(e) => {
    e.preventDefault()
    const a = e.target
    const b=a.querySelector('input')
    const res = b.value
    if(res.length >0){
        window.localStorage.setItem("username",res)
        await signIn('google')
    }
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <span>linkfolio/</span>
        <input placeholder="username" type="text" name="" id="" />
        <button type="submit">Join</button>
      </form>
    </div>
  );
};

export default HeroForm;
