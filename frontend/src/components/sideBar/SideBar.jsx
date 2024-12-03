import React from "react";
import "./sideBar.css";
import FriendList from "../FriendList";
import { Users } from "../../data";

export default function SideBar() {
  return (
    <div className="Sidebar">
      <ul className="sideBarOptions">
        <li className="sideBarOption">
          <i className="fa-solid fa-rss"></i>
          <span>Feed</span>
        </li>
        <li className="sideBarOption">
          <i className="fa-solid fa-message"></i>
          <span>Chats</span>
        </li>
        <li className="sideBarOption">
          <i className="fa-solid fa-video"></i>
          <span>Videos</span>
        </li>
        <li className="sideBarOption">
          <i className="fa-solid fa-user-group"></i>
          <span>Groups</span>
        </li>
        <li className="sideBarOption">
          <i className="fa-solid fa-bookmark"></i>
          <span>Bookmarks</span>
        </li>
        <li className="sideBarOption">
          <i className="fa-solid fa-question"></i>
          <span>Questions</span>
        </li>
        <button>Show more </button>
      </ul>
      <hr />
      <ul className="sideBarFriends">
        {Users.map(user =>(
          <FriendList key={user.id} u={user}/>
        ) )}
      </ul>
    </div>
  );
}
