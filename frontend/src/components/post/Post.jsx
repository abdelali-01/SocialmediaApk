import axios from "axios";
import "./post.css";
import { useEffect, useState } from "react";
import {format} from "timeago.js"
import {Link} from "react-router-dom"
import { useSelector } from "react-redux";


export default function Post({p}) {
  const [like , setLike] = useState(p.like.length);
  const [isLiked , setIsLiked] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER ;  
  const [user , setUser] = useState({});
  const {user : currentUser} = useSelector(state => state.auth);

  useEffect(()=>{
    setIsLiked(p.like.includes(currentUser._id));
  },[p.like , currentUser._id])

  useEffect(()=>{
    const fetching = async () => {
      const res = await axios.get(`/user?userId=${p.userId}`);
      setUser(res.data);
    }
    fetching();
  },[p.userId]);

  function handleLike(){
    try {
      axios.put("/post/"+p._id+"/like" , {userId : currentUser._id})
    } catch (error) {
      console.log(error);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  }

  return (
    <div className="post ">
      <div className="postTop d-flex align-items-center justify-content-between">
        <div className="leftPart d-flex align-items-center gap-2" role="button">
          <div className="profilePost d-flex align-items-center gap-2">
            <Link to={"/profile/"+user.username} >
              <img src={user.profilePic || `${PF}default-userPic.webp`} alt="" />
            </Link>
            <span className="UserNamePost fs-5">
              {user.username}
            </span>
          </div>
          <span className="timeAgo ms-4 text-black-50">{format(p.createdAt)}</span>
        </div>
        <div className="rightPart">
          <i className="fa-solid fa-ellipsis-vertical fs-4 me-3 " role="button"></i>
        </div>
      </div>
      <div className="postCenter mt-3 mb-3">
        <p className="statuPost">{p?.desc}</p>
        <img src={PF+p?.img} alt="" />
      </div>
      <div className="postBottom d-flex align-items-center justify-content-between">
        <div className="LeftButtonPart d-flex align-items-center gap-2">
            <i onClick={handleLike} role="button" className=" fa-solid  fa-heart fs-4 text-danger"></i>
            <span>{like} person like it</span>
        </div>
        <div className="RightbuttomPart">
            <span role="button">{p.comment} comments</span>
        </div>
      </div>
    </div>
  );
}
