import React, { useContext, useRef } from 'react'
import './login.css'
import LoginCall from "../../ApiCall" ;
import { authContext } from '../../context/authContext';
import { Link } from 'react-router-dom';

export default function Login() {
  const email = useRef() ; 
  const pass = useRef();
  const {user , isFetching , error ,dispatch} = useContext(authContext)
  
  function handleClick(e){
    e.preventDefault()    
    LoginCall({email : email.current.value , pass : pass.current.value} , dispatch)
  }
  
  return (
    <div className='login container d-flex justify-content-between align-items-center '>
      <div className="loginLeft">
        <h1 className='fw-bold text-primary'>Logo</h1>
        <p>Connect with your friends and the world around you on 'Logo'</p>
      </div>
      <div className="loginRight w-50">
        <form action="" className='d-flex flex-column text-center' onSubmit={handleClick}>
            <input type="email" required placeholder='Email' ref={email}/>
            <input type="password" required minLength="8" placeholder='Password' ref={pass}/>
            <button className='btn btn-primary mt-3' >{isFetching ? "Loading .." :"Log In"}</button>
            <span role='button' className='text-primary mt-2'>Forgot Password ?</span>
            <Link to="/signup">
              <button className='btn btn-success w-50 ms-auto me-auto  mt-4'>Create new Account</button>
            </Link>
        </form>
      </div>
    </div>
  )
}
