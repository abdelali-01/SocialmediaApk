import React, { useContext, useRef, useState } from "react";
import "./share.css";
import { authContext } from "../../context/authContext";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Share() {
  const  { user} = useContext(authContext)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER ;
  const desc = useRef();
  const [file,setFile] = useState(null);

  async function handleClick(e){
    e.preventDefault();
    const newPost = {
      userId : user._id ,
      desc : desc.current.value
    }
    if(file){
      const data = new FormData();
      const fileName = file.name ;
      data.append("file" , file)
      data.append("name" , fileName);
      newPost.img = fileName;
      try {
        await axios.post("/upload" , data)
      } catch (error) {
        console.log(error)
      }
    }
    try {
      await axios.post("/post" , newPost )
      window.location.reload();
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <form className="sharePost" onSubmit={handleClick}>
      <div className="topPart d-flex align-items-center">
        <Link to={"/profile/"+user.username}>
            <img src={user.profilPic ? PF + user.profilPic : PF+"default-userPic.webp"} alt="" />
        </Link>
        <textarea name="" ref={desc} id="" placeholder={"What`s in your Mind "+user.username + " !?"}></textarea>
      </div>
      <hr />
      <div className="bottomPart">
        <div className="shareOptions d-flex gap-3 mt-3 mb-3">
          <label className="shareOption">
            <i className="fa-solid fa-photo-film text-warning me-1"></i>
            <span>Photo or Video</span>
            <input className="d-none" type="file" name="file" id="file" onChange={(e)=>{
                setFile(e.target.files[0]);
            }} />
          </label>
          <div className="shareOption">
            <i className="fa-solid fa-tag text-primary me-1"></i>
            <span>Tag</span>
          </div>
          <div className="shareOption">
            <i className="fa-solid fa-location-dot text-success me-1"></i>
            <span>Location</span>
          </div>
          <div className="shareOption">
            <i className="fa-solid fa-face-smile text-warning me-1"></i>
            <span>Feeling</span>
          </div>
        </div>
        <div className="shareAct w-100 d-flex justify-content-end">
            <button className="btn btn-success ">Share</button>
        </div>
      </div>
    </form>
  );
}
