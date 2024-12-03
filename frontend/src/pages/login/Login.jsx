import React from 'react'
import './login.css'

export default function Login() {
  return (
    <div className='login container d-flex justify-content-between align-items-center '>
      <div className="loginLeft">
        <h1 className='fw-bold text-primary'>Logo</h1>
        <p>Connect with your friends and the world around you on 'Logo'</p>
      </div>
      <div className="loginRight w-50">
        <form action="" className='d-flex flex-column text-center'>
            <input type="text" placeholder='Email' />
            <input type="password" placeholder='Password' />
            <button className='btn btn-primary mt-3'>Log In</button>


            <span role='button' className='text-primary mt-2'>Forgot Password ?</span>
            <button className='btn btn-success w-50 ms-auto me-auto  mt-4'>Create new Account</button>
        </form>
      </div>
    </div>
  )
}
