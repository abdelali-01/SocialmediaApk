import React from "react";
import "./RightBar.css";
import { OnFriendList } from "../FriendList";
import { Users } from "../../data";
import ProfileFriendList from "../ProfileFriendList";

export default function RightBar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER ; 
  const ToHomePage = () => {
    return (
      <>
        <div className="RightBirthday d-flex align-items-center gap-2">
          <img src={PF+"gift.png"} alt="" width="50" />
          <span>
            <b>Abdelali</b> and <b>3 other friends have a Birthday today .</b>
          </span>
        </div>
        <div className="RightbarAd">
          <img src={PF+"backiee-306017.jpg"} alt="" />
        </div>
        <div className="RightbarFriendsOn">
          <b>Online Friends</b>
          {Users.map((user) => (
            <OnFriendList key={user.id} u={user} />
          ))}
        </div>
      </>
    );
  };
  const ToProfilePage = () => {
    return (
    <>
      <div className="TopRightBar ps-4">
        <h5 className="RightbarTitle fw-semibold mt-3 mb-4">User Informations</h5>
        <ul className="ListInfos list-unstyled">
          <li className="Info mb-2">
            <span className="key fw-medium">City : </span>
            <span className="Value text-black-50"> {user.city || "no presise"}</span>
          </li>
          <li className="Info mb-2">
            <span className="key fw-medium">From : </span>
            <span className="Value text-black-50">  {user.from || "no presise"} </span>
          </li>
          <li className="Info mb-2">
            <span className="key fw-medium">Relationship : </span>
            <span className="Value text-black-50"> {user.relationship === 1 ? "single" : user.relationship === 2 ? "maried" : "-"}</span>
          </li>
        </ul>

        <div className="userFriends">
        <h5 className="RightbarTitle fw-semibold mt-5 mb-4">User Friends</h5>
        <div className="FriendsList d-flex flex-wrap bg-body-secondary ps-2 rounded-3">
          {Users.map(user =>(
            <ProfileFriendList key={user.id} u={user}/>
          ))}
        </div>
        </div>
      </div>
    
    </>
  );
  };
  return (
    <div className="rightbar">
      {user ? <ToProfilePage/> : <ToHomePage/>}
    </div>
  );
}
