import React from 'react'
import './signup.css'

export default function Signup() {
  return (
    <div className='login container d-flex justify-content-between align-items-center '>
      <div className="loginLeft">
        <h1 className='fw-bold text-primary'>Logo</h1>
        <p>Connect with your friends and the world around you on 'Logo'</p>
      </div>
      <div className="loginRight w-50">
        <form action="" className='d-flex flex-column text-center'>
            <input type="text" placeholder='Username' />
            <input type="text" placeholder='Email' />
            <input type="password" placeholder='Password' />
            <input type="password" placeholder='Confirm your Password' />
            <button className='btn btn-primary mt-3'>Sign up</button>


            <button className='btn btn-success w-50 ms-auto me-auto  mt-4'>Log In into Account</button>
        </form>
      </div>
    </div>
  )
}
