import React from "react";

const PF = process.env.REACT_APP_PUBLIC_FOLDER ;

export default function FriendList({ u }) {
  return (
    <li className="sideBarFriend">
      <img src={PF+u.profilePic} alt="" />
      <span className="sideBarUserName">{u.username}</span>
    </li>
  );
}

export function OnFriendList({u}) {
  return (
    <li className="OnFriend mt-3 d-flex align-items-center gap-3" role="button">
      <div className="OnFriendImg position-relative">
        <img src={PF+u.profilePic} alt="" />
        <div className="onStatus"></div>
      </div>
      <span className="RightUsername fw-semibold">{u.username}</span>
    </li>
  );
}
