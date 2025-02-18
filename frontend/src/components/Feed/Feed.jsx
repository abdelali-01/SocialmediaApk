import React, { useState } from "react";
import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const {user} = useSelector(state => state.auth);
  
  useEffect(() => {
    const fetching = async () => {
      const res = username
        ? await axios.get("/post/profile/" + username)
        : await axios.get("/post/timeline/" + user._id);
      setPosts(res.data.sort((p1 , p2)=>{
        return new Date(p2.createdAt) - new Date(p1.createdAt)
      }));
    };
    fetching();
  }, [username, user._id]);
  return (
    <div className="feed p-3">
      <Share />
      {posts.map((post) => (
        <Post key={post._id} p={post} />
      ))}
    </div>
  );
}
