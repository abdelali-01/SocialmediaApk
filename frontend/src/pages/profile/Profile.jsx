import React, { useEffect, useState } from 'react'
import Topbar from '../../components/topbar/Topbar'
import SideBar from '../../components/sideBar/SideBar'
import Feed from '../../components/Feed/Feed'
import RightBar from '../../components/rightBar/RightBar'
import './profile.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER ;
    const [user , setUser] = useState({});
    const username = useParams().username

    useEffect(()=>{
        const fetching = async () => {
            const res = await axios.get(`/user?username=${username}`);
            setUser(res.data);
        }
        fetching();
    },[username])
  return (
    <div>
      <div>
            <Topbar/>
            <div className="profile d-flex">
                <SideBar/>
                <div className="ProfileInfo">
                    <div className="ProfileInfoTop">
                        <div className="profileCover position-relative">
                            <img className='ProfileCoverImg ' src={user.coverPic || `${PF}default-cover.png`} alt="" />
                            <img className='ProfileUserImg' src={user.profilPic || `${PF}default-userPic.webp`} alt="" />
                        </div>
                        <div className="ProfileTitle text-center">
                            <h4 className='fw-bold'>{username}</h4>
                            <p className='bio text-black-50'>{user.bio}</p>
                        </div>
                    </div>
                    <div className="ProfileContent d-flex">
                        <Feed username={username}/>
                        <RightBar user={user}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
