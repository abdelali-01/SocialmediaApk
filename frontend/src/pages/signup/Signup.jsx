import React from 'react'
import './signup.css'
import { Link, useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import axios from 'axios';

export default function Signup() {
  const email = useRef();
  const username = useRef();
  const pass = useRef();
  const passConfig = useRef();
  const navigate = useNavigate();

  async function handlClick(e){
    e.preventDefault();

    if(passConfig.current.value !== pass.current.value){
      passConfig.current.setCustomValidity("Password don't match ")
    }else{
      const user = {
        username : username.current.value ,
        email : email.current.value ,
        pass : pass.current.value
      }
      try {
        await axios.post("/auth/signup" , user);
        navigate("/login")
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className='login container d-flex justify-content-between align-items-center '>
      <div className="loginLeft">
        <h1 className='fw-bold text-primary'>Logo</h1>
        <p>Connect with your friends and the world around you on 'Logo'</p>
      </div>
      <div className="loginRight w-50">
        <form action="" className='d-flex flex-column text-center' onSubmit={handlClick}>
            <input required ref={username} type="text" placeholder='Username' />
            <input required ref={email} type="email" placeholder='Email' />
            <input minLength={8} required ref={pass} type="password" placeholder='Password' />
            <input required ref={passConfig} type="password" placeholder='Confirm your Password' />
            <button className='btn btn-primary mt-3'>Sign up</button>

            <Link to="/login">
                <button className='btn btn-success w-50 ms-auto me-auto  mt-4'>Log In into Account</button>
            </Link>
        </form>
      </div>
    </div>
  )
}
