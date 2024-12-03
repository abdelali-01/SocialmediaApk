import React, { useState } from "react";
import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import { useEffect } from "react";
import axios from "axios";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetching = async () => {
      const res = username
        ? await axios.get("/post/profile/" + username)
        : await axios.get("/post/timeline/674db5a195d4a4d0d36894cd");
      setPosts(res.data);
    };
    fetching();
  }, [username]);
  return (
    <div className="feed p-3">
      <Share />
      {posts.map((post) => (
        <Post key={post._id} p={post} />
      ))}
    </div>
  );
}
