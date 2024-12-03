import React from 'react'

export default function ProfileFriendList({u}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER ;
  return (
    <div className='mt-2 mb-2 me-2 d-flex flex-column align-items-center' role='button'>
      <img style={{
        width : '90px',
        height : '90px',
        borderRadius : '10px',
        objectFit : 'cover'
      }} src={PF+u.profilePic} alt="" />
      <span>{u.username}</span>
    </div>
  )
}
