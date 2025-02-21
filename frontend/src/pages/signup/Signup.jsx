import React, { useState } from 'react'
import './signup.css'
import { Link, useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import { Signup as SignupReq } from '../../redux/auth/authHandler';

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isFetching} = useSelector(state => state.auth);

  // setup the form state for user registration
  const [registrationForm , setRegistrationForm] = useState({
    username : "" ,
    email : "" ,
    pass : "" ,
    passConfig : ""
  });
  // set the function that update the inputs
  const formHandler = (e)=>{
    setRegistrationForm({...registrationForm , [e.target.name] : e.target.value})
  }


  async function handlClick(e){
    e.preventDefault();

    if(registrationForm.passConfig !== registrationForm.pass){
      alert('passwords doesn`t match !')
    }else{
      const user = {
        username : registrationForm.username ,
        email : registrationForm.email ,
        pass : registrationForm.pass
      }
      dispatch(SignupReq(user , navigate))
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
            <input required value={registrationForm.username} name='username' type="text" placeholder='Username' onChange={formHandler}/>
            <input required value={registrationForm.email} name='email' type="email" placeholder='Email' onChange={formHandler}/>
            <input minLength={8} required value={registrationForm.pass} name='pass' type="password" placeholder='Password' onChange={formHandler}/>
            <input required value={registrationForm.passConfig} name='passConfig' type="password" placeholder='Confirm your Password' onChange={formHandler}/>
            <button className='btn btn-primary mt-3'>Sign up</button>

            <Link to="/login">
                <button className='btn btn-success w-50 ms-auto me-auto  mt-4'>Log In into Account</button>
            </Link>
        </form>
      </div>
    </div>
  )
}
