import React from "react";
import "./share.css";

export default function Share() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER ;
  return (
    <div className="sharePost">
      <div className="topPart d-flex align-items-center">
        <img src={`${PF}backiee-306017.jpg`} alt="" />
        <textarea name="" id="" placeholder="What`s in your Mind !?"></textarea>
      </div>
      <hr />
      <div className="bottomPart">
        <div className="shareOptions d-flex gap-3 mt-3 mb-3">
          <div className="shareOption">
            <i className="fa-solid fa-photo-film text-warning me-1"></i>
            <span>Photo or Video</span>
          </div>
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
    </div>
  );
}
