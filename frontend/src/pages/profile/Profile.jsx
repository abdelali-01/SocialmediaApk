import React from 'react'
import Topbar from '../../components/topbar/Topbar'
import SideBar from '../../components/sideBar/SideBar'
import Feed from '../../components/Feed/Feed'
import RightBar from '../../components/rightBar/RightBar'
import './profile.css'

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER ;
  return (
    <div>
      <div>
            <Topbar/>
            <div className="profile d-flex">
                <SideBar/>
                <div className="ProfileInfo">
                    <div className="ProfileInfoTop">
                        <div className="profileCover position-relative">
                            <img className='ProfileCoverImg ' src={`${PF}backiee-306172.jpg`} alt="" />
                            <img className='ProfileUserImg' src={`${PF}photo_2024-10-13_23-05-43.jpg`} alt="" />
                        </div>
                        <div className="ProfileTitle text-center">
                            <h4 className='fw-bold'>Abdelali Arb</h4>
                            <p className='bio text-black-50'>Hey i'm here</p>
                        </div>
                    </div>
                    <div className="ProfileContent d-flex">
                        <Feed username="abdo001"/>
                        <RightBar profile/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
