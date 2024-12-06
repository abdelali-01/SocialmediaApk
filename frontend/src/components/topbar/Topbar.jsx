import { useContext } from "react";
import "./topbar.css";
import {Link} from "react-router-dom" ;
import { authContext } from "../../context/authContext";

const imageUrl = `${process.env.REACT_APP_PUBLIC_FOLDER}gift.png`;
console.log(imageUrl);

export default function Topbar() {
  const {user} = useContext(authContext)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER ; 
  return (
    <nav className="topbar d-flex align-items-center ps-5 pe-3">
      <div className="topbarLeft">
        <Link to={"/"} style={{textDecoration : "none" , color : "#ffff"}}>
          <span className="topbarLogo">Logo</span>
        </Link>
      </div>
      <div className="topbarCenter me-5">
        <div className="searchBar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input placeholder="Search for friend , post or video ..." />
        </div>
      </div>
      <div className="topbarRight d-flex align-items-center gap-5 justify-content-between">
        <div className="topbarIcons ms-5 d-flex align-items-center gap-4 ">
          <div className="topbarIcon  position-relative">
            <i className="fa-solid fa-user"></i>
            <span className="topbarIconNote">1</span>
          </div>
          <div className="topbarIcon  position-relative">
            <i className="fa-solid fa-message"></i>
            <span className="topbarIconNote">1</span>
          </div>
          <div className="topbarIcon position-relative">
            <i className="fa-solid fa-bell"></i>
            <span className="topbarIconNote">1</span>
          </div>
        </div>
        <Link to={"/profile/"+ user.username}>
          <img className="profilImg" src={
            user.profilPic ? PF+user.profilPic : `${PF}default-userPic.webp`
            } alt="" />
        </Link>
      </div>
    </nav>
  );
}
